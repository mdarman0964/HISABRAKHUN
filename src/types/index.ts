export interface User {
  id: string;
  email: string;
  name: string;
  photoUrl?: string;
  provider: 'google' | 'apple';
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: Date;
  memoUrl?: string;
  memoType?: 'image' | 'document';
  memoName?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: 'income' | 'expense';
}

export interface BackupData {
  transactions: Transaction[];
  categories: Category[];
  backupDate: string;
  userId: string;
  version: string;
}

export interface MonthlySummary {
  month: string;
  income: number;
  expense: number;
  balance: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    color?: (opacity: number) => string;
  }[];
}

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  AddTransaction: { transaction?: Transaction };
  TransactionDetail: { transaction: Transaction };
  BackupRestore: undefined;
  Settings: undefined;
  Profile: undefined;
  CategoryManager: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Transactions: undefined;
  Statistics: undefined;
  Profile: undefined;
};
