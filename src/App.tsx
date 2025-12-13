import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Meals from "./pages/Meals";
import Restaurant from "./pages/Restaurant";
import Order from "./pages/Order";
import Confirmation from "./pages/Confirmation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>
          {/* Homepage */}
          <Route path="/" element={<Index />} />

          {/* Your new frontend pages */}
          <Route path="/meals" element={<Meals />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/order" element={<Order />} />
          <Route path="/confirmation" element={<Confirmation />} />

          {/* Fallback for any unmatched route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
