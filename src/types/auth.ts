/**
 * User role in the iPractus platform
 */
export type UserRole = 'athlete' | 'coach' | 'fan';

/**
 * User profile data structure
 */
export interface User {
  id: string;
  email: string;
  displayName: string;
  username?: string;
  bio?: string;
  avatarUri?: string;
  role: UserRole;
  sport?: string;
  location?: string;
  createdAt: string;
}

/**
 * Authentication tokens
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * Login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Registration data
 */
export interface RegisterData {
  email: string;
  password: string;
  displayName: string;
  role: UserRole;
}

/**
 * Authentication response
 */
export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

/**
 * Mock user data for development
 */
export const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'athlete@example.com',
    displayName: 'Alex Athlete',
    username: 'alexathlete',
    bio: 'Professional basketball player',
    role: 'athlete',
    sport: 'Basketball',
    location: 'Los Angeles, CA',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'coach@example.com',
    displayName: 'Coach Smith',
    username: 'coachsmith',
    bio: 'Basketball coach with 10 years experience',
    role: 'coach',
    sport: 'Basketball',
    location: 'Chicago, IL',
    createdAt: new Date().toISOString(),
  },
];
