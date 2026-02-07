// Design tokens from Google Stitch project
export const colors = {
  // Primary brand color
  primary: '#137fec',

  // Auth / Sign-in colors (from Sports Frontend sign-in-from)
  auth: {
    primary: '#b4fb50',
    backgroundNavy: '#071a36',
    cardDark: '#000c1e',
    placeholderGray: '#a3a2a3',
    textWhite: '#ffffff',
    textMuted: '#9ca3af',
    inputBorder: '#428389',
    gradientTeal: 'rgb(66, 131, 137)',
    gradientNavy: 'rgb(0, 12, 30)',
  } as const,

  // Feed / Social
  feed: {
    primary: '#b4fb50',
    backgroundNavy: '#071a36',
    cardDark: '#000c1e',
    accentTeal: '#428389',
    textMuted: '#9ca3af',
    border: 'rgba(255,255,255,0.1)',
  } as const,

  // Dark theme colors (default)
  background: '#000000',
  surface: '#1a1a1a',
  surfaceVariant: '#2a2a2a',
  text: '#ffffff',
  textSecondary: '#a0a0a0',
  textDisabled: '#666666',
  border: '#333333',
  error: '#ff4444',
  success: '#00cc66',
  warning: '#ffaa00',
  info: '#137fec',

  // Light theme colors
  light: {
    background: '#ffffff',
    surface: '#f5f5f5',
    surfaceVariant: '#e8e8e8',
    text: '#000000',
    textSecondary: '#666666',
    textDisabled: '#a0a0a0',
    border: '#e0e0e0',
  },
} as const;
