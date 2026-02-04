# Pitfalls Research

**Domain:** React Native Expo Mobile Development
**Researched:** 2026-02-03
**Confidence:** MEDIUM (mix of official docs and recent community sources)

## Executive Summary for 4-Week Timeline

This document catalogs common React Native Expo pitfalls that can derail a 4-week delivery timeline. The most critical risks for this project are:

1. **Jitsi SDK incompatibility with modern Expo** - No official Expo support
2. **Socket.IO background connection issues** - Not designed for mobile background use
3. **React Native Paper maintenance concerns** - May not support current Expo SDK
4. **Redux Toolkit performance overhead** - Immer can be 100x slower than vanilla Redux
5. **Build/deployment environment gaps** - Expo Go vs development build vs production discrepancies

## Critical Pitfalls

### Pitfall 1: Jitsi React Native SDK Incompatibility with Expo

**What goes wrong:**
Jitsi Meet React Native SDK has no official Expo support. Integration requires:
- React Native 0.77.2 (limits you to Expo SDK 52)
- Expo SDK 52 doesn't support modern Android requirements
- Dependency conflicts with React Navigation 7 and other modern libraries
- "Invariant Violation" errors when accessing native modules

**Why it happens:**
Jitsi SDK hasn't been updated for modern Expo/React Native versions. Expo SDK 55+ requires newer React Native versions that Jitsi doesn't support.

**Consequences:**
- Unable to integrate Jitsi video calling without complex workarounds
- May need to eject from Expo (defeats purpose of using Expo)
- Significant timeline delay (2-5 days of troubleshooting)

**How to avoid:**
1. **Week 0 (Planning):** Verify Jitsi compatibility with chosen Expo SDK version
2. Consider alternatives:
   - Use web-based Jitsi integration via WebView (less performant but works)
   - Use Agora SDK or Twilio Video (better Expo support via config plugins)
   - Build custom video solution using WebRTC
3. If proceeding with Jitsi:
   - Test integration in Week 1, not Week 3
   - Budget 3-5 days for dependency resolution
   - Consider using Expo Development Build (not Expo Go)

**Warning signs:**
- `expo install @jitsi/react-native-sdk` fails or warns about compatibility
- Build errors mentioning "invariant violation" or native modules
- React Navigation conflicts after installing Jitsi dependencies

**Phase to address:**
Phase 1 (Foundation/Setup) - Must be resolved before any video feature work begins

**Severity:** HIGH (can block core functionality)

---

### Pitfall 2: Socket.IO Background Connection Failures

**What goes wrong:**
Socket.IO connections drop when app goes to background. Reconnection on app resume is unreliable. Official Socket.IO stance: "not meant to be used in background as it will drain battery."

**Why it happens:**
Mobile OS aggressively pauses background network connections to save battery. Socket.IO maintains persistent TCP connections that get killed by OS.

**Consequences:**
- Real-time features stop working when user switches apps
- Chat messages, notifications, live updates delayed or lost
- Poor UX - users think app is broken
- Battery drain if background workarounds implemented

**How to avoid:**
1. **Design decision:** Don't fight OS limitations
2. Implement hybrid approach:
   - **Foreground:** Use Socket.IO for real-time updates
   - **Background:** Use push notifications (expo-notifications) for important updates
   - On app resume, re-sync missed messages via API
3. Add reconnection logic with exponential backoff
4. Show connection status indicator to users

```typescript
// Recommended pattern
const useSocketConnection = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    // Handle app state changes
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        socket.connect();
      } else {
        socket.disconnect();
      }
    });

    return () => {
      socket.disconnect();
      subscription.remove();
    };
  }, []);

  return { isConnected };
};
```

**Warning signs:**
- Messages not received until app is reopened
- "Socket disconnect" logs when app backgrounds
- High battery usage in Android battery stats

**Phase to address:**
Phase 2 (Real-time Infrastructure) - Design before implementing Socket.IO features

**Severity:** HIGH (affects core UX, workable but requires design decision)

---

### Pitfall 3: React Native Paper Maintenance & Compatibility Issues

**What goes wrong:**
React Native Paper may no longer be actively maintained:
- Last release: May 2025
- Accumulating unresolved issues
- No support for React Native 0.81+
- TypeScript definition issues
- Theme customization complexity

