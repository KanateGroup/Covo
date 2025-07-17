
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QrCode, CheckCircle, AlertCircle, User, Car, MapPin, Clock, DollarSign } from 'lucide-react';
// import AgentMessaging from '@/components/AgentMessaging';
import { useAgentAuth } from '@/hooks/useAgentAuth';

const AgentScan = () => {
  const { logout } = useAgentAuth({ redirectToLogin: true });

  const [scannedData, setScannedData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  // Mock data pour simulation du scan QR
  const mockQRData = {
    reservationId: 'RES-2024-001',
    user: {
      name: 'Aminata Diallo',
      phone: '+221 77 123 45 67',
      email: 'aminata.diallo@email.com',
      verified: true,
    },
    vehicle: {
      type: 'Scooter',
      model: 'Yamaha NMAX',
      licensePlate: 'DK-2024-SC-123',
    },
    booking: {
      startDate: '2024-01-15',
      startTime: '14:00',
      endDate: '2024-01-15',
      endTime: '18:00',
      pickupStation: 'Station Plateau',
      returnStation: 'Station Almadies',
    },
    payment: {
      amount: 8000,
      currency: 'FCFA',
      status: 'pending',
    },
    qrCodeData: 'RES-2024-001|Aminata Diallo|Yamaha NMAX|2024-01-15|14:00|8000',
  };

  const handleScanQR = () => {
    // Simulation du scan QR
    console.log('Scan QR initié...');
    setTimeout(() => {
      setScannedData(mockQRData);
    }, 1500);
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('Veuillez sélectionner un mode de paiement');
      return;
    }

    console.log('Paiement traité:', paymentMethod);
    setPaymentCompleted(true);
    
    // Simulation de la validation du paiement
    setTimeout(() => {
      setScannedData(prev => ({
        ...prev,
        payment: {
          ...prev.payment,
          status: 'completed',
          method: paymentMethod,
        }
      }));
    }, 2000);
  };

  const resetScan = () => {
    setScannedData(null);
    setPaymentMethod('');
    setPaymentCompleted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1a13] via-[#0e2233] to-[#1a2a2f] pt-20 p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="flex justify-end mb-2">
          <Button size="sm" variant="outline" onClick={logout}>
            Déconnexion
          </Button>
        </div>
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Scanner QR - Agent</h1>

        {!scannedData ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <QrCode className="mr-2 h-5 w-5" />
                Scanner le QR code client
              </CardTitle>
              <CardDescription>
                Scannez le QR code du client pour valider sa réservation
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-8">
              <div className="mb-6">
                <QrCode className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Positionnez le QR code devant la caméra
                </p>
              </div>
              <Button onClick={handleScanQR} size="lg">
                <QrCode className="mr-2 h-5 w-5" />
                Lancer le scan
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Informations de la réservation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                    Réservation validée
                  </span>
                  <Badge variant="outline">
                    {scannedData.reservationId}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Informations client
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Nom:</span>
                        <span className="font-medium">{scannedData.user.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Téléphone:</span>
                        <span className="font-medium">{scannedData.user.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email:</span>
                        <span className="font-medium">{scannedData.user.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Statut:</span>
                        <Badge variant={scannedData.user.verified ? "default" : "secondary"}>
                          {scannedData.user.verified ? "Vérifié" : "Non vérifié"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center">
                      <Car className="mr-2 h-4 w-4" />
                      Véhicule réservé
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="font-medium">{scannedData.vehicle.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Modèle:</span>
                        <span className="font-medium">{scannedData.vehicle.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Immatriculation:</span>
                        <span className="font-medium">{scannedData.vehicle.licensePlate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold flex items-center mb-3">
                    <Clock className="mr-2 h-4 w-4" />
                    Détails de la réservation
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Date de début:</span>
                        <span className="font-medium">{scannedData.booking.startDate}</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>Heure de début:</span>
                        <span className="font-medium">{scannedData.booking.startTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Station de départ:</span>
                        <span className="font-medium">{scannedData.booking.pickupStation}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Date de fin:</span>
                        <span className="font-medium">{scannedData.booking.endDate}</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>Heure de fin:</span>
                        <span className="font-medium">{scannedData.booking.endTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Station de retour:</span>
                        <span className="font-medium">{scannedData.booking.returnStation}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Paiement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Validation du paiement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <span className="text-lg font-semibold">Montant à payer:</span>
                  <span className="text-2xl font-bold text-primary">
                    {scannedData.payment.amount.toLocaleString()} {scannedData.payment.currency}
                  </span>
                </div>

                {scannedData.payment.status === 'pending' && !paymentCompleted && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Mode de paiement:</label>
                      <Select onValueChange={setPaymentMethod}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez le mode de paiement" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Espèces</SelectItem>
                          <SelectItem value="wave">Wave</SelectItem>
                          <SelectItem value="orange-money">Orange Money</SelectItem>
                          <SelectItem value="card">Carte bancaire</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handlePayment} className="w-full" disabled={!paymentMethod}>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Valider le paiement
                    </Button>
                  </div>
                )}

                {paymentCompleted && scannedData.payment.status === 'completed' && (
                  <div className="text-center py-4">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-green-800 mb-2">
                      Paiement validé !
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Le client peut maintenant récupérer son véhicule
                    </p>
                    <Badge variant="default">
                      Payé par {scannedData.payment.method === 'cash' ? 'Espèces' : 
                               scannedData.payment.method === 'wave' ? 'Wave' :
                               scannedData.payment.method === 'orange-money' ? 'Orange Money' : 'Carte bancaire'}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex space-x-2">
              <Button onClick={resetScan} variant="outline" className="flex-1">
                Nouveau scan
              </Button>
              <Button variant="outline" className="flex-1">
                <User className="mr-2 h-4 w-4" />
                Contacter le client
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Messagerie agent en bas à droite */}
      {/* AgentMessaging component was removed, so this section is now empty */}
    </div>
  );
};

export default AgentScan;
