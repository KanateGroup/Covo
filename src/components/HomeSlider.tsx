import React, { useState, useEffect, useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode } from 'lucide-react';

const slides = [
  {
    key: 'covoiturage',
    bg: '/hero-covo.jpg',
    title: 'Covoiturage',
    subtitle: 'Voyagez ensemble, économisez malin',
    description: 'Trouvez ou proposez un trajet en toute sécurité.',
    cta: 'Trouver un covoiturage',
    ctaAction: '/covoiturage',
    ctaType: 'link',
  },
  {
    key: 'trotinette',
    bg: '/hero-trott.jpg',
    title: 'Location de trottinette',
    subtitle: 'Déplacez-vous librement',
    description: 'Louez une trottinette et générez votre QR code.',
    cta: 'Louer une trottinette',
    ctaType: 'popup',
  },
  {
    key: 'offres',
    bg: '/hero-offers.jpg',
    title: 'Offres spéciales',
    subtitle: 'Explorez nos services',
    description: 'Location de véhicules, offres exclusives et plus encore.',
    cta: 'Voir les offres',
    ctaAction: '/offres',
    ctaType: 'link',
  },
];

const SLIDE_DURATION = 7000;

const HomeSlider: React.FC = () => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showPopup, setShowPopup] = useState(false);

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

  const variants = {
    enter: (dir: string) => ({
      opacity: 0,
      scale: 0.98,
      x: dir === 'next' ? 100 : -100,
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.7, ease: 'easeInOut' as const },
    },
    exit: (dir: string) => ({
      opacity: 0,
      scale: 0.98,
      x: dir === 'next' ? -100 : 100,
      transition: { duration: 0.5, ease: 'easeInOut' as const },
    }),
  };

  const handleCTA = (slide: typeof slides[0]) => {
    if (slide.ctaType === 'link' && slide.ctaAction) {
      window.location.href = slide.ctaAction;
    } else if (slide.ctaType === 'popup') {
      setShowPopup(true);
    }
  };

  return (
    <div className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1a13] via-[#0e2233] to-[#1a2a2f]">
      {/* Image de fond immersive + overlay futuriste */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={slides[active].key}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: `url(${slides[active].bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(0px) brightness(0.5)',
            transition: 'background-image 0.7s',
          }}
        />
        {/* Overlay dégradé pour la profondeur */}
        <motion.div
          key={slides[active].key + '-overlay'}
          className="absolute inset-0 bg-gradient-to-br from-[#0a1a13]/90 via-[#0e2233]/70 to-[#1a2a2f]/80 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        />
      </AnimatePresence>
      {/* Bloc principal centré */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-3xl mx-auto text-center">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={slides[active].key + '-content'}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="backdrop-blur-lg bg-black/40 rounded-2xl p-8 md:p-14 shadow-2xl w-full"
          >
            <div className="text-lg text-[#b6ffb0] mb-2 font-light tracking-widest uppercase">{slides[active].subtitle}</div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight drop-shadow-xl">
              {slides[active].title}
            </h1>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">{slides[active].description}</p>
            <Button
              size="lg"
              className="text-lg font-semibold shadow-xl px-8 py-4 bg-gradient-to-r from-[#b6ffb0] to-[#00c896] text-[#0a1a13] hover:from-[#00c896] hover:to-[#b6ffb0]"
              onClick={() => handleCTA(slides[active])}
            >
              {slides[active].cta}
              {slides[active].ctaType === 'popup' && <QrCode className="ml-2 h-5 w-5" />}
            </Button>
          </motion.div>
        </AnimatePresence>
        {/* Slider horizontal centré sous le bloc principal */}
        <div className="w-full flex flex-col items-center mt-10">
          <div className="flex items-center justify-center gap-4 w-full max-w-3xl mx-auto">
            <Carousel opts={{ align: 'center', loop: true }}>
              <CarouselContent className="flex gap-4">
                {slides.map((slide, idx) => (
                  <CarouselItem key={slide.key} className="w-44 cursor-pointer group" onClick={() => goTo(idx, idx > active ? 'next' : 'prev')}>
                    <div className={`rounded-xl overflow-hidden shadow-2xl border-2 transition-all duration-300 ${active === idx ? 'border-[#b6ffb0] scale-110' : 'border-transparent opacity-60 group-hover:opacity-80'}`}
                      style={{ backgroundImage: `url(${slide.bg})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '120px' }}
                    />
                    <div className={`mt-2 text-center text-white text-base font-semibold ${active === idx ? 'opacity-100' : 'opacity-60'}`}>{slide.title}</div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious onClick={handlePrev} />
              <CarouselNext onClick={handleNext} />
            </Carousel>
          </div>
        </div>
      </div>
      {/* Popup trottinette */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
            <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-800" onClick={() => setShowPopup(false)}>&times;</button>
            <h2 className="text-2xl font-bold mb-4">Louer une trottinette</h2>
            {/* Formulaire à compléter ici */}
            <p className="text-gray-600">Formulaire à venir...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeSlider; 