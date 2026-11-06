import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, radius } from '../src/theme';

export default function NotFoundScreen() {
  const theme = colors.dark;

  return (
    <>
      <Stack.Screen options={{ title: 'Screen Not Found' }} />
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Ionicons name="alert-circle-outline" size={48} color={theme.status.error} />
        <Text style={[styles.title, { color: theme.text }]}>Screen not found</Text>
        <Text style={[styles.description, { color: theme.textSecondary }]}>
          The requested route does not exist in this Phase 1 build.
        </Text>

        <Link href="/" style={[styles.link, { backgroundColor: theme.tint }]}>
          <Text style={styles.linkText}>Return to Home</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  title: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    marginTop: spacing.md,
  },
  description: {
    fontSize: typography.size.sm,
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  link: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
  },
  linkText: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
    color: '#0B0F17',
  },
});
