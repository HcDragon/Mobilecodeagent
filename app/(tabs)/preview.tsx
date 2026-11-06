import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useWorkspace } from '../../src/hooks/useWorkspaceState';
import { DemoBanner } from '../../src/components/common/DemoBanner';
import { Button } from '../../src/components/common/Button';
import { Badge } from '../../src/components/common/Badge';
import { colors, spacing, typography, radius } from '../../src/theme';

export default function PreviewScreen() {
  const { selectedProject } = useWorkspace();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewportMode, setViewportMode] = useState<'mobile' | 'desktop'>('mobile');
  const theme = colors.dark;

  const isRunning = selectedProject?.workspaceStatus === 'running';
  const previewPort = selectedProject?.serverPort || 5173;
  const mockUrl = `https://preview-auth.codenomad.dev/ws/${selectedProject?.id || 'demo'}:${previewPort}`;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 700);
  };

  const handleOpenExternal = () => {
    Alert.alert(
      'External Browser Gateway (Phase 6)',
      `In Phase 6, authenticated reverse proxy tokens will generate a secure one-time URL to view your running dev server in Safari or Chrome.\n\nTarget: ${mockUrl}`
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      {/* Top Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <View style={styles.headerLeft}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Preview</Text>
          <View style={styles.projectContextChip}>
            <Ionicons name="globe-outline" size={12} color="#F59E0B" />
            <Text style={[styles.projectContextText, { color: theme.textSecondary }]}>
              {selectedProject?.name || 'Workspace'}
            </Text>
          </View>
        </View>

        {/* Viewport switch */}
        <View style={[styles.viewportToggle, { backgroundColor: theme.surfaceElevated }]}>
          <Pressable
            onPress={() => setViewportMode('mobile')}
            style={[
              styles.viewportBtn,
              viewportMode === 'mobile' && { backgroundColor: theme.tint },
            ]}>
            <Ionicons
              name="phone-portrait-outline"
              size={14}
              color={viewportMode === 'mobile' ? '#0B0F17' : theme.textMuted}
            />
          </Pressable>
          <Pressable
            onPress={() => setViewportMode('desktop')}
            style={[
              styles.viewportBtn,
              viewportMode === 'desktop' && { backgroundColor: theme.tint },
            ]}>
            <Ionicons
              name="laptop-outline"
              size={14}
              color={viewportMode === 'desktop' ? '#0B0F17' : theme.textMuted}
            />
          </Pressable>
        </View>
      </View>

      <View style={styles.container}>
        <DemoBanner
          message="Preview Gateway Placeholder (Phase 6)"
          subtext="In Phase 6, a reverse proxy with short-lived tokens will pipe live HTTP/WebSocket dev server traffic directly into this canvas."
        />

        {/* Browser Top Bar */}
        <View style={[styles.browserBar, { backgroundColor: theme.surfaceElevated, borderColor: theme.border }]}>
          <Pressable
            onPress={handleRefresh}
            style={({ pressed }) => [
              styles.browserIconBtn,
              { opacity: pressed ? 0.6 : 1 },
            ]}
            hitSlop={8}>
            {isRefreshing ? (
              <ActivityIndicator size="small" color={theme.tint} />
            ) : (
              <Ionicons name="reload" size={16} color={theme.text} />
            )}
          </Pressable>

          <View style={[styles.urlBar, { backgroundColor: theme.codeBackground }]}>
            <Ionicons
              name={isRunning ? 'lock-closed' : 'lock-open-outline'}
              size={12}
              color={isRunning ? '#22C55E' : theme.textMuted}
              style={{ marginRight: 6 }}
            />
            <Text style={[styles.urlText, { color: theme.textSecondary }]} numberOfLines={1}>
              {isRunning ? mockUrl : 'workspace://dev-server-stopped'}
            </Text>
          </View>

          <Pressable
            onPress={handleOpenExternal}
            style={({ pressed }) => [
              styles.browserIconBtn,
              { opacity: pressed ? 0.6 : 1 },
            ]}
            hitSlop={8}>
            <Ionicons name="open-outline" size={16} color={theme.text} />
          </Pressable>
        </View>

        {/* Canvas Area */}
        <View
          style={[
            styles.canvasContainer,
            { backgroundColor: '#06090E', borderColor: theme.border },
          ]}>
          {isRunning ? (
            <View style={styles.simulatedAppWrapper}>
              <View
                style={[
                  styles.mockAppCard,
                  {
                    backgroundColor: theme.surface,
                    borderColor: theme.border,
                    width: viewportMode === 'mobile' ? '88%' : '100%',
                  },
                ]}>
                <View style={styles.mockAppHeader}>
                  <Text style={[styles.mockAppTitle, { color: theme.text }]}>
                    {selectedProject?.name}
                  </Text>
                  <Badge label="Live Preview (Mock)" variant="accent" size="sm" />
                </View>

                <View style={styles.mockAppBody}>
                  <Text style={[styles.mockAppHeroText, { color: theme.text }]}>
                    Portable Cloud Development
                  </Text>
                  <Text style={[styles.mockAppSubtext, { color: theme.textSecondary }]}>
                    Development server simulated on port {previewPort}. Hot reload is active in Phase 6.
                  </Text>

                  <View style={[styles.mockDevStatus, { backgroundColor: theme.surfaceElevated }]}>
                    <Text style={[styles.mockStatusText, { color: '#22C55E' }]}>
                      ✓ Dev Server: Vite v5.4.2 (Running)
                    </Text>
                    <Text style={[styles.mockStatusText, { color: theme.textSecondary }]}>
                      ✓ WebSocket HMR: Connected
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.stoppedPlaceholder}>
              <View style={[styles.iconCircle, { backgroundColor: theme.surfaceElevated }]}>
                <Ionicons name="cloud-offline-outline" size={36} color={theme.textMuted} />
              </View>
              <Text style={[styles.placeholderTitle, { color: theme.text }]}>
                Workspace is Stopped
              </Text>
              <Text style={[styles.placeholderDesc, { color: theme.textSecondary }]}>
                The development server for &ldquo;{selectedProject?.name}&rdquo; is currently offline. Start or resume your workspace container to preview your web application.
              </Text>
              <Button
                title="Resume Workspace (Mock)"
                onPress={handleRefresh}
                size="sm"
                variant="primary"
                style={styles.resumeBtn}
              />
            </View>
          )}
        </View>
      </View>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    marginRight: spacing.sm,
  },
  projectContextChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  projectContextText: {
    fontSize: typography.size.xs,
    marginLeft: 4,
  },
  viewportToggle: {
    flexDirection: 'row',
    borderRadius: radius.sm,
    padding: 2,
  },
  viewportBtn: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  browserBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.xs,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: spacing.xs,
  },
  browserIconBtn: {
    padding: spacing.xs,
    width: 32,
    alignItems: 'center',
  },
  urlBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: radius.sm,
    marginHorizontal: spacing.xs,
  },
  urlText: {
    fontSize: 11,
    flex: 1,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  canvasContainer: {
    flex: 1,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  simulatedAppWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  mockAppCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.lg,
  },
  mockAppHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  mockAppTitle: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
  },
  mockAppBody: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  mockAppHeroText: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  mockAppSubtext: {
    fontSize: typography.size.xs,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: spacing.lg,
  },
  mockDevStatus: {
    width: '100%',
    padding: spacing.md,
    borderRadius: radius.sm,
  },
  mockStatusText: {
    fontSize: 11,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    marginVertical: 2,
  },
  stoppedPlaceholder: {
    alignItems: 'center',
    padding: spacing.xxl,
    maxWidth: 320,
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  placeholderTitle: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    marginBottom: spacing.xs,
  },
  placeholderDesc: {
    fontSize: typography.size.xs,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: spacing.lg,
  },
  resumeBtn: {
    minWidth: 180,
  },
});
