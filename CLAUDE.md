# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**iPractus** is a React Native mobile application built with Expo SDK 54. It's a sports social platform connecting athletes, coaches, and fans with features like social feeds, messaging, team management, and live streaming.

**Tech Stack:**
- React Native 0.81.5 with Expo 54
- TypeScript (strict mode enabled)
- React Navigation v7 (native-stack + bottom-tabs)
- React Hook Form + Zod for validation
- Axios for API calls
- AsyncStorage + SecureStore for persistence

## Development Commands

```bash
# Start development server (Expo Go)
npm start

# Run on specific platforms
npm run android    # Android emulator
npm run ios        # iOS simulator
npm run web        # Web browser (development)

# Build for production (requires EAS CLI)
eas build           # Build for app stores
eas update          # Submit OTA update
```

**Node.js Version:** 20.19.4+ (see .nvmrc)

## Architecture

### Directory Structure

```
src/
├── components/           # Reusable UI components
│   ├── Avatar.tsx
│   ├── Button.tsx
│   ├── TextInput.tsx
│   └── ...
├── screens/              # Screen components organized by feature
│   ├── auth/            # Login, signup, onboarding
│   ├── dashboard/       # Main app screens
│   ├── profile/         # User profile
│   ├── feed/            # Social feed
│   └── onboarding/      # First-run setup
├── navigators/          # Navigation configuration
│   ├── RootNavigator.tsx    # Auth/app switcher
│   ├── AuthNavigator.tsx    # Unauthenticated flow
│   └── AppNavigator.tsx     # Main app (bottom tabs)
├── contexts/            # React Context providers
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── hooks/               # Custom React hooks
│   ├── useAuth.ts
│   ├── useTheme.ts
│   └── useBiometric.ts
├── services/            # API and storage
│   ├── api/
│   │   └── authApi.ts
│   └── storage/
│       ├── asyncStorage.ts
│       └── secureStorage.ts
├── theme/               # Theme system
│   ├── index.ts              # Master theme definitions
│   ├── ThemeProvider.tsx
│   └── components/           # Themed UI components
├── types/               # TypeScript definitions
├── constants/           # App constants (colors, routes, spacing)
└── config/              # Configuration files (API, theme)
```

### Navigation Architecture

**Dual-Stack Pattern:**
- [RootNavigator.tsx](src/navigators/RootNavigator.tsx) switches between AuthNavigator and AppNavigator based on `isAuthenticated` state
- NavigationContainer is created in RootNavigator (not App.tsx) to access auth state
- Route constants defined in [constants/routes.ts](src/constants/routes.ts)

**Auth Stack:** Welcome → Role Selection → Login/Signup → OTP Verification

**App Stack (Bottom Tabs):**
- Dashboard (main hub)
- Feed (social content)
- Live (streaming)
- Messages (chat)
- Profile

Each tab has its own nested stack for additional screens.

### State Management

- **AuthContext:** User authentication state, tokens stored in SecureStore
- **ThemeContext:** Three theme variants (see Theme System below)
- Local component state with React hooks (useState, useEffect, etc.)

### API Integration

- Base URL: `https://be.ipractus.com/api` (configurable via `EXPO_PUBLIC_API_BASE`)
- Uses Axios for better CORS/SSL handling vs fetch
- Mock auth service available for development: [services/auth/mockAuth.ts](src/services/auth/mockAuth.ts)
- Error parsing handles multiple backend response formats (Django REST, custom)

### Theme System

Three design variants with automatic screen-based theme switching:

1. **iPractus Light** - Classic blue theme (default)
2. **iPractus Dark** - Navy theme for chat/messaging screens
3. **Pistachio v2** - Green theme for dashboard/analytics

**Usage:**
```tsx
import { useTheme } from '../hooks/useTheme';

const { theme, themeType, setTheme, isDark } = useTheme();
```

**Themed Components:** [theme/components/](src/theme/components/) exports ThemedButton, ThemedCard, ThemedInput, ThemedText, ThemedBadge

**Screen Auto-Detection:** Screens with "Chat" or "Messages" in name get ipractus-dark theme. Dashboard/analytics screens get pistachio.

See [theme/README.md](src/theme/README.md) for full theme API documentation.

### Authentication Flow

1. User signs up → must verify email
2. Login → stores JWT tokens in SecureStore
3. Session restored on app launch from SecureStore
4. Role selection: athlete, coach, or fan (affects UI/permissions)

**Security Notes:**
- Tokens stored in SecureStore (encrypted keychain/keystore)
- User data in AsyncStorage (non-sensitive profile info)
- Biometric auth supported via expo-local-authentication

## Key Patterns

### Adding a New Screen

1. Create screen file in appropriate `src/screens/` directory
2. Add route constant to [constants/routes.ts](src/constants/routes.ts)
3. Add to navigator (AuthNavigator, AppNavigator, or nested stack)
4. Use themed components/hooks from theme system

### Form Validation

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const { control, handleSubmit } = useForm({
  resolver: zodResolver(schema),
});
```

### Type-Safe Navigation

```tsx
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../constants/routes';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const navigation = useNavigation<NavigationProp>();
navigation.navigate('Login');
```

## Configuration Files

- [app.json](app.json) - Expo configuration (bundle IDs, permissions, plugins)
- [tsconfig.json](tsconfig.json) - TypeScript strict mode enabled
- [babel.config.js](babel.config.js) - Babel with expo-preset and reanimated plugin

## Permissions (iOS/Android)

- Biometric authentication (Face ID / Touch ID / Fingerprint)
- Camera (profile photos)
- Photo library access

Configure in [app.json](app.json) under ios.infoPlist and android.permissions.
