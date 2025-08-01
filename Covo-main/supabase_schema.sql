-- Schéma SQL pour Supabase (plateforme de covoiturage/location)

-- Table Utilisateurs (gérée par Supabase Auth, mais on peut ajouter des infos supplémentaires)
create table if not exists utilisateurs (
    id uuid primary key references auth.users(id) on delete cascade,
    nom text,
    prenom text,
    telephone text,
    role text check (role in ('utilisateur', 'agent', 'admin')),
    date_inscription timestamp with time zone default now()
);

-- Table Stations
create table if not exists stations (
    id uuid primary key default gen_random_uuid(),
    nom text not null,
    adresse text,
    latitude double precision,
    longitude double precision
);

-- Table Véhicules
create table if not exists vehicules (
    id uuid primary key default gen_random_uuid(),
    type text not null,
    marque text,
    modele text,
    immatriculation text unique,
    station_id uuid references stations(id) on delete set null,
    disponible boolean default true
);

-- Table Agents
create table if not exists agents (
    id uuid primary key references utilisateurs(id) on delete cascade,
    matricule text unique,
    station_id uuid references stations(id) on delete set null,
    actif boolean default true
);

-- Table Trajets (Covoiturage)
create table if not exists trajets (
    id uuid primary key default gen_random_uuid(),
    conducteur_id uuid references utilisateurs(id) on delete set null,
    depart text not null,
    destination text not null,
    date_heure timestamp with time zone not null,
    places_disponibles integer not null,
    prix numeric(10,2),
    vehicule_id uuid references vehicules(id) on delete set null,
    statut text check (statut in ('ouvert', 'complet', 'annule')) default 'ouvert'
);

-- Table Réservations de trajets
create table if not exists reservations_trajets (
    id uuid primary key default gen_random_uuid(),
    trajet_id uuid references trajets(id) on delete cascade,
    passager_id uuid references utilisateurs(id) on delete cascade,
    statut text check (statut in ('en_attente', 'confirme', 'annule')) default 'en_attente',
    date_reservation timestamp with time zone default now()
);

-- Table Locations de véhicules
create table if not exists locations_vehicules (
    id uuid primary key default gen_random_uuid(),
    utilisateur_id uuid references utilisateurs(id) on delete cascade,
    vehicule_id uuid references vehicules(id) on delete set null,
    date_debut timestamp with time zone not null,
    date_fin timestamp with time zone not null,
    statut text check (statut in ('en_attente', 'confirme', 'termine', 'annule')) default 'en_attente'
);

-- Table Messages (AgentMessaging)
create table if not exists messages (
    id uuid primary key default gen_random_uuid(),
    agent_id uuid references agents(id) on delete set null,
    utilisateur_id uuid references utilisateurs(id) on delete set null,
    contenu text not null,
    date_envoi timestamp with time zone default now()
);

-- Table Urgences
create table if not exists urgences (
    id uuid primary key default gen_random_uuid(),
    utilisateur_id uuid references utilisateurs(id) on delete set null,
    type text,
    description text,
    date_signalement timestamp with time zone default now(),
    statut text check (statut in ('en_cours', 'resolu')) default 'en_cours'
); 