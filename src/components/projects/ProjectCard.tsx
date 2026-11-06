import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { WorkspaceStatusBadge } from './WorkspaceStatusBadge';
import { Project } from '../../types';
import { colors, spacing, typography } from '../../theme';

interface ProjectCardProps {
  project: Project;
  onPress: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onPress }) => {
  const theme = colors.dark;

  const formatActivityTime = (isoString?: string) => {
    if (!isoString) return 'Inactive';
    const date = new Date(isoString);
    const now = new Date('2026-11-07T01:00:00Z'); // normalized reference
    const diffHours = Math.round((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.round(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <Card onPress={onPress} style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.titleArea}>
          <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>
            {project.name}
          </Text>
          {project.repositoryFullName && (
            <Text style={[styles.repo, { color: theme.textMuted }]} numberOfLines={1}>
              {project.repositoryFullName}
            </Text>
          )}
        </View>
        <WorkspaceStatusBadge status={project.workspaceStatus} size="sm" />
      </View>

      {project.description && (
        <Text style={[styles.description, { color: theme.textSecondary }]} numberOfLines={2}>
          {project.description}
        </Text>
      )}

      <View style={styles.tagsRow}>
        {project.technologies.slice(0, 3).map((tech) => (
          <Badge
            key={tech}
            label={tech}
            variant="tech"
            size="sm"
            style={styles.techBadge}
          />
        ))}
        {project.technologies.length > 3 && (
          <Badge
            label={`+${project.technologies.length - 3}`}
            variant="tech"
            size="sm"
            style={styles.techBadge}
          />
        )}
      </View>

      <View style={[styles.footerRow, { borderTopColor: theme.borderSubtle }]}>
        <View style={styles.metaItem}>
          <Ionicons name="git-branch-outline" size={13} color={theme.textMuted} />
          <Text style={[styles.metaText, { color: theme.textSecondary }]}>
            {project.branch}
          </Text>
        </View>

        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={13} color={theme.textMuted} />
          <Text style={[styles.metaText, { color: theme.textSecondary }]}>
            {formatActivityTime(project.lastActivityAt)}
          </Text>
        </View>

        <Ionicons name="chevron-forward" size={16} color={theme.textMuted} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: spacing.xs,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  titleArea: {
    flex: 1,
    marginRight: spacing.sm,
  },
  name: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
  },
  repo: {
    fontSize: typography.size.xs,
    marginTop: 1,
  },
  description: {
    fontSize: typography.size.xs,
    lineHeight: 18,
    marginVertical: spacing.xs,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: spacing.xs,
  },
  techBadge: {
    marginRight: spacing.xs,
    marginBottom: 2,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    marginTop: spacing.xs,
    borderTopWidth: 1,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: typography.size.xs,
    marginLeft: 4,
  },
});

