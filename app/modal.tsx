import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, radius } from '../src/theme';

export default function ModalScreen() {
  const theme = colors.dark;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <Ionicons name="code-slash" size={36} color={theme.tint} />
        <Text style={[styles.title, { color: theme.text }]}>CodeNomad Architecture</Text>
        <Text style={[styles.version, { color: theme.tint }]}>Version 0.1.0 (Phase 1 Baseline)</Text>

        <Text style={[styles.description, { color: theme.textSecondary }]}>
          CodeNomad is a portable cloud development environment enabling developers to continue coding from iOS and Android devices.
        </Text>

        <View style={[styles.infoBox, { backgroundColor: theme.codeBackground }]}>
          <Text style={[styles.infoTitle, { color: theme.text }]}>Separation of Planes:</Text>
          <Text style={[styles.infoItem, { color: theme.textSecondary }]}>
            • Control Plane: FastAPI, Auth, GitHub App, Agent orchestration
          </Text>
          <Text style={[styles.infoItem, { color: theme.textSecondary }]}>
            • Workspace Plane: AWS ECS Fargate, persistent EFS, isolated PTY
          </Text>
          <Text style={[styles.infoItem, { color: theme.textSecondary }]}>
            • Mobile Client: React Native & Expo Router interface
          </Text>
        </View>
      </View>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    marginTop: spacing.sm,
  },
  version: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    marginTop: 2,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: typography.size.sm,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  infoBox: {
    width: '100%',
    padding: spacing.md,
    borderRadius: radius.md,
  },
  infoTitle: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.bold,
    marginBottom: spacing.xs,
  },
  infoItem: {
    fontSize: 11,
    marginVertical: 2,
    lineHeight: 16,
  },
});
