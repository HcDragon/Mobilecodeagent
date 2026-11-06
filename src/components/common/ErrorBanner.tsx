import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, typography } from '../../theme';
import { Button } from './Button';

interface ErrorBannerProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  style?: ViewStyle;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({
  title = 'Something went wrong',
  message,
  onRetry,
  style,
}) => {
  const theme = colors.dark;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderColor: 'rgba(239, 68, 68, 0.3)',
        },
        style,
      ]}>
      <Ionicons
        name="alert-circle-outline"
        size={20}
        color={theme.status.error}
        style={styles.icon}
      />
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.status.error }]}>{title}</Text>
        <Text style={[styles.message, { color: theme.textSecondary }]}>
          {message}
        </Text>
        {onRetry && (
          <Button
            title="Retry"
            onPress={onRetry}
            variant="danger"
            size="sm"
            style={styles.retryBtn}
          />
        )}
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
  content: {
    flex: 1,
  },
  title: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
  },
  message: {
    fontSize: typography.size.xs,
    marginTop: 2,
    lineHeight: 16,
  },
  retryBtn: {
    marginTop: spacing.sm,
    alignSelf: 'flex-start',
  },
});

