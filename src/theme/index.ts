export const colors = {
  // Primary Colors
  primary: '#6366f1',
  primaryLight: '#818cf8',
  primaryDark: '#4f46e5',
  
  // Secondary Colors
  secondary: '#ec4899',
  secondaryLight: '#f472b6',
  secondaryDark: '#db2777',
  
  // Background Colors
  background: '#0f0f1a',
  backgroundLight: '#1a1a2e',
  backgroundCard: '#16162a',
  surface: '#252542',
  
  // Text Colors
  text: '#ffffff',
  textSecondary: '#a1a1aa',
  textMuted: '#71717a',
  
  // Status Colors
  success: '#22c55e',
  successLight: '#86efac',
  error: '#ef4444',
  errorLight: '#fca5a5',
  warning: '#f59e0b',
  warningLight: '#fcd34d',
  info: '#3b82f6',
  infoLight: '#93c5fd',
  
  // Income/Expense Colors
  income: '#10b981',
  incomeGradient: ['#10b981', '#34d399'],
  expense: '#ef4444',
  expenseGradient: ['#ef4444', '#f87171'],
  
  // Gradient Presets
  primaryGradient: ['#6366f1', '#8b5cf6'],
  darkGradient: ['#0f0f1a', '#1a1a2e'],
  cardGradient: ['#1a1a2e', '#252542'],
  
  // Category Colors
  categoryColors: [
    '#ef4444', '#f97316', '#f59e0b', '#84cc16',
    '#22c55e', '#10b981', '#06b6d4', '#3b82f6',
    '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
    '#ec4899', '#f43f5e'
  ],
  
  // Transparent
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(255, 255, 255, 0.1)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 9999,
};

export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    display: 48,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  fonts: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semibold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
  },
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 16,
  },
  glow: {
    primary: {
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 10,
      elevation: 10,
    },
    success: {
      shadowColor: colors.success,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 10,
      elevation: 10,
    },
    error: {
      shadowColor: colors.error,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 10,
      elevation: 10,
    },
  },
};

export const animations = {
  spring: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
  timing: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
};

export const theme = {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
  animations,
};

export default theme;
