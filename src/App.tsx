
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import BuyPartsPage from "./pages/BuyPartsPage";
import SellPartsPage from "./pages/SellPartsPage";
import VinDecoderPage from "./pages/VinDecoderPage";
import AiFinderPage from "./pages/AiFinderPage";
import EscrowPage from "./pages/EscrowPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import LoginPage from "./pages/LoginPage";
import BuyerDashboard from "./pages/dashboard/BuyerDashboard";
import SellerDashboard from "./pages/dashboard/SellerDashboard";
import { UserProvider } from "@/context/UserContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="buy" element={<BuyPartsPage />} />
              <Route path="sell" element={<SellPartsPage />} />
              <Route path="vin" element={<VinDecoderPage />} />
              <Route path="ai-finder" element={<AiFinderPage />} />
              <Route path="escrow" element={<EscrowPage />} />
              <Route path="how-it-works" element={<HowItWorksPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            {/* Standalone auth pages */}
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* Dashboard routes */}
            <Route path="/dashboard/buyer" element={<BuyerDashboard />} />
            <Route path="/dashboard/seller" element={<SellerDashboard />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
