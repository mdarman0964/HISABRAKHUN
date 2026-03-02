import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import Icon from 'react-native-vector-icons/Feather';
import { BalanceCard } from '../components/BalanceCard';
import { TransactionItem } from '../components/TransactionItem';
import { GlassCard } from '../components/GlassCard';
import { useStore } from '../store/useStore';
import { useTransactions } from '../hooks/useTransactions';
import { colors, spacing, borderRadius, typography } from '../theme';
import { getGreeting, formatMonthYear } from '../utils/formatters';
import { Transaction } from '../types';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { user } = useStore();
  const {
    recentTransactions,
    totalBalance,
    totalIncome,
    totalExpense,
  } = useTransactions();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handleAddTransaction = () => {
    navigation.navigate('AddTransaction');
  };

  const handleTransactionPress = (transaction: Transaction) => {
    navigation.navigate('TransactionDetail', { transaction });
  };

  const handleViewAll = () => {
    navigation.navigate('Transactions');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={colors.darkGradient} style={styles.gradient}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.userName}>{user?.name || 'ব্যবহারকারী'}</Text>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Icon name="user" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Balance Card */}
          <BalanceCard
            totalBalance={totalBalance}
            totalIncome={totalIncome}
            totalExpense={totalExpense}
          />

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <MotiView
              from={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 100 }}
            >
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleAddTransaction}
              >
                <LinearGradient
                  colors={colors.incomeGradient}
                  style={styles.actionGradient}
                >
                  <Icon name="plus" size={24} color={colors.text} />
                  <Text style={styles.actionText}>আয়</Text>
                </LinearGradient>
              </TouchableOpacity>
            </MotiView>

            <MotiView
              from={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 200 }}
            >
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleAddTransaction}
              >
                <LinearGradient
                  colors={colors.expenseGradient}
                  style={styles.actionGradient}
                >
                  <Icon name="minus" size={24} color={colors.text} />
                  <Text style={styles.actionText}>ব্যয়</Text>
                </LinearGradient>
              </TouchableOpacity>
            </MotiView>

            <MotiView
              from={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 300 }}
            >
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.navigate('BackupRestore')}
              >
                <LinearGradient
                  colors={colors.primaryGradient}
                  style={styles.actionGradient}
                >
                  <Icon name="cloud" size={24} color={colors.text} />
                  <Text style={styles.actionText}>ব্যাকআপ</Text>
                </LinearGradient>
              </TouchableOpacity>
            </MotiView>
          </View>

          {/* Monthly Summary */}
          <GlassCard style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>এই মাসের সারাংশ</Text>
            <Text style={styles.summaryMonth}>{formatMonthYear(new Date())}</Text>
          </GlassCard>

          {/* Recent Transactions */}
          <View style={styles.transactionsHeader}>
            <Text style={styles.sectionTitle}>সাম্প্রতিক লেনদেন</Text>
            <TouchableOpacity onPress={handleViewAll}>
              <Text style={styles.viewAllText}>সব দেখুন</Text>
            </TouchableOpacity>
          </View>

          {recentTransactions.length > 0 ? (
            recentTransactions.map((transaction, index) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onPress={handleTransactionPress}
                index={index}
              />
            ))
          ) : (
            <GlassCard style={styles.emptyCard}>
              <Icon name="inbox" size={48} color={colors.textMuted} />
              <Text style={styles.emptyText}>কোনো লেনদেন নেই</Text>
              <Text style={styles.emptySubtext}>
                নতুন লেনদেন যোগ করতে + বাটনে ট্যাপ করুন
              </Text>
            </GlassCard>
          )}

          <View style={styles.bottomPadding} />
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl + 20,
    paddingBottom: spacing.md,
  },
  greeting: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
  },
  userName: {
    color: colors.text,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    backgroundColor: colors.backgroundCard,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
    marginVertical: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  actionButton: {
    flex: 1,
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
  },
  actionText: {
    color: colors.text,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },
  summaryCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  summaryTitle: {
    color: colors.text,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  summaryMonth: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    marginTop: spacing.xs,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
  },
  viewAllText: {
    color: colors.primary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  emptyCard: {
    marginHorizontal: spacing.md,
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.md,
    marginTop: spacing.md,
  },
  emptySubtext: {
    color: colors.textMuted,
    fontSize: typography.sizes.sm,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  bottomPadding: {
    height: 100,
  },
});
