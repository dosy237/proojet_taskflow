import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
export function EmptyState() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.9
      }}
      animate={{
        opacity: 1,
        scale: 1
      }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center">

      <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
        <Sparkles className="w-10 h-10 text-indigo-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        Tout est à jour !
      </h3>
      <p className="text-gray-500 max-w-xs mx-auto">
        Vous avez terminé toutes vos tâches pour cette catégorie. Profitez-en
        pour vous détendre ou commencer quelque chose de nouveau.
      </p>
    </motion.div>);

}