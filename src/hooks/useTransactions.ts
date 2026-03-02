import { useCallback, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { Transaction } from '../types';
import { format, startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns';

export const useTransactions = () => {
  const {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionById,
    getTransactionsByMonth,
    getTotalBalance,
    getTotalIncome,
    getTotalExpense,
  } = useStore();

  const recentTransactions = useMemo(() => {
    return transactions.slice(0, 10);
  }, [transactions]);

  const getTransactionsByType = useCallback(
    (type: 'income' | 'expense') => {
      return transactions.filter((t) => t.type === type);
    },
    [transactions]
  );

  const getTransactionsByCategory = useCallback(
    (categoryId: string) => {
      return transactions.filter((t) => t.category === categoryId);
    },
    [transactions]
  );

  const getMonthlyStats = useCallback(
    (month: Date) => {
      const monthTransactions = getTransactionsByMonth(month);
      const income = monthTransactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      const expense = monthTransactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
      return {
        income,
        expense,
        balance: income - expense,
        count: monthTransactions.length,
      };
    },
    [getTransactionsByMonth]
  );

  const getCategoryStats = useCallback(
    (month: Date) => {
      const monthTransactions = getTransactionsByMonth(month);
      const categoryMap = new Map<string, { amount: number; count: number }>();

      monthTransactions.forEach((t) => {
        const current = categoryMap.get(t.category) || { amount: 0, count: 0 };
        categoryMap.set(t.category, {
          amount: current.amount + t.amount,
          count: current.count + 1,
        });
      });

      return Array.from(categoryMap.entries()).map(([categoryId, stats]) => ({
        categoryId,
        ...stats,
      }));
    },
    [getTransactionsByMonth]
  );

  const searchTransactions = useCallback(
    (query: string) => {
      const lowerQuery = query.toLowerCase();
      return transactions.filter(
        (t) =>
          t.description.toLowerCase().includes(lowerQuery) ||
          t.category.toLowerCase().includes(lowerQuery)
      );
    },
    [transactions]
  );

  return {
    transactions,
    recentTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionById,
    getTransactionsByMonth,
    getTransactionsByType,
    getTransactionsByCategory,
    getMonthlyStats,
    getCategoryStats,
    searchTransactions,
    totalBalance: getTotalBalance(),
    totalIncome: getTotalIncome(),
    totalExpense: getTotalExpense(),
  };
};
