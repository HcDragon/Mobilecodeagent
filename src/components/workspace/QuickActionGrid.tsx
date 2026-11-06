import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, spacing, typography } from '../../theme';

interface QuickActionGridProps {
  projectId: string;
}

export const QuickActionGrid: React.FC<QuickActionGridProps> = ({ projectId }) => {
  const router = useRouter();
  const theme = colors.dark;

  const actions = [
    {
      title: 'Files & Editor',
      icon: 'document-text-outline' as const,
      color: '#38BDF8',
      onPress: () => router.push(`/files/${projectId}` as any),
    },
    {
      title: 'AI Agent',
      icon: 'sparkles-outline' as const,
      color: '#A855F7',
      onPress: () => router.push('/(tabs)/agent' as any),
    },
    {
      title: 'Terminal',
      icon: 'terminal-outline' as const,
      color: '#22C55E',
      onPress: () => router.push('/(tabs)/terminal' as any),
    },
    {
      title: 'Live Preview',
      icon: 'globe-outline' as const,
      color: '#F59E0B',
      onPress: () => router.push('/(tabs)/preview' as any),
    },
    {
      title: 'Git Status',
      icon: 'git-compare-outline' as const,
      color: '#EC4899',
      badge: 'Phase 3',
      onPress: () => router.push(`/projects/${projectId}` as any),
    },
    {
      title: 'Settings',
      icon: 'settings-outline' as const,
      color: '#94A3B8',
      onPress: () => router.push('/settings' as any),
    },
  ];

  return (
    <View style={styles.grid}>
      {actions.map((act) => (
        <Pressable
          key={act.title}
          onPress={act.onPress}
          style={({ pressed }) => [
            styles.item,
            {
              backgroundColor: theme.surfaceElevated,
              borderColor: theme.border,
              opacity: pressed ? 0.75 : 1,
            },
          ]}>
          <View style={[styles.iconBox, { backgroundColor: `${act.color}1A` }]}>
            <Ionicons name={act.icon} size={20} color={act.color} />
          </View>
          <Text style={[styles.label, { color: theme.text }]} numberOfLines={1}>
            {act.title}
          </Text>
          {act.badge && (
            <Text style={[styles.badgeText, { color: theme.textMuted }]}>
              {act.badge}
            </Text>
          )}
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: spacing.sm,
  },
  item: {
    width: '31%',
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.medium,
    textAlign: 'center',
  },
  badgeText: {
    fontSize: 9,
    marginTop: 2,
  },
});

