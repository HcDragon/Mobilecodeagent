import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useWorkspace } from '../../src/hooks/useWorkspaceState';
import { Header } from '../../src/components/common/Header';
import { DemoBanner } from '../../src/components/common/DemoBanner';
import { Badge } from '../../src/components/common/Badge';
import { Button } from '../../src/components/common/Button';
import { WorkspaceControlCard } from '../../src/components/workspace/WorkspaceControlCard';
import { QuickActionGrid } from '../../src/components/workspace/QuickActionGrid';
import { ActivityFeed } from '../../src/components/workspace/ActivityFeed';
import { MOCK_ACTIVITIES } from '../../src/data/mock/activity';
import { colors, spacing, typography, radius } from '../../src/theme';

export default function ProjectDetailScreen() {
  const { projectId } = useLocalSearchParams<{ projectId: string }>();
  const router = useRouter();
  const { projects } = useWorkspace();
  const theme = colors.dark;

  const project = projects.find((p) => p.id === projectId) || projects[0];

  if (!project) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
        <Header title="Project Details" showBack />
        <View style={styles.notFoundContainer}>
          <Text style={[styles.notFoundText, { color: theme.text }]}>
            Project not found.
          </Text>
          <Button title="Back to Projects" onPress={() => router.back()} />
        </View>
      </SafeAreaView>
    );
  }

  const projectActivities = MOCK_ACTIVITIES.filter(
    (act) => act.projectId === project.id
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <Header
        title={project.name}
        subtitle={project.repositoryFullName || 'Local Repository'}
        showBack
        rightAction={
          <Button
            title="Settings"
            variant="ghost"
            size="sm"
            icon={<Ionicons name="settings-outline" size={18} color={theme.text} />}
            onPress={() => router.push('/settings' as any)}
          />
        }
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <DemoBanner
          message="Project Workspace View"
          subtext="Cloud runtime controls and shortcuts below simulate container lifecycle transitions for Phase 1 testing."
        />

        {/* Project Meta Banner */}
        <View style={[styles.metaCard, { backgroundColor: theme.surfaceElevated, borderColor: theme.border }]}>
          <Text style={[styles.projectName, { color: theme.text }]}>
            {project.name}
          </Text>
          {project.description && (
            <Text style={[styles.projectDesc, { color: theme.textSecondary }]}>
              {project.description}
            </Text>
          )}

          <View style={styles.tagsRow}>
            <View style={styles.branchBox}>
              <Ionicons name="git-branch-outline" size={14} color={theme.tint} />
              <Text style={[styles.branchText, { color: theme.tint }]}>
                {project.branch}
              </Text>
            </View>

            {project.technologies.map((tech) => (
              <Badge
                key={tech}
                label={tech}
                variant="tech"
                size="sm"
                style={styles.techBadge}
              />
            ))}
          </View>
        </View>

        {/* Workspace Container Controls */}
        <WorkspaceControlCard project={project} />

        {/* Development Tools Quick Navigation */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Workspace Tools
        </Text>
        <QuickActionGrid projectId={project.id} />

        {/* Project Specific Activity */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Project Activity
        </Text>
        <ActivityFeed
          activities={
            projectActivities.length > 0 ? projectActivities : MOCK_ACTIVITIES.slice(0, 3)
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  notFoundText: {
    fontSize: typography.size.md,
    marginBottom: spacing.md,
  },
  metaCard: {
    padding: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    marginVertical: spacing.sm,
  },
  projectName: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
  },
  projectDesc: {
    fontSize: typography.size.sm,
    lineHeight: 20,
    marginTop: spacing.xs,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  branchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    marginRight: spacing.sm,
    marginBottom: 4,
  },
  branchText: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    marginLeft: 4,
  },
  techBadge: {
    marginRight: spacing.xs,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
  },
});

