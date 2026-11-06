import React from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
}) => {
  const theme = colors.dark;

  let bg = theme.tint;
  let fg = '#0B0F17';
  let border = 'transparent';

  if (variant === 'secondary') {
    bg = theme.surfaceElevated;
    fg = theme.text;
    border = theme.border;
  } else if (variant === 'outline') {
    bg = 'transparent';
    fg = theme.tint;
    border = theme.tint;
  } else if (variant === 'danger') {
    bg = 'rgba(239, 68, 68, 0.15)';
    fg = theme.status.error;
    border = 'rgba(239, 68, 68, 0.4)';
  } else if (variant === 'ghost') {
    bg = 'transparent';
    fg = theme.textSecondary;
    border = 'transparent';
  }

  const height = size === 'sm' ? 36 : size === 'lg' ? 52 : 44;
  const paddingH = size === 'sm' ? spacing.sm : size === 'lg' ? spacing.xl : spacing.lg;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: bg,
          borderColor: border,
          height,
          paddingHorizontal: paddingH,
          opacity: disabled ? 0.5 : pressed ? 0.8 : 1,
        },
        style,
      ]}>
      {loading ? (
        <ActivityIndicator size="small" color={fg} />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.text,
              {
                color: fg,
                fontSize: size === 'sm' ? typography.size.sm : typography.size.md,
                marginLeft: icon ? spacing.xs : 0,
              },
              textStyle,
            ]}>
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    borderWidth: 1,
    minHeight: 44, // Touch target compliance
  },
  text: {
    fontWeight: typography.weight.semibold,
  },
});