**Why it happens:**
Library appears abandoned by maintainers. Community forks scattered.

**Consequences:**
- Cannot upgrade React Native/Expo SDK without breaking Paper
- TypeScript errors throughout codebase
- Component styling limitations
- Time spent debugging library issues instead of building features

**How to avoid:**
1. **Week 0 decision:** Evaluate alternatives:
   - **NativeBase v4** - Actively maintained, better Expo support
   - **Tamagui** - Modern, high performance, Expo-friendly
   - **Gluestack UI** - Expo-first design system
   - **React Native Elements** - Still maintained
   - **Custom components** - More work but no dependency risk
2. If proceeding with Paper:
   - Pin exact version in package.json
   - Fork on GitHub if you need to patch issues
   - Have backup plan ready

**Warning signs:**
- Unresolved GitHub issues older than 6 months
- TypeScript errors in Paper components
- Breaking changes when upgrading Expo SDK

**Phase to address:**
Phase 0 (Stack Decision) - Must choose UI library before starting development

**Severity:** MEDIUM (workable alternatives exist, but switching mid-project costs days)

---

### Pitfall 4: Redux Toolkit Performance & Complexity Overhead

**What goes wrong:**
- Immer (used by RTK) can be 100x slower than vanilla Redux in certain scenarios
- State mutation errors still plague 70% of Redux apps despite "modern tooling"
- Over-engineering for small apps - too much boilerplate
- Unnecessary re-renders from poorly structured selectors

**Why it happens:**
- RTK adds abstraction layer (Immer) that has performance cost
- Developers assume RTK "just works" without optimizing slice structure
- Context API might be sufficient for simpler state needs

**Consequences:**
- App feels sluggish (below 60fps)
- Increased bundle size (RTK + Immer + RTK Query)
- Development slowdown from Redux boilerplate
- Harder to debug performance issues

**How to avoid:**
1. **Audit state needs before committing:**
   - If <5 global state slices, consider Zustand or Context API
   - If heavy caching needs, RTK Query is valuable
2. **If using RTK:**
   ```typescript
   // DO: Memoize selectors
   import { createSelector } from '@reduxjs/toolkit';

   export const selectUserName = createSelector(
     [(state: RootState) => state.user],
     (user) => user.name
   );

   // DON'T: Create new objects/arrays in render
   const bad = () => ({ ... }); // New object every render

   // DO: Use RTK's createEntityAdapter for normalized data
   const usersAdapter = createEntityAdapter<User>();
   ```
3. Profile early: Use React DevTools Profiler in Week 2
4. Consider Zustand as simpler alternative

**Warning signs:**
- DevTools Profiler shows >30ms render times
- Bundle size analysis shows Redux tools >200KB
- Re-renders cascade through unrelated components

**Phase to address:**
Phase 1 (Foundation) - Choose state management before implementing features

**Severity:** MEDIUM (has impact, but can optimize or switch early)

---

### Pitfall 5: Expo Go vs Development Build vs Production Gaps

**What goes wrong:**
App works perfectly in Expo Go, but crashes in production build. Common issues:
- Missing native module permissions
- Different JavaScript engines (Hermes not in Expo Go for some SDKs)
- Hardcoded `localhost` URLs
- Network security config differences
- API level mismatches on Android

**Why it happens:**
Expo Go is a generic container. Development builds have your exact dependencies. Production builds have additional optimizations and restrictions.

**Consequences:**
- "Works on my machine" syndrome
- Late discovery of bugs (demo to client fails)
- Emergency hotfix cycles
- Lost time debugging environment-specific issues

**How to avoid:**
1. **Use Development Build from day 1:**
   ```bash
   npx expo run:android  # or ios
   ```
   Never rely on Expo Go for anything beyond prototyping
2. **Test on physical devices weekly:**
   - Android API level matching your target
   - iOS version matching deployment target
3. **Build production test builds weekly:**
   ```bash
   eas build --local --profile development
   ```
4. **Environment-aware configuration:**
   ```typescript
   const API_URL = Constants.expoConfig?.extra?.apiUrl ||
     (Constants.isDevice ? 'https://api.production.com' : 'http://localhost:3000');
   ```

