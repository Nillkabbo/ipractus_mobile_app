# Architecture

**Analysis Date:** 2025-02-05

## Pattern Overview

**Overall:** React Native Functional Component Architecture with Context Providers and React Navigation

**Key Characteristics:**
- Functional components with React Hooks
- Context-based state management (AuthContext, ThemeContext)
- React Navigation with dual-stack auth flow
- Separation of concerns: types, services, hooks, components, screens
- Theme-aware components with multi-theme support

## Layers

**Presentation Layer (Screens):**
- Purpose: UI screens that users interact with
- Location: `src/screens/`
- Contains: Screen components organized by feature (auth, dashboard, profile, feed, onboarding)
- Depends on: Context providers, hooks, components, services, navigation
- Used by: Navigation stacks

**Component Layer:**
- Purpose: Reusable UI components
- Location: `src/components/` and `src/theme/components/`
- Contains: Button, TextInput, Avatar, ThemedButton, ThemedCard, ThemedInput, etc.
- Depends on: Theme system, React Native primitives
- Used by: Screens and other components

**Navigation Layer:**
- Purpose: App navigation structure and routing
- Location: `src/navigators/`
- Contains: RootNavigator, AuthNavigator, AppNavigator
- Depends on: Auth state, Theme, React Navigation
- Used by: App entry point

**State Management Layer:**
- Purpose: Global application state
- Location: `src/contexts/`
- Contains: AuthContext, ThemeContext
- Depends on: Services (auth, storage), React Context API
- Used by: All layers via hooks

**Business Logic Layer (Services):**
- Purpose: API calls, data persistence, business logic
- Location: `src/services/`
- Contains: mockAuth, asyncStorage, secureStorage
- Depends on: External libraries (expo-secure-store, @react-native-async-storage)
- Used by: Context providers, hooks

**Data Abstraction Layer (Types):**
- Purpose: TypeScript type definitions
- Location: `src/types/`
- Contains: auth types, navigation types
- Depends on: None (pure type definitions)
- Used by: All layers

**Custom Hooks Layer:**
- Purpose: Reusable stateful logic
- Location: `src/hooks/`
- Contains: useAuth, useTheme, useBiometric
- Depends on: Context providers, expo-local-authentication
- Used by: Components and screens

**Configuration Layer:**
- Purpose: App-wide configuration and constants
- Location: `src/config/`, `src/constants/`
- Contains: theme config, colors, typography, spacing, routes
- Depends on: None
- Used by: All layers

## Data Flow

**Authentication Flow:**

1. User enters credentials in LoginScreen (`src/screens/auth/LoginScreen.tsx`)
2. signIn() called on AuthContext (`src/contexts/AuthContext.tsx`)
3. AuthContext calls mockAuth.login() (`src/services/auth/mockAuth.ts`)
4. Tokens stored in secureStorage (`src/services/storage/secureStorage.ts`)
5. User data stored in asyncStorage (`src/services/storage/asyncStorage.ts`)
6. AuthContext state updates (isAuthenticated, user)
7. RootNavigator detects auth state change and switches to AppNavigator
8. User is navigated to Dashboard tab

**Theme Switching Flow:**

1. User selects theme in Settings
2. setTheme() called on ThemeContext (`src/contexts/ThemeContext.tsx`)
3. Theme preference saved to AsyncStorage
4. ThemeContext state updates (themeType, isDark)
5. All components using useTheme() hook re-render with new theme
6. NavigationContainer theme prop updates

**Navigation Flow:**

1. App.tsx wraps app with ThemeProvider and AuthProvider
2. RootNavigator renders NavigationContainer
3. RootNavigator checks isAuthenticated from useAuth()
4. If authenticated: renders AppNavigator (bottom tabs)
5. If not authenticated: renders AuthNavigator (auth stack)
6. Each tab contains nested Stack Navigator for child screens

**State Management:**
- React Context API for global state (auth, theme)
- React useState for local component state
- AsyncStorage for persistent preferences
- SecureStore for sensitive data (tokens)

