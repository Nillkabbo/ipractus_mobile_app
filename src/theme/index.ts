/**
 * iPractus Master Theme Configuration
 *
 * This file consolidates all three theme variants:
 * - ipractus-light: Classic blue theme for main screens
 * - ipractus-dark: Navy chat theme for messaging
 * - pistachio: Green performance theme for v2 features
 */

import { TextStyle, ViewStyle } from 'react-native';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type ThemeType = 'ipractus-light' | 'ipractus-dark' | 'pistachio';

export type ColorScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

export interface ThemeColors {
  // Brand colors
  primary: string;
  primaryLight: string;
  primaryDark: string;
  primaryGlow?: string;

  // Secondary/Accent colors
  secondary?: string;
  accent?: string;
  accentLight?: string;
  accentDark?: string;

  // Backgrounds
  background: string;
  backgroundElevated: string;
  backgroundCard: string;
  backgroundInput: string;

  // Surface colors
  surface: string;
  surfaceVariant: string;

  // Text colors
  text: string;
  textSecondary: string;
  textTertiary: string;
  textMuted: string;
  textInverse: string;
  textOnPrimary: string;

  // Border & Divider
  border: string;
  divider: string;
  outline: string;
  outlineFocus: string;

  // Status colors
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
  error: string;
  errorLight: string;
  info: string;
  infoLight: string;

  // Chat-specific colors
  chatSentBubble?: string;
  chatSentText?: string;
  chatReceivedBubble?: string;
  chatReceivedText?: string;
  chatOnline?: string;
  chatOffline?: string;

  // Overlay & Mask
  overlay: string;
  mask: string;

  // Shadow colors
  shadow: string;
  shadowLight: string;
}

export interface ThemeTypography {
  fontFamily: {
    primary: string;
    secondary?: string;
    mono?: string;
  };

  fontSize: {
    xs: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
    '4xl': number;
    '5xl': number;
  };

  fontWeight: {
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
    extrabold?: number;
  };

  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };

  letterSpacing: {
    tight: number;
    normal: number;
    wide: number;
  };
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  '4xl': number;
}

export interface ThemeBorderRadius {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  full: number;
}

export interface ThemeShadows {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
  primary?: string;
  accent?: string;
  glow?: string;
}

export interface ThemeBreakpoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface ThemeAnimation {
  fast: number;
  normal: number;
  slow: number;
  spring: {
    stiffness: number;
    damping: number;
    mass: number;
  };
}

export interface Theme {
  type: ThemeType;
  isDark: boolean;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  shadows: ThemeShadows;
  breakpoints: ThemeBreakpoints;
  animation: ThemeAnimation;
  // Common style presets
  styles: {
    // Container styles
    container: ViewStyle;
    card: ViewStyle;
    cardElevated: ViewStyle;
    input: ViewStyle;
    button: ViewStyle;

    // Text styles
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

// ============================================================================
// THEME 1: IPRADIUS LIGHT (Classic Blue)
// ============================================================================

export const ipractusLightTheme: Theme = {
  type: 'ipractus-light',
  isDark: false,

  colors: {
    // Brand Colors
    primary: '#137fec',
    primaryLight: '#4d9eff',
    primaryDark: '#0a5bb8',

    // Backgrounds
    background: '#f6f7f8',
    backgroundElevated: '#ffffff',
    backgroundCard: '#ffffff',
    backgroundInput: '#ffffff',

    // Surface
    surface: '#ffffff',
    surfaceVariant: '#f1f5f9',

    // Text
    text: '#111418',
    textSecondary: '#617589',
    textTertiary: '#94a3b8',
    textMuted: '#cbd5e1',
    textInverse: '#ffffff',
    textOnPrimary: '#ffffff',

    // Border
    border: 'rgba(0, 0, 0, 0.1)',
    divider: '#e2e8f0',
    outline: 'rgba(0, 0, 0, 0.2)',
    outlineFocus: '#137fec',

    // Status
    success: '#22c55e',
    successLight: '#86efac',
    warning: '#f59e0b',
    warningLight: '#fcd34d',
    error: '#ef4444',
    errorLight: '#fca5a5',
    info: '#3b82f6',
    infoLight: '#93c5fd',

    // Overlay
    overlay: 'rgba(0, 0, 0, 0.5)',
    mask: 'rgba(0, 0, 0, 0.3)',

    // Shadow
    shadow: 'rgba(0, 0, 0, 0.1)',
    shadowLight: 'rgba(0, 0, 0, 0.05)',
  },

  typography: {
    fontFamily: {
      primary: 'Lexend',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
      '5xl': 48,
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
    letterSpacing: {
      tight: -0.02,
      normal: 0,
      wide: 0.05,
    },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    '4xl': 40,
  },

  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    full: 9999,
  },

  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    primary: '0 4px 14px 0 rgba(19, 127, 236, 0.39)',
  },

  breakpoints: {
    xs: 375,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },

  animation: {
    fast: 200,
    normal: 300,
    slow: 500,
    spring: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
    },
  },