**Warning signs:**
- "Only happens in production build" bugs
- Network errors only on real devices
- Feature works in Expo Go but not dev build

**Phase to address:**
Phase 1 (Foundation) - Set up development build workflow immediately

**Severity:** HIGH (classic "works on my machine" time sink)

---

### Pitfall 6: Memory Leaks from Uncleaned Resources

**What goes wrong:**
Memory usage grows over time until app crashes or becomes unusable. Common causes:
- Event listeners not removed on unmount
- Socket connections not cleaned up
- Timers not cleared
- Navigation stacks retaining hidden screens
- Animated values not cleaned up

**Why it happens:**
React Native's garbage collection doesn't catch everything. JavaScript closures retain references to entire component trees.

**Consequences:**
- App becomes sluggish after 10-15 minutes of use
- Random crashes after navigating between screens
- Battery drain
- "Memory leak" reports in production analytics

**How to avoid:**
1. **Strict cleanup pattern:**
   ```typescript
   useEffect(() => {
     const socket = io(SOCKET_URL);
     const timer = setInterval(doSomething, 1000);
     const subscription = someEvent.subscribe();

     // ALL cleanup in one return
     return () => {
       socket.disconnect();
       clearInterval(timer);
       subscription.unsubscribe();
     };
   }, []);
   ```
2. **Use `react-native-screens` properly:**
   ```typescript
   // Enable screen tracking
   <NavigationContainer>
     <Stack.Screen
       name="Detail"
       component={DetailScreen}
       options={{
         // Critical for cleanup
         lazy: false, // or true based on use case
       }}
     />
   </NavigationContainer>
   ```
3. **Test for leaks in Week 2:**
   - Navigate in circles: Home → Detail → Home → Detail (20x)
   - Monitor memory with React Native Debugger or Flipper
   - If memory grows consistently, you have a leak

**Warning signs:**
- App feels slower the longer it's open
- Profiler shows increasing component count
- RAM usage grows >50MB over 10 minutes

**Phase to address:**
Phase 2 (Feature Implementation) - Establish cleanup patterns before writing effects

**Severity:** MEDIUM (detectable with proper testing, but fixing late is hard)

---

### Pitfall 7: Push Notifications Production Setup Complexity

**What goes wrong:**
Push notifications work in development but fail in production. Common issues:
- Expo Go no longer supports push notifications (SDK 53+)
- APNS key/certificate mismatch
- FCM configuration errors
- Token not refreshed after app updates
- Wrong project ID/configuration between environments

**Why it happens:**
Push notification setup requires 3+ separate services (Expo, Apple, Firebase) to be configured correctly. Dev and prod use different credentials.

**Consequences:**
- Users don't receive critical notifications
- Silent failure (no error shown to user)
- Time lost debugging credential issues
- Need to release app updates to fix notification config

**How to avoid:**
1. **Set up production credentials in Week 1:**
   - Don't use dev tokens for planning
   - Create separate Apple/Google projects for staging and production
2. **Use expo-notifications properly:**
   ```typescript
   import * as Notifications from 'expo-notifications';

   // Register for push (only on real device)
   const registerForPush = async () => {
     if (!Constants.isDevice) return null;

     const { status: existingStatus } = await Notifications.getPermissionsAsync();
     let finalStatus = existingStatus;

     if (existingStatus !== 'granted') {
       const { status } = await Notifications.requestPermissionsAsync();
       finalStatus = status;
     }

     if (finalStatus !== 'granted') {
       return null;
     }

     const token = await Notifications.getExpoPushTokenAsync({
       projectId: Constants.expoConfig?.extra?.eas?.projectId,
     });

     return token.data;
   };
   ```
3. **Test on real devices weekly:**
   - iOS AND Android
   - Background AND foreground
   - Different notification types
4. **Handle token refresh:**
   ```typescript
   Notifications.addPushTokenListener(({ data: token }) => {
     // Send to backend
     updatePushTokenOnServer(token);
   });
   ```

**Warning signs:**
- "Push not working" bug reports from testers
- Notifications only work on one platform
- Expo Go shows "not supported" warning

**Phase to address:**
Phase 2 (Infrastructure) - Set up before implementing notification-dependent features

**Severity:** MEDIUM (critical feature but can be fixed post-launch with config update)

