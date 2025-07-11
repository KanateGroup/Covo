
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Car, Bike, Zap, MapPin, Clock, DollarSign, Filter } from 'lucide-react';

const VehicleRentals = () => {
  const [filters, setFilters] = useState({
    type: 'all',
    location: '',
    duration: 'hour',
  });

  // Mock data pour les véhicules
  const vehicles = [
    {
      id: 1,
      type: 'car',
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
      type: 'electric',
      name: 'Trottinette électrique',
      image: '/placeholder.svg?height=200&width=300',
      hourlyRate: 500,
      dailyRate: 3000,
      station: 'Station Université',
      available: false,
      features: ['Autonomie 25km', 'Pliable', 'App mobile'],
      partner: 'EcoRide',
    },
    {
      id: 4,
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
  ];

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'car': return Car;
      case 'scooter': return Bike;
      case 'electric': return Zap;
      case 'bike': return Bike;
      default: return Car;
    }
  };

  const getVehicleTypeLabel = (type: string) => {
    switch (type) {
      case 'car': return 'Voiture';
      case 'scooter': return 'Scooter';
      case 'electric': return 'Trottinette électrique';
      case 'bike': return 'Vélo';
      default: return type;
    }
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    if (filters.type !== 'all' && vehicle.type !== filters.type) {
      return false;
    }
    return true;
  });

  const handleRent = (vehicleId: number) => {
    console.log('Rent vehicle:', vehicleId);
    // Redirection vers la page de réservation
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
                  <option value="car">Voitures</option>
                  <option value="scooter">Scooters</option>
                  <option value="electric">Trottinettes électriques</option>
                  <option value="bike">Vélos</option>
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
                      onClick={() => handleRent(vehicle.id)}
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
