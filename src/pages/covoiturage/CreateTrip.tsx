
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Car, MapPin, Clock, Users, DollarSign, Plus } from 'lucide-react';
import { useTrips } from '@/contexts/TripContext';
import { useToast } from '@/hooks/use-toast';

const CreateTrip = () => {
  const [tripData, setTripData] = useState({
    departure: '',
    destination: '',
    date: '',
    time: '',
    price: '',
    availableSeats: '',
    vehicle: '',
    vehicleColor: '',
    description: '',
    amenities: [],
    recurringTrip: false,
    allowPets: false,
    smokingAllowed: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Création du trajet:', tripData);
    // Ici vous ajouterez la logique de création de trajet
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setTripData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setTripData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setTripData(prev => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenity]
        : prev.amenities.filter(a => a !== amenity)
    }));
  };

  const amenitiesList = [
    'Climatisation',
    'Musique',
    'WiFi',
    'Chargeur téléphone',
    'Bagages autorisés',
    'Conversation',
    'Silence',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1a13] via-[#0e2233] to-[#1a2a2f] pt-20 p-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Proposer un trajet</h1>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="mr-2 h-5 w-5" />
              Créer un nouveau trajet
            </CardTitle>
            <CardDescription>
              Partagez votre trajet et réduisez les coûts de transport
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Itinéraire */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Itinéraire</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="departure">Départ</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="departure"
                        name="departure"
                        placeholder="Ville ou adresse de départ"
                        value={tripData.departure}
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
                        value={tripData.destination}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Date et heure */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Date et heure</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={tripData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Heure de départ</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="time"
                        name="time"
                        type="time"
                        value={tripData.time}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Véhicule */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Véhicule</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicle">Modèle du véhicule</Label>
                    <div className="relative">
                      <Car className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="vehicle"
                        name="vehicle"
                        placeholder="Ex: Toyota Corolla"
                        value={tripData.vehicle}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleColor">Couleur</Label>
                    <Input
                      id="vehicleColor"
                      name="vehicleColor"
                      placeholder="Ex: Blanc"
                      value={tripData.vehicleColor}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Prix et places */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Tarif et places</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Prix par personne (FCFA)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        placeholder="1500"
                        value={tripData.price}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="availableSeats">Places disponibles</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Select onValueChange={(value) => setTripData(prev => ({ ...prev, availableSeats: value }))}>
                        <SelectTrigger className="pl-10">
                          <SelectValue placeholder="Nombre de places" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 place</SelectItem>
                          <SelectItem value="2">2 places</SelectItem>
                          <SelectItem value="3">3 places</SelectItem>
                          <SelectItem value="4">4 places</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Équipements */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Équipements disponibles</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {amenitiesList.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity}
                        checked={tripData.amenities.includes(amenity)}
                        onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                      />
                      <Label htmlFor={amenity} className="text-sm">
                        {amenity}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Préférences */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Préférences</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="allowPets"
                      name="allowPets"
                      checked={tripData.allowPets}
                      onCheckedChange={(checked) => setTripData(prev => ({ ...prev, allowPets: checked as boolean }))}
                    />
                    <Label htmlFor="allowPets">Animaux acceptés</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="smokingAllowed"
                      name="smokingAllowed"
                      checked={tripData.smokingAllowed}
                      onCheckedChange={(checked) => setTripData(prev => ({ ...prev, smokingAllowed: checked as boolean }))}
                    />
                    <Label htmlFor="smokingAllowed">Fumeur accepté</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="recurringTrip"
                      name="recurringTrip"
                      checked={tripData.recurringTrip}
                      onCheckedChange={(checked) => setTripData(prev => ({ ...prev, recurringTrip: checked as boolean }))}
                    />
                    <Label htmlFor="recurringTrip">Trajet récurrent</Label>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description (optionnelle)</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Informations supplémentaires sur votre trajet..."
                  value={tripData.description}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Publier mon trajet
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Information */}
        <Card className="mt-6 bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <h4 className="font-semibold text-primary mb-2">Conseils pour un trajet réussi</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Soyez ponctuel et communiquez en cas de retard</li>
              <li>• Respectez les préférences des passagers</li>
              <li>• Maintenez votre véhicule propre et en bon état</li>
              <li>• Soyez courtois et respectueux</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateTrip;