---

### Pitfall 8: EAS Build Failures & Cost Overruns

**What goes wrong:**
- EAS builds fail with cryptic errors
- Each failed build costs money ($1-2 per build)
- Local builds succeed but EAS builds fail
- Worker connection failures
- Out-of-memory errors during build

**Why it happens:**
- EAS build environment different from local
- Dependencies missing from package.json
- Platform-specific build configs not checked in
- Secrets not configured in EAS

**Consequences:**
- 10-20 failed builds = $10-40 wasted
- Hours debugging build errors instead of building features
- Blocked when EAS has outages
- Can't ship critical fixes

**How to avoid:**
1. **Use `eas build --local` for faster iteration:**
   ```bash
   eas build --local --platform ios --profile development
   ```
2. **Pin dependency versions:**
   ```json
   {
     "dependencies": {
       "react": "18.2.0",
       "react-native": "0.73.6"  // Exact version, not ^
     }
   }
   ```
3. **Configure EAS properly:**
   ```yaml
   # eas.json
   {
     "build": {
       "development": {
         "developmentClient": true,
         "distribution": "internal"
       },
       "preview": {
         "distribution": "internal",
         "ios": {
           "simulator": true
         }
       },
       "production": {
         "ios": {
           "autoIncrement": true
         },
         "android": {
           "autoIncrement": true
         }
       }
     }
   }
   ```
4. **Test build process weekly:**
   - Don't wait until Week 4 to discover build is broken
   - Each week: build development APK/IPA and test on device

**Warning signs:**
- "Worker failed" errors
- Build hangs >30 minutes
- Same config works locally but fails on EAS

**Phase to address:**
Phase 1 (Foundation) - Configure EAS before Week 2

**Severity:** MEDIUM (time/cost sink, but recoverable)

---

### Pitfall 9: AWS IVS Player Integration Issues

**What goes wrong:**
- Picture-in-Picture (PiP) mode doesn't handle system controls (Play, Pause, Stop)
- AirPlay doesn't send video
- Platform-specific issues (Android TV, tvOS not supported)
- Player state inconsistencies

**Why it happens:**
AWS IVS React Native wrapper is maintained by AWS but has open issues. Some platform features require native implementations.

**Consequences:**
- Live streaming features feel incomplete
- Poor UX for tablet/large screen users (no PiP)
- User complaints about AirPlay not working
- Time spent on workarounds for platform limitations

**How to avoid:**
1. **Verify IVS player compatibility with chosen Expo SDK in Week 1:**
   - Test basic playback first
   - Test PiP early if it's a requirement
   - Test AirPlay early if iOS target
2. **Plan for platform limitations:**
   - Document which features work on which platforms
   - Consider alternative players if IVS missing critical features
3. **Test with real streams:**
   - Mock streams don't reveal all issues
   - Test stream interruptions and reconnection

**Warning signs:**
- PiP controls don't respond
- AirPlay icon appears but video doesn't show
- Different behavior between iOS/Android

**Phase to address:**
Phase 3 (Media Features) - Test early in media feature work

**Severity:** MEDIUM (feature-specific, can work around if discovered early)

---

### Pitfall 10: Platform-Specific iOS vs Android Issues

**What goes wrong:**
Feature works on one platform but not the other. Common issues:
- Shadow props work on iOS but not Android
- BackHandler behaves differently
- SafeArea issues on notched devices
- Permissions handled differently
- Font rendering differences
- Keyboard behavior differences

**Why it happens:**
React Native paper over differences, but not completely. Platform APIs have different behaviors and limitations.

**Consequences:**
- One platform feels "broken"
- User complaints from one platform's users
- Rushed platform-specific fixes
- Inconsistent UX between platforms

**How to avoid:**
1. **Test on BOTH platforms weekly:**
   - Don't build all iOS features then all Android
   - Each feature: test on iOS AND Android before calling it "done"
2. **Use Platform module explicitly:**
   ```typescript
   import { Platform } from 'react-native';

   const componentStyle = Platform.select({
     ios: { shadowOpacity: 0.2 },
     android: { elevation: 4 }
   });
   ```
3. **Use platform-specific files:**
   ```
   Component.ios.tsx
   Component.android.tsx
   ```
