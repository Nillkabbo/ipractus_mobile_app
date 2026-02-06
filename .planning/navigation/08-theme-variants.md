# Theme Variants Documentation

## Overview
The iPractus app uses **three distinct design themes** across different screens and contexts.

---

## Theme Comparison

| Theme | Primary Color | Font | Background | Screens | Usage |
|-------|---------------|------|------------|---------|-------|
| **iPractus Light** | `#137fec` | Lexend | `#f6f7f8` | ~22 | Main light mode screens |
| **iPractus Dark** | `#1173d4` | Lexend | `#0a0f14` | ~16 | Chat, modal, dark mode |
| **Pistachio v2** | `#b2f15f` | Inter | `#0B132B` | ~19 | System redesign, performance |

---

## Theme 1: iPractus Light (Classic Blue)

### Color Palette
```typescript
const iPractusLightTheme = {
  // Brand Colors
  primary: '#137fec',
  primaryLight: '#4d9eff',
  primaryDark: '#0a5bb8',

  // Backgrounds
  backgroundLight: '#f6f7f8',
  backgroundDark: '#101922', // For dark mode toggle
  white: '#ffffff',
  elevation: '#1b1e24',

  // Text
  textPrimary: '#111418',
  textSecondary: '#617589',
  textTertiary: '#94a3b8',

  // Borders & Dividers
  border: 'rgba(0, 0, 0, 0.1)',
  divider: '#e2e8f0',

  // Status
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
};
```

### Typography
```typescript
const typography = {
  fontFamily: 'Lexend', // Primary font
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};
```

### Border Radius
```typescript
const borderRadius = {
  sm: '0.25rem',   // 4px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  full: '9999px',
};
```

### Example Screens
- `social_feed.html`
- `coach_management_dashboard.html`
- `my_profile.html`
- `team_profile.html`
- `notification_center.html`
- `messages.html`

### Design Characteristics
- Clean, modern interface
- High contrast for readability
- Rounded corners (subtle)
- White/light gray backgrounds
- Blue accent throughout

---

## Theme 2: iPractus Dark (Navy Chat Theme)

### Color Palette
```typescript
const iPractusDarkTheme = {
  // Brand Colors
  primary: '#1173d4',      // Slightly darker blue
  primaryGlow: 'rgba(17, 115, 212, 0.3)',

  // Backgrounds
  darkNavy: '#0a0f14',     // Main background
  darkElevated: '#1a2129', // Cards, inputs
  recipientBubble: '#2d353e', // Received messages

  // Text
  textPrimary: '#ffffff',
  textSecondary: '#f1f5f9',
  textTertiary: '#94a3b8',
  textMuted: '#64748b',

  // Borders & Dividers
  border: 'rgba(255, 255, 255, 0.05)',
  divider: 'rgba(255, 255, 255, 0.1)',

  // Status
  online: '#22c55e',
  offline: '#64748b',
};
```

### Typography
```typescript
const typography = {
  fontFamily: 'Lexend', // Same as iPractus Light
  // ... same weights
};
```

### Border Radius
```typescript
const borderRadius = {
  sm: '0.5rem',     // 8px - more rounded than light
  md: '1rem',       // 16px
  lg: '2rem',       // 32px
  xl: '3rem',       // 48px
  full: '9999px',
};
```

### Example Screens
- `1_on_1_message_chat.html`
- `pistachio_messages__system_v2.html` (mixed with Pistachio elements)
- `settings.html` (dark mode)

### Design Characteristics
- **Purpose-built for chat interfaces**
- Very dark backgrounds for eye comfort
- High contrast message bubbles
- Soft glow effects on interactive elements
- More rounded corners (friendly feel)
- iOS blur effects on headers/footers

### Chat-Specific Colors
```typescript
// Message Bubbles
const chatColors = {
  sentBubble: '#1173d4',
  sentText: '#ffffff',

  receivedBubble: '#2d353e',
  receivedText: '#f1f5f9',

  inputBackground: '#0a0f14',
  inputBorder: 'rgba(255, 255, 255, 0.1)',
  placeholder: '#64748b',
};
```

