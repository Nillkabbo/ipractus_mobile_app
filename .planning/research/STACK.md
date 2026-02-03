# Stack Research

**Domain:** React Native Expo mobile app with social features, real-time chat, video calling, and live streaming
**Researched:** 2026-02-03
**Confidence:** HIGH

---

## Executive Summary

The 2025/2026 standard stack for React Native Expo mobile apps centers on **Expo SDK 52** with **React Native 0.76/0.77**. For a sports platform with social features, real-time chat, video calling, and live streaming, the recommended stack prioritizes stability, Expo compatibility, and alignment with existing web infrastructure.

**Key decision:** Use TypeScript (75%+ of new React apps in 2025 use TypeScript), Redux Toolkit for consistency with existing web app, and carefully managed native module integrations for Jitsi and AWS IVS.

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| **Expo SDK** | 52 | Development framework | Latest stable with React Native 0.76/0.77 support. Precompiled React Native for iOS available. Avoid SDK 53 (too new, Expo Go incompatibility issues). |
| **React Native** | 0.76 or 0.77 | Mobile UI framework | Expo SDK 52 supports both 0.76 and 0.77. 0.77 is latest (Jan 2025). |
| **React** | 18.x | UI library | Expo SDK 52 uses React 18. React 19 has dependency compatibility issues - stick with 18 for now. |
| **TypeScript** | 5.x | Type safety | Industry standard in 2025 (75%+ adoption). Better DX, fewer runtime errors, excellent Expo support. |
| **React Native Paper** | 5.x | UI component library | Material Design 3 (Material You) support. Dark/light theme built-in. Expo-friendly. First-class TypeScript. |

### State Management & Data

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| **Redux Toolkit** | 2.x | Global state | Matches existing web app stack. RTK Query built-in for API caching. Industry standard for complex apps. |
| **RTK Query** | (included) | Server state | Eliminates need for React Query. Auto-generated hooks, caching, loading/error states. |
| **React Context** | (built-in) | Local state | For theme, auth session, simple UI state. No additional library needed. |

### Navigation

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| **React Navigation** | 6.x | Screen navigation | Standard for React Native. Expo SDK 52 compatible. Native stack, bottom tabs, drawer. |
| **@react-navigation/native** | 6.x | Core navigation | Required base package |
| **@react-navigation/native-stack** | 6.x | Native stack navigator | Native platform transitions, better performance |
| **@react-navigation/bottom-tabs** | 6.x | Bottom tab navigation | Standard mobile pattern |

### Real-time Communication

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| **socket.io-client** | 4.x | Real-time chat | Official Socket.IO client works with React Native. Matches existing web app. |
| **@jitsi/react-native-sdk** | latest | Video/audio calling | **MEDIUM Confidence** - Requires Expo dev workflow (not Expo Go). May need dependency resolution with `--force`. |
| **amazon-ivs-react-native-player** | 1.5.0 | Live streaming | Official AWS IVS player wrapper. Latest release Feb 2024. |

### Push Notifications

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| **expo-notifications** | 0.28.x | Push notifications | Official Expo package. Unified API for iOS (APNs) and Android (FCM). Development build required (not Expo Go). |
| **expo-device** | (included) | Device info | Required for push token registration |

### Media Handling

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| **expo-image-picker** | ~17.x | Image/video selection | Official Expo package. Camera and gallery access. |
| **expo-document-picker** | ~14.x | File selection | For non-image file uploads |
| **expo-file-system** | ~17.x | File operations | Local file access, download, upload |
| **expo-av** | ~14.x | Audio/video playback | For media playback features |
| **expo-camera** | ~15.x | Camera access | For in-app camera functionality |

### Development Tools

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| **EAS Build** | (service) | Cloud builds | Recommended for building apps with native modules (Jitsi, IVS) |
| **expo-dev-client** | (package) | Development builds | Required for native modules and push notifications |
| **@react-native-community/eslint-config** | latest | Linting | Standard React Native ESLint config |

---

## Installation

