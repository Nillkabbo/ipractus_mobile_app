# Codebase Concerns

**Analysis Date:** 2025-02-05

## Tech Debt

**Mock Authentication Service:**
- Issue: Entire auth flow uses mock service (`/Users/md.rakibulhasan/ipractus_mobile_app/src/services/auth/mockAuth.ts`) that accepts any credentials and returns fake tokens
- Files: `/Users/md.rakibulhasan/ipractus_mobile_app/src/services/auth/mockAuth.ts`, `/Users/md.rakibulhasan/ipractus_mobile_app/src/contexts/AuthContext.tsx`
- Impact: No real authentication security; tokens are fake base64 strings with "mock_signature"; no actual API integration
- Fix approach: Replace mockAuth with real API service implementing actual JWT validation and backend authentication endpoints

**Hardcoded Credentials in Biometric Login:**
- Issue: Biometric login uses hardcoded demo credentials (`user@ipractus.com`, `password123`) instead of stored encrypted credentials
- Files: `/Users/md.rakibulhasan/ipractus_mobile_app/src/screens/auth/LoginScreen.tsx:43`
- Impact: TODO comment indicates temporary workaround; biometric auth flow is incomplete
- Fix approach: Implement credential storage in `AUTH_KEYS.BIOMETRIC_CREDENTIALS` (defined in secureStorage.ts but unused) and retrieve securely after biometric success

**Dual Theme System:**
- Issue: Two conflicting theme implementations exist - `/Users/md.rakibulhasan/ipractus_mobile_app/src/contexts/ThemeContext.tsx` (simple) and `/Users/md.rakibulhasan/ipractus_mobile_app/src/theme/index.ts` (comprehensive 1085-line file with 3 themes)
- Files: `/Users/md.rakibulhasan/ipractus_mobile_app/src/contexts/ThemeContext.tsx`, `/Users/md.rakibulhasan/ipractus_mobile_app/src/theme/index.ts`, `/Users/md.rakibulhasan/ipractus_mobile_app/src/theme/ThemeProvider.tsx`
- Impact: Theme inconsistency; components may use different theme systems; large theme file not actually integrated with ThemeProvider
- Fix approach: Consolidate to single theme system, likely using the comprehensive theme in `/Users/md.rakibulhasan/ipractus_mobile_app/src/theme/index.ts` with proper provider integration

**Unimplemented OTP Verification:**
- Issue: OTP verification screen has complete UI but verification logic is just console.log (line 87-91)
- Files: `/Users/md.rakibulhasan/ipractus_mobile_app/src/screens/auth/OtpVerificationScreen.tsx:87-91`
- Impact: OTP flow appears functional but does nothing; navigation is commented out
- Fix approach: Implement actual OTP verification API call and proper navigation on success

**Duplicate Theme Constants:**
- Issue: Theme colors defined in multiple places - `/Users/md.rakibulhasan/ipractus_mobile_app/src/constants/colors.ts`, `/Users/md.rakibulhasan/ipractus_mobile_app/src/config/theme.ts`, and `/Users/md.rakibulhasan/ipractus_mobile_app/src/theme/index.ts`
- Files: `/Users/md.rakibulhasan/ipractus_mobile_app/src/constants/colors.ts`, `/Users/md.rakibulhasan/ipractus_mobile_app/src/config/theme.ts`
- Impact: Which theme source is authoritative? Unclear; potential for inconsistency
- Fix approach: Consolidate to single source of truth for all theme values

**Placeholder Screens Throughout:**
- Issue: Multiple placeholder screens with no functionality (FeedPlaceholderScreen, LivePlaceholderScreen, MessagesPlaceholderScreen, ProfilePlaceholderScreen)
- Files: `/Users/md.rakibulhasan/ipractus_mobile_app/src/screens/dashboard/FeedPlaceholderScreen.tsx`, `/Users/md.rakibulhasan/ipractus_mobile_app/src/screens/dashboard/LivePlaceholderScreen.tsx`, `/Users/md.rakibulhasan/ipractus_mobile_app/src/screens/dashboard/MessagesPlaceholderScreen.tsx`, `/Users/md.rakibulhasan/ipractus_mobile_app/src/screens/dashboard/ProfilePlaceholderScreen.tsx`
- Impact: Tab navigation leads to empty screens; core features not implemented
- Fix approach: Replace each placeholder with actual feature implementation

## Known Bugs

**Password Reset Not Implemented:**
- Symptoms: ForgotPasswordScreen shows success message after timeout but no actual reset email sent
- Files: `/Users/md.rakibulhasan/ipractus_mobile_app/src/screens/auth/ForgotPasswordScreen.tsx:23-27`
- Trigger: User submits email for password reset
- Workaround: None; flow is fake
- Fix: Implement actual password reset API integration

