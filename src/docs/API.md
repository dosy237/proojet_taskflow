
# 📡 Documentation API — TaskFlow

**Auteur :** DONFACK SYNTHIA CALORINE  
**Version :** 1.0.0  
**Base URL :** `http://localhost:3000/api`

---

## 📋 Vue d'ensemble

TaskFlow expose une API REST pour la gestion des utilisateurs et des tâches. Dans la version actuelle (front-end uniquement), l'API est simulée côté client avec `localStorage`. Cette documentation décrit les endpoints tels qu'ils seraient implémentés avec un back-end Node.js/Express.

---

## 🔐 Authentification

L'API utilise des tokens JWT (JSON Web Tokens) pour l'authentification. Le token doit être inclus dans le header `Authorization` de chaque requête protégée.

```
Authorization: Bearer <votre_token_jwt>
```

---

## 📌 Endpoints

### 1. Authentification

#### `POST /api/auth/register` — Inscription

Crée un nouveau compte utilisateur.

**Body (JSON) :**
```json
{
  "name": "DONFACK SYNTHIA CALORINE",
  "email": "synthia@exemple.com",
  "password": "motdepasse123"
}
```

**Réponse succès (201) :**
```json
{
  "success": true,
  "message": "Compte créé avec succès.",
  "data": {
    "user": {
      "id": "usr_abc123",
      "name": "DONFACK SYNTHIA CALORINE",
      "email": "synthia@exemple.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Réponse erreur (409) :**
```json
{
  "success": false,
  "error": "Un compte avec cet e-mail existe déjà."
}
```

**Validation :**
| Champ | Règle |
|-------|-------|
| `name` | Requis, 2-100 caractères |
| `email` | Requis, format email valide |
| `password` | Requis, minimum 6 caractères |

---

#### `POST /api/auth/login` — Connexion

Authentifie un utilisateur existant.

**Body (JSON) :**
```json
{
  "email": "synthia@exemple.com",
  "password": "motdepasse123"
}
```

**Réponse succès (200) :**
```json
{
  "success": true,
  "message": "Connexion réussie.",
  "data": {
    "user": {
      "id": "usr_abc123",
      "name": "DONFACK SYNTHIA CALORINE",
      "email": "synthia@exemple.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Réponse erreur (401) :**
```json
{
  "success": false,
  "error": "Mot de passe incorrect."
}
```

**Réponse erreur (404) :**
```json
{
  "success": false,
  "error": "Aucun compte trouvé avec cet e-mail."
}
```

---

### 2. Tâches (Routes protégées 🔒)

> Toutes les routes ci-dessous nécessitent un token JWT valide.

---

#### `GET /api/tasks` — Récupérer toutes les tâches

Retourne la liste des tâches de l'utilisateur connecté.

**Query Parameters (optionnels) :**
| Paramètre | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `category` | string | Filtrer par catégorie | `?category=Work` |
| `completed` | boolean | Filtrer par statut | `?completed=false` |
| `priority` | number | Filtrer par priorité (1-3) | `?priority=3` |
| `sort` | string | Tri (`date`, `priority`, `title`) | `?sort=priority` |
| `order` | string | Ordre (`asc`, `desc`) | `?order=desc` |
| `search` | string | Recherche par titre | `?search=design` |

**Réponse succès (200) :**
```json
{
  "success": true,
  "data": {
    "tasks": [
      {
        "id": "tsk_xyz789",
        "title": "Revue du design system",
        "category": "Work",
        "completed": false,
        "priority": 3,
        "dueDate": "2026-02-14T00:00:00.000Z",
        "createdAt": 1739462400000
      }
    ],
    "total": 1
  }
}
```

---

#### `GET /api/tasks/:id` — Récupérer une tâche

**Réponse succès (200) :**
```json
{
  "success": true,
  "data": {
    "id": "tsk_xyz789",
    "title": "Revue du design system",
    "category": "Work",
    "completed": false,
    "priority": 3,
    "dueDate": "2026-02-14T00:00:00.000Z",
    "createdAt": 1739462400000
  }
}
```

**Réponse erreur (404) :**
```json
{
  "success": false,
  "error": "Tâche non trouvée."
}
```

---

#### `POST /api/tasks` — Créer une tâche

**Body (JSON) :**
```json
{
  "title": "Préparer la présentation",
  "category": "Work",
  "priority": 2,
  "dueDate": "2026-02-20T00:00:00.000Z"
}
```

**Validation :**
| Champ | Règle |
|-------|-------|
| `title` | Requis, 1-200 caractères |
| `category` | Requis, enum: `Work`, `Personal`, `Urgent`, `Other` |
| `priority` | Requis, enum: `1`, `2`, `3` |
| `dueDate` | Optionnel, format ISO 8601 |

**Réponse succès (201) :**
```json
{
  "success": true,
  "message": "Tâche créée avec succès.",
  "data": {
    "id": "tsk_new123",
    "title": "Préparer la présentation",
    "category": "Work",
    "completed": false,
    "priority": 2,
    "dueDate": "2026-02-20T00:00:00.000Z",
    "createdAt": 1739462400000
  }
}
```

---

#### `PUT /api/tasks/:id` — Modifier une tâche

**Body (JSON) :**
```json
{
  "title": "Préparer la présentation (mise à jour)",
  "category": "Urgent",
  "priority": 3,
  "dueDate": "2026-02-18T00:00:00.000Z"
}
```

**Réponse succès (200) :**
```json
{
  "success": true,
  "message": "Tâche mise à jour.",
  "data": { ... }
}
```

---

#### `DELETE /api/tasks/:id` — Supprimer une tâche

**Réponse succès (200) :**
```json
{
  "success": true,
  "message": "Tâche supprimée."
}
```

---

#### `PATCH /api/tasks/:id/complete` — Marquer comme terminée

Bascule le statut `completed` de la tâche.

**Réponse succès (200) :**
```json
{
  "success": true,
  "message": "Statut de la tâche mis à jour.",
  "data": {
    "id": "tsk_xyz789",
    "completed": true
  }
}
```

---

## 🔒 Sécurité

| Mesure | Description |
|--------|-------------|
| **JWT** | Tokens signés avec expiration de 24h |
| **bcrypt** | Hash des mots de passe (coût: 12) |
| **CORS** | Origines autorisées configurables |
| **Helmet.js** | Headers de sécurité HTTP |
| **Rate Limiting** | 100 requêtes / 15 min par IP |
| **Validation** | express-validator sur tous les inputs |

---

## 📊 Codes de Statut HTTP

| Code | Signification |
|------|---------------|
| `200` | Succès |
| `201` | Ressource créée |
| `400` | Requête invalide (validation) |
| `401` | Non authentifié |
| `403` | Accès interdit |
| `404` | Ressource non trouvée |
| `409` | Conflit (email déjà utilisé) |
| `429` | Trop de requêtes (rate limit) |
| `500` | Erreur serveur |

---

## 🗄️ Schémas de Données

### User
```typescript
{
  id: string          // Identifiant unique (UUID)
  name: string        // Nom complet
  email: string       // Email (unique)
  password: string    // Hash bcrypt
  createdAt: Date     // Date de création
}
```

### Task
```typescript
{
  id: string          // Identifiant unique
  userId: string      // Référence vers User
  title: string       // Titre de la tâche
  category: enum      // 'Work' | 'Personal' | 'Urgent' | 'Other'
  completed: boolean  // Statut de complétion
  priority: enum      // 1 (Basse) | 2 (Moyenne) | 3 (Haute)
  dueDate: string     // Date limite (ISO 8601)
  createdAt: number   // Timestamp de création
}
```

---

## 🧪 Collection Postman

Pour importer dans Postman, créez une nouvelle collection avec les requêtes suivantes :

### Variables d'environnement
```
BASE_URL = http://localhost:5000
TOKEN = (obtenu après login)
```

### Requêtes
1. **Register** — `POST {{BASE_URL}}/api/auth/register`
2. **Login** — `POST {{BASE_URL}}/api/auth/login`
3. **Get Tasks** — `GET {{BASE_URL}}/api/tasks` (Header: `Authorization: Bearer {{TOKEN}}`)
4. **Get Task** — `GET {{BASE_URL}}/api/tasks/:id`
5. **Create Task** — `POST {{BASE_URL}}/api/tasks`
6. **Update Task** — `PUT {{BASE_URL}}/api/tasks/:id`
7. **Delete Task** — `DELETE {{BASE_URL}}/api/tasks/:id`
8. **Toggle Complete** — `PATCH {{BASE_URL}}/api/tasks/:id/complete`

---

## 👩‍💻 Auteur

**DONFACK SYNTHIA CALORINE**

---

*Documentation générée pour le projet TaskFlow — Février 2026*
