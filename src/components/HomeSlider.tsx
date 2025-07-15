import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Zap } from 'lucide-react';

// Slides data avec les vraies images
const slides = [
  {
    key: 'tricycle',
    image: "/Tricycle-electrique.jpg",
    titre: "Tricycle Électrique",
    description: "Service en cours de développement. Bientôt disponible pour les livraisons et déplacements urbains.",
    cta: "Bientôt disponible",
    action: () => console.log("Service en développement"),
  },
  {
    key: 'troti-moderne',
    image: "/troti.avif",
    titre: "Trottinette Moderne",
    description: "Service en cours de développement. Bientôt disponible pour vos déplacements rapides en ville.",
    cta: "Bientôt disponible",
    action: () => console.log("Service en développement"),
  },
  {
    key: 'trotinette-classique',
    image: "/trotinette.jpg",
    titre: "Trottinette Classique",
    description: "Service en cours de développement. Bientôt disponible pour vos trajets quotidiens.",
    cta: "Bientôt disponible",
    action: () => console.log("Service en développement"),
  },
  {
    key: 'libre-service',
    image: "/Trottinette-libre-service-Paris.jpg",
    titre: "Libre-Service Paris",
    description: "Service en cours de développement. Bientôt disponible dans toute la ville.",
    cta: "Bientôt disponible",
    action: () => console.log("Service en développement"),
  },
  {
    key: 'trycic',
    image: "/trycic.avif",
    titre: "Trycic Urbain",
    description: "Service en cours de développement. Bientôt disponible pour vos trajets urbains.",
    cta: "Bientôt disponible",
    action: () => console.log("Service en développement"),
  },
  {
    key: 'minibus',
    image: "/car-minibus.webp",
    titre: "Covoiturage Minibus",
    description: "Service en cours de développement. Bientôt disponible pour vos trajets en groupe.",
    cta: "Bientôt disponible",
    action: () => console.log("Service en développement"),
  },
  {
    key: 'parc-auto',
    image: "/parc_auto_voitures_.jpg",
    titre: "Parc Automobile",
    description: "Service en cours de développement. Bientôt disponible avec un large choix de véhicules.",
    cta: "Bientôt disponible",
    action: () => console.log("Service en développement"),
  },
];

const SLIDE_DURATION = 7000;

