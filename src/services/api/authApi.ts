import axios from 'axios/dist/browser/axios.cjs';
import { API_BASE_URL } from '../../config/api';
import { User, AuthResponse, LoginCredentials, AuthTokens } from '../../types/auth';

export interface RegisterPayload {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  dob: string;
  gender: string;
  password: string;
  timezone?: string;
  city?: string;
  state?: string;
}

export interface ForgotPasswordPayload {
  email?: string;
  username?: string;
}

interface ApiError {
  status: number;
  message?: string;
  results?: Record<string, string[]>;
}

/**
 * Parse API error from response - matches sports-frontend authFetch + common backend formats
 */
async function parseError(res: Response): Promise<ApiError> {
  let data: any = {};
  try {
    data = await res.json();
  } catch {
    data = { message: res.statusText || 'Request failed' };
  }
  // Extract message from various backend formats (Django REST, custom, etc.)
  const results = data?.results;
  const msg =
    data?.message ||
    data?.detail ||
    data?.error ||
    (Array.isArray(data?.non_field_errors) && data.non_field_errors[0]) ||
    (results && Array.isArray(results?.non_field_errors) && results.non_field_errors[0]) ||
    (results && typeof results === 'object' && results?.email?.[0]) ||
    (results && typeof results === 'object' && results?.username?.[0]) ||
    (results && typeof results === 'object' && results?.password?.[0]) ||
    res.statusText ||
    'An error occurred';
  return {
    status: res.status,
    message: typeof msg === 'string' ? msg : 'An error occurred',
    results: typeof results === 'object' ? results : undefined,
  };
}

/**
 * Get user-facing login error message from API error
 */
function getLoginErrorMessage(err: ApiError): string {
  const hasMsg = err.message && err.message !== 'An error occurred';
  if (err.status === 401) {
    if (err.message?.toLowerCase().includes('verif') || err.message?.toLowerCase().includes('verify')) {
      return 'Your account is not verified. Please check your email.';
    }
    return hasMsg ? (err.message ?? '') : 'Account name and password does not match.';
  }
  if (err.status === 400 || err.status === 403) {
    return hasMsg ? (err.message ?? '') : 'Account name and password does not match.';
  }
  if (err.status === 404) {
    return 'Service unavailable. Please try again later.';
  }
  if (err.status === 0 || err.message?.toLowerCase().includes('network')) {
    return 'Network error. Please check your internet connection.';
  }
  return hasMsg ? (err.message ?? '') : `Login failed (${err.status}). Please try again.`;
}

/**
 * Map backend profile to our User type
 */
function mapProfileToUser(profile: any, tokenData?: any): User {
  const id = profile?.id?.toString() || profile?.user_id?.toString() || '';
  const email = profile?.email || '';
  const displayName = [profile?.first_name, profile?.last_name].filter(Boolean).join(' ') || email?.split('@')[0] || 'User';
  const role = Array.isArray(profile?.role)
    ? (profile.role[0] === 1 ? 'athlete' : profile.role[0] === 2 ? 'coach' : 'fan')
    : 'fan';

  return {
    id,
    email,
    displayName,
    username: profile?.username,
    bio: profile?.bio,
    avatarUri: profile?.profile_picture,
    role,
    sport: profile?.sport,
    location: profile?.city || profile?.location,
    createdAt: profile?.created_at || new Date().toISOString(),
  };
}

/**
 * Map backend token response to AuthTokens
 */
function mapTokens(tokenData: any): AuthTokens {
  return {
    accessToken: tokenData?.access || tokenData?.access_token || tokenData?.accessToken || '',
    refreshToken: tokenData?.refresh || tokenData?.refresh_token || tokenData?.refreshToken || '',
  };
}

/**
 * Real auth API service - connects to iPractus backend
 */
