import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import Icon from 'react-native-vector-icons/Feather';
import { GlassCard } from '../components/GlassCard';
import { useAuth } from '../hooks/useAuth';
import { useStore } from '../store/useStore';
import { colors, spacing, borderRadius, typography } from '../theme';
import { getInitials } from '../utils/formatters';

interface ProfileScreenProps {
  navigation: any;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { user, signOut } = useAuth();
  const { settings, updateSettings, transactions } = useStore();

  const handleSignOut = () => {
    Alert.alert(
      'সাইন আউট',
      'আপনি কি নিশ্চিতভাবে সাইন আউট করতে চান?',
      [
        { text: 'বাতিল', style: 'cancel' },
        {
          text: 'সাইন আউট',
          style: 'destructive',
          onPress: async () => {
            const result = await signOut();
            if (!result.success) {
              Alert.alert('ত্রুটি', result.error);
            }
          },
        },
      ]
    );
  };

  const menuItems = [
    {
      icon: 'settings',
      title: 'সেটিংস',
      subtitle: 'অ্যাপ সেটিংস পরিবর্তন করুন',
      onPress: () => navigation.navigate('Settings'),
      color: colors.primary,
    },
    {
      icon: 'cloud',
      title: 'ব্যাকআপ ও পুনরুদ্ধার',
      subtitle: 'গুগল ড্রাইভে ব্যাকআপ করুন',
      onPress: () => navigation.navigate('BackupRestore'),
      color: colors.info,
    },
    {
      icon: 'grid',
      title: 'ক্যাটাগরি পরিচালনা',
      subtitle: 'কাস্টম ক্যাটাগরি যোগ করুন',
      onPress: () => navigation.navigate('CategoryManager'),
      color: colors.secondary,
    },
    {
      icon: 'help-circle',
      title: 'সাহায্য ও সমর্থন',
      subtitle: 'সাহায্য পান এবং ফিডব্যাক দিন',
      onPress: () => {},
      color: colors.warning,
    },
    {
      icon: 'info',
      title: 'অ্যাপ সম্পর্কে',
      subtitle: 'ভার্সন ১.০.০',
      onPress: () => {},
      color: colors.success,
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={colors.darkGradient} style={styles.gradient}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>প্রোফাইল</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Icon name="settings" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Profile Card */}
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 15 }}
          >
            <LinearGradient
              colors={colors.primaryGradient}
              style={styles.profileCard}
            >
              <View style={styles.avatarContainer}>
                {user?.photoUrl ? (
                  <Image
                    source={{ uri: user.photoUrl }}
                    style={styles.avatar}
                  />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>
                      {getInitials(user?.name || 'U')}
                    </Text>
                  </View>
                )}
              </View>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
              
              <View style={styles.statsRow}>
                <View style={styles.stat}>
                  <Text style={styles.statNumber}>{transactions.length}</Text>
                  <Text style={styles.statLabel}>লেনদেন</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.stat}>
                  <Text style={styles.statNumber}>
                    {new Date().getFullYear()}
                  </Text>
                  <Text style={styles.statLabel}>যোগদান</Text>
                </View>
              </View>
            </LinearGradient>
          </MotiView>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <MotiView
                key={item.title}
                from={{ opacity: 0, translateX: -20 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ delay: index * 100 }}
              >
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={item.onPress}
                >
                  <View
                    style={[
                      styles.menuIcon,
                      { backgroundColor: `${item.color}20` },
                    ]}
                  >
                    <Icon name={item.icon} size={20} color={item.color} />
                  </View>
                  <View style={styles.menuContent}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                  </View>
                  <Icon
                    name="chevron-right"
                    size={20}
                    color={colors.textMuted}
                  />
                </TouchableOpacity>
              </MotiView>
            ))}
          </View>

          {/* Sign Out Button */}
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleSignOut}
          >
            <LinearGradient
              colors={['rgba(239,68,68,0.2)', 'rgba(239,68,68,0.1)']}
              style={styles.signOutGradient}
            >
              <Icon name="log-out" size={20} color={colors.error} />
              <Text style={styles.signOutText}>সাইন আউট</Text>
            </LinearGradient>
          </TouchableOpacity>

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
  profileCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarText: {
    color: colors.text,
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
  },
  userName: {
    color: colors.text,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xs,
  },
  userEmail: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: typography.sizes.sm,
    marginBottom: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    color: colors.text,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: typography.sizes.xs,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  menuContainer: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  menuTitle: {
    color: colors.text,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
  },
  menuSubtitle: {
    color: colors.textMuted,
    fontSize: typography.sizes.xs,
    marginTop: 2,
  },
  signOutButton: {
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  signOutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.md,
  },
  signOutText: {
    color: colors.error,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  bottomPadding: {
    height: 50,
  },
});
