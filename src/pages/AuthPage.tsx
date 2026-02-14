import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { User } from '../types';
import { registerUser, loginUser } from '../lib/auth';
interface AuthPageProps {
  onLogin: (user: User) => void;
}
export function AuthPage({ onLogin }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    // Simulate a small delay for realism
    setTimeout(() => {
      if (isLogin) {
        const result = loginUser(email, password);
        if (result.success && result.user) {
          onLogin(result.user);
        } else {
          setError(result.error || 'Erreur de connexion.');
        }
      } else {
        const result = registerUser(name, email, password);
        if (result.success && result.user) {
          onLogin(result.user);
        } else {
          setError(result.error || "Erreur lors de l'inscription.");
        }
      }
      setIsLoading(false);
    }, 400);
  };
  const switchMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setName('');
    setEmail('');
    setPassword('');
  };
  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex w-1/2 bg-indigo-600 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}>
        </div>

        <div className="relative z-10 max-w-lg text-white">
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.2
            }}>

            <h1 className="text-5xl font-extrabold mb-6 leading-tight">
              Organisez votre travail et votre vie, enfin.
            </h1>
            <p className="text-xl text-indigo-100 mb-8">
              Soyez concentré, organisé et calme avec TaskFlow. L'application de
              gestion de tâches n°1 au monde.
            </p>

            <div className="space-y-4">
              {[
              'Atteignez la clarté mentale que vous attendiez.',
              'Vos tâches, organisées en quelques secondes.',
              'Collaborez avec votre équipe sans effort.'].
              map((item, i) =>
              <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                  <span className="font-medium">{item}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-6 mx-auto lg:mx-0">
              <span className="text-white font-bold text-2xl">T</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Bon retour !' : 'Créer un compte'}
            </h2>
            <p className="text-gray-500">
              {isLogin ?
              'Veuillez entrer vos coordonnées.' :
              'Commencez votre essai gratuit de 30 jours.'}
            </p>
          </div>

          {error &&
          <motion.div
            initial={{
              opacity: 0,
              y: -10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="mb-5 flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">

              <AlertCircle className="w-5 h-5 shrink-0" />
              {error}
            </motion.div>
          }

          <form className="space-y-5" onSubmit={handleSubmit}>
            {!isLogin &&
            <Input
              label="Nom complet"
              placeholder="Synthia Donfack"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required />

            }
            <Input
              label="Email"
              type="email"
              placeholder="synthia@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />

            <Input
              label="Mot de passe"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />


            <Button className="w-full" size="lg" disabled={isLoading}>
              {isLoading ?
              'Chargement...' :
              isLogin ?
              'Se connecter' :
              'Commencer'}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {isLogin ?
              "Vous n'avez pas de compte ? " :
              'Vous avez déjà un compte ? '}
              <button
                onClick={switchMode}
                className="font-bold text-indigo-600 hover:text-indigo-700">

                {isLogin ? "S'inscrire" : 'Se connecter'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>);

}