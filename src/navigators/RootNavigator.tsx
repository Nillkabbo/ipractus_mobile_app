import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { AuthNavigator } from './AuthNavigator';
import { AppNavigator } from './AppNavigator';

/**
 * Root navigator that switches between auth and app based on authentication state
 * Implements the dual-stack pattern from React Navigation auth flow documentation
 * NOTE: NavigationContainer is created HERE (not in App.tsx) to use auth state
 */
export const RootNavigator: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { theme } = useTheme();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer theme={theme}>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
