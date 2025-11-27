import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Clock,
  Stethoscope,
  DollarSign,
  MessageCircle,
  User,
  CheckCircle2,
  MoreVertical
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SmartGridProps {
  searchQuery: string;
}

const appointments = [
  {
    id: 1,
    patientName: "Paciente 35 Glover",
    initials: "PG",
    time: "08:50",
    status: "delayed",
    statusLabel: "Atrasado",
    statusColor: "bg-destructive/10 text-destructive",
    professional: "Dr(a). Rollin Durgan",
    service: "Consulta Cardiologia",
    price: "R$ 200,00",
    payment: "Pendente",
    phone: "551910419730"
  },
  {
    id: 2,
    patientName: "Paciente 12 Heller",
    initials: "PH",
    time: "11:30",
    status: "pending",
    statusLabel: "Pendente",
    statusColor: "bg-warning/10 text-warning",
    professional: "Dr(a). Brayan O'Keefe",
    service: "Consulta Dermatologia",
    price: "R$ 180,00",
    payment: "Pendente",
    phone: "551910135795"
  },
  {
    id: 3,
    patientName: "Paciente 7 Cruickshank",
    initials: "PC",
    time: "12:05",
    status: "completed",
    statusLabel: "Realizado",
    statusColor: "bg-success/10 text-success",
    professional: "Dr(a). Cleta Bogisich",
    service: "Consulta Dermatologia",
    price: "R$ 210,00",
    payment: "Pago",
    phone: "551910074070"
  },
  {
    id: 4,
    patientName: "Ana Paula Silva",
    initials: "AS",
    time: "14:00",
    status: "confirmed",
    statusLabel: "Confirmado",
    statusColor: "bg-primary/10 text-primary",
    professional: "Dr. Carlos Mendes",
    service: "Consulta Ortopedia",
    price: "R$ 180,00",
    payment: "Pendente",
    phone: "551987654321"
  },
  {
    id: 5,
    patientName: "Roberto Costa",
    initials: "RC",
    time: "15:30",
    status: "confirmed",
    statusLabel: "Confirmado",
    statusColor: "bg-primary/10 text-primary",
    professional: "Dr(a). Rollin Durgan",
    service: "Retorno Cardiologia",
    price: "R$ 150,00",
    payment: "Pago",
    phone: "551912345678"
  },
  {
    id: 6,
    patientName: "Mariana Santos",
    initials: "MS",
    time: "16:00",
    status: "confirmed",
    statusLabel: "Confirmado",
    statusColor: "bg-primary/10 text-primary",
    professional: "Dra. Ana Costa",
    service: "Consulta Dermatologia",
    price: "R$ 190,00",
    payment: "Pendente",
    phone: "551998765432"
  }
];

export const SmartGrid = ({ searchQuery }: SmartGridProps) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const filteredAppointments = appointments.filter(apt =>
    searchQuery === "" ||
    apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apt.professional.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apt.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-fade-in [animation-delay:200ms]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredAppointments.map((apt, index) => (
          <div
            key={apt.id}
            className="group relative p-4 sm:p-5 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
            onMouseEnter={() => setHoveredCard(apt.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Avatar className="h-12 w-12 border-2 border-primary/20 group-hover:border-primary/40 transition-colors">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {apt.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground truncate">{apt.patientName}</h4>
                  <Badge variant="secondary" className={`text-xs mt-1 ${apt.statusColor}`}>
                    {apt.statusLabel}
                  </Badge>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <User className="h-4 w-4 mr-2" />
                    Ver Prontuário
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Check-in
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Enviar Mensagem
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Info */}
            <div className="space-y-3 mb-4">
              <div className="p-3 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Serviço</p>
                <p className="text-sm font-medium text-foreground">{apt.service}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Horário</p>
                    <p className="text-sm font-semibold text-foreground">{apt.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="h-4 w-4 text-success" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Valor</p>
                    <p className="text-sm font-semibold text-foreground truncate">{apt.price}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 bg-muted/20 rounded-lg">
                <Stethoscope className="h-4 w-4 text-accent flex-shrink-0" />
                <p className="text-xs text-muted-foreground truncate">{apt.professional}</p>
              </div>
            </div>

            {/* Actions - Revealed on Hover */}
            <div
              className={`grid grid-cols-2 gap-2 transition-all duration-300 ${
                hoveredCard === apt.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
            >
              <Button
                size="sm"
                variant="outline"
                className="text-xs hover:bg-primary/5"
              >
                <User className="h-3 w-3 mr-1" />
                Detalhes
              </Button>
              <Button
                size="sm"
                className="text-xs bg-gradient-to-r from-primary to-primary-glow"
              >
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Check-in
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <div className="text-center py-16 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
          <User className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhum agendamento encontrado</p>
        </div>
      )}
    </div>
  );
};
