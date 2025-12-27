import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  User, 
  Stethoscope, 
  MapPin, 
  Phone, 
  Mail,
  CheckCircle2,
  CalendarClock,
  Video,
  Building2,
  ChevronRight,
  Sparkles,
  Bell,
  FileText,
  CreditCard,
  ArrowLeft,
  Share2,
  Download,
  MessageCircle,
  Navigation,
  Copy,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { format, differenceInDays, differenceInHours } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock appointment data
const appointmentData = {
  id: "APT-2024-001",
  status: "confirmed", // pending, confirmed, completed, cancelled
  date: new Date(2024, 11, 30, 10, 0), // December 30, 2024 at 10:00
  professional: {
    name: "Dra. Marina Santos",
    specialty: "Pediatria",
    crm: "CRM/SP 123456",
    avatar: null,
    phone: "(11) 99999-8888",
    rating: 4.9,
  },
  service: {
    name: "Consulta de Rotina",
    duration: 30,
    price: 280,
    type: "presencial", // presencial, telemedicina
  },
  location: {
    name: "Clínica Saúde Integrada",
    address: "Av. Paulista, 1000 - Sala 501",
    city: "São Paulo - SP",
    phone: "(11) 3333-4444",
    maps: "https://maps.google.com",
  },
  patient: {
    name: "João Silva",
    cpf: "***.***.***-00",
  },
  preparation: [
    "Traga exames anteriores se houver",
    "Chegue com 15 minutos de antecedência",
    "Documento de identificação obrigatório",
  ],
  confirmationCode: "CONF-7X9K2M",
};

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30"
];

