# Master Theme Documentation

## Overview

The iPractus app now has a unified master theme system that supports all three design variants:

1. **iPractus Light** - Classic blue theme (default)
2. **iPractus Dark** - Navy chat theme
3. **Pistachio v2** - Green performance theme

## File Structure

```
src/theme/
├── index.ts                    # Master theme definitions
├── ThemeProvider.tsx          # React context provider
└── components/
    ├── ThemedButton.tsx       # Themed UI components
    └── index.ts               # Component exports
```

---

## Quick Start

### 1. Wrap Your App with ThemeProvider

```tsx
// App.tsx
import { ThemeProvider } from './src/theme/ThemeProvider';

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
```

### 2. Use Theme Hook in Components

```tsx
import { useTheme } from '../theme/ThemeProvider';

function MyScreen() {
  const { theme, themeType, setTheme } = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>
        Current theme: {themeType}
      </Text>
    </View>
  );
}
```

---

## Theme API

### Theme Type

```typescript
type ThemeType = 'ipractus-light' | 'ipractus-dark' | 'pistachio';
```

### Theme Object Structure

```typescript
interface Theme {
  type: ThemeType;
  isDark: boolean;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  shadows: ThemeShadows;
  breakpoints: ThemeBreakpoints;
  animation: ThemeAnimation;
  styles: {
    container: ViewStyle;
    card: ViewStyle;
    cardElevated: ViewStyle;
    input: ViewStyle;
    button: ViewStyle;
    h1: TextStyle;
    h2: TextStyle;
    h3: TextStyle;
    h4: TextStyle;
    body: TextStyle;
    bodySmall: TextStyle;
    caption: TextStyle;
    label: TextStyle;
  };
}
```

---

## Available Hooks

### `useTheme()`

Main hook for accessing theme.

```tsx
const { theme, themeType, setTheme, isDark, toggleTheme } = useTheme();
```

### `useThemeColors()`

Quick access to colors.

```tsx
const colors = useThemeColors();
// colors.primary, colors.background, etc.
```

### `useThemeTypography()`

Quick access to typography settings.

```tsx
const typography = useThemeTypography();
// typography.fontSize, typography.fontWeight, etc.
```

### `useIsDarkMode()`

Check if current theme is dark.

```tsx
const isDark = useIsDarkMode();
```

### `useThemedStyle()`

Generate styles based on current theme.

```tsx
const containerStyle = useThemedStyle((theme) => ({
  backgroundColor: theme.colors.background,
  padding: theme.spacing.lg,
}));
```

---

## Themed Components

### ThemedButton

```tsx
import { ThemedButton } from '../theme/components';

<ThemedButton
  title="Click Me"
  onPress={() => {}}
  variant="primary"
  size="large"
/>

// Variants: primary, secondary, outline, ghost, danger
// Sizes: small, medium, large
```

### ThemedCard

```tsx
import { ThemedCard } from '../theme/components';

<ThemedCard variant="elevated" onPress={handlePress}>
  <Text>Card content</Text>
</ThemedCard>

// Variants: default, elevated, outlined
```

### ThemedInput

```tsx
import { ThemedInput } from '../theme/components';

<ThemedInput
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
  error={error}
  leftIcon={<Icon name="mail" />}
/>
```

### ThemedText

```tsx
import { ThemedText } from '../theme/components';

<ThemedText variant="h1">Heading</ThemedText>
<ThemedText variant="body">Body text</ThemedText>
<ThemedText variant="caption">Caption text</ThemedText>

// Variants: h1, h2, h3, h4, body, bodySmall, caption, label
```

### ThemedBadge

```tsx
import { ThemedBadge } from '../theme/components';

<ThemedBadge variant="success">Active</ThemedBadge>
<ThemedBadge variant="error">3</ThemedBadge>

// Variants: default, primary, success, warning, error, info
// Sizes: small, medium, large
```

---

## Theme Switching

### Manual Theme Selection

```tsx
import { useTheme } from '../theme/ThemeProvider';

function SettingsScreen() {
  const { setTheme, themeType } = useTheme();

  return (
    <View>
      <Button title="Light Theme" onPress={() => setTheme('ipractus-light')} />
      <Button title="Dark Theme" onPress={() => setTheme('ipractus-dark')} />
      <Button title="Pistachio" onPress={() => setTheme('pistachio')} />
    </View>
  );
}
```

### Toggle Theme

```tsx
const { toggleTheme } = useTheme();

<Button title="Toggle Theme" onPress={toggleTheme} />
```

---

## Screen-Specific Themes

### Automatic Theme Detection

The system automatically assigns themes based on screen names:

```typescript
// Chat screens → ipractus-dark
ChatScreen, MessagesScreen, ConversationScreen

// Pistachio screens → pistachio
DashboardScreen, AnalyticsScreen, OnboardingScreen, etc.

// Everything else → ipractus-light
```

### Manual Screen Theme Override

```tsx
import { useTheme } from '../theme/ThemeProvider';

function MyScreen() {
  const { getScreenTheme } = useTheme();
  const screenTheme = getScreenTheme('MyScreen');

  return (
    <View style={{ backgroundColor: screenTheme.colors.background }}>
      {/* Content */}
    </View>
  );
}
```

---

## Color Palette Reference

### iPractus Light

```typescript
colors: {
  primary: '#137fec',        // Blue
  background: '#f6f7f8',     // Light gray
  text: '#111418',           // Dark gray
  card: '#ffffff',
}
```

### iPractus Dark (Chat)

```typescript
colors: {
  primary: '#1173d4',        // Navy blue
  background: '#0a0f14',     // Very dark
  backgroundElevated: '#1a2129',
  chatSentBubble: '#1173d4',
  chatReceivedBubble: '#2d353e',
}
```

### Pistachio v2

```typescript
colors: {
  primary: '#b2f15f',        // Green
  background: '#0B132B',     // Obsidian (very dark blue)
  accent: '#66D9E8',         // Cyan
  backgroundElevated: '#1C2541',
}
```

---

## Typography Reference

### Font Families

| Theme | Primary Font |
|-------|--------------|
| iPractus Light/Dark | Lexend |
| Pistachio v2 | Inter |

### Font Sizes

```typescript
fontSize: {
  xs: 11-12,
  sm: 13-14,
  base: 15-16,
  lg: 17-18,
  xl: 19-20,
  '2xl': 23-24,
  '3xl': 28-32,
  '4xl': 34-36,
}
```

### Font Weights

```typescript
fontWeight: {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
}
```

---

## Spacing Reference

```typescript
spacing: {
  xs: 4,   // 4px
  sm: 8,   // 8px
  md: 12,  // 12px
  lg: 16,  // 16px
  xl: 20-24,
  '2xl': 24-32,
  '3xl': 32-40,
  '4xl': 40-48,
}
```

---

## Border Radius Reference

```typescript
borderRadius: {
  xs: 4-16,      // Varies by theme
  sm: 8-16,
  md: 12-16,
  lg: 16-24,
  xl: 20-32,
  '2xl': 24-40,
  '3xl': 32-48,
  full: 9999,
}
```

**Note:** Pistachio uses more rounded corners (pills, 16px minimum).

---

## Utility Functions

### `getTheme(type)`

Get a theme object by type.

```typescript
import { getTheme } from '../theme';

const pistachioTheme = getTheme('pistachio');
```

### `isThemeDark(type)`

Check if a theme type is dark.

```typescript
import { isThemeDark } from '../theme';

isThemeDark('ipractus-dark'); // true
isThemeDark('ipractus-light'); // false
isThemeDark('pistachio'); // true
```

### `getThemeForScreen(screenName)`

Get appropriate theme for a screen.

```typescript
import { getThemeForScreen } from '../theme';

getThemeForScreen('ChatScreen'); // 'ipractus-dark'
getThemeForScreen('DashboardScreen'); // 'pistachio'
getThemeForScreen('FeedScreen'); // 'ipractus-light'
```

---

## Custom Component Example

```tsx
import React from 'react';
import { View } from 'react-native';
import { useThemedStyle } from '../theme/ThemeProvider';

export function MyCustomCard() {
  const cardStyle = useThemedStyle((theme) => ({
    backgroundColor: theme.colors.backgroundCard,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  }));

  const textStyle = useThemedStyle((theme) => ({
    ...theme.styles.body,
    color: theme.colors.text,
  }));

  return (
    <View style={cardStyle}>
      <Text style={textStyle}>Themed content</Text>
    </View>
  );
}
```

---

## Best Practices

1. **Use themed components** when possible for consistency
2. **Use `useThemedStyle`** for custom styles
3. **Don't hardcode colors** - always use `theme.colors.*`
4. **Don't hardcode spacing** - use `theme.spacing.*`
5. **Don't hardcode fonts** - use `theme.typography.*`
6. **Test in all three themes** to ensure consistency

---

## Migration Guide

### Before (Hardcoded)

```tsx
<View style={{ backgroundColor: '#f6f7f8', padding: 16 }}>
  <Text style={{ color: '#111418', fontSize: 16 }}>Hello</Text>
</View>
```

### After (Themed)

```tsx
import { ThemedText, ThemedSurface } from '../theme/components';

<ThemedSurface>
  <ThemedText variant="body">Hello</ThemedText>
</ThemedSurface>
```

---

*Last Updated: 2025-02-04*
