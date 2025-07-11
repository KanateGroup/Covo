// Configuration de l'application
export const config = {
  // Configuration de l'API
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    timeout: 10000,
  },
  
  // Configuration de l'application
  app: {
    name: 'COVO',
    version: '1.0.0',
    description: 'Plateforme de covoiturage et location de véhicules',
  },
  
  // Configuration des fonctionnalités
  features: {
    enableNotifications: true,
    enableRealTimeUpdates: false,
    enableOfflineMode: false,
  },
  
  // Configuration des limites
  limits: {
    maxTripsPerDay: 10,
    maxBookingsPerTrip: 4,
    maxRentalDuration: 7, // jours
  },
  
  // Configuration des prix par défaut
  pricing: {
    defaultTripPrice: 1500, // CFA
    defaultRentalPrice: 5000, // CFA par jour
    commissionRate: 0.10, // 10%
  },
  
  // Configuration des villes supportées
  cities: [
    'Dakar',
    'Thiès',
    'Saint-Louis',
    'Kaolack',
    'Ziguinchor',
    'Touba',
    'Mbour',
    'Rufisque',
    'Diourbel',
    'Louga',
  ],
  
  // Configuration des types de véhicules
  vehicleTypes: [
    { id: 'car', name: 'Voiture', icon: '🚗' },
    { id: 'scooter', name: 'Scooter', icon: '🛵' },
    { id: 'bike', name: 'Vélo', icon: '🚲' },
    { id: 'van', name: 'Fourgon', icon: '🚐' },
  ],
  
  // Configuration des équipements disponibles
  amenities: [
    'Climatisation',
    'Musique',
    'WiFi',
    'Non-fumeur',
    'Luxe',
    'Siège bébé',
    'Bagages',
    'Animaux autorisés',
  ],
};

// Types pour la configuration
export interface Config {
  api: {
    baseUrl: string;
    timeout: number;
  };
  app: {
    name: string;
    version: string;
    description: string;
  };
  features: {
    enableNotifications: boolean;
    enableRealTimeUpdates: boolean;
    enableOfflineMode: boolean;
  };
  limits: {
    maxTripsPerDay: number;
    maxBookingsPerTrip: number;
    maxRentalDuration: number;
  };
  pricing: {
    defaultTripPrice: number;
    defaultRentalPrice: number;
    commissionRate: number;
  };
  cities: string[];
  vehicleTypes: Array<{
    id: string;
    name: string;
    icon: string;
  }>;
  amenities: string[];
} 