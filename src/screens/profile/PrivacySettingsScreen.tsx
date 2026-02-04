import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export const PrivacySettingsScreen: React.FC = () => {
  const { theme } = useTheme();

  const settings = [
    { id: '1', title: 'Profile Visibility', description: 'Who can see your profile' },
    { id: '2', title: 'Data Sharing', description: 'How your data is shared' },
    { id: '3', title: 'Blocked Users', description: 'Manage users you\'ve blocked' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Privacy Settings</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Control your privacy and data sharing preferences
        </Text>
      </View>

      {settings.map((setting) => (
        <View
          key={setting.id}
          style={[styles.settingItem, { backgroundColor: theme.colors.surfaceVariant }]}
        >
          <Text style={[styles.settingTitle, { color: theme.colors.text }]}>{setting.title}</Text>
          <Text style={[styles.settingDescription, { color: theme.colors.textSecondary }]}>
            {setting.description}
          </Text>
        </View>
      ))}

      <Text style={[styles.notice, { color: theme.colors.textSecondary }]}>
        Privacy settings will be implemented in Phase 2
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
  },
  settingItem: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
  },
  notice: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 32,
    fontStyle: 'italic',
  },
});
