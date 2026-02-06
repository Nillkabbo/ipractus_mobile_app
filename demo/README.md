# iPractus Navigation Demo

A self-contained demo showcasing **80 exact HTML designs** from the iPractus mobile app with navigation capabilities.

> **Use as Design Reference** - This demo serves as a complete visual reference for React Native conversion. See conversion guides below.

## 📚 React Native Conversion Guides

This demo includes comprehensive documentation for React Native conversion:

| Document | Description |
|----------|-------------|
| **[REACT_NATIVE_CONVERSION_REFERENCE.md](REACT_NATIVE_CONVERSION_REFERENCE.md)** | Complete technical specification with theme configs, component code examples, dependencies, and Tailwind to StyleSheet conversion |
| **[COMPONENT_CATALOG.md](COMPONENT_CATALOG.md)** | Visual component catalog with exact measurements, spacing, and styling for all UI components |
| **[SCREEN_INDEX.md](SCREEN_INDEX.md)** | Quick reference index of all 80 screens organized by category with theme information |

### Quick Conversion Links
- **Theme Specifications** → See Conversion Reference → Theme Specifications
- **Component Library** → See Component Catalog → All components with exact dimensions
- **Dependencies** → See Conversion Reference → Dependencies section
- **Icon Mapping** → See Conversion Reference → Icon System section

## 🎯 Features

### 📱 All Original Screens (80 screens)
- **Exact HTML designs** - loaded from `assets/stitch-screenshots/` without modification
- **Three theme variants**: iPractus Light, iPractus Dark, Pistachio v2
- **Self-contained** - all screens copied locally
- **Iframe loading** - preserves all original styling and functionality

### 🎮 Navigation Controls
- **Screens Button** - Opens dropdown with all screens organized by category
- **Back Button** - Navigate through history
- **Keyboard Shortcut** - Press `Escape` to go back

## 📂 Demo Structure

```
demo/
├── index.html                                   # Main navigation demo app
├── server.py                                    # Python HTTP server
├── README.md                                    # This file
├── REACT_NATIVE_CONVERSION_REFERENCE.md        # Technical conversion guide
├── COMPONENT_CATALOG.md                         # Visual component specifications
├── SCREEN_INDEX.md                              # Screen-by-screen index
├── package.json                                 # Node.js server options
└── assets/
    └── stitch-screenshots/                     # All 80 original HTML screens
        ├── welcome_to_ipractus.html
        ├── choose_your_role.html
        ├── otp_verification.html
        ├── social_feed.html
        ├── pistachio_dashboard__system_v2.html
        ├── 1_on_1_message_chat.html
        ├── ... (75 more screens)
└── screens/                                     # Legacy renamed copies (78)
    ├── 01-welcome.html
    ├── feed.html
    └── ... (76 more)
```
    ├── 01-welcome.html
    ├── 02-role.html
    ├── 03-setup-profile.html
    ├── 04-otp.html
    ├── 05-success.html
    ├── role-pistachio.html
    ├── otp-pistachio.html
    ├── success-pistachio.html
    ├── forgot-password.html
    ├── forgot-password-pistachio.html
    ├── reset-password.html
    ├── reset-password-pistachio.html
    ├── feed.html
    ├── feed-pistachio.html
    ├── messages.html
    ├── messages-pistachio.html
    ├── chat-1on1.html
    ├── chat-1on1-pistachio.html
    ├── teams.html
    ├── teams-pistachio.html
    ├── team-profile.html
    ├── team-roster.html
    ├── profile.html
    ├── profile-pistachio.html
    ├── edit-profile.html
    ├── settings.html
    ├── settings-pistachio.html
    ├── privacy.html
    ├── privacy-pistachio.html
    ├── dashboard.html
    ├── dashboard-pistachio.html
    ├── analytics-pistachio.html
    ├── athlete-stats.html
    ├── athlete-stats-pistachio.html
    ├── coach-analytics.html
    ├── coach-hub-pistachio.html
    ├── training-plan.html
    ├── training-plan-pistachio.html
    ├── drill.html
    ├── drill-pistachio.html
    ├── log-results.html
    ├── log-results-pistachio.html
    ├── session.html
    ├── session-pistachio.html
    ├── event.html
    ├── event-pistachio.html
    ├── live-sports.html
    ├── live-pistachio.html
    ├── live-chat.html
    ├── live-chat-pistachio.html
    ├── go-live.html
    ├── streamer.html
    ├── stream-summary.html
    ├── connections.html
    ├── explore.html
    ├── notifications.html
    ├── activity-alerts.html
    ├── media-library.html
    ├── media-albums.html
    ├── achievements.html
    ├── team-schedule.html
    ├── video-call.html
    ├── video-call-pistachio.html
    ├── video-player.html
    ├── blocked.html
    ├── help.html
    ├── help-pistachio.html
    ├── about.html
    ├── about-pistachio.html
    ├── terms.html
    ├── terms-pistachio.html
    ├── privacy-policy.html
    ├── pro.html
    ├── refer.html
    ├── refer-pistachio.html
    ├── group-settings.html
    ├── group-settings-pistachio.html
    └── group-invite.html
