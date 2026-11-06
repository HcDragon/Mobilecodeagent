import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { WorkspaceStatus } from '../../types';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'status' | 'tech' | 'demo' | 'accent';
  status?: WorkspaceStatus;
  style?: ViewStyle;
  textStyle?: TextStyle;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  status,
  style,
  textStyle,
  size = 'md',
}) => {
  const theme = colors.dark;

  let bg = theme.surfaceElevated;
  let textColor = theme.textSecondary;
  let borderColor = theme.border;

  if (variant === 'status' && status) {
    const statusColor = theme.status[status] || theme.textMuted;
    bg = `${statusColor}1A`;
    textColor = statusColor;
    borderColor = `${statusColor}4D`;
  } else if (variant === 'demo') {
    bg = theme.demoBadge.background;
    textColor = theme.demoBadge.text;
    borderColor = theme.demoBadge.border;
  } else if (variant === 'accent') {
    bg = `${theme.tint}1A`;
    textColor = theme.tint;
    borderColor = `${theme.tint}4D`;
  } else if (variant === 'tech') {
    bg = theme.surfaceSubtle;
    textColor = theme.textSecondary;
    borderColor = theme.borderSubtle;
  }

  const isSmall = size === 'sm';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: bg,
          borderColor,
          paddingVertical: isSmall ? 2 : spacing.xs,
          paddingHorizontal: isSmall ? spacing.xs : spacing.sm,
        },
        style,
      ]}>
      {variant === 'status' && status && (
        <View
          style={[
            styles.dot,
            { backgroundColor: theme.status[status] || theme.textMuted },
          ]}
        />
      )}
      <Text
        style={[
          styles.text,
          {
            color: textColor,
            fontSize: isSmall ? typography.size.xs : typography.size.sm,
          },
          textStyle,
        ]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.sm,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  text: {
    fontWeight: typography.weight.medium,
    fontFamily: 'System',
  },
});

