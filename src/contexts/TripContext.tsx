import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface Trip {
  id: string;
  driver: {
    id: string;
    name: string;
    rating: number;
    photo: string;
    verified: boolean;
  };
  departure: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  date: string;
  price: number;
  availableSeats: number;
  vehicle: {
    make: string;
    model: string;
    color: string;
  };
  amenities: string[];
  status: 'active' | 'completed' | 'cancelled';
  bookings: Booking[];
}

interface Booking {
  id: string;
  userId: string;
  userName: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

interface TripContextType {
  trips: Trip[];
  myTrips: Trip[];
  myBookings: Booking[];
  isLoading: boolean;
  searchTrips: (searchData: SearchData) => Promise<Trip[]>;
  createTrip: (tripData: CreateTripData) => Promise<boolean>;
  bookTrip: (tripId: string) => Promise<boolean>;
  cancelTrip: (tripId: string) => Promise<boolean>;
  cancelBooking: (bookingId: string) => Promise<boolean>;
}

interface SearchData {
  departure: string;
  destination: string;
  date: string;
  time?: string;
}

interface CreateTripData {
  departure: string;
  destination: string;
  departureTime: string;
  date: string;
  price: number;
  availableSeats: number;
  vehicle: {
    make: string;
    model: string;
    color: string;
  };
  amenities: string[];
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const useTrips = () => {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTrips must be used within a TripProvider');
  }
  return context;
};

interface TripProviderProps {
  children: ReactNode;
}

export const TripProvider: React.FC<TripProviderProps> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // Mock data initial
  const mockTrips: Trip[] = [
    {
      id: '1',
      driver: {
        id: 'driver1',
        name: 'Mamadou Diop',
        rating: 4.8,
        photo: '/placeholder.svg',
        verified: true,
      },
      departure: 'Plateau',
      destination: 'Almadies',
      departureTime: '14:30',
      arrivalTime: '15:15',
      date: '2024-01-15',
      price: 1500,
      availableSeats: 3,
      vehicle: {
        make: 'Toyota',
        model: 'Corolla',
        color: 'Blanc',
      },
      amenities: ['Climatisation', 'Musique', 'WiFi'],
      status: 'active',
      bookings: [],
    },
    {
      id: '2',
      driver: {
        id: 'driver2',
        name: 'Aïcha Sow',
        rating: 4.9,
        photo: '/placeholder.svg',
        verified: true,
      },
      departure: 'Plateau',
      destination: 'Almadies',
      departureTime: '15:00',
      arrivalTime: '15:45',
      date: '2024-01-15',
      price: 1200,
      availableSeats: 2,
      vehicle: {
        make: 'Hyundai',
        model: 'i20',
        color: 'Bleu',
      },
      amenities: ['Climatisation', 'Non-fumeur'],
      status: 'active',
      bookings: [],
    },
  ];

  useEffect(() => {
    // Charger les trajets initiaux
    setTrips(mockTrips);
  }, []);

  const searchTrips = async (searchData: SearchData): Promise<Trip[]> => {
    setIsLoading(true);
    
    try {
      // Simulation d'une recherche API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filtrer les trajets selon les critères de recherche
      const filteredTrips = mockTrips.filter(trip => {
        const matchesDeparture = trip.departure.toLowerCase().includes(searchData.departure.toLowerCase());
        const matchesDestination = trip.destination.toLowerCase().includes(searchData.destination.toLowerCase());
        const matchesDate = trip.date === searchData.date;
        
        return matchesDeparture && matchesDestination && matchesDate;
      });
      
      return filteredTrips;
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const createTrip = async (tripData: CreateTripData): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    
    try {
      // Simulation d'une création de trajet
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newTrip: Trip = {
        id: Date.now().toString(),
        driver: {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          rating: user.rating || 0,
          photo: '/placeholder.svg',
          verified: true,
        },
        ...tripData,
        arrivalTime: '15:15', // Calculé automatiquement dans un vrai projet
        status: 'active',
        bookings: [],
      };
      
      setTrips(prev => [...prev, newTrip]);
      return true;
    } catch (error) {
      console.error('Erreur lors de la création du trajet:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const bookTrip = async (tripId: string): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    
    try {
      // Simulation d'une réservation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const booking: Booking = {
        id: Date.now().toString(),
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };
      
      setTrips(prev => prev.map(trip => {
        if (trip.id === tripId) {
          return {
            ...trip,
            availableSeats: trip.availableSeats - 1,
            bookings: [...trip.bookings, booking],
          };
        }
        return trip;
      }));
      
      return true;
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const cancelTrip = async (tripId: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulation d'une annulation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTrips(prev => prev.map(trip => {
        if (trip.id === tripId) {
          return { ...trip, status: 'cancelled' as const };
        }
        return trip;
      }));
      
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'annulation:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const cancelBooking = async (bookingId: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulation d'une annulation de réservation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTrips(prev => prev.map(trip => ({
        ...trip,
        bookings: trip.bookings.map(booking => {
          if (booking.id === bookingId) {
            return { ...booking, status: 'cancelled' as const };
          }
          return booking;
        }),
        availableSeats: trip.bookings.find(b => b.id === bookingId)?.status === 'confirmed' 
          ? trip.availableSeats + 1 
          : trip.availableSeats,
      })));
      
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'annulation de la réservation:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Calculer les trajets de l'utilisateur connecté
  const myTrips = trips.filter(trip => trip.driver.id === user?.id);
  
  // Calculer les réservations de l'utilisateur connecté
  const myBookings = trips
    .flatMap(trip => trip.bookings.filter(booking => booking.userId === user?.id))
    .map(booking => ({
      ...booking,
      tripId: trips.find(trip => trip.bookings.some(b => b.id === booking.id))?.id || '',
    }));

  const value: TripContextType = {
    trips,
    myTrips,
    myBookings,
    isLoading,
    searchTrips,
    createTrip,
    bookTrip,
    cancelTrip,
    cancelBooking,
  };

  return (
    <TripContext.Provider value={value}>
      {children}
    </TripContext.Provider>
  );
}; 