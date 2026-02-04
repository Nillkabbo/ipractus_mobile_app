import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

/**
 * SecureStorage wrapper for encrypted key-value storage.
 * Use for authentication tokens, API keys, and any sensitive data.
 *
 * NOTE: On web, we use AsyncStorage as a fallback since SecureStore is native-only.
 * For production web apps, consider using httpOnly cookies with proper security headers.
 *
 * WARNING: Never store sensitive data in AsyncStorage - it's unencrypted.
 * This is a development fallback for web only.
 */
export const secureStorage = {
  /**
   * Store a value securely (encrypted).
   * @param key - Storage key
   * @param value - Value to store (will be JSON stringified if object)
   */
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      if (Platform.OS === 'web') {
        // Fallback for web - use AsyncStorage
        await AsyncStorage.setItem(key, value);
      } else {
        await SecureStore.setItemAsync(key, value);
      }
    } catch (error) {
      console.error(`SecureStore setItem failed for key: ${key}`, error);
      throw error;
    }
  },

  /**
   * Retrieve a value securely.
   * @param key - Storage key
   * @returns The stored value or null if not found
   */
  getItem: async (key: string): Promise<string | null> => {
    try {
      if (Platform.OS === 'web') {
        // Fallback for web - use AsyncStorage
        return await AsyncStorage.getItem(key);
      } else {
        return await SecureStore.getItemAsync(key);
      }
    } catch (error) {
      console.error(`SecureStore getItem failed for key: ${key}`, error);
      return null;
    }
  },

  /**
   * Delete a value securely.
   * @param key - Storage key
   */
  deleteItem: async (key: string): Promise<void> => {
    try {
      if (Platform.OS === 'web') {
        // Fallback for web - use AsyncStorage
        await AsyncStorage.removeItem(key);
      } else {
        await SecureStore.deleteItemAsync(key);
      }
    } catch (error) {
      console.error(`SecureStore deleteItem failed for key: ${key}`, error);
      throw error;
    }
  },

  /**
   * Check if a key exists in secure storage.
   * @param key - Storage key
   */
  hasKey: async (key: string): Promise<boolean> => {
    try {
      if (Platform.OS === 'web') {
        // Fallback for web - use AsyncStorage
        const value = await AsyncStorage.getItem(key);
        return value !== null;
      } else {
        const value = await SecureStore.getItemAsync(key);
        return value !== null;
      }
    } catch (error) {
      console.error(`SecureStore hasKey failed for key: ${key}`, error);
      return false;
    }
  },
};

// Storage keys for authentication
export const AUTH_KEYS = {
  USER_TOKEN: 'ipractus_user_token',
  REFRESH_TOKEN: 'ipractus_refresh_token',
  BIOMETRIC_CREDENTIALS: 'ipractus_biometric_credentials', // Encrypted email/password for biometric login
} as const;
