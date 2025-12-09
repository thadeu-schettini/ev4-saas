import { useState, useRef } from "react";
import { 
  User, Camera, Trash2, Save, Clock, Building2, 
  Calendar, Plus, X, Upload, ChevronRight,
  Stethoscope, Globe, Phone, Mail, Shield,
  Zap, Bell, Link2, CheckCircle2, Sparkles,
  Activity, Settings, FileText, Video
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer, PageContent } from "@/components/ui/page-container";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// Profile sections as interactive cards
const profileSections = [
  {
    id: "personal",
    title: "Dados Pessoais",
    description: "Nome, contato e informações básicas",
    icon: User,
    color: "from-blue-500 to-cyan-500",
    fields: ["Nome", "Sobrenome", "E-mail", "Telefone"],
    completion: 100,
  },
  {
    id: "professional",
    title: "Dados Profissionais",
    description: "CRM, especialidades e registro",
    icon: Stethoscope,
    color: "from-violet-500 to-purple-500",
    fields: ["CRM", "Especialidades", "Departamento"],
    completion: 80,
  },
  {
    id: "schedule",
    title: "Configuração de Agenda",
    description: "Horários, slots e disponibilidade",
    icon: Calendar,
    color: "from-emerald-500 to-teal-500",
    fields: ["Dias de trabalho", "Horários", "Granularidade"],
    completion: 60,
  },
  {
    id: "services",
    title: "Serviços Vinculados",
    description: "Procedimentos e capacidades",
    icon: Activity,
    color: "from-amber-500 to-orange-500",
    fields: ["3 serviços ativos"],
    completion: 100,
  },
  {
    id: "integrations",
    title: "Integrações",
    description: "Google Calendar, sincronização",
    icon: Link2,
    color: "from-rose-500 to-pink-500",
    fields: ["Google Calendar"],
    completion: 0,
  },
  {
    id: "notifications",
    title: "Preferências",
    description: "Notificações e configurações",
    icon: Bell,
    color: "from-indigo-500 to-blue-500",
    fields: ["Lembretes", "Alertas"],
    completion: 50,
  },
];

// Mock profile data
const initialProfile = {
  firstName: "Ricardo",
  lastName: "Silva",
  email: "ricardo@clinica.com",
  phone: "(11) 99999-1234",
  crm: "CRM/SP 123456",
  specialty: ["Cardiologia", "Clínica Geral"],
  languages: ["Português (Brasil)", "Inglês"],
  timezone: "America/Sao_Paulo",
  organization: "Clinica Demo",
  department: "Cardiologia",
  role: "Médico",
  avatarUrl: "",
  realizeAppointments: true,
  status: "active",
};

const mockServices = [
  { id: "1", name: "Consulta Cardiológica", clinic: "Clínica Central", capacity: 1, active: true },
  { id: "2", name: "Eletrocardiograma", clinic: "Clínica Central", capacity: 2, active: true },
  { id: "3", name: "Consulta de Retorno", clinic: "Clínica Central", capacity: 1, active: false },
];

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

