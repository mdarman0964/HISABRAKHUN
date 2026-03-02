import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import Icon from 'react-native-vector-icons/Feather';
import { colors, borderRadius, typography, shadows } from '../theme';
import { formatCurrency } from '../utils/formatters';

interface BalanceCardProps {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  totalBalance,
  totalIncome,
  totalExpense,
}) => {
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 15 }}
    >
      <LinearGradient
        colors={colors.primaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.label}>মোট ব্যালেন্স</Text>
          <Icon name="wallet" size={24} color={colors.text} />
        </View>
        
        <Text style={styles.balance}>
          {formatCurrency(totalBalance)}
        </Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Icon name="arrow-down-left" size={16} color={colors.success} />
            </View>
            <View>
              <Text style={styles.statLabel}>আয়</Text>
              <Text style={styles.statValue}>{formatCurrency(totalIncome)}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.statItem}>
            <View style={[styles.statIconContainer, styles.expenseIcon]}>
              <Icon name="arrow-up-right" size={16} color={colors.error} />
            </View>
            <View>
              <Text style={styles.statLabel}>ব্যয়</Text>
              <Text style={styles.statValue}>{formatCurrency(totalExpense)}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.xl,
    padding: 24,
    marginHorizontal: 16,
    marginVertical: 8,
    ...shadows.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  balance: {
    color: colors.text,
    fontSize: typography.sizes.display,
    fontWeight: typography.weights.bold,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: borderRadius.lg,
    padding: 16,
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expenseIcon: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: typography.sizes.xs,
    marginBottom: 2,
  },
  statValue: {
    color: colors.text,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 16,
  },
});
