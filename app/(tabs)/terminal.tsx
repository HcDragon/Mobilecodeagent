import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useWorkspace } from '../../src/hooks/useWorkspaceState';
import { MOCK_TERMINAL_LOGS } from '../../src/data/mock/terminal';
import { TerminalLog } from '../../src/types';
import { DemoBanner } from '../../src/components/common/DemoBanner';
import { Badge } from '../../src/components/common/Badge';
import { colors, spacing, typography, radius } from '../../src/theme';

export default function TerminalScreen() {
  const { selectedProject } = useWorkspace();
  const [logs, setLogs] = useState<TerminalLog[]>(MOCK_TERMINAL_LOGS);
  const [inputCommand, setInputCommand] = useState('');
  const theme = colors.dark;

  const handleRunCommand = () => {
    if (!inputCommand.trim()) return;

    const cmd = inputCommand.trim();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const newLogs: TerminalLog[] = [
      {
        id: `cmd-${Date.now()}`,
        text: `$ ${cmd}`,
        type: 'command',
        timestamp: now,
      },
      {
        id: `out-${Date.now() + 1}`,
        text: `[Demo Environment - Phase 4]: Remote PTY WebSocket not connected.\nIn Phase 4, commands execute inside the isolated container on AWS Fargate.\nCommand entered: "${cmd}"`,
        type: 'info',
        timestamp: now,
      },
    ];

    setLogs((prev) => [...prev, ...newLogs]);
    setInputCommand('');
  };

  const handleClear = () => {
    setLogs([
      {
        id: `init-${Date.now()}`,
        text: `Terminal console cleared. Ready for Phase 4 WebSocket bridge.`,
        type: 'system',
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      {/* Top Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <View style={styles.headerLeft}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Terminal</Text>
          <View style={styles.projectContextChip}>
            <Ionicons name="terminal" size={12} color="#22C55E" />
            <Text style={[styles.projectContextText, { color: theme.textSecondary }]}>
              {selectedProject?.name || 'Workspace'}
            </Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <Badge
            label="Simulated PTY"
            variant="demo"
            size="sm"
            style={styles.simBadge}
          />
          <Pressable
            onPress={handleClear}
            style={({ pressed }) => [
              styles.clearBtn,
              { backgroundColor: theme.surfaceElevated, opacity: pressed ? 0.7 : 1 },
            ]}
            hitSlop={8}>
            <Ionicons name="trash-outline" size={16} color={theme.textMuted} />
          </Pressable>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        <View style={styles.bannerWrapper}>
          <DemoBanner
            message="Remote Terminal Placeholder (Phase 4)"
            subtext="Commands do not execute locally or remotely. Shell streaming via secure WebSockets will be introduced in Phase 4."
          />
        </View>

        {/* Terminal Screen Console */}
        <View style={[styles.terminalConsole, { backgroundColor: theme.codeBackground, borderColor: theme.border }]}>
          <ScrollView
            contentContainerStyle={styles.consoleContent}
            showsVerticalScrollIndicator={true}>
            {logs.map((log) => {
              let textColor = '#CBD5E1';
              if (log.type === 'command') textColor = '#38BDF8';
              else if (log.type === 'system') textColor = '#94A3B8';
              else if (log.type === 'info') textColor = '#22C55E';
              else if (log.type === 'error') textColor = '#EF4444';

              return (
                <View key={log.id} style={styles.logLine}>
                  <Text style={[styles.timestamp, { color: '#475569' }]}>
                    {log.timestamp}
                  </Text>
                  <Text style={[styles.logText, { color: textColor }]}>
                    {log.text}
                  </Text>
                </View>
              );
            })}
          </ScrollView>

          {/* Quick Command Suggestion Bar */}
          <View style={[styles.quickBar, { backgroundColor: '#131A26', borderTopColor: theme.border }]}>
            {['git status', 'npm test', 'ls -la', 'ps aux'].map((cmd) => (
              <Pressable
                key={cmd}
                onPress={() => setInputCommand(cmd)}
                style={({ pressed }) => [
                  styles.quickChip,
                  { backgroundColor: '#1E293B', opacity: pressed ? 0.7 : 1 },
                ]}>
                <Text style={styles.quickChipText}>{cmd}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Command Input Bar */}
        <View
          style={[
            styles.inputRow,
            { backgroundColor: theme.surface, borderTopColor: theme.border },
          ]}>
          <Text style={[styles.promptSymbol, { color: '#22C55E' }]}>$</Text>
          <TextInput
            value={inputCommand}
            onChangeText={setInputCommand}
            placeholder="Enter terminal command (demo)..."
            placeholderTextColor={theme.textMuted}
            style={[styles.input, { color: theme.text }]}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="send"
            onSubmitEditing={handleRunCommand}
          />
          <Pressable
            onPress={handleRunCommand}
            disabled={!inputCommand.trim()}
            style={({ pressed }) => [
              styles.runBtn,
              {
                backgroundColor: inputCommand.trim() ? '#22C55E' : theme.surfaceElevated,
                opacity: pressed ? 0.7 : 1,
              },
            ]}>
            <Ionicons
              name="return-down-back"
              size={18}
              color={inputCommand.trim() ? '#0B0F17' : theme.textMuted}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  simBadge: {
    marginRight: spacing.sm,
  },
  clearBtn: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyboardContainer: {
    flex: 1,
  },
  bannerWrapper: {
    paddingHorizontal: spacing.lg,
  },
  terminalConsole: {
    flex: 1,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xs,
    borderRadius: radius.md,
    borderWidth: 1,
    overflow: 'hidden',
  },
  consoleContent: {
    padding: spacing.md,
  },
  logLine: {
    marginBottom: spacing.xs,
  },
  timestamp: {
    fontSize: 10,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    marginBottom: 1,
  },
  logText: {
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    lineHeight: 18,
  },
  quickBar: {
    flexDirection: 'row',
    padding: spacing.xs,
    borderTopWidth: 1,
  },
  quickChip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
    marginRight: spacing.xs,
  },
  quickChipText: {
    color: '#94A3B8',
    fontSize: 11,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
  },
  promptSymbol: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: typography.size.sm,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    height: 40,
  },
  runBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
});
