
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Car, Home, Users, MapPin, Settings, AlertTriangle } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-gradient">COVO</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/">
              <Button 
                variant={isActive('/') && location.pathname === '/' ? 'default' : 'ghost'}
                size="sm"
              >
                <Home className="mr-2 h-4 w-4" />
                Accueil
              </Button>
            </Link>
            <Link to="/covoiturage">
              <Button 
                variant={isActive('/covoiturage') ? 'default' : 'ghost'}
                size="sm"
              >
                <Users className="mr-2 h-4 w-4" />
                Covoiturage
              </Button>
            </Link>
            <Link to="/location">
              <Button 
                variant={isActive('/location') ? 'default' : 'ghost'}
                size="sm"
              >
                <Car className="mr-2 h-4 w-4" />
                Location
              </Button>
            </Link>
            <Link to="/stations">
              <Button 
                variant={isActive('/stations') ? 'default' : 'ghost'}
                size="sm"
              >
                <MapPin className="mr-2 h-4 w-4" />
                Stations
              </Button>
            </Link>
            <Link to="/emergency">
              <Button 
                variant={isActive('/emergency') ? 'default' : 'ghost'}
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                SOS
              </Button>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <Link to="/login">
              <Button variant="outline" size="sm">
                Connexion
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm">
                Inscription
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
