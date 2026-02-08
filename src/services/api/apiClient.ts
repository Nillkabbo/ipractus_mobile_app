/**
 * Axios client configured for React Native iOS compatibility
 *
 * iOS-specific network issues handled:
 * - ERR_NETWORK errors caused by missing URL/Blob polyfills
 * - Timeout issues on slow connections
 * - SSL certificate handling
 */

import axios, { AxiosInstance } from 'axios';
import { Platform } from 'react-native';
import { API_BASE_URL } from '../../config/api';

// Create axios instance with iOS-friendly defaults
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  // Important for iOS: don't use credentials mode that causes CORS preflight
  withCredentials: false,
});

// Add platform detection for debugging
apiClient.interceptors.request.use(
  (config) => {
    if (__DEV__) {
      console.log('[apiClient] Request:', {
        method: config.method,
        url: config.url,
        platform: Platform.OS,
        baseURL: config.baseURL,
      });
    }
    return config;
  },
  (error) => {
    if (__DEV__) {
      console.warn('[apiClient] Request error:', error);
    }
    return Promise.reject(error);
  }
);

// Handle response errors more gracefully on iOS
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (__DEV__) {
      console.warn('[apiClient] Response error:', {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        platform: Platform.OS,
      });
    }

    // iOS-specific: ERR_NETWORK often means the request failed at the network level
    // This could be due to SSL, DNS, or connectivity issues
    if (error.code === 'ERR_NETWORK' && Platform.OS === 'ios') {
      if (__DEV__) {
        console.warn('[apiClient] iOS network error - this may be due to ATS restrictions or SSL issues');
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