export default function MeuPerfil() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [profile, setProfile] = useState(initialProfile);
  const [services, setServices] = useState(mockServices);
  const [selectedDays, setSelectedDays] = useState(["Seg", "Ter", "Qua", "Qui", "Sex"]);
  const [scheduleSettings, setScheduleSettings] = useState({
    allowSameDayBooking: true,
    minAdvanceHours: 0,
    slotDuration: 30,
  });
  const [googleCalendarConnected, setGoogleCalendarConnected] = useState(false);
  const [newSpecialty, setNewSpecialty] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("A imagem deve ter no máximo 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("Por favor, selecione uma imagem válida");
        return;
      }
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
        setIsUploading(false);
        toast.success("Foto atualizada!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    setProfile(prev => ({ ...prev, avatarUrl: "" }));
    toast.success("Foto removida!");
  };

  const handleSave = () => {
    toast.success("Alterações salvas com sucesso!");
    setActiveSection(null);
  };

  const handleAddSpecialty = () => {
    if (newSpecialty.trim() && !profile.specialty.includes(newSpecialty.trim())) {
      setProfile(prev => ({
        ...prev,
        specialty: [...prev.specialty, newSpecialty.trim()]
      }));
      setNewSpecialty("");
    }
  };

  const handleRemoveSpecialty = (spec: string) => {
    setProfile(prev => ({
      ...prev,
      specialty: prev.specialty.filter(s => s !== spec)
    }));
  };

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const overallCompletion = Math.round(
    profileSections.reduce((acc, s) => acc + s.completion, 0) / profileSections.length
  );

  const renderSectionContent = (sectionId: string) => {
    switch (sectionId) {
      case "personal":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome</Label>
                <Input 
                  value={profile.firstName}
                  onChange={(e) => setProfile(p => ({ ...p, firstName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Sobrenome</Label>
                <Input 
                  value={profile.lastName}
                  onChange={(e) => setProfile(p => ({ ...p, lastName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>E-mail</Label>
                <Input 
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(p => ({ ...p, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Telefone</Label>
                <Input 
                  value={profile.phone}
                  onChange={(e) => setProfile(p => ({ ...p, phone: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Fuso horário</Label>
              <Select defaultValue="America/Sao_Paulo">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Sao_Paulo">America/Sao_Paulo (UTC-03:00)</SelectItem>
                  <SelectItem value="America/Fortaleza">America/Fortaleza (UTC-03:00)</SelectItem>
                  <SelectItem value="America/Manaus">America/Manaus (UTC-04:00)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case "professional":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>CRM</Label>
                <Input 
                  value={profile.crm}
                  onChange={(e) => setProfile(p => ({ ...p, crm: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Departamento</Label>
                <Input 
                  value={profile.department}
                  onChange={(e) => setProfile(p => ({ ...p, department: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Especialidades</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {profile.specialty.map((spec) => (
                  <Badge key={spec} variant="secondary" className="gap-1 pr-1">
                    {spec}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => handleRemoveSpecialty(spec)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input 
                  placeholder="Adicionar especialidade..."
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddSpecialty()}
                />
                <Button variant="outline" onClick={handleAddSpecialty}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30">
              <div>
                <Label>Realiza atendimentos</Label>
                <p className="text-sm text-muted-foreground">Disponível para consultas</p>
              </div>
              <Switch 
                checked={profile.realizeAppointments}
                onCheckedChange={(checked) => setProfile(p => ({ ...p, realizeAppointments: checked }))}
              />
            </div>
          </div>
        );

      case "schedule":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Antecedência mínima (horas)</Label>
                <Input 
                  type="number" 
                  value={scheduleSettings.minAdvanceHours}
                  onChange={(e) => setScheduleSettings(s => ({ ...s, minAdvanceHours: Number(e.target.value) }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Duração do slot (min)</Label>
                <Input 
                  type="number" 
                  value={scheduleSettings.slotDuration}
                  onChange={(e) => setScheduleSettings(s => ({ ...s, slotDuration: Number(e.target.value) }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Dias de trabalho</Label>
              <div className="flex flex-wrap gap-2">
                {weekDays.map((day) => (
                  <Button
                    key={day}
                    variant={selectedDays.includes(day) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleDay(day)}
                    className="min-w-[3rem]"
                  >
                    {day}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30">
              <div>
                <Label>Agendamento no mesmo dia</Label>
                <p className="text-sm text-muted-foreground">Permitir marcações para hoje</p>
              </div>
              <Switch 
                checked={scheduleSettings.allowSameDayBooking}
                onCheckedChange={(checked) => setScheduleSettings(s => ({ ...s, allowSameDayBooking: checked }))}
              />
            </div>
          </div>
        );

      case "services":
        return (
          <div className="space-y-4">
            {services.map((service) => (
              <div 
                key={service.id}
                className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "h-10 w-10 rounded-xl flex items-center justify-center",
                    service.active ? "bg-emerald-500/10" : "bg-muted"
                  )}>
                    <Activity className={cn(
                      "h-5 w-5",
                      service.active ? "text-emerald-600" : "text-muted-foreground"
                    )} />
                  </div>
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-muted-foreground">{service.clinic}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">Cap: {service.capacity}</Badge>
                  <Switch 
                    checked={service.active}
                    onCheckedChange={(checked) => {
                      setServices(prev => prev.map(s => 
                        s.id === service.id ? { ...s, active: checked } : s
                      ));
                    }}
                  />
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full gap-2">
              <Plus className="h-4 w-4" />
              Vincular novo serviço
            </Button>
          </div>
        );

      case "integrations":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-6 rounded-xl border-2 border-dashed border-border bg-muted/20">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Calendar className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Google Calendar</p>
                  <p className="text-sm text-muted-foreground">
                    {googleCalendarConnected ? "Sincronizado" : "Não conectado"}
                  </p>
                </div>
              </div>
              <Button 
                variant={googleCalendarConnected ? "outline" : "default"}
                onClick={() => {
                  setGoogleCalendarConnected(!googleCalendarConnected);
                  toast.success(googleCalendarConnected ? "Desconectado" : "Conectado com sucesso!");
                }}
              >
                {googleCalendarConnected ? "Desconectar" : "Conectar"}
              </Button>
            </div>
            <div className="flex items-center justify-between p-6 rounded-xl border-2 border-dashed border-border bg-muted/20 opacity-60">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Video className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Zoom</p>
                  <p className="text-sm text-muted-foreground">Em breve</p>
                </div>
              </div>
              <Button variant="outline" disabled>Em breve</Button>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-4">
            {[
              { label: "Lembretes de consulta", desc: "30 min antes do atendimento", enabled: true },
              { label: "Novos agendamentos", desc: "Quando paciente marcar consulta", enabled: true },
              { label: "Cancelamentos", desc: "Quando consulta for cancelada", enabled: true },
              { label: "Relatórios semanais", desc: "Resumo de atendimentos", enabled: false },
            ].map((item) => (
              <div 
                key={item.label}
                className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30"
              >
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <Switch defaultChecked={item.enabled} />
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title="Meu Perfil"
        description="Gerencie suas informações e configurações"
        icon={User}
        iconColor="from-blue-500 to-indigo-500"
      >
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Salvar
        </Button>
      </PageHeader>

      <PageContent>
        {/* Profile Header with Stats */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-card to-purple-500/5 border border-border/50 p-6 md:p-8">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-center">
            {/* Avatar with upload */}
            <div className="relative group shrink-0">
              <Avatar className="h-28 w-28 border-4 border-background shadow-2xl">
                <AvatarImage src={avatarPreview || profile.avatarUrl} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-primary-foreground text-4xl font-bold">
                  {profile.firstName[0]}{profile.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
              >
                {isUploading ? (
                  <div className="h-8 w-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Camera className="h-8 w-8 text-white" />
                )}
              </button>
              {/* Status indicator */}
              <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-emerald-500 border-4 border-background" />
            </div>

            {/* Profile Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="text-2xl md:text-3xl font-bold">Dr(a). {profile.firstName} {profile.lastName}</h2>
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                  Ativo
                </Badge>
              </div>
              <p className="text-muted-foreground mb-1">{profile.email}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {profile.specialty.map((spec) => (
                  <Badge key={spec} variant="secondary">{spec}</Badge>
                ))}
              </div>
            </div>

            {/* Completion Ring */}
            <div className="shrink-0 flex flex-col items-center gap-2">
              <div className="relative h-24 w-24">
                <svg className="h-24 w-24 -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-muted/30"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${overallCompletion * 2.51} 251`}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{overallCompletion}%</span>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">Perfil completo</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="relative flex flex-wrap gap-2 mt-6 pt-6 border-t border-border/50">
            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Alterar foto
            </Button>
            {(avatarPreview || profile.avatarUrl) && (
              <Button variant="outline" size="sm" onClick={handleRemoveAvatar} className="text-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Remover foto
              </Button>
            )}
          </div>
        </div>

        {/* Section Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {profileSections.map((section) => (
            <Dialog key={section.id}>
              <DialogTrigger asChild>
                <Card 
                  className="group cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-primary/30 transition-all overflow-hidden"
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform",
                        section.color
                      )}>
                        <section.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold group-hover:text-primary transition-colors">{section.title}</h3>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">{section.description}</p>
                      </div>
                    </div>
                    
                    {/* Completion bar */}
                    <div className="mt-4 space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{section.fields.join(", ")}</span>
                        <span className={cn(
                          "font-medium",
                          section.completion === 100 ? "text-emerald-600" : 
                          section.completion >= 50 ? "text-amber-600" : "text-muted-foreground"
                        )}>
                          {section.completion}%
                        </span>
                      </div>
                      <Progress value={section.completion} className="h-1.5" />
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "h-10 w-10 rounded-xl bg-gradient-to-br flex items-center justify-center",
                      section.color
                    )}>
                      <section.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <DialogTitle>{section.title}</DialogTitle>
                      <DialogDescription>{section.description}</DialogDescription>
                    </div>
                  </div>
                </DialogHeader>
                <div className="mt-4">
                  {renderSectionContent(section.id)}
                </div>
                <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
                  <Button onClick={handleSave}>Salvar alterações</Button>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Consultas hoje", value: "8", icon: Calendar, color: "text-blue-600 bg-blue-500/10" },
            { label: "Serviços ativos", value: "3", icon: Activity, color: "text-emerald-600 bg-emerald-500/10" },
            { label: "Dias de trabalho", value: selectedDays.length.toString(), icon: Clock, color: "text-violet-600 bg-violet-500/10" },
            { label: "Especialidades", value: profile.specialty.length.toString(), icon: Stethoscope, color: "text-amber-600 bg-amber-500/10" },
          ].map((stat) => (
            <Card key={stat.label} className="border-border/50 bg-card/50">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", stat.color)}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageContent>
    </PageContainer>
  );
}
