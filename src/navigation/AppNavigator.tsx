import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import { View, StyleSheet } from 'react-native';
import { MotiView } from 'moti';

import { AuthScreen } from '../screens/AuthScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { AddTransactionScreen } from '../screens/AddTransactionScreen';
import { BackupRestoreScreen } from '../screens/BackupRestoreScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { useStore } from '../store/useStore';
import { colors, spacing, borderRadius } from '../theme';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Placeholder screens for tabs
const TransactionsScreen: React.FC = () => (
  <View style={{ flex: 1, backgroundColor: colors.background }} />
);

const StatisticsScreen: React.FC = () => (
  <View style={{ flex: 1, backgroundColor: colors.background }} />
);

const TabBarIcon: React.FC<{ name: string; focused: boolean }> = ({
  name,
  focused,
}) => (
  <MotiView
    animate={{
      scale: focused ? 1.1 : 1,
    }}
    transition={{ type: 'spring', damping: 15 }}
  >
    <View
      style={[
        styles.iconContainer,
        focused && styles.iconContainerFocused,
      ]}
    >
      <Icon
        name={name}
        size={22}
        color={focused ? colors.primary : colors.textMuted}
      />
    </View>
  </MotiView>
);

const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="home" focused={focused} />
          ),
          tabBarLabel: 'হোম',
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="list" focused={focused} />
          ),
          tabBarLabel: 'লেনদেন',
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddTransactionScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MotiView
              animate={{ scale: focused ? 1.1 : 1 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <View style={styles.addButton}>
                <Icon name="plus" size={28} color={colors.text} />
              </View>
            </MotiView>
          ),
          tabBarLabel: '',
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('AddTransaction');
          },
        })}
      />
      <Tab.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="pie-chart" focused={focused} />
          ),
          tabBarLabel: 'পরিসংখ্যান',
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="user" focused={focused} />
          ),
          tabBarLabel: 'প্রোফাইল',
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  const { isAuthenticated } = useStore();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: colors.background },
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthScreen} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen
              name="AddTransaction"
              component={AddTransactionScreen}
              options={{
                presentation: 'modal',
                animationEnabled: true,
              }}
            />
            <Stack.Screen
              name="BackupRestore"
              component={BackupRestoreScreen}
            />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.backgroundLight,
    borderTopWidth: 0,
    elevation: 0,
    height: 70,
    paddingBottom: spacing.sm,
    paddingTop: spacing.sm,
  },
  tabBarLabel: {
    fontSize: 11,
    marginTop: 4,
  },
  iconContainer: {
    padding: spacing.xs,
    borderRadius: borderRadius.md,
  },
  iconContainerFocused: {
    backgroundColor: `${colors.primary}20`,
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
});
