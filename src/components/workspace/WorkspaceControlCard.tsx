import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { WorkspaceStatusBadge } from '../projects/WorkspaceStatusBadge';
import { Project } from '../../types';
import { useWorkspace } from '../../hooks/useWorkspaceState';
import { colors, spacing, typography } from '../../theme';

interface WorkspaceControlCardProps {
  project: Project;
}

export const WorkspaceControlCard: React.FC<WorkspaceControlCardProps> = ({ project }) => {
  const { updateWorkspaceStatus, isSimulatingCloud } = useWorkspace();
  const theme = colors.dark;

  const isRunning = project.workspaceStatus === 'running';
  const isStarting = project.workspaceStatus === 'starting';

  const handleToggle = () => {
    if (isRunning) {
      updateWorkspaceStatus(project.id, 'stopped');
    } else {
      updateWorkspaceStatus(project.id, 'running');
    }
  };

  return (
    <Card style={styles.card}>
      <View style={styles.headerRow}>
        <View>
          <Text style={[styles.title, { color: theme.text }]}>Cloud Workspace</Text>
          <Text style={[styles.subtitle, { color: theme.textMuted }]}>
            AWS Fargate Container (Isolated)
          </Text>
        </View>
        <WorkspaceStatusBadge status={project.workspaceStatus} />
      </View>

      <View style={[styles.specsBox, { backgroundColor: theme.surfaceSubtle }]}>
        <View style={styles.specItem}>
          <Text style={[styles.specLabel, { color: theme.textMuted }]}>Branch</Text>
          <Text style={[styles.specValue, { color: theme.text }]}>{project.branch}</Text>
        </View>
        <View style={styles.specDivider} />
        <View style={styles.specItem}>
          <Text style={[styles.specLabel, { color: theme.textMuted }]}>Port</Text>
          <Text style={[styles.specValue, { color: theme.text }]}>
            {project.serverPort ? `:${project.serverPort}` : 'N/A'}
          </Text>
        </View>
        <View style={styles.specDivider} />
        <View style={styles.specItem}>
          <Text style={[styles.specLabel, { color: theme.textMuted }]}>Region</Text>
          <Text style={[styles.specValue, { color: theme.text }]}>us-east-1</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <Button
          title={
            isStarting
              ? 'Starting Container...'
              : isRunning
              ? 'Stop Workspace (Mock)'
              : 'Resume Workspace (Mock)'
          }
          variant={isRunning ? 'secondary' : 'primary'}
          loading={isStarting || isSimulatingCloud}
          onPress={handleToggle}
          icon={
            <Ionicons
              name={isRunning ? 'pause-circle-outline' : 'play-circle-outline'}
              size={18}
              color={isRunning ? theme.text : '#0B0F17'}
            />
          }
          style={styles.actionBtn}
        />
      </View>

      <Text style={[styles.demoNotice, { color: theme.demoBadge.text }]}>
        * Local Demo: Toggling updates Phase 1 mock state only. No AWS compute billed.
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
  },
  subtitle: {
    fontSize: typography.size.xs,
    marginTop: 2,
  },
  specsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderRadius: spacing.sm,
    marginBottom: spacing.md,
  },
  specItem: {
    flex: 1,
    alignItems: 'center',
  },
  specDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#2A3649',
  },
  specLabel: {
    fontSize: typography.size.xs,
    marginBottom: 2,
  },
  specValue: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
  },
  actionRow: {
    marginTop: spacing.xs,
  },
  actionBtn: {
    width: '100%',
  },
  demoNotice: {
    fontSize: typography.size.xs,
    textAlign: 'center',
    marginTop: spacing.sm,
    fontStyle: 'italic',
  },
});

