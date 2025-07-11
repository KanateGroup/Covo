
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Car, MapPin, Calendar, Star, User, Phone, Mail, Edit, Trash2 } from 'lucide-react';

const Dashboard = () => {
  const [user] = useState({
    firstName: 'Amadou',
    lastName: 'Diallo',
    email: 'amadou.diallo@email.com',
    phone: '+221 77 123 45 67',
    rating: 4.8,
    totalTrips: 24,
    totalRentals: 8,
  });

  // Mock data pour les trajets proposés
  const myTrips = [
    {
      id: 1,
      from: 'Dakar',
      to: 'Thiès',
      date: '2024-01-15',
      time: '08:00',
      seats: 3,
      price: 2500,
      status: 'active',
      bookings: 2,
    },
    {
      id: 2,
      from: 'Thiès',
      to: 'Dakar',
      date: '2024-01-16',
      time: '17:00',
      seats: 4,
      price: 2500,
      status: 'completed',
      bookings: 4,
    },
  ];

  // Mock data pour les réservations de covoiturage
  const myBookings = [
    {
      id: 1,
      driver: 'Fatou Sow',
      from: 'Dakar',
      to: 'Saint-Louis',
      date: '2024-01-20',
      time: '09:00',
      price: 5000,
      status: 'confirmed',
      driverRating: 4.9,
    },
    {
      id: 2,
      driver: 'Moussa Ba',
      from: 'Saint-Louis',
      to: 'Dakar',
      date: '2024-01-22',
      time: '15:00',
      price: 5000,
      status: 'completed',
      driverRating: 4.7,
    },
  ];

  // Mock data pour les locations
  const myRentals = [
    {
      id: 1,
      vehicle: 'Renault Clio',
      station: 'Station Plateau',
      startDate: '2024-01-18',
      endDate: '2024-01-19',
      status: 'completed',
      total: 15000,
    },
    {
      id: 2,
      vehicle: 'Yamaha NMAX',
      station: 'Station Almadies',
      startDate: '2024-01-25',
      endDate: '2024-01-25',
      status: 'upcoming',
      total: 6000,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Actif</Badge>;
      case 'completed':
        return <Badge variant="secondary">Terminé</Badge>;
      case 'confirmed':
        return <Badge variant="default">Confirmé</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-500 hover:bg-blue-600">À venir</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 p-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Mon tableau de bord</h1>
        
        {/* Statistiques utilisateur */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Note moyenne</p>
                  <p className="text-2xl font-bold">{user.rating}/5</p>
                </div>
                <Star className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Trajets effectués</p>
                  <p className="text-2xl font-bold">{user.totalTrips}</p>
                </div>
                <Car className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Locations</p>
                  <p className="text-2xl font-bold">{user.totalRentals}</p>
                </div>
                <MapPin className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Économies</p>
                  <p className="text-2xl font-bold">45k CFA</p>
                </div>
                <div className="text-green-500 text-2xl font-bold">💰</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="trips" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="trips">Mes trajets</TabsTrigger>
            <TabsTrigger value="bookings">Mes réservations</TabsTrigger>
            <TabsTrigger value="rentals">Mes locations</TabsTrigger>
            <TabsTrigger value="profile">Mon profil</TabsTrigger>
          </TabsList>

          {/* Mes trajets proposés */}
          <TabsContent value="trips" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Mes trajets proposés</h2>
              <Button>Proposer un trajet</Button>
            </div>
            
            {myTrips.map((trip) => (
              <Card key={trip.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="font-medium">{trip.from} → {trip.to}</span>
                        {getStatusBadge(trip.status)}
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {trip.date} à {trip.time}
                        </div>
                        <div>
                          {trip.seats} places - {trip.price} CFA/pers
                        </div>
                        <div>
                          {trip.bookings} réservation(s)
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Mes réservations */}
          <TabsContent value="bookings" className="space-y-4">
            <h2 className="text-2xl font-semibold">Mes réservations de covoiturage</h2>
            
            {myBookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <User className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="font-medium">Conducteur: {booking.driver}</span>
                        <div className="flex items-center ml-4">
                          <Star className="h-4 w-4 text-secondary fill-current mr-1" />
                          <span className="text-sm">{booking.driverRating}</span>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>
                      <div className="flex items-center mb-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                        <span>{booking.from} → {booking.to}</span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {booking.date} à {booking.time}
                        </div>
                        <div className="font-medium text-primary">
                          {booking.price} CFA
                        </div>
                      </div>
                    </div>
                    {booking.status === 'completed' && (
                      <Button size="sm" variant="outline">
                        Noter le trajet
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Mes locations */}
          <TabsContent value="rentals" className="space-y-4">
            <h2 className="text-2xl font-semibold">Mes locations de véhicules</h2>
            
            {myRentals.map((rental) => (
              <Card key={rental.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Car className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="font-medium">{rental.vehicle}</span>
                        {getStatusBadge(rental.status)}
                      </div>
                      <div className="flex items-center mb-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                        <span>{rental.station}</span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Du {rental.startDate} au {rental.endDate}
                        </div>
                        <div className="font-medium text-primary">
                          {rental.total} CFA
                        </div>
                      </div>
                    </div>
                    {rental.status === 'upcoming' && (
                      <Button size="sm" variant="outline">
                        Voir QR Code
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Mon profil */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Mon profil</CardTitle>
                <CardDescription>
                  Gérez vos informations personnelles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Informations personnelles</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-muted-foreground mr-3" />
                        <div>
                          <p className="font-medium">{user.firstName} {user.lastName}</p>
                          <p className="text-sm text-muted-foreground">Nom complet</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-muted-foreground mr-3" />
                        <div>
                          <p className="font-medium">{user.email}</p>
                          <p className="text-sm text-muted-foreground">Adresse email</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-muted-foreground mr-3" />
                        <div>
                          <p className="font-medium">{user.phone}</p>
                          <p className="text-sm text-muted-foreground">Numéro de téléphone</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Statistiques</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Note moyenne</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-secondary fill-current mr-1" />
                          <span className="font-medium">{user.rating}/5</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Trajets proposés</span>
                        <span className="font-medium">{myTrips.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Réservations</span>
                        <span className="font-medium">{myBookings.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Locations</span>
                        <span className="font-medium">{myRentals.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Button>Modifier le profil</Button>
                  <Button variant="outline">Changer le mot de passe</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
