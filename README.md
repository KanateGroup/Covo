<<<<<<< HEAD
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/a32b3bb7-abda-43b9-b70b-c6d720880148

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/a32b3bb7-abda-43b9-b70b-c6d720880148) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a32b3bb7-abda-43b9-b70b-c6d720880148) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
=======
<<<<<<< HEAD
# COVO - Plateforme de Covoiturage et Location

COVO est une plateforme moderne de covoiturage et de location de véhicules développée avec React, TypeScript et Tailwind CSS.

## 🚀 Fonctionnalités

### ✅ Fonctionnalités Implémentées

- **Authentification complète** : Connexion, inscription, déconnexion
- **Gestion d'état globale** : Contextes React pour l'authentification et les trajets
- **Navigation dynamique** : Menu adaptatif selon l'état de connexion
- **Recherche de trajets** : Recherche et réservation de covoiturages
- **Création de trajets** : Proposer des trajets (utilisateurs connectés)
- **Tableau de bord** : Gestion des trajets et réservations
- **Protection des routes** : Accès contrôlé aux pages sensibles
- **Interface responsive** : Design adaptatif pour mobile et desktop
- **Notifications** : Système de toast pour les retours utilisateur
- **Configuration centralisée** : Paramètres d'application centralisés

### 🔧 Corrections Apportées

1. **Gestion d'état global** :
   - Création d'un contexte d'authentification (`AuthContext`)
   - Création d'un contexte pour les trajets (`TripContext`)
   - Persistance des données utilisateur dans localStorage

2. **Navigation améliorée** :
   - Menu utilisateur avec avatar et dropdown
   - Affichage conditionnel selon l'état de connexion
   - Bouton de déconnexion fonctionnel

3. **Protection des routes** :
   - Composant `ProtectedRoute` pour sécuriser les pages
   - Redirection automatique vers la page de connexion
   - Gestion des rôles administrateur

4. **Fonctionnalités d'authentification** :
   - Connexion avec validation et feedback
   - Inscription avec validation des mots de passe
   - Redirection intelligente après connexion

5. **Gestion des trajets** :
   - Recherche de trajets avec filtres
   - Réservation de trajets (utilisateurs connectés)
   - Création de nouveaux trajets
   - Annulation de trajets et réservations

6. **Service API** :
   - Service centralisé pour les appels HTTP
   - Gestion des tokens d'authentification
   - Configuration flexible pour différents environnements

## 🛠️ Technologies Utilisées

- **Frontend** : React 18, TypeScript, Vite
- **Styling** : Tailwind CSS, shadcn/ui
- **Routing** : React Router DOM
- **État** : React Context API
- **Requêtes** : Fetch API avec service personnalisé
- **Notifications** : Sonner + useToast
- **Icons** : Lucide React

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser la build
npm run preview
```

## 🔧 Configuration

Le projet utilise un système de configuration centralisé dans `src/config/index.ts` :

- **API** : URL de base, timeout
- **Fonctionnalités** : Notifications, temps réel, mode hors ligne
- **Limites** : Nombre max de trajets, réservations, durée de location
- **Prix** : Prix par défaut, taux de commission
- **Villes** : Liste des villes supportées
- **Véhicules** : Types de véhicules disponibles
- **Équipements** : Liste des équipements disponibles

## 📁 Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── ui/             # Composants UI (shadcn/ui)
│   ├── Navigation.tsx  # Navigation principale
│   └── ProtectedRoute.tsx # Protection des routes
├── contexts/           # Contextes React
│   ├── AuthContext.tsx # Gestion de l'authentification
│   └── TripContext.tsx # Gestion des trajets
├── pages/              # Pages de l'application
│   ├── covoiturage/    # Pages de covoiturage
│   ├── location/       # Pages de location
│   └── admin/          # Pages d'administration
├── services/           # Services API
│   └── api.ts         # Service API centralisé
├── config/             # Configuration
│   └── index.ts       # Configuration de l'app
└── hooks/              # Hooks personnalisés
```

## 🔐 Authentification

L'application utilise un système d'authentification basé sur les contextes React :

- **Connexion** : Email + mot de passe
- **Inscription** : Formulaire complet avec validation
- **Persistance** : Données utilisateur stockées dans localStorage
- **Protection** : Routes protégées pour les utilisateurs connectés

## 🚗 Fonctionnalités de Covoiturage

- **Recherche** : Par ville de départ/arrivée, date, heure
- **Réservation** : Réservation de places (utilisateurs connectés)
- **Création** : Proposer des trajets (utilisateurs connectés)
- **Gestion** : Annulation, modification des trajets

## 🏢 Administration

- **Tableau de bord** : Statistiques et gestion
- **Utilisateurs** : Gestion des comptes utilisateurs
- **Trajets** : Supervision des trajets actifs
- **Accès** : Restreint aux administrateurs

## 🚨 Fonctionnalités d'Urgence

- **Bouton SOS** : Accès rapide aux services d'urgence
- **Localisation** : Partage de position en cas d'urgence
- **Contact** : Appels directs aux services de secours

## 🔄 État Actuel

✅ **Fonctionnel** : Toutes les fonctionnalités de base sont opérationnelles
✅ **Testé** : Navigation, authentification, recherche de trajets
✅ **Responsive** : Interface adaptée mobile et desktop
✅ **Sécurisé** : Protection des routes et validation des données

## 🚀 Prochaines Étapes

1. **Backend** : Développement de l'API REST
2. **Base de données** : Intégration d'une base de données
3. **Paiements** : Intégration d'un système de paiement
4. **Notifications** : Notifications push en temps réel
5. **Tests** : Tests unitaires et d'intégration
6. **Déploiement** : Mise en production

## 📝 Notes

- L'application fonctionne actuellement avec des données mockées
- Les appels API sont simulés pour démontrer les fonctionnalités
- Le système est prêt pour l'intégration d'un vrai backend
- Toutes les fonctionnalités sont testées et fonctionnelles

## 🎯 Comment Utiliser

1. **Lancez l'application** : `npm run dev`
2. **Créez un compte** : Inscrivez-vous via le formulaire d'inscription
3. **Connectez-vous** : Utilisez vos identifiants pour vous connecter
4. **Recherchez des trajets** : Utilisez la fonction de recherche
5. **Réservez un trajet** : Cliquez sur "Réserver" (connexion requise)
6. **Proposez un trajet** : Créez votre propre trajet
7. **Gérez vos trajets** : Accédez à votre tableau de bord

## 🔧 Développement

Pour contribuer au projet :

1. Clonez le repository
2. Installez les dépendances : `npm install`
3. Lancez le serveur de développement : `npm run dev`
4. Faites vos modifications
5. Testez les fonctionnalités
6. Committez vos changements

## 📞 Support

Pour toute question ou problème :
- Consultez la documentation technique
- Vérifiez les logs de la console
- Testez les fonctionnalités une par une
- Vérifiez la configuration dans `src/config/index.ts`
=======
# Covo
Projet Covo kanate
>>>>>>> 1adf8b11801dd0081d115fe1e2606714745f3d6f
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
