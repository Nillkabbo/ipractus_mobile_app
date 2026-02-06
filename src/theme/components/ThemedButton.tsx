/**
 * Themed Components
 *
 * Reusable components that automatically adapt to the current theme.
 */

import React, { ReactNode } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
  type TextInputProps,
} from 'react-native';
import { useTheme, Theme, ThemeType } from '../index';

// ============================================================================
// THEMED BUTTON
// ============================================================================

export interface ThemedButtonProps {
  title?: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  fullWidth?: boolean;
  themeOverride?: ThemeType;
  children?: ReactNode;
}

export function ThemedButton({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
  fullWidth = false,
  themeOverride,
  children,
}: ThemedButtonProps) {
  const { theme } = useTheme();

  const getButtonStyles = () => {
    const base: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: getBorderRadius(),
      paddingVertical: getPaddingVertical(),
      paddingHorizontal: getPaddingHorizontal(),
      opacity: disabled ? 0.5 : 1,
    };

    const bg = getBackgroundColor();
    const border = getBorderColor();

    return {
      ...base,
      backgroundColor: bg,
      borderWidth: variant === 'outline' ? 1 : 0,
      borderColor: border,
      ...(fullWidth && { width: '100%' }),
    };
  };

  const getTextStyles = (): TextStyle => {
    return {
      color: getTextColor(),
      fontSize: getFontSize(),
      fontWeight: '600' as const,
      letterSpacing: 0.3,
    };
  };

  const getBackgroundColor = () => {
    if (disabled) return theme.colors.textMuted;
    switch (variant) {
      case 'primary':
        return theme.colors.primary;
      case 'secondary':
        return theme.colors.secondary || theme.colors.accent || theme.colors.primary;
      case 'outline':
        return 'transparent';
      case 'ghost':
        return 'transparent';
      case 'danger':
        return theme.colors.error;
      default:
        return theme.colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.textInverse;
    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'danger':
        return theme.colors.textOnPrimary;
      case 'outline':
      case 'ghost':
        return theme.colors.primary;
      default:
        return theme.colors.textOnPrimary;
    }
  };

  const getBorderColor = () => {
    return theme.colors.primary;
  };

  const getBorderRadius = () => {
    switch (theme.type) {
      case 'pistachio':
        return 9999; // Pill shape
      case 'ipractus-dark':
        return size === 'large' ? 20 : 16;
      default:
        return size === 'large' ? 12 : 8;
    }
  };

  const getPaddingVertical = () => {
    switch (size) {
      case 'small':
        return 10;
      case 'large':
        return 18;
      default:
        return 14;
    }
  };

  const getPaddingHorizontal = () => {
    switch (size) {
      case 'small':
        return 16;
      case 'large':
        return 32;
      default:
        return 24;
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small':
        return 14;
      case 'large':
        return 18;
      default:
        return 16;
    }
  };

  const buttonStyle = [getButtonStyles(), style];
  const buttonTextStyle = [getTextStyles(), textStyle];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={buttonStyle}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size={size === 'small' ? 'small' : 'large'}
          color={getTextColor()}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <View style={{ marginRight: 8 }}>{icon}</View>
          )}
          {title && <Text style={buttonTextStyle}>{title}</Text>}
          {children}
          {icon && iconPosition === 'right' && (
            <View style={{ marginLeft: 8 }}>{icon}</View>
          )}
        </>
      )}
    </TouchableOpacity>
  );
}

// ============================================================================
// THEMED CARD
// ============================================================================

export interface ThemedCardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: number;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export function ThemedCard({
  children,
  variant = 'default',
  padding,
  style,
  contentStyle,
  onPress,
}: ThemedCardProps) {
  const { theme } = useTheme();

  const getCardStyle = (): ViewStyle => {
    const base: ViewStyle = {
      borderRadius: theme.borderRadius.lg,
      overflow: 'hidden',
    };

    let style: ViewStyle;

    switch (variant) {
      case 'elevated':
        style = theme.styles.cardElevated;
        break;
      case 'outlined':
        style = {
          ...theme.styles.card,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: theme.colors.border,
        };
        break;
      default:
        style = theme.styles.card;
    }

    return {
      ...base,
      ...style,
      ...(padding !== undefined && { padding }),
    };
  };

  const cardStyle = [getCardStyle(), style];

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        style={cardStyle}
      >
        <View style={contentStyle}>{children}</View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={cardStyle}>
      <View style={contentStyle}>{children}</View>
    </View>
  );
}

// ============================================================================
// THEMED INPUT
// ============================================================================

export interface ThemedInputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

