# iPractus Mobile App

## What This Is

A comprehensive React Native Expo mobile app for the iPractus sports platform that enables athletes, coaches, and fans to connect through social features, real-time communication, team management, and live streaming. This mobile app complements the existing web application, providing a native mobile experience with all 18 core features from the proposal.

## Core Value

Athletes, coaches, and fans can connect, share, and communicate in real-time through their mobile devices - putting the entire sports community in their pocket.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Authentication system with Athlete/Coach/Fan roles (mock implementation)
- [ ] User profile management with avatar upload
- [ ] Social feed with text, images, and video playback
- [ ] Create and share posts with media
- [ ] Browse and join teams
- [ ] Team-specific posts and announcements
- [ ] 1-on-1 chat with real-time messaging
- [ ] Group chat creation and management
- [ ] Media sharing in conversations (images)
- [ ] 1-on-1 video and audio calling (Agora SDK integration)
- [ ] Live streaming capability (go live, watch streams via AWS IVS)
- [ ] Real-time notifications
- [ ] Personal media library (photos, videos, audio)
- [ ] Album organization for media
- [ ] Upload and share media
- [ ] Push notifications
- [ ] Dark/Light theme switching
- [ ] Mobile-optimized navigation and UI

### Out of Scope

- Video editing capabilities — defer to Phase 2
- Group video calls (3+ people) — defer to Phase 2
- In-app payments — defer to Phase 2
- Advanced analytics — defer to Phase 2
- Multi-guest live streaming — defer to Phase 3
- Real backend API integration — using mock/dummy data for v1

## Context

**Technical Environment:**
- Existing web application built with React 17, Redux Toolkit, React Router, Bootstrap
- Web app uses Socket.IO for real-time features, Axios for API calls
- Working Jitsi integration for audio/video calls on web
- Working AWS IVS integration for live streaming on web
- S3 integration for file storage (DigitalOcean Spaces)

**Project Background:**
- 4-week aggressive timeline for MVP delivery
- Target deliverables: iOS TestFlight and Android APK
- User has provided detailed proposal with 18 features across 4 weeks
- Figma design exists for web (desktop), but mobile screens need to be created
- Mobile app will use web design as brand/style reference (colors, typography, patterns)
- All backend APIs are available but mobile app will use dummy data for development
- Codebase documentation available in `/codebase/` directory (ARCHITECTURE.md, STACK.md, STRUCTURE.md, CONVENTIONS.md)

**Mobile-Specific Requirements:**
- Design mobile screens from scratch (no existing mobile Figma designs)
- Adapt web design patterns to mobile UI/UX best practices
- Bottom tab navigation for primary screens
- React Native Paper for UI components (chosen for ease of integration and maintenance)
- Mock authentication implementation (no real auth in v1)
- Cross-platform (iOS + Android) via Expo

## Constraints

- **Timeline**: 4 weeks aggressive delivery schedule — Must deliver TestFlight and APK within 4 weeks
- **Tech Stack**: React Native with Expo — Required for cross-platform development
- **UI Library**: React Native Paper — Chosen for ease of integration, maintenance, and theming support
- **Navigation**: Bottom tab navigation — Standard mobile UX pattern
- **Data**: Mock/dummy data only — Real API integration deferred
- **Design**: No mobile Figma designs — Must create mobile screens adapted from web design
- **Platform**: iOS and Android — Must work on both platforms

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| React Native Paper for UI | Best balance of ease, timeline, and long-term maintenance; excellent theming support to match web design | — Pending |
| Mock data for v1 | Faster development, allows frontend to progress independently, real APIs available for later integration | — Pending |
| Bottom tab navigation | Standard mobile pattern users expect, better UX than web-style drawer/sidebar | — Pending |
| Create mobile screens from scratch | Web Figma is 1920px desktop, requires mobile adaptation; using web design as style reference only | — Pending |
| Follow web architecture patterns | Existing Redux Toolkit, service layer patterns proven; maintain consistency across platforms | — Pending |
| Agora for video calling | Official React Native SDK with Expo support, 10k free min/month, eliminates Jitsi integration risk | ✓ Good |

---
*Last updated: 2026-02-03 after initialization*
