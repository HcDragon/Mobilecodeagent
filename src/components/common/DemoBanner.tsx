import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, typography } from '../../theme';

interface DemoBannerProps {
  message?: string;
  subtext?: string;
  style?: ViewStyle;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({
  message = 'Demo Mode (Phase 1)',
  subtext = 'Actions simulate state locally. No cloud resources or external APIs are connected.',
  style,
}) => {
  const theme = colors.dark;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.demoBadge.background,
          borderColor: theme.demoBadge.border,
        },
        style,
      ]}>
      <Ionicons
        name="information-circle-outline"
        size={18}
        color={theme.demoBadge.text}
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: theme.demoBadge.text }]}>
          {message}
        </Text>
        {subtext ? (
          <Text style={[styles.subtext, { color: theme.textSecondary }]}>
            {subtext}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    marginVertical: spacing.sm,
  },
  icon: {
    marginRight: spacing.sm,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
  },
  subtext: {
    fontSize: typography.size.xs,
    marginTop: 2,
    lineHeight: 16,
  },
});
