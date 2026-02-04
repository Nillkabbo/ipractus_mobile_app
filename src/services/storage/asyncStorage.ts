import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * AsyncStorage wrapper for unencrypted persistent storage.
 * Use for user preferences, theme selection, cache, and non-sensitive data.
 *
 * WARNING: Never store authentication tokens or sensitive data here.
 */
export const asyncStorage = {
  /**
   * Store a value.
   * @param key - Storage key
   * @param value - Value to store (will be JSON stringified if object)
   */
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(`AsyncStorage setItem failed for key: ${key}`, error);
      throw error;
    }
  },

  /**
   * Retrieve a value.
   * @param key - Storage key
   * @returns The stored value or null if not found
   */
  getItem: async (key: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(`AsyncStorage getItem failed for key: ${key}`, error);
      return null;
    }
  },

  /**
   * Delete a value.
   * @param key - Storage key
   */
  deleteItem: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`AsyncStorage deleteItem failed for key: ${key}`, error);
      throw error;
    }
  },

  /**
   * Clear all values from AsyncStorage.
   * Use this only for logout or data reset.
   */
  clear: async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('AsyncStorage clear failed', error);
      throw error;
    }
  },
};

// Storage keys for preferences
export const PREF_KEYS = {
  THEME_MODE: 'ipractus_theme_mode', // 'light' | 'dark' | 'system'
  ONBOARDING_COMPLETED: 'ipractus_onboarding_completed',
  BIOMETRIC_ENABLED: 'ipractus_biometric_enabled',
  USER_DATA: 'ipractus_user', // User profile data (non-sensitive)
} as const;