const HomeSlider: React.FC = () => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isScrolled, setIsScrolled] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setDirection('next');
      setActive((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [active]);

  const goTo = (idx: number, dir: 'next' | 'prev') => {
    setDirection(dir);
    setActive(idx);
  };

  const handleNext = () => goTo((active + 1) % slides.length, 'next');
  const handlePrev = () => goTo((active - 1 + slides.length) % slides.length, 'prev');

  // Animations améliorées pour le contenu principal
  const contentVariants = {
    enter: (dir: string) => ({
      opacity: 0,
      scale: 0.95,
      x: dir === 'next' ? 150 : -150,
      y: 20,
      rotateY: dir === 'next' ? 15 : -15,
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotateY: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeInOut" as const,
        staggerChildren: 0.1
      },
    },
    exit: (dir: string) => ({
      opacity: 0,
      scale: 0.95,
      x: dir === 'next' ? -150 : 150,
      y: -20,
      rotateY: dir === 'next' ? -15 : 15,
      transition: { duration: 0.6, ease: "easeInOut" as const },
    }),
  };

  // Animations pour les éléments enfants
  const itemVariants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20 }
  };

  // Animations pour l'image de fond
  const backgroundVariants = {
    enter: (dir: string) => ({
      opacity: 0,
      scale: 1.1,
      x: dir === 'next' ? 50 : -50,
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 1.2, ease: "easeInOut" as const },
    },
    exit: (dir: string) => ({
      opacity: 0,
      scale: 0.95,
      x: dir === 'next' ? -50 : 50,
      transition: { duration: 0.8, ease: "easeInOut" as const },
    }),
  };

  const handleCTA = (slide: typeof slides[0]) => {
    slide.action();
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1a13] via-[#0e2233] to-[#1a2a2f]">
      {/* Image de fond immersive avec animations améliorées */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={slides[active].key}
          custom={direction}
          variants={backgroundVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: `url(${slides[active].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(0px) brightness(0.4) saturate(1.2)',
          }}
        />
        
        {/* Overlay dégradé avec animation */}
        <motion.div
          key={slides[active].key + '-overlay'}
          className="absolute inset-0 bg-gradient-to-br from-[#0a1a13]/95 via-[#0e2233]/75 to-[#1a2a2f]/85 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>
      
      {/* Nouvelle structure en deux colonnes */}
      <div className="relative z-20 flex w-full h-full">
        {/* Colonne gauche - Services en développement */}
        <div className="w-1/2 flex items-center justify-center px-8">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={slides[active].key + '-content'}
              custom={direction}
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="backdrop-blur-xl bg-black/40 rounded-2xl p-6 md:p-8 shadow-2xl w-full max-w-md border border-white/10"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              <motion.div variants={itemVariants} className="text-base md:text-lg text-[#b6ffb0] mb-2 font-light tracking-widest uppercase">
                Mobilité Urbaine
              </motion.div>
              
              <motion.h1 
                variants={itemVariants}
                className="text-3xl md:text-5xl font-extrabold text-white mb-3 leading-tight drop-shadow-2xl"
              >
                {slides[active].titre}
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-white/90 text-base md:text-lg mb-8 leading-relaxed"
              >
                {slides[active].description}
              </motion.p>
              
              <motion.div variants={itemVariants}>
                <Button
                  size="default"
                  variant="outline"
                  className="text-base md:text-lg font-semibold px-8 py-3 border-2 border-gray-400 text-gray-400 bg-transparent hover:bg-gray-400/10 hover:text-gray-300 transition-all duration-300 cursor-not-allowed opacity-60"
                  onClick={() => handleCTA(slides[active])}
                  disabled
                >
                  {slides[active].cta}
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Colonne droite - Espace vide avec effet visuel */}
        <div className="w-1/2 flex items-center justify-center">
          <motion.div
            className="backdrop-blur-sm bg-white/5 rounded-3xl p-12 border border-white/10 shadow-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="flex justify-center mb-4">
                <Zap className="h-14 w-14 text-yellow-400 drop-shadow-lg" />
              </div>
              <h2 className="text-2xl font-bold text-white/80 mb-2">Espace de Développement</h2>
              <p className="text-white/60 text-lg">De nouveaux services arrivent bientôt...</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Indicateurs de progression */}
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 z-30 hidden md:block">
        <div className="flex flex-col space-y-3">
          {slides.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => goTo(idx, idx > active ? 'next' : 'prev')}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                active === idx 
                  ? 'bg-[#b6ffb0] scale-125 shadow-lg shadow-[#b6ffb0]/50' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
      
      {/* Slider horizontal amélioré en bas */}
      <div className="absolute bottom-0 left-0 w-full flex flex-col items-center pb-8 z-30">
        <div className="flex items-center justify-center w-full max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {slides.map((slide, idx) => (
              <motion.div
                key={slide.key}
                onClick={() => goTo(idx, idx > active ? 'next' : 'prev')}
                className="relative flex-shrink-0 cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: active === idx ? -8 : 0,
                  scale: active === idx ? 1.1 : 1,
                  zIndex: active === idx ? 10 : 1,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div 
                  className={`rounded-lg overflow-hidden shadow-lg border-2 transition-all duration-500 ${
                    active === idx 
                      ? 'border-[#b6ffb0] shadow-[#b6ffb0]/30' 
                      : 'border-transparent opacity-70 group-hover:opacity-90 group-hover:border-white/30'
                  }`}
                  style={{ 
                    backgroundImage: `url(${slide.image})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    width: '80px',
                    height: '60px'
                  }}
                />
                
                {/* Overlay pour le titre */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-lg transition-opacity duration-300 ${
                  active === idx ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`} />
                
                <div className={`absolute bottom-1 left-1 right-1 text-center text-white text-xs font-semibold transition-all duration-300 ${
                  active === idx ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}>
                  {slide.titre}
                </div>
                
                {/* Indicateur actif */}
                {active === idx && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-[#b6ffb0] rounded-full shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Indicateur de progression temporelle */}
        <div className="mt-4 flex space-x-1">
          {slides.map((_, idx) => (
            <motion.div
              key={idx}
              className={`h-1 rounded-full transition-all duration-300 ${
                active === idx ? 'bg-[#b6ffb0] w-8' : 'bg-white/30 w-4'
              }`}
              initial={false}
              animate={{
                width: active === idx ? 32 : 16,
                backgroundColor: active === idx ? '#b6ffb0' : 'rgba(255, 255, 255, 0.3)'
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSlider; 