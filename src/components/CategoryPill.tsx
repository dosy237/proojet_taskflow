import React from 'react';
import { Category, CATEGORY_COLORS, CATEGORY_LABELS } from '../types';
import { cn } from '../lib/utils';
interface CategoryPillProps {
  category: Category;
  selected?: boolean;
  onClick?: () => void;
}
export function CategoryPill({
  category,
  selected,
  onClick
}: CategoryPillProps) {
  const colors = CATEGORY_COLORS[category];
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-4 py-1.5 rounded-full text-sm font-bold transition-all border-2',
        selected ?
        `${colors.bg} ${colors.text} ${colors.border}` :
        'bg-white text-gray-600 border-gray-100 hover:border-gray-200',
        onClick && 'cursor-pointer hover:scale-105 active:scale-95'
      )}>

      {CATEGORY_LABELS[category]}
    </button>);

}