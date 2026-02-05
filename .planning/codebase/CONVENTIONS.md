# Coding Conventions

**Analysis Date:** 2025-02-05

## Naming Patterns

**Files:**
- Components: PascalCase with `.tsx` extension - `Button.tsx`, `TextInput.tsx`, `Avatar.tsx`
- Screens: PascalCase with `Screen` suffix - `LoginScreen.tsx`, `SignupScreen.tsx`, `DashboardScreen.tsx`
- Navigators: PascalCase with `Navigator` suffix - `RootNavigator.tsx`, `AuthNavigator.tsx`, `AppNavigator.tsx`
- Hooks: camelCase with `use` prefix - `useAuth.ts`, `useTheme.ts`, `useBiometric.ts`
- Services: camelCase - `mockAuth.ts`, `asyncStorage.ts`, `secureStorage.ts`
- Types: camelCase - `auth.ts`, `navigation.ts`
- Constants: camelCase - `colors.ts`, `routes.ts`, `spacing.ts`, `typography.ts`
- Contexts: PascalCase with `Context` suffix - `AuthContext.tsx`, `ThemeContext.tsx`

**Functions:**
- camelCase for all functions - `signIn`, `signUp`, `loadStoredSession`, `handleLogin`, `getButtonStyle`
- Event handlers prefix with `handle` - `handleLogin`, `handleSignup`, `handleBiometricLogin`
- Getter functions prefix with `get` - `getButtonStyle`, `getTextStyle`

**Variables:**
- camelCase for all variables - `isAuthenticated`, `isLoading`, `biometricAvailable`
- Boolean flags prefix with `is/has` - `isAuthenticated`, `isLoading`, `biometricAvailable`, `isEnrolled`
- Constants: SCREAMING_SNAKE_CASE - `AUTH_ROUTES`, `TAB_ROUTES`, `PREF_KEYS`, `AUTH_KEYS`

**Types:**
- Interfaces: PascalCase - `User`, `AuthTokens`, `LoginCredentials`, `AuthContextType`, `ButtonProps`
- Type aliases: PascalCase - `UserRole`, `ThemeMode`
- Generic types: PascalCase with `T` prefix or descriptive names - `ViewStyle`, `TextStyle`, `React.FC`

## Code Style

**Formatting:**
- No explicit formatter configuration detected (no `.prettierrc`, `.eslintrc`, or `biome.json`)
- Single quotes for strings in some files, double quotes in others - inconsistent
- 2-space indentation observed across files
- Semicolons used consistently

**Linting:**
- No ESLint or Biome configuration detected
- TypeScript strict mode enabled in `tsconfig.json`

**Import Organization:**
1. React and core framework imports
2. Third-party library imports (`@react-navigation`, `expo-*`, `react-native`)
3. Internal imports (absolute paths from `src/`)
4. Type imports (inline with `import type`)

**Path Aliases:**
- No path aliases configured in `tsconfig.json`
- All imports use relative paths from `src/` - e.g., `import { useAuth } from '../../hooks/useAuth'`

**Import Patterns:**
- Grouped by source with blank line separators
```typescript
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from '../../components/TextInput';
import { Button } from '../../components/Button';
```

## Error Handling

**Patterns:**
- Try-catch blocks for async operations that may fail
- Console error logging with descriptive messages - `console.error('Failed to load stored session:', error)`
- Alert dialogs for user-facing errors using `Alert.alert(title, message)`
- Rethrow errors after logging in service layers for caller handling
- Silent failure with null return in some storage operations (e.g., `asyncStorage.getItem` returns `null` on error)

**Examples:**
```typescript
// Service layer - rethrow after logging
try {
  await AsyncStorage.setItem(key, value);
} catch (error) {
  console.error(`AsyncStorage setItem failed for key: ${key}`, error);
  throw error;
}

// Component layer - show user-friendly alert
try {
  await signIn(email, password);
} catch (error) {
  Alert.alert('Login Failed', 'Please check your credentials and try again');
} finally {
  setLoading(false);
}
```

## Logging

**Framework:** `console` (console.error, console.log)

**Patterns:**
- Use `console.error` for error conditions with context
- No structured logging framework detected
- No log levels or categories implemented
- Errors include context in messages - e.g., `Failed to load stored session:`

## Comments

