import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldCheck, KeyRound } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAgentAuth } from '@/hooks/useAgentAuth';

const AgentLogin = () => {
  const { isAgentAuthenticated } = useAgentAuth();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Rediriger si déjà authentifié
  React.useEffect(() => {
    if (isAgentAuthenticated) {
      navigate('/agent/scan');
    }
  }, [isAgentAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      if (code === 'AGENT-2024') {
        localStorage.setItem('agent_access_code', code);
        navigate('/agent/scan');
      } else {
        setError('Code d’accès incorrect.');
      }
      setIsSubmitting(false);
    }, 900);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1a13] via-[#1B5B4A]/80 to-[#1a2a2f] pt-20 p-4 relative overflow-hidden">
      {/* Fond animé : particules lumineuses */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-[#C4A91C]/30 rounded-full shadow-lg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1.5px)'
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      {/* Carte glassy animée */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="backdrop-blur-2xl bg-white/10 border border-[#C4A91C]/30 shadow-2xl overflow-hidden">
          <CardHeader className="text-center">
            <motion.div
              className="flex items-center justify-center mb-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <ShieldCheck className="h-8 w-8 text-[#C4A91C] drop-shadow-glow" />
              <span className="text-2xl font-extrabold text-white ml-2 tracking-tight">AGENT</span>
            </motion.div>
            <CardTitle className="text-lg text-white mb-1 tracking-wide">Connexion sécurisée</CardTitle>
            <CardDescription className="text-white/70 text-sm">
              Entrez votre <span className="font-bold text-[#C4A91C]">code d’accès unique</span> pour accéder à l’interface agent.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <label htmlFor="agent-code" className="block text-xs text-white/80 mb-1 ml-1">Code d’accès</label>
                <KeyRound className="absolute left-3 top-7 h-5 w-5 text-[#C4A91C]" />
                <input
                  id="agent-code"
                  type="password"
                  value={code}
                  onChange={e => { setCode(e.target.value); setError(''); }}
                  placeholder="Code d’accès agent"
                  className="w-full rounded-lg pl-10 pr-3 py-2 bg-white/10 border border-[#C4A91C]/30 text-white text-base placeholder:text-[#C4A91C]/50 focus:border-[#C4A91C] focus:ring-[#C4A91C]/30 focus:outline-none transition-all duration-300 shadow-inner"
                  autoFocus
                  disabled={isSubmitting}
                />
              </motion.div>
              <AnimatePresence>
                {error && (
                  <motion.div
                    className="text-[#ff6b6b] text-xs text-center font-semibold drop-shadow"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#C4A91C] via-[#1B5B4A] to-[#C4A91C] text-black font-bold text-base py-2 rounded-lg shadow-lg hover:from-[#1B5B4A] hover:to-[#C4A91C] hover:text-white transition-all duration-300 border-2 border-[#C4A91C]/40"
                  disabled={isSubmitting || !code}
                >
                  {isSubmitting ? 'Connexion...' : 'Se connecter'}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AgentLogin; 