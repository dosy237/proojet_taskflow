import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../lib/utils';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? showPassword ? 'text' : 'password' : type;
    return (
      <div className="w-full">
        {label &&
        <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">
            {label}
          </label>
        }
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            className={cn(
              'w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 outline-none',
              isPassword && 'pr-12',
              error &&
              'border-red-300 focus:border-red-500 focus:ring-red-500/10',
              className
            )}
            {...props} />

          {isPassword &&
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-md"
            tabIndex={-1}
            aria-label={
            showPassword ?
            'Masquer le mot de passe' :
            'Afficher le mot de passe'
            }>

              {showPassword ?
            <EyeOff className="w-4.5 h-4.5" /> :

            <Eye className="w-4.5 h-4.5" />
            }
            </button>
          }
        </div>
        {error && <p className="mt-1 text-sm text-red-500 ml-1">{error}</p>}
      </div>);

  }
);