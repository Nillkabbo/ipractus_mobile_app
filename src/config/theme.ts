import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { colors } from '../constants/colors';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.light.background,
    card: colors.light.surface,
    text: colors.light.text,
    border: colors.light.border,
    notification: colors.primary,
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    notification: colors.primary,
  },
};
