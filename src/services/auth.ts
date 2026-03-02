import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import * as SecureStore from 'expo-secure-store';
import { User } from '../types';
import { STORAGE_KEYS } from '../constants';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
  iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
  offlineAccess: true,
  scopes: [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.appdata',
  ],
});

export class AuthService {
  static async signInWithGoogle(): Promise<{ user: User; accessToken: string } | null> {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const response = await GoogleSignin.signIn();
      
      if (response.data) {
        const { user } = response.data;
        const tokens = await GoogleSignin.getTokens();
        
        const appUser: User = {
          id: user.id,
          email: user.email,
          name: user.name || user.email,
          photoUrl: user.photo || undefined,
          provider: 'google',
        };

        // Store auth token securely
        await SecureStore.setItemAsync(STORAGE_KEYS.AUTH_TOKEN, tokens.accessToken);
        await SecureStore.setItemAsync(STORAGE_KEYS.USER, JSON.stringify(appUser));

        return {
          user: appUser,
          accessToken: tokens.accessToken,
        };
      }
      return null;
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        throw new Error('Sign in cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        throw new Error('Sign in already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        throw new Error('Play services not available');
      } else {
        throw new Error('Sign in failed: ' + error.message);
      }
    }
  }

  static async signOut(): Promise<void> {
    try {
      await GoogleSignin.signOut();
      await SecureStore.deleteItemAsync(STORAGE_KEYS.AUTH_TOKEN);
      await SecureStore.deleteItemAsync(STORAGE_KEYS.USER);
    } catch (error) {
      console.error('Sign Out Error:', error);
      throw error;
    }
  }

  static async getCurrentUser(): Promise<User | null> {
    try {
      const userJson = await SecureStore.getItemAsync(STORAGE_KEYS.USER);
      if (userJson) {
        return JSON.parse(userJson);
      }
      return null;
    } catch (error) {
      console.error('Get Current User Error:', error);
      return null;
    }
  }

  static async getAccessToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Get Access Token Error:', error);
      return null;
    }
  }

  static async refreshToken(): Promise<string | null> {
    try {
      const tokens = await GoogleSignin.getTokens();
      await SecureStore.setItemAsync(STORAGE_KEYS.AUTH_TOKEN, tokens.accessToken);
      return tokens.accessToken;
    } catch (error) {
      console.error('Refresh Token Error:', error);
      return null;
    }
  }

  static async isSignedIn(): Promise<boolean> {
    try {
      return await GoogleSignin.isSignedIn();
    } catch (error) {
      console.error('Is Signed In Error:', error);
      return false;
    }
  }

  static async getCurrentUserInfo(): Promise<User | null> {
    try {
      const currentUser = await GoogleSignin.getCurrentUser();
      if (currentUser) {
        return {
          id: currentUser.user.id,
          email: currentUser.user.email,
          name: currentUser.user.name || currentUser.user.email,
          photoUrl: currentUser.user.photo || undefined,
          provider: 'google',
        };
      }
      return null;
    } catch (error) {
      console.error('Get Current User Info Error:', error);
      return null;
    }
  }
}
