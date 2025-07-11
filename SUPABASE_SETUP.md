# Configuration Supabase pour COVO

## 1. Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Notez votre URL et votre clé anonyme

## 2. Configuration des variables d'environnement

Créez un fichier `.env` à la racine du projet avec :

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 3. Structure de la base de données

Exécutez ces requêtes SQL dans l'éditeur SQL de Supabase :

### Table des utilisateurs (créée automatiquement par Supabase Auth)
```sql
-- Cette table est créée automatiquement par Supabase Auth
-- Vous pouvez ajouter des colonnes personnalisées si nécessaire
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS first_name TEXT;
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS last_name TEXT;
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'client';
```

### Table des réservations
```sql
CREATE TABLE IF NOT EXISTS reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id TEXT UNIQUE NOT NULL,
  vehicle_type TEXT NOT NULL,
  pickup_station TEXT NOT NULL,
  return_station TEXT NOT NULL,
  start_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_date DATE NOT NULL,
  end_time TIME NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_reservations_booking_id ON reservations(booking_id);
CREATE INDEX IF NOT EXISTS idx_reservations_email ON reservations(email);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);
```

### Table des véhicules
```sql
CREATE TABLE IF NOT EXISTS vehicles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  image_url TEXT,
  available BOOLEAN DEFAULT true,
  station_id UUID,
  owner_id UUID,
  price_per_hour DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Table des stations
```sql
CREATE TABLE IF NOT EXISTS stations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  opening_hours TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 4. Politiques de sécurité (RLS)

Activez RLS et configurez les politiques :

```sql
-- Activer RLS sur toutes les tables
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE stations ENABLE ROW LEVEL SECURITY;

-- Politiques pour les réservations
CREATE POLICY "Users can view their own reservations" ON reservations
  FOR SELECT USING (email = auth.jwt() ->> 'email');

CREATE POLICY "Users can insert their own reservations" ON reservations
  FOR INSERT WITH CHECK (email = auth.jwt() ->> 'email');

-- Politiques pour les véhicules (lecture publique)
CREATE POLICY "Anyone can view available vehicles" ON vehicles
  FOR SELECT USING (available = true);

-- Politiques pour les stations (lecture publique)
CREATE POLICY "Anyone can view stations" ON stations
  FOR SELECT USING (true);
```

## 5. Test de la connexion

Après configuration, testez la connexion en ouvrant la console du navigateur et en tapant :

```javascript
// Dans la console du navigateur
import { supabase } from './src/lib/supabase.js';
console.log('Supabase configuré:', !!supabase);
```

## 6. Fonctionnalités implémentées

- ✅ **Réservations** : Création, lecture, mise à jour
- ✅ **Authentification** : Inscription, connexion, déconnexion
- ✅ **Types TypeScript** : Interfaces pour les données
- ✅ **Services** : Fonctions utilitaires pour l'API

## 7. Prochaines étapes

1. Configurer l'authentification dans les pages Login/Register
2. Ajouter la gestion des rôles utilisateurs
3. Implémenter les notifications temps réel
4. Ajouter la gestion des paiements
5. Créer les dashboards admin

## 8. Dépannage

### Erreur de connexion
- Vérifiez que les variables d'environnement sont correctes
- Assurez-vous que le projet Supabase est actif

### Erreur de permissions
- Vérifiez que les politiques RLS sont configurées
- Assurez-vous que l'utilisateur est authentifié si nécessaire

### Erreur de table
- Vérifiez que les tables existent dans Supabase
- Exécutez les requêtes SQL dans l'ordre 