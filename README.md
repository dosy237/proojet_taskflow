#  TaskFlow — Application de Gestion de Tâches

**Auteur :** DONFACK SYNTHIA CALORINE  
**Version :** 1.0.0  
**Technologie :** React 18 + TypeScript + Tailwind CSS + Node.js + Express

---

##  Description

TaskFlow est une application web fullstack de gestion de tâches permettant aux utilisateurs de créer, organiser et suivre leurs tâches quotidiennes. L'application repose sur une architecture client-serveur : un frontend React moderne et un backend Node.js/Express gérant l'authentification, la persistance des données et la sécurité.

---

##  Architecture

```
Frontend (React + TypeScript)  ←→  Backend (Node.js + Express)  ←→  Base de données
```

---

##  Fonctionnalités

###  Authentification
- Inscription avec nom, email et mot de passe
- Connexion avec vérification des identifiants via l'API
- Authentification sécurisée avec JWT (JSON Web Token)
- Hachage des mots de passe avec bcrypt
- Redirection automatique si non authentifié
- Messages d'erreur en français

###  Gestion des Tâches
- Afficher la liste de toutes les tâches
- Créer une nouvelle tâche (titre, catégorie, priorité, date limite)
- Supprimer une tâche
- Marquer une tâche comme terminée (avec animation)
- Animation confetti quand toutes les tâches sont terminées

###  Filtres et Organisation
- Filtrer par statut : Toutes, Actives, Terminées
- Filtrer par catégorie : Travail, Personnel, Urgent, Autre
- Filtrer par priorité : Haute, Moyenne, Basse
- Navigation par sidebar avec catégories colorées

###  Notifications
- Panneau de notifications fonctionnel
- Rappels automatiques basés sur les tâches :
  - Tâches en retard
  - Tâches dues aujourd'hui
  - Tâches dues demain
  - Tâches haute priorité
- Badge de compteur sur l'icône cloche

###  Interface Utilisateur
- Design responsive (mobile, tablette, desktop)
- 10+ composants réutilisables
- Feedback visuel (loading, erreurs, succès)
- Animations fluides avec Framer Motion
- Thème vibrant et coloré

---

##  Installation

### Prérequis
- Node.js 18+
- npm ou yarn
- Une base de données (MongoDB ou PostgreSQL)

### Étapes

```bash
# 1. Cloner le repository
git clone https://github.com/dosy237/proojet_taskflow.git
cd proojet_taskflow
```

#### Lancer le Backend

```bash
cd backend

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Renseigner PORT, DATABASE_URL, JWT_SECRET dans le fichier .env

# Lancer le serveur
npm run dev
# Le serveur tourne sur http://localhost:5000
```

#### Lancer le Frontend

```bash
cd frontend

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
# http://localhost:3000
```

---

##  Structure du Projet

```
proojet_taskflow/
│
├── backend/                          # Serveur Node.js + Express
│   ├── server.js                     # Point d'entrée du serveur
│   ├── .env                          # Variables d'environnement
│   ├── routes/
│   │   ├── auth.routes.js            # Routes authentification
│   │   └── tasks.routes.js           # Routes tâches
│   ├── controllers/
│   │   ├── auth.controller.js        # Logique inscription/connexion
│   │   └── tasks.controller.js       # Logique CRUD tâches
│   ├── models/
│   │   ├── user.model.js             # Modèle utilisateur
│   │   └── task.model.js             # Modèle tâche
│   ├── middleware/
│   │   └── auth.middleware.js        # Vérification JWT
│   └── config/
│       └── db.js                     # Connexion base de données
│
└── frontend/                         # Client React + TypeScript
    ├── index.tsx                     # Point d'entrée
    ├── index.css                     # Styles globaux + Tailwind
    ├── App.tsx                       # Composant racine + routage
    ├── tailwind.config.js            # Configuration Tailwind
    │
    ├── types/
    │   └── index.ts                  # Types TypeScript (Task, User)
    │
    ├── lib/
    │   ├── utils.ts                  # Utilitaires
    │   └── api.ts                    # Appels API vers le backend
    │
    ├── hooks/
    │   └── useTasks.ts               # Hook personnalisé tâches
    │
    ├── components/
    │   ├── ui/
    │   │   ├── Button.tsx
    │   │   ├── Input.tsx
    │   │   ├── Checkbox.tsx
    │   │   └── Modal.tsx
    │   ├── Header.tsx
    │   ├── Sidebar.tsx
    │   ├── TaskCard.tsx
    │   ├── CreateTaskModal.tsx
    │   ├── CategoryPill.tsx
    │   ├── PriorityStars.tsx
    │   ├── ProgressRing.tsx
    │   └── EmptyState.tsx
    │
    └── pages/
        ├── AuthPage.tsx
        └── Dashboard.tsx
```

