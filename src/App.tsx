import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { ThemeColorProvider } from "@/hooks/use-theme-color";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { MainLayout } from "@/layouts/MainLayout";
import Index from "./pages/Index";
import Calendar from "./pages/Calendar";
import Prontuario from "./pages/Prontuario";
import Recepcao from "./pages/Recepcao";
import Indicacoes from "./pages/Indicacoes";
import Billing from "./pages/Billing";
import Financeiro from "./pages/Financeiro";
import Configuracoes from "./pages/Configuracoes";
import Profissionais from "./pages/Profissionais";
import FormulariosClinicos from "./pages/FormulariosClinicos";
import Pacientes from "./pages/Pacientes";
import Notificacoes from "./pages/Notificacoes";
import Servicos from "./pages/Servicos";
import PlanosAtendimento from "./pages/PlanosAtendimento";
import Telemedicina from "./pages/Telemedicina";
import Relatorios from "./pages/Relatorios";
import Analises from "./pages/Analises";
import Avaliacoes from "./pages/Avaliacoes";
import Pipeline from "./pages/Pipeline";
import Chat from "./pages/Chat";
import PortalPaciente from "./pages/PortalPaciente";
import SuperAdmin from "./pages/SuperAdmin";
import MeuPerfil from "./pages/MeuPerfil";
import Ajuda from "./pages/Ajuda";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
// New feature pages
import Triagem from "./pages/Triagem";
import Protocolos from "./pages/Protocolos";
import Interconsulta from "./pages/Interconsulta";
import Produtividade from "./pages/Produtividade";
import PrevisaoDemanda from "./pages/PrevisaoDemanda";
import Estoque from "./pages/Estoque";
import LembretesMedicacao from "./pages/LembretesMedicacao";
import Consentimentos from "./pages/Consentimentos";
import PesquisaNPS from "./pages/PesquisaNPS";
import IntegracaoLaboratorios from "./pages/IntegracaoLaboratorios";
import ReceitaDigital from "./pages/ReceitaDigital";
import WhatsAppBusiness from "./pages/WhatsAppBusiness";
import PedidosCompra from "./pages/PedidosCompra";
import AvaliacaoPaciente from "./pages/AvaliacaoPaciente";
import Cupons from "./pages/Cupons";
import Parceiros from "./pages/Parceiros";
import DetalhesConsulta from "./pages/DetalhesConsulta";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeColorProvider>
        <ErrorBoundary>
          <TooltipProvider>
            <Toaster />
            <Sonner />
          <BrowserRouter>
            <Routes>
            {/* Auth pages without MainLayout */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            
            {/* App routes with MainLayout */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/prontuario" element={<Prontuario />} />
              <Route path="/recepcao" element={<Recepcao />} />
              <Route path="/indicacoes" element={<Indicacoes />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/financeiro" element={<Financeiro />} />
              <Route path="/configuracoes" element={<Configuracoes />} />
              <Route path="/profissionais" element={<Profissionais />} />
              <Route path="/formularios-clinicos" element={<FormulariosClinicos />} />
              <Route path="/pacientes" element={<Pacientes />} />
              <Route path="/notificacoes" element={<Notificacoes />} />
              <Route path="/servicos" element={<Servicos />} />
              <Route path="/planos-atendimento" element={<PlanosAtendimento />} />
              <Route path="/telemedicina" element={<Telemedicina />} />
              <Route path="/relatorios" element={<Relatorios />} />
              <Route path="/analises" element={<Analises />} />
              <Route path="/avaliacoes" element={<Avaliacoes />} />
              <Route path="/pipeline" element={<Pipeline />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/superadmin" element={<SuperAdmin />} />
              <Route path="/meu-perfil" element={<MeuPerfil />} />
              <Route path="/ajuda" element={<Ajuda />} />
              {/* New feature routes */}
              <Route path="/triagem" element={<Triagem />} />
              <Route path="/protocolos" element={<Protocolos />} />
              <Route path="/interconsulta" element={<Interconsulta />} />
              <Route path="/produtividade" element={<Produtividade />} />
              <Route path="/previsao-demanda" element={<PrevisaoDemanda />} />
              <Route path="/estoque" element={<Estoque />} />
              <Route path="/lembretes-medicacao" element={<LembretesMedicacao />} />
              <Route path="/consentimentos" element={<Consentimentos />} />
              <Route path="/pesquisa-nps" element={<PesquisaNPS />} />
              <Route path="/integracao-laboratorios" element={<IntegracaoLaboratorios />} />
              <Route path="/receita-digital" element={<ReceitaDigital />} />
              <Route path="/whatsapp-business" element={<WhatsAppBusiness />} />
              <Route path="/pedidos-compra" element={<PedidosCompra />} />
              <Route path="/cupons" element={<Cupons />} />
              <Route path="/parceiros" element={<Parceiros />} />
            </Route>
            
            {/* Portal Paciente - separate layout */}
            <Route path="/portal-paciente" element={<PortalPaciente />} />
            
            {/* Public patient evaluation page */}
            <Route path="/avaliacao/:id" element={<AvaliacaoPaciente />} />
            
            {/* Public appointment details page */}
            <Route path="/consulta/:id" element={<DetalhesConsulta />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          </TooltipProvider>
        </ErrorBoundary>
      </ThemeColorProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;