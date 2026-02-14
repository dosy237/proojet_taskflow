import { User } from '../types';

const USERS_STORAGE_KEY = 'taskflow_users';

interface StoredUser {
  name: string;
  email: string;
  password: string;
}

function getStoredUsers(): StoredUser[] {
  const data = localStorage.getItem(USERS_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveStoredUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

export function registerUser(
name: string,
email: string,
password: string)
: AuthResult {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim().toLowerCase();

  if (!trimmedName) {
    return { success: false, error: 'Veuillez entrer votre nom complet.' };
  }
  if (!trimmedEmail) {
    return { success: false, error: 'Veuillez entrer votre adresse e-mail.' };
  }
  if (password.length < 6) {
    return {
      success: false,
      error: 'Le mot de passe doit contenir au moins 6 caractères.'
    };
  }

  const users = getStoredUsers();
  const existingUser = users.find((u) => u.email === trimmedEmail);

  if (existingUser) {
    return {
      success: false,
      error: 'Un compte avec cet e-mail existe déjà. Veuillez vous connecter.'
    };
  }

  const newUser: StoredUser = {
    name: trimmedName,
    email: trimmedEmail,
    password
  };

  users.push(newUser);
  saveStoredUsers(users);

  return {
    success: true,
    user: { name: trimmedName, email: trimmedEmail }
  };
}

export function loginUser(email: string, password: string): AuthResult {
  const trimmedEmail = email.trim().toLowerCase();

  if (!trimmedEmail) {
    return { success: false, error: 'Veuillez entrer votre adresse e-mail.' };
  }
  if (!password) {
    return { success: false, error: 'Veuillez entrer votre mot de passe.' };
  }

  const users = getStoredUsers();
  const user = users.find((u) => u.email === trimmedEmail);

  if (!user) {
    return {
      success: false,
      error:
      "Aucun compte trouvé avec cet e-mail. Veuillez vous inscrire d'abord."
    };
  }

  if (user.password !== password) {
    return {
      success: false,
      error: 'Mot de passe incorrect. Veuillez réessayer.'
    };
  }

  return {
    success: true,
    user: { name: user.name, email: user.email }
  };
}