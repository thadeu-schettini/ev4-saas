import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  User,
  Calendar,
  CreditCard,
  MessageSquare,
  FileText,
  Settings,
  Phone,
  Mail,
  MapPin,
  Edit2,
  Save,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  Eye,
  Plus,
  ChevronRight,
  Heart,
  Activity,
  Pill,
  Stethoscope,
  Send,
  Paperclip,
  Bell,
  Lock,
  Shield,
  LogOut,
  Camera,
  Calendar as CalendarIcon,
  Video,
  Users,
  Sparkles
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NewAppointmentModal } from "@/components/portal/NewAppointmentModal";
import { PaymentModal } from "@/components/portal/PaymentModal";
import { NotificationsPanel } from "@/components/portal/NotificationsPanel";
import { AppointmentDetailModal } from "@/components/portal/AppointmentDetailModal";
import { DocumentViewerModal } from "@/components/portal/DocumentViewerModal";
import { PasswordChangeModal } from "@/components/portal/PasswordChangeModal";
import { PrivacySettingsModal } from "@/components/portal/PrivacySettingsModal";
import { OnlineRoomModal } from "@/components/portal/OnlineRoomModal";
import { MedicationRemindersModal } from "@/components/portal/MedicationRemindersModal";
import { ClinicChatModal } from "@/components/portal/ClinicChatModal";
import { TeleconsultaConfigModal } from "@/components/portal/TeleconsultaConfigModal";
import { HealthMetricsModal } from "@/components/portal/HealthMetricsModal";
import { FamilyAccessModal } from "@/components/portal/FamilyAccessModal";
import { MedicalHistoryTimelineModal } from "@/components/portal/MedicalHistoryTimelineModal";

// Mock patient data
const patientData = {
  name: "Maria Silva Santos",
  email: "maria.silva@email.com",
  phone: "(11) 99999-1234",
  cpf: "123.456.789-00",
  birthDate: "15/03/1985",
  gender: "Feminino",
  address: "Rua das Flores, 123 - São Paulo, SP",
  bloodType: "O+",
  allergies: ["Dipirona", "Penicilina"],
  avatar: ""
};

// Mock appointments
const appointments = [
  { id: 1, date: "15/12/2024", time: "10:00", professional: "Dr. Ricardo Carvalho", specialty: "Cardiologia", status: "confirmed", type: "presencial" },
  { id: 2, date: "22/12/2024", time: "14:30", professional: "Dra. Ana Paula", specialty: "Dermatologia", status: "pending", type: "online" },
  { id: 3, date: "05/01/2025", time: "09:00", professional: "Dr. Marcos Souza", specialty: "Ortopedia", status: "scheduled", type: "presencial" },
];

// Mock history
const appointmentHistory = [
  { id: 1, date: "01/12/2024", professional: "Dr. Ricardo Carvalho", specialty: "Cardiologia", status: "completed" },
  { id: 2, date: "15/11/2024", professional: "Dra. Ana Paula", specialty: "Dermatologia", status: "completed" },
  { id: 3, date: "20/10/2024", professional: "Dr. Ricardo Carvalho", specialty: "Cardiologia", status: "completed" },
];

// Mock payments
const payments = [
  { id: 1, description: "Consulta Cardiologia", date: "01/12/2024", value: 350, status: "paid", method: "Cartão" },
  { id: 2, description: "Exame Eletrocardiograma", date: "01/12/2024", value: 180, status: "paid", method: "PIX" },
  { id: 3, description: "Consulta Dermatologia", date: "22/12/2024", value: 280, status: "pending", dueDate: "20/12/2024" },
];

// Mock documents
const documents = [
  { id: 1, name: "Resultado Exame de Sangue", date: "01/12/2024", type: "Exame" },
  { id: 2, name: "Receita Médica", date: "01/12/2024", type: "Receita" },
  { id: 3, name: "Atestado Médico", date: "15/11/2024", type: "Atestado" },
  { id: 4, name: "Laudo Eletrocardiograma", date: "01/12/2024", type: "Laudo" },
];

