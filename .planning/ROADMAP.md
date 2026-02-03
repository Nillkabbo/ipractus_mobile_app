# Roadmap: iPractus Mobile App

## Overview

A comprehensive React Native Expo mobile app for the iPractus sports platform. The journey begins with establishing the development foundation, navigation structure, and authentication. We then build the core social features (feed, teams), followed by real-time communication (chat, video calling), and complete with media management and production builds for iOS TestFlight and Android APK.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation + Auth + Navigation** - Project setup, authentication, user profiles, and navigation infrastructure
- [ ] **Phase 2: Social Feed + Teams** - Social feed with posts, media, and team management features
- [ ] **Phase 3: Chat + Agora Video Calling** - Real-time messaging and 1-on-1 video/audio calling
- [ ] **Phase 4: Media Library + Polish + Builds** - Personal media library, push notifications, and production builds

## Phase Details

### Phase 1: Foundation + Auth + Navigation

**Goal**: Users can securely access the app and manage their profiles with mobile-optimized navigation

**Depends on**: Nothing (first phase)

**Requirements**: AUTH-01, AUTH-02, AUTH-03, AUTH-04, AUTH-05, AUTH-06, PROF-01, PROF-02, PROF-03, PROF-04, PROF-05, PLAT-01, PLAT-02, PLAT-03, PLAT-04, PLAT-05

**Success Criteria** (what must be TRUE):
1. User can create account with email/password, log in, and stay logged in across app restarts
2. User can enable biometric authentication (Face ID/Touch ID) for quick access
3. User can view and edit their profile including uploading avatar image
4. User can navigate between main screens using bottom tab navigation
5. User can toggle between dark and light themes, with preference persisting across restarts

**Plans**: 4 plans

Plans:
- [ ] 01-01: Project scaffolding with Expo SDK 52, React Native Paper, and navigation setup
- [ ] 01-02: Redux Toolkit store, mock API service layer, and theme system
- [ ] 01-03: Authentication screens (login, register, biometric, password reset)
- [ ] 01-04: User profile screens with avatar upload and profile editing

### Phase 2: Social Feed + Teams

**Goal**: Users can share content through posts and connect through teams

**Depends on**: Phase 1 (authentication and navigation)

**Requirements**: FEED-01, FEED-02, FEED-03, FEED-04, FEED-05, FEED-06, FEED-07, FEED-08, FEED-09, FEED-10, FEED-11, TEAM-01, TEAM-02, TEAM-03, TEAM-04, TEAM-05, TEAM-06, TEAM-07

**Success Criteria** (what must be TRUE):
1. User can view feed of posts with infinite scroll and pull-to-refresh
2. User can create posts with text, images, and videos
3. User can like and comment on posts, and edit/delete their own posts
4. User can browse teams, view team details, and request to join teams
5. User can view and create posts within teams they've joined

**Plans**: 4 plans

Plans:
- [ ] 02-01: Feed infrastructure with Redux slice, mock data, and list components
- [ ] 02-02: Post creation with text, image attachment, and video attachment
- [ ] 02-03: Feed interactions (likes, comments, edit, delete) and video playback
- [ ] 02-04: Teams screens with browsing, joining, creating, and team-specific posts

### Phase 3: Chat + Agora Video Calling

**Goal**: Users can communicate in real-time through messaging and video/audio calls

**Depends on**: Phase 1 (user profiles, navigation)

**Requirements**: CHAT-01, CHAT-02, CHAT-03, CHAT-04, CHAT-05, CHAT-06, CHAT-07, CHAT-08, CHAT-09, CALL-01, CALL-02, CALL-03, CALL-04, CALL-05, CALL-06, CALL-07, CALL-08

**Success Criteria** (what must be TRUE):
1. User can view conversations and send/receive real-time text messages
2. User can create and participate in group chats
3. User can share images in conversations
4. User can see typing indicators and read receipts for messages
5. User can initiate and receive 1-on-1 video and audio calls with full call controls

**Plans**: 4 plans

Plans:
- [ ] 03-01: Chat infrastructure with Redux slice, mock Socket.IO service, and conversation list
- [ ] 03-02: Chat detail screen with messaging, typing indicators, and read receipts
- [ ] 03-03: Group chat creation and image sharing in conversations
- [ ] 03-04: Agora SDK integration for 1-on-1 video/audio calling with incoming call UI

### Phase 4: Media Library + Polish + Builds

**Goal**: Users can manage personal media and app is ready for production distribution

**Depends on**: Phase 2 (media upload infrastructure), Phase 3 (communication features)

**Requirements**: MEDL-01, MEDL-02, MEDL-03, MEDL-04, MEDL-05, MEDL-06, MEDL-07, PLAT-06, PLAT-07, PLAT-08

**Success Criteria** (what must be TRUE):
1. User can view personal media gallery with photos and videos
2. User can upload photos and videos to media library
3. User can create albums and organize media into albums
4. User receives push notifications for messages, calls, and team activity
5. iOS TestFlight build and Android APK are available for distribution

**Plans**: 4 plans

Plans:
- [ ] 04-01: Media library infrastructure with Redux slice and gallery grid view
- [ ] 04-02: Media upload and album organization features
- [ ] 04-03: Push notification setup for messages, calls, and team activity
- [ ] 04-04: Production builds (iOS TestFlight, Android APK) with final polish and testing

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation + Auth + Navigation | 0/4 | Not started | - |
| 2. Social Feed + Teams | 0/4 | Not started | - |
| 3. Chat + Agora Video Calling | 0/4 | Not started | - |
| 4. Media Library + Polish + Builds | 0/4 | Not started | - |

---

*Roadmap created: 2026-02-03*
*Depth: Standard (4 phases)*
*Coverage: 61/61 requirements mapped*
