
import React, { useState } from 'react';
<<<<<<< HEAD
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
=======
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, User, Phone, Mail, CreditCard } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const BookingForm = () => {
  const [bookingData, setBookingData] = useState({
    vehicleType: 'car',
    vehicleName: 'Renault Clio',
    pickupStation: 'Station Plateau',
    returnStation: 'Station Plateau',
    startDate: '',
    endDate: '',
    startTime: '',
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
    endTime: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
<<<<<<< HEAD
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
=======
    duration: '',
    totalPrice: 0,
  });

  const [showQR, setShowQR] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
      ...prev,
      [name]: value
    }));

<<<<<<< HEAD
    // Recalculer le prix si les champs de date/heure changent
    if (['vehicleType', 'startDate', 'startTime', 'endDate', 'endTime'].includes(name)) {
=======
    // Calcul automatique du prix
    if (name === 'startDate' || name === 'endDate' || name === 'startTime' || name === 'endTime') {
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
      calculatePrice();
    }
  };

<<<<<<< HEAD
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

=======
  const calculatePrice = () => {
    // Simulation de calcul de prix
    const baseRate = bookingData.vehicleType === 'car' ? 1500 : 
                    bookingData.vehicleType === 'scooter' ? 800 : 500;
    const hours = 2; // Simplifié pour la démo
    setBookingData(prev => ({ ...prev, totalPrice: baseRate * hours }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Génération d'un ID de réservation
    const newBookingId = `COVO-${Date.now()}`;
    setBookingId(newBookingId);
    setShowQR(true);
    console.log('Réservation créée:', { ...bookingData, bookingId: newBookingId });
  };

  const qrData = JSON.stringify({
    bookingId,
    vehicleType: bookingData.vehicleType,
    vehicleName: bookingData.vehicleName,
    pickupStation: bookingData.pickupStation,
    customer: `${bookingData.firstName} ${bookingData.lastName}`,
    phone: bookingData.phone,
    startDate: bookingData.startDate,
    startTime: bookingData.startTime,
    totalPrice: bookingData.totalPrice,
    status: 'confirmed'
  });

  if (showQR) {
    return (
      <div className="min-h-screen bg-muted/30 p-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="shadow-lg">
            <CardHeader className="text-center bg-primary text-primary-foreground">
              <CardTitle className="text-2xl">Réservation confirmée !</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Voici votre QR code de réservation
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <div className="bg-white p-6 rounded-lg inline-block shadow-inner mb-6">
                <QRCodeSVG 
                  value={qrData}
                  size={200}
                  level="M"
                  includeMargin={true}
                />
              </div>
              
              <div className="space-y-4 text-left bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Détails de votre réservation</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">ID Réservation:</span>
                    <p className="text-primary font-mono">{bookingId}</p>
                  </div>
                  <div>
                    <span className="font-medium">Véhicule:</span>
                    <p>{bookingData.vehicleName}</p>
                  </div>
                  <div>
                    <span className="font-medium">Station:</span>
                    <p>{bookingData.pickupStation}</p>
                  </div>
                  <div>
                    <span className="font-medium">Prix total:</span>
                    <p className="text-primary font-semibold">{bookingData.totalPrice} CFA</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Instructions:</strong> Présentez ce QR code à l'agent de la station pour récupérer votre véhicule.
                </p>
                <Badge variant="default" className="text-xs">
                  QR Code valide 24h
                </Badge>
              </div>

              <div className="flex gap-4 mt-6">
                <Button 
                  onClick={() => setShowQR(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Nouvelle réservation
                </Button>
                <Button 
                  onClick={() => window.print()}
                  className="flex-1"
                >
                  Imprimer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
  return (
    <div className="min-h-screen bg-muted/30 p-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Réserver un véhicule</h1>
        
<<<<<<< HEAD
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
        
=======
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
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
<<<<<<< HEAD
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
=======
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicleType">Type de véhicule</Label>
                    <select
                      id="vehicleType"
                      name="vehicleType"
                      value={bookingData.vehicleType}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      required
                    >
                      <option value="car">Voiture</option>
                      <option value="scooter">Scooter</option>
                      <option value="electric">Trottinette électrique</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleName">Modèle</Label>
                    <Input
                      id="vehicleName"
                      name="vehicleName"
                      value={bookingData.vehicleName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pickupStation">Station de retrait</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <select
                      id="pickupStation"
                      name="pickupStation"
                      value={bookingData.pickupStation}
                      onChange={handleInputChange}
                      className="w-full p-2 pl-10 border rounded-md"
                      required
                    >
                      <option value="Station Plateau">Station Plateau</option>
                      <option value="Station Almadies">Station Almadies</option>
                      <option value="Station Université">Station Université</option>
                      <option value="Station Médina">Station Médina</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Date de début</Label>
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
<<<<<<< HEAD
                      value={formData.startDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
=======
                      value={bookingData.startDate}
                      onChange={handleInputChange}
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
                      required
                    />
                  </div>
                  <div className="space-y-2">
<<<<<<< HEAD
                    <Label htmlFor="startTime">Heure de début *</Label>
=======
                    <Label htmlFor="startTime">Heure de début</Label>
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="startTime"
                        name="startTime"
                        type="time"
<<<<<<< HEAD
                        value={formData.startTime}
=======
                        value={bookingData.startTime}
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
<<<<<<< HEAD
                    <Label htmlFor="endDate">Date de fin *</Label>
=======
                    <Label htmlFor="endDate">Date de fin</Label>
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
<<<<<<< HEAD
                      value={formData.endDate}
                      onChange={handleInputChange}
                      min={formData.startDate || new Date().toISOString().split('T')[0]}
=======
                      value={bookingData.endDate}
                      onChange={handleInputChange}
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
                      required
                    />
                  </div>
                  <div className="space-y-2">
<<<<<<< HEAD
                    <Label htmlFor="endTime">Heure de fin *</Label>
=======
                    <Label htmlFor="endTime">Heure de fin</Label>
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="endTime"
                        name="endTime"
                        type="time"
<<<<<<< HEAD
                        value={formData.endTime}
=======
                        value={bookingData.endTime}
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

<<<<<<< HEAD
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
=======
                <Button type="button" onClick={calculatePrice} variant="outline" className="w-full">
                  Calculer le prix
                </Button>

                {bookingData.totalPrice > 0 && (
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-lg font-semibold text-primary">
                      Prix total: {bookingData.totalPrice} CFA
                    </p>
                  </div>
                )}
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
              </form>
            </CardContent>
          </Card>

          {/* Informations client */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
<<<<<<< HEAD
                Vos coordonnées
=======
                Vos informations
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
<<<<<<< HEAD
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
=======
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={bookingData.firstName}
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
<<<<<<< HEAD
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
=======
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={bookingData.lastName}
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
<<<<<<< HEAD
                  <Label htmlFor="email">Email *</Label>
=======
                  <Label htmlFor="email">Email</Label>
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
<<<<<<< HEAD
                      value={formData.email}
=======
                      value={bookingData.email}
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
<<<<<<< HEAD
                  <Label htmlFor="phone">Téléphone *</Label>
=======
                  <Label htmlFor="phone">Téléphone</Label>
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
<<<<<<< HEAD
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="+221 77 123 45 67"
=======
                      value={bookingData.phone}
                      onChange={handleInputChange}
                      className="pl-10"
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
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

<<<<<<< HEAD
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
=======
                <Button 
                  onClick={handleSubmit}
                  className="w-full"
                  disabled={!bookingData.firstName || !bookingData.email || bookingData.totalPrice === 0}
                >
                  Confirmer la réservation
                </Button>
>>>>>>> 7c9efa47a3e67421cce26e773fe75c432e371e10
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
