# External Integrations

**Analysis Date:** 2025-02-05

## APIs & External Services

**Mock Authentication (Phase 1 - Development):**
- Mock Auth Service - Simulated authentication for development
  - Implementation: `/src/services/auth/mockAuth.ts`
  - Accepts any email/password combination
  - Returns fake JWT-like tokens
  - Note: To be replaced with real API in later phases

**Image Assets:**
- Google Hosted Images - External image URLs in demo/social feed
  - Used in: `/src/screens/feed/SocialFeedScreen.tsx`
  - Purpose: Demo placeholder content for Stitch design preview
  - Note: Temporary, will be replaced with app-hosted assets

## Data Storage

**Local Storage (Client-side only):**

**Encrypted Storage:**
- expo-secure-store - Native encrypted key-value storage
  - Keys: `ipractus_user_token`, `ipractus_refresh_token`, `ipractus_biometric_credentials`
  - Implementation: `/src/services/storage/secureStorage.ts`
  - Platform support: iOS (Keychain), Android (Keystore), Web (AsyncStorage fallback)

**Persistent Storage:**
- @react-native-async-storage/async-storage - Unencrypted persistent storage
  - Keys: `ipractus_theme_mode`, `ipractus_onboarding_completed`, `ipractus_biometric_enabled`, `ipractus_user`
  - Implementation: `/src/services/storage/asyncStorage.ts`
  - Use case: User preferences, non-sensitive data, cache

**File Storage:**
- Local filesystem only - No cloud storage configured
- Image picker configured for future camera/photo library access
- Implementation: `/src/contexts/ThemeContext.tsx` uses AsyncStorage for theme persistence

**Caching:**
- AsyncStorage - Used for preferences caching
- No dedicated caching layer

## Authentication & Identity

**Auth Provider:**
- Custom implementation with mock backend
- Implementation: `/src/contexts/AuthContext.tsx`
- Current state: Mock authentication with simulated API delay (500ms)

**Biometric Authentication:**
- expo-local-authentication - Native Face ID / Touch ID
  - Implementation: `/src/hooks/useBiometric.ts`
  - Supported: Face ID (iOS), Fingerprint (Android)
  - Fallback: Password-based login
  - Hardware detection included

**User Roles:**
- Three roles defined: `athlete`, `coach`, `fan`
- Type definition: `/src/types/auth.ts`

## Monitoring & Observability

**Error Tracking:**
- None configured

**Logs:**
- Console.log only - Development logging
- No structured logging service

## CI/CD & Deployment

**Hosting:**
- Expo Development Build - Current development environment
- Target stores: iOS App Store, Google Play Store

**CI Pipeline:**
- Not configured (no GitHub Actions, CI detected)

## Environment Configuration

**Required env vars:**
- None required for current mock implementation
- Future: API endpoints, auth tokens, service keys

**Secrets location:**
- Not applicable (no production secrets yet)
- Future: expo-secure-store for runtime secrets

## Webhooks & Callbacks

**Incoming:**
- None configured

**Outgoing:**
- None configured

**Note:** This is a Phase 1 development environment. All integrations are mock/local only. Real API integrations will be added in later phases as documented in `.planning/phases/`.

---

*Integration audit: 2025-02-05*
