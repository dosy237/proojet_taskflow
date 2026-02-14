import React, { useState } from 'react';
import { Modal } from './ui/Modal';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { PriorityStars } from './PriorityStars';
import { CategoryPill } from './CategoryPill';
import { Task, Category } from '../types';
interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => void;
}
export function CreateTaskModal({
  isOpen,
  onClose,
  onSubmit
}: CreateTaskModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('Work');
  const [priority, setPriority] = useState<1 | 2 | 3>(1);
  const [dueDate, setDueDate] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    onSubmit({
      title,
      category,
      priority,
      dueDate: dueDate || new Date().toISOString()
    });
    // Reset
    setTitle('');
    setCategory('Work');
    setPriority(1);
    setDueDate('');
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nouvelle Tâche ✨">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Que faut-il faire ?"
          placeholder="ex: Terminer le rapport trimestriel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus />


        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700 ml-1">
            Catégorie
          </label>
          <div className="flex flex-wrap gap-2">
            {(['Work', 'Personal', 'Urgent', 'Other'] as Category[]).map(
              (c) =>
              <CategoryPill
                key={c}
                category={c}
                selected={category === c}
                onClick={() => setCategory(c)} />


            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700 ml-1">
              Priorité
            </label>
            <div className="p-3 border-2 border-gray-100 rounded-xl bg-gray-50 flex items-center justify-center">
              <PriorityStars priority={priority} onChange={setPriority} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700 ml-1">
              Échéance
            </label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="py-2.5" />

          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit">Créer</Button>
        </div>
      </form>
    </Modal>);

}