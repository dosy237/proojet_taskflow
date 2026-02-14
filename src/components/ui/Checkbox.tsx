import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Category, CATEGORY_ACCENTS } from '../../types';
interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  category?: Category;
}
export function Checkbox({
  checked,
  onChange,
  category = 'Work'
}: CheckboxProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
      className={cn(
        'relative flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
        checked ?
        `border-transparent ${CATEGORY_ACCENTS[category]}` :
        'border-gray-300 bg-white hover:border-gray-400'
      )}>

      <motion.div
        initial={false}
        animate={{
          scale: checked ? 1 : 0
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25
        }}>

        <Check className="h-3.5 w-3.5 text-white font-bold" strokeWidth={4} />
      </motion.div>
    </button>);

}