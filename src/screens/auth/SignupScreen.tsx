import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TextInput } from '../../components/TextInput';
import { Button } from '../../components/Button';
import { UserRole } from '../../types/auth';

export const SignupScreen: React.FC = () => {
  const { theme } = useTheme();
  const { signUp } = useAuth();
  const navigation = useNavigation<any>();
  const route = useRoute();

  const params = route.params as { role?: UserRole; email?: string } || {};
  const initialRole = params.role || 'fan';
  const initialEmail = params.email || '';

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>(initialRole);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!displayName || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password, displayName, role);
    } catch (error) {
      Alert.alert('Sign Up Failed', 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Create Account</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Join iPractus as {role === 'athlete' ? 'an Athlete' : role === 'coach' ? 'a Coach' : 'a Fan'}
        </Text>

        <TextInput
          label="Display Name"
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Enter your name"
          autoCapitalize="words"
          style={styles.input}
        />

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Create a password"
          secureTextEntry
          style={styles.input}
        />

        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm your password"
          secureTextEntry
          style={styles.input}
        />

        <Button
          title="Create Account"
          onPress={handleSignup}
          loading={loading}
          style={styles.button}
        />
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
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});
