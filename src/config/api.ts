/**
 * API configuration for iPractus backend
 *
 * DEVELOPMENT MODE: Using HTTP to bypass React Native SSL certificate validation issues in Expo Go.
 *
 * For production builds or when using a development build (not Expo Go), change to:
 * - https://be.ipractus.com/api
 *
 * To override with environment variable:
 * - EXPO_PUBLIC_API_BASE=https://your-api-url.com/api
 */
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE || 'https://be.ipractus.com/api';