## Key Abstractions

**AuthContext Abstraction:**
- Purpose: Centralize authentication state and operations
- Examples: `src/contexts/AuthContext.tsx`
- Pattern: React Context with custom hook (useAuth)
- Provides: signIn, signUp, signOut, updateUser, isAuthenticated, user, isLoading

**ThemeContext Abstraction:**
- Purpose: Centralize theme state and switching
- Examples: `src/contexts/ThemeContext.tsx`, `src/theme/index.ts`
- Pattern: Multi-theme system with three variants (ipractus-light, ipractus-dark, pistachio)
- Provides: theme, themeType, setTheme, isDark, toggleTheme, getScreenTheme

**Navigation Abstraction:**
- Purpose: Type-safe navigation with centralized route constants
- Examples: `src/constants/routes.ts`, `src/types/navigation.ts`
- Pattern: Route constants + TypeScript ParamList types
- Enables: autocomplete and type-checking for navigation calls

**Storage Abstraction:**
- Purpose: Unified interface for persistent storage
- Examples: `src/services/storage/asyncStorage.ts`, `src/services/storage/secureStorage.ts`
- Pattern: Wrapper objects with getItem, setItem, deleteItem methods
- Separates: Sensitive (SecureStore) from non-sensitive (AsyncStorage) data

**Service Abstraction:**
- Purpose: Isolate API calls and business logic
- Examples: `src/services/auth/mockAuth.ts`
- Pattern: Service object with async methods returning typed responses
- Enables: Easy replacement of mock with real API in future phases

## Entry Points

**index.ts:**
- Location: `/Users/md.rakibulhasan/ipractus_mobile_app/index.ts`
- Triggers: App launch via expo-registerRootComponent
- Responsibilities: Register the root component with Expo

**App.tsx:**
- Location: `/Users/md.rakibulhasan/ipractus_mobile_app/App.tsx`
- Triggers: After index.ts registration
- Responsibilities:
  - Load custom fonts (Lexend)
  - Wrap app with ThemeProvider
  - Wrap app with AuthProvider
  - Render RootNavigator

**RootNavigator:**
- Location: `/Users/md.rakibulhasan/ipractus_mobile_app/src/navigators/RootNavigator.tsx`
- Triggers: Rendered by App.tsx
- Responsibilities:
  - Create NavigationContainer
  - Check authentication state
  - Conditionally render AuthNavigator or AppNavigator
  - Show loading state during auth check

## Error Handling

**Strategy:** Try-catch in async operations with user feedback

**Patterns:**
- **Service errors:** Caught in context providers, re-thrown for screens
- **Navigation errors:** Type-safe navigation prevents most errors
- **Storage errors:** Logged to console, null returned or default value used
- **User feedback:** Alert.alert() for authentication failures
- **Loading states:** isLoading boolean prevents actions during async operations

**Example from AuthContext:**
```typescript
try {
  await secureStorage.setItem(AUTH_KEYS.USER_TOKEN, response.tokens.accessToken);
  // ... more operations
} catch (error) {
  console.error('Failed to load stored session:', error);
}
```

## Cross-Cutting Concerns

**Logging:** console.error for exceptions, console.log for development debugging

**Validation:**
- Input validation at screen level (check for empty strings)
- Type safety via TypeScript throughout
- Zod dependency installed for future schema validation

**Authentication:**
- Dual-stack navigation pattern (auth vs app)
- Token-based authentication with mock JWT
- Biometric authentication support via expo-local-authentication
- Secure storage for tokens (expo-secure-store)

**Theming:**
- Three-theme system: ipractus-light (blue), ipractus-dark (navy), pistachio (green)
- Theme selection persisted to AsyncStorage
- Screen-specific theme overrides supported
- Design tokens from Google Stitch project

**Internationalization:**
- Not yet implemented
- Text strings hardcoded in components

**Accessibility:**
- AccessibilityLabel not consistently used
- semantic colors via theme system

---

*Architecture analysis: 2025-02-05*
