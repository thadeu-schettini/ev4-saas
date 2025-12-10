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
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/70">
                <Heart className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-lg">MedClinic</h1>
                <p className="text-xs text-muted-foreground">Portal do Paciente</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative" onClick={() => setNotificationsOpen(true)}>
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  2
                </span>
              </Button>
              <Avatar className="h-9 w-9 cursor-pointer">
                <AvatarImage src={patientData.avatar} />
                <AvatarFallback className="bg-primary/10 text-primary">MS</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Welcome Card */}
        <Card className="mb-4 sm:mb-6 p-4 sm:p-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-16 w-16 border-2 border-primary/20">
                  <AvatarImage src={patientData.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xl">MS</AvatarFallback>
                </Avatar>
                <Button size="icon" variant="secondary" className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full">
                  <Camera className="h-3 w-3" />
                </Button>
              </div>
              <div>
                <h2 className="text-xl font-bold">Olá, {patientData.name.split(" ")[0]}!</h2>
                <p className="text-muted-foreground">Bem-vinda ao seu portal de saúde</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button className="gap-2" onClick={() => setNewAppointmentOpen(true)}>
                <Plus className="h-4 w-4" />
                Agendar Consulta
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => setClinicChatOpen(true)}>
                <MessageSquare className="h-4 w-4" />
                Falar com a Clínica
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Actions - Revolutionary Items */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 sm:mb-6">
          <button 
            onClick={() => setMedicationRemindersOpen(true)}
            className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 hover:border-purple-500/40 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-left group"
          >
            <div className="p-2 rounded-lg bg-purple-500/20 w-fit mb-2 group-hover:scale-110 transition-transform">
              <Pill className="h-5 w-5 text-purple-500" />
            </div>
            <p className="font-medium text-sm">Medicações</p>
            <p className="text-xs text-muted-foreground">3 lembretes ativos</p>
          </button>
          <button 
            onClick={() => setHealthMetricsOpen(true)}
            className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-left group"
          >
            <div className="p-2 rounded-lg bg-emerald-500/20 w-fit mb-2 group-hover:scale-110 transition-transform">
              <Activity className="h-5 w-5 text-emerald-500" />
            </div>
            <p className="font-medium text-sm">Métricas</p>
            <p className="text-xs text-muted-foreground">Acompanhe sua saúde</p>
          </button>
          <button 
            onClick={() => setTeleconsultaConfigOpen(true)}
            className="p-4 rounded-xl bg-gradient-to-br from-info/10 to-info/5 border border-info/20 hover:border-info/40 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-left group"
          >
            <div className="p-2 rounded-lg bg-info/20 w-fit mb-2 group-hover:scale-110 transition-transform">
              <Video className="h-5 w-5 text-info" />
            </div>
            <p className="font-medium text-sm">Teleconsulta</p>
            <p className="text-xs text-muted-foreground">Configurações</p>
          </button>
          <button 
            onClick={() => setFamilyAccessOpen(true)}
            className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 hover:border-amber-500/40 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-left group"
          >
            <div className="p-2 rounded-lg bg-amber-500/20 w-fit mb-2 group-hover:scale-110 transition-transform">
              <Users className="h-5 w-5 text-amber-500" />
            </div>
            <p className="font-medium text-sm">Família</p>
            <p className="text-xs text-muted-foreground">Compartilhar acesso</p>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-info/10">
                <Calendar className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Próxima Consulta</p>
                <p className="font-semibold">15/12 às 10h</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <CreditCard className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Pendências</p>
                <p className="font-semibold text-warning">R$ 280,00</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <FileText className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Documentos</p>
                <p className="font-semibold">4 disponíveis</p>
              </div>
            </div>
          </Card>
          <Card 
            className="p-4 cursor-pointer hover:border-primary/40 hover:shadow-md transition-all duration-300 group"
            onClick={() => setMedicalHistoryOpen(true)}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 group-hover:scale-110 transition-transform">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Histórico</p>
                <p className="font-semibold">12 consultas</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="bg-muted/50 p-1 flex-wrap h-auto gap-1">
            <TabsTrigger value="appointments" className="gap-2 text-xs sm:text-sm">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Agendamentos</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="gap-2 text-xs sm:text-sm">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Pagamentos</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="gap-2 text-xs sm:text-sm">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Documentos</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="gap-2 text-xs sm:text-sm">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Mensagens</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2 text-xs sm:text-sm">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Meus Dados</span>
            </TabsTrigger>
          </TabsList>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Upcoming */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                    Próximos Agendamentos
                  </h3>
                  <Button size="sm" className="gap-2" onClick={() => setNewAppointmentOpen(true)}>
                    <Plus className="h-4 w-4" />
                    Agendar
                  </Button>
                </div>
                <div className="space-y-3">
                  {appointments.map((apt) => (
                    <div key={apt.id} className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{apt.professional}</span>
                            {getStatusBadge(apt.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                        </div>
                        <Badge variant="outline">
                          {apt.type === "online" ? "Online" : "Presencial"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {apt.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {apt.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        {apt.status === "pending" && (
                          <Button 
                            size="sm" 
                            variant="default" 
                            className="gap-1"
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
                            className="gap-1 bg-info hover:bg-info/90"
                            onClick={() => setOnlineRoomOpen(true)}
                          >
                            <Video className="h-3 w-3" />
                            Entrar
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openAppointmentDetail(apt, "reschedule")}
                        >
                          Remarcar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-destructive"
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
              <Card className="p-6">
                <h3 className="font-semibold flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-primary" />
                  Histórico de Consultas
                </h3>
                <div className="space-y-3">
                  {appointmentHistory.map((apt) => (
                    <div key={apt.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Stethoscope className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{apt.professional}</p>
                          <p className="text-xs text-muted-foreground">{apt.specialty} • {apt.date}</p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-1"
                        onClick={() => openAppointmentDetail({
                          ...apt,
                          time: "10:00",
                          type: "presencial"
                        }, "view")}
                      >
                        <Eye className="h-4 w-4" />
                        Ver
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Financeiro
                </h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-amber-600 border-amber-500/30">
                    1 pendência
                  </Badge>
                </div>
              </div>

              {/* Pending Alert */}
              <div className="p-4 rounded-xl bg-warning/10 border border-warning/20 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-warning">Pagamento Pendente</h4>
                    <p className="text-sm text-muted-foreground">
                      Você tem R$ 280,00 pendentes. Vencimento: 20/12/2024
                    </p>
                    <Button size="sm" className="mt-2 gap-2" onClick={() => setPaymentOpen(true)}>
                      <CreditCard className="h-4 w-4" />
                      Pagar Agora
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {payments.map((payment) => (
                  <div 
                    key={payment.id} 
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl",
                      payment.status === "pending" ? "bg-warning/5 border border-warning/20" : "bg-muted/30"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-2 rounded-lg",
                        payment.status === "paid" ? "bg-success/10" : "bg-warning/10"
                      )}>
                        <CreditCard className={cn(
                          "h-4 w-4",
                          payment.status === "paid" ? "text-success" : "text-warning"
                        )} />
                      </div>
                      <div>
                        <p className="font-medium">{payment.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {payment.status === "paid" 
                            ? `${payment.date} • ${payment.method}` 
                            : `Vencimento: ${payment.dueDate}`
                          }
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">R$ {payment.value.toFixed(2)}</p>
                      {getStatusBadge(payment.status)}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold flex items-center gap-2 mb-6">
                <FileText className="h-5 w-5 text-primary" />
                Meus Documentos
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.type} • {doc.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 gap-1"
                        onClick={() => openDocumentViewer(doc)}
                      >
                        <Eye className="h-3 w-3" />
                        Ver
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 gap-1"
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
          <TabsContent value="messages" className="space-y-6">
            <Card className="flex flex-col h-[500px]">
              <div className="p-4 border-b">
                <h3 className="font-semibold flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Mensagens com a Clínica
                </h3>
              </div>
              
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex",
                        msg.sender === "patient" ? "justify-end" : "justify-start"
                      )}
                    >
                      <div className={cn(
                        "max-w-[80%] p-3 rounded-2xl",
                        msg.sender === "patient" 
                          ? "bg-primary text-primary-foreground rounded-tr-none" 
                          : "bg-muted rounded-tl-none"
                      )}>
                        <p className="text-sm">{msg.content}</p>
                        <p className={cn(
                          "text-xs mt-1",
                          msg.sender === "patient" ? "text-primary-foreground/70" : "text-muted-foreground"
                        )}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button size="icon">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Personal Info */}
              <Card className="lg:col-span-2 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Dados Pessoais
                  </h3>
                  <Button 
                    variant={isEditing ? "default" : "outline"} 
                    size="sm" 
                    className="gap-2"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? <Save className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
                    {isEditing ? "Salvar" : "Editar"}
                  </Button>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome Completo</Label>
                    <Input value={patientData.name} disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label>E-mail</Label>
                    <Input value={patientData.email} disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label>Telefone</Label>
                    <Input value={patientData.phone} disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label>CPF</Label>
                    <Input value={patientData.cpf} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Data de Nascimento</Label>
                    <Input value={patientData.birthDate} disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label>Gênero</Label>
                    <Select disabled={!isEditing} defaultValue="feminino">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="masculino">Masculino</SelectItem>
                        <SelectItem value="feminino">Feminino</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Endereço</Label>
                    <Input value={patientData.address} disabled={!isEditing} />
                  </div>
                </div>
              </Card>

              {/* Health Info */}
              <Card className="p-6">
                <h3 className="font-semibold flex items-center gap-2 mb-4">
                  <Heart className="h-5 w-5 text-primary" />
                  Informações de Saúde
                </h3>
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground mb-1">Tipo Sanguíneo</p>
                    <p className="font-semibold text-lg">{patientData.bloodType}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <p className="text-xs text-red-600 font-medium">Alergias</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {patientData.allergies.map((allergy) => (
                        <Badge key={allergy} variant="outline" className="text-red-600 border-red-500/30">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t space-y-3">
                  <Button variant="outline" className="w-full justify-start gap-2" onClick={() => setPasswordChangeOpen(true)}>
                    <Lock className="h-4 w-4" />
                    Alterar Senha
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2" onClick={() => setPrivacySettingsOpen(true)}>
                    <Shield className="h-4 w-4" />
                    Privacidade
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2 text-destructive hover:text-destructive">
                    <LogOut className="h-4 w-4" />
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
