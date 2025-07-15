
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Car, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Récupérer l'URL de retour depuis l'état de location
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur COVO !",
        });
        navigate(from);
      } else {
        toast({
          title: "Erreur de connexion",
          description: "Email ou mot de passe incorrect",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la connexion",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1a13] via-[#0e2233] to-[#1a2a2f] flex items-center justify-center pt-20 p-4 relative overflow-hidden">
      {/* Effet de fond animé */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a13]/20 via-[#0e2233]/20 to-[#1a2a2f]/20 backdrop-blur-sm" />
      
      {/* Particules flottantes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#b6ffb0]/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl">
        <CardHeader className="text-center">
            <motion.div 
              className="flex items-center justify-center mb-6"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Car className="h-12 w-12 text-[#b6ffb0]" />
              <span className="text-4xl font-bold text-white ml-3">COVO</span>
            </motion.div>
            <CardTitle className="text-2xl text-white mb-2">Connexion</CardTitle>
            <CardDescription className="text-white/70 text-base">
            Connectez-vous pour accéder à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Label htmlFor="email" className="text-white/90">Email</Label>
              <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-[#b6ffb0]" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={handleChange}
                    className="pl-12 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#b6ffb0] focus:ring-[#b6ffb0]/20"
                  required
                />
              </div>
              </motion.div>
            
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Label htmlFor="password" className="text-white/90">Mot de passe</Label>
              <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-[#b6ffb0]" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Votre mot de passe"
                  value={formData.password}
                  onChange={handleChange}
                    className="pl-12 pr-12 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#b6ffb0] focus:ring-[#b6ffb0]/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-[#b6ffb0] hover:text-white transition-colors"
                >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              </motion.div>

              <motion.div 
                className="flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Link to="/forgot-password" className="text-sm text-[#b6ffb0] hover:text-white transition-colors">
                Mot de passe oublié ?
              </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#b6ffb0] to-[#4ecdc4] text-black font-semibold hover:from-[#4ecdc4] hover:to-[#b6ffb0] transition-all duration-300 shadow-lg" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Connexion...' : 'Se connecter'}
            </Button>
              </motion.div>
          </form>

            <motion.div 
              className="mt-8 text-center text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <span className="text-white/70">Pas encore de compte ? </span>
              <Link to="/register" className="text-[#b6ffb0] hover:text-white transition-colors font-medium">
              Créer un compte
            </Link>
            </motion.div>
        </CardContent>
      </Card>
      </motion.div>
    </div>
  );
};

export default Login;
