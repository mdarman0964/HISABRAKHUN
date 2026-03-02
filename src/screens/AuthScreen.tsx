import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import Icon from 'react-native-vector-icons/Feather';
import { GradientButton } from '../components/GradientButton';
import { useAuth } from '../hooks/useAuth';
import { colors, spacing, borderRadius, typography } from '../theme';

export const AuthScreen: React.FC = () => {
  const { signInWithGoogle, isLoading } = useAuth();

  const handleGoogleSignIn = async () => {
    const result = await signInWithGoogle();
    if (!result.success) {
      Alert.alert('সাইন ইন ব্যর্থ', result.error || 'অনুগ্রহ করে আবার চেষ্টা করুন');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={colors.darkGradient}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <MotiView
            from={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 15 }}
            style={styles.logoContainer}
          >
            <View style={styles.logoWrapper}>
              <Icon name="pie-chart" size={64} color={colors.primary} />
            </View>
            <Text style={styles.title}>হিসাব</Text>
            <Text style={styles.subtitle}>আপনার ব্যক্তিগত হিসাব নিকাশ</Text>
          </MotiView>

          <MotiView
            from={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 15, delay: 200 }}
            style={styles.featuresContainer}
          >
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Icon name="shield" size={20} color={colors.success} />
              </View>
              <Text style={styles.featureText}>নিরাপদ ব্যাকআপ</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Icon name="cloud" size={20} color={colors.info} />
              </View>
              <Text style={styles.featureText}>গুগল ড্রাইভ সিঙ্ক</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Icon name="image" size={20} color={colors.secondary} />
              </View>
              <Text style={styles.featureText}>মেমো সংযুক্তি</Text>
            </View>
          </MotiView>

          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 15, delay: 400 }}
            style={styles.buttonContainer}
          >
            <GradientButton
              title="গুগল দিয়ে সাইন ইন করুন"
              onPress={handleGoogleSignIn}
              loading={isLoading}
              icon={<Icon name="chrome" size={20} color={colors.text} />}
              colors={['#4285F4', '#34A853']}
            />
          </MotiView>

          <Text style={styles.termsText}>
            সাইন ইন করার মাধ্যমে আপনি আমাদের শর্তাবলী মেনে নিচ্ছেন
          </Text>
        </View>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logoWrapper: {
    width: 120,
    height: 120,
    borderRadius: borderRadius.xxl,
    backgroundColor: colors.backgroundCard,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  title: {
    color: colors.text,
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.sizes.md,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
    marginBottom: spacing.xxl,
    flexWrap: 'wrap',
  },
  featureItem: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.backgroundCard,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.xs,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  termsText: {
    color: colors.textMuted,
    fontSize: typography.sizes.xs,
    textAlign: 'center',
  },
});
