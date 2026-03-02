import React, { useEffect, useState } from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import * as SplashScreen from 'expo-splash-screen';
import { MotiView } from 'moti';

import { AppNavigator } from './src/navigation/AppNavigator';
import { colors } from './src/theme';
import { useStore } from './src/store/useStore';
import { AuthService } from './src/services/auth';

// Keep splash screen visible while loading
SplashScreen.preventAutoHideAsync();

const LoadingScreen: React.FC = () => (
  <View style={styles.loadingContainer}>
    <MotiView
      from={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 15, loop: true }}
    >
      <View style={styles.loadingLogo}>
        <View style={styles.loadingInner} />
      </View>
    </MotiView>
  </View>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { setUser } = useStore();

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Check if user is already signed in
      const isSignedIn = await AuthService.isSignedIn();
      if (isSignedIn) {
        const user = await AuthService.getCurrentUserInfo();
        if (user) {
          setUser(user);
        }
      }
    } catch (error) {
      console.error('App Initialization Error:', error);
    } finally {
      setIsLoading(false);
      await SplashScreen.hideAsync();
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <AppNavigator />
      <Toast />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingLogo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingInner: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.text,
  },
});