```

## 🚀 How to Run

### Option 1: Python Server (Recommended)
```bash
cd demo
python3 server.py
# Then open http://localhost:8000
```

### Option 2: Node.js Server
```bash
cd demo
npm run start:node
# Or: npx serve . -p 8000
```

### Option 3: PHP Server
```bash
cd demo
php -S localhost:8000
```

## 📖 Screen Categories

| Category | Screen Count | Examples |
|----------|--------------|----------|
| **Onboarding** | 8 screens | 01-welcome, 02-role, 03-setup-profile, 04-otp, 05-success |
| **Auth** | 5 screens | forgot-password, reset-password (both themes) |
| **Main** | 13 screens | feed, messages, teams, profile (all themes) |
| **Settings** | 4 screens | settings, privacy (both themes) |
| **Analytics** | 15 screens | dashboard, stats, training, drills |
| **Events** | 9 screens | events, live, streaming |
| **Other** | 24 screens | help, about, media, video calls, etc. |

## 🎨 Theme Comparison

| Theme | Primary Color | Font | Example Screens |
|-------|---------------|------|-----------------|
| **iPractus Light** | `#137fec` (Blue) | Lexend | feed.html, profile.html, teams.html |
| **iPractus Dark** | `#1173d4` (Navy) | Lexend | chat-1on1.html, messages.html |
| **Pistachio v2** | `#b2f15f` (Green) | Inter | feed-pistachio.html, dashboard-pistachio.html |

## 🔄 Example Navigation Flows

### Onboarding Flow
```
01-welcome → 02-role → 03-setup-profile → 04-otp → 05-success
```

### Theme Comparison Flow
```
feed.html → feed-pistachio.html
chat-1on1.html → chat-1on1-pistachio.html
settings.html → settings-pistachio.html
```

### Main App Flow
```
feed → teams → team-profile → messages → chat-1on1
```

## 💡 Usage Tips

1. **Click "Screens"** - See all 78 screens organized by category
2. **Use "← Back"** - Navigate through your history
3. **Press Escape** - Quick keyboard shortcut to go back
4. **Compare themes** - Open same screen in different themes

## 📝 Screen Naming Convention

- **01-05**: Numbered onboarding flow screens
- **role-pistachio**: Pistachio theme variant
- **chat-1on1**: Descriptive names for complex screens
- **-pistachio suffix**: Indicates Pistachio v2 theme

## 🛠️ Technical Details

- **Tailwind CSS** - Loaded via CDN for styling
- **Material Icons** - Google Material Symbols Outlined
- **Pure JavaScript** - No framework dependencies
- **Fetch API** - Dynamic screen loading
- **History Management** - Built-in navigation history

## 📱 Browser Support

- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This demo uses the original HTML designs from the iPractus mobile app project.

---

**Total Screens: 80** | **Themes: 3** | **Conversion Guides: ✅**
