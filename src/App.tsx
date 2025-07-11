
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { TripProvider } from "./contexts/TripContext";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchTrips from "./pages/covoiturage/SearchTrips";
import CreateTrip from "./pages/covoiturage/CreateTrip";
import VehicleRentals from "./pages/location/VehicleRentals";
import BookingForm from "./pages/location/BookingForm";
import Stations from "./pages/Stations";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Emergency from "./pages/Emergency";
import AgentScan from "./pages/AgentScan";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TripProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-background">
              <Navigation />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Routes covoiturage */}
                <Route path="/covoiturage" element={<SearchTrips />} />
                <Route path="/covoiturage/search" element={<SearchTrips />} />
                <Route path="/covoiturage/create" element={
                  <ProtectedRoute>
                    <CreateTrip />
                  </ProtectedRoute>
                } />
                
                {/* Routes location */}
                <Route path="/location" element={<VehicleRentals />} />
                <Route path="/location/book" element={
                  <ProtectedRoute>
                    <BookingForm />
                  </ProtectedRoute>
                } />
                
                {/* Autres routes */}
                <Route path="/stations" element={<Stations />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin" element={
                  <ProtectedRoute adminOnly>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/emergency" element={<Emergency />} />
                <Route path="/agent/scan" element={
                  <ProtectedRoute>
                    <AgentScan />
                  </ProtectedRoute>
                } />
                
                {/* Route catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </TripProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
