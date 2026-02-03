# Requirements: iPractus Mobile App

**Defined:** 2026-02-03
**Core Value:** Athletes, coaches, and fans can connect, share, and communicate in real-time through their mobile devices.

## v1 Requirements

Requirements for initial release (4-week timeline). Each maps to roadmap phases.

### Authentication

- [ ] **AUTH-01**: User can sign up with email and password (mock)
- [ ] **AUTH-02**: User can log in with email and password (mock)
- [ ] **AUTH-03**: User can enable biometric authentication (Face ID/Touch ID)
- [ ] **AUTH-04**: User can reset password via email flow (mock)
- [ ] **AUTH-05**: User session persists across app restarts
- [ ] **AUTH-06**: User can log out from the app

### Profiles

- [ ] **PROF-01**: User can view their own profile
- [ ] **PROF-02**: User can edit profile (name, bio, avatar)
- [ ] **PROF-03**: User can upload profile avatar image
- [ ] **PROF-04**: User can view other users' profiles
- [ ] **PROF-05**: User profile displays Athlete/Coach/Fan role (from API)

### Social Feed

- [ ] **FEED-01**: User can view feed of posts from all users
- [ ] **FEED-02**: User can create post with text content
- [ ] **FEED-03**: User can attach images to posts
- [ ] **FEED-04**: User can attach videos to posts
- [ ] **FEED-05**: User can like posts
- [ ] **FEED-06**: User can comment on posts
- [ ] **FEED-07**: User can play videos directly in feed
- [ ] **FEED-08**: Feed supports infinite scroll pagination
- [ ] **FEED-09**: Feed supports pull-to-refresh
- [ ] **FEED-10**: User can delete their own posts
- [ ] **FEED-11**: User can edit their own posts

### Teams

- [ ] **TEAM-01**: User can browse list of teams
- [ ] **TEAM-02**: User can view team profile/details
- [ ] **TEAM-03**: User can request to join a team (mock)
- [ ] **TEAM-04**: User can join a team
- [ ] **TEAM-05**: User can create a new team (mock)
- [ ] **TEAM-06**: User can view team-specific feed/posts
- [ ] **TEAM-07**: User can create posts within a team

### Chat

- [ ] **CHAT-01**: User can view list of 1-on-1 conversations
- [ ] **CHAT-02**: User can send text messages in 1-on-1 chat
- [ ] **CHAT-03**: User can receive real-time messages in 1-on-1 chat
- [ ] **CHAT-04**: User can view list of group chats
- [ ] **CHAT-05**: User can create new group chat
- [ ] **CHAT-06**: User can send messages in group chat
- [ ] **CHAT-07**: User can share images in conversations
- [ ] **CHAT-08**: User can see typing indicator when other user is typing
- [ ] **CHAT-09**: User can see read receipts (checkmarks) for messages

### Video Calling

- [ ] **CALL-01**: User can initiate 1-on-1 video call via Agora SDK
- [ ] **CALL-02**: User can initiate 1-on-1 audio-only call via Agora SDK
- [ ] **CALL-03**: User can receive incoming call with accept/decline UI
- [ ] **CALL-04**: User can mute/unmute microphone during call
- [ ] **CALL-05**: User can toggle camera on/off during call
- [ ] **CALL-06**: User can flip front/back camera during call
- [ ] **CALL-07**: User can end call from call UI
- [ ] **CALL-08**: Call screen shows self-view preview

### Media Library

- [ ] **MEDL-01**: User can view personal media gallery (photos, videos)
- [ ] **MEDL-02**: User can upload photos to media library
- [ ] **MEDL-03**: User can upload videos to media library
- [ ] **MEDL-04**: User can create albums to organize media
- [ ] **MEDL-05**: User can add media to albums
- [ ] **MEDL-06**: User can view media in full-screen
- [ ] **MEDL-07**: User can delete media items

### Platform Features

- [ ] **PLAT-01**: App supports dark mode theme
- [ ] **PLAT-02**: App supports light mode theme
- [ ] **PLAT-03**: User can toggle between dark/light mode
- [ ] **PLAT-04**: Theme persists across app restarts
- [ ] **PLAT-05**: App uses bottom tab navigation (Feed, Teams, Chat, Profile)
- [ ] **PLAT-06**: User receives push notifications for new messages
- [ ] **PLAT-07**: User receives push notifications for incoming calls
- [ ] **PLAT-08**: User receives push notifications for team activity

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Live Streaming

- [ ] **STREAM-01**: User can start live stream via AWS IVS
- [ ] **STREAM-02**: User can view live streams from other users
- [ ] **STREAM-03**: User can send chat messages during live stream
- [ ] **STREAM-04**: Stream viewer can see streamer info and viewer count
- [ ] **STREAM-05**: User can like heart during live stream

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Video editing capabilities | High complexity, defer to v2 |
| Group video calls (3+ people) | High complexity, defer to v2 |
| In-app payments | Business development needed, defer to v2 |
| Advanced analytics | Nice-to-have, defer to v2 |
| Multi-guest live streaming | High complexity, defer to v3 |
| Real backend API integration | Using mock/dummy data for v1 |
| Social login (Google, Apple) | Defer to v1.1 for time savings |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| AUTH-01 through AUTH-06 | Phase 1 | Pending |
| PROF-01 through PROF-05 | Phase 1 | Pending |
| FEED-01 through FEED-11 | Phase 2 | Pending |
| TEAM-01 through TEAM-07 | Phase 2 | Pending |
| CHAT-01 through CHAT-09 | Phase 3 | Pending |
| CALL-01 through CALL-08 | Phase 3 | Pending |
| MEDL-01 through MEDL-07 | Phase 4 | Pending |
| PLAT-01 through PLAT-08 | Phases 1-4 | Pending |

**Coverage:**
- v1 requirements: 59 total
- Mapped to phases: 59
- Unmapped: 0 ✓

---
*Requirements defined: 2026-02-03*
*Last updated: 2026-02-03 after initial definition*
