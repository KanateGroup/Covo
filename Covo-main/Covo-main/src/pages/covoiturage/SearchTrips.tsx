import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Shield, Star, Car, Calendar } from 'lucide-react';

// Données mock pour les trajets
const mockTrips = [
  {
    id: 3,
    driver: {
      name: 'Ousmane Ba',
      rating: 4.7,
      photo: '/placeholder.svg',
      verified: false,
      trips: 45,
    },
    departure: 'Plateau',
    destination: 'Almadies',
    departureTime: '16:30',
    arrivalTime: '17:20',
    price: 1800,
    availableSeats: 1,
    vehicle: {
      make: 'Mercedes',
      model: 'Classe A',
      color: 'Noir',
      year: 2021,
    },
    amenities: ['Climatisation', 'Musique', 'WiFi', 'Luxe'],
    distance: '12 km',
    duration: '50 min',
    date: '2024-01-17T16:30:00',
  },
  {
    id: 2,
    driver: {
      name: 'Aïcha Sow',
      rating: 4.9,
      photo: '/placeholder.svg',
      verified: true,
      trips: 89,
    },
    departure: 'Plateau',
    destination: 'Almadies',
    departureTime: '15:00',
    arrivalTime: '15:45',
    price: 1200,
    availableSeats: 2,
    vehicle: {
      make: 'Hyundai',
      model: 'i20',
      color: 'Bleu',
      year: 2023,
    },
    amenities: ['Climatisation', 'Non-fumeur'],
    distance: '12 km',
    duration: '45 min',
    date: '2024-01-17T15:00:00',
  },
  {
    id: 1,
    driver: {
      name: 'Mamadou Diop',
      rating: 4.8,
      photo: '/placeholder.svg',
      verified: true,
      trips: 127,
    },
    departure: 'Plateau',
    destination: 'Almadies',
    departureTime: '14:30',
    arrivalTime: '15:15',
    price: 1500,
    availableSeats: 3,
    vehicle: {
      make: 'Toyota',
      model: 'Corolla',
      color: 'Blanc',
      year: 2022,
    },
    amenities: ['Climatisation', 'Musique', 'WiFi'],
    distance: '12 km',
    duration: '45 min',
    date: '2024-01-17T14:30:00',
  },
];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
}

const SearchTrips: React.FC = () => {
  const [trips, setTrips] = useState<typeof mockTrips>([]);

  useEffect(() => {
    // Trier les trajets par date décroissante (plus récents en premier)
    const sorted = [...mockTrips].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setTrips(sorted);
  }, []);

  const handleReserve = (tripId: string) => {
    // Logique de réservation à implémenter
    alert('Réservation du trajet ' + tripId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#232526] to-[#414345] py-10 px-4 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white mb-2">Covoiturage</h1>
        <p className="text-white/80 mb-8">Découvrez et réservez les covoiturages disponibles en temps réel. Les trajets les plus récents sont affichés en priorité.</p>
        <AnimatePresence>
          {trips.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-white/70 py-16"
            >
              Aucun covoiturage disponible pour le moment.
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-8"
            >
              {trips.map((trip, index) => {
                // Badge "Nouveau" si le trajet a moins de 2 jours
                const isNew = (Date.now() - new Date(trip.date).getTime()) < 2 * 24 * 60 * 60 * 1000;
                // Couleur du badge places
                const seatBadge = trip.availableSeats <= 1 ? 'bg-red-500 text-white' : trip.availableSeats <= 2 ? 'bg-yellow-400 text-black' : 'bg-green-500 text-white';
                return (
                  <motion.div
                    key={trip.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  >
                    <Card className="backdrop-blur-xl bg-white/5 border-white/10 hover:border-white/20 transition-all duration-300 shadow-2xl">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                          {/* Infos conducteur */}
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <img
                                src={trip.driver.photo}
                                alt={trip.driver.name}
                                className="w-16 h-16 rounded-full object-cover border-2 border-[#b6ffb0]"
                              />
                              {trip.driver.verified && (
                                <Shield className="absolute -bottom-1 -right-1 h-5 w-5 text-[#b6ffb0] bg-black rounded-full p-0.5" />
                              )}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                {trip.driver.name}
                                {isNew && <Badge className="bg-[#b6ffb0] text-black ml-2">Nouveau</Badge>}
                              </h3>
                              <div className="flex items-center space-x-2">
                                <Star className="h-4 w-4 text-[#b6ffb0] fill-current" />
                                <span className="text-white/80">{trip.driver.rating}</span>
                                <span className="text-white/60">({trip.driver.trips} trajets)</span>
                              </div>
                              <div className="flex items-center space-x-2 mt-1">
                                <Car className="h-4 w-4 text-[#4ecdc4]" />
                                <span className="text-white/70">{trip.vehicle.make} {trip.vehicle.model} ({trip.vehicle.year})</span>
                              </div>
                            </div>
                          </div>
                          {/* Infos trajet */}
                          <div className="flex flex-col space-y-2">
                            <div className="flex items-center space-x-4">
                              <div className="text-center">
                                <p className="text-sm text-white/60">Départ</p>
                                <p className="font-semibold text-white">{trip.departure}</p>
                                <p className="text-sm text-[#b6ffb0]">{trip.departureTime}</p>
                              </div>
                              <div className="flex-1 border-t-2 border-dashed border-white/20 mx-4"></div>
                              <div className="text-center">
                                <p className="text-sm text-white/60">Arrivée</p>
                                <p className="font-semibold text-white">{trip.destination}</p>
                                <p className="text-sm text-[#b6ffb0]">{trip.arrivalTime}</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-center space-x-4 text-sm text-white/70">
                              <span>{trip.distance}</span>
                              <span>•</span>
                              <span>{trip.duration}</span>
                              <span>•</span>
                              <Badge className={seatBadge}>{trip.availableSeats} place{trip.availableSeats > 1 ? 's' : ''} disponible{trip.availableSeats > 1 ? 's' : ''}</Badge>
                            </div>
                            <div className="flex items-center justify-center gap-2 mt-2">
                              <Calendar className="h-4 w-4 text-[#b6ffb0]" />
                              <span className="text-white/80">{formatDate(trip.date)}</span>
                            </div>
                          </div>
                          {/* Prix et actions */}
                          <div className="flex flex-col items-end space-y-4">
                            <div className="text-right">
                              <p className="text-lg font-bold text-white">{trip.price} CFA</p>
                              <p className="text-xs text-white/60">par personne</p>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-white/20 text-white hover:bg-white/10"
                              >
                                <MessageCircle className="h-4 w-4 mr-1" />
                                Message
                              </Button>
                              <Button
                                onClick={() => handleReserve(trip.id.toString())}
                                className="bg-gradient-to-r from-[#b6ffb0] to-[#4ecdc4] text-black font-semibold hover:from-[#4ecdc4] hover:to-[#b6ffb0] transition-all duration-300"
                              >
                                Réserver
                              </Button>
                            </div>
                          </div>
                        </div>
                        {/* Aménités */}
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <div className="flex flex-wrap gap-2">
                            {trip.amenities.map((amenity, amenityIndex) => (
                              <Badge key={amenityIndex} className="bg-white/10 text-white/80 border-white/20">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchTrips; 