import { useState, useEffect } from 'react';
import { Task, Category } from '../types';

const STORAGE_KEY = 'taskflow_tasks';

const INITIAL_TASKS: Task[] = [
{
  id: '1',
  title: 'Revue du design system',
  category: 'Work',
  completed: false,
  priority: 3,
  dueDate: new Date(Date.now() + 86400000).toISOString(),
  createdAt: Date.now()
},
{
  id: '2',
  title: 'Faire les courses pour le dîner',
  category: 'Personal',
  completed: false,
  priority: 2,
  dueDate: new Date(Date.now() + 172800000).toISOString(),
  createdAt: Date.now()
},
{
  id: '3',
  title: "Payer la facture d'électricité",
  category: 'Urgent',
  completed: false,
  priority: 3,
  dueDate: new Date().toISOString(),
  createdAt: Date.now()
}];


export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => {
    const newTask: Task = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
      completed: false
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
    prev.map((t) => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const getCompletionPercentage = () => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter((t) => t.completed).length;
    return Math.round(completed / tasks.length * 100);
  };

  return { tasks, addTask, toggleTask, deleteTask, getCompletionPercentage };
}