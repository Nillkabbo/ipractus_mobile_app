/**
 * Route names for type-safe navigation
 */

// Auth stack routes
export const AUTH_ROUTES = {
  WELCOME: 'Welcome',
  ROLE: 'RoleSelection',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
  FORGOT_PASSWORD: 'ForgotPassword',
  FORGOT_EMAIL_SENT: 'ForgotEmailSent',
  SIGNUP_EMAIL_SENT: 'SignupEmailSent',
} as const;

// Main app tabs
export const TAB_ROUTES = {
  DASHBOARD: 'Dashboard',
  FEED: 'Feed',
  LIVE: 'Live',
  MESSAGES: 'Messages',
  PROFILE: 'Profile',
} as const;

// Dashboard stack routes
export const DASHBOARD_ROUTES = {
  MAIN: 'DashboardMain',
  SETTINGS: 'Settings',
  NOTIFICATIONS: 'Notifications',
} as const;

// Feed stack routes
export const FEED_ROUTES = {
  MAIN: 'FeedMain',
  POST_DETAIL: 'PostDetail',
  CREATE_POST: 'CreatePost',
} as const;

// Live stack routes
export const LIVE_ROUTES = {
  MAIN: 'LiveMain',
  GO_LIVE: 'GoLive',
  STREAM_DETAIL: 'StreamDetail',
} as const;

// Messages stack routes
export const MESSAGES_ROUTES = {
  MAIN: 'MessagesMain',
  CONVERSATION: 'Conversation',
  CONNECTIONS: 'Connections',
} as const;

// Profile stack routes
export const PROFILE_ROUTES = {
  MAIN: 'ProfileMain',
  EDIT_PROFILE: 'EditProfile',
  PRIVACY_SETTINGS: 'PrivacySettings',
  OTHER_PROFILE: 'OtherProfile',
} as const;

// Combined route types
export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
};

export type AuthStackParamList = {
  [AUTH_ROUTES.WELCOME]: undefined;
  [AUTH_ROUTES.ROLE]: undefined;
  [AUTH_ROUTES.LOGIN]: undefined;
  [AUTH_ROUTES.SIGNUP]: undefined;
  [AUTH_ROUTES.FORGOT_PASSWORD]: undefined;
  [AUTH_ROUTES.FORGOT_EMAIL_SENT]: { email?: string };
  [AUTH_ROUTES.SIGNUP_EMAIL_SENT]: { firstName?: string; lastName?: string; email?: string };
};

export type TabParamList = {
  [TAB_ROUTES.DASHBOARD]: undefined;
  [TAB_ROUTES.FEED]: undefined;
  [TAB_ROUTES.LIVE]: undefined;
  [TAB_ROUTES.MESSAGES]: undefined;
  [TAB_ROUTES.PROFILE]: undefined;
};

export type DashboardStackParamList = {
  [DASHBOARD_ROUTES.MAIN]: undefined;
  [DASHBOARD_ROUTES.SETTINGS]: undefined;
  [DASHBOARD_ROUTES.NOTIFICATIONS]: undefined;
};

export type FeedStackParamList = {
  [FEED_ROUTES.MAIN]: undefined;
  [FEED_ROUTES.POST_DETAIL]: { postId: string };
  [FEED_ROUTES.CREATE_POST]: undefined;
};

export type LiveStackParamList = {
  [LIVE_ROUTES.MAIN]: undefined;
  [LIVE_ROUTES.GO_LIVE]: undefined;
  [LIVE_ROUTES.STREAM_DETAIL]: { streamId: string };
};

export type MessagesStackParamList = {
  [MESSAGES_ROUTES.MAIN]: undefined;
  [MESSAGES_ROUTES.CONVERSATION]: { conversationId: string };
  [MESSAGES_ROUTES.CONNECTIONS]: undefined;
};

export type ProfileStackParamList = {
  [PROFILE_ROUTES.MAIN]: undefined;
  [PROFILE_ROUTES.EDIT_PROFILE]: undefined;
  [PROFILE_ROUTES.PRIVACY_SETTINGS]: undefined;
  [PROFILE_ROUTES.OTHER_PROFILE]: { userId: string };
};
