# Phase 1: Foundation + Auth + Navigation - Research

**Researched:** 2026-02-04
**Domain:** React Native Expo SDK 52 (Authentication, Navigation, Theme System)
**Confidence:** HIGH

## Summary

This phase establishes the foundational infrastructure for the iPractus mobile app using React Native Expo SDK 52. Research confirms that the standard stack for Expo authentication and navigation in 2026 consists of React Navigation 7.x for navigation, Expo SecureStore for secure token storage, expo-local-authentication for biometrics, expo-image-picker for avatar uploads, and React Context API for state management.

The research identifies several critical patterns: (1) Authentication flows should use a dual-stack navigation pattern (auth stack vs. app stack) switched via AuthContext, (2) Theme system should leverage React Navigation's built-in theming with useColorScheme hook for system preference detection, (3) SecureStore MUST be used for authentication tokens rather than AsyncStorage due to encryption requirements, and (4) Biometric authentication requires expo-local-authentication with proper permission configuration in app.json.

A key finding is that React Navigation 7.x now supports static configuration by default, which significantly reduces boilerplate and simplifies TypeScript types compared to the legacy dynamic configuration. The phase context from Stitch designs (35 screens) provides detailed design tokens including the Lexend font family, #137fec primary blue color, and dark-mode-first theme approach.

**Primary recommendation:** Use React Navigation 7.x with static configuration, implement AuthContext with SecureStore for session management, and create a ThemeProvider using React Navigation's theme system synced with useColorScheme for system-aware dark/light mode.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Expo SDK | 52 | Core framework | Latest stable SDK with React Native 0.76, New Architecture opt-in, enhanced EAS Build support |
| React Navigation | 7.x | Navigation | Industry standard, supports static config (new in v7), built-in theming, excellent TypeScript support |
| @react-navigation/bottom-tabs | 7.x | Bottom tab navigation | Official navigator, lazy loading, comprehensive customization options |
| @react-navigation/native-stack | 7.x | Stack navigation | Native performance, platform-specific transitions, header customization |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| expo-secure-store | ~15.0.8 | Encrypted key-value storage | Authentication tokens, sensitive data (REQUIRED for auth) |
| @react-native-async-storage/async-storage | 2.2.0 | Unencrypted persistent storage | User preferences, theme selection, non-sensitive data |
| expo-local-authentication | Latest | Biometric auth | Face ID/Touch ID for quick login (AUTH-03) |
| expo-image-picker | Latest | Image selection | Avatar upload from gallery/camera (PROF-03) |
| @expo/vector-icons | 15.x | Icon library | Built-in to Expo, includes Ionicons, MaterialIcons, FontAwesome |
| @expo-google-fonts/lexend | Latest | Custom font | Matches Stitch design specification |
| React Hook Form + Zod | Latest | Form validation | Email/password forms, profile editing (recommended pattern) |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| React Navigation | Expo Router | Router is file-based (good for simple apps), Navigation is component-based (better for complex auth flows) |
| SecureStore | AsyncStorage | AsyncStorage is NOT encrypted, security risk for auth tokens |
| React Context | Zustand/Redux | Context is sufficient for auth/theme in Phase 1, can migrate to Zustand if state grows complex |
| Formik + Yup | React Hook Form + Zod | RHF is more performant, Zod has better TypeScript inference |

