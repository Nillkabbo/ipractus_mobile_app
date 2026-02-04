import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useNavigation } from '@react-navigation/native';

export const DashboardScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          iPrActUS Dashboard
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Welcome to iPractus
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.settingsButton, { backgroundColor: theme.colors.surfaceVariant }]}
        onPress={() => navigation.navigate('Settings' as never)}
      >
        <Text style={[styles.settingsButtonText, { color: theme.colors.text }]}>
          Open Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  settingsButton: {
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    minWidth: 200,
  },
  settingsButtonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
