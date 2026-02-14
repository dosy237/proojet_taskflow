import React, { useMemo, useState } from 'react';
import {
  Search,
  Bell,
  Clock,
  Calendar,
  Star,
  CheckCircle2,
  AlertCircle } from
'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Task, CATEGORY_ACCENTS } from '../types';
import { getRelativeTime, cn } from '../lib/utils';
interface HeaderProps {
  user: User;
  tasks?: Task[];
}
type NotificationType = 'overdue' | 'today' | 'tomorrow' | 'high-priority';
interface Notification {
  id: string;
  type: NotificationType;
  task: Task;
  message: string;
}
export function Header({ user, tasks = [] }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const notifications = useMemo(() => {
    const notifs: Notification[] = [];
    const now = new Date();
    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime();
    const tomorrow = today + 86400000;
    tasks.forEach((task) => {
      if (task.completed) return;
      const dueDate = new Date(task.dueDate);
      const dueTime = new Date(
        dueDate.getFullYear(),
        dueDate.getMonth(),
        dueDate.getDate()
      ).getTime();
      if (dueTime < today) {
        notifs.push({
          id: `overdue-${task.id}`,
          type: 'overdue',
          task,
          message: 'En retard'
        });
      } else if (dueTime === today) {
        notifs.push({
          id: `today-${task.id}`,
          type: 'today',
          task,
          message: "Échéance aujourd'hui"
        });
      } else if (dueTime === tomorrow) {
        notifs.push({
          id: `tomorrow-${task.id}`,
          type: 'tomorrow',
          task,
          message: 'Échéance demain'
        });
      } else if (task.priority === 3) {
        notifs.push({
          id: `priority-${task.id}`,
          type: 'high-priority',
          task,
          message: 'Priorité haute'
        });
      }
    });
    // Sort by urgency: overdue > today > tomorrow > priority
    const priorityMap: Record<NotificationType, number> = {
      overdue: 0,
      today: 1,
      tomorrow: 2,
      'high-priority': 3
    };
    return notifs.sort((a, b) => priorityMap[a.type] - priorityMap[b.type]);
  }, [tasks]);
  const initials = user.name.
  split(' ').
  map((n) => n[0]).
  join('').
  toUpperCase().
  slice(0, 2);
  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'overdue':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'today':
        return <Clock className="w-4 h-4 text-amber-500" />;
      case 'tomorrow':
        return <Calendar className="w-4 h-4 text-blue-500" />;
      case 'high-priority':
        return <Star className="w-4 h-4 text-purple-500 fill-purple-500" />;
    }
  };
  return (
    <header className="h-20 px-8 flex items-center justify-between bg-white/50 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-20">
      <div className="w-96">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-gray-100 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm font-medium" />

        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">

            <Bell className="w-5 h-5" />
            {notifications.length > 0 &&
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            }
          </button>

          <AnimatePresence>
            {isOpen &&
            <>
                <div
                className="fixed inset-0 z-30"
                onClick={() => setIsOpen(false)} />

                <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                  scale: 0.95
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  scale: 0.95
                }}
                transition={{
                  duration: 0.2
                }}
                className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-40 overflow-hidden">

                  <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h3 className="font-bold text-gray-800">Notifications</h3>
                    {notifications.length > 0 &&
                  <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full">
                        {notifications.length}
                      </span>
                  }
                  </div>

                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ?
                  <div className="divide-y divide-gray-50">
                        {notifications.map((notif) =>
                    <div
                      key={notif.id}
                      className="p-4 hover:bg-gray-50 transition-colors flex gap-3 items-start group cursor-pointer">

                            <div className="mt-0.5 bg-white p-1.5 rounded-lg shadow-sm border border-gray-100 group-hover:border-gray-200 transition-colors">
                              {getIcon(notif.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-gray-800 truncate">
                                {notif.task.title}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs font-medium text-gray-500">
                                  {notif.message}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                <span
                            className={cn(
                              'w-2 h-2 rounded-full',
                              CATEGORY_ACCENTS[notif.task.category]
                            )} />

                              </div>
                            </div>
                          </div>
                    )}
                      </div> :

                  <div className="p-8 text-center flex flex-col items-center justify-center text-gray-400">
                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                          <CheckCircle2 className="w-6 h-6 text-gray-300" />
                        </div>
                        <p className="text-sm font-medium">
                          Aucune notification
                        </p>
                        <p className="text-xs mt-1">Vous êtes à jour !</p>
                      </div>
                  }
                  </div>
                </motion.div>
              </>
            }
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-800">{user.name}</p>
            <p className="text-xs text-gray-500">Membre Pro</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">
            {initials}
          </div>
        </div>
      </div>
    </header>);

}