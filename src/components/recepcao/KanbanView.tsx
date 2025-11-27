import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Clock, User, Stethoscope, DollarSign, CheckCircle2 } from "lucide-react";

interface KanbanViewProps {
  searchQuery: string;
}

const allAppointments = [
  {
    id: 1,
    patientName: "Maria Silva",
    initials: "MS",
    time: "09:30",
    professional: "Dr. João Santos",
    service: "Consulta Cardiologia",
    status: "waiting_confirmation",
    price: "R$ 200,00"
  },
  {
    id: 2,
    patientName: "Paciente 35 Glover",
    initials: "PG",
    time: "08:50",
    professional: "Dr(a). Rollin Durgan",
    service: "Consulta Cardiologia",
    status: "in_service",
    price: "R$ 180,00"
  },
  {
    id: 3,
    patientName: "Paciente 7 Cruickshank",
    initials: "PC",
    time: "12:05",
    professional: "Dr(a). Cleta Bogisich",
    service: "Consulta Dermatologia",
    status: "completed",
    price: "R$ 210,00"
  },
  {
    id: 4,
    patientName: "Carlos Oliveira",
    initials: "CO",
    time: "10:00",
    professional: "Dra. Ana Costa",
    service: "Consulta Dermatologia",
    status: "waiting_confirmation",
    price: "R$ 150,00"
  }
];

const columns = [
  {
    id: "waiting_confirmation",
    title: "Aguardando Confirmação",
    color: "bg-warning/10",
    borderColor: "border-warning/50",
    badgeColor: "bg-warning/20 text-warning"
  },
  {
    id: "confirmed",
    title: "Confirmado",
    color: "bg-primary/10",
    borderColor: "border-primary/50",
    badgeColor: "bg-primary/20 text-primary"
  },
  {
    id: "in_service",
    title: "Em Atendimento",
    color: "bg-accent/10",
    borderColor: "border-accent/50",
    badgeColor: "bg-accent/20 text-accent"
  },
  {
    id: "completed",
    title: "Finalizado",
    color: "bg-success/10",
    borderColor: "border-success/50",
    badgeColor: "bg-success/20 text-success"
  }
];

export const KanbanView = ({ searchQuery }: KanbanViewProps) => {
  const filteredAppointments = allAppointments.filter(apt =>
    searchQuery === "" ||
    apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apt.professional.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apt.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const AppointmentCard = ({ apt }: { apt: typeof allAppointments[0] }) => (
    <div className="group p-4 bg-background/80 backdrop-blur-sm rounded-lg border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-move">
      <div className="flex items-start gap-3 mb-3">
        <Avatar className="h-10 w-10 border-2 border-primary/20">
          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
            {apt.initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-foreground truncate">{apt.patientName}</h4>
          <p className="text-xs text-muted-foreground truncate">{apt.service}</p>
        </div>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-xs">
          <Clock className="h-3.5 w-3.5 text-primary flex-shrink-0" />
          <span className="text-muted-foreground">{apt.time}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Stethoscope className="h-3.5 w-3.5 text-accent flex-shrink-0" />
          <span className="text-muted-foreground truncate">{apt.professional}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <DollarSign className="h-3.5 w-3.5 text-success flex-shrink-0" />
          <span className="text-muted-foreground">{apt.price}</span>
        </div>
      </div>

      <Button
        size="sm"
        variant="outline"
        className="w-full text-xs hover:bg-primary/5"
      >
        <User className="h-3 w-3 mr-1" />
        Ver Detalhes
      </Button>
    </div>
  );

  return (
    <div className="animate-fade-in [animation-delay:200ms]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((column, columnIndex) => {
          const columnAppointments = filteredAppointments.filter(
            apt => apt.status === column.id
          );

          return (
            <div
              key={column.id}
              className={`p-4 rounded-xl border-2 ${column.borderColor} ${column.color} min-h-[400px] animate-fade-in`}
              style={{ animationDelay: `${columnIndex * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/50">
                <h3 className="text-sm font-semibold text-foreground">{column.title}</h3>
                <Badge variant="secondary" className={column.badgeColor}>
                  {columnAppointments.length}
                </Badge>
              </div>

              <div className="space-y-3">
                {columnAppointments.map((apt, index) => (
                  <div
                    key={apt.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <AppointmentCard apt={apt} />
                  </div>
                ))}

                {columnAppointments.length === 0 && (
                  <div className="text-center py-8">
                    <CheckCircle2 className="h-12 w-12 text-muted-foreground/30 mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Nenhum agendamento</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
