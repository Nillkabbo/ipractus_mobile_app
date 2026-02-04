import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from '../../components/TextInput';
import { Button } from '../../components/Button';

export const ForgotPasswordScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setSent(true);
    Alert.alert('Email Sent', 'Password reset instructions have been sent to your email');
  };

  const handleBackToLogin = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Reset Password</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          {sent
            ? 'Check your email for reset instructions'
            : 'Enter your email to receive password reset instructions'}
        </Text>

        {!sent ? (
          <>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />

            <Button
              title="Send Reset Link"
              onPress={handleReset}
              loading={loading}
              style={styles.button}
            />
          </>
        ) : (
          <Button
            title="Back to Login"
            onPress={handleBackToLogin}
            style={styles.button}
          />
        )}

        <TouchableOpacity onPress={handleBackToLogin}>
          <Text style={[styles.backText, { color: theme.colors.textSecondary }]}>
            Back to Login
          </Text>
        </TouchableOpacity>
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
    marginBottom: 24,
  },
  button: {
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