4. **Test on real devices:**
   - iOS: Test on device with notch (iPhone 14+)
   - Android: Test on different screen sizes
5. **Check permissions per platform:**
   ```typescript
   const requestPermissions = async () => {
     if (Platform.OS === 'ios') {
       // iOS permission flow
     } else {
       // Android permission flow
     }
   };
   ```

**Warning signs:**
- Feature flagged as done but only tested on one platform
- Platform-specific code using `if (Platform.OS === 'ios')` everywhere
- Visual differences between platforms

**Phase to address:**
All phases - Every feature must be tested on both platforms

**Severity:** MEDIUM (quality issue, but usually fixable with dedicated platform testing)

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Using Expo Go instead of Dev Build | Faster setup initially | Hidden production bugs | Only for 1-day prototypes, never for real features |
| Skip TypeScript strict mode | Faster development initially | Runtime errors, harder refactoring | Never in 2026 for a new project |
| Hardcode configuration values | No config infrastructure | Can't deploy to different environments | Only for proof-of-concept < 3 days |
| Skip error boundaries | Less code to write | App crashes instead of graceful errors | Never - add error boundaries in Week 1 |
| Use any library that works | Faster feature implementation | Maintenance burden, security issues | Only for prototype code you'll delete |
| Skip platform testing | Faster iteration velocity | Platform-specific bugs in production | Never - test both platforms weekly |
| Inline styles instead of theme | No theme setup needed | Inconsistent UI, harder dark mode | Only for throwaway prototypes |
| Skip push notification setup | Feature works in dev | Silent production failures | Never - set up in Week 1 if notifications are required |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| **Socket.IO** | Expecting background connection to work | Use push notifications for background, Socket.IO for foreground only |
| **Jitsi** | Assuming Expo SDK compatibility | Verify with chosen Expo SDK version in Week 1, or use WebView/web-based solution |
| **AWS IVS** | Not testing with real streams | Test with production-like streams from day 1, test PiP/AirPlay early |
| **expo-notifications** | Using Expo Go for testing | Use development build, test on real devices weekly |
| **EAS Build** | First build attempt in Week 4 | Configure and test build process in Week 1, build weekly |
| **Redux Toolkit** | Using without profiling | Profile in Week 2, use memoized selectors, consider Zustand for simpler needs |
| **React Native Paper** | Assuming maintained for current RN version | Check GitHub issues, have alternative ready (NativeBase, Tamagui) |
| **React Navigation** | Not handling deep linking from day 1 | Set up deep linking infrastructure in Week 1, test regularly |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| **Unnecessary re-renders** | Laggy scrolling, janky animations | useMemo, useCallback, React.memo, profile early | At 100+ items in lists or complex component trees |
| **Not using Hermes** | Slow startup, memory issues | Enable in app.json, test from Week 1 | Any app with >10 screens or complex logic |
| **Large bundle size** | Slow downloads, large app size | Code splitting, dynamic imports, tree shaking | At >20MB bundle size affects download rates |
| **FlatList without optimization** | Choppy scrolling, memory issues | Use getItemLayout, removeClippedSubviews, windowSize | At >50 items or complex list items |
| **Uncleaned effects** | Memory leaks, app slowdown | Strict cleanup pattern, test navigation loops | After 10-15 minutes of use or 20+ screen navigations |
| **Synchronous bridge calls** | UI freezes during native operations | Batch updates, use InteractionManager | When calling native modules repeatedly |
| **Not using react-native-screens** | Memory bloat, slow navigation | Enable and configure properly | At >15 screens in navigation stack |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| **Hardcoded API keys in repo** | Credential theft, API abuse | Use environment variables (.env with expo-constants), never commit keys |
| **HTTP in production** | Man-in-the-middle attacks | Enforce HTTPS, properly configure SSL certificates |
| **expo-secrets not set up** | Secrets in client code | Use expo-constants with environment-specific app.config.js |
| **Debug builds in production** | Exposes internals, easier to reverse engineer | Always build production builds for releases |
| **Not validating push notification payloads** | Malicious payload injection | Validate on backend before sending, sanitize on client |
| **Storing tokens in plain AsyncStorage** | Token theft on rooted/jailbroken devices | Use expo-secure-store for sensitive data |
| **Not certificate pinning** | Man-in-the-middle on API calls | Implement SSL pinning for sensitive APIs (consider if needed) |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| **No loading states** | Users don't know if app is working or broken | Add skeleton screens, spinners for any operation >200ms |
| **No offline handling** | App is unusable without internet | Cache data, show offline state, queue actions for retry |
| **No error messages** | Users think app is broken | Show human-readable errors with recovery actions |
| **Ignoring safe areas** | Content hidden by notches/home indicators | Use SafeAreaView or react-native-safe-area-context |
| **No haptic feedback** | App feels unresponsive | Add haptic feedback for important actions (success, error) |
| **Inconsistent back button behavior** | Users get lost in navigation | Follow platform conventions, test navigation flows |
| **Pull-to-refresh not working** | Users can't update content | Implement pull-to-refresh on all list screens |

