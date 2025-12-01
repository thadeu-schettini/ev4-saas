import { useState } from "react";
import { Link } from "react-router-dom";
import { AppointmentCard } from "@/components/AppointmentCard";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Settings, UserCog, ClipboardList } from "lucide-react";
import WelcomeSetupModal from "@/components/WelcomeSetupModal";
import SetupChecklist from "@/components/SetupChecklist";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary/3 p-2 sm:p-4 md:p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-6 sm:mb-8 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent mb-2">
            Sistema de Agendamentos
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">Gerencie seus atendimentos com facilidade e eficiência</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button 
            onClick={() => setIsModalOpen(true)}
            size="lg"
            className="shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Ver Detalhes do Agendamento
          </Button>

          <Link to="/recepcao" className="w-full sm:w-auto">
            <Button 
              size="lg"
              variant="outline"
              className="shadow-lg hover:shadow-xl transition-all duration-300 w-full"
            >
              <Users className="h-5 w-5 mr-2" />
              Ir para Recepção
            </Button>
          </Link>

          <Link to="/profissionais" className="w-full sm:w-auto">
            <Button 
              size="lg"
              variant="outline"
              className="shadow-lg hover:shadow-xl transition-all duration-300 w-full"
            >
              <UserCog className="h-5 w-5 mr-2" />
              Profissionais
            </Button>
          </Link>

          <Link to="/formularios-clinicos" className="w-full sm:w-auto">
            <Button 
              size="lg"
              variant="outline"
              className="shadow-lg hover:shadow-xl transition-all duration-300 w-full"
            >
              <ClipboardList className="h-5 w-5 mr-2" />
              Formulários Clínicos
            </Button>
          </Link>

          <Link to="/configuracoes" className="w-full sm:w-auto">
            <Button 
              size="lg"
              variant="outline"
              className="shadow-lg hover:shadow-xl transition-all duration-300 w-full"
            >
              <Settings className="h-5 w-5 mr-2" />
              Configurações
            </Button>
          </Link>
        </div>

        <AppointmentCard open={isModalOpen} onOpenChange={setIsModalOpen} />
      </div>

      {/* Setup components */}
      <WelcomeSetupModal open={showWelcomeModal} onOpenChange={setShowWelcomeModal} />
      <SetupChecklist />
    </div>
  );
};

export default Index;