---

## Theme 3: Pistachio v2 (Green Performance)

### Color Palette
```typescript
const pistachioTheme = {
  // Brand Colors
  primary: '#b2f15f',           // Pistachio green
  primaryLight: '#b1ec65',      // Light variant
  primaryDark: '#8bc13e',       // Dark variant
  primaryGlow: 'rgba(178, 241, 95, 0.4)',

  // Obsidian Backgrounds
  obsidian: '#0B132B',          // Main background (very dark blue)
  obsidianElevated: '#1C2541',  // Cards, inputs
  obsidianLight: '#1C2541',

  // Accent Colors
  stormyBlue: '#4E7D96',        // Secondary accent
  cyanAccent: '#66D9E8',        // Status, highlights
  paleYellow: '#E5F1AF',        // Descriptive text

  // Text
  textPrimary: '#ffffff',
  textSecondary: '#adb99d',
  textMuted: '#49543b',

  // Special
  danger: '#FF4D4D',
};
```

### Typography
```typescript
const typography = {
  fontFamily: 'Inter', // Different from iPractus
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};
```

### Border Radius
```typescript
const borderRadius = {
  DEFAULT: '1rem',      // 16px - default is more rounded
  lg: '2rem',           // 32px
  xl: '3rem',           // 48px
  full: '9999px',
};
```

### Example Screens
- `pistachio_onboarding__system_v2.html`
- `pistachio_dashboard__system_v2.html`
- `pistachio_messages__system_v2.html`
- `pistachio_settings__system_v2.html`
- `pistachio_analytics__system_v2.html`
- `pistachio_reset_password__v2.html`

### Design Characteristics
- **"System v2" redesign language**
- High-performance athletic focus
- Green primary (energy, growth, performance)
- Obsidian backgrounds (very dark, premium feel)
- Cyan accents (tech, modern)
- More playful/rounded design
- Glow effects on primary elements
- Status indicators with cyan glow

### Special Effects
```typescript
const effects = {
  // Cyan status glow
  statusGlow: 'box-shadow: 0 0 8px #66D9E8',

  // Primary pistachio glow
  pistachioGlow: 'box-shadow: 0 0 12px rgba(178, 241, 95, 0.4)',

  // Primary shadow
  primaryShadow: 'box-shadow: 0 8px 30px rgb(178, 241, 95, 0.2)',

  // iOS blur
  iosBlur: 'backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);',
};
```

---

## Theme Selection Guide

### When to Use Each Theme

| Scenario | Recommended Theme |
|----------|------------------|
| **Main feed browsing** | iPractus Light |
| **Chat/conversations** | iPractus Dark |
| **Performance analytics** | Pistachio v2 |
| **Onboarding** | Pistachio v2 (new) or iPractus Light |
| **Settings** | Pistachio v2 (new) or iPractus Light |
| **Training sessions** | Pistachio v2 |
| **Team management** | iPractus Light |
| **Live streaming** | Pistachio v2 |

---

## Theme Switching Implementation

```typescript
// Theme type definition
type ThemeType = 'ipractus-light' | 'ipractus-dark' | 'pistachio';

interface ThemeConfig {
  type: ThemeType;
  colors: typeof iPractusLightTheme.colors;
  typography: typeof iPractusLightTheme.typography;
  borderRadius: typeof iPractusLightTheme.borderRadius;
}

// Theme provider hook
const useTheme = (type: ThemeType): ThemeConfig => {
  switch (type) {
    case 'ipractus-light':
      return iPractusLightTheme;
    case 'ipractus-dark':
      return iPractusDarkTheme;
    case 'pistachio':
      return pistachioTheme;
    default:
      return iPractusLightTheme;
  }
};

// Context-based theme selection
const getThemeForScreen = (screenName: string): ThemeType => {
  const darkScreens = ['ChatScreen', 'MessagesScreen'];
  const pistachioScreens = [
    'DashboardScreen',
    'AnalyticsScreen',
    'OnboardingScreen',
    'TrainingScreen',
  ];

  if (darkScreens.includes(screenName)) return 'ipractus-dark';
  if (pistachioScreens.includes(screenName)) return 'pistachio';
  return 'ipractus-light';
};
```

