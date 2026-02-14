import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
  { className, variant = 'primary', size = 'md', children, ...props },
  ref) =>
  {
    const variants = {
      primary:
      'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200',
      secondary:
      'bg-white text-gray-700 border-2 border-gray-100 hover:border-indigo-100 hover:bg-indigo-50',
      ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
      danger: 'bg-red-50 text-red-600 hover:bg-red-100'
    };
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-base',
      lg: 'px-8 py-3 text-lg'
    };
    return (
      <motion.button
        ref={ref}
        whileHover={{
          scale: 1.02
        }}
        whileTap={{
          scale: 0.98
        }}
        className={cn(
          'inline-flex items-center justify-center font-bold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}>

        {children}
      </motion.button>);

  }
);