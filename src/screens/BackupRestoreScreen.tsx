import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import Icon from 'react-native-vector-icons/Feather';
import { GradientButton } from '../components/GradientButton';
import { GlassCard } from '../components/GlassCard';
import { useStore } from '../store/useStore';
import { BackupService } from '../services/backup';
import { colors, spacing, borderRadius, typography } from '../theme';
import { formatDateTime } from '../utils/formatters';

interface BackupRestoreScreenProps {
  navigation: any;
}

export const BackupRestoreScreen: React.FC<BackupRestoreScreenProps> = ({
  navigation,
}) => {
  const { transactions, categories, user, lastBackupDate, setLastBackupDate } = useStore();
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [backups, setBackups] = useState<any[]>([]);
  const [isLoadingBackups, setIsLoadingBackups] = useState(false);

  useEffect(() => {
    loadBackups();
  }, []);

  const loadBackups = async () => {
    setIsLoadingBackups(true);
    try {
      const backupList = await BackupService.listAllBackups();
      setBackups(backupList);
    } catch (error) {
      console.error('Load Backups Error:', error);
    } finally {
      setIsLoadingBackups(false);
    }
  };

  const handleBackup = async () => {
    if (transactions.length === 0) {
      Alert.alert('তথ্য', 'ব্যাকআপ করার জন্য কোনো লেনদেন নেই');
      return;
    }

    setIsBackingUp(true);
    try {
      const result = await BackupService.createBackup(
        transactions,
        categories,
        user?.id || ''
      );

      if (result.success) {
        setLastBackupDate(new Date().toISOString());
        Alert.alert('সফল', 'ব্যাকআপ সফলভাবে সংরক্ষিত হয়েছে');
        loadBackups();
      } else {
        Alert.alert('ব্যর্থ', result.error || 'ব্যাকআপ ব্যর্থ হয়েছে');
      }
    } catch (error: any) {
      Alert.alert('ত্রুটি', error.message);
    } finally {
      setIsBackingUp(false);
    }
  };

  const handleRestore = async () => {
    Alert.alert(
      'নিশ্চিত করুন',
      'এই অপারেশনটি আপনার বর্তমান ডেটা প্রতিস্থাপন করবে। আপনি কি নিশ্চিত?',
      [
        { text: 'বাতিল', style: 'cancel' },
        {
          text: 'পুনরুদ্ধার',
          style: 'destructive',
          onPress: async () => {
            setIsRestoring(true);
            try {
              const result = await BackupService.restoreBackup();

              if (result.success && result.data) {
                // Restore data to store
                const { transactions: restoredTransactions, categories: restoredCategories } = result.data;
                
                // Update store with restored data
                useStore.setState({
                  transactions: restoredTransactions,
                  categories: restoredCategories,
                });

                Alert.alert('সফল', 'ডেটা সফলভাবে পুনরুদ্ধার করা হয়েছে');
              } else {
                Alert.alert('ব্যর্থ', result.error || 'পুনরুদ্ধার ব্যর্থ হয়েছে');
              }
            } catch (error: any) {
              Alert.alert('ত্রুটি', error.message);
            } finally {
              setIsRestoring(false);
            }
          },
        },
      ]
    );
  };

  const handleDeleteBackup = async (fileId: string) => {
    Alert.alert(
      'নিশ্চিত করুন',
      'আপনি কি এই ব্যাকআপ মুছে ফেলতে চান?',
      [
        { text: 'বাতিল', style: 'cancel' },
        {
          text: 'মুছুন',
          style: 'destructive',
          onPress: async () => {
            const success = await BackupService.deleteBackup(fileId);
            if (success) {
              Alert.alert('সফল', 'ব্যাকআপ মুছে ফেলা হয়েছে');
              loadBackups();
            } else {
              Alert.alert('ব্যর্থ', 'ব্যাকআপ মুছতে ব্যর্থ হয়েছে');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={colors.darkGradient} style={styles.gradient}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>ব্যাকআপ ও পুনরুদ্ধার</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Info Card */}
          <GlassCard style={styles.infoCard}>
            <Icon name="info" size={24} color={colors.info} />
            <Text style={styles.infoText}>
              আপনার ডেটা গুগল ড্রাইভে নিরাপদে সংরক্ষিত হয়। আপনি যেকোনো সময়
              পুনরুদ্ধার করতে পারবেন।
            </Text>
          </GlassCard>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{transactions.length}</Text>
              <Text style={styles.statLabel}>মোট লেনদেন</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{categories.length}</Text>
              <Text style={styles.statLabel}>ক্যাটাগরি</Text>
            </View>
          </View>

          {/* Last Backup */}
          {lastBackupDate && (
            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
            >
              <GlassCard style={styles.lastBackupCard}>
                <Icon name="check-circle" size={20} color={colors.success} />
                <View style={styles.lastBackupContent}>
                  <Text style={styles.lastBackupLabel}>সর্বশেষ ব্যাকআপ</Text>
                  <Text style={styles.lastBackupDate}>
                    {formatDateTime(lastBackupDate)}
                  </Text>
                </View>
              </GlassCard>
            </MotiView>
          )}

          {/* Action Buttons */}
          <View style={styles.actionContainer}>
            <GradientButton
              title="এখন ব্যাকআপ করুন"
              onPress={handleBackup}
              loading={isBackingUp}
              icon={<Icon name="upload-cloud" size={20} color={colors.text} />}
              colors={colors.primaryGradient}
            />

            <TouchableOpacity
              style={styles.restoreButton}
              onPress={handleRestore}
              disabled={isRestoring}
            >
              <LinearGradient
                colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                style={styles.restoreGradient}
              >
                {isRestoring ? (
                  <ActivityIndicator color={colors.text} />
                ) : (
                  <>
                    <Icon name="download-cloud" size={20} color={colors.text} />
                    <Text style={styles.restoreText}>পুনরুদ্ধার করুন</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Backup History */}
          <View style={styles.historyContainer}>
            <Text style={styles.historyTitle}>ব্যাকআপ ইতিহাস</Text>

            {isLoadingBackups ? (
              <ActivityIndicator color={colors.primary} />
            ) : backups.length > 0 ? (
              backups.map((backup, index) => (
                <MotiView
                  key={backup.id}
                  from={{ opacity: 0, translateX: -20 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{ delay: index * 100 }}
                >
                  <GlassCard style={styles.backupItem}>
                    <View style={styles.backupInfo}>
                      <Icon name="file-text" size={20} color={colors.primary} />
                      <View>
                        <Text style={styles.backupName}>{backup.name}</Text>
                        <Text style={styles.backupDate}>
                          {formatDateTime(backup.createdTime)}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleDeleteBackup(backup.id)}
                    >
                      <Icon name="trash-2" size={20} color={colors.error} />
                    </TouchableOpacity>
                  </GlassCard>
                </MotiView>
              ))
            ) : (
              <GlassCard style={styles.emptyCard}>
                <Icon name="inbox" size={32} color={colors.textMuted} />
                <Text style={styles.emptyText}>কোনো ব্যাকআপ নেই</Text>
              </GlassCard>
            )}
          </View>

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
  headerTitle: {
    color: colors.text,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
  },
  infoCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  infoText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statValue: {
    color: colors.text,
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: typography.sizes.xs,
    marginTop: spacing.xs,
  },
  lastBackupCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  lastBackupContent: {
    flex: 1,
  },
  lastBackupLabel: {
    color: colors.textSecondary,
    fontSize: typography.sizes.xs,
  },
  lastBackupDate: {
    color: colors.text,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    marginTop: 2,
  },
  actionContainer: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  restoreButton: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  restoreGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.md,
  },
  restoreText: {
    color: colors.text,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  historyContainer: {
    marginHorizontal: spacing.md,
  },
  historyTitle: {
    color: colors.text,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    marginBottom: spacing.md,
  },
  backupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  backupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  backupName: {
    color: colors.text,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  backupDate: {
    color: colors.textMuted,
    fontSize: typography.sizes.xs,
    marginTop: 2,
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    marginTop: spacing.sm,
  },
  bottomPadding: {
    height: 50,
  },
});
