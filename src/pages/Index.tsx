
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Car as CarIcon, Users, MapPin, Star, TrendingUp, Shield, Zap, Globe, Heart } from 'lucide-react';
import HomeSlider from '@/components/HomeSlider';
import Counter from '@/components/Counter';
import Aurora from '@/components/Aurora';
import CarComponent from '@/components/Orb';
import Orb from '@/components/Orb';
import { motion, useInView } from 'framer-motion';

const Index = () => {
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });

  const stats = [
    { label: 'Clients Satisfaits', value: 15420, icon: Users, color: '#b6ffb0' },
    { label: 'Associés Actifs', value: 892, icon: Heart, color: '#ff6b6b' },
    { label: 'Utilisateurs Quotidiens', value: 3247, icon: Zap, color: '#4ecdc4' },
    { label: 'Villes Couvertes', value: 25, icon: Globe, color: '#45b7d1' },
  ];

  const testimonials = [
    {
      name: 'Aminata Diallo',
      text: 'COVO m\'a permis d\'économiser énormément sur mes déplacements quotidiens. Super pratique !',
      rating: 5,
      avatar: '👩🏾‍💼',
    },
    {
      name: 'Moussa Sow',
      text: 'Excellent service, conducteurs sympathiques et véhicules propres. Je recommande !',
      rating: 5,
      avatar: '👨🏾‍💻',
    },
    {
      name: 'Fatou Ba',
      text: 'La location de scooters est parfaite pour mes déplacements en ville. Très accessible.',
      rating: 5,
      avatar: '👩🏾‍🎓',
    },
  ];

  const features = [
    {
      icon: TrendingUp,
      title: 'Économique',
      description: 'Réduisez vos frais de transport jusqu\'à 70% en partageant vos trajets ou en louant des véhicules à des tarifs préférentiels.',
      color: '#b6ffb0'
    },
    {
      icon: Shield,
      title: 'Sécurisé',
      description: 'Profils vérifiés, système d\'évaluation et assistance 24/7 pour voyager en toute sérénité.',
      color: '#ff6b6b'
    },
    {
      icon: Users,
      title: 'Convivial',
      description: 'Rencontrez de nouvelles personnes, partagez des moments et contribuez à une mobilité plus durable.',
      color: '#4ecdc4'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1a13] via-[#0e2233] to-[#1a2a2f]">
      {/* Section Accueil modernisée - prend toute la hauteur de l'écran */}
      <section className="relative">
        <HomeSlider />
      </section>

      {/* Stats Section avec compteurs animés */}
      <section ref={statsRef} className="py-20 bg-gradient-to-r from-[#0a1a13]/80 to-[#0e2233]/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Nos Chiffres Clés
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Découvrez l'impact de COVO sur la mobilité urbaine
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                  <stat.icon 
                    className="h-12 w-12 mx-auto mb-4" 
                    style={{ color: stat.color }}
                  />
                  <div className="mb-2">
                    <Counter
                      value={stat.value}
                      fontSize={36}
                      places={stat.value >= 1000 ? [10000, 1000, 100, 10, 1] : [1000, 100, 10, 1]}
                      textColor={stat.color}
                      fontWeight={900}
                      gradientFrom="transparent"
                      gradientTo="transparent"
                      isVisible={isStatsInView}
                    />
                  </div>
                  <div className="text-white/80 text-sm font-medium">{stat.label}</div>
              </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-[#0e2233]/60 to-[#1a2a2f]/60">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Pourquoi choisir COVO ?
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Une expérience de mobilité révolutionnaire
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="backdrop-blur-xl bg-white/5 border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 shadow-2xl">
                  <CardHeader className="text-center">
                    <feature.icon 
                      className="h-16 w-16 mx-auto mb-4" 
                      style={{ color: feature.color }}
                    />
                    <CardTitle className="text-2xl text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                    <CardDescription className="text-white/70 text-base leading-relaxed">
                      {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-r from-[#1a2a2f]/60 to-[#0a1a13]/60">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ce que disent nos utilisateurs
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Témoignages de notre communauté
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="backdrop-blur-xl bg-white/5 border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 shadow-2xl">
                <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="text-3xl mr-3">{testimonial.avatar}</div>
                      <div>
                        <p className="font-semibold text-white">{testimonial.name}</p>
                        <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-[#b6ffb0] fill-current" />
                    ))}
                  </div>
                      </div>
                    </div>
                    <p className="text-white/80 mb-4 italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nouveaux services - Orb animé + texte */}
      <section className="py-20 bg-gradient-to-r from-[#0a1a13]/80 to-[#0e2233]/80">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                <span className="font-extrabold">De nouveaux services arrivent bientôt...</span>
              </h2>
              <p className="text-lg text-white/80 mb-6 max-w-lg">
                Restez connectés&nbsp;: location de trottinettes, tricycles électriques, libre-service, et bien plus encore&nbsp;!<br/>
                <span className="text-secondary font-semibold">Bientôt sur COVO.</span>
              </p>
            </div>
            <div className="flex-1 flex items-center justify-center min-h-[320px] w-full max-w-xl">
              <div style={{ width: '100%', height: '320px', maxWidth: 400, position: 'relative' }}>
                <Orb hoverIntensity={0.5} rotateOnHover={true} hue={0} forceHoverState={false} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer avec effet Aurora */}
      <footer className="relative bg-gradient-to-r from-[#0a1a13] to-[#0e2233] border-t border-white/10 py-16 overflow-hidden">
        {/* Effet Aurora en arrière-plan */}
        <div className="absolute inset-0 z-0">
          <Aurora
            colorStops={["#0a1a13", "#b6ffb0", "#0e2233"]}
            blend={0.3}
            amplitude={0.8}
            speed={0.3}
          />
        </div>
        
        {/* Contenu du footer */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <CarIcon className="h-6 w-6 text-[#b6ffb0]" />
                <span className="text-xl font-bold text-white">COVO</span>
              </div>
              <p className="text-white/70">
                La plateforme qui révolutionne vos déplacements au quotidien.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Services</h3>
              <ul className="space-y-2 text-white/70">
                <li><Link to="/covoiturage" className="hover:text-[#b6ffb0] transition-colors">Covoiturage</Link></li>
                <li><Link to="/location" className="hover:text-[#b6ffb0] transition-colors">Location</Link></li>
                <li><Link to="/stations" className="hover:text-[#b6ffb0] transition-colors">Stations</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Support</h3>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-[#b6ffb0] transition-colors">Aide</a></li>
                <li><a href="#" className="hover:text-[#b6ffb0] transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-[#b6ffb0] transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Légal</h3>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-[#b6ffb0] transition-colors">CGU</a></li>
                <li><a href="#" className="hover:text-[#b6ffb0] transition-colors">Confidentialité</a></li>
                <li><a href="#" className="hover:text-[#b6ffb0] transition-colors">Mentions légales</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/70">
            <p>&copy; 2024 COVO. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
