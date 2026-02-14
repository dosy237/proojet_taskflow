import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../lib/utils';
interface PriorityStarsProps {
  priority: 1 | 2 | 3;
  onChange?: (priority: 1 | 2 | 3) => void;
  readOnly?: boolean;
}
export function PriorityStars({
  priority,
  onChange,
  readOnly = false
}: PriorityStarsProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3].map((level) =>
      <button
        key={level}
        type="button"
        disabled={readOnly}
        onClick={() => onChange?.(level as 1 | 2 | 3)}
        className={cn(
          'transition-all',
          readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
        )}>

          <Star
          className={cn(
            'w-4 h-4',
            level <= priority ?
            'fill-amber-400 text-amber-400' :
            'fill-gray-200 text-gray-200'
          )} />

        </button>
      )}
    </div>);

}