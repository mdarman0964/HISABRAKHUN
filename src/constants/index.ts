import { Category } from '../types';

export const EXPENSE_CATEGORIES: Category[] = [
  { id: '1', name: 'খাবার (Food)', icon: 'restaurant', color: '#ef4444', type: 'expense' },
  { id: '2', name: 'যাতায়াত (Transport)', icon: 'car', color: '#f97316', type: 'expense' },
  { id: '3', name: 'শপিং (Shopping)', icon: 'shopping-cart', color: '#f59e0b', type: 'expense' },
  { id: '4', name: 'বিনোদন (Entertainment)', icon: 'film', color: '#84cc16', type: 'expense' },
  { id: '5', name: 'স্বাস্থ্য (Health)', icon: 'heart', color: '#22c55e', type: 'expense' },
  { id: '6', name: 'শিক্ষা (Education)', icon: 'book', color: '#10b981', type: 'expense' },
  { id: '7', name: 'বাড়ি ভাড়া (Rent)', icon: 'home', color: '#06b6d4', type: 'expense' },
  { id: '8', name: 'ইউটিলিটি (Bills)', icon: 'zap', color: '#3b82f6', type: 'expense' },
  { id: '9', name: 'অন্যান্য (Others)', icon: 'more-horizontal', color: '#6366f1', type: 'expense' },
];

export const INCOME_CATEGORIES: Category[] = [
  { id: '10', name: 'বেতন (Salary)', icon: 'briefcase', color: '#22c55e', type: 'income' },
  { id: '11', name: 'ব্যবসা (Business)', icon: 'trending-up', color: '#10b981', type: 'income' },
  { id: '12', name: 'বিনিয়োগ (Investment)', icon: 'pie-chart', color: '#06b6d4', type: 'income' },
  { id: '13', name: 'উপহার (Gift)', icon: 'gift', color: '#8b5cf6', type: 'income' },
  { id: '14', name: 'অন্যান্য (Others)', icon: 'more-horizontal', color: '#6366f1', type: 'income' },
];

export const GOOGLE_DRIVE_CONFIG = {
  SCOPES: [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.appdata',
  ],
  BACKUP_FOLDER_NAME: 'HisabApp_Backups',
  BACKUP_FILE_NAME: 'hisab_backup',
};

export const STORAGE_KEYS = {
  USER: '@hisab_user',
  TRANSACTIONS: '@hisab_transactions',
  CATEGORIES: '@hisab_categories',
  SETTINGS: '@hisab_settings',
  BACKUP_INFO: '@hisab_backup_info',
  AUTH_TOKEN: '@hisab_auth_token',
};

export const CURRENCY = {
  SYMBOL: '৳',
  CODE: 'BDT',
  NAME: 'Bangladeshi Taka',
};

export const DATE_FORMATS = {
  DISPLAY: 'dd MMM yyyy',
  DISPLAY_WITH_TIME: 'dd MMM yyyy, hh:mm a',
  API: 'yyyy-MM-dd',
  MONTH_YEAR: 'MMMM yyyy',
};

export const CHART_CONFIG = {
  backgroundGradientFrom: '#1a1a2e',
  backgroundGradientTo: '#1a1a2e',
  color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.7,
  useShadowColorFromDataset: false,
  decimalPlaces: 0,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: '#6366f1',
  },
};

export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  SPLASH: 2000,
};

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];
export const SUPPORTED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