**Installation:**
```bash
# Core navigation
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context

# Navigators
npm install @react-navigation/native-stack @react-navigation/bottom-tabs

# Storage and auth
npx expo install expo-secure-store
npx expo install @react-native-async-storage/async-storage
npx expo install expo-local-authentication

# Image handling
npx expo install expo-image-picker

# Fonts
npm install @expo-google-fonts/lexend expo-font

# Forms (optional but recommended)
npm install react-hook-form zod @hookform/resolvers
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── Avatar/         # Avatar display component
│   ├── Button/         # Custom button variants
│   ├── Input/          # Text inputs with validation
│   └── ThemeProvider/  # Theme context provider
├── config/             # Configuration files
│   ├── theme.ts        # Theme definitions (light/dark)
│   └── navigation.ts   # Navigation configuration
├── constants/          # App constants
│   ├── colors.ts       # Color tokens from Stitch
│   ├── typography.ts   # Font definitions
│   └── routes.ts       # Route names
├── contexts/           # React Context providers
│   ├── AuthContext.tsx # Authentication state & methods
│   └── ThemeContext.tsx # Theme state & toggle
├── hooks/              # Custom hooks
│   ├── useAuth.ts      # Auth context hook
│   ├── useTheme.ts     # Theme context hook
│   └── useBiometric.ts # Biometric auth hook
├── navigators/         # Navigator configurations
│   ├── AuthNavigator.tsx    # Login/Signup stack
│   ├── AppNavigator.tsx     # Main tab navigator
│   └── RootNavigator.tsx    # Auth/app switcher
├── screens/            # Screen components
│   ├── auth/           # Authentication screens
│   │   ├── WelcomeScreen.tsx
│   │   ├── RoleSelectionScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── SignUpScreen.tsx
│   │   └── ForgotPasswordScreen.tsx
│   ├── profile/        # Profile screens
│   │   ├── ProfileScreen.tsx
│   │   ├── EditProfileScreen.tsx
│   │   └── PrivacySettingsScreen.tsx
│   └── dashboard/      # Main dashboard
│       └── DashboardScreen.tsx
├── services/           # API and business logic
│   ├── auth/           # Mock auth service (Phase 1)
│   │   └── mockAuth.ts
│   └── storage/        # Storage abstraction
│       ├── secureStorage.ts  # SecureStore wrapper
│       └── asyncStorage.ts   # AsyncStorage wrapper
├── types/              # TypeScript types
│   ├── auth.ts
│   ├── navigation.ts
│   └── theme.ts
└── utils/              # Utility functions
    ├── validation.ts   # Form validation schemas
    └── biometric.ts    # Biometric helpers
```

### Pattern 1: Authentication Flow with Dual Stack Navigation
**What:** Separate navigators for authenticated vs. unauthenticated state, switched via AuthContext
**When to use:** Any app requiring login before accessing main features
**Example:**
```typescript
// Source: https://reactnavigation.org/docs/auth-flow/
import { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app start
    SecureStore.getItemAsync('userToken')
      .then(token => {
        if (token) setIsAuthenticated(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const signIn = async (email: string, password: string) => {
    // Mock authentication - replace with real API in later phases
    const token = 'mock-jwt-token';
    await SecureStore.setItemAsync('userToken', token);
    setIsAuthenticated(true);
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('userToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// Root navigation switcher
const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <SplashScreen />;
  }

  return isAuthenticated ? <AppNavigator /> : <AuthNavigator />;
};
```

### Pattern 2: Theme Provider with System Preference Detection
**What:** Centralized theme management using React Navigation's theme system
**When to use:** Apps requiring dark/light mode with system preference support
**Example:**
```typescript
// Source: https://reactnavigation.org/docs/themes/
import { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  themeMode: ThemeMode;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  theme: typeof DefaultTheme;
}

const ThemeContext = createContext<ThemeContextType>(null!);

const customLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#137fec',
    background: '#ffffff',
    card: '#f5f5f5',
    text: '#000000',
    border: '#e0e0e0',
  },
};

const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#137fec',
    background: '#000000',
    card: '#1a1a1a',
    text: '#ffffff',
    border: '#333333',
  },
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');

  useEffect(() => {
    // Load saved theme preference
    AsyncStorage.getItem('themeMode').then(saved => {
      if (saved) setThemeModeState(saved as ThemeMode);
    });
  }, []);

  const setThemeMode = async (mode: ThemeMode) => {
    setThemeModeState(mode);
    await AsyncStorage.setItem('themeMode', mode);
  };

  const isDark = themeMode === 'system'
    ? systemScheme === 'dark'
    : themeMode === 'dark';

  const theme = isDark ? customDarkTheme : customLightTheme;

  return (
    <ThemeContext.Provider value={{ themeMode, isDark, setThemeMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```

