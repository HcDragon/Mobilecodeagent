import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useWorkspace } from '../../src/hooks/useWorkspaceState';
import { MOCK_ACTIVITIES } from '../../src/data/mock/activity';
import { Card } from '../../src/components/common/Card';
import { Button } from '../../src/components/common/Button';
import { DemoBanner } from '../../src/components/common/DemoBanner';
import { EmptyState } from '../../src/components/common/EmptyState';
import { ProjectCard } from '../../src/components/projects/ProjectCard';
import { ActivityFeed } from '../../src/components/workspace/ActivityFeed';
import { colors, spacing, typography, radius } from '../../src/theme';

export default function HomeScreen() {
  const router = useRouter();
  const { projects, selectProject } = useWorkspace();
  const [showGithubModal, setShowGithubModal] = useState(false);
  const theme = colors.dark;

  const runningCount = projects.filter((p) => p.workspaceStatus === 'running').length;
  const startingCount = projects.filter((p) => p.workspaceStatus === 'starting').length;
  const stoppedCount = projects.filter((p) => p.workspaceStatus === 'stopped').length;

  const handleSelectProject = (projectId: string) => {
    selectProject(projectId);
    router.push(`/projects/${projectId}` as any);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      {/* Top App Bar */}
      <View style={[styles.topBar, { borderBottomColor: theme.border }]}>
        <View style={styles.brandRow}>
          <View style={[styles.brandIcon, { backgroundColor: `${theme.tint}1A` }]}>
            <Ionicons name="code-slash" size={20} color={theme.tint} />
          </View>
          <View>
            <Text style={[styles.brandName, { color: theme.text }]}>CodeNomad</Text>
            <Text style={[styles.brandTagline, { color: theme.textMuted }]}>
              Portable Cloud Dev
            </Text>
          </View>
        </View>

        <Pressable
          onPress={() => router.push('/settings' as any)}
          style={({ pressed }) => [
            styles.settingsBtn,
            { backgroundColor: theme.surfaceElevated, opacity: pressed ? 0.7 : 1 },
          ]}
          hitSlop={8}>
          <Ionicons name="settings-outline" size={20} color={theme.text} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Demo Mode Notice */}
        <DemoBanner
          message="Phase 1 UI Scaffold - Demo Mode"
          subtext="Navigation, workspaces, and UI are functional with typed mock data. Cloud runtime and GitHub auth arrive in later phases."
        />

        {/* Welcome Banner */}
        <View style={styles.welcomeBox}>
          <Text style={[styles.greeting, { color: theme.text }]}>Welcome back</Text>
          <Text style={[styles.subgreeting, { color: theme.textSecondary }]}>
            Resume your cloud workspaces or dispatch AI coding tasks.
          </Text>
        </View>

        {/* Workspace Status KPI Cards */}
        <View style={styles.kpiRow}>
          <Card style={styles.kpiCard}>
            <View style={styles.kpiHeader}>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: theme.status.running },
                ]}
              />
              <Text style={[styles.kpiLabel, { color: theme.textMuted }]}>Running</Text>
            </View>
            <Text style={[styles.kpiValue, { color: theme.text }]}>{runningCount}</Text>
          </Card>

          <Card style={styles.kpiCard}>
            <View style={styles.kpiHeader}>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: theme.status.starting },
                ]}
              />
              <Text style={[styles.kpiLabel, { color: theme.textMuted }]}>Starting</Text>
            </View>
            <Text style={[styles.kpiValue, { color: theme.text }]}>{startingCount}</Text>
          </Card>

          <Card style={styles.kpiCard}>
            <View style={styles.kpiHeader}>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: theme.status.stopped },
                ]}
              />
              <Text style={[styles.kpiLabel, { color: theme.textMuted }]}>Stopped</Text>
            </View>
            <Text style={[styles.kpiValue, { color: theme.text }]}>{stoppedCount}</Text>
          </Card>
        </View>

        {/* GitHub Connection CTA Placeholder */}
        <Card style={styles.connectGithubCard}>
          <View style={styles.connectGithubLeft}>
            <Ionicons name="logo-github" size={24} color={theme.text} />
            <View style={styles.connectGithubText}>
              <Text style={[styles.connectGithubTitle, { color: theme.text }]}>
                GitHub Integration
              </Text>
              <Text style={[styles.connectGithubSubtitle, { color: theme.textSecondary }]}>
                Phase 3 feature - Connect to import repos
              </Text>
            </View>
          </View>
          <Button
            title="Connect"
            size="sm"
            variant="outline"
            onPress={() => setShowGithubModal(true)}
          />
        </Card>

        {/* Recent Projects Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Recent Projects
          </Text>
          <Pressable onPress={() => router.push('/(tabs)/projects' as any)}>
            <Text style={[styles.viewAllText, { color: theme.tint }]}>
              View all ({projects.length})
            </Text>
          </Pressable>
        </View>

        {projects.length === 0 ? (
          <EmptyState
            title="No projects found"
            description="You don't have any repositories connected to your workspace yet."
            actionTitle="Browse Demo Projects"
          />
        ) : (
          projects.slice(0, 3).map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onPress={() => handleSelectProject(project.id)}
            />
          ))
        )}

        {/* Recent Activity Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Workspace Activity
          </Text>
        </View>
        <ActivityFeed activities={MOCK_ACTIVITIES.slice(0, 4)} />
      </ScrollView>

      {/* GitHub Integration Modal Placeholder */}
      <Modal
        visible={showGithubModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowGithubModal(false)}>
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}>
            <Ionicons name="logo-github" size={40} color={theme.text} />
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              GitHub Authentication
            </Text>
            <Text style={[styles.modalBody, { color: theme.textSecondary }]}>
              GitHub App installation and OAuth tokens will be configured in Phase 3 according to PRD Section 9.
            </Text>
            <View style={styles.modalMetaBox}>
              <Text style={[styles.modalMetaTitle, { color: theme.tint }]}>
                Phase 3 Roadmap:
              </Text>
              <Text style={[styles.modalMetaItem, { color: theme.textSecondary }]}>
                • GitHub App with scoped permissions
              </Text>
              <Text style={[styles.modalMetaItem, { color: theme.textSecondary }]}>
                • Repository cloning to cloud workspace
              </Text>
              <Text style={[styles.modalMetaItem, { color: theme.textSecondary }]}>
                • Git diffs, commits & pull requests
              </Text>
            </View>
            <Button
              title="Understood"
              onPress={() => setShowGithubModal(false)}
              style={styles.modalCloseBtn}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  brandName: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    letterSpacing: -0.5,
  },
  brandTagline: {
    fontSize: 10,
    marginTop: 1,
  },
  settingsBtn: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  welcomeBox: {
    marginVertical: spacing.md,
  },
  greeting: {
    fontSize: typography.size.xxl,
    fontWeight: typography.weight.bold,
  },
  subgreeting: {
    fontSize: typography.size.sm,
    marginTop: 4,
    lineHeight: 20,
  },
  kpiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: spacing.sm,
  },
  kpiCard: {
    flex: 1,
    marginHorizontal: 3,
    padding: spacing.md,
  },
  kpiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  kpiLabel: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.medium,
  },
  kpiValue: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
  },
  connectGithubCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: spacing.sm,
    padding: spacing.md,
  },
  connectGithubLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: spacing.sm,
  },
  connectGithubText: {
    marginLeft: spacing.md,
    flex: 1,
  },
  connectGithubTitle: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
  },
  connectGithubSubtitle: {
    fontSize: typography.size.xs,
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
  },
  sectionTitle: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
  },
  viewAllText: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  modalContent: {
    width: '100%',
    maxWidth: 340,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.xl,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  modalBody: {
    fontSize: typography.size.sm,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  modalMetaBox: {
    width: '100%',
    backgroundColor: '#0B0F17',
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.lg,
  },
  modalMetaTitle: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.bold,
    marginBottom: spacing.xs,
  },
  modalMetaItem: {
    fontSize: typography.size.xs,
    marginVertical: 2,
  },
  modalCloseBtn: {
    width: '100%',
  },
});
