import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput as RNTextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { AUTH_ROUTES } from '../../constants/routes';

// Login screen design tokens (from HTML)
const PRIMARY = '#b4fb50';
const BACKGROUND_NAVY = '#071a36';
const CARD_DARK = '#000c1e';
const PLACEHOLDER_GRAY = '#6b7280';
const TEXT_WHITE = '#ffffff';
const TEXT_MUTED = '#9ca3af';

export const LoginScreen: React.FC = () => {
  const { signIn } = useAuth();
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

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Brand logo: iPR/ACT:US */}
          <View style={styles.brandRow}>
            <Text style={styles.brandGreen}>iPR</Text>
            <Text style={styles.brandDivider}>/</Text>
            <Text style={styles.brandGreen}>ACT</Text>
            <Text style={styles.brandDivider}>:</Text>
            <Text style={styles.brandGreen}>US</Text>
          </View>

          <Text style={styles.title}>LOG IN</Text>

          <View style={styles.form}>
            <RNTextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email / Username"
              placeholderTextColor={PLACEHOLDER_GRAY}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <RNTextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor={PLACEHOLDER_GRAY}
              secureTextEntry
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={[styles.primaryButton, loading && styles.primaryButtonDisabled]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.98}
            >
              <Text style={styles.primaryButtonText}>
                {loading ? 'Signing in...' : 'SIGN IN'}
              </Text>
            </TouchableOpacity>

            <View style={styles.links}>
              <TouchableOpacity
                onPress={() => navigation.navigate(AUTH_ROUTES.FORGOT_PASSWORD as any)}
                activeOpacity={0.8}
              >
                <Text style={styles.forgotLink}>Forgot Password?</Text>
              </TouchableOpacity>

              <View style={styles.signupRow}>
                <Text style={styles.signupLabel}>New here?</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate(AUTH_ROUTES.SIGNUP as any)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.signupLink}>Create an Account</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom wave accent */}
      <View style={styles.bottomWave} pointerEvents="none" />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: BACKGROUND_NAVY,
  },
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_NAVY,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 32,
    paddingBottom: 128,
    minHeight: '100%',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 48,
  },
  brandGreen: {
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -0.02 * 16,
    fontStyle: 'italic',
    color: PRIMARY,
  },
  brandDivider: {
    fontSize: 36,
    fontWeight: '900',
    fontStyle: 'italic',
    color: TEXT_WHITE,
    opacity: 0.8,
    marginHorizontal: 2,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: TEXT_WHITE,
    marginBottom: 40,
    textTransform: 'uppercase',
  },
  form: {
    width: '100%',
    maxWidth: 384,
    gap: 16,
  },
  input: {
    width: '100%',
    backgroundColor: CARD_DARK,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: TEXT_WHITE,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: PRIMARY,
    paddingVertical: 16,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  primaryButtonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 2,
    color: BACKGROUND_NAVY,
    textTransform: 'uppercase',
  },
  links: {
    alignItems: 'center',
    gap: 16,
    marginTop: 32,
  },
  forgotLink: {
    fontSize: 14,
    fontWeight: '500',
    color: PRIMARY,
  },
  signupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  signupLabel: {
    fontSize: 14,
    color: TEXT_MUTED,
  },
  signupLink: {
    fontSize: 14,
    fontWeight: '700',
    color: PRIMARY,
  },
  bottomWave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 160,
    backgroundColor: PRIMARY,
    opacity: 0.15,
  },
});
