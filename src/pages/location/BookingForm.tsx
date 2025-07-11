
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, MapPin, Clock, User, Phone, Mail, CreditCard, Car, Bike, Zap } from 'lucide-react';

const BookingForm = () => {
  const navigate = useNavigate();
  
  // Récupérer les données du véhicule sélectionné
  const selectedVehicle = JSON.parse(localStorage.getItem('selectedVehicle') || '{}');
  
  // État du formulaire avec pré-remplissage
  const [formData, setFormData] = useState({
    vehicleType: selectedVehicle.vehicleType || '',
    pickupStation: selectedVehicle.pickupStation || '',
    returnStation: selectedVehicle.returnStation || '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    totalPrice: 0
  });

  // Types de véhicules disponibles avec prix
  const vehicleTypes = [
    { value: 'trottinette', label: 'Trottinette électrique', price: 500 },
    { value: 'scooter', label: 'Scooter', price: 800 },
    { value: 'voiture', label: 'Voiture', price: 1500 },
    { value: 'tricycle', label: 'Tricycle', price: 600 },
    { value: 'jetski', label: 'Jetski', price: 2500 }
  ];

  // Stations disponibles
  const stations = [
    'Station Plateau',
    'Station Almadies', 
    'Station Université',
    'Station Médina',
    'Station Yoff',
    'Station Ouakam'
  ];

  // Pré-remplir le formulaire si un véhicule a été sélectionné
  React.useEffect(() => {
    if (selectedVehicle.vehicleType) {
      console.log('🚗 Véhicule pré-sélectionné détecté:', selectedVehicle); // Debug
      
      // Trouver le prix du véhicule sélectionné
      const vehicle = vehicleTypes.find(v => v.value === selectedVehicle.vehicleType);
      const price = vehicle ? vehicle.price : selectedVehicle.vehiclePrice || 0;
      
      setFormData(prev => ({
        ...prev,
        vehicleType: selectedVehicle.vehicleType,
        pickupStation: selectedVehicle.pickupStation,
        returnStation: selectedVehicle.returnStation,
        totalPrice: price
      }));
      
      console.log('✅ Formulaire pré-rempli avec les données du véhicule'); // Debug
    }
  }, [selectedVehicle.vehicleType]);

  // Gestion des changements de champs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(`Champ ${name} modifié:`, value); // Debug
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Recalculer le prix si les champs de date/heure changent
    if (['vehicleType', 'startDate', 'startTime', 'endDate', 'endTime'].includes(name)) {
      calculatePrice();
    }
  };

  // Calcul automatique du prix
  const calculatePrice = () => {
    if (!formData.vehicleType || !formData.startDate || !formData.endDate || !formData.startTime || !formData.endTime) {
      return;
    }

    const vehicle = vehicleTypes.find(v => v.value === formData.vehicleType);
    if (!vehicle) return;

    const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);
    
    if (startDateTime >= endDateTime) {
      setFormData(prev => ({ ...prev, totalPrice: 0 }));
      return;
    }

    const diffMs = endDateTime.getTime() - startDateTime.getTime();
    const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
    
    const totalPrice = vehicle.price * diffHours;
    console.log(`Prix calculé: ${totalPrice} CFA pour ${diffHours} heures`); // Debug
    
    setFormData(prev => ({ ...prev, totalPrice }));
  };

  // Validation du formulaire
  const isFormValid = () => {
    const required = [
      'vehicleType', 'pickupStation', 'returnStation', 
      'startDate', 'endDate', 'startTime', 'endTime',
      'firstName', 'lastName', 'email', 'phone'
    ];
    
    const isValid = required.every(field => formData[field as keyof typeof formData]) && formData.totalPrice > 0;
    console.log('Formulaire valide:', isValid); // Debug
    return isValid;
  };

  // Soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('=== DÉBUT SOUMISSION FORMULAIRE ==='); // Debug
    
    // Validation complète
    if (!isFormValid()) {
      console.log('❌ Validation échouée - champs manquants'); // Debug
      alert('Veuillez remplir tous les champs obligatoires et vérifier les dates.');
      return;
    }

    console.log('✅ Validation réussie'); // Debug

    // Génération d'un ID unique
    const bookingId = `COVO-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    console.log('ID de réservation généré:', bookingId); // Debug

    // Création de l'objet réservation
    const reservation = {
      bookingId,
      vehicleType: formData.vehicleType,
      vehicleLabel: vehicleTypes.find(v => v.value === formData.vehicleType)?.label || '',
      pickupStation: formData.pickupStation,
      returnStation: formData.returnStation,
      startDate: formData.startDate,
      startTime: formData.startTime,
      endDate: formData.endDate,
      endTime: formData.endTime,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      totalPrice: formData.totalPrice,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    console.log('📋 Réservation créée:', reservation); // Debug

    // Sauvegarde temporaire (mode fallback)
    localStorage.setItem('currentReservation', JSON.stringify(reservation));
    console.log('💾 Réservation sauvegardée dans localStorage'); // Debug

    // Nettoyer les données du véhicule sélectionné
    localStorage.removeItem('selectedVehicle');
    console.log('🧹 Données véhicule nettoyées'); // Debug

    // Navigation vers la page de confirmation
    console.log('🚀 Redirection vers /location/confirmation'); // Debug
    navigate('/location/confirmation', { 
      state: { reservation } 
    });
  };

  return (
    <div className="min-h-screen bg-muted/30 p-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Réserver un véhicule</h1>
        
        {/* Indicateur de véhicule pré-sélectionné */}
        {selectedVehicle.vehicleType && (
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold text-green-800">
                      Véhicule pré-sélectionné : {vehicleTypes.find(v => v.value === selectedVehicle.vehicleType)?.label}
                    </p>
                    <p className="text-sm text-green-600">
                      Station : {selectedVehicle.pickupStation}
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    localStorage.removeItem('selectedVehicle');
                    window.location.reload();
                  }}
                >
                  Changer de véhicule
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulaire de réservation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Détails de la réservation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Type de véhicule */}
                <div className="space-y-2">
                  <Label htmlFor="vehicleType">Type de véhicule *</Label>
                  <select
                    id="vehicleType"
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Sélectionnez un véhicule</option>
                    {vehicleTypes.map((vehicle) => (
                      <option key={vehicle.value} value={vehicle.value}>
                        {vehicle.label} - {vehicle.price} CFA/h
                      </option>
                    ))}
                  </select>
                </div>

                {/* Stations */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickupStation">Station de retrait *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <select
                        id="pickupStation"
                        name="pickupStation"
                        value={formData.pickupStation}
                        onChange={handleInputChange}
                        className="w-full p-3 pl-10 border rounded-md focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="">Sélectionnez une station</option>
                        {stations.map((station) => (
                          <option key={station} value={station}>{station}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="returnStation">Station de retour *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <select
                        id="returnStation"
                        name="returnStation"
                        value={formData.returnStation}
                        onChange={handleInputChange}
                        className="w-full p-3 pl-10 border rounded-md focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="">Sélectionnez une station</option>
                        {stations.map((station) => (
                          <option key={station} value={station}>{station}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Dates et heures */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Date de début *</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Heure de début *</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="startTime"
                        name="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Date de fin *</Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      min={formData.startDate || new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">Heure de fin *</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="endTime"
                        name="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Calcul du prix */}
                {formData.totalPrice > 0 && (
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-lg font-semibold text-primary">
                      Prix total: {formData.totalPrice} CFA
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {(() => {
                        const start = new Date(`${formData.startDate}T${formData.startTime}`);
                        const end = new Date(`${formData.endDate}T${formData.endTime}`);
                        const hours = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60));
                        return `${hours} heure(s) de location`;
                      })()}
                    </p>
                  </div>
                )}

                {/* Bouton de soumission */}
                <Button 
                  type="submit"
                  className="w-full"
                  disabled={!isFormValid()}
                >
                  Valider ma réservation
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Informations client */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Vos coordonnées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="+221 77 123 45 67"
                      required
                    />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Mode de paiement
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="payment" value="mobile" className="mr-2" defaultChecked />
                      Mobile Money (Wave, Orange Money)
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="payment" value="card" className="mr-2" />
                      Carte bancaire
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="payment" value="cash" className="mr-2" />
                      Espèces à la station
                    </label>
                  </div>
                </div>

                {/* Indicateur de validation */}
                <div className="p-3 rounded-lg text-sm">
                  {isFormValid() ? (
                    <div className="text-green-600 bg-green-50 p-2 rounded">
                      ✅ Formulaire complet - Prêt à valider
                    </div>
                  ) : (
                    <div className="text-orange-600 bg-orange-50 p-2 rounded">
                      ⚠️ Veuillez remplir tous les champs obligatoires
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
