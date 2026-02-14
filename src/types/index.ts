export type Category = 'Work' | 'Personal' | 'Urgent' | 'Other';

export interface Task {
  id: string;
  title: string;
  category: Category;
  completed: boolean;
  priority: 1 | 2 | 3; // 1 = Low, 3 = High
  dueDate: string; // ISO date string
  createdAt: number;
}

export interface User {
  name: string;
  email: string;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  Work: 'Travail',
  Personal: 'Personnel',
  Urgent: 'Urgent',
  Other: 'Autre'
};

export const CATEGORY_COLORS: Record<
  Category,
  {bg: string;text: string;border: string;ring: string;}> =
{
  Work: {
    bg: 'bg-indigo-100',
    text: 'text-indigo-700',
    border: 'border-indigo-200',
    ring: 'ring-indigo-500'
  },
  Personal: {
    bg: 'bg-pink-100',
    text: 'text-pink-700',
    border: 'border-pink-200',
    ring: 'ring-pink-500'
  },
  Urgent: {
    bg: 'bg-red-100',
    text: 'text-red-700',
    border: 'border-red-200',
    ring: 'ring-red-500'
  },
  Other: {
    bg: 'bg-teal-100',
    text: 'text-teal-700',
    border: 'border-teal-200',
    ring: 'ring-teal-500'
  }
};

export const CATEGORY_ACCENTS: Record<Category, string> = {
  Work: 'bg-indigo-500',
  Personal: 'bg-pink-500',
  Urgent: 'bg-red-500',
  Other: 'bg-teal-500'
};