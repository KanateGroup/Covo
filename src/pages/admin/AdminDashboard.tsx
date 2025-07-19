
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Car, 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Eye,
  Edit,
  Trash2,
  BarChart3
} from 'lucide-react';

const AdminDashboard = () => {
  // Statistiques globales
  const stats = {
    totalUsers: 1247,
    totalTrips: 892,
    totalRentals: 345,
    totalRevenue: 2150000,
    monthlyGrowth: {
      users: 12.5,
      trips: 8.3,
      rentals: 15.7,
      revenue: 22.1,
    }
  };

  // Mock data pour les utilisateurs
  const users = [
    {
      id: 1,
      name: 'Amadou Diallo',
      email: 'amadou.diallo@email.com',
      phone: '+221 77 123 45 67',
      joinDate: '2024-01-10',
      status: 'active',
      tripsCount: 5,
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Fatou Sow',
      email: 'fatou.sow@email.com',
      phone: '+221 77 234 56 78',
      joinDate: '2024-01-08',
      status: 'active',
      tripsCount: 12,
      rating: 4.9,
    },
    {
      id: 3,
      name: 'Moussa Ba',
      email: 'moussa.ba@email.com',
      phone: '+221 77 345 67 89',
      joinDate: '2024-01-05',
      status: 'suspended',
      tripsCount: 3,
      rating: 3.2,
    },
  ];

  // Mock data pour les trajets
  const trips = [
    {
      id: 1,
      driver: 'Amadou Diallo',
      from: 'Dakar',
      to: 'Thiès',
      date: '2024-01-15',
      seats: 3,
      price: 2500,
      status: 'active',
      bookings: 2,
    },
    {
      id: 2,
      driver: 'Fatou Sow',
      from: 'Dakar',
      to: 'Saint-Louis',
      date: '2024-01-16',
      seats: 4,
      price: 5000,
      status: 'completed',
      bookings: 4,
    },
  ];

  // Mock data pour les locations
  const rentals = [
    {
      id: 1,
      user: 'Moussa Ba',
      vehicle: 'Renault Clio',
      station: 'Station Plateau',
      startDate: '2024-01-18',
      endDate: '2024-01-19',
      status: 'completed',
      total: 15000,
    },
    {
      id: 2,
      user: 'Aïcha Diop',
      vehicle: 'Yamaha NMAX',
      station: 'Station Almadies',
      startDate: '2024-01-20',
      endDate: '2024-01-20',
      status: 'active',
      total: 6000,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Actif</Badge>;
      case 'completed':
        return <Badge variant="secondary">Terminé</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Suspendu</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getGrowthIcon = (growth: number) => {
    return growth > 0 ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1a13] via-[#0e2233] to-[#1a2a2f] pt-20 p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Administration COVO</h1>
          <Button>
            <BarChart3 className="mr-2 h-4 w-4" />
            Rapport complet
          </Button>
        </div>
        
        {/* Statistiques principales */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Utilisateurs</p>
                  <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    {getGrowthIcon(stats.monthlyGrowth.users)}
                    <span className="text-sm text-green-600 ml-1">
                      +{stats.monthlyGrowth.users}%
                    </span>
                  </div>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Trajets</p>
                  <p className="text-2xl font-bold">{stats.totalTrips}</p>
                  <div className="flex items-center mt-1">
                    {getGrowthIcon(stats.monthlyGrowth.trips)}
                    <span className="text-sm text-green-600 ml-1">
                      +{stats.monthlyGrowth.trips}%
                    </span>
                  </div>
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
                  <p className="text-2xl font-bold">{stats.totalRentals}</p>
                  <div className="flex items-center mt-1">
                    {getGrowthIcon(stats.monthlyGrowth.rentals)}
                    <span className="text-sm text-green-600 ml-1">
                      +{stats.monthlyGrowth.rentals}%
                    </span>
                  </div>
                </div>
                <MapPin className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Revenus</p>
                  <p className="text-2xl font-bold">{(stats.totalRevenue / 1000000).toFixed(1)}M CFA</p>
                  <div className="flex items-center mt-1">
                    {getGrowthIcon(stats.monthlyGrowth.revenue)}
                    <span className="text-sm text-green-600 ml-1">
                      +{stats.monthlyGrowth.revenue}%
                    </span>
                  </div>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Graphiques */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Évolution mensuelle</CardTitle>
            <CardDescription>
              Graphiques des performances par mois
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">
                Graphiques Chart.js ou Recharts
                <br />
                (Intégration des données de performance)
              </p>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="trips">Trajets</TabsTrigger>
            <TabsTrigger value="rentals">Locations</TabsTrigger>
            <TabsTrigger value="payments">Paiements</TabsTrigger>
          </TabsList>

          {/* Gestion des utilisateurs */}
          <TabsContent value="users" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Gestion des utilisateurs</h2>
              <Button>Ajouter un utilisateur</Button>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="font-semibold mr-3">{user.name}</h3>
                          {getStatusBadge(user.status)}
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <div>{user.email}</div>
                          <div>{user.phone}</div>
                          <div>Inscrit le {user.joinDate}</div>
                        </div>
                        <div className="flex items-center mt-2 text-sm">
                          <span className="mr-4">{user.tripsCount} trajets</span>
                          <span>Note: {user.rating}/5</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gestion des trajets */}
          <TabsContent value="trips" className="space-y-4">
            <h2 className="text-2xl font-semibold">Gestion des trajets</h2>
            
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {trips.map((trip) => (
                    <div key={trip.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="font-semibold mr-3">{trip.from} → {trip.to}</h3>
                          {getStatusBadge(trip.status)}
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <div>Conducteur: {trip.driver}</div>
                          <div>Date: {trip.date}</div>
                          <div>{trip.price} CFA/personne</div>
                        </div>
                        <div className="flex items-center mt-2 text-sm">
                          <span className="mr-4">{trip.seats} places</span>
                          <span>{trip.bookings} réservations</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gestion des locations */}
          <TabsContent value="rentals" className="space-y-4">
            <h2 className="text-2xl font-semibold">Gestion des locations</h2>
            
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {rentals.map((rental) => (
                    <div key={rental.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="font-semibold mr-3">{rental.vehicle}</h3>
                          {getStatusBadge(rental.status)}
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <div>Client: {rental.user}</div>
                          <div>Station: {rental.station}</div>
                          <div>{rental.total} CFA</div>
                        </div>
                        <div className="text-sm mt-2">
                          Du {rental.startDate} au {rental.endDate}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gestion des paiements */}
          <TabsContent value="payments" className="space-y-4">
            <h2 className="text-2xl font-semibold">Gestion des paiements</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Paiements du jour</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">125,000 CFA</div>
                  <p className="text-sm text-muted-foreground">23 transactions</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Paiements en attente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">45,000 CFA</div>
                  <p className="text-sm text-muted-foreground">8 transactions</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Commissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">18,750 CFA</div>
                  <p className="text-sm text-muted-foreground">15% des revenus</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Historique des paiements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-muted/50 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Tableau détaillé des transactions
                    <br />
                    (Intégration avec les systèmes de paiement)
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