**When to Comment:**
- JSDoc-style comments on exported functions, interfaces, and types describing purpose and parameters
- File-level comments explaining module purpose
- Inline comments for non-obvious logic
- Security warnings where critical (e.g., in storage files)

**JSDoc/TSDoc:**
- Used extensively for type definitions and service functions
- Includes `@param` and `@returns` annotations
- Describes function behavior not evident from signature

**Examples:**
```typescript
/**
 * Check for existing session on app start
 */
useEffect(() => {
  loadStoredSession();
}, []);

/**
 * Store a value securely (encrypted).
 * @param key - Storage key
 * @param value - Value to store
 */
setItem: async (key: string, value: string): Promise<void> => {
  // ...
}
```

## Function Design

**Size:**
- No explicit size guidelines enforced
- Functions typically 10-50 lines
- Larger functions split into smaller helpers (e.g., `getButtonStyle()`, `getTextStyle()`)

**Parameters:**
- Destructured props in function parameters for components - `({ title, onPress, variant })`
- Object parameters for complex data - `signIn(email, password)` vs `signIn({ email, password })`
- Optional parameters with default values - `variant = 'primary'`, `size = 80`

**Return Values:**
- Explicit return types on most functions
- Async functions return `Promise<T>`
- Hook functions return typed objects or primitive values

## Module Design

**Exports:**
- Named exports preferred - `export const Button: React.FC<ButtonProps>`
- Default export used for App component only - `export default function App()`
- Re-exports from barrel files - `export { useAuth, AuthProvider } from '../contexts/AuthContext'`

**Barrel Files:**
- Used in hooks directory - `src/hooks/useAuth.ts`, `src/hooks/useTheme.ts`
- Used in types directory - `src/types/navigation.ts` re-exports from routes
- Pattern: Re-export related items for cleaner imports

**Component Structure:**
- Component function first, followed by `StyleSheet.create` for styles
- Props interface defined above component
- Styles object at bottom of file with `const styles = StyleSheet.create({...})`

**Screen Structure:**
```typescript
// 1. Imports
// 2. Component function
export const ScreenName: React.FC = () => {
  // Hooks at top
  const { theme } = useTheme();
  const [state, setState] = useState();

  // Handler functions
  const handleAction = async () => { ... };

  // Render return
  return ( ... );
};

// 3. Styles at bottom
const styles = StyleSheet.create({ ... });
```

## TypeScript Patterns

**Type Safety:**
- Strict mode enabled in `tsconfig.json`
- Explicit typing for all function parameters and return values
- `React.FC<Type>` used for function components with props
- Type assertions used sparingly - `as any` in navigation calls (not ideal)

**Interface vs Type:**
- Interfaces used for object shapes and component props
- Type aliases used for unions and literals
- `as const` used for frozen objects and constants

**Typing Examples:**
```typescript
// Interface for props
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
}

// Type alias for unions
type UserRole = 'athlete' | 'coach' | 'fan';

// Const assertion for constants
export const AUTH_ROUTES = {
  WELCOME: 'Welcome',
  LOGIN: 'Login',
} as const;

// Function component with props
export const Button: React.FC<ButtonProps> = ({ title, onPress }) => { ... };
```

## React Patterns

**Hooks:**
- Custom hooks created for reusable logic - `useAuth`, `useTheme`, `useBiometricAuth`
- Context hooks exported with providers - `useAuth` from `AuthContext`
- Hook calls at top of component functions

**State Management:**
- Context API for global state (auth, theme)
- Local useState for component-specific state
- useCallback for memoized callbacks in contexts

**Component Patterns:**
- Functional components only (no class components)
- Props destructured in parameters
- TypeScript interfaces for all props
- Theme consumption via `useTheme` hook

**Style Patterns:**
- `StyleSheet.create()` for component styles
- Dynamic styles via functions - `getButtonStyle()`
- Theme colors applied dynamically - `backgroundColor: theme.colors.background`

## Platform-Specific Code

**Platform Checks:**
```typescript
import { Platform } from 'react-native';

if (Platform.OS === 'web') {
  // Web-specific code
} else {
  // Native-specific code
}
```

**Fallbacks:**
- Web fallbacks for native-only modules (e.g., SecureStore falls back to AsyncStorage on web)

---

*Convention analysis: 2025-02-05*