## "Looks Done But Isn't" Checklist

- [ ] **Socket.IO integration:** Often missing reconnection logic — verify connection survives network changes and app backgrounding
- [ ] **Video calling:** Often missing permission handling flow — verify camera/mic permissions requested properly, handle denial
- [ ] **Push notifications:** Often missing production setup — verify notifications work on real device with production credentials
- [ ] **Authentication:** Often missing token refresh — verify app stays logged in after token expires
- [ ] **Image uploads:** Often missing progress indicator — verify users see upload progress for large images/videos
- [ ] **Form validation:** Often missing real-time validation — verify errors shown immediately, not just on submit
- [ ] **Deep linking:** Often missing complete flow — verify app opens to correct screen from external link
- [ ] **Keyboard handling:** Often missing scroll-to-input — verify keyboard doesn't hide input fields
- [ ] **Orientation changes:** Often missing layout adaptation — verify UI works in landscape and portrait
- [ ] **Memory management:** Often missing cleanup verification — verify app doesn't slow down after 20+ screen navigations

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| **Jitsi incompatibility** | HIGH (3-7 days) | 1. Switch to WebView-based Jitsi (1 day) OR 2. Switch to Agora/Twilio (3-5 days) |
| **Socket.IO background issues** | MEDIUM (1-2 days) | 1. Add reconnection logic (0.5 day) 2. Add push notification fallback (1 day) 3. Document limitation |
| **UI library abandonment** | HIGH (5-10 days) | 1. Component-by-component migration to new library OR 2. Fork and maintain yourself (rarely worth it) |
| **Redux Toolkit performance** | MEDIUM (2-4 days) | 1. Profile and optimize selectors (1 day) 2. Consider migration to Zustand (2 days) |
| **Expo Go gaps** | MEDIUM (1-2 days) | 1. Switch to development build (0.5 day) 2. Set up EAS build (0.5 day) 3. Test all features (1 day) |
| **Memory leaks** | MEDIUM (2-5 days) | 1. Profile to identify leak (1 day) 2. Fix cleanup patterns (2-4 days depending on scope) |
| **EAS build failures** | LOW (0.5-2 days) | 1. Use --local build (0.5 day) 2. Fix dependency issues (0.5-1 day) 3. Reconfigure EAS (0.5 day) |
| **Platform-specific bugs** | LOW (0.5-1 day per bug) | 1. Add Platform checks (0.5 day) 2. Platform-specific file if needed (0.5 day) |

## Timeline-Specific Risks (4-Week Sprint)

### Week 1 Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| **Wrong stack choice** | Lose 2-3 days switching | Research and finalize stack in planning before Week 1 |
| **Environment setup issues** | Lose 1-2 days | Use dev build from day 1, verify EAS build works by end of Week 1 |
| **UI library incompatibility** | Lose 2-4 days | Test chosen library with chosen Expo SDK before committing |

### Week 2 Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| **Architecture debt from rushing** | Slows all subsequent weeks | Don't skip architecture planning, enforce code review |
| **First integration failure (Jitsi/IVS)** | Lose 2-5 days | Test integrations in Week 1, have backup plans ready |
| **Performance issues emerging** | Progressive slowdown | Profile in Week 2, don't wait until Week 4 |

### Week 3 Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| **Feature creep** | Miss deadline | Strict scope control, defer non-essential features |
| **Platform-specific bugs discovered late** | Lose 2-3 days | Test both platforms weekly, not just at end |
| **State management complexity** | Features become harder to build | Profile and optimize in Week 2, not Week 3 |

