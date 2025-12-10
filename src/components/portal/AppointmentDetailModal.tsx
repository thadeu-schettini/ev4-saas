import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Video, 
  MapPin,
  Phone,
  Mail,
  Star,
  AlertTriangle,
  Check,
  X,
  RefreshCw
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

interface Appointment {
  id: number;
  date: string;
  time: string;
  professional: string;
  specialty: string;
  status: string;
  type: string;
}

interface AppointmentDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: Appointment | null;
  mode: "view" | "reschedule" | "cancel";
}

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "14:00", "14:30", "15:00", "15:30", "16:00"
];

const cancelReasons = [
  { value: "conflict", label: "Conflito de horário" },
  { value: "health", label: "Problema de saúde" },
  { value: "personal", label: "Motivo pessoal" },
  { value: "financial", label: "Motivo financeiro" },
  { value: "other", label: "Outro motivo" },
];

export function AppointmentDetailModal({ 
  open, 
  onOpenChange, 
  appointment,
  mode: initialMode 
}: AppointmentDetailModalProps) {
  const [mode, setMode] = useState(initialMode);
  const [newDate, setNewDate] = useState<Date | undefined>();
  const [newTime, setNewTime] = useState<string>("");
  const [cancelReason, setCancelReason] = useState<string>("");
  const [cancelDetails, setCancelDetails] = useState("");

  if (!appointment) return null;

  const handleConfirm = () => {
    toast.success("Presença confirmada!", {
      description: "Você receberá um lembrete 1 hora antes."
    });
    onOpenChange(false);
  };

  const handleReschedule = () => {
    if (!newDate || !newTime) {
      toast.error("Selecione uma nova data e horário");
      return;
    }
    toast.success("Consulta remarcada com sucesso!", {
      description: `Nova data: ${format(newDate, "dd/MM/yyyy")} às ${newTime}`
    });
    onOpenChange(false);
  };

  const handleCancel = () => {
    if (!cancelReason) {
      toast.error("Selecione um motivo de cancelamento");
      return;
    }
    toast.success("Consulta cancelada", {
      description: "Esperamos vê-lo em breve!"
    });
    onOpenChange(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-status-confirmed/10 text-status-confirmed border-status-confirmed/20">Confirmado</Badge>;
      case "pending":
        return <Badge className="bg-status-pending/10 text-status-pending border-status-pending/20">Aguardando Confirmação</Badge>;
      case "scheduled":
        return <Badge className="bg-info/10 text-info border-info/20">Agendado</Badge>;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card/95 backdrop-blur-xl border-2 border-primary/20 rounded-2xl shadow-2xl">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-xl",
              mode === "cancel" 
                ? "bg-gradient-to-br from-destructive to-destructive/70" 
                : "bg-gradient-to-br from-primary to-primary/70"
            )}>
              {mode === "cancel" ? (
                <X className="h-5 w-5 text-destructive-foreground" />
              ) : mode === "reschedule" ? (
                <RefreshCw className="h-5 w-5 text-primary-foreground" />
              ) : (
                <CalendarIcon className="h-5 w-5 text-primary-foreground" />
              )}
            </div>
            {mode === "cancel" ? "Cancelar Consulta" :
             mode === "reschedule" ? "Remarcar Consulta" : "Detalhes da Consulta"}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {/* Appointment Info */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{appointment.professional}</h4>
                  {getStatusBadge(appointment.status)}
                </div>
                <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3 w-3 fill-warning text-warning" />
                  <span className="text-xs">4.9 (128 avaliações)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span>{appointment.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{appointment.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm col-span-2">
                {appointment.type === "online" ? (
                  <Video className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                )}
                <span>{appointment.type === "online" ? "Teleconsulta" : "Presencial"}</span>
              </div>
            </div>
          </div>

          {/* View Mode */}
          {mode === "view" && (
            <>
              <div className="p-4 rounded-xl bg-muted/30">
                <h4 className="font-medium mb-3">Informações de Contato</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>(11) 3456-7890</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>contato@medclinic.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Av. Paulista, 1000 - São Paulo, SP</span>
                  </div>
                </div>
              </div>

              {appointment.status === "pending" && (
                <Button onClick={handleConfirm} className="w-full gap-2">
                  <Check className="h-4 w-4" />
                  Confirmar Presença
                </Button>
              )}

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1 gap-2"
                  onClick={() => setMode("reschedule")}
                >
                  <RefreshCw className="h-4 w-4" />
                  Remarcar
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 gap-2 text-destructive hover:text-destructive"
                  onClick={() => setMode("cancel")}
                >
                  <X className="h-4 w-4" />
                  Cancelar
                </Button>
              </div>
            </>
          )}

          {/* Reschedule Mode */}
          {mode === "reschedule" && (
            <>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Nova Data</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newDate ? format(newDate, "dd 'de' MMMM, yyyy", { locale: ptBR }) : "Selecione uma data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={newDate}
                        onSelect={setNewDate}
                        locale={ptBR}
                        disabled={(date) => date < new Date() || date.getDay() === 0}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {newDate && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Novo Horário</label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setNewTime(time)}
                          className={cn(
                            "py-2 px-3 rounded-lg text-sm font-medium transition-all",
                            newTime === time
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted/50 hover:bg-primary/10"
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setMode("view")} className="flex-1">
                  Voltar
                </Button>
                <Button onClick={handleReschedule} className="flex-1 gap-2">
                  <Check className="h-4 w-4" />
                  Confirmar Remarcação
                </Button>
              </div>
            </>
          )}

          {/* Cancel Mode */}
          {mode === "cancel" && (
            <>
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                  <div>
                    <h4 className="font-medium text-destructive">Atenção</h4>
                    <p className="text-sm text-muted-foreground">
                      O cancelamento com menos de 24h de antecedência pode estar sujeito a cobrança.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Motivo do Cancelamento</label>
                  <Select value={cancelReason} onValueChange={setCancelReason}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um motivo" />
                    </SelectTrigger>
                    <SelectContent>
                      {cancelReasons.map((reason) => (
                        <SelectItem key={reason.value} value={reason.value}>
                          {reason.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Detalhes (opcional)</label>
                  <Textarea
                    placeholder="Adicione mais detalhes se necessário..."
                    value={cancelDetails}
                    onChange={(e) => setCancelDetails(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setMode("view")} className="flex-1">
                  Voltar
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleCancel} 
                  className="flex-1 gap-2"
                >
                  <X className="h-4 w-4" />
                  Confirmar Cancelamento
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
