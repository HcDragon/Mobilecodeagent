import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useWorkspace } from '../../src/hooks/useWorkspaceState';
import { Header } from '../../src/components/common/Header';
import { DemoBanner } from '../../src/components/common/DemoBanner';
import { Button } from '../../src/components/common/Button';
import { Badge } from '../../src/components/common/Badge';
import { MOCK_PROJECT_FILES } from '../../src/data/mock/files';
import { FileNode } from '../../src/types';
import { colors, spacing, typography, radius } from '../../src/theme';

export default function FilesScreen() {
  const { projectId } = useLocalSearchParams<{ projectId: string }>();
  const { projects } = useWorkspace();
  const theme = colors.dark;

  const project = projects.find((p) => p.id === projectId) || projects[0];
  const [selectedFile, setSelectedFile] = useState<FileNode>(
    MOCK_PROJECT_FILES[0]?.children?.[0]?.children?.[0] || MOCK_PROJECT_FILES[1]
  );
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'f-root-src': true,
    'f-components': true,
  });

  const toggleFolder = (id: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleEditPress = () => {
    Alert.alert(
      'Cloud Editor (Phase 7)',
      'Remote file editing, syntax highlighting, and Git staging will be integrated in Phase 7 according to PRD Section 13.'
    );
  };

  const renderFileTree = (nodes: FileNode[], depth = 0) => {
    return nodes.map((node) => {
      const isDir = node.type === 'directory';
      const isExpanded = expandedFolders[node.id];
      const isSelected = selectedFile?.id === node.id;

      return (
        <View key={node.id}>
          <Pressable
            onPress={() => {
              if (isDir) {
                toggleFolder(node.id);
              } else {
                setSelectedFile(node);
              }
            }}
            style={({ pressed }) => [
              styles.treeRow,
              {
                paddingLeft: depth * 16 + spacing.md,
                backgroundColor: isSelected ? theme.surfaceElevated : 'transparent',
                opacity: pressed ? 0.7 : 1,
              },
            ]}>
            <Ionicons
              name={
                isDir
                  ? isExpanded
                    ? 'folder-open'
                    : 'folder'
                  : 'document-text-outline'
              }
              size={16}
              color={isDir ? '#F59E0B' : '#38BDF8'}
              style={{ marginRight: 6 }}
            />
            <Text
              style={[
                styles.fileName,
                {
                  color: isSelected ? theme.tint : theme.text,
                  fontWeight: isDir ? typography.weight.semibold : typography.weight.regular,
                },
              ]}>
              {node.name}
            </Text>
            {node.language && (
              <Badge
                label={node.language}
                variant="tech"
                size="sm"
                style={styles.langBadge}
              />
            )}
          </Pressable>

          {isDir && isExpanded && node.children && (
            <View>{renderFileTree(node.children, depth + 1)}</View>
          )}
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <Header
        title="Files & Editor"
        subtitle={`${project?.name || 'Workspace'} (${project?.branch || 'main'})`}
        showBack
      />

      <View style={styles.container}>
        <DemoBanner
          message="Remote File Tree Placeholder (Phase 7)"
          subtext="Browsing sample files for portfolio-web. Real-time file sync with AWS persistent volume arrives in Phase 7."
        />

        {/* Top File Tree Box */}
        <View
          style={[
            styles.treeContainer,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}>
          <View style={[styles.treeHeader, { borderBottomColor: theme.border }]}>
            <Text style={[styles.treeHeaderTitle, { color: theme.textSecondary }]}>
              EXPLORER
            </Text>
            <View style={styles.branchContext}>
              <Ionicons name="git-branch-outline" size={12} color={theme.textMuted} />
              <Text style={[styles.branchText, { color: theme.textMuted }]}>
                {project?.branch || 'main'}
              </Text>
            </View>
          </View>
          <ScrollView style={styles.treeScroll} showsVerticalScrollIndicator={false}>
            {renderFileTree(MOCK_PROJECT_FILES)}
          </ScrollView>
        </View>

        {/* Editor Preview Box */}
        <View
          style={[
            styles.editorContainer,
            { backgroundColor: theme.codeBackground, borderColor: theme.border },
          ]}>
          <View
            style={[
              styles.editorHeader,
              { backgroundColor: theme.surfaceElevated, borderBottomColor: theme.border },
            ]}>
            <View style={styles.editorFileTab}>
              <Ionicons name="document-text" size={14} color="#38BDF8" />
              <Text style={[styles.editorTabTitle, { color: theme.text }]}>
                {selectedFile?.name || 'README.md'}
              </Text>
            </View>

            <Button
              title="Edit (Mock)"
              size="sm"
              variant="outline"
              icon={<Ionicons name="create-outline" size={14} color={theme.tint} />}
              onPress={handleEditPress}
              style={styles.editBtn}
            />
          </View>

          <ScrollView
            contentContainerStyle={styles.editorCodeContent}
            showsVerticalScrollIndicator={true}>
            <Text style={[styles.codeText, { color: '#E2E8F0' }]}>
              {selectedFile?.contentSample || '// Binary or empty file'}
            </Text>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  treeContainer: {
    height: 180,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: spacing.sm,
    overflow: 'hidden',
  },
  treeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
  },
  treeHeaderTitle: {
    fontSize: 10,
    fontWeight: typography.weight.bold,
    letterSpacing: 0.5,
  },
  branchContext: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  branchText: {
    fontSize: 11,
    marginLeft: 4,
  },
  treeScroll: {
    flex: 1,
    paddingVertical: 4,
  },
  treeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingRight: spacing.md,
  },
  fileName: {
    fontSize: typography.size.xs,
    flex: 1,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  langBadge: {
    marginLeft: spacing.xs,
  },
  editorContainer: {
    flex: 1,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  editorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderBottomWidth: 1,
  },
  editorFileTab: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editorTabTitle: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    marginLeft: 6,
  },
  editBtn: {
    height: 28,
    paddingHorizontal: spacing.sm,
  },
  editorCodeContent: {
    padding: spacing.md,
  },
  codeText: {
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    lineHeight: 18,
  },
});