  styles: {
    container: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.05)',
    },
    cardElevated: {
      backgroundColor: '#ffffff',
      borderRadius: 16,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 8,
    },
    input: {
      backgroundColor: '#ffffff',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      color: '#111418',
    },
    button: {
      backgroundColor: '#137fec',
      borderRadius: 8,
      paddingVertical: 14,
      paddingHorizontal: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    h1: {
      fontSize: 30,
      fontWeight: '700' as const,
      color: '#111418',
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: 24,
      fontWeight: '700' as const,
      color: '#111418',
      letterSpacing: -0.3,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as const,
      color: '#111418',
      letterSpacing: -0.2,
    },
    h4: {
      fontSize: 18,
      fontWeight: '600' as const,
      color: '#111418',
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      color: '#111418',
      lineHeight: 24,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400' as const,
      color: '#617589',
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      fontWeight: '500' as const,
      color: '#94a3b8',
      letterSpacing: 0.5,
    },
    label: {
      fontSize: 14,
      fontWeight: '600' as const,
      color: '#111418',
      letterSpacing: 0.3,
    },
  },
};

// ============================================================================
// THEME 2: IPRADIUS DARK (Navy Chat Theme)
// ============================================================================

export const ipractusDarkTheme: Theme = {
  type: 'ipractus-dark',
  isDark: true,

  colors: {
    // Brand Colors
    primary: '#1173d4',
    primaryLight: '#3d8ae8',
    primaryDark: '#0a4a9c',
    primaryGlow: 'rgba(17, 115, 212, 0.3)',

    // Backgrounds
    background: '#0a0f14',
    backgroundElevated: '#1a2129',
    backgroundCard: '#1a2129',
    backgroundInput: '#1a2129',

    // Surface
    surface: '#1a2129',
    surfaceVariant: '#242d38',

    // Text
    text: '#ffffff',
    textSecondary: '#f1f5f9',
    textTertiary: '#94a3b8',
    textMuted: '#64748b',
    textInverse: '#0a0f14',
    textOnPrimary: '#ffffff',

    // Border
    border: 'rgba(255, 255, 255, 0.05)',
    divider: 'rgba(255, 255, 255, 0.1)',
    outline: 'rgba(255, 255, 255, 0.2)',
    outlineFocus: '#1173d4',

    // Status
    success: '#22c55e',
    successLight: '#4ade80',
    warning: '#f59e0b',
    warningLight: '#fbbf24',
    error: '#ef4444',
    errorLight: '#f87171',
    info: '#3b82f6',
    infoLight: '#60a5fa',

    // Chat-specific
    chatSentBubble: '#1173d4',
    chatSentText: '#ffffff',
    chatReceivedBubble: '#2d353e',
    chatReceivedText: '#f1f5f9',
    chatOnline: '#22c55e',
    chatOffline: '#64748b',

    // Overlay
    overlay: 'rgba(0, 0, 0, 0.7)',
    mask: 'rgba(0, 0, 0, 0.5)',

    // Shadow
    shadow: 'rgba(0, 0, 0, 0.3)',
    shadowLight: 'rgba(0, 0, 0, 0.15)',
  },

  typography: {
    fontFamily: {
      primary: 'Lexend',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      base: 15,
      lg: 17,
      xl: 19,
      '2xl': 23,
      '3xl': 28,
      '4xl': 34,
      '5xl': 46,
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
    letterSpacing: {
      tight: -0.02,
      normal: 0,
      wide: 0.05,
    },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    '4xl': 40,
  },

  borderRadius: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 32,
    '2xl': 40,
    '3xl': 48,
    full: 9999,
  },

  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)',
    primary: '0 0 12px rgba(17, 115, 212, 0.5)',
    glow: '0 0 20px rgba(17, 115, 212, 0.3)',
  },

  breakpoints: {
    xs: 375,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },

  animation: {
    fast: 200,
    normal: 300,
    slow: 500,
    spring: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
    },
  },

  styles: {
    container: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    card: {
      backgroundColor: '#1a2129',
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    cardElevated: {
      backgroundColor: '#1a2129',
      borderRadius: 20,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 8,
    },
    input: {
      backgroundColor: '#1a2129',
      borderRadius: 24,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      paddingHorizontal: 20,
      paddingVertical: 14,
      fontSize: 15,
      color: '#ffffff',
    },
    button: {
      backgroundColor: '#1173d4',
      borderRadius: 16,
      paddingVertical: 14,
      paddingHorizontal: 24,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#1173d4',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    h1: {
      fontSize: 28,
      fontWeight: '700' as const,
      color: '#ffffff',
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: 24,
      fontWeight: '700' as const,
      color: '#ffffff',
      letterSpacing: -0.3,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as const,
      color: '#ffffff',
      letterSpacing: -0.2,
    },
    h4: {
      fontSize: 18,
      fontWeight: '600' as const,
      color: '#ffffff',
    },
    body: {
      fontSize: 15,
      fontWeight: '400' as const,
      color: '#f1f5f9',
      lineHeight: 22,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400' as const,
      color: '#94a3b8',
      lineHeight: 20,
    },
    caption: {
      fontSize: 11,
      fontWeight: '500' as const,
      color: '#64748b',
      letterSpacing: 0.5,
    },
    label: {
      fontSize: 14,
      fontWeight: '600' as const,
      color: '#ffffff',
      letterSpacing: 0.3,
    },
  },
};

