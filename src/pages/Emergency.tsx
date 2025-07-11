
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, AlertTriangle, MapPin, Phone, Clock, Wrench } from 'lucide-react';

const Emergency = () => {
  const [emergencyData, setEmergencyData] = useState({
    type: '',
    location: '',
    description: '',
    phone: '',
    urgency: '',
  });

  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [emergencyStatus, setEmergencyStatus] = useState('pending');

  const emergencyTypes = [
    { value: 'breakdown', label: 'Panne mécanique', icon: Wrench },
    { value: 'accident', label: 'Accident', icon: AlertTriangle },
    { value: 'flat-tire', label: 'Pneu crevé', icon: Wrench },
    { value: 'battery', label: 'Batterie déchargée', icon: Wrench },
    { value: 'fuel', label: 'Panne d\'essence', icon: Wrench },
    { value: 'other', label: 'Autre urgence', icon: AlertTriangle },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Demande de dépannage:', emergencyData);
    setRequestSubmitted(true);
    // Simulation du statut de la demande
    setTimeout(() => setEmergencyStatus('assigned'), 3000);
    setTimeout(() => setEmergencyStatus('on-the-way'), 8000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmergencyData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setEmergencyData(prev => ({
            ...prev,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          }));
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error);
        }
      );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">En attente</Badge>;
      case 'assigned':
        return <Badge variant="default">Dépanneur assigné</Badge>;
      case 'on-the-way':
        return <Badge className="bg-green-600">En route</Badge>;
      default:
        return <Badge variant="secondary">En attente</Badge>;
    }
  };

  if (requestSubmitted) {
    return (
      <div className="min-h-screen bg-muted/30 p-4">
        <div className="container mx-auto max-w-2xl">
          <div className="flex items-center mb-6">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à l'accueil
              </Button>
            </Link>
          </div>

          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-800">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Demande de dépannage envoyée
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Statut:</span>
                {getStatusBadge(emergencyStatus)}
              </div>

              <div className="bg-white p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">Détails de votre demande</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Type:</strong> {emergencyTypes.find(t => t.value === emergencyData.type)?.label}</div>
                  <div><strong>Localisation:</strong> {emergencyData.location}</div>
                  <div><strong>Description:</strong> {emergencyData.description}</div>
                  <div><strong>Contact:</strong> {emergencyData.phone}</div>
                </div>
              </div>

              {emergencyStatus === 'assigned' && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Dépanneur assigné</h4>
                  <div className="text-sm space-y-1">
                    <div><strong>Nom:</strong> Mamadou Diop</div>
                    <div><strong>Téléphone:</strong> +221 77 123 45 67</div>
                    <div><strong>Temps d'arrivée estimé:</strong> 15-20 minutes</div>
                  </div>
                  <Button size="sm" className="mt-3" onClick={() => window.location.href = 'tel:+221771234567'}>
                    <Phone className="mr-2 h-4 w-4" />
                    Appeler le dépanneur
                  </Button>
                </div>
              )}

              {emergencyStatus === 'on-the-way' && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Dépanneur en route</h4>
                  <div className="text-sm space-y-1">
                    <div><strong>Arrivée estimée:</strong> 5-10 minutes</div>
                    <div><strong>Véhicule:</strong> Dépanneuse Toyota Hilux (Blanc)</div>
                    <div><strong>Immatriculation:</strong> DK-2024-CV</div>
                  </div>
                  <div className="mt-3 p-3 bg-white rounded border">
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-1 text-green-600" />
                      <span>Suivi en temps réel activé</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  <Phone className="mr-2 h-4 w-4" />
                  Support client
                </Button>
                <Button variant="outline" className="flex-1">
                  Annuler la demande
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
      <div className="container mx-auto max-w-2xl">
        <div className="flex items-center mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8 text-center">Service de dépannage</h1>

        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center text-red-800">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Demander une assistance
            </CardTitle>
            <CardDescription className="text-red-600">
              Service disponible 24h/24 - 7j/7 dans toute la région de Dakar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="type">Type de problème</Label>
                <Select onValueChange={(value) => setEmergencyData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le type de problème" />
                  </SelectTrigger>
                  <SelectContent>
                    {emergencyTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center">
                          <type.icon className="mr-2 h-4 w-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Localisation</Label>
                <div className="flex space-x-2">
                  <Input
                    id="location"
                    name="location"
                    placeholder="Adresse ou coordonnées GPS"
                    value={emergencyData.location}
                    onChange={handleChange}
                    className="flex-1"
                    required
                  />
                  <Button type="button" onClick={getCurrentLocation} size="sm">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Numéro de téléphone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="77 123 45 67"
                    value={emergencyData.phone}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency">Niveau d'urgence</Label>
                <Select onValueChange={(value) => setEmergencyData(prev => ({ ...prev, urgency: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Évaluez l'urgence de la situation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Faible - Pas pressé</SelectItem>
                    <SelectItem value="medium">Moyen - Dans l'heure</SelectItem>
                    <SelectItem value="high">Élevé - Urgent</SelectItem>
                    <SelectItem value="critical">Critique - Immédiat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description du problème</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Décrivez en détail votre problème pour nous aider à mieux vous assister..."
                  value={emergencyData.description}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Envoyer la demande de dépannage
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Temps de réponse estimé
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800">Faible</h4>
                <p className="text-sm text-green-600">30-60 minutes</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800">Moyen</h4>
                <p className="text-sm text-yellow-600">15-30 minutes</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800">Élevé/Critique</h4>
                <p className="text-sm text-red-600">5-15 minutes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Informations importantes</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Restez près de votre véhicule et activez vos feux de détresse</li>
              <li>• Ayez vos papiers du véhicule à portée de main</li>
              <li>• Le tarif de base est de 5 000 FCFA + frais selon l'intervention</li>
              <li>• Paiement en espèces ou par mobile money</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Emergency;