### Pattern 3: Biometric Authentication Wrapper
**What:** Helper hook for biometric authentication with proper error handling
**When to use:** Adding Face ID/Touch ID quick login feature
**Example:**
```typescript
// Source: https://docs.expo.dev/versions/latest/sdk/local-authentication/
import * as LocalAuthentication from 'expo-local-authentication';

export const useBiometricAuth = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    LocalAuthentication.hasHardwareAsync().then(setIsAvailable);
    LocalAuthentication.isEnrolledAsync().then(setIsEnrolled);
  }, []);

  const authenticate = async () => {
    if (!isAvailable || !isEnrolled) return false;

    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access iPractus',
        fallbackLabel: 'Use password',
      });
      return result.success;
    } catch (error) {
      console.error('Biometric auth failed:', error);
      return false;
    }
  };

  return { isAvailable, isEnrolled, authenticate };
};
```

### Anti-Patterns to Avoid
- **Storing auth tokens in AsyncStorage:** AsyncStorage is unencrypted. Use SecureStore for any sensitive data.
- **Using dynamic React Navigation config without justification:** Static config (v7 default) reduces boilerplate and improves TypeScript support.
- **Prop drilling auth state:** Use React Context (AuthContext) to provide auth state to all screens.
- **Hard-coding theme values everywhere:** Create a central theme configuration and use React Navigation's theme system.
- **Ignoring loading states during auth check:** Always show splash screen while verifying stored credentials on app start.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Secure key-value storage | Custom encryption wrapper | expo-secure-store | Platform-specific keychain integration, handles edge cases |
| Bottom tab navigation | Custom tab component | @react-navigation/bottom-tabs | Lazy loading, deep linking, accessibility, platform conventions |
| Theme management | Manual prop passing | React Navigation theme + Context | Built-in navigator support, system preference detection |
| Form validation | Manual validation logic | React Hook Form + Zod | Reduced re-renders, TypeScript inference, battle-tested |
| Image picker | Custom camera/gallery UI | expo-image-picker | Permission handling, multi-platform, crop/edit support |
| Icon font loading | Manual font linking | @expo/vector-icons | Pre-loaded with popular icon sets, auto-glyph mapping |
| Biometric auth | Platform-specific code | expo-local-authentication | Unified API across Face ID/Touch ID/Fingerprint |

**Key insight:** Each of these problems has platform-specific nuances (iOS Keychain vs Android Keystore, Face ID vs Touch ID, etc.). Hand-rolled solutions inevitably miss edge cases. The ecosystem libraries are tested across thousands of apps and handle these differences correctly.

## Common Pitfalls

### Pitfall 1: Theme Not Syncing Across App and Navigation
**What goes wrong:** Custom theme works in screens but navigator headers/tab bars remain default colors
**Why it happens:** Forgetting to pass theme prop to NavigationContainer or using screen-level styling instead of theme configuration
**How to avoid:** Always wrap NavigationContainer with your theme provider and pass the theme object as a prop:
```typescript
<NavigationContainer theme={theme}>
  <RootNavigator />
</NavigationContainer>
```
**Warning signs:** Header colors don't match screen backgrounds, tab bar ignores theme changes

### Pitfall 2: Biometric Auth Not Working in Expo Go
**What goes wrong:** Face ID prompt never appears, authentication fails silently
**Why it happens:** expo-local-authentication requires NSFaceIDUsageDescription in app.json, which Expo Go doesn't have
**How to avoid:** Always test biometric features in development build (eas build --profile development), not Expo Go
**Warning signs:** Biometric authentication works on Android but not iOS, or vice versa

### Pitfall 3: AsyncStorage Used for Sensitive Data
**What goes wrong:** App passes security review but data is vulnerable to device compromise
**Why it happens:** AsyncStorage is convenient but stores data as plain text in SQLite/LocalStorage
**How to avoid:** Use SecureStore for authentication tokens, API keys, and any PII. Use AsyncStorage only for preferences and cache
**Warning signs:** Security scanners flag storage, data visible in device backup

### Pitfall 4: Navigation State Lost on Auth Change
**What goes wrong:** User logs out but navigation doesn't reset, still shows protected screens
**Why it happens:** Navigation state persists across auth state changes without explicit reset
**How to avoid:** Use navigation reset when auth state changes:
```typescript
navigation.reset({
  index: 0,
  routes: [{ name: 'Login' }],
});
```
**Warning signs:** Back button returns to protected screens after logout