// ============================================================================
// THEME 3: PISTACHIO V2 (Green Performance)
// ============================================================================

export const pistachioTheme: Theme = {
  type: 'pistachio',
  isDark: true,

  colors: {
    // Brand Colors
    primary: '#b2f15f',
    primaryLight: '#c1f77a',
    primaryDark: '#8bc13e',
    primaryGlow: 'rgba(178, 241, 95, 0.4)',

    // Secondary/Accent
    secondary: '#4E7D96',
    accent: '#66D9E8',
    accentLight: '#7EE5F2',
    accentDark: '#4AB8C7',

    // Backgrounds (Obsidian)
    background: '#0B132B',
    backgroundElevated: '#1C2541',
    backgroundCard: '#1C2541',
    backgroundInput: '#1C2541',

    // Surface
    surface: '#1C2541',
    surfaceVariant: '#242D47',

    // Text
    text: '#ffffff',
    textSecondary: '#E5F1AF',
    textTertiary: '#adb99d',
    textMuted: '#49543b',
    textInverse: '#0B132B',
    textOnPrimary: '#0B132B',

    // Border
    border: 'rgba(78, 125, 150, 0.2)',
    divider: 'rgba(78, 125, 150, 0.3)',
    outline: 'rgba(78, 125, 150, 0.4)',
    outlineFocus: '#b2f15f',

    // Status
    success: '#b2f15f',
    successLight: '#c1f77a',
    warning: '#f59e0b',
    warningLight: '#fcd34d',
    error: '#FF4D4D',
    errorLight: '#FF6B6B',
    info: '#66D9E8',
    infoLight: '#7EE5F2',

    // Chat-specific
    chatSentBubble: '#b2f15f',
    chatSentText: '#0B132B',
    chatReceivedBubble: '#1C2541',
    chatReceivedText: '#E5F1AF',
    chatOnline: '#66D9E8',
    chatOffline: '#4E7D96',

    // Overlay
    overlay: 'rgba(11, 19, 43, 0.8)',
    mask: 'rgba(11, 19, 43, 0.6)',

    // Shadow
    shadow: 'rgba(0, 0, 0, 0.4)',
    shadowLight: 'rgba(0, 0, 0, 0.2)',
  },

  typography: {
    fontFamily: {
      primary: 'Inter',
      secondary: 'Inter',
    },
    fontSize: {
      xs: 11,
      sm: 13,
      base: 15,
      lg: 17,
      xl: 19,
      '2xl': 24,
      '3xl': 32,
      '4xl': 36,
      '5xl': 48,
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.7,
    },
    letterSpacing: {
      tight: -0.02,
      normal: 0,
      wide: 0.1,
    },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    '2xl': 32,
    '3xl': 40,
    '4xl': 48,
  },

  borderRadius: {
    xs: 16,
    sm: 16,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 40,
    '3xl': 48,
    full: 9999,
  },

  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 1px 2px 0 rgba(0, 0, 0, 0.4)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.4)',
    primary: '0 8px 30px rgb(178, 241, 95, 0.2)',
    accent: '0 0 12px rgba(102, 217, 232, 0.5)',
    glow: '0 0 20px rgba(178, 241, 95, 0.4)',
  },

  breakpoints: {
    xs: 375,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },

  animation: {
    fast: 150,
    normal: 250,
    slow: 400,
    spring: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
    },
  },

  styles: {
    container: {
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    card: {
      backgroundColor: '#1C2541',
      borderRadius: 16,
      padding: 20,
      borderWidth: 1,
      borderColor: 'rgba(78, 125, 150, 0.1)',
    },
    cardElevated: {
      backgroundColor: '#1C2541',
      borderRadius: 24,
      padding: 24,
      shadowColor: '#b2f15f',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 12,
    },
    input: {
      backgroundColor: '#1C2541',
      borderRadius: 24,
      borderWidth: 2,
      borderColor: 'rgba(78, 125, 150, 0.2)',
      paddingHorizontal: 24,
      paddingVertical: 16,
      fontSize: 15,
      color: '#ffffff',
    },
    button: {
      backgroundColor: '#b2f15f',
      borderRadius: 9999,
      paddingVertical: 16,
      paddingHorizontal: 32,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#b2f15f',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 8,
    },
    h1: {
      fontSize: 32,
      fontWeight: '700' as const,
      color: '#ffffff',
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: 24,
      fontWeight: '600' as const,
      color: '#ffffff',
      letterSpacing: -0.3,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as const,
      color: '#ffffff',
      letterSpacing: -0.2,
    },
    h4: {
      fontSize: 18,
      fontWeight: '600' as const,
      color: '#ffffff',
    },
    body: {
      fontSize: 15,
      fontWeight: '400' as const,
      color: '#E5F1AF',
      lineHeight: 22,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400' as const,
      color: '#adb99d',
      lineHeight: 20,
    },
    caption: {
      fontSize: 10,
      fontWeight: '500' as const,
      color: '#adb99d',
      letterSpacing: 0.15,
      textTransform: 'uppercase' as const,
    },
    label: {
      fontSize: 14,
      fontWeight: '600' as const,
      color: '#ffffff',
      letterSpacing: 0.3,
      textTransform: 'uppercase' as const,
    },
  },
};

