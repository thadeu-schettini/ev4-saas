import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import Index from "./pages/Index";
import Calendar from "./pages/Calendar";
import Prontuario from "./pages/Prontuario";
import Recepcao from "./pages/Recepcao";
import Indicacoes from "./pages/Indicacoes";
import Billing from "./pages/Billing";
import Configuracoes from "./pages/Configuracoes";
import Profissionais from "./pages/Profissionais";
import FormulariosClinicos from "./pages/FormulariosClinicos";
import Pacientes from "./pages/Pacientes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/prontuario" element={<Prontuario />} />
            <Route path="/recepcao" element={<Recepcao />} />
            <Route path="/indicacoes" element={<Indicacoes />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
            <Route path="/profissionais" element={<Profissionais />} />
            <Route path="/formularios-clinicos" element={<FormulariosClinicos />} />
            <Route path="/pacientes" element={<Pacientes />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
