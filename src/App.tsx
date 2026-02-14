import React, { useState } from 'react';
import { AuthPage } from './pages/AuthPage';
import { Dashboard } from './pages/Dashboard';
import { User } from './types';
export function App() {
  const [user, setUser] = useState<User | null>(null);
  if (!user) {
    return <AuthPage onLogin={(userData) => setUser(userData)} />;
  }
  return <Dashboard user={user} onLogout={() => setUser(null)} />;
}