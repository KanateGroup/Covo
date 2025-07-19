import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Car, Home, Users, MapPin, Settings, AlertTriangle, LogOut, User, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Navigation = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverHero, setIsOverHero] = useState(true);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;
      
      setIsScrolled(scrollPosition > 50);
      setIsOverHero(scrollPosition < heroHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // Déterminer le style de la navigation selon le scroll
  const getNavStyle = () => {
    if (!isScrolled) {
      // Au début (sur le hero) - transparent
      return "bg-transparent border-transparent";
    } else if (isOverHero) {
      // Sur le hero mais scrollé - glassy sombre
      return "bg-black/20 backdrop-blur-md border-white/10 text-white";
    } else {
      // Après le hero - glassy clair
      return "bg-white/80 backdrop-blur-md border-gray-200/50 text-gray-900 shadow-lg";
    }
  };

  const getButtonStyle = (isActiveButton: boolean) => {
    if (!isScrolled) {
      // Au début - transparent avec texte blanc
      return isActiveButton 
        ? "bg-white/20 text-white border-white/30" 
        : "bg-transparent text-white hover:bg-white/10 border-transparent";
    } else if (isOverHero) {
      // Sur le hero scrollé - glassy sombre
      return isActiveButton 
        ? "bg-white/20 text-white border-white/30" 
        : "bg-transparent text-white hover:bg-white/10 border-transparent";
    } else {
      // Après le hero - glassy clair
      return isActiveButton 
        ? "bg-primary text-primary-foreground" 
        : "bg-transparent text-gray-700 hover:bg-gray-100 border-transparent";
    }
  };

  const getLogoStyle = () => {
    if (!isScrolled || isOverHero) {
      return "text-white";
    } else {
      return "text-primary";
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavStyle()}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Car className={`h-8 w-8 transition-colors duration-300 ${getLogoStyle()}`} />
            <span className={`text-2xl font-bold transition-colors duration-300 ${getLogoStyle()}`}>COVO</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/">
              <Button 
                variant="outline"
                size="sm"
                className={`transition-all duration-300 ${getButtonStyle(isActive('/') && location.pathname === '/')}`}
              >
                <Home className="mr-2 h-4 w-4" />
                Accueil
              </Button>
            </Link>
            <Link to="/covoiturage">
              <Button 
                variant="outline"
                size="sm"
                className={`transition-all duration-300 ${getButtonStyle(isActive('/covoiturage'))}`}
              >
                <Users className="mr-2 h-4 w-4" />
                Covoiturage
              </Button>
            </Link>
            <Link to="/location">
              <Button 
                variant="outline"
                size="sm"
                className={`transition-all duration-300 ${getButtonStyle(isActive('/location'))}`}
              >
                <Car className="mr-2 h-4 w-4" />
                Location
              </Button>
            </Link>
            <Link to="/stations">
              <Button 
                variant="outline"
                size="sm"
                className={`transition-all duration-300 ${getButtonStyle(isActive('/stations'))}`}
              >
                <MapPin className="mr-2 h-4 w-4" />
                Stations
              </Button>
            </Link>
            {/* BOUTON AGENT */}
            <Link to="/agent/login">
              <Button 
                variant="outline"
                size="sm"
                className={`transition-all duration-300 ${getButtonStyle(isActive('/agent'))}`}
              >
                <ShieldCheck className="mr-2 h-4 w-4" />
                Agent
              </Button>
            </Link>
            <Link to="/emergency">
              <Button 
                variant="outline"
                size="sm"
                className={`transition-all duration-300 ${getButtonStyle(isActive('/emergency'))} text-red-400 hover:text-red-300 hover:bg-red-500/20`}
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                SOS
              </Button>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={`transition-all duration-300 ${getButtonStyle(false)}`}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Tableau de bord
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`relative h-8 w-8 rounded-full transition-all duration-300 ${getButtonStyle(false)}`}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">
                        <User className="mr-2 h-4 w-4" />
                        Mon profil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin">
                        <Settings className="mr-2 h-4 w-4" />
                        Administration
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Se déconnecter
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) :
              <>
            <Link to="/login">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={`transition-all duration-300 ${getButtonStyle(false)}`}
                  >
                Connexion
              </Button>
            </Link>
            <Link to="/register">
                  <Button 
                    size="sm"
                    className={`transition-all duration-300 ${
                      !isScrolled || isOverHero 
                        ? "bg-white/20 text-white border-white/30 hover:bg-white/30" 
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                Inscription
              </Button>
            </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;