export const authApi = {
  /**
   * Login with email/username and password
   * Uses axios - same as sports-frontend - often works where fetch fails (CORS, SSL, etc.)
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const body = {
      email: credentials.email.trim(),
      password: credentials.password,
    };
    const url = `${API_BASE_URL}/user/authenticate`;

    try {
      const res = await axios.post(url, body, {
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'User-Agent': 'iPractus-Mobile/1.0',
        },
        validateStatus: () => true,
      });

      const data = res.data;
      const status = res.status;

      if (status !== 200 && status !== 201) {
        const err: ApiError = {
          status: res.status,
          message: data?.message || data?.detail || data?.error || res.statusText,
          results: data?.results,
        };
        if (__DEV__) console.warn('[authApi.login] API error:', status, err);
        throw new Error(getLoginErrorMessage(err));
      }

      const results = data?.results || data;

      if (data?.status && data.status >= 400) {
        const errMsg = data?.message || data?.detail || 'Login failed.';
        if (__DEV__) console.warn('[authApi.login] 200 with error body:', data);
        throw new Error(errMsg);
      }

      if (results?.two_factor?.status) {
        throw new Error('Two-factor authentication is required. Please use the web app to complete login.');
      }

      const token = results?.token || results;
      const profile = results?.profile || results;
      const tokens = mapTokens(token);

      if (!tokens.accessToken) {
        if (__DEV__) console.warn('[authApi.login] No token in response:', data);
        throw new Error('Invalid response from server. Please try again.');
      }

      const user = mapProfileToUser(profile, token);
      return { user, tokens };
    } catch (err: any) {
      if (err instanceof Error && !axios.isAxiosError(err)) {
        throw err;
      }
      const axiosErr = err as { response?: { status: number; data?: any }; message?: string; code?: string };
      if (axiosErr.response) {
        const data = axiosErr.response.data || {};
        const apiErr: ApiError = {
          status: axiosErr.response.status,
          message: data?.message || data?.detail || data?.error || 'Request failed',
          results: data?.results,
        };
        throw new Error(getLoginErrorMessage(apiErr));
      }
      const msg = axiosErr?.message || String(axiosErr);
      const code = axiosErr?.code;
      if (__DEV__) {
        console.warn('[authApi.login] Request failed:', { message: msg, code, url });
      }
      if (code === 'ECONNABORTED') {
        throw new Error('Request timed out. Please check your internet connection.');
      }
      if (/network|failed|ECONNREFUSED|ENOTFOUND|ETIMEDOUT|EAI_AGAIN/i.test(msg) || code === 'ERR_NETWORK') {
        throw new Error('Network error. Please check your internet connection.');
      }
      throw new Error(msg || 'Connection failed. Please try again.');
    }
  },

  /**
   * Register a new user
   */
  async register(payload: RegisterPayload): Promise<{ status: number }> {
    const body = {
      ...payload,
      timezone: payload.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    const res = await fetch(`${API_BASE_URL}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await parseError(res);
      const firstError =
        err.results?.email?.[0] ||
        err.results?.username?.[0] ||
        err.results?.first_name?.[0] ||
        err.results?.password?.[0] ||
        err.results?.non_field_errors?.[0] ||
        err.message;
      throw new Error(firstError || 'Registration failed');
    }

    return { status: res.status };
  },

  /**
   * Request password reset - sends email/link to user.
   * Backend accepts username; we send as username (email can work if backend supports it).
   */
  async forgotPassword(payload: ForgotPasswordPayload): Promise<{ message?: string }> {
    const body = payload.username
      ? { username: payload.username }
      : { username: payload.email }; // Backend expects username; try email as fallback

    const res = await fetch(`${API_BASE_URL}/login/forget/password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok || data?.message === 'success') {
      return { message: 'success' };
    }

    const err = await parseError(res);
    const msg = err.results?.username?.[0] || err.results?.email?.[0] || err.message;
    throw new Error(msg || 'Failed to send reset instructions');
  },

  /**
   * Logout - invalidate token on server (if backend supports it)
   */
  async logout(): Promise<void> {
    // Backend may not have logout endpoint - clear local tokens is enough
  },
};
