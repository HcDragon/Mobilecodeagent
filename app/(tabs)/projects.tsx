import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useWorkspace } from '../../src/hooks/useWorkspaceState';
import { ProjectCard } from '../../src/components/projects/ProjectCard';
import { ProjectSearchBar } from '../../src/components/projects/ProjectSearchBar';
import { EmptyState } from '../../src/components/common/EmptyState';
import { DemoBanner } from '../../src/components/common/DemoBanner';
import { Button } from '../../src/components/common/Button';
import { Card } from '../../src/components/common/Card';
import { colors, spacing, typography, radius } from '../../src/theme';

export default function ProjectsScreen() {
  const router = useRouter();
  const { projects, selectProject } = useWorkspace();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showGithubModal, setShowGithubModal] = useState(false);
  const theme = colors.dark;

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        (project.primaryLanguage &&
          project.primaryLanguage.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        filterStatus === 'all' || project.workspaceStatus === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [projects, searchQuery, filterStatus]);

  const handleSelect = (id: string) => {
    selectProject(id);
    router.push(`/projects/${id}` as any);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <View>
          <Text style={[styles.title, { color: theme.text }]}>Projects</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {filteredProjects.length} repositories in workspace
          </Text>
        </View>
        <Button
          title="Connect GitHub"
          size="sm"
          variant="outline"
          icon={<Ionicons name="logo-github" size={16} color={theme.tint} />}
          onPress={() => setShowGithubModal(true)}
        />
      </View>

      <View style={styles.container}>
        <DemoBanner
          message="Mock Project Catalog"
          subtext="Repositories listed here are typed mocks. Selecting any project opens its dedicated workspace console."
        />

        {/* Search */}
        <ProjectSearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Filter by repo name, React, Python, etc."
        />

        {/* Status Filter Chips */}
        <View style={styles.filterRow}>
          {['all', 'running', 'stopped', 'starting', 'error'].map((st) => {
            const isSelected = filterStatus === st;
            return (
              <Button
                key={st}
                title={st === 'all' ? 'All' : st.charAt(0).toUpperCase() + st.slice(1)}
                size="sm"
                variant={isSelected ? 'primary' : 'secondary'}
                onPress={() => setFilterStatus(st)}
                style={styles.filterChip}
                textStyle={{ fontSize: 12 }}
              />
            );
          })}
        </View>

        {/* Project List */}
        <FlatList
          data={filteredProjects}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProjectCard project={item} onPress={() => handleSelect(item.id)} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState
              icon="search-outline"
              title="No matching projects"
              description={`No projects match "${searchQuery}". Clear your search query or reset filter.`}
              actionTitle="Clear Filters"
              onAction={() => {
                setSearchQuery('');
                setFilterStatus('all');
              }}
            />
          }
        />
      </View>

      {/* GitHub Placeholder Modal */}
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
              GitHub Connection (Phase 3)
            </Text>
            <Text style={[styles.modalBody, { color: theme.textSecondary }]}>
              In Phase 3, you will connect your GitHub account via a scoped GitHub App to clone repositories and manage branches directly from CodeNomad.
            </Text>
            <Button
              title="Close"
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: typography.size.xxl,
    fontWeight: typography.weight.bold,
  },
  subtitle: {
    fontSize: typography.size.xs,
    marginTop: 2,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  filterRow: {
    flexDirection: 'row',
    marginVertical: spacing.xs,
  },
  filterChip: {
    marginRight: spacing.xs,
    height: 32,
    paddingHorizontal: spacing.md,
  },
  listContent: {
    paddingBottom: spacing.xxxl,
    paddingTop: spacing.xs,
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
    marginBottom: spacing.lg,
  },
  modalCloseBtn: {
    width: '100%',
  },
});

