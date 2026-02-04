import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AUTH_ROUTES } from '../../constants/routes';
import { UserRole } from '../../types/auth';

type RoleOption = {
  id: UserRole;
  title: string;
  description: string;
  icon: string;
};

const ROLES: RoleOption[] = [
  {
    id: 'athlete',
    title: 'Athlete',
    description: 'Showcase your skills and connect with coaches',
    icon: '🏃',
  },
  {
    id: 'coach',
    title: 'Coach',
    description: 'Manage teams and discover talent',
    icon: '🏆',
  },
  {
    id: 'fan',
    title: 'Fan',
    description: 'Follow your favorite athletes and teams',
    icon: '🎉',
  },
];

export const RoleSelectionScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const [selectedRole, setSelectedRole] = React.useState<UserRole | null>(null);

  const params = route.params as { email?: string; password?: string } || {};

  const handleContinue = () => {
    if (selectedRole) {
      navigation.navigate(AUTH_ROUTES.SIGNUP, {
        ...params,
        role: selectedRole,
      } as any);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Choose Your Role
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Select how you want to use iPractus
        </Text>

        <View style={styles.rolesContainer}>
          {ROLES.map((role) => (
            <TouchableOpacity
              key={role.id}
              style={[
                styles.roleCard,
                {
                  backgroundColor: theme.colors.surfaceVariant,
                  borderColor: selectedRole === role.id ? theme.colors.primary : theme.colors.border,
                },
              ]}
              onPress={() => setSelectedRole(role.id)}
            >
              <Text style={styles.icon}>{role.icon}</Text>
              <Text style={[styles.roleTitle, { color: theme.colors.text }]}>
                {role.title}
              </Text>
              <Text style={[styles.roleDescription, { color: theme.colors.textSecondary }]}>
                {role.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              {
                backgroundColor: selectedRole ? theme.colors.primary : theme.colors.surfaceVariant,
                opacity: selectedRole ? 1 : 0.5,
              },
            ]}
            onPress={handleContinue}
            disabled={!selectedRole}
          >
            <Text style={[styles.buttonText, { color: '#ffffff' }]}>Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleBack}>
            <Text style={[styles.backText, { color: theme.colors.textSecondary }]}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    padding: 32,
    minHeight: 700,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  rolesContainer: {
    gap: 16,
    marginBottom: 32,
  },
  roleCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  icon: {
    fontSize: 40,
    marginBottom: 12,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 16,
  },
  continueButton: {
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  backText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
