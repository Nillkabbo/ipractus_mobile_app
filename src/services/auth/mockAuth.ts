import { User, LoginCredentials, RegisterData, AuthResponse, MOCK_USERS } from '../../types/auth';

/**
 * Simulated network delay for realistic API behavior
 */
const SIMULATED_DELAY = 500;

/**
 * Simulate network delay
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generate a fake JWT token (mock only - not valid)
 */
const generateMockToken = (userId: string): string => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    userId,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  }));
  const signature = 'mock_signature';
  return `${header}.${payload}.${signature}`;
};

/**
 * Create a mock user from registration data
 */
const createMockUser = (data: RegisterData): User => ({
  id: Date.now().toString(),
  email: data.email,
  displayName: data.displayName,
  role: data.role,
  createdAt: new Date().toISOString(),
});

/**
 * Mock authentication service for Phase 1 development.
 * This simulates a real API by accepting any credentials and returning fake data.
 *
 * In later phases, this will be replaced with actual API calls.
 */
export const mockAuth = {
  /**
   * Authenticate with email and password.
   * Accepts ANY email/password combination for mock purposes.
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await delay(SIMULATED_DELAY);

    // Find existing mock user or create a default one
    let user = MOCK_USERS.find(u => u.email === credentials.email);

    if (!user) {
      // Create a temporary user for the session
      user = {
        id: Date.now().toString(),
        email: credentials.email,
        displayName: credentials.email.split('@')[0],
        role: 'fan', // Default role for mock login
        createdAt: new Date().toISOString(),
      };
    }

    const tokens = {
      accessToken: generateMockToken(user.id),
      refreshToken: generateMockToken(user.id),
    };

    return { user, tokens };
  },

  /**
   * Register a new user account.
   * In mock mode, accepts any valid registration data.
   */
  register: async (data: RegisterData): Promise<AuthResponse> => {
    await delay(SIMULATED_DELAY);

    const user = createMockUser(data);
    const tokens = {
      accessToken: generateMockToken(user.id),
      refreshToken: generateMockToken(user.id),
    };

    return { user, tokens };
  },

  /**
   * Log out the current user.
   * In mock mode, this just returns success.
   */
  logout: async (): Promise<void> => {
    await delay(SIMULATED_DELAY);
    // In a real app, this would invalidate the token on the server
  },

  /**
   * Get the current user profile.
   * In mock mode, returns the first mock user.
   */
  getCurrentUser: async (userId: string): Promise<User> => {
    await delay(SIMULATED_DELAY);

    const user = MOCK_USERS.find(u => u.id === userId);
    if (user) return user;

    // Return default user if not found
    return {
      id: userId,
      email: 'user@example.com',
      displayName: 'iPractus User',
      role: 'fan',
      createdAt: new Date().toISOString(),
    };
  },
};
