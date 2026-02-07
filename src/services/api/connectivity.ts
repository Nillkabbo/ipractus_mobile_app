/**
 * Connectivity test for API - helps diagnose network issues
 */
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

export interface ConnectivityResult {
  ok: boolean;
  error?: string;
  status?: number;
  details?: string;
}

/**
 * Test if ANY network request works using a public API
 */
async function testPublicApi(): Promise<{ ok: boolean; status?: number; error?: string }> {
  try {
    if (__DEV__) {
      console.log('[connectivity] Testing network with public API (https://jsonplaceholder.typicode.com/posts/1)...');
    }
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (__DEV__) {
      console.log('[connectivity] Public API response status:', res.status);
    }

    return {
      ok: res.status < 500,
      status: res.status,
    };
  } catch (e: any) {
    if (__DEV__) {
      console.log('[connectivity] Public API failed:', e?.message || String(e));
    }
    return {
      ok: false,
      error: e?.message || String(e),
    };
  }
}

/**
 * Test if the API is reachable using fetch API (more compatible with React Native)
 */
async function testWithFetch(): Promise<{ ok: boolean; status?: number; error?: string }> {
  const url = `${API_BASE_URL.replace(/\/$/, '')}/`;
  try {
    if (__DEV__) {
      console.log('[connectivity] Testing with fetch API:', url);
    }
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (__DEV__) {
      console.log('[connectivity] Fetch response status:', res.status);
    }

    return {
      ok: res.status < 500,
      status: res.status,
    };
  } catch (e: any) {
    if (__DEV__) {
      console.log('[connectivity] Fetch failed:', e?.message || String(e));
    }
    return {
      ok: false,
      error: e?.message || String(e),
    };
  }
}

/**
 * Test if the API is reachable. Call this to diagnose "Network error" issues.
 */
export async function checkApiConnectivity(): Promise<ConnectivityResult> {
  // First test if ANY network request works with a public API
  if (__DEV__) {
    console.log('[connectivity] Starting network diagnostics...');
  }
  const publicApiResult = await testPublicApi();

  if (!publicApiResult.ok) {
    if (__DEV__) {
      console.warn('[connectivity] Basic network test failed - Expo Go may not have network permissions');
    }
    return {
      ok: false,
      error: 'Network unavailable - Please check Expo Go app permissions',
      details: `public-api-error: ${publicApiResult.error || 'unknown'}`,
    };
  }

  if (__DEV__) {
    console.log('[connectivity] Basic network test passed - testing your API...');
  }

  // First try with fetch API (more reliable in React Native)
  const fetchResult = await testWithFetch();

  // If fetch works but axios fails, it's an axios configuration issue
  if (fetchResult.ok) {
    return {
      ok: true,
      status: fetchResult.status,
      details: `HTTP ${fetchResult.status} (fetch)`,
    };
  }

  // Try with axios as well for comparison
  const url = `${API_BASE_URL.replace(/\/$/, '')}/`;
  try {
    if (__DEV__) {
      console.log('[connectivity] Testing with axios:', url);
    }
    const res = await axios.get(url, {
      timeout: 8000,
      headers: { Accept: 'application/json' },
      validateStatus: () => true,
    });

    if (__DEV__) {
      console.log('[connectivity] Axios response status:', res.status);
    }

    return {
      ok: res.status < 500,
      status: res.status,
      details: `HTTP ${res.status} (axios)`,
    };
  } catch (e: any) {
    const msg = e?.message || String(e);
    const code = e?.code;
    const details = [
      `message: ${msg}`,
      e?.name ? `name: ${e.name}` : '',
      code ? `code: ${code}` : '',
      fetchResult.error ? `fetch-error: ${fetchResult.error}` : '',
    ]
      .filter(Boolean)
      .join(', ');
    if (__DEV__) {
      console.warn('[connectivity] Check failed:', { url, error: e });
    }
    return {
      ok: false,
      error: msg,
      details,
    };
  }
}