**Hardcoded Post Data in Social Feed:**
- Symptoms: Social feed shows only 3 hardcoded posts with external image URLs that may break
- Files: `/Users/md.rakibulhasan/ipractus_mobile_app/src/screens/feed/SocialFeedScreen.tsx:15-66`
- Trigger: Opening social feed
- Workaround: None; no real data
- Fix: Connect to actual feed API and implement pagination

**ProfileScreen Returns Null:**
- Symptoms: ProfileScreen has early return with null and no fallback UI
- Files: `/Users/md.rakibulhasan/ipractus_mobile_app/src/screens/profile/ProfileScreen.tsx:25`
- Trigger: When profile data is missing or undefined
- Workaround: None; blank screen
- Fix: Add proper loading/error states and fallback UI

## Security Considerations

**Insecure Token Storage on Web:**
- Risk: On web platform, "secure" storage falls back to unencrypted AsyncStorage (lines 23-28)
- Files: `/Users/md.rakibulhasan/ipractus_mobile_app/src/services/storage/secureStorage.ts:22-32`
- Current mitigation: Warning comment present but tokens still stored in localStorage on web
- Recommendations: For web deployment, use httpOnly cookies with secure flag; never store tokens in localStorage for production

**No Token Expiration Handling:**
- Risk: Mock tokens have 7-day expiration but no refresh logic implemented
- Files: `/Users/md.rakibulhasan/ipractus_mobile_app/src/services/auth/mockAuth.ts:20`
- Current mitigation: None
- Recommendations: Implement token refresh logic and automatic re-authentication on 401 responses

**No Input Validation Beyond Basic Checks:**
- Risk: Email validation, password strength requirements are minimal client-side checks only
- Files: `/Users/md.rakibulhasan/ipractus_mobile_app/src/screens/auth/SignupScreen.tsx:27-41`
- Current mitigation: Basic length check (password >= 6 characters)
- Recommendations: Implement Zod schema validation (already in dependencies) for all inputs; add server-side validation

**Hardcoded API URLs:**
- Risk: No evidence of environment-based API configuration
- Files: No API service files exist yet
- Current mitigation: Not applicable (mock only)
- Recommendations: Implement environment variable system for API endpoints

**Biometric Credentials Storage Defined But Unused:**
- Risk: `AUTH_KEYS.BIOMETRIC_CREDENTIALS` key exists but credential encryption/storage not implemented
- Files: `/Users/md.rakibulhasan/ipractus_mobile_app/src/services/storage/secureStorage.ts:97`
- Current mitigation: None
- Recommendations: Implement proper encrypted credential storage or remove the key constant

## Performance Bottlenecks

**Large Theme File Loaded Entirely:**
- Problem: 1084-line theme file with all 3 themes loaded but only one used at a time
- Files: `/Users/md.rakibulhasan/ipractus_mobile_app/src/theme/index.ts`
- Cause: All theme objects exported and loaded simultaneously
- Improvement path: Lazy load theme objects or split into separate theme files

**No Image Optimization/Caching:**
- Problem: Social feed uses direct external URLs without React Native's FastImage or caching strategy
- Files: `/Users/md.rakibulhasan/ipractus_mobile_app/src/screens/feed/SocialFeedScreen.tsx:124`
- Cause: Standard Image component used for all remote images
- Improvement path: Implement react-native-fast-image with proper caching headers

**No List Virtualization:**
- Problem: Social feed maps over POSTS array without FlatList or virtualization
- Files: `/Users/md.rakibulhasan/ipractus_mobile_app/src/screens/feed/SocialFeedScreen.tsx:215-217`
- Cause: Using simple map for potentially infinite scroll content
- Improvement path: Replace with FlatList and implement pagination

**Font Loading Synchronous Wait:**
- Problem: App returns null while fonts load, blocking all rendering
- Files: `/Users/md.rakibulhasan/ipractus_mobile_app/App.tsx:14-16`
- Cause: useFonts with null fallback blocks entire app
- Improvement path: Show splash screen instead of null while fonts load

## Fragile Areas

**AuthContext State Management:**
- Files: `/Users/md.rakibulhasan/ipractus_mobile_app/src/contexts/AuthContext.tsx`
- Why fragile: Manual session loading (line 37), no error recovery if secureStorage fails, token/user data can desync
- Safe modification: Always update user data and tokens atomically; add error boundaries; implement state persistence checks
- Test coverage: No tests for AuthContext; critical auth logic untested

**Navigation Type Safety:**
- Files: `/Users/md.rakibulhasan/ipractus_mobile_app/src/constants/routes.ts`, extensive use of `navigation.navigate(any)` casts throughout screens
- Why fragile: Type definitions exist but widely ignored with `as any` casts; navigation errors at runtime
- Safe modification: Use proper TypeScript navigation types; create type-safe navigation hooks
- Test coverage: Navigation paths not tested; typos in route strings possible

