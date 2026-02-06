# iPractus Navigation Documentation Index

This directory contains comprehensive navigation flow documentation for the iPractus mobile app.

---

## Document Structure

| Document | Description |
|----------|-------------|
| **[00-index.md](./00-index.md)** | This file - navigation overview |
| **[01-onboarding-flow.md](./01-onboarding-flow.md)** | New user onboarding (Welcome → Role → Profile → OTP → Success) |
| **[02-authentication-flow.md](./02-authentication-flow.md)** | Login and password recovery (Login → Forgot → Reset) |
| **[03-main-app-navigation.md](./03-main-app-navigation.md)** | Bottom tab navigation (Home, Discover, Post+, Teams, Profile) |
| **[04-messages-flow.md](./04-messages-flow.md)** | Messaging system (Chat List → 1-on-1 / Group Chat) |
| **[05-teams-flow.md](./05-teams-flow.md)** | Team discovery and management (Find Teams → Profile → Roster) |
| **[06-settings-flow.md](./06-settings-flow.md)** | Settings and preferences (Main → Edit Profile, Privacy, etc.) |
| **[07-analytics-events-flow.md](./07-analytics-events-flow.md)** | Performance tracking, training, and events |
| **[08-theme-variants.md](./08-theme-variants.md)** | Three design themes: iPractus Light, iPractus Dark, Pistachio v2 |

---

## Visual Navigation Map

