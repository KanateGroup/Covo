

## Intégration Supabase (Backend as a Service)

### 1. Configuration
- Crée un projet sur [Supabase](https://supabase.com/)
- Rends-toi dans l'onglet SQL Editor et copie-colle le contenu de `supabase_schema.sql` pour créer les tables
- Récupère l'URL de ton projet et la clé anonyme (Settings > API)
- Remplace les valeurs dans `src/lib/supabaseClient.ts` :
  ```ts
  const supabaseUrl = 'https://<TON-PROJET>.supabase.co';
  const supabaseKey = '<TA-CLÉ-ANON>';
  ```

### 2. Utilisation dans le frontend
- Les fonctions d'authentification sont dans `src/services/supabaseAuth.ts`
- Les fonctions CRUD principales sont dans `src/services/supabaseDb.ts`

### 3. Sécurité
- Active le Row Level Security (RLS) sur chaque table dans Supabase
- Ajoute des policies pour restreindre l'accès aux données selon le rôle de l'utilisateur

### 4. Dépendances
- Installe le client Supabase :
  ```bash
  npm install @supabase/supabase-js
  ```

### 5. Exemples d'utilisation
```ts
import { signUp, signIn, signOut } from './services/supabaseAuth';
import { getTrajets, createTrajet } from './services/supabaseDb';
```

N'oublie pas d'adapter les policies de sécurité selon tes besoins ! 