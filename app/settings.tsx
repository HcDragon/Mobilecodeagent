import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Header } from '../src/components/common/Header';
import { Card } from '../src/components/common/Card';
import { Badge } from '../src/components/common/Badge';
import { DemoBanner } from '../src/components/common/DemoBanner';
import { colors, spacing, typography, radius } from '../src/theme';

export default function SettingsScreen() {
  const router = useRouter();
  const theme = colors.dark;

  const handleInfoAlert = (title: string, message: string) => {
    Alert.alert(title, message);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <Header
        title="Settings"
        subtitle="Preferences & Integrations"
        showBack
        rightAction={
          <Pressable onPress={() => router.back()} hitSlop={8}>
            <Ionicons name="close" size={24} color={theme.text} />
          </Pressable>
        }
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <DemoBanner
          message="Settings & Integration Hub"
          subtext="Credentials and authentication tokens are kept strictly on the backend. No secret keys are stored locally."
        />

        {/* Profile Placeholder */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Profile</Text>
        <Card style={styles.card}>
          <View style={styles.profileRow}>
            <View style={[styles.avatarCircle, { backgroundColor: theme.surfaceElevated }]}>
              <Ionicons name="person" size={24} color={theme.tint} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: theme.text }]}>
                Developer (Demo User)
              </Text>
              <Text style={[styles.profileEmail, { color: theme.textSecondary }]}>
                developer@codenomad.local
              </Text>
            </View>
            <Badge label="Local Demo" variant="demo" size="sm" />
          </View>
        </Card>

        {/* Integrations */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Integrations</Text>
        <Card style={styles.card}>
          {/* GitHub Connection */}
          <Pressable
            onPress={() =>
              handleInfoAlert(
                'GitHub App Integration',
                'GitHub authentication via scoped GitHub App tokens will be implemented in Phase 3 according to PRD Section 9.'
              )
            }
            style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#1E293B' }]}>
                <Ionicons name="logo-github" size={18} color={theme.text} />
              </View>
              <View>
                <Text style={[styles.settingTitle, { color: theme.text }]}>
                  GitHub
                </Text>
                <Text style={[styles.settingSubtitle, { color: theme.textMuted }]}>
                  Repos, PRs, and branch control
                </Text>
              </View>
            </View>
            <Badge label="Phase 3" variant="default" size="sm" />
          </Pressable>

          <View style={[styles.divider, { backgroundColor: theme.borderSubtle }]} />

          {/* AI Providers */}
          <Pressable
            onPress={() =>
              handleInfoAlert(
                'AI Provider Adapters',
                'Claude 3.7 and Gemini 2.0 adapters with tool verification policy will be configured in Phase 5 according to PRD Section 11.'
              )
            }
            style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: 'rgba(168, 85, 247, 0.15)' }]}>
                <Ionicons name="sparkles" size={18} color="#A855F7" />
              </View>
              <View>
                <Text style={[styles.settingTitle, { color: theme.text }]}>
                  AI Providers (Claude / Gemini)
                </Text>
                <Text style={[styles.settingSubtitle, { color: theme.textMuted }]}>
                  Server-side LLM orchestrator
                </Text>
              </View>
            </View>
            <Badge label="Phase 5" variant="default" size="sm" />
          </Pressable>

          <View style={[styles.divider, { backgroundColor: theme.borderSubtle }]} />

          {/* Cloud Infrastructure */}
          <Pressable
            onPress={() =>
              handleInfoAlert(
                'AWS Workspace Runtime',
                'AWS Fargate isolated containers and EFS persistence will be connected in Phase 4 according to PRD Section 10.'
              )
            }
            style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: 'rgba(245, 158, 11, 0.15)' }]}>
                <Ionicons name="server" size={18} color="#F59E0B" />
              </View>
              <View>
                <Text style={[styles.settingTitle, { color: theme.text }]}>
                  Cloud Execution Runtime
                </Text>
                <Text style={[styles.settingSubtitle, { color: theme.textMuted }]}>
                  AWS ECS Fargate & EFS storage
                </Text>
              </View>
            </View>
            <Badge label="Phase 4" variant="default" size="sm" />
          </Pressable>
        </Card>

        {/* Preferences */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Preferences</Text>
        <Card style={styles.card}>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#1E293B' }]}>
                <Ionicons name="moon-outline" size={18} color={theme.text} />
              </View>
              <View>
                <Text style={[styles.settingTitle, { color: theme.text }]}>
                  Theme
                </Text>
                <Text style={[styles.settingSubtitle, { color: theme.textMuted }]}>
                  Developer Dark (Default)
                </Text>
              </View>
            </View>
            <Badge label="Dark" variant="accent" size="sm" />
          </View>
        </Card>

        {/* About & Version */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>About</Text>
        <Card style={styles.card}>
          <View style={styles.aboutRow}>
            <Text style={[styles.aboutLabel, { color: theme.textSecondary }]}>
              Application
            </Text>
            <Text style={[styles.aboutValue, { color: theme.text }]}>
              CodeNomad Mobile
            </Text>
          </View>
          <View style={styles.aboutRow}>
            <Text style={[styles.aboutLabel, { color: theme.textSecondary }]}>
              Version
            </Text>
            <Text style={[styles.aboutValue, { color: theme.text }]}>
              0.1.0 (Phase 1)
            </Text>
          </View>
          <View style={styles.aboutRow}>
            <Text style={[styles.aboutLabel, { color: theme.textSecondary }]}>
              Runtime Target
            </Text>
            <Text style={[styles.aboutValue, { color: theme.text }]}>
              React Native 0.88 / Expo SDK 58
            </Text>
          </View>
          <View style={styles.aboutRow}>
            <Text style={[styles.aboutLabel, { color: theme.textSecondary }]}>
              Platforms
            </Text>
            <Text style={[styles.aboutValue, { color: theme.text }]}>
              iOS & Android
            </Text>
          </View>
        </Card>
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
  sectionTitle: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    padding: spacing.md,
    marginVertical: 4,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
  },
  profileEmail: {
    fontSize: typography.size.xs,
    marginTop: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  settingTitle: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
  },
  settingSubtitle: {
    fontSize: typography.size.xs,
    marginTop: 1,
  },
  divider: {
    height: 1,
    marginVertical: 2,
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  aboutLabel: {
    fontSize: typography.size.xs,
  },
  aboutValue: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
  },
});
