/**
 * CodeNomad Design System Tokens
 * Professional developer tool visual language
 */

export const colors = {
  dark: {
    background: '#0B0F17',
    surface: '#151D2A',
    surfaceSubtle: '#101622',
    surfaceElevated: '#1E293B',
    border: '#2A3649',
    borderSubtle: '#1E293B',
    borderActive: '#38BDF8',
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    tint: '#38BDF8',
    accent: '#6366F1',
    tabIconDefault: '#64748B',
    tabIconSelected: '#38BDF8',
    cardBackground: '#131A26',
    codeBackground: '#080C14',
    status: {
      running: '#22C55E',
      starting: '#F59E0B',
      stopped: '#64748B',
      not_started: '#94A3B8',
      error: '#EF4444',
    },
    demoBadge: {
      background: 'rgba(245, 158, 11, 0.15)',
      border: 'rgba(245, 158, 11, 0.35)',
      text: '#FBBF24',
    },
    claudeBadge: {
      background: 'rgba(217, 119, 6, 0.15)',
      text: '#F59E0B',
    },
    geminiBadge: {
      background: 'rgba(59, 130, 246, 0.15)',
      text: '#60A5FA',
    },
  },
  light: {
    background: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceSubtle: '#F1F5F9',
    surfaceElevated: '#E2E8F0',
    border: '#E2E8F0',
    borderSubtle: '#EDF2F7',
    borderActive: '#0284C7',
    text: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
    tint: '#0284C7',
    accent: '#4F46E5',
    tabIconDefault: '#94A3B8',
    tabIconSelected: '#0284C7',
    cardBackground: '#FFFFFF',
    codeBackground: '#0F172A',
    status: {
      running: '#16A34A',
      starting: '#D97706',
      stopped: '#64748B',
      not_started: '#94A3B8',
      error: '#DC2626',
    },
    demoBadge: {
      background: 'rgba(217, 119, 6, 0.12)',
      border: 'rgba(217, 119, 6, 0.3)',
      text: '#B45309',
    },
    claudeBadge: {
      background: 'rgba(217, 119, 6, 0.12)',
      text: '#B45309',
    },
    geminiBadge: {
      background: 'rgba(37, 99, 235, 0.12)',
      text: '#2563EB',
    },
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const typography = {
  size: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 17,
    xl: 20,
    xxl: 24,
    title: 28,
  },
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  full: 9999,
};
