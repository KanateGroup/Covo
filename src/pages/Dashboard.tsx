
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Car, MapPin, Calendar, Star, User, Phone, Mail, Edit, Trash2, TrendingUp, Users, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

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
        return <Badge className="bg-[#b6ffb0] text-black hover:bg-[#b6ffb0]/90">Actif</Badge>;
      case 'completed':
        return <Badge className="bg-[#4ecdc4] text-black hover:bg-[#4ecdc4]/90">Terminé</Badge>;
      case 'confirmed':
        return <Badge className="bg-[#45b7d1] text-black hover:bg-[#45b7d1]/90">Confirmé</Badge>;
      case 'upcoming':
        return <Badge className="bg-[#ff6b6b] text-white hover:bg-[#ff6b6b]/90">À venir</Badge>;
      default:
        return <Badge className="bg-white/10 text-white border-white/20">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1a13] via-[#0e2233] to-[#1a2a2f] pt-20 p-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl font-bold mb-8 text-white">Mon tableau de bord</h1>
        </motion.div>
        
        {/* Statistiques utilisateur */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Note moyenne', value: `${user.rating}/5`, icon: Star, color: '#b6ffb0' },
            { label: 'Trajets effectués', value: user.totalTrips, icon: Car, color: '#4ecdc4' },
            { label: 'Locations', value: user.totalRentals, icon: MapPin, color: '#45b7d1' },
            { label: 'Économies', value: '45k CFA', icon: CreditCard, color: '#ff6b6b' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="backdrop-blur-xl bg-white/5 border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 shadow-2xl">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                      <p className="text-sm font-medium text-white/70">{stat.label}</p>
                      <p className="text-lg font-bold text-white">{stat.value}</p>
                </div>
                    <stat.icon className="h-8 w-8" style={{ color: stat.color }} />
              </div>
            </CardContent>
          </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
        <Tabs defaultValue="trips" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/5 border-white/10">
              <TabsTrigger value="trips" className="data-[state=active]:bg-[#b6ffb0] data-[state=active]:text-black">Mes trajets</TabsTrigger>
              <TabsTrigger value="bookings" className="data-[state=active]:bg-[#b6ffb0] data-[state=active]:text-black">Mes réservations</TabsTrigger>
              <TabsTrigger value="rentals" className="data-[state=active]:bg-[#b6ffb0] data-[state=active]:text-black">Mes locations</TabsTrigger>
              <TabsTrigger value="profile" className="data-[state=active]:bg-[#b6ffb0] data-[state=active]:text-black">Mon profil</TabsTrigger>
          </TabsList>

          {/* Mes trajets proposés */}
          <TabsContent value="trips" className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Mes trajets proposés</h2>
                <Button className="bg-gradient-to-r from-[#b6ffb0] to-[#4ecdc4] text-black font-semibold hover:from-[#4ecdc4] hover:to-[#b6ffb0] transition-all duration-300">
                  Proposer un trajet
                </Button>
            </div>
            
              {myTrips.map((trip, index) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="backdrop-blur-xl bg-white/5 border-white/10 hover:border-white/20 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                            <MapPin className="h-4 w-4 text-[#b6ffb0] mr-2" />
                            <span className="font-medium text-white">{trip.from} → {trip.to}</span>
                            <div className="ml-2">{getStatusBadge(trip.status)}</div>
                      </div>
                          <div className="grid md:grid-cols-3 gap-4 text-sm text-white/70">
                        <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-[#b6ffb0]" />
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
                          <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <Edit className="h-4 w-4" />
                      </Button>
                          <Button size="sm" variant="outline" className="border-red-500/20 text-red-400 hover:bg-red-500/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
                </motion.div>
            ))}
          </TabsContent>

          {/* Mes réservations */}
          <TabsContent value="bookings" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Mes réservations</h2>
              </div>
            
              {myBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="backdrop-blur-xl bg-white/5 border-white/10 hover:border-white/20 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                            <User className="h-4 w-4 text-[#b6ffb0] mr-2" />
                            <span className="font-medium text-white">{booking.driver}</span>
                            <div className="ml-2">{getStatusBadge(booking.status)}</div>
                        </div>
                          <div className="grid md:grid-cols-3 gap-4 text-sm text-white/70">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1 text-[#b6ffb0]" />
                              {booking.from} → {booking.to}
                      </div>
                        <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-[#b6ffb0]" />
                          {booking.date} à {booking.time}
                        </div>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 mr-1 text-[#b6ffb0]" />
                              {booking.driverRating}/5 - {booking.price} CFA
                            </div>
                          </div>
                        </div>
                  </div>
                </CardContent>
              </Card>
                </motion.div>
            ))}
          </TabsContent>

          {/* Mes locations */}
          <TabsContent value="rentals" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Mes locations</h2>
              </div>
            
              {myRentals.map((rental, index) => (
                <motion.div
                  key={rental.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="backdrop-blur-xl bg-white/5 border-white/10 hover:border-white/20 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                            <Car className="h-4 w-4 text-[#b6ffb0] mr-2" />
                            <span className="font-medium text-white">{rental.vehicle}</span>
                            <div className="ml-2">{getStatusBadge(rental.status)}</div>
                      </div>
                          <div className="grid md:grid-cols-3 gap-4 text-sm text-white/70">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1 text-[#b6ffb0]" />
                              {rental.station}
                      </div>
                        <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-[#b6ffb0]" />
                              {rental.startDate} - {rental.endDate}
                        </div>
                            <div className="flex items-center">
                              <CreditCard className="h-4 w-4 mr-1 text-[#b6ffb0]" />
                          {rental.total} CFA
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
                </motion.div>
            ))}
          </TabsContent>

          {/* Mon profil */}
            <TabsContent value="profile" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Mon profil</h2>
                <Button className="bg-gradient-to-r from-[#b6ffb0] to-[#4ecdc4] text-black font-semibold hover:from-[#4ecdc4] hover:to-[#b6ffb0] transition-all duration-300">
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
              </div>
              
              <Card className="backdrop-blur-xl bg-white/5 border-white/10">
                <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-[#b6ffb0] mr-3" />
                        <div>
                          <p className="text-sm text-white/70">Nom complet</p>
                          <p className="text-white font-medium">{user.firstName} {user.lastName}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-[#b6ffb0] mr-3" />
                        <div>
                          <p className="text-sm text-white/70">Email</p>
                          <p className="text-white font-medium">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-[#b6ffb0] mr-3" />
                        <div>
                          <p className="text-sm text-white/70">Téléphone</p>
                          <p className="text-white font-medium">{user.phone}</p>
                        </div>
                      </div>
                    </div>
                  <div className="space-y-4">
                        <div className="flex items-center">
                        <Star className="h-5 w-5 text-[#b6ffb0] mr-3" />
                        <div>
                          <p className="text-sm text-white/70">Note moyenne</p>
                          <p className="text-white font-medium">{user.rating}/5</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Car className="h-5 w-5 text-[#b6ffb0] mr-3" />
                        <div>
                          <p className="text-sm text-white/70">Trajets effectués</p>
                          <p className="text-white font-medium">{user.totalTrips}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-[#b6ffb0] mr-3" />
                        <div>
                          <p className="text-sm text-white/70">Locations</p>
                          <p className="text-white font-medium">{user.totalRentals}</p>
                      </div>
                      </div>
                    </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
