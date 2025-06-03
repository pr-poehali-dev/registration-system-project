import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VehicleDetailsPage from "./pages/VehicleDetailsPage";
import ManagerPage from "./pages/ManagerPage";
import AddVehiclePage from "./pages/AddVehiclePage";
import ProfilePage from "./pages/ProfilePage";

const queryClient = new QueryClient();

interface User {
  name: string;
  email: string;
  role: "customer" | "manager";
  phone?: string;
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/vehicle/:id"
              element={
                <VehicleDetailsPage user={user} onLogout={handleLogout} />
              }
            />
            <Route
              path="/manager"
              element={<ManagerPage user={user} onLogout={handleLogout} />}
            />
            <Route
              path="/add-vehicle"
              element={<AddVehiclePage user={user} onLogout={handleLogout} />}
            />
            <Route
              path="/profile"
              element={
                <ProfilePage
                  user={user}
                  onLogout={handleLogout}
                  onUpdateUser={handleUpdateUser}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
