import { format, parseISO } from 'date-fns';
import { bn } from 'date-fns/locale';
import { CURRENCY } from '../constants';

export const formatCurrency = (amount: number, showSymbol = true): string => {
  const formatted = new Intl.NumberFormat('bn-BD', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount));

  if (showSymbol) {
    return `${CURRENCY.SYMBOL} ${formatted}`;
  }
  return formatted;
};

export const formatDate = (date: Date | string, formatStr = 'dd MMM yyyy'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr, { locale: bn });
};

export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'dd MMM yyyy, hh:mm a', { locale: bn });
};

export const formatMonthYear = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMMM yyyy', { locale: bn });
};

export const formatRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - dateObj.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'আজ';
  if (diffInDays === 1) return 'গতকাল';
  if (diffInDays < 7) return `${diffInDays} দিন আগে`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} সপ্তাহ আগে`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} মাস আগে`;
  return `${Math.floor(diffInDays / 365)} বছর আগে`;
};

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'সুপ্রভাত';
  if (hour < 17) return 'শুভ অপরাহ্ণ';
  return 'শুভ সন্ধ্যা';
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const groupByDate = <T extends { date: Date | string }>(
  items: T[]
): { [key: string]: T[] } => {
  return items.reduce((acc, item) => {
    const dateKey = format(new Date(item.date), 'yyyy-MM-dd');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(item);
    return acc;
  }, {} as { [key: string]: T[] });
};

export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};