A visual diagram of all navigation flows is available in FigJam:
**[iPractus Navigation Flow](https://www.figma.com/online-whiteboard/create-diagram/c4c8cc2e-3cbf-49c8-a4f6-06bcb6e0b24b)**

---

## Quick Navigation Reference

### Entry Points

| Entry | Screens | Next |
|-------|---------|------|
| **New User** | Welcome → Choose Role → Setup Profile → OTP → Success | Main App |
| **Returning User** | Login | Main App |
| **Forgot Password** | Forgot → OTP Verify → Reset Password | Login |

### Main Navigation (Bottom Tabs)

| Tab | Screen | Key Actions |
|-----|--------|-------------|
| **Home** | Social Feed | Create post, View posts, Tap notifications |
| **Discover** | Explore | Search, Browse content, View users |
| **Post+** | Create Post | Compose post, Attach media |
| **Teams** | Find Teams | Browse teams, View team profile, Create team |
| **Messages** | Chat List | View conversations, Start new chat |
| **Profile** | My Profile | View posts, media, teams; Go to settings |

### Common Navigation Patterns

| Pattern | Behavior | Examples |
|---------|----------|----------|
| **Back Navigation** | Arrow in top-left | All detail/screens: Team profile, Settings, Chat, etc. |
| **Tab Navigation** | Bottom bar with 5 items | Main app hub: Feed, Discover, Teams, Messages, Profile |
| **Tab Controls** | Horizontal tabs within screen | Team Profile (Feed/Roster/Media), Profile (Posts/Media/Teams) |
| **FAB (Floating Action Button)** | Center-raised button | Post+, Add (Pistachio), New Message |
| **Modal/Sheet** | Bottom sheet or overlay | Share, More options, Quick actions |
| **Push Navigation** | Stack navigation | All screens with back arrow |
| **Switch Navigation** | Tab switching | Bottom tab bar |

---

## Design Systems

The app includes **three distinct design themes**:

### iPractus Light (Classic Blue) - ~22 screens
- **Primary Color:** `#137fec`
- **Font:** Lexend
- **Background Light:** `#f6f7f8`
- **Background Dark:** `#101922`
- **Border Radius:** `0.25rem - 0.75rem`
- **Usage:** Main feed, profile, team management
- **Example:** `social_feed.html`, `coach_management_dashboard.html`

### iPractus Dark (Navy Chat) - ~16 screens
- **Primary Color:** `#1173d4`
- **Font:** Lexend
- **Dark Navy:** `#0a0f14`
- **Dark Elevated:** `#1a2129`
- **Recipient Bubble:** `#2d353e`
- **Border Radius:** `0.5rem - 3rem` (more rounded)
- **Usage:** Chat interfaces, dark mode screens
- **Example:** `1_on_1_message_chat.html`, `settings.html`

### Pistachio v2 (Green Performance) - ~19 screens
- **Primary Color:** `#b2f15f`
- **Font:** Inter
- **Obsidian:** `#0B132B`
- **Obsidian Elevated:** `#1C2541`
- **Cyan Accent:** `#66D9E8`
- **Border Radius:** `1rem - 3rem`
- **Usage:** System v2 redesign, analytics, training
- **Example:** `pistachio_dashboard__system_v2.html`, `pistachio_onboarding__system_v2.html`

See **[08-theme-variants.md](./08-theme-variants.md)** for detailed theme documentation.

---

## Screen Categorization

### Authentication & Onboarding (12 screens)
- Welcome, Choose Role, Setup Profile, OTP Verify, Success
- Login, Forgot Password (x2), Reset Password (x2)

### Main App Hub (8 screens)
- Social Feed, Messages, Teams, Profile
- Discover, Create Post, Dashboard (x2)

### Messages & Chat (6 screens)
- Messages List, 1-on-1 Chat (x2), Group Chat, Video Call (x2)

### Teams (6 screens)
- Find Teams, Team Profile, Team Roster, Create Team, Team Settings

### Settings (8 screens)
- Settings (x2), Edit Profile, Privacy, Blocked, Help, About, Terms, Refer, Pro

### Analytics & Training (10 screens)
- Dashboard (x2), Athlete Stats, Coach Analytics, Training Plan, Session Details, Drill Detail, Log Results (x2)

### Events & Live (6 screens)
- Event Details (x2), RSVP, Live Sports, Go Live, Live Chat, Streamer Dashboard

### Media (4 screens)
- Media Library, Media Albums, Achievements Gallery, Video Player

**Total: ~60 unique screens**

---

## Component Library

Based on the HTML designs, key reusable components include:

### Navigation
- `TopAppBar` - Header with back button, title, actions
- `BottomTabBar` - 5-tab navigation with FAB
- `TabControl` - Horizontal tab switcher

### Lists
- `MessageList` - Chat conversations
- `TeamCard` - Team preview card
- `FeedCard` - Social media post
- `SettingsItem` - Settings list item
- `SettingsToggle` - Settings with switch

### Forms
- `OTPInput` - 6-digit code input
- `RadioCard` - Selectable card option
- `ChatInput` - Message composer
- `SearchBar` - Search input field

### Media
- `Avatar` - User avatar with status
- `ChatBubble` - Message bubble (sent/received)
- `MediaGrid` - Photo/video grid
- `StoryCarousel` - Horizontal user stories

### Feedback
- `Badge` - Small notification badge
- `EmptyState` - No content illustration
- `LoadingSpinner` - Activity indicator
- `SuccessMessage` - Confirmation display

---

## Implementation Priority

### Phase 1: Core Foundation (P0)
1. **Authentication & Onboarding**
   - Login, Register, OTP flows
   - Session management

2. **Main Navigation**
   - Bottom tab bar setup
   - Feed, Messages, Teams, Profile screens

3. **Basic Features**
   - View posts
   - View team profiles
   - Chat list and 1-on-1 messaging

### Phase 2: Enhanced Features (P1)
1. **Content Creation**
   - Create post with media
   - Edit profile
   - Create team

2. **Advanced Messaging**
   - Group chat
   - Media attachments
   - Video calling

3. **Settings**
   - All settings screens
   - Privacy controls

### Phase 3: Advanced Features (P2)
1. **Analytics & Training**
   - Performance dashboards
   - Training plans
   - Drill logging

2. **Events & Live**
   - Event management
   - Live streaming
   - RSVP system

3. **Pistachio System v2**
   - Green design system implementation
   - Advanced features

---

## File Structure

```
src/
├── navigation/
│   ├── RootNavigator.tsx       # Authentication → Main flow
│   ├── AuthNavigator.tsx        # Login, forgot password
│   ├── OnboardingNavigator.tsx  # Welcome → Success
│   ├── MainTabs.tsx             # Bottom tab navigation
│   └── linking.ts               # Deep link config
├── screens/
│   ├── onboarding/
│   │   ├── WelcomeScreen.tsx
│   │   ├── ChooseRoleScreen.tsx
│   │   ├── SetupProfileScreen.tsx
│   │   ├── OTPVerificationScreen.tsx
│   │   └── SuccessScreen.tsx
│   ├── auth/
│   │   ├── LoginScreen.tsx
│   │   ├── ForgotPasswordScreen.tsx
│   │   └── ResetPasswordScreen.tsx
│   ├── feed/
│   │   └── SocialFeedScreen.tsx
│   ├── messages/
│   │   ├── MessagesScreen.tsx
│   │   ├── ChatScreen.tsx
│   │   └── VideoCallScreen.tsx
│   ├── teams/
│   │   ├── TeamsScreen.tsx
│   │   ├── TeamProfileScreen.tsx
│   │   └── CreateTeamScreen.tsx
│   ├── profile/
│   │   └── ProfileScreen.tsx
│   ├── settings/
│   │   ├── SettingsScreen.tsx
│   │   └── EditProfileScreen.tsx
│   └── analytics/
│       └── DashboardScreen.tsx
├── components/
│   ├── navigation/
│   │   ├── TopAppBar.tsx
│   │   ├── BottomTabBar.tsx
│   │   └── TabControl.tsx
│   ├── chat/
│   │   ├── MessageBubble.tsx
│   │   └── ChatInput.tsx
│   └── common/
│       ├── Avatar.tsx
│       ├── Button.tsx
│       └── Card.tsx
└── contexts/
    ├── AuthContext.tsx
    ├── OnboardingContext.tsx
    └── SettingsContext.tsx
```

---

## API Integration Points

| Flow | Endpoints |
|------|-----------|
| **Auth** | `POST /login`, `POST /register`, `POST /verify-otp`, `POST /reset-password` |
| **Onboarding** | `POST /onboarding/complete`, `PUT /profile` |
| **Feed** | `GET /posts`, `POST /posts`, `POST /posts/:id/like` |
| **Messages** | `GET /conversations`, `GET /conversations/:id/messages`, `WS /chat` |
| **Teams** | `GET /teams`, `GET /teams/:id`, `POST /teams`, `POST /teams/:id/join` |
| **Profile** | `GET /users/:id`, `PUT /users/me` |
| **Analytics** | `GET /stats`, `POST /sessions`, `POST /drill-results` |
| **Events** | `GET /events`, `POST /events/:id/rsvp` |

---

## Navigation State Management

```typescript
// Global navigation state
interface NavigationState {
  // Auth state
  isAuthenticated: boolean;
  currentUser: User | null;

  // Onboarding state
  onboardingCompleted: boolean;

  // Tab navigation
  activeTab: string;
  tabHistory: Record<string, string>;

  // Modal/Stack state
  openModals: string[];
  openSheets: string[];
}
```

---

## Contributing

When adding new screens or flows:

1. Create the screen component
2. Add to the appropriate navigator
3. Update this documentation
4. Add HTML reference to `assets/stitch-screenshots/`
5. Include flow diagram in FigJam

---

## References

- **Figma Diagram:** [iPractus Navigation Flow](https://www.figma.com/online-whiteboard/create-diagram/c4c8cc2e-3cbf-49c8-a4f6-06bcb6e0b24b)
- **HTML Screens:** `assets/stitch-screenshots/*.html` (80 files)
- **Design Tokens:** See individual flow documents for color/spacing specs

---

*Last Updated: 2025-02-04*
