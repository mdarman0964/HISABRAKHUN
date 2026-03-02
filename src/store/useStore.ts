import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Transaction, Category, MonthlySummary } from '../types';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../constants';
import { format, startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns';

interface AppState {
  // User
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;

  // Transactions
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  getTransactionById: (id: string) => Transaction | undefined;
  getTransactionsByMonth: (month: Date) => Transaction[];
  getTransactionsByDateRange: (start: Date, end: Date) => Transaction[];

  // Categories
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Summary
  getMonthlySummary: (month: Date) => MonthlySummary;
  getTotalBalance: () => number;
  getTotalIncome: () => number;
  getTotalExpense: () => number;

  // Backup
  lastBackupDate: string | null;
  setLastBackupDate: (date: string) => void;

  // Settings
  settings: {
    currency: string;
    language: string;
    darkMode: boolean;
    notifications: boolean;
    biometricAuth: boolean;
  };
  updateSettings: (settings: Partial<AppState['settings']>) => void;

  // Loading
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // User
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),

      // Transactions
      transactions: [],
      addTransaction: (transaction) => {
        const newTransaction: Transaction = {
          ...transaction,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({
          transactions: [newTransaction, ...state.transactions],
        }));
      },
      updateTransaction: (id, updates) => {
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updates, updatedAt: new Date() } : t
          ),
        }));
      },
      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
      },
      getTransactionById: (id) => {
        return get().transactions.find((t) => t.id === id);
      },
      getTransactionsByMonth: (month) => {
        const start = startOfMonth(month);
        const end = endOfMonth(month);
        return get().transactions.filter((t) =>
          isWithinInterval(parseISO(t.date.toString()), { start, end })
        );
      },
      getTransactionsByDateRange: (start, end) => {
        return get().transactions.filter((t) =>
          isWithinInterval(parseISO(t.date.toString()), { start, end })
        );
      },

      // Categories
      categories: [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES],
      addCategory: (category) => {
        const newCategory: Category = {
          ...category,
          id: Date.now().toString(),
        };
        set((state) => ({
          categories: [...state.categories, newCategory],
        }));
      },
      updateCategory: (id, updates) => {
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        }));
      },
      deleteCategory: (id) => {
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        }));
      },

      // Summary
      getMonthlySummary: (month) => {
        const transactions = get().getTransactionsByMonth(month);
        const income = transactions
          .filter((t) => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);
        const expense = transactions
          .filter((t) => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0);
        return {
          month: format(month, 'MMMM yyyy'),
          income,
          expense,
          balance: income - expense,
        };
      },
      getTotalBalance: () => {
        return get().transactions.reduce((sum, t) => {
          return t.type === 'income' ? sum + t.amount : sum - t.amount;
        }, 0);
      },
      getTotalIncome: () => {
        return get().transactions
          .filter((t) => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);
      },
      getTotalExpense: () => {
        return get().transactions
          .filter((t) => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0);
      },

      // Backup
      lastBackupDate: null,
      setLastBackupDate: (date) => set({ lastBackupDate: date }),

      // Settings
      settings: {
        currency: 'BDT',
        language: 'bn',
        darkMode: true,
        notifications: true,
        biometricAuth: false,
      },
      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },

      // Loading
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'hisab-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        transactions: state.transactions,
        categories: state.categories,
        lastBackupDate: state.lastBackupDate,
        settings: state.settings,
      }),
    }
  )
);
