import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { DefaultTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from '../config/theme';
import { colors } from '../constants/colors';

type ThemeMode = 'light' | 'dark' | 'system';

interface CustomTheme {
  colors: typeof colors;
}

interface ThemeContextType {
  themeMode: ThemeMode;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  theme: typeof DefaultTheme;
  colors: CustomTheme['colors'];
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');

  useEffect(() => {
    // Load saved theme preference
    AsyncStorage.getItem('themeMode').then(saved => {
      if (saved) setThemeModeState(saved as ThemeMode);
    });
  }, []);

  const setThemeMode = async (mode: ThemeMode) => {
    setThemeModeState(mode);
    await AsyncStorage.setItem('themeMode', mode);
  };

  const isDark = themeMode === 'system'
    ? systemScheme === 'dark'
    : themeMode === 'dark';

  const theme = isDark ? darkTheme : lightTheme;

  // Custom colors for components
  const customColors: CustomTheme['colors'] = {
    ...colors,
    background: isDark ? colors.background : colors.light.background,
    surface: isDark ? colors.surface : colors.light.surface,
    surfaceVariant: isDark ? colors.surfaceVariant : colors.light.surfaceVariant,
    text: isDark ? colors.text : colors.light.text,
    textSecondary: isDark ? colors.textSecondary : colors.light.textSecondary,
    textDisabled: isDark ? colors.textDisabled : colors.light.textDisabled,
    border: isDark ? colors.border : colors.light.border,
  };

  return (
    <ThemeContext.Provider value={{ themeMode, isDark, setThemeMode, theme, colors: customColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
