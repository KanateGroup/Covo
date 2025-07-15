
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Clock, Users, Star, Car, Calendar, Route, Shield, Phone, MessageCircle } from 'lucide-react';
import { useTrips } from '@/contexts/TripContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const SearchTrips = () => {
  const [searchData, setSearchData] = useState({
    departure: '',
    destination: '',
    date: '',
    time: '',
  });

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  const { searchTrips, bookTrip, isLoading } = useTrips();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Mock data pour les résultats de recherche
  const mockTrips = [
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
    },
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
    },
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const results = await searchTrips(searchData);
    setSearchResults(results);
    setHasSearched(true);
  };

  const handleReserve = async (tripId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour réserver un trajet",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const success = await bookTrip(tripId);
      if (success) {
        toast({
          title: "Réservation réussie",
          description: "Votre trajet a été réservé avec succès !",
        });
        // Recharger les résultats de recherche
        const results = await searchTrips(searchData);
        setSearchResults(results);
      } else {
        toast({
          title: "Erreur de réservation",
          description: "Impossible de réserver ce trajet",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la réservation",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1a13] via-[#0e2233] to-[#1a2a2f] pt-20 p-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold mb-4 text-white">Rechercher un trajet</h1>
          <p className="text-base text-white/70 max-w-2xl mx-auto">
            Trouvez le covoiturage parfait pour vos déplacements
          </p>
        </motion.div>

        {/* Formulaire de recherche */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl">
          <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Search className="mr-2 h-5 w-5 text-[#b6ffb0]" />
              Où souhaitez-vous aller ?
            </CardTitle>
              <CardDescription className="text-white/70">
              Trouvez le trajet parfait pour votre destination
            </CardDescription>
          </CardHeader>
          <CardContent>
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="departure" className="text-white/90">Départ</Label>
                  <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-[#b6ffb0]" />
                    <Input
                      id="departure"
                      name="departure"
                      placeholder="Ville ou adresse de départ"
                      value={searchData.departure}
                      onChange={handleChange}
                        className="pl-12 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#b6ffb0] focus:ring-[#b6ffb0]/20"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="destination" className="text-white/90">Destination</Label>
                  <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-[#b6ffb0]" />
                    <Input
                      id="destination"
                      name="destination"
                      placeholder="Ville ou adresse d'arrivée"
                      value={searchData.destination}
                      onChange={handleChange}
                        className="pl-12 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#b6ffb0] focus:ring-[#b6ffb0]/20"
                      required
                    />
                  </div>
                </div>
              </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="date" className="text-white/90">Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-5 w-5 text-[#b6ffb0]" />
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={searchData.date}
                    onChange={handleChange}
                        className="pl-12 bg-white/5 border-white/20 text-white focus:border-[#b6ffb0] focus:ring-[#b6ffb0]/20"
                    required
                  />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="time" className="text-white/90">Heure</Label>
                  <div className="relative">
                      <Clock className="absolute left-3 top-3 h-5 w-5 text-[#b6ffb0]" />
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={searchData.time}
                      onChange={handleChange}
                        className="pl-12 bg-white/5 border-white/20 text-white focus:border-[#b6ffb0] focus:ring-[#b6ffb0]/20"
                      required
                    />
                  </div>
                </div>
              </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#b6ffb0] to-[#4ecdc4] text-black font-semibold hover:from-[#4ecdc4] hover:to-[#b6ffb0] transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? 'Recherche en cours...' : 'Rechercher des trajets'}
              </Button>
            </form>
          </CardContent>
        </Card>
        </motion.div>

        {/* Statistiques rapides */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Trajets disponibles', value: mockTrips.length, icon: Route, color: '#b6ffb0' },
            { label: 'Conducteurs actifs', value: 156, icon: Users, color: '#4ecdc4' },
            { label: 'Note moyenne', value: '4.8/5', icon: Star, color: '#45b7d1' },
            { label: 'Économies moyennes', value: '60%', icon: Shield, color: '#ff6b6b' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            >
              <Card className="backdrop-blur-xl bg-white/5 border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 shadow-2xl">
                <CardContent className="pt-6 text-center">
                  <stat.icon className="h-8 w-8 mx-auto mb-2" style={{ color: stat.color }} />
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/70">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Résultats de recherche */}
        {hasSearched && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Trajets disponibles</h2>
            {mockTrips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <Card className="backdrop-blur-xl bg-white/5 border-white/10 hover:border-white/20 transition-all duration-300 shadow-2xl">
                    <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      {/* Informations du conducteur */}
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
                          <h3 className="text-lg font-semibold text-white">{trip.driver.name}</h3>
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

                      {/* Informations du trajet */}
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
                          <span>{trip.availableSeats} place{trip.availableSeats > 1 ? 's' : ''} disponible{trip.availableSeats > 1 ? 's' : ''}</span>
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
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchTrips;
