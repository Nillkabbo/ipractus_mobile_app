import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { TextInput } from '../../components/TextInput';
import { Button } from '../../components/Button';
import { Avatar } from '../../components/Avatar';
import { User } from '../../types/auth';

export const EditProfileScreen: React.FC = () => {
  const { theme } = useTheme();
  const { user, updateUser } = useAuth();
  const navigation = useNavigation();

  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [sport, setSport] = useState(user?.sport || '');
  const [location, setLocation] = useState(user?.location || '');
  const [avatarUri, setAvatarUri] = useState(user?.avatarUri);
  const [loading, setLoading] = useState(false);

  const handlePickImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission Required', 'Please grant photo library access to upload an avatar');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setAvatarUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleSave = async () => {
    if (!displayName) {
      Alert.alert('Error', 'Display name is required');
      return;
    }

    setLoading(true);
    try {
      // In Phase 1, we just update local state
      // In later phases, this would upload to a server
      const updatedUser: User = {
        ...user!,
        displayName,
        bio,
        sport,
        location,
        avatarUri,
      };
      updateUser(updatedUser);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <View style={styles.avatarSection}>
          <Avatar uri={avatarUri} size={100} />
          <TouchableOpacity
            style={[styles.changeAvatarButton, { borderColor: theme.colors.border }]}
            onPress={handlePickImage}
          >
            <Text style={[styles.changeAvatarText, { color: theme.colors.primary }]}>
              Change Photo
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          label="Display Name"
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Your name"
          style={styles.input}
        />

        <TextInput
          label="Bio"
          value={bio}
          onChangeText={setBio}
          placeholder="Tell us about yourself"
          style={styles.input}
        />

        <TextInput
          label="Sport"
          value={sport}
          onChangeText={setSport}
          placeholder="Your sport"
          style={styles.input}
        />

        <TextInput
          label="Location"
          value={location}
          onChangeText={setLocation}
          placeholder="Your location"
          style={styles.input}
        />

        <Button
          title="Save Changes"
          onPress={handleSave}
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
    padding: 24,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  changeAvatarButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  changeAvatarText: {
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});
