import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTasks } from '../hooks/useTasks';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { TaskCard } from '../components/TaskCard';
import { CreateTaskModal } from '../components/CreateTaskModal';
import { EmptyState } from '../components/EmptyState';
import { Button } from '../components/ui/Button';
import { Category, User, CATEGORY_LABELS } from '../types';
interface DashboardProps {
  user: User;
  onLogout: () => void;
}
export function Dashboard({ user, onLogout }: DashboardProps) {
  const { tasks, addTask, toggleTask, deleteTask, getCompletionPercentage } =
  useTasks();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>(
    'All'
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filteredTasks = tasks.filter(
    (t) => selectedCategory === 'All' || t.category === selectedCategory
  );
  const handleToggle = (id: string) => {
    toggleTask(id);
    // Check if all tasks for today are done (simplified logic for demo)
    const task = tasks.find((t) => t.id === id);
    if (task && !task.completed) {
      // Just completed
      const remaining = tasks.filter((t) => !t.completed && t.id !== id).length;
      if (remaining === 0) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: {
            y: 0.6
          },
          colors: ['#6366F1', '#EC4899', '#14B8A6']
        });
      }
    }
  };
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        completionPercentage={getCompletionPercentage()}
        onLogout={onLogout} />


      <div className="flex-1 flex flex-col min-w-0">
        <Header user={user} tasks={tasks} />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-1">
                  {selectedCategory === 'All' ?
                  'Mes Tâches' :
                  `Tâches ${CATEGORY_LABELS[selectedCategory]}`}
                </h1>
                <p className="text-gray-500">
                  Vous avez {filteredTasks.filter((t) => !t.completed).length}{' '}
                  tâches en attente
                </p>
              </div>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="gap-2 pl-4">

                <Plus className="w-5 h-5" />
                Nouvelle Tâche
              </Button>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredTasks.length > 0 ?
                filteredTasks.map((task) =>
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={handleToggle}
                  onDelete={deleteTask} />

                ) :

                <EmptyState />
                }
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addTask} />

    </div>);

}