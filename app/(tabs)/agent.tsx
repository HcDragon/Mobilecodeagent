import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useWorkspace } from '../../src/hooks/useWorkspaceState';
import { MOCK_AGENT_CONVERSATIONS } from '../../src/data/mock/agent';
import { ChatMessage, AIProvider } from '../../src/types';
import { DemoBanner } from '../../src/components/common/DemoBanner';
import { Badge } from '../../src/components/common/Badge';
import { Card } from '../../src/components/common/Card';
import { colors, spacing, typography, radius } from '../../src/theme';

export default function AgentScreen() {
  const { selectedProject, selectedProvider, setSelectedProvider } = useWorkspace();
  const [messages, setMessages] = useState<ChatMessage[]>(
    MOCK_AGENT_CONVERSATIONS[selectedProject?.id || 'default'] ||
      MOCK_AGENT_CONVERSATIONS['default']
  );
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const theme = colors.dark;

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: inputText.trim(),
      createdAt: new Date().toISOString(),
    };

    const currentText = inputText;
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulated assistant response clearly identified as local demo
    setTimeout(() => {
      const mockReply: ChatMessage = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        provider: selectedProvider,
        content: `[Demo Simulation - ${selectedProvider === 'claude' ? 'Claude 3.7' : 'Gemini 2.0'}]: I received your request: "${currentText}". In Phase 5, I will inspect your repository in AWS Fargate, run tests, and propose reviewed code diffs.`,
        createdAt: new Date().toISOString(),
        toolCall: {
          name: 'read_workspace_context()',
          status: 'completed',
          detail: `Simulated tool run on ${selectedProject?.name || 'current project'}`,
        },
      };
      setMessages((prev) => [...prev, mockReply]);
      setIsTyping(false);
    }, 1000);
  };

  const handleReset = () => {
    setMessages([
      {
        id: `reset-${Date.now()}`,
        role: 'assistant',
        provider: selectedProvider,
        content: `New session started with ${selectedProvider === 'claude' ? 'Claude' : 'Gemini'}. Describe a feature, bug fix, or refactor for ${selectedProject?.name || 'your workspace'}.`,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      {/* Top Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <View style={styles.headerLeft}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>AI Agent</Text>
          <View style={styles.projectContextChip}>
            <Ionicons name="folder-outline" size={12} color={theme.textMuted} />
            <Text style={[styles.projectContextText, { color: theme.textSecondary }]}>
              {selectedProject?.name || 'Workspace'}
            </Text>
          </View>
        </View>

        {/* New Session Action */}
        <Pressable
          onPress={handleReset}
          style={({ pressed }) => [
            styles.resetBtn,
            { backgroundColor: theme.surfaceElevated, opacity: pressed ? 0.7 : 1 },
          ]}
          hitSlop={8}>
          <Ionicons name="add-outline" size={20} color={theme.text} />
        </Pressable>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        {/* Provider Selector Bar */}
        <View style={[styles.providerBar, { backgroundColor: theme.surfaceSubtle, borderBottomColor: theme.border }]}>
          <Text style={[styles.providerLabel, { color: theme.textMuted }]}>
            Provider (Phase 5):
          </Text>
          <View style={styles.providerOptions}>
            <Pressable
              onPress={() => setSelectedProvider('claude')}
              style={[
                styles.providerPill,
                selectedProvider === 'claude' && {
                  backgroundColor: theme.claudeBadge.background,
                  borderColor: theme.claudeBadge.text,
                },
              ]}>
              <Text
                style={[
                  styles.providerPillText,
                  {
                    color:
                      selectedProvider === 'claude'
                        ? theme.claudeBadge.text
                        : theme.textSecondary,
                  },
                ]}>
                Claude 3.7
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setSelectedProvider('gemini')}
              style={[
                styles.providerPill,
                selectedProvider === 'gemini' && {
                  backgroundColor: theme.geminiBadge.background,
                  borderColor: theme.geminiBadge.text,
                },
              ]}>
              <Text
                style={[
                  styles.providerPillText,
                  {
                    color:
                      selectedProvider === 'gemini'
                        ? theme.geminiBadge.text
                        : theme.textSecondary,
                  },
                ]}>
                Gemini 2.0
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.bannerWrapper}>
          <DemoBanner
            message="AI Coding Agent (Phase 1 UI Prototype)"
            subtext="Provider APIs are not connected. Responses simulate local interaction without API keys or costs."
          />
        </View>

        {/* Conversation Message List */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isUser = item.role === 'user';
            return (
              <View
                style={[
                  styles.messageBubbleWrapper,
                  isUser ? styles.userBubbleWrapper : styles.assistantBubbleWrapper,
                ]}>
                <View
                  style={[
                    styles.messageBubble,
                    isUser
                      ? [styles.userBubble, { backgroundColor: theme.tint }]
                      : [
                          styles.assistantBubble,
                          {
                            backgroundColor: theme.surfaceElevated,
                            borderColor: theme.border,
                          },
                        ],
                  ]}>
                  {!isUser && (
                    <View style={styles.assistantHeader}>
                      <Ionicons
                        name="sparkles"
                        size={14}
                        color={
                          item.provider === 'gemini'
                            ? theme.geminiBadge.text
                            : theme.claudeBadge.text
                        }
                      />
                      <Text
                        style={[
                          styles.assistantName,
                          {
                            color:
                              item.provider === 'gemini'
                                ? theme.geminiBadge.text
                                : theme.claudeBadge.text,
                          },
                        ]}>
                        {item.provider === 'gemini' ? 'Gemini Adapter' : 'Claude Adapter'}{' '}
                        (Mock)
                      </Text>
                    </View>
                  )}
                  <Text
                    style={[
                      styles.messageText,
                      { color: isUser ? '#0B0F17' : theme.text },
                    ]}>
                    {item.content}
                  </Text>

                  {/* Tool Execution Card if present */}
                  {item.toolCall && (
                    <View
                      style={[
                        styles.toolCallCard,
                        {
                          backgroundColor: theme.surfaceSubtle,
                          borderColor: theme.border,
                        },
                      ]}>
                      <View style={styles.toolCallHeader}>
                        <Ionicons
                          name="construct-outline"
                          size={14}
                          color={theme.tint}
                        />
                        <Text style={[styles.toolCallName, { color: theme.tint }]}>
                          {item.toolCall.name}
                        </Text>
                      </View>
                      {item.toolCall.detail && (
                        <Text
                          style={[
                            styles.toolCallDetail,
                            { color: theme.textSecondary },
                          ]}>
                          {item.toolCall.detail}
                        </Text>
                      )}
                    </View>
                  )}
                </View>
              </View>
            );
          }}
          ListFooterComponent={
            isTyping ? (
              <View style={styles.typingIndicator}>
                <Text style={[styles.typingText, { color: theme.textMuted }]}>
                  Agent thinking & executing tools...
                </Text>
              </View>
            ) : undefined
          }
        />

        {/* Input Dock */}
        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: theme.surface,
              borderTopColor: theme.border,
            },
          ]}>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder={`Ask ${
              selectedProvider === 'claude' ? 'Claude' : 'Gemini'
            } to inspect or code...`}
            placeholderTextColor={theme.textMuted}
            style={[styles.input, { color: theme.text }]}
            multiline
            maxLength={1000}
          />
          <Pressable
            onPress={handleSend}
            disabled={!inputText.trim()}
            style={({ pressed }) => [
              styles.sendButton,
              {
                backgroundColor: inputText.trim() ? theme.tint : theme.surfaceElevated,
                opacity: pressed ? 0.7 : 1,
              },
            ]}>
            <Ionicons
              name="arrow-up"
              size={20}
              color={inputText.trim() ? '#0B0F17' : theme.textMuted}
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
  resetBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyboardContainer: {
    flex: 1,
  },
  providerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
  },
  providerLabel: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.medium,
  },
  providerOptions: {
    flexDirection: 'row',
  },
  providerPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: 'transparent',
    marginLeft: spacing.xs,
  },
  providerPillText: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
  },
  bannerWrapper: {
    paddingHorizontal: spacing.lg,
  },
  messageList: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  messageBubbleWrapper: {
    marginVertical: spacing.xs,
    maxWidth: '85%',
  },
  userBubbleWrapper: {
    alignSelf: 'flex-end',
  },
  assistantBubbleWrapper: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    padding: spacing.md,
    borderRadius: radius.lg,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    borderBottomLeftRadius: 4,
    borderWidth: 1,
  },
  assistantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  assistantName: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.bold,
    marginLeft: 4,
  },
  messageText: {
    fontSize: typography.size.sm,
    lineHeight: 20,
  },
  toolCallCard: {
    marginTop: spacing.sm,
    padding: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: 1,
  },
  toolCallHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolCallName: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    marginLeft: 4,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  toolCallDetail: {
    fontSize: 11,
    marginTop: 2,
  },
  typingIndicator: {
    padding: spacing.md,
    alignItems: 'center',
  },
  typingText: {
    fontSize: typography.size.xs,
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: typography.size.sm,
    maxHeight: 100,
    minHeight: 40,
    paddingTop: 8,
    paddingBottom: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
    marginBottom: 2,
  },
});
