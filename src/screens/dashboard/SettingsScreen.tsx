import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';

export const SettingsScreen: React.FC = () => {
  const { theme, themeMode, setThemeMode } = useTheme();
  const { signOut } = useAuth();

  const handleThemeToggle = () => {
    const modes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system'];
    const currentIndex = modes.indexOf(themeMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setThemeMode(nextMode);
  };

  const handleLogout = async () => {
    await signOut();
  };

  const settings = [
    { id: 'theme', title: 'Theme', value: themeMode, action: handleThemeToggle },
    { id: 'notifications', title: 'Notifications', value: 'On' },
    { id: 'privacy', title: 'Privacy Settings' },
    { id: 'help', title: 'Help & Support' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Settings</Text>
      </View>

      <View style={styles.section}>
        {settings.map((setting) => (
          <TouchableOpacity
            key={setting.id}
            style={[styles.settingItem, { backgroundColor: theme.colors.surfaceVariant }]}
            onPress={setting.action}
          >
            <Text style={[styles.settingTitle, { color: theme.colors.text }]}>{setting.title}</Text>
            {setting.value && (
              <Text style={[styles.settingValue, { color: theme.colors.textSecondary }]}>
                {setting.value}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: theme.colors.error }]}
        onPress={handleLogout}
      >
        <Text style={[styles.logoutText, { color: '#ffffff' }]}>Log Out</Text>
      </TouchableOpacity>
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
  },
  section: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingValue: {
    fontSize: 14,
  },
  logoutButton: {
    marginHorizontal: 16,
    marginTop: 32,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
