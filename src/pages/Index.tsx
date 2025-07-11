
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, Users, MapPin, Star, TrendingUp, Shield } from 'lucide-react';
import HomeSlider from '@/components/HomeSlider';

const Index = () => {
  const stats = [
    { label: 'Trajets partagés', value: '50k+', icon: Car },
    { label: 'Utilisateurs actifs', value: '15k+', icon: Users },
    { label: 'Villes couvertes', value: '25+', icon: MapPin },
    { label: 'Note moyenne', value: '4.8/5', icon: Star },
  ];

  const testimonials = [
    {
      name: 'Aminata Diallo',
      text: 'COVO m\'a permis d\'économiser énormément sur mes déplacements quotidiens. Super pratique !',
      rating: 5,
    },
    {
      name: 'Moussa Sow',
      text: 'Excellent service, conducteurs sympathiques et véhicules propres. Je recommande !',
      rating: 5,
    },
    {
      name: 'Fatou Ba',
      text: 'La location de scooters est parfaite pour mes déplacements en ville. Très accessible.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-gradient">COVO</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/covoiturage" className="text-foreground hover:text-primary transition-colors">
              Covoiturage
            </Link>
            <Link to="/location" className="text-foreground hover:text-primary transition-colors">
              Location
            </Link>
            <Link to="/stations" className="text-foreground hover:text-primary transition-colors">
              Stations
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Link to="/login">
              <Button variant="outline">Connexion</Button>
            </Link>
            <Link to="/register">
              <Button>Inscription</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Section Accueil modernisée */}
      <section className="relative bg-gradient-to-br from-primary/5 to-secondary/5 py-8">
        <HomeSlider />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi choisir COVO ?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover-lift shadow-brand">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Économique</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Réduisez vos frais de transport jusqu'à 70% en partageant vos trajets
                  ou en louant des véhicules à des tarifs préférentiels.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover-lift shadow-brand">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Sécurisé</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Profils vérifiés, système d'évaluation et assistance 24/7
                  pour voyager en toute sérénité.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover-lift shadow-brand">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Convivial</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Rencontrez de nouvelles personnes, partagez des moments
                  et contribuez à une mobilité plus durable.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Ce que disent nos utilisateurs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover-lift">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-secondary fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                  <p className="font-semibold text-primary">- {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Car className="h-6 w-6" />
                <span className="text-xl font-bold">COVO</span>
              </div>
              <p className="text-primary-foreground/80">
                La plateforme qui révolutionne vos déplacements au quotidien.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><Link to="/covoiturage" className="hover:text-white transition-colors">Covoiturage</Link></li>
                <li><Link to="/location" className="hover:text-white transition-colors">Location</Link></li>
                <li><Link to="/stations" className="hover:text-white transition-colors">Stations</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#" className="hover:text-white transition-colors">Aide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Légal</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#" className="hover:text-white transition-colors">CGU</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Confidentialité</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/80">
            <p>&copy; 2024 COVO. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