### Pitfall 5: Font Not Loading Correctly
**What goes wrong:** Custom font (Lexend) shows fallback font on Android but works on iOS
**Why it happens:** Fonts need to be pre-loaded using useFonts hook or Font.loadAsync before rendering
**How to avoid:** Always wrap app in font loading check and use expo-font's useFonts:
```typescript
const [fontsLoaded] = useFonts({
  Lexend: require('@expo-google-fonts/lexend/Lexend_400Regular.ttf'),
});

if (!fontsLoaded) return <AppLoading />;
```
**Warning signs:** Font looks correct in dev but wrong in production, varies by platform

## Code Examples

Verified patterns from official sources:

### Biometric Authentication with Fallback
```typescript
// Source: https://docs.expo.dev/versions/latest/sdk/local-authentication/
import * as LocalAuthentication from 'expo-local-authentication';

const BiometricLoginButton = () => {
  const [biometricAvailable, setBiometricAvailable] = useState(false);

  useEffect(() => {
    LocalAuthentication.hasHardwareAsync().then(setBiometricAvailable);
  }, []);

  const handleBiometricLogin = async () => {
    const saved = await SecureStore.getItemAsync('credentials');
    if (!saved) return; // No saved credentials

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Sign in to iPractus',
      fallbackLabel: 'Use password',
    });

    if (result.success) {
      const { email, password } = JSON.parse(saved);
      // Auto-fill login form or sign in directly
    }
  };

  return biometricAvailable ? (
    <Button onPress={handleBiometricLogin} title="Sign in with Face ID" />
  ) : null;
};
```

### Theme Toggle with Persistence
```typescript
// Source: https://reactnavigation.org/docs/themes/
import { useColorScheme } from 'react-native';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeToggle = () => {
  const { themeMode, setThemeMode } = useTheme();
  const systemScheme = useColorScheme();

  const handleToggle = () => {
    const modes: ThemeMode[] = ['light', 'dark', 'system'];
    const currentIndex = modes.indexOf(themeMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setThemeMode(nextMode);
  };

  const currentLabel = themeMode === 'system'
    ? `System (${systemScheme})`
    : themeMode.charAt(0).toUpperCase() + themeMode.slice(1);

  return (
    <Button onPress={handleToggle} title={`Theme: ${currentLabel}`} />
  );
};
```

### Image Picker for Avatar Upload
```typescript
// Source: https://docs.expo.dev/versions/latest/sdk/imagepicker/
import * as ImagePicker from 'expo-image-picker';

const AvatarUpload = () => {
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Please grant photo library access');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1], // Square crop for avatar
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setAvatarUri(result.assets[0].uri);
      // TODO: Upload to server in later phases
    }
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      {avatarUri ? (
        <Image source={{ uri: avatarUri }} style={{ width: 100, height: 100, borderRadius: 50 }} />
      ) : (
        <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#ccc' }} />
      )}
    </TouchableOpacity>
  );
};
```

### Protected Route Pattern
```typescript
// Source: https://reactnavigation.org/docs/auth-flow/
import { useFocusEffect } from '@react-navigation/native';

const ProtectedScreen = () => {
  const { isAuthenticated } = useAuth();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      if (!isAuthenticated) {
        navigation.replace('Login');
      }
    }, [isAuthenticated, navigation])
  );

  if (!isAuthenticated) return null;

  return <YourScreenContent />;
};
```

