import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { AuthService } from '../services/auth';
import { User } from '../types';

export const useAuth = () => {
  const { user, isAuthenticated, setUser, logout } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const isSignedIn = await AuthService.isSignedIn();
      if (isSignedIn) {
        const currentUser = await AuthService.getCurrentUserInfo();
        if (currentUser) {
          setUser(currentUser);
        }
      }
    } catch (error) {
      console.error('Auth Check Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      const result = await AuthService.signInWithGoogle();
      if (result) {
        setUser(result.user);
        return { success: true };
      }
      return { success: false, error: 'Sign in failed' };
    } catch (error: any) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await AuthService.signOut();
      logout();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    signInWithGoogle,
    signOut,
  };
};
