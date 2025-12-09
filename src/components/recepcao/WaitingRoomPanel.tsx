import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  User, 
  Play, 
  MoreVertical,
  AlertTriangle,
  Phone
} from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface WaitingPatient {
  id: string;
  name: string;
  initials: string;
  arrivalTime: string;
  waitingMinutes: number;
  service: string;
  professional: string;
  room?: string;
  isUrgent?: boolean;
}

const mockWaitingPatients: WaitingPatient[] = [
  {
    id: "1",
    name: "Maria Silva",
    initials: "MS",
    arrivalTime: "14:25",
    waitingMinutes: 8,
    service: "Consulta Cardiologia",
    professional: "Dr. João Santos",
    room: "Consultório 1",
    isUrgent: false,
  },
  {
    id: "2",
    name: "Carlos Oliveira",
    initials: "CO",
    arrivalTime: "14:20",
    waitingMinutes: 13,
    service: "Fisioterapia",
    professional: "Dra. Ana Costa",
    room: "Sala Fisio",
    isUrgent: false,
  },
  {
    id: "3",
    name: "Ana Paula Mendes",
    initials: "AM",
    arrivalTime: "14:15",
    waitingMinutes: 18,
    service: "Consulta Dermatologia",
    professional: "Dr. Pedro Alves",
    isUrgent: true,
  },
  {
    id: "4",
    name: "Roberto Costa",
    initials: "RC",
    arrivalTime: "14:30",
    waitingMinutes: 3,
    service: "Retorno Cardiologia",
    professional: "Dr. João Santos",
    isUrgent: false,
  },
];

function getWaitingColor(minutes: number) {
  if (minutes <= 10) return { bg: "bg-success/10", text: "text-success", border: "border-success/20" };
  if (minutes <= 20) return { bg: "bg-warning/10", text: "text-warning", border: "border-warning/20" };
  return { bg: "bg-destructive/10", text: "text-destructive", border: "border-destructive/20" };
}

export function WaitingRoomPanel() {
  const [patients, setPatients] = useState(mockWaitingPatients);

  const handleStartAttendance = (patient: WaitingPatient) => {
    toast.success(`Iniciando atendimento de ${patient.name}`, {
      description: `Encaminhando para ${patient.room || 'consultório disponível'}`,
    });
    setPatients(prev => prev.filter(p => p.id !== patient.id));
  };

  const handleCallPatient = (patient: WaitingPatient) => {
    toast.info(`Chamando ${patient.name}...`);
  };

  const handleMarkUrgent = (patientId: string) => {
    setPatients(prev => 
      prev.map(p => 
        p.id === patientId ? { ...p, isUrgent: !p.isUrgent } : p
      )
    );
  };

  const handleRemoveFromQueue = (patientId: string) => {
    setPatients(prev => prev.filter(p => p.id !== patientId));
    toast.success("Paciente removido da fila");
  };

  // Sort by urgency first, then by waiting time
  const sortedPatients = [...patients].sort((a, b) => {
    if (a.isUrgent && !b.isUrgent) return -1;
    if (!a.isUrgent && b.isUrgent) return 1;
    return b.waitingMinutes - a.waitingMinutes;
  });

  if (patients.length === 0) {
    return (
      <div className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Sala de Espera</h3>
          </div>
        </div>
        <div className="text-center py-8">
          <User className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Nenhum paciente aguardando</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
              {patients.length}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Sala de Espera</h3>
            <p className="text-xs text-muted-foreground">Pacientes aguardando atendimento</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {sortedPatients.map((patient, index) => {
          const waitingColor = getWaitingColor(patient.waitingMinutes);
          
          return (
            <div
              key={patient.id}
              className={`group relative p-4 rounded-lg border transition-all duration-300 hover:shadow-md animate-fade-in ${
                patient.isUrgent 
                  ? "bg-destructive/5 border-destructive/30 hover:border-destructive/50" 
                  : "bg-background/50 border-border/50 hover:border-primary/30"
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Urgent indicator */}
              {patient.isUrgent && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-destructive rounded-l-lg" />
              )}

              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className={`h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  patient.isUrgent ? "bg-destructive/10 ring-2 ring-destructive/20" : "bg-primary/10"
                }`}>
                  <span className={`text-sm font-bold ${patient.isUrgent ? "text-destructive" : "text-primary"}`}>
                    {patient.initials}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground truncate">{patient.name}</h4>
                    {patient.isUrgent && (
                      <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-[10px] px-1.5 py-0">
                        <AlertTriangle className="h-2.5 w-2.5 mr-0.5" />
                        Urgente
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-xs text-muted-foreground truncate mb-2">
                    {patient.service} • {patient.professional}
                  </p>

                  <div className="flex items-center gap-3">
                    <Badge 
                      variant="outline" 
                      className={`${waitingColor.bg} ${waitingColor.text} ${waitingColor.border} text-xs`}
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      {patient.waitingMinutes} min
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Chegou às {patient.arrivalTime}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Button
                    size="sm"
                    onClick={() => handleStartAttendance(patient)}
                    className="h-8 gap-1.5"
                  >
                    <Play className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Atender</span>
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleCallPatient(patient)}>
                        <Phone className="h-4 w-4 mr-2" />
                        Chamar paciente
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleMarkUrgent(patient.id)}>
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        {patient.isUrgent ? "Remover urgência" : "Marcar urgente"}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleRemoveFromQueue(patient.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        Remover da fila
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
        <span>{patients.length} paciente{patients.length !== 1 ? 's' : ''} aguardando</span>
        <span>
          Tempo médio: {Math.round(patients.reduce((acc, p) => acc + p.waitingMinutes, 0) / patients.length)} min
        </span>
      </div>
    </div>
  );
}
