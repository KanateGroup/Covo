
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Car, Bike, Zap, MapPin, Clock, DollarSign, Filter, Search, Star, Users, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import QRCode from 'react-qr-code';
import { useRef } from 'react';

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
      rating: 4.8,
      reviews: 124,
      distance: '0.2 km',
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
      rating: 4.6,
      reviews: 89,
      distance: '0.5 km',
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
      rating: 4.9,
      reviews: 256,
      distance: '0.8 km',
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
      rating: 4.7,
      reviews: 167,
      distance: '1.2 km',
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

  const getVehicleColor = (type: string) => {
    switch (type) {
      case 'car': return '#b6ffb0';
      case 'scooter': return '#4ecdc4';
      case 'electric': return '#45b7d1';
      case 'bike': return '#ff6b6b';
      default: return '#b6ffb0';
    }
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    if (filters.type !== 'all' && vehicle.type !== filters.type) {
      return false;
    }
    return true;
  });

  const [open, setOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [form, setForm] = useState({
    nom: '',
    email: '',
    date: '',
    duree: 1,
    type: '',
    station: '',
  });
  const [qrData, setQrData] = useState('');
  const [signature, setSignature] = useState('');
  const [showQR, setShowQR] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  // Fonction pour générer la signature SHA256
  async function generateSignature(data: string) {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data + 'COVO_SECRET_KEY');
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', dataBuffer);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  const handleRent = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setForm({
      nom: '',
      email: '',
      date: '',
      duree: 1,
      type: getVehicleTypeLabel(vehicle.type),
      station: vehicle.station,
    });
    setShowQR(false);
    setOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      site: 'COVO',
      ...form,
      vehicule: selectedVehicle?.name,
      idReservation: Math.random().toString(36).slice(2, 10),
    };
    const dataStr = JSON.stringify(data);
    const sig = await generateSignature(dataStr);
    setSignature(sig);
    setQrData(JSON.stringify({ ...data, signature: sig }));
    setShowQR(true);
  };

  const handleDownloadQR = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const svgBlob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'covo_qr_code.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1a13] via-[#0e2233] to-[#1a2a2f] pt-20 p-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold mb-4 text-white">Location de véhicules</h1>
          <p className="text-base text-white/70 max-w-2xl mx-auto">
            Trouvez le véhicule parfait pour vos déplacements urbains
          </p>
        </motion.div>
        
        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl">
          <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Filter className="mr-2 h-5 w-5 text-[#b6ffb0]" />
              Filtres de recherche
            </CardTitle>
          </CardHeader>
          <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                  <Label htmlFor="type" className="text-white/90">Type de véhicule</Label>
                <select
                  id="type"
                  value={filters.type}
                  onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:border-[#b6ffb0] focus:ring-[#b6ffb0]/20"
                >
                  <option value="all">Tous les types</option>
                  <option value="car">Voitures</option>
                  <option value="scooter">Scooters</option>
                  <option value="electric">Trottinettes électriques</option>
                  <option value="bike">Vélos</option>
                </select>
              </div>
              <div className="space-y-2">
                  <Label htmlFor="location" className="text-white/90">Station</Label>
                <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-[#b6ffb0]" />
                  <Input
                    id="location"
                    placeholder="Rechercher une station..."
                    value={filters.location}
                    onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                      className="pl-12 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#b6ffb0] focus:ring-[#b6ffb0]/20"
                  />
                </div>
              </div>
              <div className="space-y-2">
                  <Label htmlFor="duration" className="text-white/90">Durée</Label>
                <select
                  id="duration"
                  value={filters.duration}
                  onChange={(e) => setFilters(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white focus:border-[#b6ffb0] focus:ring-[#b6ffb0]/20"
                >
                  <option value="hour">À l'heure</option>
                  <option value="day">À la journée</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
        </motion.div>

        {/* Statistiques rapides */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Véhicules disponibles', value: vehicles.filter(v => v.available).length, icon: Car, color: '#b6ffb0' },
            { label: 'Stations actives', value: 12, icon: MapPin, color: '#4ecdc4' },
            { label: 'Partenaires', value: 8, icon: Users, color: '#45b7d1' },
            { label: 'Note moyenne', value: '4.8/5', icon: Star, color: '#ff6b6b' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
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

        {/* Liste des véhicules */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle, index) => {
            const IconComponent = getVehicleIcon(vehicle.type);
            const rate = filters.duration === 'hour' ? vehicle.hourlyRate : vehicle.dailyRate;
            const rateLabel = filters.duration === 'hour' ? '/heure' : '/jour';
            const vehicleColor = getVehicleColor(vehicle.type);
            
            return (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <Card className={`backdrop-blur-xl bg-white/5 border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 shadow-2xl ${!vehicle.available ? 'opacity-60' : ''}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <IconComponent className="h-5 w-5 mr-2" style={{ color: vehicleColor }} />
                        <Badge className="bg-white/10 text-white border-white/20">{getVehicleTypeLabel(vehicle.type)}</Badge>
                    </div>
                      <Badge className={vehicle.available ? "bg-[#b6ffb0] text-black" : "bg-red-500 text-white"}>
                      {vehicle.available ? 'Disponible' : 'Indisponible'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="relative">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                      <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white">
                        {vehicle.distance}
                      </div>
                    </div>
                  
                  <div>
                      <h3 className="text-lg font-semibold text-white">{vehicle.name}</h3>
                      <p className="text-sm text-white/70">Par {vehicle.partner}</p>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 text-[#b6ffb0] fill-current mr-1" />
                        <span className="text-sm text-white/80">{vehicle.rating}</span>
                        <span className="text-sm text-white/60 ml-1">({vehicle.reviews})</span>
                      </div>
                  </div>
                  
                    <div className="flex items-center text-sm text-white/70">
                      <MapPin className="h-4 w-4 mr-1 text-[#b6ffb0]" />
                    {vehicle.station}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                        {vehicle.features.map((feature, featureIndex) => (
                          <Badge key={featureIndex} className="bg-white/10 text-white/80 border-white/20 text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                    <div className="flex items-center justify-between pt-2">
                      <div>
                                               <p className="text-lg font-bold text-white">{rate} CFA</p>
                       <p className="text-xs text-white/60">{rateLabel}</p>
                    </div>
                    <Button 
                      onClick={() => handleRent(vehicle)}
                      className={
                        `bg-gradient-to-r from-[#b6ffb0] to-[#4ecdc4] text-black font-semibold hover:from-[#4ecdc4] hover:to-[#b6ffb0] transition-all duration-300 disabled:opacity-50` +
                        (vehicle.available ? '' : ' opacity-60 cursor-not-allowed')
                      }
                      disabled={!vehicle.available}
                    >
                        {vehicle.available ? 'Réserver' : 'Indisponible'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="backdrop-blur-2xl bg-white/10 border-white/20 shadow-2xl max-w-xl animate-in animate-fade-in animate-slide-in-from-top-8">
    <DialogHeader>
      <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
        <Zap className="text-yellow-400" /> Réservation de véhicule
      </DialogTitle>
      <DialogDescription className="text-white/70">
        Remplissez soigneusement le formulaire ci-dessous pour générer un QR code sécurisé contenant <b>toutes</b> les informations de votre réservation. Ce QR code servira de preuve et d’accès à votre véhicule.
      </DialogDescription>
    </DialogHeader>
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nom" className="text-white">Nom complet</Label>
          <Input name="nom" id="nom" value={form.nom} onChange={handleFormChange} required placeholder="Votre nom et prénom" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
        </div>
        <div>
          <Label htmlFor="email" className="text-white">Adresse email</Label>
          <Input name="email" id="email" value={form.email} onChange={handleFormChange} required type="email" placeholder="exemple@email.com" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
        </div>
        <div>
          <Label htmlFor="date" className="text-white">Date de réservation</Label>
          <Input name="date" id="date" value={form.date} onChange={handleFormChange} required type="date" className="bg-white/10 border-white/20 text-white" />
        </div>
        <div>
          <Label htmlFor="duree" className="text-white">Durée (heures)</Label>
          <Input name="duree" id="duree" value={form.duree} onChange={handleFormChange} required type="number" min={1} placeholder="1" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
        </div>
        <div>
          <Label htmlFor="type" className="text-white">Type de véhicule</Label>
          <Input name="type" id="type" value={form.type} onChange={handleFormChange} required className="bg-white/10 border-white/20 text-white" />
        </div>
        <div>
          <Label htmlFor="station" className="text-white">Station de départ</Label>
          <Input name="station" id="station" value={form.station} onChange={handleFormChange} required className="bg-white/10 border-white/20 text-white" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" className="bg-secondary text-black hover:bg-secondary/80 transition-all duration-300 shadow-brand">
          Générer mon QR code sécurisé
        </Button>
      </DialogFooter>
    </form>
    {showQR && selectedVehicle && (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, type: 'spring' }}
        className="flex flex-col items-center mt-8"
      >
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#fff]/80 via-[#C4A91C]/30 to-[#fff]/90 shadow-2xl border border-white/20 relative" ref={qrRef}>
          <QRCode
            value={JSON.stringify({
              site: 'COVO',
              nom: form.nom,
              email: form.email,
              date: form.date,
              duree: form.duree,
              type: form.type,
              station: form.station,
              vehicule: selectedVehicle.name,
              partenaire: selectedVehicle.partner,
              prix: filters.duration === 'hour' ? selectedVehicle.hourlyRate : selectedVehicle.dailyRate,
              unite: filters.duration === 'hour' ? 'CFA/heure' : 'CFA/jour',
              features: selectedVehicle.features,
              idReservation: qrData ? JSON.parse(qrData).idReservation : '',
              signature: signature
            })}
            size={220}
            bgColor="#fff"
            fgColor="#1B5B4A"
            style={{ filter: 'drop-shadow(0 0 16px #C4A91C)' }}
            level="H"
          />
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-primary font-mono select-none">signé par COVO</span>
        </div>
        <p className="mt-4 text-center text-white/90 font-semibold bg-black/30 rounded-lg px-4 py-2 shadow-md">
          Présentez ce QR code à l’agent de la station pour valider votre réservation.
        </p>
        <Button onClick={handleDownloadQR} className="mt-4 bg-primary text-white hover:bg-primary/80">
          Télécharger le QR code
        </Button>
        <Button className="mt-2 bg-gradient-to-r from-[#b6ffb0] to-[#4ecdc4] text-black font-semibold hover:from-[#4ecdc4] hover:to-[#b6ffb0] transition-all duration-300" onClick={() => { setOpen(false); setShowQR(false); }}>
          Réserver
        </Button>
      </motion.div>
    )}
  </DialogContent>
</Dialog>
    </div>
  );
};

export default VehicleRentals;
