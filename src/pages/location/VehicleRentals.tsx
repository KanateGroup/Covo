
import React, { useState } from 'react';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
=======
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Car, Bike, Zap, MapPin, Clock, DollarSign, Filter } from 'lucide-react';

const VehicleRentals = () => {
<<<<<<< HEAD
  const navigate = useNavigate();
=======
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
  const [filters, setFilters] = useState({
    type: 'all',
    location: '',
    duration: 'hour',
  });

  // Mock data pour les véhicules
  const vehicles = [
    {
      id: 1,
<<<<<<< HEAD
      type: 'voiture',
=======
      type: 'car',
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
      name: 'Renault Clio',
      image: '/placeholder.svg?height=200&width=300',
      hourlyRate: 1500,
      dailyRate: 15000,
      station: 'Station Plateau',
      available: true,
      features: ['Climatisation', '5 places', 'Bluetooth'],
      partner: 'CityDrive',
    },
    {
      id: 2,
      type: 'scooter',
      name: 'Yamaha NMAX',
      image: '/placeholder.svg?height=200&width=300',
      hourlyRate: 800,
      dailyRate: 6000,
      station: 'Station Almadies',
      available: true,
      features: ['Casque fourni', '2 places', 'Coffre'],
      partner: 'MotoShare',
    },
    {
      id: 3,
<<<<<<< HEAD
      type: 'trottinette',
=======
      type: 'electric',
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
      name: 'Trottinette électrique',
      image: '/placeholder.svg?height=200&width=300',
      hourlyRate: 500,
      dailyRate: 3000,
      station: 'Station Université',
<<<<<<< HEAD
      available: true,
=======
      available: false,
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
      features: ['Autonomie 25km', 'Pliable', 'App mobile'],
      partner: 'EcoRide',
    },
    {
      id: 4,
<<<<<<< HEAD
      type: 'tricycle',
      name: 'Tricycle urbain',
      image: '/placeholder.svg?height=200&width=300',
      hourlyRate: 600,
      dailyRate: 4000,
      station: 'Station Médina',
      available: true,
      features: ['Antivol', 'Caisse de livraison', 'Éclairage LED'],
      partner: 'BikeCity',
    },
    {
      id: 5,
      type: 'jetski',
      name: 'Jetski Sea-Doo',
      image: '/placeholder.svg?height=200&width=300',
      hourlyRate: 2500,
      dailyRate: 20000,
      station: 'Station Yoff',
      available: true,
      features: ['Gilet de sauvetage', '2 places', 'GPS'],
      partner: 'SeaRide',
    },
=======
      type: 'bike',
      name: 'Vélo urbain',
      image: '/placeholder.svg?height=200&width=300',
      hourlyRate: 300,
      dailyRate: 2000,
      station: 'Station Médina',
      available: true,
      features: ['Antivol', 'Panier', 'Éclairage LED'],
      partner: 'BikeCity',
    },
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
  ];

  const getVehicleIcon = (type: string) => {
    switch (type) {
<<<<<<< HEAD
      case 'voiture': return Car;
      case 'scooter': return Bike;
      case 'trottinette': return Zap;
      case 'tricycle': return Bike;
      case 'jetski': return Car;
=======
      case 'car': return Car;
      case 'scooter': return Bike;
      case 'electric': return Zap;
      case 'bike': return Bike;
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
      default: return Car;
    }
  };

  const getVehicleTypeLabel = (type: string) => {
    switch (type) {
<<<<<<< HEAD
      case 'voiture': return 'Voiture';
      case 'scooter': return 'Scooter';
      case 'trottinette': return 'Trottinette électrique';
      case 'tricycle': return 'Tricycle';
      case 'jetski': return 'Jetski';
=======
      case 'car': return 'Voiture';
      case 'scooter': return 'Scooter';
      case 'electric': return 'Trottinette électrique';
      case 'bike': return 'Vélo';
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
      default: return type;
    }
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    if (filters.type !== 'all' && vehicle.type !== filters.type) {
      return false;
    }
    return true;
  });

<<<<<<< HEAD
  const handleRent = (vehicle: any) => {
    console.log('🚗 Véhicule sélectionné:', vehicle); // Debug
    
    // Pré-remplir les données du véhicule pour le formulaire
    const vehicleData = {
      vehicleType: vehicle.type,
      vehicleName: vehicle.name,
      vehiclePrice: vehicle.hourlyRate,
      pickupStation: vehicle.station,
      returnStation: vehicle.station, // Par défaut même station
    };
    
    // Sauvegarder les données du véhicule pour le formulaire
    localStorage.setItem('selectedVehicle', JSON.stringify(vehicleData));
    
    console.log('📋 Données véhicule sauvegardées:', vehicleData); // Debug
    console.log('🚀 Redirection vers le formulaire de réservation'); // Debug
    
    // Redirection vers le formulaire de réservation
    navigate('/location/book');
=======
  const handleRent = (vehicleId: number) => {
    console.log('Rent vehicle:', vehicleId);
    // Redirection vers la page de réservation
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
  };

  return (
    <div className="min-h-screen bg-muted/30 p-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Location de véhicules</h1>
        
        {/* Filtres */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              Filtres de recherche
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type de véhicule</Label>
                <select
                  id="type"
                  value={filters.type}
                  onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="all">Tous les types</option>
<<<<<<< HEAD
                  <option value="voiture">Voitures</option>
                  <option value="scooter">Scooters</option>
                  <option value="trottinette">Trottinettes électriques</option>
                  <option value="tricycle">Tricycles</option>
                  <option value="jetski">Jetskis</option>
=======
                  <option value="car">Voitures</option>
                  <option value="scooter">Scooters</option>
                  <option value="electric">Trottinettes électriques</option>
                  <option value="bike">Vélos</option>
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Station</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Rechercher une station..."
                    value={filters.location}
                    onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Durée</Label>
                <select
                  id="duration"
                  value={filters.duration}
                  onChange={(e) => setFilters(prev => ({ ...prev, duration: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="hour">À l'heure</option>
                  <option value="day">À la journée</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des véhicules */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => {
            const IconComponent = getVehicleIcon(vehicle.type);
            const rate = filters.duration === 'hour' ? vehicle.hourlyRate : vehicle.dailyRate;
            const rateLabel = filters.duration === 'hour' ? '/heure' : '/jour';
            
            return (
              <Card key={vehicle.id} className={`hover:shadow-lg transition-shadow ${!vehicle.available ? 'opacity-60' : ''}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <IconComponent className="h-5 w-5 text-primary mr-2" />
                      <Badge variant="secondary">{getVehicleTypeLabel(vehicle.type)}</Badge>
                    </div>
                    <Badge variant={vehicle.available ? 'default' : 'destructive'}>
                      {vehicle.available ? 'Disponible' : 'Indisponible'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  
                  <div>
                    <h3 className="text-lg font-semibold">{vehicle.name}</h3>
                    <p className="text-sm text-muted-foreground">Par {vehicle.partner}</p>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {vehicle.station}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {vehicle.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">{rate} CFA</div>
                      <div className="text-sm text-muted-foreground">{rateLabel}</div>
                    </div>
                    <Button 
<<<<<<< HEAD
                      onClick={() => handleRent(vehicle)}
=======
                      onClick={() => handleRent(vehicle.id)}
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
                      disabled={!vehicle.available}
                      className="ml-4"
                    >
                      {vehicle.available ? 'Louer' : 'Indisponible'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VehicleRentals;
