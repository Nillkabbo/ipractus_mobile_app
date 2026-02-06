/**
 * ThemeProvider Component
 *
 * Provides theme context and switching capabilities for the iPractus app.
 * Supports all three theme variants: ipractus-light, ipractus-dark, pistachio.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Theme,
  ThemeType,
  defaultThemeType,
  defaultTheme,
  getTheme,
  getThemeForScreen,
  isThemeDark,
  themes,
} from './index';

// ============================================================================
// TYPES
// ============================================================================

interface ThemeContextValue {
  theme: Theme;
  themeType: ThemeType;
  setTheme: (type: ThemeType) => Promise<void>;
  isDark: boolean;
  toggleTheme: () => Promise<void>;
  // Screen-specific theme override
  getScreenTheme: (screenName: string) => Theme;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// ============================================================================
// STORAGE KEYS
// ============================================================================

const STORAGE_KEY = '@ipractus_theme_preference';
const SCREEN_OVERRIDES_KEY = '@ipractus_theme_overrides';

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemeType;
  respectSystemPreference?: boolean;
}

export function ThemeProvider({
  children,
  initialTheme,
  respectSystemPreference = true,
}: ThemeProviderProps) {
  const systemColorScheme = useColorScheme();
  const [themeType, setThemeTypeState] = useState<ThemeType>(initialTheme || defaultThemeType);
  const [screenOverrides, setScreenOverrides] = useState<Record<string, ThemeType>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved theme preference on mount
  useEffect(() => {
    loadThemePreference();
  }, []);

  // Respect system preference if enabled
  useEffect(() => {
    if (respectSystemPreference && !initialTheme && isLoaded) {
      const systemTheme = systemColorScheme === 'dark' ? 'ipractus-dark' : 'ipractus-light';
      setThemeTypeState(systemTheme);
    }
  }, [systemColorScheme, isLoaded, initialTheme, respectSystemPreference]);

  // Load theme preference from storage
  const loadThemePreference = async () => {
    try {
      const [savedTheme, savedOverrides] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY),
        AsyncStorage.getItem(SCREEN_OVERRIDES_KEY),
      ]);

      if (savedTheme) {
        setThemeTypeState(savedTheme as ThemeType);
      }

      if (savedOverrides) {
        setScreenOverrides(JSON.parse(savedOverrides));
      }

      setIsLoaded(true);
    } catch (error) {
      console.warn('Failed to load theme preference:', error);
      setIsLoaded(true);
    }
  };

  // Set theme and save to storage
  const setTheme = async (type: ThemeType) => {
    try {
      setThemeTypeState(type);
      await AsyncStorage.setItem(STORAGE_KEY, type);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  };

  // Toggle between light and dark (ipractus-light <-> ipractus-dark)
  const toggleTheme = async () => {
    const newTheme: ThemeType = themeType === 'ipractus-light' ? 'ipractus-dark' : 'ipractus-light';
    await setTheme(newTheme);
  };

  // Get theme for a specific screen (with override support)
  const getScreenTheme = (screenName: string): Theme => {
    const override = screenOverrides[screenName];
    if (override) {
      return getTheme(override);
    }
    return getTheme(getThemeForScreen(screenName));
  };

  // Override theme for a specific screen
  const setScreenThemeOverride = async (screenName: string, themeType: ThemeType) => {
    try {
      const newOverrides = {
        ...screenOverrides,
        [screenName]: themeType,
      };
      setScreenOverrides(newOverrides);
      await AsyncStorage.setItem(SCREEN_OVERRIDES_KEY, JSON.stringify(newOverrides));
    } catch (error) {
      console.warn('Failed to save screen theme override:', error);
    }
  };

  // Clear screen theme override
  const clearScreenThemeOverride = async (screenName: string) => {
    try {
      const newOverrides = { ...screenOverrides };
      delete newOverrides[screenName];
      setScreenOverrides(newOverrides);
      await AsyncStorage.setItem(SCREEN_OVERRIDES_KEY, JSON.stringify(newOverrides));
    } catch (error) {
      console.warn('Failed to clear screen theme override:', error);
    }
  };

  const value: ThemeContextValue = {
    theme: themes[themeType] || defaultTheme,
    themeType,
    setTheme,
    isDark: isThemeDark(themeType),
    toggleTheme,
    getScreenTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// ============================================================================
// HOOKS
// ============================================================================

/**
 * Use theme context
 * @throws Error if used outside ThemeProvider
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/**
 * Use theme colors
 */
export function useThemeColors() {
  const { theme } = useTheme();
  return theme.colors;
}

/**
 * Use theme typography
 */
export function useThemeTypography() {
  const { theme } = useTheme();
  return theme.typography;
}

/**
 * Use theme spacing
 */
export function useThemeSpacing() {
  const { theme } = useTheme();
  return theme.spacing;
}

/**
 * Check if current theme is dark
 */
export function useIsDarkMode(): boolean {
  const { isDark } = useTheme();
  return isDark;
}

/**
 * Get themed style based on current theme
 */
export function useThemedStyle<T extends Record<string, any>>(
  styleFn: (theme: Theme) => T
): T {
  const { theme } = useTheme();
  return styleFn(theme);
}

/**
 * Get themed style with multiple variants
 */
export function useThemedStyles<T extends Record<string, any>>(
  styleFn: (theme: Theme) => T
): T {
  return useThemedStyle(styleFn);
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

/**
 * Themed component wrapper
 */
interface ThemedProps {
  children: (theme: Theme) => ReactNode;
}

export function Themed({ children }: ThemedProps) {
  const { theme } = useTheme();
  return <>{children(theme)}</>;
}

/**
 * Conditional rendering based on theme type
 */
interface ThemeMatchProps {
  type: ThemeType | ThemeType[];
  children: ReactNode;
  fallback?: ReactNode;
}

export function ThemeMatch({ type, children, fallback = null }: ThemeMatchProps) {
  const { themeType } = useTheme();
  const types = Array.isArray(type) ? type : [type];

  if (types.includes(themeType)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}

/**
 * Render only when dark theme is active
 */
export function WhenDark({ children, fallback = null }: Pick<ThemeMatchProps, 'children' | 'fallback'>) {
  return <ThemeMatch type="ipractus-dark" fallback={fallback}>{children}</ThemeMatch>;
}

/**
 * Render only when light theme is active
 */
export function WhenLight({ children, fallback = null }: Pick<ThemeMatchProps, 'children' | 'fallback'>) {
  return <ThemeMatch type="ipractus-light" fallback={fallback}>{children}</ThemeMatch>;
}

/**
 * Render only when pistachio theme is active
 */
export function WhenPistachio({ children, fallback = null }: Pick<ThemeMatchProps, 'children' | 'fallback'>) {
  return <ThemeMatch type="pistachio" fallback={fallback}>{children}</ThemeMatch>;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default ThemeProvider;
