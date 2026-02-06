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
 * Parse API error from response
 */
async function parseError(res: Response): Promise<ApiError> {
  let data: any = {};
  try {
    data = await res.json();
  } catch {
    data = { message: res.statusText || 'Request failed' };
  }
  return {
    status: res.status,
    message: data?.message || data?.detail || 'An error occurred',
    results: data?.results,
  };
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
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE_URL}/user/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    if (!res.ok) {
      const err = await parseError(res);
      throw new Error(err.message || err.results?.email?.[0] || 'Login failed');
    }

    const data = await res.json();
    const results = data?.results || data;

    // Handle 2FA - if two_factor.status is true, user needs OTP (not implemented in mobile yet)
    if (results?.two_factor?.status) {
      throw new Error('Two-factor authentication is required. Please use the web app to complete login.');
    }

    const token = results?.token || results;
    const profile = results?.profile || results;

    const user = mapProfileToUser(profile, token);
    const tokens = mapTokens(token);

    return { user, tokens };
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
