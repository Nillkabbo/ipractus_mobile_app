import React from 'react';
import { View, Image, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface AvatarProps {
  uri?: string;
  size?: number;
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({ uri, size = 80, style }) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: theme.colors.surfaceVariant },
        style,
      ]}
    >
      {uri ? (
        <Image source={{ uri }} style={styles.image} />
      ) : (
        <View style={[styles.placeholder, { backgroundColor: theme.colors.primary }]}>
          {/* Default placeholder icon or initials could go here */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
