
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Car, Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });
      
      if (success) {
        toast({
          title: "Inscription réussie",
          description: "Votre compte a été créé avec succès !",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Erreur d'inscription",
          description: "Une erreur est survenue lors de la création du compte",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1a13] via-[#0e2233] to-[#1a2a2f] flex items-center justify-center pt-20 p-4 relative overflow-hidden">
      {/* Effet de fond animé */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a13]/20 via-[#0e2233]/20 to-[#1a2a2f]/20 backdrop-blur-sm" />
      
      {/* Particules flottantes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#b6ffb0]/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-lg"
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
            <CardTitle className="text-2xl text-white mb-2">Inscription</CardTitle>
            <CardDescription className="text-white/70 text-base">
            Créez votre compte pour commencer à voyager
          </CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div 
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
              <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white/90">Prénom</Label>
                <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-[#b6ffb0]" />
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Prénom"
                    value={formData.firstName}
                    onChange={handleChange}
                      className="pl-12 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#b6ffb0] focus:ring-[#b6ffb0]/20"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white/90">Nom</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Nom"
                  value={formData.lastName}
                  onChange={handleChange}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#b6ffb0] focus:ring-[#b6ffb0]/20"
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
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Label htmlFor="phone" className="text-white/90">Téléphone</Label>
              <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-[#b6ffb0]" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="77 123 45 67"
                  value={formData.phone}
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
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Label htmlFor="password" className="text-white/90">Mot de passe</Label>
              <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-[#b6ffb0]" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mot de passe"
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
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <Label htmlFor="confirmPassword" className="text-white/90">Confirmer le mot de passe</Label>
              <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-[#b6ffb0]" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirmer le mot de passe"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                    className="pl-12 pr-12 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#b6ffb0] focus:ring-[#b6ffb0]/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-[#b6ffb0] hover:text-white transition-colors"
                >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
              <Checkbox
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, acceptTerms: checked as boolean }))
                }
                  className="border-white/20 data-[state=checked]:bg-[#b6ffb0] data-[state=checked]:border-[#b6ffb0]"
                required
              />
                <Label htmlFor="acceptTerms" className="text-sm text-white/90">
                J'accepte les{' '}
                  <Link to="/terms" className="text-[#b6ffb0] hover:text-white transition-colors">
                  conditions générales
                </Link>
              </Label>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#b6ffb0] to-[#4ecdc4] text-black font-semibold hover:from-[#4ecdc4] hover:to-[#b6ffb0] transition-all duration-300 shadow-lg" 
                  disabled={!formData.acceptTerms || isSubmitting}
                >
                  {isSubmitting ? 'Création du compte...' : 'Créer mon compte'}
            </Button>
              </motion.div>
          </form>

            <motion.div 
              className="mt-8 text-center text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              <span className="text-white/70">Déjà un compte ? </span>
              <Link to="/login" className="text-[#b6ffb0] hover:text-white transition-colors font-medium">
              Se connecter
            </Link>
            </motion.div>
        </CardContent>
      </Card>
      </motion.div>
    </div>
  );
};

export default Register;
