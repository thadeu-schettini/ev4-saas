import { useState, useEffect } from "react";
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
  RefreshCw,
  Sparkles,
  CheckCircle2
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
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: "", description: "" });
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode, open]);

  if (!appointment) return null;

  const animateTransition = (newMode: typeof mode) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setMode(newMode);
      setIsTransitioning(false);
    }, 200);
  };

  const showSuccessAnimation = (title: string, description: string) => {
    setSuccessMessage({ title, description });
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onOpenChange(false);
    }, 2500);
  };

  const handleConfirm = () => {
    showSuccessAnimation(
      "Presença Confirmada!",
      "Você receberá um lembrete 1 hora antes."
    );
    toast.success("Presença confirmada!");
  };

  const handleReschedule = () => {
    if (!newDate || !newTime) {
      toast.error("Selecione uma nova data e horário");
      return;
    }
    showSuccessAnimation(
      "Consulta Remarcada!",
      `Nova data: ${format(newDate, "dd/MM/yyyy")} às ${newTime}`
    );
    toast.success("Consulta remarcada com sucesso!");
  };

  const handleCancel = () => {
    if (!cancelReason) {
      toast.error("Selecione um motivo de cancelamento");
      return;
    }
    toast.success("Consulta cancelada");
    onOpenChange(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-status-confirmed/10 text-status-confirmed border-status-confirmed/20 animate-[fade-in_0.3s_ease-out]">Confirmado</Badge>;
      case "pending":
        return <Badge className="bg-status-pending/10 text-status-pending border-status-pending/20 animate-pulse">Aguardando Confirmação</Badge>;
      case "scheduled":
        return <Badge className="bg-info/10 text-info border-info/20 animate-[fade-in_0.3s_ease-out]">Agendado</Badge>;
      case "completed":
        return <Badge className="bg-muted text-muted-foreground">Realizado</Badge>;
      default:
        return null;
    }
  };

  if (showSuccess) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-xl border-2 border-primary/20 rounded-2xl shadow-2xl">
          <div className="flex flex-col items-center py-8 text-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-success to-success/70 flex items-center justify-center mb-4 animate-[bounce-in_0.6s_ease-out]">
                <CheckCircle2 className="h-12 w-12 text-success-foreground" />
              </div>
              <div className="absolute -top-2 -right-2 animate-[bounce_1s_ease-in-out_infinite]">
                <Sparkles className="h-8 w-8 text-warning" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2 animate-[fade-in_0.3s_ease-out_0.3s_both]">
              {successMessage.title}
            </h2>
            <p className="text-muted-foreground animate-[fade-in_0.3s_ease-out_0.4s_both]">
              {successMessage.description}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card/95 backdrop-blur-xl border-2 border-primary/20 rounded-2xl shadow-2xl">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-xl transition-all duration-300",
              mode === "cancel" 
                ? "bg-gradient-to-br from-destructive to-destructive/70" 
                : "bg-gradient-to-br from-primary to-primary/70"
            )}>
              {mode === "cancel" ? (
                <X className="h-5 w-5 text-destructive-foreground animate-[scale-in_0.2s_ease-out]" />
              ) : mode === "reschedule" ? (
                <RefreshCw className="h-5 w-5 text-primary-foreground animate-spin" style={{ animationDuration: '2s' }} />
              ) : (
                <CalendarIcon className="h-5 w-5 text-primary-foreground animate-[scale-in_0.2s_ease-out]" />
              )}
            </div>
            <span className="animate-[fade-in_0.2s_ease-out]">
              {mode === "cancel" ? "Cancelar Consulta" :
               mode === "reschedule" ? "Remarcar Consulta" : "Detalhes da Consulta"}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className={cn(
          "py-4 space-y-4 transition-all duration-300",
          isTransitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
        )}>
          {/* Appointment Info */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 animate-[fade-in_0.3s_ease-out]">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center transition-all hover:scale-110">
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
              <div className="flex items-center gap-2 text-sm p-2 rounded-lg bg-card/50 transition-all hover:bg-card hover:shadow-sm">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span>{appointment.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm p-2 rounded-lg bg-card/50 transition-all hover:bg-card hover:shadow-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{appointment.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm col-span-2 p-2 rounded-lg bg-card/50 transition-all hover:bg-card hover:shadow-sm">
                {appointment.type === "online" ? (
                  <Video className="h-4 w-4 text-info" />
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
              <div className="p-4 rounded-xl bg-muted/30 animate-[fade-in_0.3s_ease-out_0.1s_both]">
                <h4 className="font-medium mb-3">Informações de Contato</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm p-2 rounded-lg transition-all hover:bg-muted">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>(11) 3456-7890</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm p-2 rounded-lg transition-all hover:bg-muted">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>contato@medclinic.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm p-2 rounded-lg transition-all hover:bg-muted">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Av. Paulista, 1000 - São Paulo, SP</span>
                  </div>
                </div>
              </div>

              {appointment.status === "pending" && (
                <Button 
                  onClick={handleConfirm} 
                  className="w-full gap-2 animate-[fade-in_0.3s_ease-out_0.2s_both] hover:scale-[1.02] transition-transform"
                >
                  <Check className="h-4 w-4" />
                  Confirmar Presença
                </Button>
              )}

              <div className="flex gap-2 animate-[fade-in_0.3s_ease-out_0.3s_both]">
                <Button 
                  variant="outline" 
                  className="flex-1 gap-2 hover:scale-[1.02] transition-all"
                  onClick={() => animateTransition("reschedule")}
                >
                  <RefreshCw className="h-4 w-4" />
                  Remarcar
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 hover:scale-[1.02] transition-all"
                  onClick={() => animateTransition("cancel")}
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
              <div className="space-y-4 animate-[fade-in_0.3s_ease-out]">
                <div>
                  <label className="text-sm font-medium mb-2 block">Nova Data</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start hover:scale-[1.01] transition-transform">
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
                  <div className="animate-[fade-in_0.3s_ease-out]">
                    <label className="text-sm font-medium mb-2 block">Novo Horário</label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((time, index) => (
                        <button
                          key={time}
                          onClick={() => setNewTime(time)}
                          style={{ animationDelay: `${index * 30}ms` }}
                          className={cn(
                            "py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 animate-[scale-in_0.2s_ease-out_both]",
                            "hover:scale-105 active:scale-95",
                            newTime === time
                              ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
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
                <Button 
                  variant="outline" 
                  onClick={() => animateTransition("view")} 
                  className="flex-1 hover:scale-[1.02] transition-transform"
                >
                  Voltar
                </Button>
                <Button 
                  onClick={handleReschedule} 
                  className="flex-1 gap-2 hover:scale-[1.02] transition-transform"
                >
                  <Check className="h-4 w-4" />
                  Confirmar Remarcação
                </Button>
              </div>
            </>
          )}

          {/* Cancel Mode */}
          {mode === "cancel" && (
            <>
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 animate-[shake_0.5s_ease-out]">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 animate-pulse" />
                  <div>
                    <h4 className="font-medium text-destructive">Atenção</h4>
                    <p className="text-sm text-muted-foreground">
                      O cancelamento com menos de 24h de antecedência pode estar sujeito a cobrança.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 animate-[fade-in_0.3s_ease-out_0.2s_both]">
                <div>
                  <label className="text-sm font-medium mb-2 block">Motivo do Cancelamento</label>
                  <Select value={cancelReason} onValueChange={setCancelReason}>
                    <SelectTrigger className="transition-all hover:scale-[1.01]">
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
                    className="transition-all focus:scale-[1.01]"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => animateTransition("view")} 
                  className="flex-1 hover:scale-[1.02] transition-transform"
                >
                  Voltar
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleCancel} 
                  className="flex-1 gap-2 hover:scale-[1.02] transition-transform"
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