```bash
# Core Expo & React Native
npx create-expo-app@latest --template blank-typescript

# UI Components
npm install react-native-paper react-native-safe-area-context

# Navigation
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context

# State Management
npm install @reduxjs/toolkit react-redux

# Real-time
npm install socket.io-client

# Media Handling (Expo SDK - use npx expo install for compatibility)
npx expo install expo-image-picker expo-document-picker expo-file-system expo-av expo-camera

# Push Notifications
npx expo install expo-notifications expo-device

# Development
npm install -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

---

## Critical: Native Modules (Jitsi & AWS IVS)

### Jitsi React Native SDK

**CRITICAL CONSTRAINT:** Jitsi SDK does **NOT** work with Expo Go. You must use development builds.

```bash
npm install @jitsi/react-native-sdk --force
# Run dependency sync script
node node_modules/@jitsi/react-native-sdk/update_dependencies.js
npm install
```

**Compatibility Notes:**
- Jitsi depends on React Native 0.77.2 (may limit Expo SDK to 52)
- Requires custom Metro config for SVG support
- Requires iOS pod install
- Android: targetSdkVersion 33+, multiple permissions
- iOS: Camera/mic usage descriptions in Info.plist

### AWS IVS React Native Player

```bash
npm install amazon-ivs-react-native-player
cd ios && pod install
```

**Compatibility Notes:**
- Works with standard React Native projects
- Simple API: `<IVSPlayer streamUrl={URL} />`
- Latest release: 1.5.0 (Feb 2024)
- May require development build due to native dependencies

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| **Expo Go for production features** | Cannot use native modules (Jitsi, IVS), push notifications limited | expo-dev-client with EAS Build |
| **React Native 0.72 or older** | Incompatible with latest Expo SDK 52 features, security updates | React Native 0.76/0.77 |
| **React 19** | Dependency compatibility issues with Expo SDK 52 as of early 2025 | React 18.x |
| **Expo SDK 53** | Too new (released late 2025), Expo Go incompatibility reports | Expo SDK 52 (stable) |
| **react-navigation@5** | End of life, no longer maintained | React Navigation 6.x |
| **socket.io-client@2.x** | Ancient, incompatible with modern servers | socket.io-client@4.x |
| **react-native-webrtc (direct)** | Complex setup, better to use Jitsi SDK | @jitsi/react-native-sdk |
| **PropTypes** | Deprecated in favor of TypeScript | TypeScript interfaces |
| ** AsyncStorage** | Deprecated by Expo (use expo-secure-store for sensitive data) | expo-secure-store for tokens, Redux for app state |
| **react-native-vector-icons (Expo)** | Not needed - included in Expo SDK | Just use MaterialDesignIcons from Expo |

---

## TypeScript vs JavaScript

**Recommendation: Use TypeScript**

**Confidence: HIGH**

**Rationale:**
- 75%+ of new React applications in 2025 use TypeScript
- Expo has first-class TypeScript support
- Redux Toolkit is TypeScript-first (better DX with TS)
- Reduces runtime errors (critical for 4-week timeline)
- Better IDE support, refactoring, and autocomplete
- Industry standard for React Native development in 2025
- Web app likely uses TypeScript (aligns stack)

**4-Week Timeline Consideration:**
TypeScript setup adds minimal upfront time but prevents hours of debugging runtime errors. Net positive for aggressive timeline.

---

## Version Compatibility Matrix

| Package | Expo SDK 52 | RN 0.76 | RN 0.77 | Notes |
|---------|-------------|---------|---------|-------|
| React Navigation 6.x | YES | YES | YES | Use `npx expo install` for peer deps |
| React Native Paper 5.x | YES | YES | YES | Safe Area Context required |
| Redux Toolkit 2.x | YES | YES | YES | Platform-agnostic |
| socket.io-client 4.x | YES | YES | YES | May need polyfills for older Android |
| expo-notifications | SDK-bundled | N/A | N/A | Version tied to SDK |
| @jitsi/react-native-sdk | DEV BUILD ONLY | YES | LIMITED | Prefers RN 0.77.2, verify SDK 52 compat |
| amazon-ivs-react-native-player | DEV BUILD LIKELY | YES | YES | Untested with Expo managed workflow |

---

## State Management: Redux Toolkit vs Alternatives

### Recommended: Redux Toolkit

**Why:**
- **Existing web app uses Redux Toolkit** - maintain consistency
- **RTK Query included** - eliminates need for React Query/TanStack Query
- **TypeScript-first** - excellent type safety
- **Battle-tested** - scales to complex apps
- **Learning transfer** - team already knows it from web app

### Alternatives Considered

| Alternative | When to Use | Why Not for This Project |
|-------------|-------------|--------------------------|
| **Zustand** | Simple state, minimal boilerplate | Team unfamiliar, inconsistent with web app |
| **Jotai** | Atom-based state, React philosophy | Different paradigm from Redux |
| **React Query + Zustand** | Server + client state split | Extra complexity, RTK Query handles both |
| **MobX** | Reactive state, OOP style | Different mental model, team unfamiliar |

---

## Stack Patterns by Variant

### If Jitsi Integration is Blocking

**Option 1: Use development build from day 1**
- Set up EAS Build immediately
- Test Jitsi integration in Week 1
- If it fails, pivot to alternative

**Option 2: Deep link to Jitsi Meet app**
- Use Linking API to open Jitsi Meet installed app
- No native module required
- Works in Expo Go
- Trade-off: Less control, user leaves app

**Option 3: Web-based Jitsi iFrame**
- Use WebView with Jitsi Meet External API
- Works in Expo Go
- Trade-off: Performance, native features limited

### If AWS IVS Integration is Blocking

**Option 1: Use WebView for live streams**
- Embed IVS player in WebView
- Works in Expo Go
- Trade-off: Performance, native controls

**Option 2: External live stream service**
- Use YouTube Live, Twitch, or other service
- Embed in WebView or video component
- Trade-off: Vendor lock-in, cost

---

## Expo SDK Best Practices for 2025

1. **Use `npx expo install`** for Expo-compatible packages
   - Auto-selects compatible versions for your SDK

2. **Development Build Required For:**
   - Push notifications
   - Jitsi SDK
   - AWS IVS player (likely)
   - Any config plugin usage

3. **EAS Build for Native Modules:**
   - Set up EAS project early
   - Test build process before Week 2
   - Local builds possible but slower

4. **Expo Go is for:**
   - Core UI development
   - Navigation flow testing
   - Basic expo-sdk features
   - Quick prototyping

5. **Always Use TypeScript**
   - Create app with `--template blank-typescript`
   - Enables better tooling
   - Industry standard

---

## Security & Permissions

### Android (android/app/src/main/AndroidManifest.xml)

```xml
<!-- Camera & Mic for Jitsi -->
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />

