import { config } from '@/config';

// Types pour les réponses API
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Classe pour gérer les appels API
class ApiService {
  private baseUrl: string;
  private timeout: number;

  constructor() {
    this.baseUrl = config.api.baseUrl;
    this.timeout = config.api.timeout;
  }

  // Méthode générique pour les appels HTTP
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      timeout: this.timeout,
    };

    try {
      const response = await fetch(url, {
        ...defaultOptions,
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Méthodes pour l'authentification
  async login(email: string, password: string): Promise<ApiResponse> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
  }): Promise<ApiResponse> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout(): Promise<ApiResponse> {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // Méthodes pour les trajets
  async searchTrips(searchData: {
    departure: string;
    destination: string;
    date: string;
    time?: string;
  }): Promise<ApiResponse> {
    const params = new URLSearchParams(searchData as any);
    return this.request(`/trips/search?${params}`);
  }

  async createTrip(tripData: any): Promise<ApiResponse> {
    return this.request('/trips', {
      method: 'POST',
      body: JSON.stringify(tripData),
    });
  }

  async bookTrip(tripId: string): Promise<ApiResponse> {
    return this.request(`/trips/${tripId}/book`, {
      method: 'POST',
    });
  }

  async cancelTrip(tripId: string): Promise<ApiResponse> {
    return this.request(`/trips/${tripId}/cancel`, {
      method: 'POST',
    });
  }

  async getMyTrips(): Promise<ApiResponse> {
    return this.request('/trips/my-trips');
  }

  async getMyBookings(): Promise<ApiResponse> {
    return this.request('/trips/my-bookings');
  }

  // Méthodes pour les locations
  async getVehicles(): Promise<ApiResponse> {
    return this.request('/vehicles');
  }

  async bookVehicle(bookingData: any): Promise<ApiResponse> {
    return this.request('/vehicles/book', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async getMyRentals(): Promise<ApiResponse> {
    return this.request('/vehicles/my-rentals');
  }

  // Méthodes pour les stations
  async getStations(): Promise<ApiResponse> {
    return this.request('/stations');
  }

  async getStationVehicles(stationId: string): Promise<ApiResponse> {
    return this.request(`/stations/${stationId}/vehicles`);
  }

  // Méthodes pour le profil utilisateur
  async getUserProfile(): Promise<ApiResponse> {
    return this.request('/user/profile');
  }

  async updateUserProfile(profileData: any): Promise<ApiResponse> {
    return this.request('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Méthodes pour les notifications d'urgence
  async sendEmergencyAlert(alertData: any): Promise<ApiResponse> {
    return this.request('/emergency/alert', {
      method: 'POST',
      body: JSON.stringify(alertData),
    });
  }

  // Méthodes pour l'administration
  async getAdminStats(): Promise<ApiResponse> {
    return this.request('/admin/stats');
  }

  async getAdminUsers(): Promise<ApiResponse> {
    return this.request('/admin/users');
  }

  async getAdminTrips(): Promise<ApiResponse> {
    return this.request('/admin/trips');
  }

  // Méthode pour ajouter un token d'authentification
  setAuthToken(token: string) {
    // Stocker le token dans localStorage ou dans un état global
    localStorage.setItem('auth_token', token);
  }

  // Méthode pour récupérer le token d'authentification
  getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Méthode pour supprimer le token d'authentification
  removeAuthToken() {
    localStorage.removeItem('auth_token');
  }

  // Méthode pour ajouter le token aux headers des requêtes
  private getAuthHeaders(): Record<string, string> {
    const token = this.getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

// Instance singleton du service API
export const apiService = new ApiService();

// Export des types
export type { ApiResponse }; 