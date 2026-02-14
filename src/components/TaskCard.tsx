import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Trash2 } from 'lucide-react';
import { Task, CATEGORY_ACCENTS, CATEGORY_LABELS } from '../types';
import { Checkbox } from './ui/Checkbox';
import { PriorityStars } from './PriorityStars';
import { getRelativeTime, cn } from '../lib/utils';
interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}
export function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      exit={{
        opacity: 0,
        scale: 0.95
      }}
      whileHover={{
        y: -2
      }}
      className={cn(
        'group relative bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden',
        task.completed && 'opacity-60 bg-gray-50'
      )}>

      {/* Left Accent */}
      <div
        className={cn(
          'absolute left-0 top-0 bottom-0 w-1.5',
          CATEGORY_ACCENTS[task.category]
        )} />


      <div className="flex items-start gap-4 pl-2">
        <div className="pt-1">
          <Checkbox
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            category={task.category} />

        </div>

        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              'text-lg font-bold text-gray-800 mb-1 truncate transition-all',
              task.completed && 'line-through text-gray-400'
            )}>

            {task.title}
          </h3>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span
                className={cn(
                  getRelativeTime(task.dueDate) === 'En retard' &&
                  !task.completed ?
                  'text-red-500 font-bold' :
                  ''
                )}>

                {getRelativeTime(task.dueDate)}
              </span>
            </div>
            <PriorityStars priority={task.priority} readOnly />
            <span className="px-2 py-0.5 rounded-md bg-gray-100 text-xs font-semibold">
              {CATEGORY_LABELS[task.category]}
            </span>
          </div>
        </div>

        <button
          onClick={() => onDelete(task.id)}
          className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">

          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>);

}