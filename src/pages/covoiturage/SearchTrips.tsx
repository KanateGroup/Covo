
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, MapPin, Clock, Users, Star, Car } from 'lucide-react';

const SearchTrips = () => {
  const [searchData, setSearchData] = useState({
    departure: '',
    destination: '',
    date: '',
    time: '',
  });

  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Mock data pour les résultats de recherche
  const mockTrips = [
    {
      id: 1,
      driver: {
        name: 'Mamadou Diop',
        rating: 4.8,
        photo: '/placeholder.svg',
        verified: true,
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
      },
      amenities: ['Climatisation', 'Musique', 'WiFi'],
    },
    {
      id: 2,
      driver: {
        name: 'Aïcha Sow',
        rating: 4.9,
        photo: '/placeholder.svg',
        verified: true,
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
      },
      amenities: ['Climatisation', 'Non-fumeur'],
    },
    {
      id: 3,
      driver: {
        name: 'Ousmane Ba',
        rating: 4.7,
        photo: '/placeholder.svg',
        verified: false,
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
      },
      amenities: ['Climatisation', 'Musique', 'WiFi', 'Luxe'],
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Recherche de trajets:', searchData);
    setSearchResults(mockTrips);
    setHasSearched(true);
  };

  const handleReserve = (tripId: number) => {
    console.log('Réservation du trajet:', tripId);
    // Ici vous ajouterez la logique de réservation
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-muted/30 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header avec bouton retour */}
        <div className="flex items-center mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8 text-center">Rechercher un trajet</h1>

        {/* Formulaire de recherche */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Où souhaitez-vous aller ?
            </CardTitle>
            <CardDescription>
              Trouvez le trajet parfait pour votre destination
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="departure">Départ</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="departure"
                      name="departure"
                      placeholder="Ville ou adresse de départ"
                      value={searchData.departure}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="destination"
                      name="destination"
                      placeholder="Ville ou adresse d'arrivée"
                      value={searchData.destination}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={searchData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Heure</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={searchData.time}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full">
                <Search className="mr-2 h-4 w-4" />
                Rechercher des trajets
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Résultats de recherche */}
        {hasSearched && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Trajets disponibles</h2>
              <Badge variant="secondary">
                {searchResults.length} trajet{searchResults.length > 1 ? 's' : ''} trouvé{searchResults.length > 1 ? 's' : ''}
              </Badge>
            </div>

            {searchResults.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">
                    Aucun trajet trouvé pour vos critères de recherche.
                  </p>
                  <Link to="/covoiturage/create" className="mt-4 inline-block">
                    <Button>
                      <Car className="mr-2 h-4 w-4" />
                      Proposer un trajet
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {searchResults.map((trip) => (
                  <Card key={trip.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img
                            src={trip.driver.photo}
                            alt={trip.driver.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold">{trip.driver.name}</h3>
                              {trip.driver.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  Vérifié
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-secondary fill-current" />
                              <span className="text-sm text-muted-foreground">
                                {trip.driver.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            {trip.price.toLocaleString()} FCFA
                          </div>
                          <div className="text-sm text-muted-foreground">
                            par personne
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Itinéraire</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              {trip.departure}
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                              {trip.destination}
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Horaires</h4>
                          <div className="space-y-1 text-sm">
                            <div>Départ: {trip.departureTime}</div>
                            <div>Arrivée: {trip.arrivalTime}</div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Détails</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {trip.availableSeats} place{trip.availableSeats > 1 ? 's' : ''} disponible{trip.availableSeats > 1 ? 's' : ''}
                            </div>
                            <div className="flex items-center">
                              <Car className="h-4 w-4 mr-1" />
                              {trip.vehicle.make} {trip.vehicle.model} ({trip.vehicle.color})
                            </div>
                          </div>
                        </div>
                      </div>

                      {trip.amenities.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-medium mb-2">Équipements</h4>
                          <div className="flex flex-wrap gap-2">
                            {trip.amenities.map((amenity, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-6 flex space-x-2">
                        <Button
                          onClick={() => handleReserve(trip.id)}
                          className="flex-1"
                        >
                          Réserver ce trajet
                        </Button>
                        <Button variant="outline">
                          Contacter
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Liens vers autres fonctionnalités */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            Vous ne trouvez pas de trajet qui vous convient ?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/covoiturage/create">
              <Button variant="outline">
                <Car className="mr-2 h-4 w-4" />
                Proposer un trajet
              </Button>
            </Link>
            <Link to="/location">
              <Button variant="secondary">
                Louer un véhicule
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchTrips;