---

## Theme Component Examples

### Button Styling by Theme

```typescript
const Button = ({ variant = 'primary', theme, ...props }) => {
  const styles = {
    ipractus_light: {
      primary: {
        backgroundColor: '#137fec',
        color: 'white',
        borderRadius: 8,
      },
    },
    ipractus_dark: {
      primary: {
        backgroundColor: '#1173d4',
        color: 'white',
        borderRadius: 16,
        boxShadow: '0 0 12px rgba(17, 115, 212, 0.3)',
      },
    },
    pistachio: {
      primary: {
        backgroundColor: '#b2f15f',
        color: '#0B132B',
        borderRadius: 9999, // Full pill shape
        boxShadow: '0 8px 30px rgb(178, 241, 95, 0.2)',
      },
    },
  };

  return <button style={styles[theme].primary} {...props} />;
};
```

---

## Token Mapping

### Common Tokens Across Themes

| Token | iPractus Light | iPractus Dark | Pistachio |
|-------|---------------|---------------|-----------|
| `--color-primary` | `#137fec` | `#1173d4` | `#b2f15f` |
| `--color-bg` | `#f6f7f8` | `#0a0f14` | `#0B132B` |
| `--color-bg-elevated` | `#ffffff` | `#1a2129` | `#1C2541` |
| `--color-text` | `#111418` | `#ffffff` | `#ffffff` |
| `--font-family` | `Lexend` | `Lexend` | `Inter` |
| `--radius-sm` | `4px` | `8px` | `16px` |
| `--radius-md` | `8px` | `16px` | `16px` |
| `--radius-lg` | `12px` | `32px` | `32px` |

---

## Implementation Checklist

### Phase 1: Theme Foundation
- [ ] Define theme types and interfaces
- [ ] Create theme configuration objects
- [ ] Build theme provider context
- [ ] Create theme switching hook

### Phase 2: Component Styling
- [ ] Create themed button variants
- [ ] Create themed input components
- [ ] Create themed card components
- [ ] Create themed navigation components

### Phase 3: Screen Implementation
- [ ] Apply iPractus Light to feed/profile
- [ ] Apply iPractus Dark to chat
- [ ] Apply Pistachio to analytics/training
- [ ] Implement smooth theme transitions

---

## Theme Migration Strategy

### Current State
- 22 screens use iPractus Light
- 16 screens use iPractus Dark
- 19 screens use Pistachio v2

### Recommendation
**Maintain all three themes** as they serve different purposes:

1. **iPractus Light** = Default brand experience
2. **iPractus Dark** = Chat-specific dark mode (eye comfort)
3. **Pistachio v2** = Performance/athletic features (future direction)

### Migration Path
1. Keep existing themes as-is
2. Use theme based on screen context
3. Allow user theme preference where applicable
4. Gradually adopt Pistachio v2 for new features

---

## Design System References

| Screen File | Theme | Primary | Font |
|-------------|-------|---------|------|
| `social_feed.html` | iPractus Light | `#137fec` | Lexend |
| `1_on_1_message_chat.html` | iPractus Dark | `#1173d4` | Lexend |
| `pistachio_dashboard__system_v2.html` | Pistachio | `#b2f15f` | Inter |
| `coach_management_dashboard.html` | iPractus Light | `#137fec` | Lexend |
| `pistachio_onboarding__system_v2.html` | Pistachio | `#b2f15f` | Inter |
| `settings.html` | iPractus Dark | `#1173d4` | Lexend |
| `notification_center.html` | iPractus Light | `#137fec` | Lexend |
| `team_profile.html` | iPractus Light | `#137fec` | Lexend |
| `pistachio_messages__system_v2.html` | Pistachio | `#b2f15f` | Inter |
| `pistachio_reset_password__v2.html` | Pistachio | `#b2f15f` | Inter |

---

*Last Updated: 2025-02-04*
