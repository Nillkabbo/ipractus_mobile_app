import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';

// Placeholder RootNavigator - will be fully implemented in plan 01-03
export const RootNavigator = () => {
  const { theme, isDark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.text, { color: theme.colors.text }]}>
        iPractus - {isDark ? 'Dark' : 'Light'} Theme
      </Text>
      <Text style={[styles.subtext, { color: theme.colors.textSecondary }]}>
        Navigation will be implemented in plan 01-03
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    textAlign: 'center',
  },
});
