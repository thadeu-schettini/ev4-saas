import { useState } from "react";
import { Link } from "react-router-dom";
import { AppointmentCard } from "@/components/AppointmentCard";
import { Button } from "@/components/ui/button";
import { Calendar, Users } from "lucide-react";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary/3 p-4 md:p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent mb-2">
            Sistema de Agendamentos
          </h1>
          <p className="text-muted-foreground">Gerencie seus atendimentos com facilidade e eficiência</p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <Button 
            onClick={() => setIsModalOpen(true)}
            size="lg"
            className="shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Ver Detalhes do Agendamento
          </Button>

          <Link to="/recepcao">
            <Button 
              size="lg"
              variant="outline"
              className="shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Users className="h-5 w-5 mr-2" />
              Ir para Recepção
            </Button>
          </Link>
        </div>

        <AppointmentCard open={isModalOpen} onOpenChange={setIsModalOpen} />
      </div>
    </div>
  );
};

export default Index;
