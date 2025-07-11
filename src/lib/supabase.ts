import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour les données
export interface Reservation {
  id?: string;
  booking_id: string;
  vehicle_type: string;
  pickup_station: string;
  return_station: string;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  total_price: number;
  status: string;
  created_at?: string;
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: 'client' | 'conducteur' | 'loueur' | 'agent' | 'admin' | 'depanneur';
  created_at?: string;
}

// Fonctions utilitaires pour les réservations
export const reservationService = {
  // Créer une nouvelle réservation
  async createReservation(reservation: Omit<Reservation, 'id' | 'created_at'>) {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .insert([reservation])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la création de la réservation:', error);
      throw error;
    }
  },

  // Récupérer une réservation par ID
  async getReservation(bookingId: string) {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .eq('booking_id', bookingId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération de la réservation:', error);
      throw error;
    }
  },

  // Mettre à jour le statut d'une réservation
  async updateReservationStatus(bookingId: string, status: string) {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .update({ status })
        .eq('booking_id', bookingId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la réservation:', error);
      throw error;
    }
  }
};

// Fonctions utilitaires pour l'authentification
export const authService = {
  // Inscription
  async signUp(email: string, password: string, userData: Partial<User>) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      throw error;
    }
  },

  // Connexion
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  },

  // Déconnexion
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      throw error;
    }
  },

  // Récupérer l'utilisateur actuel
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return user;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      throw error;
    }
  }
}; 