### Week 4 Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| **Build/deployment issues** | Can't ship | Build weekly from Week 1, don't wait until Week 4 |
| **Polish takes longer than expected** | Rushed, buggy release | Allocate 30% of Week 4 for polish, not new features |
| **Production-only bugs** | Emergency hotfix needed | Test production builds from Week 2, not Week 4 |

### Critical Path for 4-Week Delivery

**Week 0 (Pre-Development):**
- Finalize stack with compatibility verification (Jitsi + Expo SDK version)
- Set up all development accounts (Apple, Google, AWS, EAS)
- Configure build pipeline

**Week 1 (Foundation):**
- Working development build on both platforms
- Basic navigation with deep linking
- Authentication flow with token refresh
- Push notification infrastructure tested on real devices
- **Risk checkpoint:** EAS build working on both platforms

**Week 2 (Core Features):**
- Socket.IO infrastructure with reconnection logic
- Redux/State management with profiling verification
- Basic UI components from chosen library
- Media upload infrastructure
- **Risk checkpoint:** Performance profiling passes, no memory leaks detected

**Week 3 (Advanced Features):**
- Video calling integration (Jitsi or alternative)
- Live streaming integration (AWS IVS)
- Real-time features with Socket.IO
- **Risk checkpoint:** All integrations tested on both platforms

**Week 4 (Polish & Ship):**
- Bug fixes from testing
- Performance optimization
- Production builds
- Store submission
- **Risk checkpoint:** Production build tested on real devices, no critical bugs

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Jitsi SDK incompatibility | Phase 0 (Planning) | Jitsi video call works on both platforms by end of Week 3 |
| Socket.IO background issues | Phase 2 (Infrastructure) | App survives backgrounding and reconnects properly |
| React Native Paper abandonment | Phase 0 (Stack decision) | All UI components render without TypeScript errors |
| Redux Toolkit performance | Phase 1 (Foundation) | Profiler shows <16ms render times for all screens |
| Expo Go vs production gaps | Phase 1 (Foundation) | Development build working by end of Week 1 |
| Memory leaks | Phase 2 (Implementation) | Memory stable after 20+ navigation transitions |
| Push notification setup | Phase 2 (Infrastructure) | Notification received on real device (iOS + Android) |
| EAS build failures | Phase 1 (Foundation) | Successful EAS build by end of Week 1 |
| AWS IVS player issues | Phase 3 (Media features) | Video plays smoothly, PiP works if needed |
| Platform-specific bugs | All phases | Each feature tested on iOS AND Android before "done" |

## Severity Assessment

**CRITICAL (Can block delivery):**
1. Jitsi SDK incompatibility - No official Expo support
2. Expo Go vs production gaps - Classic "works on my machine"
3. Wrong stack choice - UI library abandonment

**HIGH (Significant delay risk):**
1. Socket.IO background issues - Design decision needed
2. Memory leaks - Hard to fix late
3. EAS build failures - Time and cost sink

**MEDIUM (Manageable but needs attention):**
1. Redux Toolkit performance - Can optimize or switch
2. Push notification complexity - Works eventually
3. AWS IVS player limitations - Feature-specific
4. Platform-specific bugs - Testing discipline needed

## Sources

