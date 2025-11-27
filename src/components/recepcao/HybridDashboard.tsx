import { useState } from "react";
import { AppointmentListItem } from "@/components/AppointmentListItem";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  User,
  DollarSign,
  Filter,
  ChevronDown
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HybridDashboardProps {
  searchQuery: string;
}

// Mock appointment data
const appointments = [
  {
    id: 1,
    time: "08:50",
    status: "pending" as const,
    patientName: "Paciente 35 Glover",
    initials: "PG",
    phone: "551910419730",
    service: "Consulta Cardiologia",
    professional: "Dr(a). Rollin Durgan",
    statusLabel: "Atrasado",
    payment: "Sem pagamento",
    price: "Sem preço"
  },
  {
    id: 2,
    time: "11:30",
    status: "pending" as const,
    patientName: "Paciente 12 Heller",
    initials: "PH",
    phone: "551910135795",
    service: "Consulta Dermatologia",
    professional: "Dr(a). Brayan O'Keefe",
    statusLabel: "Pendente",
    payment: "Sem pagamento",
    price: "Sem preço"
  },
  {
    id: 3,
    time: "12:05",
    status: "completed" as const,
    patientName: "Paciente 7 Cruickshank",
    initials: "PC",
    phone: "551910074070",
    service: "Consulta Dermatologia",
    professional: "Dr(a). Cleta Bogisich",
    statusLabel: "Realizado",
    payment: "Pago",
    price: "R$ 210,00"
  },
  {
    id: 4,
    time: "14:00",
    status: "confirmed" as const,
    patientName: "Ana Paula Silva",
    initials: "AS",
    phone: "551987654321",
    service: "Consulta Ortopedia",
    professional: "Dr. Carlos Mendes",
    statusLabel: "Confirmado",
    payment: "Pendente",
    price: "R$ 180,00"
  },
  {
    id: 5,
    time: "15:30",
    status: "confirmed" as const,
    patientName: "Roberto Costa",
    initials: "RC",
    phone: "551912345678",
    service: "Retorno Cardiologia",
    professional: "Dr(a). Rollin Durgan",
    statusLabel: "Confirmado",
    payment: "Pago",
    price: "R$ 150,00"
  }
];

const pendingCharges = [
  { id: 1, patient: "Paciente 15 Mohr", initials: "PM", value: "R$ 200,00", date: "16/11/2025, 10:45" },
  { id: 2, patient: "Paciente 8 Tromp", initials: "PT", value: "R$ 270,00", date: "16/11/2025, 05:00" },
  { id: 3, patient: "Paciente 50 Hamill", initials: "PH", value: "R$ 220,00", date: "14/11/2025, 12:00" },
  { id: 4, patient: "Paciente 46 Aufderhar", initials: "PA", value: "R$ 290,00", date: "13/11/2025, 09:00" }
];

export const HybridDashboard = ({ searchQuery }: HybridDashboardProps) => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAllAppointments, setShowAllAppointments] = useState(false);

  // Filter appointments based on search and status
  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = searchQuery === "" || 
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.professional.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.service.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || apt.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const displayedAppointments = showAllAppointments 
    ? filteredAppointments 
    : filteredAppointments.slice(0, 6);

  return (
    <div className="space-y-6 animate-fade-in [animation-delay:200ms]">
      {/* Agenda do Dia */}
      <div className="p-4 sm:p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              Agenda do Dia
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Quinta-feira, 27 de novembro de 2025
            </p>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-background/50">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrar status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="confirmed">Confirmado</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="delayed">Atrasado</SelectItem>
                <SelectItem value="completed">Realizado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          {displayedAppointments.map((apt, index) => (
            <div
              key={apt.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <AppointmentListItem {...apt} />
            </div>
          ))}
        </div>

        {filteredAppointments.length > 6 && (
          <div className="mt-4 text-center">
            <Button
              variant="outline"
              onClick={() => setShowAllAppointments(!showAllAppointments)}
              className="hover:bg-primary/5"
            >
              {showAllAppointments ? "Mostrar menos" : `Ver mais ${filteredAppointments.length - 6} agendamentos`}
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showAllAppointments ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        )}

        {filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum agendamento encontrado</p>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground text-center">
            Mostrando {displayedAppointments.length} de {filteredAppointments.length} registros
          </p>
        </div>
      </div>

      {/* Cobranças Pendentes */}
      <div className="p-4 sm:p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-warning" />
              Cobranças Pendentes
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Itens pendentes ou atrasados (todas as datas)
            </p>
          </div>
          <Badge variant="secondary" className="bg-warning/10 text-warning">
            {pendingCharges.length} pendentes
          </Badge>
        </div>

        <div className="space-y-3">
          {pendingCharges.map((charge, index) => (
            <div
              key={charge.id}
              className="group p-4 bg-background/50 rounded-lg border border-border/50 hover:border-warning/30 hover:shadow-md transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-sm font-bold text-warning">{charge.initials}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground truncate">{charge.patient}</h4>
                  <p className="text-xs text-muted-foreground">{charge.date}</p>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-bold text-warning">{charge.value}</p>
                  <Badge variant="secondary" className="text-xs bg-warning/10 text-warning mt-1">
                    Pendente
                  </Badge>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <Button size="sm" variant="outline" className="h-8 hover:bg-primary/5">
                    <User className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 hover:bg-success/5">
                    <DollarSign className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground text-center">
            Mostrando 1 a {pendingCharges.length} de {pendingCharges.length} registros
          </p>
        </div>
      </div>
    </div>
  );
};
