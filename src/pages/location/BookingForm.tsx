
import React, { useState } from 'react';
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
    endTime: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    duration: '',
    totalPrice: 0,
  });

  const [showQR, setShowQR] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));

    // Calcul automatique du prix
    if (name === 'startDate' || name === 'endDate' || name === 'startTime' || name === 'endTime') {
      calculatePrice();
    }
  };

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

  return (
    <div className="min-h-screen bg-muted/30 p-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Réserver un véhicule</h1>
        
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
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={bookingData.startDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Heure de début</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="startTime"
                        name="startTime"
                        type="time"
                        value={bookingData.startTime}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Date de fin</Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={bookingData.endDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">Heure de fin</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="endTime"
                        name="endTime"
                        type="time"
                        value={bookingData.endTime}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

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
              </form>
            </CardContent>
          </Card>

          {/* Informations client */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Vos informations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={bookingData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={bookingData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={bookingData.email}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={bookingData.phone}
                      onChange={handleInputChange}
                      className="pl-10"
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

                <Button 
                  onClick={handleSubmit}
                  className="w-full"
                  disabled={!bookingData.firstName || !bookingData.email || bookingData.totalPrice === 0}
                >
                  Confirmer la réservation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
