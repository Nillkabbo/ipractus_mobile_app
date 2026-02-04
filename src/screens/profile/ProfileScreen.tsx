import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from '../../components/Avatar';
import { PROFILE_ROUTES } from '../../constants/routes';

export const ProfileScreen: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation<any>();

  if (!user) {
    return null;
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Avatar uri={user.avatarUri} size={100} />
        <Text style={[styles.name, { color: theme.colors.text }]}>
          {user.displayName}
        </Text>
        <View style={[styles.roleBadge, { backgroundColor: theme.colors.surfaceVariant }]}>
          <Text style={[styles.roleText, { color: theme.colors.primary }]}>
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={[styles.menuItem, { backgroundColor: theme.colors.surfaceVariant }]}
          onPress={() => navigation.navigate(PROFILE_ROUTES.EDIT_PROFILE as any)}
        >
          <Text style={[styles.menuText, { color: theme.colors.text }]}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, { backgroundColor: theme.colors.surfaceVariant }]}
          onPress={() => navigation.navigate(PROFILE_ROUTES.PRIVACY_SETTINGS as any)}
        >
          <Text style={[styles.menuText, { color: theme.colors.text }]}>Privacy Settings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    alignItems: 'center',
    padding: 32,
    borderBottomWidth: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
  },
  roleBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  roleText: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    padding: 16,
    gap: 1,
  },
  menuItem: {
    padding: 16,
    borderRadius: 8,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