---

##  API Backend (Node.js + Express)

### Authentification

| Méthode | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Inscription |
| POST | `/api/auth/login` | Connexion |

### Tâches (protégées par JWT)

| Méthode | Route | Description |
|--------|-------|-------------|
| GET | `/api/tasks` | Récupérer toutes les tâches |
| POST | `/api/tasks` | Créer une tâche |
| PUT | `/api/tasks/:id` | Modifier une tâche |
| DELETE | `/api/tasks/:id` | Supprimer une tâche |

---

##  Composants Réutilisables

| Composant | Description | Props principales |
|-----------|-------------|-------------------|
| `Button` | Bouton avec 4 variantes | `variant`, `size`, `disabled` |
| `Input` | Champ avec label, erreur, toggle mdp | `label`, `error`, `type` |
| `Checkbox` | Case à cocher animée par catégorie | `checked`, `onChange`, `category` |
| `Modal` | Modal avec backdrop et animation | `isOpen`, `onClose`, `title` |
| `TaskCard` | Carte de tâche complète | `task`, `onToggle`, `onDelete` |
| `CategoryPill` | Pastille colorée de catégorie | `category`, `selected`, `onClick` |
| `PriorityStars` | Sélecteur de priorité 1-3 étoiles | `priority`, `onChange`, `readOnly` |
| `ProgressRing` | Anneau SVG de progression | `percentage`, `size`, `strokeWidth` |
| `EmptyState` | Message quand aucune tâche | — |
| `Header` | En-tête avec recherche + notifications | `user`, `tasks` |
| `Sidebar` | Navigation latérale | `selectedCategory`, `onLogout` |

---

##  Sécurité

- Mots de passe hachés avec **bcrypt**
- Authentification par **JWT** (JSON Web Token)
- Validation des données côté serveur
- Protection des routes sensibles via middleware
- Variables d'environnement pour les données sensibles (.env)

---

##  Technologies Utilisées

### Frontend
- **React 18** — Bibliothèque UI avec Hooks
- **TypeScript** — Typage statique
- **Tailwind CSS** — Framework CSS utilitaire
- **Framer Motion** — Animations fluides
- **Lucide React** — Icônes SVG
- **canvas-confetti** — Effet confetti de célébration

### Backend
- **Node.js** — Environnement d'exécution JavaScript
- **Express.js** — Framework web
- **JWT** — Authentification par token
- **bcrypt** — Hachage des mots de passe
- **dotenv** — Gestion des variables d'environnement

---

##  Utilisation

1. **Inscription** : Créez un compte avec votre nom, email et mot de passe
2. **Connexion** : Connectez-vous avec vos identifiants
3. **Créer une tâche** : Cliquez sur "Nouvelle Tâche" et remplissez le formulaire
4. **Organiser** : Utilisez la sidebar pour filtrer par catégorie
5. **Compléter** : Cochez les tâches terminées
6. **Notifications** : Cliquez sur la cloche pour voir les rappels

---

##  Auteur

**DONFACK SYNTHIA CALORINE**

---

##  Licence

Ce projet est réalisé dans le cadre d'un exercice académique.
