import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VehicleDetailsPage from "./pages/VehicleDetailsPage";
import ManagerPage from "./pages/ManagerPage";
import AddVehiclePage from "./pages/AddVehiclePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/vehicle/:id"
            element={<VehicleDetailsPage user={null} onLogout={() => {}} />}
          />
          <Route
            path="/manager"
            element={<ManagerPage user={null} onLogout={() => {}} />}
          />
          <Route
            path="/add-vehicle"
            element={<AddVehiclePage user={null} onLogout={() => {}} />}
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