export function ThemedInput({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  containerStyle,
  style,
  ...textInputProps
}: ThemedInputProps) {
  const { theme } = useTheme();

  const getInputStyle = (): TextStyle => {
    return {
      ...theme.styles.input,
      ...(error && {
        borderColor: theme.colors.error,
        borderWidth: 2,
      }),
    };
  };

  const getLabelStyle = (): TextStyle => {
    return {
      ...theme.styles.label,
      marginBottom: theme.spacing.sm,
      ...(error && { color: theme.colors.error }),
    };
  };

  const getHelperTextStyle = (): TextStyle => {
    return {
      ...theme.styles.caption,
      marginTop: theme.spacing.xs,
      ...(error && { color: theme.colors.error }),
    };
  };

  return (
    <View style={containerStyle}>
      {label && <Text style={getLabelStyle()}>{label}</Text>}

      <View style={{ position: 'relative' }}>
        {leftIcon && (
          <View
            style={{
              position: 'absolute',
              left: theme.spacing.md,
              top: 0,
              bottom: 0,
              justifyContent: 'center',
              zIndex: 1,
            }}
          >
            {leftIcon}
          </View>
        )}

        <TextInput
          style={[getInputStyle(), { paddingLeft: leftIcon ? 48 : theme.spacing.md }, style]}
          placeholderTextColor={theme.colors.textMuted}
          {...textInputProps}
        />

        {rightIcon && (
          <View
            style={{
              position: 'absolute',
              right: theme.spacing.md,
              top: 0,
              bottom: 0,
              justifyContent: 'center',
            }}
          >
            {rightIcon}
          </View>
        )}
      </View>

      {(error || helperText) && (
        <Text style={getHelperTextStyle()}>{error || helperText}</Text>
      )}
    </View>
  );
}

// ============================================================================
// THEMED TEXT
// ============================================================================

export interface ThemedTextProps {
  children: ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'bodySmall' | 'caption' | 'label';
  color?: string;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}

export function ThemedText({
  children,
  variant = 'body',
  color,
  style,
  numberOfLines,
}: ThemedTextProps) {
  const { theme } = useTheme();

  const getTextStyle = (): TextStyle => {
    const base = theme.styles[variant];
    return {
      ...base,
      ...(color && { color }),
    };
  };

  return (
    <Text
      style={[getTextStyle(), style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
}

// ============================================================================
// THEMED SURFACE / CONTAINER
// ============================================================================

export interface ThemedSurfaceProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'elevated' | 'primary';
}

export function ThemedSurface({
  children,
  style,
  variant = 'default',
}: ThemedSurfaceProps) {
  const { theme } = useTheme();

  const getSurfaceStyle = (): ViewStyle => {
    switch (variant) {
      case 'elevated':
        return {
          ...theme.styles.cardElevated,
          padding: 0,
        };
      case 'primary':
        return {
          backgroundColor: theme.colors.primary,
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing.lg,
        };
      default:
        return {
          backgroundColor: theme.colors.backgroundElevated,
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing.lg,
        };
    }
  };

  return <View style={[getSurfaceStyle(), style]}>{children}</View>;
}

// ============================================================================
// THEMED BADGE
// ============================================================================

export interface ThemedBadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function ThemedBadge({
  children,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
}: ThemedBadgeProps) {
  const { theme } = useTheme();

  const getBadgeStyle = (): ViewStyle => {
    const base: ViewStyle = {
      alignSelf: 'flex-start',
      borderRadius: 9999,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: size === 'small' ? 2 : 4,
    };

    let backgroundColor: string;
    switch (variant) {
      case 'success':
        backgroundColor = theme.colors.success;
        break;
      case 'warning':
        backgroundColor = theme.colors.warning;
        break;
      case 'error':
        backgroundColor = theme.colors.error;
        break;
      case 'info':
        backgroundColor = theme.colors.info;
        break;
      default:
        backgroundColor = theme.colors.primary;
    }

    return {
      ...base,
      backgroundColor,
    };
  };

  const getTextStyle = (): TextStyle => {
    return {
      color: '#ffffff',
      fontSize: size === 'small' ? 10 : 12,
      fontWeight: '600' as const,
      letterSpacing: 0.5,
      textTransform: 'uppercase' as const,
    };
  };

  return (
    <View style={[getBadgeStyle(), style]}>
      <Text style={[getTextStyle(), textStyle]}>{children}</Text>
    </View>
  );
}

// ============================================================================
// THEMED DIVIDER
// ============================================================================

export interface ThemedDividerProps {
  style?: StyleProp<ViewStyle>;
  thickness?: number;
  variant?: 'full' | 'inset';
}

export function ThemedDivider({
  style,
  thickness = 1,
  variant = 'full',
}: ThemedDividerProps) {
  const { theme, spacing } = useTheme();

  return (
    <View
      style={[
        {
          height: thickness,
          backgroundColor: theme.colors.divider,
          marginHorizontal: variant === 'inset' ? spacing.lg : 0,
          marginVertical: spacing.md,
        },
        style,
      ]}
    />
  );
}

// ============================================================================
// THEMED SAFE AREA
// ============================================================================

export interface ThemedSafeAreaProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  edges?: ['top'] | ['bottom'] | ['top', 'bottom'];
}

export function ThemedSafeArea({
  children,
  style,
  edges = ['top', 'bottom'],
}: ThemedSafeAreaProps) {
  const { theme } = useTheme();

  // In a real app, you'd use react-native-safe-area-context
  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: theme.colors.background,
          paddingTop: edges.includes('top') ? theme.spacing.xl : 0,
          paddingBottom: edges.includes('bottom') ? theme.spacing.xl : 0,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
