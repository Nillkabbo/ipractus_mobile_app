/**
 * Navigation types for React Navigation
 * These provide type safety for navigation.navigate() calls
 */

import type {
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

// Re-export route types from constants for convenience
export type {
  RootStackParamList,
  AuthStackParamList,
  TabParamList,
  DashboardStackParamList,
  FeedStackParamList,
  LiveStackParamList,
  MessagesStackParamList,
  ProfileStackParamList,
} from '../constants/routes';

// Re-export route constants
export {
  AUTH_ROUTES,
  TAB_ROUTES,
  DASHBOARD_ROUTES,
  FEED_ROUTES,
  LIVE_ROUTES,
  MESSAGES_ROUTES,
  PROFILE_ROUTES,
} from '../constants/routes';
