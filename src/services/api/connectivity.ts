/**
 * Connectivity test for API - helps diagnose network issues
 */
import axios from 'axios/dist/browser/axios.cjs';
import { API_BASE_URL } from '../../config/api';

export interface ConnectivityResult {
  ok: boolean;
  error?: string;
  status?: number;
  details?: string;
}

/**
 * Test if the API is reachable. Call this to diagnose "Network error" issues.
 */
export async function checkApiConnectivity(): Promise<ConnectivityResult> {
  const url = `${API_BASE_URL.replace(/\/$/, '')}/`;
  try {
    const res = await axios.get(url, {
      timeout: 8000,
      headers: { Accept: 'application/json' },
      validateStatus: () => true,
    });
    return {
      ok: res.status < 500,
      status: res.status,
      details: `HTTP ${res.status}`,
    };
  } catch (e: any) {
    const msg = e?.message || String(e);
    const code = e?.code;
    const details = [
      `message: ${msg}`,
      e?.name ? `name: ${e.name}` : '',
      code ? `code: ${code}` : '',
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