// Mock messages
const chatMessages = [
  { id: 1, sender: "clinic", content: "Olá Maria! Lembrete: sua consulta com Dr. Ricardo está confirmada para amanhã às 10h.", timestamp: "Ontem, 15:30" },
  { id: 2, sender: "patient", content: "Obrigada pelo lembrete! Estarei lá.", timestamp: "Ontem, 16:00" },
  { id: 3, sender: "clinic", content: "Por favor, lembre-se de trazer os exames recentes. Até amanhã! 😊", timestamp: "Ontem, 16:05" },
];

export default function PortalPaciente() {
  const [isEditing, setIsEditing] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [newAppointmentOpen, setNewAppointmentOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [appointmentDetailOpen, setAppointmentDetailOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [appointmentMode, setAppointmentMode] = useState<"view" | "reschedule" | "cancel">("view");
  const [documentViewerOpen, setDocumentViewerOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [passwordChangeOpen, setPasswordChangeOpen] = useState(false);
  const [privacySettingsOpen, setPrivacySettingsOpen] = useState(false);
  const [onlineRoomOpen, setOnlineRoomOpen] = useState(false);
  const [medicationRemindersOpen, setMedicationRemindersOpen] = useState(false);
  const [clinicChatOpen, setClinicChatOpen] = useState(false);
  const [teleconsultaConfigOpen, setTeleconsultaConfigOpen] = useState(false);
  const [healthMetricsOpen, setHealthMetricsOpen] = useState(false);
  const [familyAccessOpen, setFamilyAccessOpen] = useState(false);
  const [medicalHistoryOpen, setMedicalHistoryOpen] = useState(false);

  const openAppointmentDetail = (apt: any, mode: "view" | "reschedule" | "cancel") => {
    setSelectedAppointment(apt);
    setAppointmentMode(mode);
    setAppointmentDetailOpen(true);
  };

  const openDocumentViewer = (doc: any) => {
    setSelectedDocument(doc);
    setDocumentViewerOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-status-confirmed/10 text-status-confirmed border-status-confirmed/20">Confirmado</Badge>;
      case "pending":
        return <Badge className="bg-status-pending/10 text-status-pending border-status-pending/20">Pendente</Badge>;
      case "scheduled":
        return <Badge className="bg-info/10 text-info border-info/20">Agendado</Badge>;
      case "completed":
        return <Badge className="bg-muted text-muted-foreground">Realizado</Badge>;
      case "paid":
        return <Badge className="bg-status-confirmed/10 text-status-confirmed border-status-confirmed/20">Pago</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-xl border-b">
        <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="p-1.5 sm:p-2 rounded-xl bg-gradient-to-br from-primary to-primary/70 shrink-0">
                <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <h1 className="font-bold text-base sm:text-lg truncate">MedClinic</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Portal do Paciente</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <Button variant="ghost" size="icon" className="relative h-8 w-8 sm:h-9 sm:w-9" onClick={() => setNotificationsOpen(true)}>
                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
                  2
                </span>
              </Button>
              <Avatar className="h-8 w-8 sm:h-9 sm:w-9 cursor-pointer">
                <AvatarImage src={patientData.avatar} />
                <AvatarFallback className="bg-primary/10 text-primary text-sm">MS</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6">
        {/* Welcome Card */}
        <Card className="mb-3 sm:mb-4 md:mb-6 p-3 sm:p-4 md:p-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative shrink-0">
                <Avatar className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 border-2 border-primary/20">
                  <AvatarImage src={patientData.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary text-lg sm:text-xl">MS</AvatarFallback>
                </Avatar>
                <Button size="icon" variant="secondary" className="absolute -bottom-1 -right-1 h-5 w-5 sm:h-6 sm:w-6 rounded-full">
                  <Camera className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                </Button>
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl font-bold truncate">Olá, {patientData.name.split(" ")[0]}!</h2>
                <p className="text-sm text-muted-foreground">Bem-vinda ao seu portal de saúde</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button className="gap-2 w-full sm:w-auto" onClick={() => setNewAppointmentOpen(true)}>
                <Plus className="h-4 w-4" />
                <span className="truncate">Agendar Consulta</span>
              </Button>
              <Button variant="outline" className="gap-2 w-full sm:w-auto" onClick={() => setClinicChatOpen(true)}>
                <MessageSquare className="h-4 w-4" />
                <span className="truncate">Falar com a Clínica</span>
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Actions - Revolutionary Items */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
          <button 
            onClick={() => setMedicationRemindersOpen(true)}
            className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 hover:border-purple-500/40 hover:shadow-lg active:scale-[0.98] transition-all duration-300 text-left group"
          >
            <div className="p-1.5 sm:p-2 rounded-lg bg-purple-500/20 w-fit mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform">
              <Pill className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
            </div>
            <p className="font-medium text-xs sm:text-sm">Medicações</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">3 lembretes ativos</p>
          </button>
          <button 
            onClick={() => setHealthMetricsOpen(true)}
            className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-lg active:scale-[0.98] transition-all duration-300 text-left group"
          >
            <div className="p-1.5 sm:p-2 rounded-lg bg-emerald-500/20 w-fit mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform">
              <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500" />
            </div>
            <p className="font-medium text-xs sm:text-sm">Métricas</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">Acompanhe sua saúde</p>
          </button>
          <button 
            onClick={() => setTeleconsultaConfigOpen(true)}
            className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-info/10 to-info/5 border border-info/20 hover:border-info/40 hover:shadow-lg active:scale-[0.98] transition-all duration-300 text-left group"
          >
            <div className="p-1.5 sm:p-2 rounded-lg bg-info/20 w-fit mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform">
              <Video className="h-4 w-4 sm:h-5 sm:w-5 text-info" />
            </div>
            <p className="font-medium text-xs sm:text-sm">Teleconsulta</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">Configurações</p>
          </button>
          <button 
            onClick={() => setFamilyAccessOpen(true)}
            className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 hover:border-amber-500/40 hover:shadow-lg active:scale-[0.98] transition-all duration-300 text-left group"
          >
            <div className="p-1.5 sm:p-2 rounded-lg bg-amber-500/20 w-fit mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
            </div>
            <p className="font-medium text-xs sm:text-sm">Família</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">Compartilhar acesso</p>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
          <Card className="p-2.5 sm:p-3 md:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 rounded-lg bg-info/10 shrink-0">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-info" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-muted-foreground">Próxima Consulta</p>
                <p className="font-semibold text-sm sm:text-base truncate">15/12 às 10h</p>
              </div>
            </div>
          </Card>
          <Card className="p-2.5 sm:p-3 md:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 rounded-lg bg-warning/10 shrink-0">
                <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-warning" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-muted-foreground">Pendências</p>
                <p className="font-semibold text-sm sm:text-base text-warning truncate">R$ 280,00</p>
              </div>
            </div>
          </Card>
          <Card className="p-2.5 sm:p-3 md:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 rounded-lg bg-success/10 shrink-0">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-success" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-muted-foreground">Documentos</p>
                <p className="font-semibold text-sm sm:text-base truncate">4 disponíveis</p>
              </div>
            </div>
          </Card>
          <Card 
            className="p-2.5 sm:p-3 md:p-4 cursor-pointer hover:border-primary/40 hover:shadow-md active:scale-[0.98] transition-all duration-300 group"
            onClick={() => setMedicalHistoryOpen(true)}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 group-hover:scale-110 transition-transform shrink-0">
                <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs text-muted-foreground">Histórico</p>
                <p className="font-semibold text-sm sm:text-base truncate">12 consultas</p>
              </div>
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="appointments" className="space-y-4 sm:space-y-6">
          <ScrollArea className="w-full">
            <TabsList className="bg-muted/50 p-1 h-auto gap-1 w-max min-w-full">
              <TabsTrigger value="appointments" className="gap-1.5 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3">
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline sm:inline">Agendamentos</span>
              </TabsTrigger>
              <TabsTrigger value="payments" className="gap-1.5 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3">
                <CreditCard className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline sm:inline">Pagamentos</span>
              </TabsTrigger>
              <TabsTrigger value="documents" className="gap-1.5 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3">
                <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline sm:inline">Documentos</span>
              </TabsTrigger>
              <TabsTrigger value="messages" className="gap-1.5 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3">
                <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline sm:inline">Mensagens</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="gap-1.5 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3">
                <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline sm:inline">Meus Dados</span>
              </TabsTrigger>
            </TabsList>
          </ScrollArea>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-4 sm:space-y-6">
            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Upcoming */}
              <Card className="p-3 sm:p-4 md:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
                  <h3 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
                    <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    <span className="truncate">Próximos Agendamentos</span>
                  </h3>
                  <Button size="sm" className="gap-1.5 sm:gap-2 shrink-0 text-xs sm:text-sm" onClick={() => setNewAppointmentOpen(true)}>
                    <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Agendar</span>
                  </Button>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {appointments.map((apt) => (
                    <div key={apt.id} className="p-3 sm:p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium text-sm sm:text-base truncate">{apt.professional}</span>
                            {getStatusBadge(apt.status)}
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground">{apt.specialty}</p>
                        </div>
                        <Badge variant="outline" className="self-start shrink-0 text-xs">
                          {apt.type === "online" ? "Online" : "Presencial"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {apt.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {apt.time}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                        {apt.status === "pending" && (
                          <Button 
                            size="sm" 
                            variant="default" 
                            className="gap-1 text-xs h-7 sm:h-8 px-2 sm:px-3"
                            onClick={() => openAppointmentDetail(apt, "view")}
                          >
                            <CheckCircle2 className="h-3 w-3" />
                            Confirmar
                          </Button>
                        )}
                        {apt.type === "online" && (
                          <Button 
                            size="sm" 
                            variant="default" 
                            className="gap-1 bg-info hover:bg-info/90 text-xs h-7 sm:h-8 px-2 sm:px-3"
                            onClick={() => setOnlineRoomOpen(true)}
                          >
                            <Video className="h-3 w-3" />
                            Entrar
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-xs h-7 sm:h-8 px-2 sm:px-3"
                          onClick={() => openAppointmentDetail(apt, "reschedule")}
                        >
                          Remarcar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-destructive text-xs h-7 sm:h-8 px-2 sm:px-3"
                          onClick={() => openAppointmentDetail(apt, "cancel")}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* History */}
              <Card className="p-3 sm:p-4 md:p-6">
                <h3 className="font-semibold flex items-center gap-2 mb-3 sm:mb-4 text-sm sm:text-base">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Histórico de Consultas
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {appointmentHistory.map((apt) => (
                    <div key={apt.id} className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-muted/30 gap-2">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 shrink-0">
                          <Stethoscope className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-xs sm:text-sm truncate">{apt.professional}</p>
                          <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{apt.specialty} • {apt.date}</p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-1 shrink-0 text-xs h-7 sm:h-8 px-2 sm:px-3"
                        onClick={() => openAppointmentDetail({
                          ...apt,
                          time: "10:00",
                          type: "presencial"
                        }, "view")}
                      >
                        <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">Ver</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-4 sm:space-y-6">
            <Card className="p-3 sm:p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
                <h3 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
                  <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Financeiro
                </h3>
                <Badge variant="outline" className="text-amber-600 border-amber-500/30 self-start sm:self-center text-xs">
                  1 pendência
                </Badge>
              </div>

              {/* Pending Alert */}
              <div className="p-3 sm:p-4 rounded-xl bg-warning/10 border border-warning/20 mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
                  <AlertCircle className="h-5 w-5 text-warning shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-warning text-sm">Pagamento Pendente</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Você tem R$ 280,00 pendentes. Vencimento: 20/12/2024
                    </p>
                    <Button size="sm" className="mt-2 gap-2 text-xs h-7 sm:h-8" onClick={() => setPaymentOpen(true)}>
                      <CreditCard className="h-3.5 w-3.5" />
                      Pagar Agora
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                {payments.map((payment) => (
                  <div 
                    key={payment.id} 
                    className={cn(
                      "flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl gap-2",
                      payment.status === "pending" ? "bg-warning/5 border border-warning/20" : "bg-muted/30"
                    )}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <div className={cn(
                        "p-1.5 sm:p-2 rounded-lg shrink-0",
                        payment.status === "paid" ? "bg-success/10" : "bg-warning/10"
                      )}>
                        <CreditCard className={cn(
                          "h-3.5 w-3.5 sm:h-4 sm:w-4",
                          payment.status === "paid" ? "text-success" : "text-warning"
                        )} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">{payment.description}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">
                          {payment.status === "paid" 
                            ? `${payment.date} • ${payment.method}` 
                            : `Vencimento: ${payment.dueDate}`
                          }
                        </p>
                      </div>
                    </div>
                    <div className="text-right self-end sm:self-center shrink-0">
                      <p className="font-semibold text-sm">R$ {payment.value.toFixed(2)}</p>
                      {getStatusBadge(payment.status)}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-4 sm:space-y-6">
            <Card className="p-3 sm:p-4 md:p-6">
              <h3 className="font-semibold flex items-center gap-2 mb-4 sm:mb-6 text-sm sm:text-base">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                Meus Documentos
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="p-3 sm:p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 shrink-0">
                        <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{doc.name}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">{doc.type} • {doc.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2 sm:mt-3">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 gap-1 text-xs h-7 sm:h-8"
                        onClick={() => openDocumentViewer(doc)}
                      >
                        <Eye className="h-3 w-3" />
                        Ver
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 gap-1 text-xs h-7 sm:h-8"
                        onClick={() => openDocumentViewer(doc)}
                      >
                        <Download className="h-3 w-3" />
                        Baixar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-4 sm:space-y-6">
            <Card className="flex flex-col h-[400px] sm:h-[500px]">
              <div className="p-3 sm:p-4 border-b">
                <h3 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
                  <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Mensagens com a Clínica
                </h3>
              </div>
              
              <ScrollArea className="flex-1 p-3 sm:p-4">
                <div className="space-y-3 sm:space-y-4">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex",
                        msg.sender === "patient" ? "justify-end" : "justify-start"
                      )}
                    >
                      <div className={cn(
                        "max-w-[85%] sm:max-w-[80%] p-2.5 sm:p-3 rounded-2xl",
                        msg.sender === "patient" 
                          ? "bg-primary text-primary-foreground rounded-tr-none" 
                          : "bg-muted rounded-tl-none"
                      )}>
                        <p className="text-xs sm:text-sm">{msg.content}</p>
                        <p className={cn(
                          "text-[10px] sm:text-xs mt-1",
                          msg.sender === "patient" ? "text-primary-foreground/70" : "text-muted-foreground"
                        )}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-3 sm:p-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 shrink-0">
                    <Paperclip className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="flex-1 text-sm h-8 sm:h-9"
                  />
                  <Button size="icon" className="h-8 w-8 sm:h-9 sm:w-9 shrink-0">
                    <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4 sm:space-y-6">
            <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Personal Info */}
              <Card className="lg:col-span-2 p-3 sm:p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
                  <h3 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    Dados Pessoais
                  </h3>
                  <Button 
                    variant={isEditing ? "default" : "outline"} 
                    size="sm" 
                    className="gap-2 self-start sm:self-center text-xs h-8"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? <Save className="h-3.5 w-3.5" /> : <Edit2 className="h-3.5 w-3.5" />}
                    {isEditing ? "Salvar" : "Editar"}
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-xs sm:text-sm">Nome Completo</Label>
                    <Input value={patientData.name} disabled={!isEditing} className="text-sm h-9" />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-xs sm:text-sm">E-mail</Label>
                    <Input value={patientData.email} disabled={!isEditing} className="text-sm h-9" />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-xs sm:text-sm">Telefone</Label>
                    <Input value={patientData.phone} disabled={!isEditing} className="text-sm h-9" />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-xs sm:text-sm">CPF</Label>
                    <Input value={patientData.cpf} disabled className="text-sm h-9" />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-xs sm:text-sm">Data de Nascimento</Label>
                    <Input value={patientData.birthDate} disabled={!isEditing} className="text-sm h-9" />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-xs sm:text-sm">Gênero</Label>
                    <Select disabled={!isEditing} defaultValue="feminino">
                      <SelectTrigger className="text-sm h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="masculino">Masculino</SelectItem>
                        <SelectItem value="feminino">Feminino</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2 sm:col-span-2">
                    <Label className="text-xs sm:text-sm">Endereço</Label>
                    <Input value={patientData.address} disabled={!isEditing} className="text-sm h-9" />
                  </div>
                </div>
              </Card>

              {/* Health Info */}
              <Card className="p-3 sm:p-4 md:p-6">
                <h3 className="font-semibold flex items-center gap-2 mb-3 sm:mb-4 text-sm sm:text-base">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Informações de Saúde
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="p-2.5 sm:p-3 rounded-lg bg-muted/30">
                    <p className="text-[10px] sm:text-xs text-muted-foreground mb-1">Tipo Sanguíneo</p>
                    <p className="font-semibold text-base sm:text-lg">{patientData.bloodType}</p>
                  </div>
                  <div className="p-2.5 sm:p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-500" />
                      <p className="text-[10px] sm:text-xs text-red-600 font-medium">Alergias</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {patientData.allergies.map((allergy) => (
                        <Badge key={allergy} variant="outline" className="text-red-600 border-red-500/30 text-[10px] sm:text-xs">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t space-y-2 sm:space-y-3">
                  <Button variant="outline" className="w-full justify-start gap-2 text-xs sm:text-sm h-9" onClick={() => setPasswordChangeOpen(true)}>
                    <Lock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Alterar Senha
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2 text-xs sm:text-sm h-9" onClick={() => setPrivacySettingsOpen(true)}>
                    <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Privacidade
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2 text-destructive hover:text-destructive text-xs sm:text-sm h-9">
                    <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Sair
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <NewAppointmentModal open={newAppointmentOpen} onOpenChange={setNewAppointmentOpen} />
      <PaymentModal open={paymentOpen} onOpenChange={setPaymentOpen} />
      <NotificationsPanel open={notificationsOpen} onOpenChange={setNotificationsOpen} />
      <AppointmentDetailModal 
        open={appointmentDetailOpen} 
        onOpenChange={setAppointmentDetailOpen}
        appointment={selectedAppointment}
        mode={appointmentMode}
      />
      <DocumentViewerModal 
        open={documentViewerOpen} 
        onOpenChange={setDocumentViewerOpen}
        document={selectedDocument}
      />
      <PasswordChangeModal open={passwordChangeOpen} onOpenChange={setPasswordChangeOpen} />
      <PrivacySettingsModal open={privacySettingsOpen} onOpenChange={setPrivacySettingsOpen} />
      <OnlineRoomModal open={onlineRoomOpen} onOpenChange={setOnlineRoomOpen} />
      <MedicationRemindersModal open={medicationRemindersOpen} onOpenChange={setMedicationRemindersOpen} />
      <ClinicChatModal open={clinicChatOpen} onOpenChange={setClinicChatOpen} />
      <TeleconsultaConfigModal open={teleconsultaConfigOpen} onOpenChange={setTeleconsultaConfigOpen} />
      <HealthMetricsModal open={healthMetricsOpen} onOpenChange={setHealthMetricsOpen} />
      <FamilyAccessModal open={familyAccessOpen} onOpenChange={setFamilyAccessOpen} />
      <MedicalHistoryTimelineModal open={medicalHistoryOpen} onOpenChange={setMedicalHistoryOpen} />
    </div>
  );
}
