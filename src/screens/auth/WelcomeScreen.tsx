import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import { AUTH_ROUTES } from '../../constants/routes';

export const WelcomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();

  const handleGetStarted = () => {
    navigation.navigate(AUTH_ROUTES.ROLE);
  };

  const handleSignIn = () => {
    navigation.navigate(AUTH_ROUTES.LOGIN);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Welcome to iPractus
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Connect, share, and communicate with athletes, coaches, and fans in real-time
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]}
            onPress={handleGetStarted}
          >
            <Text style={[styles.buttonText, { color: '#ffffff' }]}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryButton, { borderColor: theme.colors.border }]}
            onPress={handleSignIn}
          >
            <Text style={[styles.secondaryButtonText, { color: theme.colors.text }]}>
              I already have an account
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    minHeight: 700,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  primaryButton: {
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