### Official Documentation
- [Expo Common Development Errors](https://docs.expo.dev/workflow/common-development-errors/) - Official Expo documentation on commonly encountered errors
- [Socket.IO React Native Guide](https://socket.io/how-to/use-with-react-native) - Official Socket.IO documentation for React Native integration
- [Expo SDK 55 Beta Changelog](https://expo.dev/changelog/sdk-55-beta) - Latest Expo SDK changes and breaking changes
- [Expo Upgrade Walkthrough](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/) - Official upgrade guide
- [Expo Push Notifications FAQ](https://docs.expo.dev/push-notifications/faq/) - Troubleshooting for push notifications

### Community Articles (2025-2026)
- [5 Common Errors Found in a React Native App Using Expo](https://www.imaginarycloud.com/blog/5-common-errors-found-in-a-react-native-app-using-expo) - Platform differences, images, shadows, deployment
- [Stop Making These Mistakes in Your React Native App](https://aneeqa-k25.medium.com/stop-making-these-mistakes-in-your-react-native-app-b15c2ef455d8) - Performance, state management, platform differences
- [Expo Application Performance Best Practices](https://expo.dev/blog/best-practices-for-reducing-lag-in-expo-apps) (April 2025) - Recent performance guidance
- [Top 20 Mistakes React Native Developers Still Make in 2025](https://javascript.plainenglish.io/top-20-mistakes-react-native-developers-still-make-in-2025-and-how-to-fix-them-604f3fc1dbf9) - Current common mistakes
- [15 Proven Tips to Improve React Native Performance in 2025](https://medium.com/react-native-journal/15-proven-tips-to-improve-react-native-performance-in-2025-6ef732714d08) - Performance optimization
- [Redux Toolkit Best Practices 2025](https://medium.com/@ReactBlitz/redux-toolkit-best-practices-in-2025-the-complete-developers-guide-74de800bfa37) - RTK performance considerations
- [Why I Stopped Using Redux (and What I Use Instead) in 2025](https://javascript.plainenglish.io/why-i-stopped-using-redux-and-what-i-use-instead-in-2025-6c47629d40ec) - Redux complexity concerns
- [Debugging Memory Leaks in React Native (2025)](https://medium.com/react-native-journal/debugging-memory-leaks-in-react-native-2025-a-step-by-step-guide-f8d4e1976fe7) - Memory leak detection
- [React Native Performance Tactics: Modern Strategies and Tools](https://blog.sentry.io/react-native-performance-strategies-tools/) (August 2025)
- [Solving Common React Native + Expo Setup Errors (2025 Guide)](https://medium.com/@jagritisrvstv/solving-common-react-native-expo-setup-errors-2025-guide-9622d5772318)
- [Expo Push Notifications: 5 Critical Setup Mistakes](https://www.sashido.io/en/blog/expo-push-notifications-setup-caveats-troubleshooting)
- [Your React Native App Has 18 Months to Live: The Technical Debt Timeline](https://medium.com/@michaelstelly/your-react-native-app-has-18-months-to-live-the-technical-debt-timeline-ive-seen-kill-12-apps-fe18e242ec5d)
- [React Native Performance Isn't a Myth — It's a Debt You Can't Keep Postponing](https://medium.com/@Thatreactnativeguy/react-native-performance-isnt-a-myth-it-s-a-debt-you-can-t-keep-postponing-b257ab1ba16d)
- [React Native 0.81 - Android 16 support, faster iOS builds](https://reactnative.dev/blog/2025/08/12/react-native-0.81) - Latest RN version requirements
- [Complete Guide to React Native Deployment for iOS and Android](https://bugsee.com/blog/complete-guide-to-react-native-deployment-for-ios-and-android/)

### GitHub Issues & Discussions
- [React Native Paper no longer maintained?](https://www.reddit.com/r/reactnative/comments/1oudqc9/react-nativepaper_is-no-longer-maintained/) - Community concern about maintenance status
- [What do you dislike about React Native Paper](https://github.com/callstack/react-native-paper/issues/1489) - Known issues discussion
- [EAS build fail on Sentry plugin](https://stackoverflow.com/questions/79513388/eas-build-fail-on-expo-on-sentry-react-native/expo)
- [RTK with Immer x100 slower than vanilla Redux](https://github.com/reduxjs/redux-toolkit/issues/4793)
- [Socket.IO background discussion](https://github.com/socketio/socket.io/discussions/4346)
- [AWS IVS Player GitHub Issues](https://github.com/aws/amazon-ivs-react-native-player/issues)

### Other Resources
- [React Native App Launch Timelines: A Complete Breakdown](https://www.abbacustechnologies.com/react-native-app-launch-timelines-a-complete-breakdown/) - Timeline risks including technical debt
- [Understanding and Managing Technical Debt](https://mobidev.biz/blog/understanding-and-managing-technical-debt)
- [EAS Update Debugging](https://docs.expo.dev/eas-update/debug/) - Common EAS Update issues

---

*Pitfalls research for: React Native Expo Mobile Development*
*Researched: 2026-02-03*
*Confidence: MEDIUM (mix of official docs and recent 2025-2026 community sources)*