<!-- Network for Socket.IO & streaming -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<!-- Notifications -->
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

<!-- Cleartext traffic for dev only -->
<uses-permission android:name="android.permission.USE_BIOMETRIC" />
```

### iOS (ios/YourApp/Info.plist)

```xml
<key>NSCameraUsageDescription</key>
<string>This app needs camera access for video calls</string>
<key>NSMicrophoneUsageDescription</key>
<string>This app needs microphone access for video calls</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>This app needs photo library access to share images</string>
<key>UIBackgroundModes</key>
<array>
    <string>voip</string>
</array>
```

---

## 4-Week Timeline Considerations

### Week 1: Foundation
- Expo SDK 52 + TypeScript project setup
- React Native Paper theming (dark/light)
- Navigation structure
- Redux Toolkit setup with mock data

### Week 2: Core Features
- Feed, posts, comments (UI only, mock data)
- Socket.IO integration setup
- expo-image-picker for media

### Week 3: Real-time & Media
- Real-time chat with Socket.IO
- Push notification setup (EAS Build required)
- Media library implementation

### Week 4: Advanced Features
- Jitsi video calling OR deep link fallback
- AWS IVS live streaming OR WebView fallback
- Polish & testing

**Critical Path Items:**
- Day 1-2: Set up EAS Build, verify development build works
- Day 3-4: Test Jitsi SDK in development build
- Day 5: Make Go/No-Go decision on native modules

---

## Sources

| Source | Confidence | What Was Verified |
|--------|------------|-------------------|
| https://docs.expo.dev/changelog/2024-11-12-sdk-52 | HIGH | Expo SDK 52 release, RN 0.76/0.77 support |
| https://expo.dev/changelog/2025-01-21-react-native-0.77 | HIGH | React Native 0.77 compatibility |
| https://reactnativepaper.com/ | HIGH | React Native Paper v5, Material You support |
| https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-react-native-sdk/ | HIGH | Jitsi RN SDK installation, props, events |
| https://github.com/aws/amazon-ivs-react-native-player | HIGH | AWS IVS player v1.5.0, API |
| https://socket.io/how-to/use-with-react-native | HIGH | Socket.IO client RN compatibility |
| https://docs.expo.dev/push-notifications/overview/ | HIGH | expo-notifications unified API |
| https://callstack.github.io/react-native-paper/docs/guides/getting-started | HIGH | Paper v5 installation, Expo setup |
| https://docs.expo.dev/versions/latest/sdk/imagepicker/ | HIGH | expo-image-picker API |
| Web search results - TypeScript adoption 2025 | MEDIUM | 75%+ new React apps use TypeScript |
| Web search results - React 19 compatibility issues | MEDIUM | React 19 incompatibility with Expo SDK 52 |

---

*Stack research for: iPractus mobile app - React Native Expo sports platform*
*Researched: 2026-02-03*