export default function DetalhesConsulta() {
  const navigate = useNavigate();
  const [showReschedule, setShowReschedule] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const appointment = appointmentData;
  const daysUntil = differenceInDays(appointment.date, new Date());
  const hoursUntil = differenceInHours(appointment.date, new Date());

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "confirmed":
        return { 
          label: "Confirmado", 
          color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
          icon: CheckCircle2,
          gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent"
        };
      case "pending":
        return { 
          label: "Pendente", 
          color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
          icon: Clock,
          gradient: "from-amber-500/20 via-amber-500/5 to-transparent"
        };
      case "completed":
        return { 
          label: "Realizada", 
          color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
          icon: CheckCircle2,
          gradient: "from-blue-500/20 via-blue-500/5 to-transparent"
        };
      default:
        return { 
          label: "Cancelada", 
          color: "bg-red-500/10 text-red-600 border-red-500/20",
          icon: Clock,
          gradient: "from-red-500/20 via-red-500/5 to-transparent"
        };
    }
  };

  const statusConfig = getStatusConfig(appointment.status);
  const StatusIcon = statusConfig.icon;

  const handleConfirmPresence = () => {
    toast.success("Presença confirmada com sucesso!");
  };

  const handleReschedule = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Selecione data e horário");
      return;
    }
    toast.success("Consulta reagendada com sucesso!");
    setShowReschedule(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(appointment.confirmationCode);
    setCopied(true);
    toast.success("Código copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Hero Status Card */}
        <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${statusConfig.gradient} p-8 mb-6 border border-border/50`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative">
            <div className="flex items-start justify-between mb-6">
              <div>
                <Badge className={`${statusConfig.color} border mb-3`}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {statusConfig.label}
                </Badge>
                <h1 className="text-2xl font-bold text-foreground mb-1">
                  {appointment.service.name}
                </h1>
                <p className="text-muted-foreground">
                  Código: {appointment.confirmationCode}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 ml-1"
                    onClick={handleCopyCode}
                  >
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </p>
              </div>
              
              {/* Countdown */}
              <div className="text-right">
                <div className="bg-background/80 backdrop-blur rounded-2xl p-4 border border-border/50">
                  {daysUntil > 0 ? (
                    <>
                      <span className="text-3xl font-bold text-primary">{daysUntil}</span>
                      <p className="text-xs text-muted-foreground mt-1">dias restantes</p>
                    </>
                  ) : hoursUntil > 0 ? (
                    <>
                      <span className="text-3xl font-bold text-primary">{hoursUntil}</span>
                      <p className="text-xs text-muted-foreground mt-1">horas restantes</p>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-8 w-8 text-primary mx-auto" />
                      <p className="text-xs text-muted-foreground mt-1">Hoje!</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Date & Time Visual */}
            <div className="flex items-center gap-4 bg-background/60 backdrop-blur rounded-2xl p-4 border border-border/50">
              <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-xl flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-primary">
                  {format(appointment.date, "dd")}
                </span>
                <span className="text-xs text-muted-foreground uppercase">
                  {format(appointment.date, "MMM", { locale: ptBR })}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">
                  {format(appointment.date, "EEEE", { locale: ptBR })}
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(appointment.date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </p>
              </div>
              <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-xl">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-semibold text-primary">
                  {format(appointment.date, "HH:mm")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button 
            size="lg" 
            className="h-14 gap-2 rounded-xl"
            onClick={handleConfirmPresence}
          >
            <CheckCircle2 className="h-5 w-5" />
            Confirmar Presença
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="h-14 gap-2 rounded-xl"
            onClick={() => setShowReschedule(true)}
          >
            <CalendarClock className="h-5 w-5" />
            Reagendar
          </Button>
        </div>

        {/* Professional Card */}
        <Card className="mb-4 overflow-hidden border-border/50 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-0">
            <div className="flex items-center gap-4 p-5">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{appointment.professional.name}</h3>
                <p className="text-sm text-muted-foreground">{appointment.professional.specialty}</p>
                <p className="text-xs text-muted-foreground">{appointment.professional.crm}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-amber-500 mb-1">
                  <Sparkles className="h-4 w-4 fill-current" />
                  <span className="font-semibold">{appointment.professional.rating}</span>
                </div>
                <Button variant="ghost" size="sm" className="h-8 gap-1.5">
                  <Phone className="h-3 w-3" />
                  Ligar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service & Location Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {/* Service Info */}
          <Card className="border-border/50 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                  <Stethoscope className="h-5 w-5 text-violet-500" />
                </div>
                <h3 className="font-semibold text-foreground">Serviço</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Tipo</span>
                  <span className="text-sm font-medium">{appointment.service.name}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Duração</span>
                  <span className="text-sm font-medium">{appointment.service.duration} min</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Modalidade</span>
                  <Badge variant="secondary" className="gap-1.5">
                    {appointment.service.type === "telemedicina" ? (
                      <>
                        <Video className="h-3 w-3" />
                        Telemedicina
                      </>
                    ) : (
                      <>
                        <Building2 className="h-3 w-3" />
                        Presencial
                      </>
                    )}
                  </Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Valor</span>
                  <span className="text-lg font-bold text-primary">
                    R$ {appointment.service.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Info */}
          <Card className="border-border/50 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-blue-500" />
                </div>
                <h3 className="font-semibold text-foreground">Local</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-foreground">{appointment.location.name}</p>
                  <p className="text-sm text-muted-foreground">{appointment.location.address}</p>
                  <p className="text-sm text-muted-foreground">{appointment.location.city}</p>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-1.5">
                    <Navigation className="h-3 w-3" />
                    Rotas
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-1.5">
                    <Phone className="h-3 w-3" />
                    Ligar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preparation Tips */}
        <Card className="mb-4 border-border/50 bg-gradient-to-br from-amber-500/5 to-transparent">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-amber-500" />
              </div>
              <h3 className="font-semibold text-foreground">Preparação</h3>
            </div>
            <ul className="space-y-3">
              {appointment.preparation.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-primary">{index + 1}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { icon: Bell, label: "Lembrete", color: "text-violet-500" },
            { icon: MessageCircle, label: "Mensagem", color: "text-blue-500" },
            { icon: CreditCard, label: "Pagamento", color: "text-emerald-500" },
            { icon: FileText, label: "Documentos", color: "text-amber-500" },
          ].map((action, index) => (
            <Card 
              key={index}
              className="cursor-pointer hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 border-border/50"
              onClick={() => toast.info(`${action.label} - Em breve`)}
            >
              <CardContent className="p-4 flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center ${action.color}`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <span className="text-xs text-muted-foreground">{action.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cancel Link */}
        <div className="text-center">
          <Button 
            variant="link" 
            className="text-destructive hover:text-destructive/80"
            onClick={() => toast.info("Cancelamento - Em breve")}
          >
            Cancelar consulta
          </Button>
        </div>
      </div>

      {/* Reschedule Modal */}
      <Dialog open={showReschedule} onOpenChange={setShowReschedule}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-primary" />
              Reagendar Consulta
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Selecione a nova data</label>
              <div className="border rounded-xl p-3">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  locale={ptBR}
                  disabled={(date) => date < new Date()}
                  className="mx-auto"
                />
              </div>
            </div>

            {selectedDate && (
              <div>
                <label className="text-sm font-medium mb-2 block">Horários disponíveis</label>
                <ScrollArea className="h-32">
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        className="text-xs"
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowReschedule(false)}
              >
                Cancelar
              </Button>
              <Button 
                className="flex-1"
                onClick={handleReschedule}
                disabled={!selectedDate || !selectedTime}
              >
                Confirmar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
