import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GradientButton } from '../components/GradientButton';
import { GlassCard } from '../components/GlassCard';
import { useStore } from '../store/useStore';
import { useTransactions } from '../hooks/useTransactions';
import { MemoService, MemoFile } from '../services/memo';
import { colors, spacing, borderRadius, typography } from '../theme';
import { formatCurrency, formatDate } from '../utils/formatters';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../constants';
import { Transaction } from '../types';

interface AddTransactionScreenProps {
  navigation: any;
  route: {
    params?: {
      transaction?: Transaction;
    };
  };
}

export const AddTransactionScreen: React.FC<AddTransactionScreenProps> = ({
  navigation,
  route,
}) => {
  const editingTransaction = route.params?.transaction;
  const { addTransaction, updateTransaction } = useTransactions();
  const { user } = useStore();

  const [type, setType] = useState<'income' | 'expense'>(
    editingTransaction?.type || 'expense'
  );
  const [amount, setAmount] = useState(
    editingTransaction?.amount.toString() || ''
  );
  const [description, setDescription] = useState(
    editingTransaction?.description || ''
  );
  const [category, setCategory] = useState(editingTransaction?.category || '');
  const [date, setDate] = useState(
    editingTransaction ? new Date(editingTransaction.date) : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [memo, setMemo] = useState<MemoFile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleAmountChange = (text: string) => {
    // Only allow numbers and decimal point
    const cleaned = text.replace(/[^0-9.]/g, '');
    setAmount(cleaned);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handlePickImage = async () => {
    try {
      const hasPermission = await MemoService.requestPermissions();
      if (!hasPermission) {
        Alert.alert('অনুমতি প্রয়োজন', 'ছবি নির্বাচন করতে অনুমতি প্রয়োজন');
        return;
      }

      const file = await MemoService.pickImageFromGallery();
      if (file) {
        setMemo(file);
      }
    } catch (error: any) {
      Alert.alert('ত্রুটি', error.message);
    }
  };

  const handleCaptureImage = async () => {
    try {
      const hasPermission = await MemoService.requestPermissions();
      if (!hasPermission) {
        Alert.alert('অনুমতি প্রয়োজন', 'ক্যামেরা ব্যবহার করতে অনুমতি প্রয়োজন');
        return;
      }

      const file = await MemoService.captureImageFromCamera();
      if (file) {
        setMemo(file);
      }
    } catch (error: any) {
      Alert.alert('ত্রুটি', error.message);
    }
  };

  const handlePickDocument = async () => {
    try {
      const file = await MemoService.pickDocument();
      if (file) {
        setMemo(file);
      }
    } catch (error: any) {
      Alert.alert('ত্রুটি', error.message);
    }
  };

  const handleRemoveMemo = () => {
    setMemo(null);
  };

  const handleSubmit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('ত্রুটি', 'সঠিক পরিমাণ দিন');
      return;
    }

    if (!description.trim()) {
      Alert.alert('ত্রুটি', 'বিবরণ দিন');
      return;
    }

    if (!category) {
      Alert.alert('ত্রুটি', 'ক্যাটাগরি নির্বাচন করুন');
      return;
    }

    setIsLoading(true);

    try {
      let memoUrl = editingTransaction?.memoUrl;
      let memoType = editingTransaction?.memoType;
      let memoName = editingTransaction?.memoName;

      // Save memo if exists
      if (memo) {
        const savedPath = await MemoService.saveMemoToLocal(
          memo,
          editingTransaction?.id || Date.now().toString()
        );
        memoUrl = savedPath;
        memoType = MemoService.isImage(memo.type) ? 'image' : 'document';
        memoName = memo.name;
      }

      const transactionData = {
        amount: parseFloat(amount),
        type,
        category,
        description: description.trim(),
        date,
        memoUrl,
        memoType,
        memoName,
        userId: user?.id || '',
      };

      if (editingTransaction) {
        updateTransaction(editingTransaction.id, transactionData);
      } else {
        addTransaction(transactionData);
      }

      navigation.goBack();
    } catch (error: any) {
      Alert.alert('ত্রুটি', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient colors={colors.darkGradient} style={styles.gradient}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {editingTransaction ? 'লেনদেন সম্পাদনা' : 'নতুন লেনদেন'}
          </Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Type Selector */}
          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                type === 'income' && styles.typeButtonActive,
              ]}
              onPress={() => {
                setType('income');
                setCategory('');
              }}
            >
              <LinearGradient
                colors={
                  type === 'income'
                    ? colors.incomeGradient
                    : ['transparent', 'transparent']
                }
                style={styles.typeGradient}
              >
                <Icon
                  name="arrow-down-left"
                  size={20}
                  color={type === 'income' ? colors.text : colors.textSecondary}
                />
                <Text
                  style={[
                    styles.typeText,
                    type === 'income' && styles.typeTextActive,
                  ]}
                >
                  আয়
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                type === 'expense' && styles.typeButtonActive,
              ]}
              onPress={() => {
                setType('expense');
                setCategory('');
              }}
            >
              <LinearGradient
                colors={
                  type === 'expense'
                    ? colors.expenseGradient
                    : ['transparent', 'transparent']
                }
                style={styles.typeGradient}
              >
                <Icon
                  name="arrow-up-right"
                  size={20}
                  color={type === 'expense' ? colors.text : colors.textSecondary}
                />
                <Text
                  style={[
                    styles.typeText,
                    type === 'expense' && styles.typeTextActive,
                  ]}
                >
                  ব্যয়
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Amount Input */}
          <GlassCard style={styles.amountCard}>
            <Text style={styles.amountLabel}>পরিমাণ</Text>
            <View style={styles.amountInputContainer}>
              <Text style={styles.currencySymbol}>৳</Text>
              <TextInput
                style={styles.amountInput}
                value={amount}
                onChangeText={handleAmountChange}
                keyboardType="decimal-pad"
                placeholder="0.00"
                placeholderTextColor={colors.textMuted}
              />
            </View>
          </GlassCard>

          {/* Description Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>বিবরণ</Text>
            <TextInput
              style={styles.textInput}
              value={description}
              onChangeText={setDescription}
              placeholder="লেনদেনের বিবরণ লিখুন"
              placeholderTextColor={colors.textMuted}
              multiline
            />
          </View>

          {/* Category Selector */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>ক্যাটাগরি</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryContainer}
            >
              {categories.map((cat, index) => (
                <MotiView
                  key={cat.id}
                  from={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 50 }}
                >
                  <TouchableOpacity
                    style={[
                      styles.categoryButton,
                      category === cat.id && {
                        backgroundColor: `${cat.color}30`,
                        borderColor: cat.color,
                      },
                    ]}
                    onPress={() => setCategory(cat.id)}
                  >
                    <Icon name={cat.icon} size={18} color={cat.color} />
                    <Text
                      style={[
                        styles.categoryText,
                        category === cat.id && { color: cat.color },
                      ]}
                    >
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                </MotiView>
              ))}
            </ScrollView>
          </View>

          {/* Date Picker */}
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Icon name="calendar" size={20} color={colors.primary} />
            <Text style={styles.dateText}>{formatDate(date)}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}

          {/* Memo Attachment */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>মেমো সংযুক্তি (ঐচ্ছিক)</Text>
            {memo ? (
              <GlassCard style={styles.memoPreview}>
                {MemoService.isImage(memo.type) ? (
                  <Image source={{ uri: memo.uri }} style={styles.memoImage} />
                ) : (
                  <View style={styles.memoDocument}>
                    <Icon
                      name={MemoService.getFileIcon(memo.type)}
                      size={32}
                      color={colors.primary}
                    />
                    <Text style={styles.memoName} numberOfLines={1}>
                      {memo.name}
                    </Text>
                    <Text style={styles.memoSize}>
                      {MemoService.formatFileSize(memo.size)}
                    </Text>
                  </View>
                )}
                <TouchableOpacity
                  style={styles.removeMemoButton}
                  onPress={handleRemoveMemo}
                >
                  <Icon name="x" size={20} color={colors.error} />
                </TouchableOpacity>
              </GlassCard>
            ) : (
              <View style={styles.memoButtons}>
                <TouchableOpacity
                  style={styles.memoButton}
                  onPress={handlePickImage}
                >
                  <Icon name="image" size={20} color={colors.primary} />
                  <Text style={styles.memoButtonText}>গ্যালারি</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.memoButton}
                  onPress={handleCaptureImage}
                >
                  <Icon name="camera" size={20} color={colors.primary} />
                  <Text style={styles.memoButtonText}>ক্যামেরা</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.memoButton}
                  onPress={handlePickDocument}
                >
                  <Icon name="file" size={20} color={colors.primary} />
                  <Text style={styles.memoButtonText}>ডকুমেন্ট</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Submit Button */}
          <GradientButton
            title={editingTransaction ? 'আপডেট করুন' : 'সংরক্ষণ করুন'}
            onPress={handleSubmit}
            loading={isLoading}
            style={styles.submitButton}
          />

          <View style={styles.bottomPadding} />
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
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
  typeSelector: {
    flexDirection: 'row',
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  typeButton: {
    flex: 1,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  typeButtonActive: {
    borderColor: 'transparent',
  },
  typeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.md,
  },
  typeText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
  },
  typeTextActive: {
    color: colors.text,
    fontWeight: typography.weights.semibold,
  },
  amountCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  amountLabel: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    marginBottom: spacing.sm,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  currencySymbol: {
    color: colors.text,
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.bold,
  },
  amountInput: {
    color: colors.text,
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.bold,
    minWidth: 150,
    textAlign: 'center',
  },
  inputContainer: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  inputLabel: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    marginBottom: spacing.sm,
  },
  textInput: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    color: colors.text,
    fontSize: typography.sizes.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.backgroundCard,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  categoryText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.backgroundCard,
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  dateText: {
    color: colors.text,
    fontSize: typography.sizes.md,
  },
  memoButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  memoButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    backgroundColor: colors.backgroundCard,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  memoButtonText: {
    color: colors.text,
    fontSize: typography.sizes.sm,
  },
  memoPreview: {
    position: 'relative',
  },
  memoImage: {
    width: '100%',
    height: 200,
    borderRadius: borderRadius.md,
  },
  memoDocument: {
    alignItems: 'center',
    padding: spacing.lg,
  },
  memoName: {
    color: colors.text,
    fontSize: typography.sizes.sm,
    marginTop: spacing.sm,
  },
  memoSize: {
    color: colors.textMuted,
    fontSize: typography.sizes.xs,
    marginTop: spacing.xs,
  },
  removeMemoButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: borderRadius.full,
    padding: spacing.xs,
  },
  submitButton: {
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
  },
  bottomPadding: {
    height: 50,
  },
});
