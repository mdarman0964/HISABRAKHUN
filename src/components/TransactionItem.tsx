import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import Icon from 'react-native-vector-icons/Feather';
import { Transaction } from '../types';
import { colors, spacing, borderRadius, typography } from '../theme';
import { formatCurrency, formatDate, truncateText } from '../utils/formatters';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../constants';

interface TransactionItemProps {
  transaction: Transaction;
  onPress?: (transaction: Transaction) => void;
  index?: number;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onPress,
  index = 0,
}) => {
  const isIncome = transaction.type === 'income';
  const allCategories = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];
  const category = allCategories.find((c) => c.id === transaction.category) || allCategories[0];

  return (
    <MotiView
      from={{ opacity: 0, translateX: -20 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: 'spring', damping: 15, delay: index * 50 }}
    >
      <TouchableOpacity
        style={styles.container}
        onPress={() => onPress?.(transaction)}
        activeOpacity={0.7}
      >
        <View style={[styles.iconContainer, { backgroundColor: `${category.color}20` }]}>
          <Icon name={category.icon} size={20} color={category.color} />
        </View>

        <View style={styles.content}>
          <Text style={styles.description}>
            {truncateText(transaction.description, 25)}
          </Text>
          <Text style={styles.category}>{category.name}</Text>
        </View>

        <View style={styles.rightContent}>
          <Text
            style={[
              styles.amount,
              isIncome ? styles.incomeAmount : styles.expenseAmount,
            ]}
          >
            {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
          </Text>
          <Text style={styles.date}>{formatDate(transaction.date)}</Text>
        </View>

        {transaction.memoUrl && (
          <View style={styles.memoIndicator}>
            <Icon name="paperclip" size={12} color={colors.textMuted} />
          </View>
        )}
      </TouchableOpacity>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginLeft: spacing.md,
  },
  description: {
    color: colors.text,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    marginBottom: 2,
  },
  category: {
    color: colors.textSecondary,
    fontSize: typography.sizes.xs,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    marginBottom: 2,
  },
  incomeAmount: {
    color: colors.income,
  },
  expenseAmount: {
    color: colors.expense,
  },
  date: {
    color: colors.textMuted,
    fontSize: typography.sizes.xs,
  },
  memoIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});
