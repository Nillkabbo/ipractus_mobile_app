# Technology Stack

**Analysis Date:** 2025-02-05

## Languages

**Primary:**
- TypeScript 5.9.2 - `/App.tsx`, `/src/**/*.ts`, `/src/**/*.tsx`

**Secondary:**
- JavaScript (Node.js tooling) - `babel.config.js`
- JSON - Configuration files

## Runtime

**Environment:**
- Expo SDK 52.0.0 - Cross-platform mobile app framework
- React Native 0.76.9 - iOS, Android, Web platforms
- Node.js (via Expo CLI) - Development runtime

**Package Manager:**
- npm (implied by package-lock.json present)
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Expo 52.0.49 - Development and build platform
- React 18.3.1 - UI framework
- React Native 0.76.9 - Native component bridge
- React Navigation 7.x - Screen navigation
  - `@react-navigation/native` 7.0.14
  - `@react-navigation/native-stack` 7.2.1
  - `@react-navigation/bottom-tabs` 7.1.2

**Testing:**
- Not configured (no test framework detected)

**Build/Dev:**
- Babel 7.26.0 - JavaScript transpiler
- Metro bundler (via Expo) - Module bundler
- TypeScript 5.9.2 - Type checking
- React Native Reanimated 3.16.1 - Animations

## Key Dependencies

**Critical:**
- `expo-secure-store` ~14.0.1 - Encrypted storage for tokens/auth
- `@react-native-async-storage/async-storage` ^1.23.1 - Persistent key-value storage
- `expo-local-authentication` ~15.0.0 - Biometric authentication (Face ID, Touch ID)
- `expo-image-picker` ~16.0.0 - Camera and photo library access

**Infrastructure:**
- `@expo/vector-icons` ^14.0.0 - Icon library (Ionicons)
- `@expo-google-fonts/lexend` ^0.2.3 - Custom typography
- `react-native-safe-area-context` 4.12.0 - Safe area insets
- `react-native-screens` ~4.4.0 - Native screen optimizations
- `react-native-web` ^0.19.13 - Web platform support

**Form Management:**
- `react-hook-form` ^7.54.2 - Form state management
- `@hookform/resolvers` ^3.10.0 - Form validation integration
- `zod` ^3.24.1 - Schema validation

**Styling:**
- Custom theme system - `/src/theme/`
- React Native StyleSheet - Component styling

## Configuration

**Environment:**
- TypeScript strict mode enabled - `tsconfig.json`
- Platform-specific: iOS, Android, Web
- Babel preset: `babel-preset-expo` ~12.0.0
- Reanimated plugin enabled for animations

**Build:**
- `app.json` - Expo app configuration (name, bundle IDs, permissions)
- `babel.config.js` - Babel transpilation config
- `tsconfig.json` - TypeScript compiler options (extends expo/tsconfig.base)

## Platform Requirements

**Development:**
- Node.js (version managed by Expo)
- Expo CLI (via `npx expo`)
- iOS: Xcode (for iOS builds)
- Android: Android Studio + SDK (for Android builds)
- Web: Modern browser with Metro bundler

**Production:**
- iOS App Store: Bundle ID `com.ipractus.app`
- Google Play: Package `com.ipractus.app`
- Web: PWA capable (via Expo web support)

---

*Stack analysis: 2025-02-05*