### Bottom Tab Navigator with Icons
```typescript
// Source: https://reactnavigation.org/docs/bottom-tab-navigator/
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          switch (route.name) {
            case 'Dashboard':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Feed':
              iconName = focused ? 'list' : 'list-outline';
              break;
            case 'Live':
              iconName = focused ? 'radio' : 'radio-outline';
              break;
            case 'Messages':
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: theme.colors.card,
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Live" component={LiveScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Dynamic navigation config | Static navigation config (default in v7) | 2024 (React Navigation 7) | Reduced boilerplate, better TypeScript, easier deep linking |
| AsyncStorage for tokens | SecureStore for sensitive data | Industry standard | Improved security, App Store compliance |
| Manual theme management | React Navigation theme + useColorScheme | React Navigation 6+ | System-aware theming, less boilerplate |
| Formik + Yup | React Hook Form + Zod | 2023-2024 trend | Better performance, superior TypeScript |
| Custom icon fonts | @expo/vector-icons with icon sets | Since Expo 40+ | Pre-loaded icons, easier implementation |

**Deprecated/outdated:**
- **React Navigation 6.x dynamic config:** Still supported but no longer recommended. Use static config in v7.
- **AsyncStorage for auth tokens:** Security risk. Must use SecureStore for any sensitive data.
- **Expo Go for biometric testing:** Face ID doesn't work in Expo Go. Use development builds.
- **Manually managing theme state:** React Navigation's theme system handles this automatically.

## Open Questions

Things that couldn't be fully resolved:

1. **Form validation library for Phase 1**
   - What we know: React Hook Form + Zod is industry standard, excellent TypeScript support
   - What's unclear: Whether the complexity is justified for simple email/password forms in Phase 1
   - Recommendation: Start with basic controlled components + manual validation. Introduce RHF + Zod when forms become complex (profile editing with multiple fields). Mark as LOW priority for Phase 1.

2. **Image upload destination for avatars**
   - What we know: expo-image-picker works for selection, but we need somewhere to upload
   - What's unclear: Backend API for image storage not defined yet (Phase 2 or 3)
   - Recommendation: Store avatar URIs in AsyncStorage as temporary solution. Implement proper upload when backend is ready. Document this as technical debt.

3. **Mock authentication implementation**
   - What we know: Phase 1 uses mock auth, but exact contract unclear
   - What's unclear: Should mock accept any credentials? Should it simulate network delay?
   - Recommendation: Create a simple mock service that accepts any email/password and returns a fake JWT after a 500ms delay. This simulates real API behavior and makes transition to real auth smoother.

## Sources

### Primary (HIGH confidence)
- Expo SDK 52 Documentation - https://docs.expo.dev/ - Core framework documentation, verified all package installations and configurations
- React Navigation 7.x Documentation - https://reactnavigation.org/ - Navigation patterns, authentication flows, theming system
- expo-secure-store Documentation - https://docs.expo.dev/versions/latest/sdk/securestore/ - Secure storage implementation, platform differences
- expo-local-authentication Documentation - https://docs.expo.dev/versions/latest/sdk/local-authentication/ - Biometric authentication patterns
- expo-image-picker Documentation - https://docs.expo.dev/versions/latest/sdk/imagepicker/ - Image selection and cropping
- React Native useColorScheme - https://reactnative.dev/docs/usecolorscheme - System theme detection

### Secondary (MEDIUM confidence)
- Expo Authentication Guide (Nov 11, 2025) - https://docs.expo.dev/develop/authentication/ - Auth flow patterns and security best practices
- Expo Vector Icons Guide (Nov 20, 2025) - https://docs.expo.dev/guides/icons/ - Icon library usage and patterns
- @react-native-async-storage/async-storage Documentation (Jan 15, 2026) - https://docs.expo.dev/versions/latest/sdk/async-storage/ - Non-secure storage for preferences
- "Best React Native Icon Libraries in 2026" - https://hugeicons.com/blog/development/best-react-native-icon-libraries - Confirms @expo/vector-icons as standard
- "React Hook Form with Zod: Complete Guide for 2026" (6 days ago) - https://dev.to/md_marufrahman_3552855e/ - Current form validation patterns

### Tertiary (LOW confidence)
- "Biometric Authentication in React Native Expo" (3 weeks ago) - https://medium.com/@sasandasaumya/biometric-authentication-in-react-native-expo-a-complete-guide-face-id-fingerprint-732d80e5e423 - Community tutorial, needs verification with official docs
- "Expo SDK 52: A Game-Changer for React Native Development!" - https://ouseqqam.medium.com/expo-sdk-52-a-game-changer-for-react-native-development-0facc3431ce7 - Marketing article, technical claims need verification
- Reddit: "Expo app does not apply theme settings bottom" (7 months ago) - https://www.reddit.com/r/expo/comments/1lsd41v/ - Community discussion, indicates potential theming edge cases

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All sources from official documentation (Expo, React Navigation), versions verified
- Architecture: HIGH - Patterns from official React Navigation authentication guide, community best practices verified
- Pitfalls: HIGH - Issues documented in official docs and verified through community discussions
- Code examples: HIGH - All examples adapted from official documentation sources

**Research date:** 2026-02-04
**Valid until:** 2026-03-06 (30 days - Expo SDK stable, but verify before implementation)
