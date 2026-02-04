import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, AuthTokens } from '../types/auth';
import { mockAuth } from '../services/auth/mockAuth';
import { secureStorage, AUTH_KEYS } from '../services/storage/secureStorage';
import { asyncStorage, PREF_KEYS } from '../services/storage/asyncStorage';

interface AuthContextType {
  // State
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;

  // Methods
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string, role: 'athlete' | 'coach' | 'fan') => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  /**
   * Check for existing session on app start
   */
  useEffect(() => {
    loadStoredSession();
  }, []);

  /**
   * Load stored session from SecureStore
   */
  const loadStoredSession = async () => {
    try {
      const token = await secureStorage.getItem(AUTH_KEYS.USER_TOKEN);
      const userJson = await asyncStorage.getItem(PREF_KEYS.USER_DATA);

      if (token && userJson) {
        const storedUser = JSON.parse(userJson);
        setUser(storedUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Failed to load stored session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Sign in with email and password
   */
  const signIn = async (email: string, password: string) => {
    const response = await mockAuth.login({ email, password });

    // Store tokens securely
    await secureStorage.setItem(AUTH_KEYS.USER_TOKEN, response.tokens.accessToken);
    await secureStorage.setItem(AUTH_KEYS.REFRESH_TOKEN, response.tokens.refreshToken);

    // Store user data in AsyncStorage (non-sensitive)
    await asyncStorage.setItem(PREF_KEYS.USER_DATA, JSON.stringify(response.user));

    setUser(response.user);
    setIsAuthenticated(true);
  };

  /**
   * Sign up with email, password, display name, and role
   */
  const signUp = async (email: string, password: string, displayName: string, role: 'athlete' | 'coach' | 'fan') => {
    const response = await mockAuth.register({ email, password, displayName, role });

    // Store tokens securely
    await secureStorage.setItem(AUTH_KEYS.USER_TOKEN, response.tokens.accessToken);
    await secureStorage.setItem(AUTH_KEYS.REFRESH_TOKEN, response.tokens.refreshToken);

    // Store user data in AsyncStorage (non-sensitive)
    await asyncStorage.setItem(PREF_KEYS.USER_DATA, JSON.stringify(response.user));

    setUser(response.user);
    setIsAuthenticated(true);
  };

  /**
   * Sign out and clear all stored data
   */
  const signOut = async () => {
    try {
      // Call logout API
      await mockAuth.logout();

      // Clear secure storage
      await secureStorage.deleteItem(AUTH_KEYS.USER_TOKEN);
      await secureStorage.deleteItem(AUTH_KEYS.REFRESH_TOKEN);

      // Clear user data from AsyncStorage
      await asyncStorage.deleteItem(PREF_KEYS.USER_DATA);

      // Reset state
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  /**
   * Update user profile data
   */
  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
    asyncStorage.setItem(PREF_KEYS.USER_DATA, JSON.stringify(updatedUser));
  }, []);

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    user,
    signIn,
    signUp,
    signOut,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to access auth context
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
