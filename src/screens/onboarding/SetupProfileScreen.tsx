import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

type UserRole = 'coach' | 'athlete';

type PrivacyLevel = 'everyone' | 'connections' | 'onlyme';

export const SetupProfileScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [role, setRole] = useState<UserRole>('athlete');
  const [privacy, setPrivacy] = useState<PrivacyLevel>('everyone');

  const privacyOptions = [
    { key: 'everyone' as PrivacyLevel, label: 'Everyone (Public)', icon: 'public' },
    { key: 'connections' as PrivacyLevel, label: 'Connections Only', icon: 'people' },
    { key: 'onlyme' as PrivacyLevel, label: 'Only Me', icon: 'lock-closed' },
  ];

  const handleContinue = () => {
    // Handle profile setup
    console.log({ displayName, bio, role, privacy });
    navigation.navigate('Dashboard' as never);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Set Up Your Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Let's get your profile ready for the iPractus community.
        </Text>

        {/* Your Information Section */}
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Your Information</Text>

        <View style={[styles.inputContainer, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Display Name</Text>
          <Text style={[styles.required, { color: theme.colors.primary }]}>required</Text>

          <View style={[styles.inputWrapper, { backgroundColor: theme.colors.surfaceVariant, borderColor: theme.colors.border }]}>
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              placeholder="Enter your full name"
              placeholderTextColor={theme.colors.textSecondary}
              value={displayName}
              onChangeText={setDisplayName}
            />
          </View>
        </View>

        <View style={[styles.inputContainer, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Email</Text>
          <View style={[styles.emailWrapper, { backgroundColor: theme.colors.surfaceVariant }]}>
            <Ionicons name="mail-outline" size={20} color={theme.colors.textSecondary} />
            <Text style={[styles.emailText, { color: theme.colors.textSecondary }]}>
              already linked: user@example.com
            </Text>
          </View>
        </View>

        {/* Role Selection */}
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Role Selection</Text>
        <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>I am a:</Text>

        <View style={[styles.roleContainer, { backgroundColor: theme.colors.card }]}>
          <TouchableOpacity
            style={[
              styles.roleOption,
              { borderColor: role === 'coach' ? theme.colors.primary : theme.colors.border },
            ]}
            onPress={() => setRole('coach')}
          >
            <View
              style={[
                styles.radioCircle,
                { borderColor: theme.colors.border },
                role === 'coach' && { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
              ]}
            />
            <Text
              style={[
                styles.roleLabel,
                { color: role === 'coach' ? theme.colors.primary : theme.colors.text },
              ]}
            >
              Coach
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.roleOption,
              { borderColor: role === 'athlete' ? theme.colors.primary : theme.colors.border },
            ]}
            onPress={() => setRole('athlete')}
          >
            <View
              style={[
                styles.radioCircle,
                { borderColor: theme.colors.border },
                role === 'athlete' && { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
              ]}
            />
            <Text
              style={[
                styles.roleLabel,
                { color: role === 'athlete' ? theme.colors.primary : theme.colors.text },
              ]}
            >
              Athlete
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bio */}
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Bio</Text>

        <View style={[styles.inputContainer, { backgroundColor: theme.colors.card }]}>
          <View style={[styles.textAreaWrapper, { backgroundColor: theme.colors.surfaceVariant, borderColor: theme.colors.border }]}>
            <TextInput
              style={[styles.textArea, { color: theme.colors.text }]}
              placeholder="Write a short bio about yourself"
              placeholderTextColor={theme.colors.textSecondary}
              value={bio}
              onChangeText={setBio}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Privacy Settings */}
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Privacy Settings</Text>
        <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Profile Visibility</Text>

        <View style={[styles.privacyContainer, { backgroundColor: theme.colors.card }]}>
          {privacyOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.privacyOption,
                privacy === option.key && { backgroundColor: theme.colors.primary + '10', borderColor: theme.colors.primary },
              ]}
              onPress={() => setPrivacy(option.key)}
            >
              <Ionicons
                name={option.key === privacy ? (option.icon as any) : `${option.key}-outline` as any}
                size={24}
                color={privacy === option.key ? theme.colors.primary : theme.colors.textSecondary}
              />
              <Text
                style={[
                  styles.privacyLabel,
                  { color: privacy === option.key ? theme.colors.primary : theme.colors.text },
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.cancelButton, { borderColor: theme.colors.border }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.cancelButtonText, { color: theme.colors.textSecondary }]}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.continueButton, { backgroundColor: theme.colors.primary }]}
            onPress={handleContinue}
          >
            <Text style={[styles.continueButtonText, { color: '#fff' }]}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 24,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 12,
  },
  inputContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  required: {
    fontSize: 12,
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  emailWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 12,
  },
  emailText: {
    fontSize: 14,
  },
  roleContainer: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderRadius: 12,
  },
  roleOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  textAreaWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 100,
  },
  textArea: {
    flex: 1,
    fontSize: 16,
  },
  privacyContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  privacyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderBottomWidth: 1,
  },
  privacyLabel: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 32,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  continueButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