**Theme Switching Logic:**
- Files: `/Users/md.rakibulhasan/ipractus_mobile_app/src/contexts/ThemeContext.tsx`, `/Users/md.rakibulhasan/ipractus_mobile_app/src/theme/ThemeProvider.tsx`
- Why fragile: Two different theme providers; AsyncStorage access not wrapped in try-catch (line 30); potential race condition on app start
- Safe modification: Consolidate providers; add error handling; implement theme loading state
- Test coverage: No theme persistence or switching tests

**Component Theme Access Pattern:**
- Files: All screen components use `useTheme()` hook
- Why fragile: Direct theme property access throughout components; if theme structure changes, widespread breakage
- Safe modification: Create theme accessor utilities; avoid direct theme.colors.primary access; use styled components or theme utility functions
- Test coverage: No theme rendering tests

**Storage Layer Error Handling:**
- Files: `/Users/md.rakibulhasan/ipractus_mobile_app/src/services/storage/asyncStorage.ts`, `/Users/md.rakibulhasan/ipractus_mobile_app/src/services/storage/secureStorage.ts`
- Why fragile: Errors logged but thrown; asyncStorage.getItem returns null on error silently (line 34), hiding failures
- Safe modification: Implement consistent error handling strategy; consider error recovery/retry logic
- Test coverage: No storage failure tests

## Scaling Limits

**No State Management for Global Data:**
- Current capacity: Local component state only via useState
- Limit: Cannot share data across screens without prop drilling or context duplication
- Scaling path: Implement Redux, Zustand, or React Query for global state management

**No Data Persistence Strategy:**
- Current capacity: Only auth tokens and user prefs stored
- Limit: All app data lost on reinstall; no offline capability
- Scaling path: Implement comprehensive offline data sync with SQLite or WatermelonDB

**No API Client Architecture:**
- Current capacity: Mock auth service only
- Limit: Cannot make real API calls; no request/response interceptors
- Scaling path: Build Axios/React Query based API client with auth injection, retry logic, error handling

**No Analytics/Error Tracking:**
- Current capacity: Console.error only
- Limit: No visibility into production crashes or user behavior
- Scaling path: Integrate Firebase Crashlytics, Sentry for errors; Analytics for user tracking

**No Internationalization:**
- Current capacity: Hardcoded English strings throughout
- Limit: Cannot support multiple languages
- Scaling path: Implement i18next with translation files and language switcher

## Dependencies at Risk

**Expo SDK 52:**
- Risk: Very recent Expo SDK; potential for breaking changes in minor updates
- Impact: May require migration work on Expo SDK updates
- Migration plan: Follow Expo upgrade guides; test thoroughly on each SDK bump

**react-native@0.76.9:**
- Risk: New React Native version; potential community library compatibility issues
- Impact: Third-party libraries may not support 0.76 yet
- Migration plan: Check library compatibility before upgrades; maintain dependency upgrade checklist

**react-hook-form + zod:**
- Risk: Validation dependencies installed but not actively used for form validation
- Impact: Unused bloat; forms manually validated
- Migration plan: Either implement proper Zod schemas or remove unused dependencies

**react-native-reanimated:**
- Risk: Listed in devDependencies but should be in dependencies for React Native
- Impact: May cause build issues or missing at runtime
- Migration plan: Move to dependencies if actually used; remove if unused

## Missing Critical Features

**No Real API Integration:**
- Problem: All data operations use mock services or hardcoded data
- Blocks: All features requiring backend communication (auth, feed, messages, profile)
- Priority: High - required for any functional feature

**No Push Notifications:**
- Problem: No notification service implemented
- Blocks: Real-time messaging, mentions, alerts
- Priority: High - required for messaging and engagement features

**No Offline Support:**
- Problem: No caching or offline data access
- Blocks: App usage without internet; poor UX on slow connections
- Priority: Medium - important for user experience but can launch without

**No File Upload:**
- Problem: expo-image-picker imported but no upload service
- Blocks: Profile photos, post images, video uploads
- Priority: Medium - required for user-generated content

**No Real-time Features:**
- Problem: No WebSocket or real-time data sync
- Blocks: Live streaming, instant messaging, presence indicators
- Priority: High - core differentiator features

**No Video/Streaming Infrastructure:**
- Problem: Live tab exists with no streaming capability
- Blocks: Entire Live feature (core to app purpose)
- Priority: High - primary feature missing

## Test Coverage Gaps

**No Test Files:**
- What's not tested: Entire application (0 test files found)
- Files: All source files under `/Users/md.rakibulhasan/ipractus_mobile_app/src/`
- Risk: All changes are untested; regressions likely; refactoring dangerous
- Priority: High

**Critical Untested Areas:**
- Authentication flow (login, signup, logout, session persistence)
- Theme switching and persistence
- Navigation between all screens
- Form validation logic
- Storage layer (secure and async)
- State management in contexts

**Recommended Test Setup:**
- Unit tests: Jest + React Native Testing Library
- Components: All screens and components
- Integration tests: Navigation flows, auth flows
- E2E tests: Detox or Appium for critical user paths

---

*Concerns audit: 2025-02-05*
