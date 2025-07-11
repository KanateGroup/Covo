import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Download, 
  Maximize2, 
  Home, 
  Car, 
  MapPin, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Calendar,
  CheckCircle,
  ArrowLeft,
  Printer
} from 'lucide-react';

const ConfirmationReservation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const qrRef = useRef<HTMLDivElement>(null);
  const [showFullScreen, setShowFullScreen] = useState(false);

  console.log('=== PAGE CONFIRMATION CHARGÉE ==='); // Debug
  console.log('Location state:', location.state); // Debug

  // Récupération des données de réservation
  const reservation = location.state?.reservation || JSON.parse(localStorage.getItem('currentReservation') || '{}');

  console.log('Réservation récupérée:', reservation); // Debug

  // Redirection automatique si aucune donnée
  useEffect(() => {
    if (!reservation.bookingId) {
      console.log('❌ Aucune réservation trouvée - Redirection vers l\'accueil'); // Debug
      navigate('/', { replace: true });
    }
  }, [reservation.bookingId, navigate]);

  // Affichage de chargement pendant la redirection
  if (!reservation.bookingId) {
    console.log('⏳ Affichage de chargement...'); // Debug
    return (
      <div className="min-h-screen bg-muted/30 p-4 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Redirection en cours...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  console.log('✅ Réservation valide trouvée - Affichage de la page'); // Debug

  // Données pour le QR code
  const qrData = JSON.stringify({
    bookingId: reservation.bookingId,
    vehicleType: reservation.vehicleType,
    vehicleLabel: reservation.vehicleLabel,
    pickupStation: reservation.pickupStation,
    returnStation: reservation.returnStation,
    customer: `${reservation.firstName} ${reservation.lastName}`,
    phone: reservation.phone,
    email: reservation.email,
    startDate: reservation.startDate,
    startTime: reservation.startTime,
    endDate: reservation.endDate,
    endTime: reservation.endTime,
    totalPrice: reservation.totalPrice,
    status: reservation.status
  });

  console.log('QR Code data généré:', qrData); // Debug

  // Fonction pour télécharger le QR code
  const downloadQRCode = () => {
    console.log('📥 Début du téléchargement du QR code...'); // Debug
    
    if (!qrRef.current) {
      console.log('❌ Référence QR non trouvée'); // Debug
      return;
    }

    const canvas = document.createElement('canvas');
    const svg = qrRef.current.querySelector('svg');
    if (!svg) {
      console.log('❌ SVG QR non trouvé'); // Debug
      return;
    }

    console.log('🔧 Conversion SVG vers PNG...'); // Debug

    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    
    img.onload = () => {
      console.log('🖼️ Image SVG chargée, création du canvas...'); // Debug
      
      canvas.width = 400;
      canvas.height = 400;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.log('❌ Contexte canvas non disponible'); // Debug
        return;
      }

      // Fond blanc
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, 400, 400);
      
      // Dessiner le QR code
      ctx.drawImage(img, 50, 50, 300, 300);
      
      // Ajouter le texte
      ctx.fillStyle = '#000';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`COVO - ${reservation.bookingId}`, 200, 380);
      
      // Télécharger
      const link = document.createElement('a');
      link.download = `covo-reservation-${reservation.bookingId}.png`;
      link.href = canvas.toDataURL();
      link.click();
      
      console.log('✅ QR code téléchargé avec succès:', link.download); // Debug
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  // Calcul de la durée
  const getDuration = () => {
    const start = new Date(`${reservation.startDate}T${reservation.startTime}`);
    const end = new Date(`${reservation.endDate}T${reservation.endTime}`);
    const hours = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60));
    console.log(`⏱️ Durée calculée: ${hours} heures`); // Debug
    return hours;
  };

  // Formatage de la date
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Fonction d'impression
  const printReservation = () => {
    console.log('🖨️ Début de l\'impression de la réservation...'); // Debug
    window.print();
    console.log('✅ Impression lancée'); // Debug
  };

  // Fonction pour afficher en plein écran
  const showFullScreenQR = () => {
    console.log('🔍 Affichage du QR code en plein écran...'); // Debug
    setShowFullScreen(true);
  };

  return (
    <div className="min-h-screen bg-muted/30 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header avec bouton retour */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/location')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la réservation
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* QR Code */}
          <Card className="shadow-lg">
            <CardHeader className="text-center bg-primary text-primary-foreground">
              <CardTitle className="text-2xl flex items-center justify-center">
                <CheckCircle className="mr-2 h-6 w-6" />
                Réservation confirmée !
              </CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Votre QR code de réservation
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 text-center">
              {/* QR Code */}
              <div 
                ref={qrRef}
                className="bg-white p-6 rounded-lg inline-block shadow-inner mb-6"
              >
                <QRCodeSVG 
                  value={qrData}
                  size={250}
                  level="M"
                  includeMargin={true}
                />
              </div>

              {/* Boutons d'action */}
              <div className="flex gap-3 mb-6">
                <Button 
                  onClick={downloadQRCode}
                  variant="outline"
                  className="flex-1"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger
                </Button>
                <Button 
                  onClick={showFullScreenQR}
                  className="flex-1"
                >
                  <Maximize2 className="mr-2 h-4 w-4" />
                  Plein écran
                </Button>
              </div>

              {/* Instructions */}
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Instructions :</strong> Présentez ce QR code à l'agent de la station pour récupérer votre véhicule.
                </p>
                <Badge variant="default" className="text-xs">
                  QR Code valide 24h
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Récapitulatif de la réservation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Détails de votre réservation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* ID Réservation */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">ID Réservation</h3>
                <p className="text-primary font-mono text-lg">{reservation.bookingId}</p>
              </div>

              {/* Véhicule */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center">
                  <Car className="mr-2 h-4 w-4" />
                  Véhicule
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Type :</span>
                    <p className="capitalize">{reservation.vehicleLabel || reservation.vehicleType}</p>
                  </div>
                  <div>
                    <span className="font-medium">Prix total :</span>
                    <p className="text-primary font-semibold">{reservation.totalPrice} CFA</p>
                  </div>
                </div>
              </div>

              {/* Stations */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  Stations
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Retrait :</span>
                    <p>{reservation.pickupStation}</p>
                  </div>
                  <div>
                    <span className="font-medium">Retour :</span>
                    <p>{reservation.returnStation}</p>
                  </div>
                </div>
              </div>

              {/* Horaires */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  Horaires
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Début :</span>
                    <p>{formatDate(reservation.startDate)}</p>
                    <p className="text-muted-foreground">{reservation.startTime}</p>
                  </div>
                  <div>
                    <span className="font-medium">Fin :</span>
                    <p>{formatDate(reservation.endDate)}</p>
                    <p className="text-muted-foreground">{reservation.endTime}</p>
                  </div>
                </div>
                <div className="p-2 bg-primary/10 rounded text-center">
                  <span className="font-medium">Durée : {getDuration()} heure(s)</span>
                </div>
              </div>

              {/* Client */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Vos informations
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Nom :</span>
                    <p>{reservation.firstName} {reservation.lastName}</p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-3 w-3" />
                    <span>{reservation.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="mr-2 h-3 w-3" />
                    <span>{reservation.email}</span>
                  </div>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex gap-3 pt-4 border-t">
                <Button 
                  onClick={printReservation}
                  variant="outline"
                  className="flex-1"
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Imprimer
                </Button>
                <Button 
                  onClick={() => navigate('/location')}
                  className="flex-1"
                >
                  Nouvelle réservation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bouton retour à l'accueil */}
        <div className="mt-8 text-center">
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            size="lg"
          >
            <Home className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Button>
        </div>
      </div>

      {/* Modal plein écran pour le QR code */}
      <Dialog open={showFullScreen} onOpenChange={setShowFullScreen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>QR Code - {reservation.bookingId}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <QRCodeSVG 
                value={qrData}
                size={300}
                level="M"
                includeMargin={true}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={downloadQRCode} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Télécharger
              </Button>
              <Button onClick={() => setShowFullScreen(false)}>
                Fermer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfirmationReservation; 