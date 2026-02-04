import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { useBiometricAuth } from '../../hooks/useBiometric';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from '../../components/TextInput';
import { Button } from '../../components/Button';
import { AUTH_ROUTES } from '../../constants/routes';

export const LoginScreen: React.FC = () => {
  const { theme } = useTheme();
  const { signIn } = useAuth();
  const { isAvailable: biometricAvailable, authenticate: biometricAuthenticate } = useBiometricAuth();
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert('Login Failed', 'Please check your credentials and try again');
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    const success = await biometricAuthenticate();
    if (success) {
      // Retrieve stored encrypted credentials from SecureStore
      // In Phase 1, if no stored credentials, use demo credentials
      // The AUTH_KEYS.BIOMETRIC_CREDENTIALS key is defined in secureStorage.ts
      await signIn('user@ipractus.com', 'password123'); // TODO: Use stored credentials in later phases
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Welcome Back</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Sign in to continue to iPractus
        </Text>

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
          placeholder="Enter your password"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity onPress={() => navigation.navigate(AUTH_ROUTES.FORGOT_PASSWORD as any)}>
          <Text style={[styles.forgotPassword, { color: theme.colors.primary }]}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <Button
          title="Sign In"
          onPress={handleLogin}
          loading={loading}
          style={styles.button}
        />

        {biometricAvailable && (
          <TouchableOpacity
            style={[styles.biometricButton, { borderColor: theme.colors.border }]}
            onPress={handleBiometricLogin}
          >
            <Text style={[styles.biometricText, { color: theme.colors.text }]}>
              Sign in with Face ID / Touch ID
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.signupContainer}>
          <Text style={[styles.signupText, { color: theme.colors.textSecondary }]}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate(AUTH_ROUTES.ROLE as any)}>
            <Text style={[styles.signupLink, { color: theme.colors.primary }]}>Sign Up</Text>
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
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
  },
  input: {
    marginBottom: 16,
  },
  forgotPassword: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
    marginBottom: 24,
  },
  button: {
    marginBottom: 16,
  },
  biometricButton: {
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  biometricText: {
    fontSize: 16,
    fontWeight: '500',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  signupText: {
    fontSize: 14,
  },
  signupLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});
