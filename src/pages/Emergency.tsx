
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, MapPin, Phone, Clock, Wrench, Shield, Car, Users, Zap, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    { value: 'breakdown', label: 'Panne mécanique', icon: Wrench, color: '#ff6b6b' },
    { value: 'accident', label: 'Accident', icon: AlertTriangle, color: '#ff4757' },
    { value: 'flat-tire', label: 'Pneu crevé', icon: Wrench, color: '#ffa502' },
    { value: 'battery', label: 'Batterie déchargée', icon: Zap, color: '#ff6348' },
    { value: 'fuel', label: 'Panne d\'essence', icon: Car, color: '#ff3838' },
    { value: 'other', label: 'Autre urgence', icon: AlertTriangle, color: '#ff4757' },
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
        return <Badge className="bg-orange-500 text-white">En attente</Badge>;
      case 'assigned':
        return <Badge className="bg-blue-500 text-white">Dépanneur assigné</Badge>;
      case 'on-the-way':
        return <Badge className="bg-green-500 text-white">En route</Badge>;
      default:
        return <Badge className="bg-orange-500 text-white">En attente</Badge>;
    }
  };

  if (requestSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a1a13] via-[#0e2233] to-[#1a2a2f] pt-20 p-4">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl">
            <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <AlertTriangle className="mr-2 h-5 w-5 text-orange-400" />
                Demande de dépannage envoyée
              </CardTitle>
            </CardHeader>
              <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                  <span className="font-medium text-white">Statut:</span>
                {getStatusBadge(emergencyStatus)}
              </div>

                <div className="backdrop-blur-xl bg-white/5 p-6 rounded-lg border border-white/10">
                  <h3 className="font-semibold mb-4 text-white">Détails de votre demande</h3>
                  <div className="space-y-3 text-sm text-white/80">
                    <div><strong className="text-white">Type:</strong> {emergencyTypes.find(t => t.value === emergencyData.type)?.label}</div>
                    <div><strong className="text-white">Localisation:</strong> {emergencyData.location}</div>
                    <div><strong className="text-white">Description:</strong> {emergencyData.description}</div>
                    <div><strong className="text-white">Contact:</strong> {emergencyData.phone}</div>
                </div>
              </div>

                <AnimatePresence>
              {emergencyStatus === 'assigned' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="backdrop-blur-xl bg-blue-500/10 p-6 rounded-lg border border-blue-500/20"
                    >
                      <h4 className="font-semibold text-blue-300 mb-3">Dépanneur assigné</h4>
                      <div className="text-sm space-y-2 text-white/80">
                        <div><strong className="text-white">Nom:</strong> Mamadou Diop</div>
                        <div><strong className="text-white">Téléphone:</strong> +221 77 123 45 67</div>
                        <div><strong className="text-white">Temps d'arrivée estimé:</strong> 15-20 minutes</div>
                  </div>
                      <Button 
                        size="sm" 
                        className="mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                        onClick={() => window.location.href = 'tel:+221771234567'}
                      >
                    <Phone className="mr-2 h-4 w-4" />
                    Appeler le dépanneur
                  </Button>
                    </motion.div>
              )}

              {emergencyStatus === 'on-the-way' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="backdrop-blur-xl bg-green-500/10 p-6 rounded-lg border border-green-500/20"
                    >
                      <h4 className="font-semibold text-green-300 mb-3">Dépanneur en route</h4>
                      <div className="text-sm space-y-2 text-white/80">
                        <div><strong className="text-white">Arrivée estimée:</strong> 5-10 minutes</div>
                        <div><strong className="text-white">Véhicule:</strong> Dépanneuse Toyota Hilux (Blanc)</div>
                        <div><strong className="text-white">Immatriculation:</strong> DK-2024-CV</div>
                  </div>
                      <div className="mt-4 p-4 backdrop-blur-xl bg-white/5 rounded border border-white/10">
                        <div className="flex items-center text-sm text-green-300">
                          <Navigation className="h-4 w-4 mr-2" />
                      <span>Suivi en temps réel activé</span>
                    </div>
                  </div>
                    </motion.div>
              )}
                </AnimatePresence>

                <div className="flex space-x-3">
                  <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
                  <Phone className="mr-2 h-4 w-4" />
                  Support client
                </Button>
                  <Button variant="outline" className="flex-1 border-red-500/50 text-red-300 hover:bg-red-500/10">
                  Annuler la demande
                </Button>
              </div>
            </CardContent>
          </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1a13] via-[#0e2233] to-[#1a2a2f] pt-20 p-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold mb-4 text-white">Service de dépannage</h1>
          <p className="text-base text-white/70 max-w-2xl mx-auto">
            Assistance 24h/24 - 7j/7 dans toute la région de Dakar
          </p>
        </motion.div>

        {/* Statistiques rapides */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Dépanneurs actifs', value: 24, icon: Users, color: '#b6ffb0' },
            { label: 'Temps moyen d\'intervention', value: '12 min', icon: Clock, color: '#4ecdc4' },
            { label: 'Couverture', value: '100%', icon: Shield, color: '#45b7d1' },
            { label: 'Satisfaction client', value: '4.9/5', icon: AlertTriangle, color: '#ff6b6b' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <Card className="backdrop-blur-xl bg-white/5 border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 shadow-2xl">
                <CardContent className="pt-6 text-center">
                  <stat.icon className="h-8 w-8 mx-auto mb-2" style={{ color: stat.color }} />
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/70">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl">
          <CardHeader>
              <CardTitle className="flex items-center text-white">
                <AlertTriangle className="mr-2 h-5 w-5 text-red-400" />
              Demander une assistance
            </CardTitle>
              <CardDescription className="text-white/70">
              Service disponible 24h/24 - 7j/7 dans toute la région de Dakar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                  <Label htmlFor="type" className="text-white/90">Type de problème</Label>
                <Select onValueChange={(value) => setEmergencyData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-[#b6ffb0] focus:ring-[#b6ffb0]/20">
                    <SelectValue placeholder="Sélectionnez le type de problème" />
                  </SelectTrigger>
                    <SelectContent className="bg-[#1a2a2f] border-white/20">
                    {emergencyTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value} className="text-white hover:bg-white/10">
                        <div className="flex items-center">
                            <type.icon className="mr-2 h-4 w-4" style={{ color: type.color }} />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                  <Label htmlFor="location" className="text-white/90">Localisation</Label>
                  <div className="flex space-x-3">
                    <div className="relative flex-1">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-[#b6ffb0]" />
                  <Input
                    id="location"
                    name="location"
                    placeholder="Adresse ou coordonnées GPS"
                    value={emergencyData.location}
                    onChange={handleChange}
                        className="pl-12 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#b6ffb0] focus:ring-[#b6ffb0]/20"
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={getCurrentLocation}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                  <Label htmlFor="description" className="text-white/90">Description du problème</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Décrivez votre problème en détail..."
                    value={emergencyData.description}
                    onChange={handleChange}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#b6ffb0] focus:ring-[#b6ffb0]/20"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white/90">Numéro de téléphone</Label>
                <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-[#b6ffb0]" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                      placeholder="Votre numéro de téléphone"
                    value={emergencyData.phone}
                    onChange={handleChange}
                      className="pl-12 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#b6ffb0] focus:ring-[#b6ffb0]/20"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                  <Label htmlFor="urgency" className="text-white/90">Niveau d'urgence</Label>
                <Select onValueChange={(value) => setEmergencyData(prev => ({ ...prev, urgency: value }))}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-[#b6ffb0] focus:ring-[#b6ffb0]/20">
                      <SelectValue placeholder="Sélectionnez le niveau d'urgence" />
                  </SelectTrigger>
                    <SelectContent className="bg-[#1a2a2f] border-white/20">
                      <SelectItem value="low" className="text-white hover:bg-white/10">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                          Faible - Problème mineur
                        </div>
                      </SelectItem>
                      <SelectItem value="medium" className="text-white hover:bg-white/10">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                          Moyen - Problème modéré
                        </div>
                      </SelectItem>
                      <SelectItem value="high" className="text-white hover:bg-white/10">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                          Élevé - Urgence
                        </div>
                      </SelectItem>
                  </SelectContent>
                </Select>
              </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300"
                >
                <AlertTriangle className="mr-2 h-4 w-4" />
                  Demander une assistance
              </Button>
            </form>
          </CardContent>
        </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Emergency;
