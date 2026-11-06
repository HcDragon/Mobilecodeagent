import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../common/Card';
import { ActivityItem } from '../../types';
import { colors, spacing, typography } from '../../theme';

interface ActivityFeedProps {
  activities: ActivityItem[];
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  const theme = colors.dark;

  const getActivityIcon = (type?: string): { name: keyof typeof Ionicons.glyphMap; color: string } => {
    switch (type) {
      case 'git':
        return { name: 'git-commit-outline', color: '#38BDF8' };
      case 'agent':
        return { name: 'sparkles-outline', color: '#A855F7' };
      case 'build':
        return { name: 'hammer-outline', color: '#F59E0B' };
      case 'workspace':
      default:
        return { name: 'server-outline', color: '#22C55E' };
    }
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card style={styles.card}>
      <Text style={[styles.heading, { color: theme.text }]}>Recent Activity</Text>
      {activities.map((item, index) => {
        const iconConfig = getActivityIcon(item.type);
        const isLast = index === activities.length - 1;

        return (
          <View key={item.id} style={styles.activityRow}>
            <View style={styles.iconColumn}>
              <View
                style={[
                  styles.iconBubble,
                  { backgroundColor: `${iconConfig.color}1A` },
                ]}>
                <Ionicons name={iconConfig.name} size={15} color={iconConfig.color} />
              </View>
              {!isLast && (
                <View
                  style={[styles.timelineLine, { backgroundColor: theme.border }]}
                />
              )}
            </View>

            <View style={styles.contentColumn}>
              <View style={styles.titleRow}>
                <Text style={[styles.title, { color: theme.text }]}>
                  {item.title}
                </Text>
                <Text style={[styles.time, { color: theme.textMuted }]}>
                  {formatTime(item.createdAt)}
                </Text>
              </View>
              {item.description && (
                <Text style={[styles.desc, { color: theme.textSecondary }]}>
                  {item.description}
                </Text>
              )}
            </View>
          </View>
        );
      })}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: spacing.sm,
  },
  heading: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
    marginBottom: spacing.md,
  },
  activityRow: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  iconColumn: {
    alignItems: 'center',
    marginRight: spacing.md,
  },
  iconBubble: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    marginVertical: 2,
  },
  contentColumn: {
    flex: 1,
    paddingBottom: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
  },
  time: {
    fontSize: typography.size.xs,
  },
  desc: {
    fontSize: typography.size.xs,
    marginTop: 2,
    lineHeight: 16,
  },
});

