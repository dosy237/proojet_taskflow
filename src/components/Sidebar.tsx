import React from 'react';
import { LayoutGrid, Calendar, Star, LogOut } from 'lucide-react';
import { Category } from '../types';
import { CategoryPill } from './CategoryPill';
import { ProgressRing } from './ProgressRing';
interface SidebarProps {
  selectedCategory: Category | 'All';
  onSelectCategory: (category: Category | 'All') => void;
  completionPercentage: number;
  onLogout: () => void;
}
export function Sidebar({
  selectedCategory,
  onSelectCategory,
  completionPercentage,
  onLogout
}: SidebarProps) {
  const navItems = [
  {
    icon: LayoutGrid,
    label: 'Toutes',
    value: 'All'
  },
  {
    icon: Star,
    label: 'Important',
    value: 'Urgent'
  },
  {
    icon: Calendar,
    label: 'Planifié',
    value: 'Work'
  }];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-full hidden md:flex">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <span className="text-xl font-extrabold text-gray-800 tracking-tight">
            TaskFlow
          </span>
        </div>

        <nav className="space-y-1 mb-8">
          {navItems.map((item) =>
          <button
            key={item.label}
            onClick={() => onSelectCategory(item.value as any)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${selectedCategory === item.value ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>

              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          )}
        </nav>

        <div className="mb-8">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-4">
            Catégories
          </h3>
          <div className="space-y-2 px-2">
            {(['Work', 'Personal', 'Other'] as Category[]).map((cat) =>
            <div
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className="cursor-pointer">

                <CategoryPill
                category={cat}
                selected={selectedCategory === cat} />

              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-auto p-6 border-t border-gray-100">
        <div className="flex flex-col items-center mb-6">
          <ProgressRing
            percentage={completionPercentage}
            size={100}
            strokeWidth={8} />

          <p className="text-sm font-semibold text-gray-500 mt-2">
            Objectif du jour
          </p>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all font-semibold">

          <LogOut className="w-5 h-5" />
          Déconnexion
        </button>
      </div>
    </aside>);

}