// ============================================================================
// THEME MAP
// ============================================================================

export const themes: Record<ThemeType, Theme> = {
  'ipractus-light': ipractusLightTheme,
  'ipractus-dark': ipractusDarkTheme,
  'pistachio': pistachioTheme,
};

// ============================================================================
// DEFAULT THEME
// ============================================================================

export const defaultThemeType: ThemeType = 'ipractus-light';
export const defaultTheme = ipractusLightTheme;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get theme by type
 */
export function getTheme(type: ThemeType = defaultThemeType): Theme {
  return themes[type] || defaultTheme;
}

/**
 * Check if theme type is dark
 */
export function isThemeDark(type: ThemeType): boolean {
  return themes[type]?.isDark ?? false;
}

/**
 * Get appropriate theme for a screen
 */
export function getThemeForScreen(screenName: string): ThemeType {
  // Chat screens use dark theme
  const chatScreens = [
    'ChatScreen',
    'MessagesScreen',
    'ConversationScreen',
    'VideoCallScreen',
  ];

  // Pistachio screens
  const pistachioScreens = [
    'DashboardScreen',
    'AnalyticsScreen',
    'AthleteStatsScreen',
    'CoachAnalyticsScreen',
    'OnboardingScreen',
    'ChooseRoleScreen',
    'OTPVerificationScreen',
    'SettingsScreen',
    'TrainingScreen',
    'DrillScreen',
    'LogResultsScreen',
  ];

  if (chatScreens.includes(screenName)) {
    return 'ipractus-dark';
  }

  if (pistachioScreens.includes(screenName)) {
    return 'pistachio';
  }

  return 'ipractus-light';
}

/**
 * Get color with opacity
 */
export function withOpacity(
  color: string,
  opacity: number
): string {
  // Handle hex colors
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  // Handle rgba
  if (color.startsWith('rgb')) {
    return color.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
  }

  return color;
}

/**
 * Mix two colors
 */
export function mixColors(
  color1: string,
  color2: string,
  weight: number = 0.5
): string {
  // Simple hex color mixing
  const hex1 = color1.replace('#', '');
  const hex2 = color2.replace('#', '');

  const r1 = parseInt(hex1.substring(0, 2), 16);
  const g1 = parseInt(hex1.substring(2, 4), 16);
  const b1 = parseInt(hex1.substring(4, 6), 16);

  const r2 = parseInt(hex2.substring(0, 2), 16);
  const g2 = parseInt(hex2.substring(2, 4), 16);
  const b2 = parseInt(hex2.substring(4, 6), 16);

  const r = Math.round(r1 * (1 - weight) + r2 * weight);
  const g = Math.round(g1 * (1 - weight) + g2 * weight);
  const b = Math.round(b1 * (1 - weight) + b2 * weight);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default themes;
