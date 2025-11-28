import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Building2,
  Calendar,
  Package,
  Plug,
  Bot,
  Video,
  FileText,
  Shield,
  Upload,
  Plus,
  Trash2,
  Save,
  Palette,
  Globe,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Users,
  CheckCircle2,
  Circle,
  ArrowLeft,
  Settings,
  Zap,
  Clock,
  X,
  Check,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ConfigSection = 
  | "home" 
  | "organizacao" 
  | "agenda" 
  | "integracoes" 
  | "autopilot" 
  | "telemedicina" 
  | "fiscal" 
  | "acessos";

export default function Configuracoes() {
  const [activeSection, setActiveSection] = useState<ConfigSection>("home");
  const [orgData, setOrgData] = useState({
    nomeFantasia: "Clínica Demo",
    razaoSocial: "Clínica Demo LTDA",
    cpfCnpj: "14132147-90",
    website: "https://www.suaempresa.com",
  });

  const [attendanceModes, setAttendanceModes] = useState({
    presencial: true,
    online: false,
    domiciliar: false,
  });

  const [resources, setResources] = useState({
    fiscal: true,
    autopilot: true,
    convenios: true,
    cupons: true,
    telemedicina: false,
  });

  const [integrations, setIntegrations] = useState({
    googleCalendar: false,
    whatsapp: false,
    twilio: false,
    stripe: false,
  });

  const [autopilotConfig, setAutopilotConfig] = useState({
    autoResponder: true,
    confirmationReminders: true,
    patientFollowUp: false,
    smartScheduling: true,
  });

  const [telemedicine, setTelemedicine] = useState({
    roomTheme: "professional",
    brandColor: "#3b82f6",
    recordingEnabled: true,
    waitingRoom: true,
    screenShare: true,
  });

  const [fiscalConfig, setFiscalConfig] = useState({
    provider: "nfe-io",
    autoEmit: false,
    defaultService: "Consulta Médica",
    environment: "homologacao",
  });

  const [accessControl, setAccessControl] = useState({
    users: [
      { id: '1', name: 'Dr. Carlos Silva', email: 'carlos@clinica.com', role: 'admin', status: 'active', avatar: '' },
      { id: '2', name: 'Dra. Ana Costa', email: 'ana@clinica.com', role: 'medico', status: 'active', avatar: '' },
      { id: '3', name: 'Maria Santos', email: 'maria@clinica.com', role: 'recepcao', status: 'active', avatar: '' },
      { id: '4', name: 'João Oliveira', email: 'joao@clinica.com', role: 'medico', status: 'pending', avatar: '' },
    ],
    roles: [
      { 
        id: 'admin', 
        name: 'Administrador', 
        description: 'Acesso total ao sistema',
        color: 'from-purple-500 to-pink-500',
        permissions: ['all']
      },
      { 
        id: 'medico', 
        name: 'Médico', 
        description: 'Acesso a prontuários e agenda',
        color: 'from-blue-500 to-cyan-500',
        permissions: ['prontuario.view', 'prontuario.edit', 'agenda.view', 'agenda.edit', 'pacientes.view']
      },
      { 
        id: 'recepcao', 
        name: 'Recepção', 
        description: 'Gestão de agenda e pacientes',
        color: 'from-green-500 to-emerald-500',
        permissions: ['agenda.view', 'agenda.edit', 'pacientes.view', 'pacientes.edit', 'financeiro.view']
      },
      { 
        id: 'financeiro', 
        name: 'Financeiro', 
        description: 'Acesso a cobranças e relatórios',
        color: 'from-amber-500 to-orange-500',
        permissions: ['financeiro.view', 'financeiro.edit', 'relatorios.view']
      },
    ],
    permissions: {
      'prontuario.view': { label: 'Visualizar Prontuários', category: 'Prontuários' },
      'prontuario.edit': { label: 'Editar Prontuários', category: 'Prontuários' },
      'agenda.view': { label: 'Visualizar Agenda', category: 'Agenda' },
      'agenda.edit': { label: 'Gerenciar Agenda', category: 'Agenda' },
      'pacientes.view': { label: 'Visualizar Pacientes', category: 'Pacientes' },
      'pacientes.edit': { label: 'Editar Pacientes', category: 'Pacientes' },
      'financeiro.view': { label: 'Visualizar Financeiro', category: 'Financeiro' },
      'financeiro.edit': { label: 'Gerenciar Financeiro', category: 'Financeiro' },
      'relatorios.view': { label: 'Visualizar Relatórios', category: 'Relatórios' },
      'configuracoes.edit': { label: 'Editar Configurações', category: 'Sistema' },
      'usuarios.manage': { label: 'Gerenciar Usuários', category: 'Sistema' },
    }
  });

  const handleSave = () => {
    toast.success("Configurações salvas com sucesso!");
  };

  // Configuration sections with completion status
  const configSections: Array<{
    id: Exclude<ConfigSection, "home">;
    title: string;
    description: string;
    icon: any;
    color: string;
    completion: number;
    items: string[];
    badge?: string;
    requiresActivation?: boolean;
  }> = [
    {
      id: "organizacao",
      title: "Organização",
      description: "Dados da clínica, identidade visual e branding",
      icon: Building2,
      color: "from-blue-500 to-cyan-500",
      completion: 85,
      items: ["Nome e documentos", "Logo e favicon", "Cores e tema"],
    },
    {
      id: "agenda",
      title: "Agenda",
      description: "Tipos de atendimento e configurações de agendamento",
      icon: Calendar,
      color: "from-orange-500 to-red-500",
      completion: 60,
      items: ["Modos de atendimento", "Tipos de consulta", "Horários"],
    },
    {
      id: "integracoes",
      title: "Integrações",
      description: "Conecte com serviços externos e APIs",
      icon: Plug,
      color: "from-green-500 to-emerald-500",
      completion: 40,
      items: ["Google Calendar", "WhatsApp", "Twilio"],
    },
    {
      id: "autopilot",
      title: "Autopilot",
      description: "Assistente inteligente e automações com IA",
      icon: Bot,
      color: "from-violet-500 to-purple-500",
      completion: 70,
      items: ["Políticas", "Ferramentas", "Base de conhecimento"],
      badge: "BETA",
      requiresActivation: true,
    },
    {
      id: "telemedicina",
      title: "Telemedicina",
      description: "Configurações de atendimento online e videochamadas",
      icon: Video,
      color: "from-cyan-500 to-blue-500",
      completion: 50,
      items: ["Tema da sala", "Gravações", "Compatibilidade"],
      requiresActivation: true,
    },
    {
      id: "fiscal",
      title: "Fiscal",
      description: "Emissão de notas fiscais e documentos",
      icon: FileText,
      color: "from-amber-500 to-orange-500",
      completion: 30,
      items: ["Provedor", "Credenciais", "Certificados"],
      requiresActivation: true,
    },
    {
      id: "acessos",
      title: "Acessos",
      description: "Controle de permissões e usuários",
      icon: Shield,
      color: "from-red-500 to-pink-500",
      completion: 0,
      items: ["Usuários", "Perfis", "Permissões"],
    },
  ];

  const changeSection = (section: ConfigSection) => {
    // Add exit animation class before changing
    const content = document.querySelector('.section-content');
    if (content) {
      content.classList.add('animate-fade-out');
      setTimeout(() => {
        setActiveSection(section);
        content.classList.remove('animate-fade-out');
      }, 200);
    } else {
      setActiveSection(section);
    }
  };

  if (activeSection === "home") {
    return (
      <TooltipProvider>
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-8 section-content">
            {/* Header */}
            <div className="space-y-3 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/60 shadow-lg">
                  <Settings className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
                    Configurações
                  </h1>
                  <p className="text-muted-foreground">
                    Configure todos os aspectos do sistema
                  </p>
                </div>
              </div>
            </div>

            {/* Overall Progress */}
            <Card className="border-border/50 backdrop-blur-sm bg-card/95 shadow-xl animate-fade-in">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Progresso geral das configurações
                      </p>
                      <p className="text-3xl font-bold mt-1">62%</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        5/8 completas
                      </Badge>
                    </div>
                  </div>
                  <Progress value={62} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Complete todas as seções para ter uma experiência completa do sistema
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Configuration Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {configSections.map((section, index) => {
                const isInactive = section.requiresActivation && !resources[section.id as keyof typeof resources];
                
                return (
                  <Card
                    key={section.id}
                    className={`group relative border-border/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden animate-fade-in hover:scale-105 ${
                      isInactive 
                        ? 'bg-muted/30 border-2 border-dashed border-muted-foreground/30 opacity-60 hover:opacity-80' 
                        : 'bg-card/95'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => changeSection(section.id)}
                  >
                    {/* Inactive Overlay */}
                    {isInactive && (
                      <div className="absolute inset-0 bg-gradient-to-br from-muted/10 to-muted/5 pointer-events-none" />
                    )}

                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    />

                    {/* Completion Ring */}
                    <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                      {section.badge && (
                        <Badge variant="outline" className="text-xs">
                          {section.badge}
                        </Badge>
                      )}
                      {isInactive && (
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge variant="destructive" className="text-sm gap-1.5 px-3 py-1 shadow-md animate-pulse">
                              <AlertCircle className="h-4 w-4" />
                              Inativo
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Ative este módulo em Recursos para configurar</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                      <div className="relative w-12 h-12 z-10">
                      <svg className="w-12 h-12 transform -rotate-90">
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          className="text-muted"
                        />
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 20}`}
                          strokeDashoffset={`${2 * Math.PI * 20 * (1 - section.completion / 100)}`}
                          className={`text-transparent bg-gradient-to-r ${section.color} bg-clip-text transition-all duration-500`}
                          style={{
                            stroke: section.completion === 100 ? "hsl(var(--primary))" : "currentColor",
                          }}
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                        {section.completion}%
                      </span>
                    </div>
                  </div>

                  <CardHeader className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${section.color} p-4 shadow-lg group-hover:shadow-xl transition-all duration-300 ${
                        isInactive ? 'grayscale opacity-50' : ''
                      }`}>
                        <section.icon className="h-full w-full text-white" />
                      </div>
                      
                      {section.requiresActivation && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div 
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                              }}
                              className="relative z-20"
                            >
                              <Switch
                                checked={resources[section.id as keyof typeof resources] || false}
                                onCheckedChange={(checked) => {
                                  setResources({ ...resources, [section.id]: checked });
                                  toast.success(checked ? `${section.title} ativado` : `${section.title} desativado`);
                                }}
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{isInactive ? 'Ativar módulo' : 'Desativar módulo'}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>

                    <div className="space-y-2">
                      <CardTitle className={`text-xl transition-colors ${
                        isInactive ? 'text-muted-foreground' : 'group-hover:text-primary'
                      }`}>
                        {section.title}
                      </CardTitle>
                      <CardDescription className="text-sm line-clamp-2">
                        {section.description}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Zap className="h-3 w-3" />
                        <span>Itens de configuração:</span>
                      </div>
                      <ul className="space-y-2">
                        {section.items.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            {section.completion === 100 ? (
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                            ) : (
                              <Circle className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      className={`w-full mt-6 transition-all ${
                        isInactive 
                          ? 'opacity-50 cursor-not-allowed' 
                          : 'group-hover:shadow-lg'
                      }`}
                      variant="outline"
                      disabled={isInactive}
                    >
                      {isInactive ? 'Ative o módulo acima' : 'Configurar'}
                      <ArrowLeft className="h-4 w-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              );
              })}
            </div>

            {/* Quick Actions */}
            <Card className="border-border/50 backdrop-blur-sm bg-card/95 shadow-xl animate-fade-in">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <CardTitle>Ações Rápidas</CardTitle>
                </div>
                <CardDescription>
                  Configurações mais acessadas e ações comuns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto p-4 justify-start hover:border-primary transition-colors" onClick={() => changeSection("organizacao")}>
                    <Upload className="h-5 w-5 mr-3 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">Upload de Logo</p>
                      <p className="text-xs text-muted-foreground">
                        Adicionar identidade visual
                      </p>
                    </div>
                  </Button>

                  <Button variant="outline" className="h-auto p-4 justify-start hover:border-primary transition-colors" onClick={() => changeSection("agenda")}>
                    <Plus className="h-5 w-5 mr-3 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">Novo Tipo de Atendimento</p>
                      <p className="text-xs text-muted-foreground">
                        Adicionar tipo de consulta
                      </p>
                    </div>
                  </Button>

                  <Button variant="outline" className="h-auto p-4 justify-start hover:border-primary transition-colors" onClick={() => changeSection("integracoes")}>
                    <Plug className="h-5 w-5 mr-3 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">Conectar Integrações</p>
                      <p className="text-xs text-muted-foreground">
                        WhatsApp, Google, etc
                      </p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </TooltipProvider>
    );
  }

  // Section Detail View
  const currentSection = configSections.find((s) => s.id === activeSection);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 md:p-8">
        <div className="max-w-6xl mx-auto space-y-6 section-content animate-fade-in">
          {/* Back Navigation */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => changeSection("home")}
              className="gap-2 hover:bg-muted"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentSection?.color} p-3 shadow-lg`}
              >
                {currentSection?.icon && (
                  <currentSection.icon className="h-full w-full text-white" />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{currentSection?.title}</h1>
                <p className="text-sm text-muted-foreground">
                  {currentSection?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Section Content - Keep existing sections */}
          {activeSection === "organizacao" && (
            <div className="space-y-6">
              {/* Dados da Organização */}
              <Card className="border-border/50 backdrop-blur-sm bg-card/95 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      <CardTitle>Dados da Organização</CardTitle>
                    </div>
                    <Badge variant="secondary" className="gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      85% completo
                    </Badge>
                  </div>
                  <CardDescription>
                    Informações básicas da sua clínica ou consultório
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nomeFantasia" className="flex items-center gap-2">
                        Nome Fantasia *
                        <Tooltip>
                          <TooltipTrigger>
                            <span className="text-xs text-muted-foreground cursor-help">(?)</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Nome comercial da sua clínica, como é conhecido pelos pacientes
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <Input
                        id="nomeFantasia"
                        value={orgData.nomeFantasia}
                        onChange={(e) =>
                          setOrgData({ ...orgData, nomeFantasia: e.target.value })
                        }
                        placeholder="Nome da clínica"
                        className="transition-all focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="razaoSocial">Razão Social</Label>
                      <Input
                        id="razaoSocial"
                        value={orgData.razaoSocial}
                        onChange={(e) =>
                          setOrgData({ ...orgData, razaoSocial: e.target.value })
                        }
                        placeholder="Razão social da empresa"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cpfCnpj">CPF ou CNPJ *</Label>
                      <Input
                        id="cpfCnpj"
                        value={orgData.cpfCnpj}
                        onChange={(e) =>
                          setOrgData({ ...orgData, cpfCnpj: e.target.value })
                        }
                        placeholder="00.000.000/0000-00"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        value={orgData.website}
                        onChange={(e) =>
                          setOrgData({ ...orgData, website: e.target.value })
                        }
                        placeholder="https://www.suaempresa.com"
                      />
                    </div>
                  </div>

                  <Button onClick={handleSave} className="w-full md:w-auto gap-2">
                    <Save className="h-4 w-4" />
                    Salvar Alterações
                  </Button>
                </CardContent>
              </Card>

              {/* Identidade Visual */}
              <Card className="border-border/50 backdrop-blur-sm bg-card/95 shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Palette className="h-5 w-5 text-primary" />
                    <CardTitle>Identidade Visual</CardTitle>
                  </div>
                  <CardDescription>
                    Configure o logo, favicon e tema de cores do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Label>Logo (1400px × 1400px)</Label>
                      <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Upload className="h-8 w-8 text-primary" />
                        </div>
                        <div className="text-center">
                          <p className="font-medium">Clique para fazer upload</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            PNG ou JPG (máx. 5MB)
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Favicon (64px × 64px)</Label>
                      <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Upload className="h-8 w-8 text-primary" />
                        </div>
                        <div className="text-center">
                          <p className="font-medium">Clique para fazer upload</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            PNG ou ICO (máx. 1MB)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Theme Colors - Live Preview */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Tema de Cores</Label>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="gap-1">
                          <Sparkles className="h-3 w-3" />
                          Preview em tempo real
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { name: "Sky", primary: "#3b82f6", secondary: "#0ea5e9" },
                        { name: "Purple", primary: "#a855f7", secondary: "#ec4899" },
                        { name: "Orange", primary: "#f97316", secondary: "#ef4444" },
                        { name: "Green", primary: "#22c55e", secondary: "#10b981" },
                        { name: "Blue", primary: "#2563eb", secondary: "#3b82f6" },
                        { name: "Red", primary: "#ef4444", secondary: "#f97316" },
                        { name: "Cyan", primary: "#06b6d4", secondary: "#0ea5e9" },
                        { name: "Indigo", primary: "#6366f1", secondary: "#8b5cf6" },
                      ].map((theme) => (
                        <button
                          key={theme.name}
                          className="group relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 border-border hover:border-primary transition-all hover:shadow-lg"
                        >
                          <div className="relative w-full h-16 rounded-lg overflow-hidden shadow-md">
                            <div
                              className="absolute inset-0 w-1/2"
                              style={{ background: theme.primary }}
                            />
                            <div
                              className="absolute inset-0 left-1/2"
                              style={{ background: theme.secondary }}
                            />
                          </div>
                          <span className="text-sm font-medium">{theme.name}</span>
                          <CheckCircle2 className="absolute -top-2 -right-2 h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleSave} className="w-full md:w-auto gap-2">
                    <Save className="h-4 w-4" />
                    Salvar Tema
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "agenda" && (
            <div className="space-y-6">
              {/* Modos de Atendimento */}
              <Card className="border-border/50 backdrop-blur-sm bg-card/95 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <CardTitle>Modos de Atendimento</CardTitle>
                    </div>
                    <Badge variant="secondary">
                      {Object.values(attendanceModes).filter(Boolean).length} ativados
                    </Badge>
                  </div>
                  <CardDescription>
                    Defina quais tipos de atendimento sua clínica oferece
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card
                      className={`border-2 transition-all cursor-pointer ${
                        attendanceModes.presencial
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() =>
                        setAttendanceModes({ ...attendanceModes, presencial: !attendanceModes.presencial })
                      }
                    >
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center gap-4">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                            attendanceModes.presencial
                              ? "bg-gradient-to-br from-green-500 to-emerald-500"
                              : "bg-muted"
                          }`}>
                            <MapPin className={`h-8 w-8 ${
                              attendanceModes.presencial ? "text-white" : "text-muted-foreground"
                            }`} />
                          </div>
                          <div>
                            <p className="font-semibold text-lg">Presencial</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Atendimento na clínica
                            </p>
                          </div>
                          {attendanceModes.presencial && (
                            <Badge variant="default" className="gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              Ativo
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <Card
                      className={`border-2 transition-all cursor-pointer ${
                        attendanceModes.online
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() =>
                        setAttendanceModes({ ...attendanceModes, online: !attendanceModes.online })
                      }
                    >
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center gap-4">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                            attendanceModes.online
                              ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                              : "bg-muted"
                          }`}>
                            <Video className={`h-8 w-8 ${
                              attendanceModes.online ? "text-white" : "text-muted-foreground"
                            }`} />
                          </div>
                          <div>
                            <p className="font-semibold text-lg">Online</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Telemedicina
                            </p>
                          </div>
                          {attendanceModes.online && (
                            <Badge variant="default" className="gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              Ativo
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <Card
                      className={`border-2 transition-all cursor-pointer ${
                        attendanceModes.domiciliar
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() =>
                        setAttendanceModes({ ...attendanceModes, domiciliar: !attendanceModes.domiciliar })
                      }
                    >
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center gap-4">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                            attendanceModes.domiciliar
                              ? "bg-gradient-to-br from-purple-500 to-pink-500"
                              : "bg-muted"
                          }`}>
                            <Building2 className={`h-8 w-8 ${
                              attendanceModes.domiciliar ? "text-white" : "text-muted-foreground"
                            }`} />
                          </div>
                          <div>
                            <p className="font-semibold text-lg">Domiciliar</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Atendimento em casa
                            </p>
                          </div>
                          {attendanceModes.domiciliar && (
                            <Badge variant="default" className="gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              Ativo
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Button onClick={handleSave} className="w-full md:w-auto gap-2 mt-6">
                    <Save className="h-4 w-4" />
                    Salvar Modos
                  </Button>
                </CardContent>
              </Card>

              {/* Tipos de Atendimento */}
              <Card className="border-border/50 backdrop-blur-sm bg-card/95 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Tipos de Atendimento</CardTitle>
                      <CardDescription>
                        Configure os tipos de consulta e suas durações
                      </CardDescription>
                    </div>
                    <Button size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Novo Tipo
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Primeira Consulta", duration: 60, requiresRoom: true, icon: Clock, color: "from-blue-500 to-cyan-500" },
                      { name: "Consulta de Retorno", duration: 45, requiresRoom: false, icon: Calendar, color: "from-purple-500 to-pink-500" },
                      { name: "Consulta Rápida", duration: 30, requiresRoom: false, icon: Zap, color: "from-orange-500 to-red-500" },
                    ].map((type, index) => (
                      <Card key={index} className="border border-border hover:border-primary/50 hover:shadow-md transition-all">
                        <CardContent className="py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${type.color} p-3 shadow-md`}>
                                <type.icon className="h-full w-full text-white" />
                              </div>
                              <div>
                                <p className="font-semibold">{type.name}</p>
                                <div className="flex items-center gap-3 mt-1">
                                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {type.duration} min
                                  </span>
                                  {type.requiresRoom && (
                                    <Badge variant="secondary" className="text-xs">
                                      Requer sala
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">Editar</Button>
                              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Integrações Section */}
          {activeSection === "integracoes" && (
            <div className="space-y-6">
              <Card className="border-border/50 backdrop-blur-sm bg-card/95 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Plug className="h-5 w-5 text-primary" />
                      <CardTitle>Integrações Externas</CardTitle>
                    </div>
                    <Badge variant="secondary">
                      {Object.values(integrations).filter(Boolean).length}/4 conectadas
                    </Badge>
                  </div>
                  <CardDescription>
                    Conecte sua clínica com serviços externos e APIs para expandir funcionalidades
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Google Calendar */}
                    <Card
                      className={`border-2 transition-all ${
                        integrations.googleCalendar
                          ? "border-blue-500 bg-blue-500/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-3">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              integrations.googleCalendar
                                ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                                : "bg-muted"
                            }`}>
                              <Calendar className={`h-6 w-6 ${
                                integrations.googleCalendar ? "text-white" : "text-muted-foreground"
                              }`} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">Google Calendar</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                Sincronize agendamentos com Google Calendar
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={integrations.googleCalendar}
                            onCheckedChange={(checked) =>
                              setIntegrations({ ...integrations, googleCalendar: checked })
                            }
                          />
                        </div>
                        {integrations.googleCalendar && (
                          <div className="pt-3 border-t space-y-3">
                            <div className="space-y-2">
                              <Label className="text-xs">Conta conectada</Label>
                              <Input
                                placeholder="seu-email@gmail.com"
                                className="h-9"
                                disabled
                              />
                            </div>
                            <Button size="sm" variant="outline" className="w-full">
                              Reconectar
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* WhatsApp */}
                    <Card
                      className={`border-2 transition-all ${
                        integrations.whatsapp
                          ? "border-green-500 bg-green-500/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-3">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              integrations.whatsapp
                                ? "bg-gradient-to-br from-green-500 to-emerald-500"
                                : "bg-muted"
                            }`}>
                              <Phone className={`h-6 w-6 ${
                                integrations.whatsapp ? "text-white" : "text-muted-foreground"
                              }`} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">WhatsApp Business</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                Envie lembretes e confirmações via WhatsApp
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={integrations.whatsapp}
                            onCheckedChange={(checked) =>
                              setIntegrations({ ...integrations, whatsapp: checked })
                            }
                          />
                        </div>
                        {integrations.whatsapp && (
                          <div className="pt-3 border-t space-y-3">
                            <div className="space-y-2">
                              <Label className="text-xs">Número conectado</Label>
                              <Input
                                placeholder="+55 (11) 99999-9999"
                                className="h-9"
                              />
                            </div>
                            <Button size="sm" variant="outline" className="w-full gap-2">
                              <Phone className="h-3 w-3" />
                              Testar Conexão
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Twilio */}
                    <Card
                      className={`border-2 transition-all ${
                        integrations.twilio
                          ? "border-red-500 bg-red-500/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-3">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              integrations.twilio
                                ? "bg-gradient-to-br from-red-500 to-orange-500"
                                : "bg-muted"
                            }`}>
                              <Mail className={`h-6 w-6 ${
                                integrations.twilio ? "text-white" : "text-muted-foreground"
                              }`} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">Twilio</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                Envie SMS e notificações por email
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={integrations.twilio}
                            onCheckedChange={(checked) =>
                              setIntegrations({ ...integrations, twilio: checked })
                            }
                          />
                        </div>
                        {integrations.twilio && (
                          <div className="pt-3 border-t space-y-3">
                            <div className="space-y-2">
                              <Label className="text-xs">Account SID</Label>
                              <Input
                                placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                                className="h-9 font-mono text-xs"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs">Auth Token</Label>
                              <Input
                                type="password"
                                placeholder="••••••••••••••••"
                                className="h-9"
                              />
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Stripe */}
                    <Card
                      className={`border-2 transition-all ${
                        integrations.stripe
                          ? "border-purple-500 bg-purple-500/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-3">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              integrations.stripe
                                ? "bg-gradient-to-br from-purple-500 to-pink-500"
                                : "bg-muted"
                            }`}>
                              <Sparkles className={`h-6 w-6 ${
                                integrations.stripe ? "text-white" : "text-muted-foreground"
                              }`} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">Stripe</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                Aceite pagamentos online com cartão de crédito
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={integrations.stripe}
                            onCheckedChange={(checked) =>
                              setIntegrations({ ...integrations, stripe: checked })
                            }
                          />
                        </div>
                        {integrations.stripe && (
                          <div className="pt-3 border-t space-y-3">
                            <div className="space-y-2">
                              <Label className="text-xs">Publishable Key</Label>
                              <Input
                                placeholder="pk_test_..."
                                className="h-9 font-mono text-xs"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs">Secret Key</Label>
                              <Input
                                type="password"
                                placeholder="sk_test_..."
                                className="h-9 font-mono text-xs"
                              />
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  <Button onClick={handleSave} className="w-full md:w-auto gap-2 mt-6">
                    <Save className="h-4 w-4" />
                    Salvar Integrações
                  </Button>
                </CardContent>
              </Card>

              {/* Webhooks */}
              <Card className="border-border/50 backdrop-blur-sm bg-card/95 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Webhooks</CardTitle>
                      <CardDescription>
                        Configure endpoints para receber notificações de eventos
                      </CardDescription>
                    </div>
                    <Button size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Novo Webhook
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { event: "appointment.created", url: "https://api.example.com/webhook", status: "active" },
                      { event: "appointment.cancelled", url: "https://api.example.com/webhook", status: "active" },
                      { event: "patient.created", url: "https://api.example.com/webhook", status: "inactive" },
                    ].map((webhook, index) => (
                      <Card key={index} className="border border-border">
                        <CardContent className="py-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <p className="font-mono text-sm font-medium">{webhook.event}</p>
                                <Badge variant={webhook.status === "active" ? "default" : "secondary"}>
                                  {webhook.status === "active" ? "Ativo" : "Inativo"}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground font-mono">{webhook.url}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">Editar</Button>
                              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Autopilot Section */}
          {activeSection === "autopilot" && (
            <div className="space-y-6">
              <Card className="border-border/50 backdrop-blur-sm bg-card/95 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bot className="h-5 w-5 text-primary" />
                      <CardTitle className="flex items-center gap-2">
                        Autopilot AI
                        <Badge variant="outline">BETA</Badge>
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {resources.autopilot ? "Módulo Ativo" : "Módulo Desativado"}
                      </span>
                      <Switch
                        checked={resources.autopilot}
                        onCheckedChange={(checked) => {
                          setResources({ ...resources, autopilot: checked });
                          toast.success(checked ? "Autopilot ativado!" : "Autopilot desativado");
                        }}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Configure automações inteligentes para otimizar o fluxo de trabalho
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!resources.autopilot ? (
                    <div className="py-12 text-center space-y-6">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 p-5 mx-auto opacity-50">
                        <Bot className="h-full w-full text-white" />
                      </div>
                      <div className="space-y-2">
                        <p className="font-semibold text-xl">Módulo Autopilot Desativado</p>
                        <p className="text-sm text-muted-foreground max-w-md mx-auto">
                          Ative o módulo Autopilot para configurar automações inteligentes e IA
                        </p>
                      </div>
                      
                      {/* Recursos Disponíveis */}
                      <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                        <div className="p-4 rounded-lg border border-violet-500/20 bg-violet-500/5">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                              <Bot className="h-4 w-4 text-white" />
                            </div>
                            <h4 className="font-semibold text-sm">Resposta Automática</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Respostas inteligentes em tempo real
                          </p>
                        </div>
                        <div className="p-4 rounded-lg border border-violet-500/20 bg-violet-500/5">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                              <Clock className="h-4 w-4 text-white" />
                            </div>
                            <h4 className="font-semibold text-sm">Lembretes Automáticos</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Confirmações e follow-ups inteligentes
                          </p>
                        </div>
                        <div className="p-4 rounded-lg border border-violet-500/20 bg-violet-500/5">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                              <Users className="h-4 w-4 text-white" />
                            </div>
                            <h4 className="font-semibold text-sm">Follow-up de Pacientes</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Acompanhamento pós-consulta automatizado
                          </p>
                        </div>
                        <div className="p-4 rounded-lg border border-violet-500/20 bg-violet-500/5">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                              <Sparkles className="h-4 w-4 text-white" />
                            </div>
                            <h4 className="font-semibold text-sm">Agendamento Inteligente</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Otimização automática da agenda
                          </p>
                        </div>
                      </div>

                      <Button onClick={() => changeSection("home")} variant="outline" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Voltar para Início
                      </Button>
                    </div>
                  ) : (
                  <div className="space-y-6 animate-fade-in">
                    {/* Resposta Automática */}
                    <div className="flex items-start justify-between p-4 rounded-lg border-2 border-border hover:border-primary/50 transition-all">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          autopilotConfig.autoResponder
                            ? "bg-gradient-to-br from-violet-500 to-purple-500"
                            : "bg-muted"
                        }`}>
                          <Bot className={`h-6 w-6 ${
                            autopilotConfig.autoResponder ? "text-white" : "text-muted-foreground"
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">Resposta Automática</h3>
                            <Tooltip>
                              <TooltipTrigger>
                                <span className="text-xs text-muted-foreground cursor-help">(?)</span>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p>
                                  IA responde automaticamente perguntas frequentes de pacientes via chat ou WhatsApp
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            IA responde dúvidas comuns dos pacientes automaticamente
                          </p>
                          {autopilotConfig.autoResponder && (
                            <div className="mt-3 space-y-2">
                              <Label className="text-xs">Horário de operação</Label>
                              <div className="flex gap-2">
                                <Input placeholder="08:00" className="h-9" />
                                <span className="text-muted-foreground">até</span>
                                <Input placeholder="18:00" className="h-9" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <Switch
                        checked={autopilotConfig.autoResponder}
                        onCheckedChange={(checked) =>
                          setAutopilotConfig({ ...autopilotConfig, autoResponder: checked })
                        }
                      />
                    </div>

                    {/* Lembretes de Confirmação */}
                    <div className="flex items-start justify-between p-4 rounded-lg border-2 border-border hover:border-primary/50 transition-all">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          autopilotConfig.confirmationReminders
                            ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                            : "bg-muted"
                        }`}>
                          <Clock className={`h-6 w-6 ${
                            autopilotConfig.confirmationReminders ? "text-white" : "text-muted-foreground"
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">Lembretes de Confirmação</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Envia lembretes automáticos e coleta confirmações de presença
                          </p>
                          {autopilotConfig.confirmationReminders && (
                            <div className="mt-3 space-y-2">
                              <Label className="text-xs">Enviar lembrete</Label>
                              <Select defaultValue="24">
                                <SelectTrigger className="h-9">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="2">2 horas antes</SelectItem>
                                  <SelectItem value="6">6 horas antes</SelectItem>
                                  <SelectItem value="24">24 horas antes</SelectItem>
                                  <SelectItem value="48">48 horas antes</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                        </div>
                      </div>
                      <Switch
                        checked={autopilotConfig.confirmationReminders}
                        onCheckedChange={(checked) =>
                          setAutopilotConfig({ ...autopilotConfig, confirmationReminders: checked })
                        }
                      />
                    </div>

                    {/* Follow-up de Pacientes */}
                    <div className="flex items-start justify-between p-4 rounded-lg border-2 border-border hover:border-primary/50 transition-all">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          autopilotConfig.patientFollowUp
                            ? "bg-gradient-to-br from-green-500 to-emerald-500"
                            : "bg-muted"
                        }`}>
                          <Users className={`h-6 w-6 ${
                            autopilotConfig.patientFollowUp ? "text-white" : "text-muted-foreground"
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">Follow-up de Pacientes</h3>
                            <Badge variant="outline" className="text-xs">Premium</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            IA identifica pacientes que precisam de retorno e sugere agendamento
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={autopilotConfig.patientFollowUp}
                        onCheckedChange={(checked) =>
                          setAutopilotConfig({ ...autopilotConfig, patientFollowUp: checked })
                        }
                      />
                    </div>

                    {/* Agendamento Inteligente */}
                    <div className="flex items-start justify-between p-4 rounded-lg border-2 border-border hover:border-primary/50 transition-all">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          autopilotConfig.smartScheduling
                            ? "bg-gradient-to-br from-orange-500 to-red-500"
                            : "bg-muted"
                        }`}>
                          <Zap className={`h-6 w-6 ${
                            autopilotConfig.smartScheduling ? "text-white" : "text-muted-foreground"
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">Agendamento Inteligente</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Otimiza horários automaticamente com base em padrões e histórico
                          </p>
                          {autopilotConfig.smartScheduling && (
                            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                              <CheckCircle2 className="h-3 w-3 text-green-500" />
                              <span>Otimização ativa - economia média de 2 horas/dia</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <Switch
                        checked={autopilotConfig.smartScheduling}
                        onCheckedChange={(checked) =>
                          setAutopilotConfig({ ...autopilotConfig, smartScheduling: checked })
                        }
                      />
                    </div>
                  </div>
                  )}

                  <Button onClick={handleSave} className="w-full md:w-auto gap-2 mt-6">
                    <Save className="h-4 w-4" />
                    Salvar Configurações
                  </Button>
                </CardContent>
              </Card>

              {/* Base de Conhecimento */}
              <Card className="border-border/50 backdrop-blur-sm bg-card/95 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Base de Conhecimento</CardTitle>
                      <CardDescription>
                        Adicione informações para treinar o Autopilot sobre sua clínica
                      </CardDescription>
                    </div>
                    <Button size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Adicionar Documento
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { title: "Perguntas Frequentes", items: 24, lastUpdate: "Há 2 dias" },
                      { title: "Políticas da Clínica", items: 8, lastUpdate: "Há 1 semana" },
                      { title: "Informações sobre Convênios", items: 12, lastUpdate: "Há 3 dias" },
                    ].map((doc, index) => (
                      <Card key={index} className="border border-border hover:border-primary/50 hover:shadow-md transition-all">
                        <CardContent className="py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 p-2">
                                <FileText className="h-full w-full text-white" />
                              </div>
                              <div>
                                <p className="font-semibold">{doc.title}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  {doc.items} itens • {doc.lastUpdate}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">Editar</Button>
                              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Telemedicina Section */}
          {activeSection === "telemedicina" && (
            <div className="space-y-6">
              <Card className="border-border/50 backdrop-blur-sm bg-card/95 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Video className="h-5 w-5 text-primary" />
                      <CardTitle>Telemedicina</CardTitle>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {resources.telemedicina ? "Módulo Ativo" : "Módulo Desativado"}
                      </span>
                      <Switch
                        checked={resources.telemedicina}
                        onCheckedChange={(checked) => {
                          setResources({ ...resources, telemedicina: checked });
                          toast.success(checked ? "Telemedicina ativado!" : "Telemedicina desativado");
                        }}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Configure atendimentos online e salas de videochamada
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!resources.telemedicina ? (
                    <div className="py-12 text-center space-y-6">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 p-5 mx-auto opacity-50">
                        <Video className="h-full w-full text-white" />
                      </div>
                      <div className="space-y-2">
                        <p className="font-semibold text-xl">Módulo Telemedicina Desativado</p>
                        <p className="text-sm text-muted-foreground max-w-md mx-auto">
                          Ative o módulo de Telemedicina para configurar atendimentos online e salas de videochamada
                        </p>
                      </div>
                      
                      {/* Recursos Disponíveis */}
                      <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                        <div className="p-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                              <Video className="h-4 w-4 text-white" />
                            </div>
                            <h4 className="font-semibold text-sm">Salas Virtuais</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Videochamadas profissionais com branding
                          </p>
                        </div>
                        <div className="p-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                              <Settings className="h-4 w-4 text-white" />
                            </div>
                            <h4 className="font-semibold text-sm">Gravação de Consultas</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Grave e armazene atendimentos online
                          </p>
                        </div>
                        <div className="p-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                              <Clock className="h-4 w-4 text-white" />
                            </div>
                            <h4 className="font-semibold text-sm">Sala de Espera</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Gerencie entrada de pacientes virtuais
                          </p>
                        </div>
                        <div className="p-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                              <Palette className="h-4 w-4 text-white" />
                            </div>
                            <h4 className="font-semibold text-sm">Personalização Visual</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Customize cores e tema da sala
                          </p>
                        </div>
                      </div>

                      <Button onClick={() => changeSection("home")} variant="outline" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Voltar para Início
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6 animate-fade-in">
                      {/* Tema da Sala */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label>Tema da Sala Virtual</Label>
                          <Badge variant="outline" className="gap-1">
                            <Sparkles className="h-3 w-3" />
                            Preview ao vivo
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[
                            { id: "professional", name: "Profissional", desc: "Tema limpo e corporativo" },
                            { id: "warm", name: "Acolhedor", desc: "Tons quentes e convidativos" },
                            { id: "modern", name: "Moderno", desc: "Design contemporâneo" },
                          ].map((theme) => (
                            <Card
                              key={theme.id}
                              className={`cursor-pointer border-2 transition-all ${
                                telemedicine.roomTheme === theme.id
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50"
                              }`}
                              onClick={() =>
                                setTelemedicine({ ...telemedicine, roomTheme: theme.id })
                              }
                            >
                              <CardContent className="pt-6">
                                <div className="space-y-3">
                                  <div className="h-24 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                                    <Video className="h-10 w-10 text-primary" />
                                  </div>
                                  <div>
                                    <p className="font-semibold">{theme.name}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {theme.desc}
                                    </p>
                                  </div>
                                  {telemedicine.roomTheme === theme.id && (
                                    <Badge variant="default" className="gap-1 w-full justify-center">
                                      <CheckCircle2 className="h-3 w-3" />
                                      Selecionado
                                    </Badge>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>

                      {/* Cor de Destaque */}
                      <div className="space-y-4">
                        <Label>Cor de Destaque</Label>
                        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                          {[
                            "#3b82f6", "#8b5cf6", "#ec4899", "#ef4444",
                            "#f97316", "#eab308", "#22c55e", "#06b6d4"
                          ].map((color) => (
                            <button
                              key={color}
                              className={`w-12 h-12 rounded-lg transition-all hover:scale-110 ${
                                telemedicine.brandColor === color
                                  ? "ring-2 ring-primary ring-offset-2"
                                  : ""
                              }`}
                              style={{ background: color }}
                              onClick={() =>
                                setTelemedicine({ ...telemedicine, brandColor: color })
                              }
                            >
                              {telemedicine.brandColor === color && (
                                <Check className="h-6 w-6 text-white mx-auto" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Funcionalidades */}
                      <div className="space-y-4">
                        <Label>Funcionalidades da Sala</Label>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <Circle className="h-4 w-4 text-red-500 fill-red-500" />
                              <div>
                                <p className="font-medium text-sm">Gravação de Consultas</p>
                                <p className="text-xs text-muted-foreground">
                                  Armazena vídeos por 30 dias
                                </p>
                              </div>
                            </div>
                            <Switch
                              checked={telemedicine.recordingEnabled}
                              onCheckedChange={(checked) =>
                                setTelemedicine({ ...telemedicine, recordingEnabled: checked })
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <Clock className="h-4 w-4 text-primary" />
                              <div>
                                <p className="font-medium text-sm">Sala de Espera Virtual</p>
                                <p className="text-xs text-muted-foreground">
                                  Pacientes aguardam aprovação
                                </p>
                              </div>
                            </div>
                            <Switch
                              checked={telemedicine.waitingRoom}
                              onCheckedChange={(checked) =>
                                setTelemedicine({ ...telemedicine, waitingRoom: checked })
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <Globe className="h-4 w-4 text-primary" />
                              <div>
                                <p className="font-medium text-sm">Compartilhamento de Tela</p>
                                <p className="text-xs text-muted-foreground">
                                  Permite mostrar documentos
                                </p>
                              </div>
                            </div>
                            <Switch
                              checked={telemedicine.screenShare}
                              onCheckedChange={(checked) =>
                                setTelemedicine({ ...telemedicine, screenShare: checked })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <Button onClick={handleSave} className="w-full md:w-auto gap-2">
                        <Save className="h-4 w-4" />
                        Salvar Configurações
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Preview da Sala */}
              {resources.telemedicina && (
                <Card className="border-border/50 backdrop-blur-sm bg-card/95 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <CardTitle>Preview da Sala Virtual</CardTitle>
                    </div>
                    <CardDescription>
                      Visualização em tempo real de como ficará a sala de telemedicina
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="rounded-xl overflow-hidden border-2 border-border bg-gradient-to-br from-background to-muted/20 p-8"
                      style={{ borderColor: telemedicine.brandColor }}
                    >
                      <div className="aspect-video rounded-lg bg-muted/50 flex items-center justify-center">
                        <div className="text-center space-y-3">
                          <div
                            className="w-20 h-20 rounded-full mx-auto flex items-center justify-center"
                            style={{ background: telemedicine.brandColor }}
                          >
                            <Video className="h-10 w-10 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-lg">Sala Virtual</p>
                            <p className="text-sm text-muted-foreground">
                              Tema: {telemedicine.roomTheme === "professional" ? "Profissional" : 
                                     telemedicine.roomTheme === "warm" ? "Acolhedor" : "Moderno"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Fiscal Section */}
          {activeSection === "fiscal" && (
            <div className="space-y-6">
              <Card className="border-border/50 backdrop-blur-sm bg-card/95 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <CardTitle>Fiscal (Notas / NF-e)</CardTitle>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {resources.fiscal ? "Módulo Ativo" : "Módulo Desativado"}
                      </span>
                      <Switch
                        checked={resources.fiscal}
                        onCheckedChange={(checked) => {
                          setResources({ ...resources, fiscal: checked });
                          toast.success(checked ? "Fiscal ativado!" : "Fiscal desativado");
                        }}
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Configure emissão de notas fiscais e documentos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!resources.fiscal ? (
                    <div className="py-12 text-center space-y-6">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 p-5 mx-auto opacity-50">
                        <FileText className="h-full w-full text-white" />
                      </div>
                      <div className="space-y-2">
                        <p className="font-semibold text-xl">Módulo Fiscal Desativado</p>
                        <p className="text-sm text-muted-foreground max-w-md mx-auto">
                          Ative o módulo Fiscal para configurar emissão de notas fiscais e documentos
                        </p>
                      </div>
                      
                      {/* Recursos Disponíveis */}
                      <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                        <div className="p-4 rounded-lg border border-amber-500/20 bg-amber-500/5">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                              <FileText className="h-4 w-4 text-white" />
                            </div>
                            <h4 className="font-semibold text-sm">Emissão de NF-e</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Emita notas fiscais eletrônicas automaticamente
                          </p>
                        </div>
                        <div className="p-4 rounded-lg border border-amber-500/20 bg-amber-500/5">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                              <Zap className="h-4 w-4 text-white" />
                            </div>
                            <h4 className="font-semibold text-sm">Emissão Automática</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Configure emissão automática após consulta
                          </p>
                        </div>
                        <div className="p-4 rounded-lg border border-amber-500/20 bg-amber-500/5">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                              <Settings className="h-4 w-4 text-white" />
                            </div>
                            <h4 className="font-semibold text-sm">Múltiplos Provedores</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Suporte para NFe.io, eNotas e outros
                          </p>
                        </div>
                        <div className="p-4 rounded-lg border border-amber-500/20 bg-amber-500/5">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                              <Shield className="h-4 w-4 text-white" />
                            </div>
                            <h4 className="font-semibold text-sm">Ambiente Seguro</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Homologação e produção separados
                          </p>
                        </div>
                      </div>

                      <Button onClick={() => changeSection("home")} variant="outline" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Voltar para Início
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6 animate-fade-in">
                      {/* Provedor de NF-e */}
                      <div className="space-y-4">
                        <Label>Provedor de Nota Fiscal</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[
                            { id: "nfe-io", name: "NFe.io", desc: "Integração simplificada" },
                            { id: "nfse", name: "NFSe.gov", desc: "Oficial do município" },
                            { id: "focusnfe", name: "Focus NFe", desc: "Completo e robusto" },
                          ].map((provider) => (
                            <Card
                              key={provider.id}
                              className={`cursor-pointer border-2 transition-all ${
                                fiscalConfig.provider === provider.id
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50"
                              }`}
                              onClick={() =>
                                setFiscalConfig({ ...fiscalConfig, provider: provider.id })
                              }
                            >
                              <CardContent className="pt-6">
                                <div className="space-y-3">
                                  <div className="h-16 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                                    <FileText className="h-8 w-8 text-primary" />
                                  </div>
                                  <div>
                                    <p className="font-semibold">{provider.name}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {provider.desc}
                                    </p>
                                  </div>
                                  {fiscalConfig.provider === provider.id && (
                                    <Badge variant="default" className="gap-1 w-full justify-center">
                                      <CheckCircle2 className="h-3 w-3" />
                                      Selecionado
                                    </Badge>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>

                      {/* Credenciais */}
                      <div className="space-y-4">
                        <Label>Credenciais de Acesso</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="apiKey" className="text-xs">API Key</Label>
                            <Input
                              id="apiKey"
                              type="password"
                              placeholder="••••••••••••••••"
                              className="font-mono"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="apiSecret" className="text-xs">API Secret</Label>
                            <Input
                              id="apiSecret"
                              type="password"
                              placeholder="••••••••••••••••"
                              className="font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Configurações de Emissão */}
                      <div className="space-y-4">
                        <Label>Configurações de Emissão</Label>
                        
                        <div className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <Zap className="h-4 w-4 text-primary" />
                            <div>
                              <p className="font-medium text-sm">Emissão Automática</p>
                              <p className="text-xs text-muted-foreground">
                                Emite NF-e automaticamente após pagamento confirmado
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={fiscalConfig.autoEmit}
                            onCheckedChange={(checked) =>
                              setFiscalConfig({ ...fiscalConfig, autoEmit: checked })
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="defaultService" className="text-xs">
                            Serviço Padrão
                            <Tooltip>
                              <TooltipTrigger>
                                <span className="text-xs text-muted-foreground cursor-help ml-1">(?)</span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">
                                  Descrição que aparecerá por padrão nas notas fiscais
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </Label>
                          <Input
                            id="defaultService"
                            value={fiscalConfig.defaultService}
                            onChange={(e) =>
                              setFiscalConfig({ ...fiscalConfig, defaultService: e.target.value })
                            }
                            placeholder="Ex: Consulta Médica"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="environment" className="text-xs">Ambiente</Label>
                          <Select
                            value={fiscalConfig.environment}
                            onValueChange={(value) =>
                              setFiscalConfig({ ...fiscalConfig, environment: value })
                            }
                          >
                            <SelectTrigger id="environment">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="homologacao">Homologação (Testes)</SelectItem>
                              <SelectItem value="producao">Produção</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Button onClick={handleSave} className="w-full md:w-auto gap-2">
                        <Save className="h-4 w-4" />
                        Salvar Configurações
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Certificados Digitais */}
              {resources.fiscal && (
                <Card className="border-border/50 backdrop-blur-sm bg-card/95 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Certificados Digitais</CardTitle>
                        <CardDescription>
                          Gerencie certificados digitais para assinatura de documentos
                        </CardDescription>
                      </div>
                      <Button size="sm" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Upload Certificado
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: "Certificado A1 - Clínica", expiry: "31/12/2025", status: "active" },
                        { name: "Certificado A3 - Backup", expiry: "15/06/2025", status: "active" },
                      ].map((cert, index) => (
                        <Card key={index} className="border border-border">
                          <CardContent className="py-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 p-2">
                                  <Shield className="h-full w-full text-white" />
                                </div>
                                <div>
                                  <p className="font-semibold">{cert.name}</p>
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                    Válido até {cert.expiry}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant={cert.status === "active" ? "default" : "secondary"}>
                                  {cert.status === "active" ? "Ativo" : "Inativo"}
                                </Badge>
                                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Acessos Section */}
          {activeSection === "acessos" && (
            <div className="space-y-6 section-content animate-fade-in">
              {/* Header */}
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => changeSection("home")}
                  className="gap-2 mb-4"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar
                </Button>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-pink-500/10 border border-red-500/20">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 p-4 shadow-lg flex-shrink-0">
                  <Shield className="h-full w-full text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">Acessos e Permissões</h2>
                  <p className="text-muted-foreground">
                    Gerencie usuários, perfis de acesso e permissões granulares do sistema
                  </p>
                </div>
              </div>

              {/* Estatísticas Rápidas */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-border/50 backdrop-blur-sm bg-card/95">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Usuários Ativos</p>
                        <p className="text-3xl font-bold mt-1">{accessControl.users.filter(u => u.status === 'active').length}</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50 backdrop-blur-sm bg-card/95">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Convites Pendentes</p>
                        <p className="text-3xl font-bold mt-1">{accessControl.users.filter(u => u.status === 'pending').length}</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                        <Clock className="h-6 w-6 text-amber-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50 backdrop-blur-sm bg-card/95">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Perfis Configurados</p>
                        <p className="text-3xl font-bold mt-1">{accessControl.roles.length}</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                        <Shield className="h-6 w-6 text-blue-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50 backdrop-blur-sm bg-card/95">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Permissões</p>
                        <p className="text-3xl font-bold mt-1">{Object.keys(accessControl.permissions).length}</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                        <Settings className="h-6 w-6 text-purple-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Gestão de Usuários */}
              <Card className="border-border/50 backdrop-blur-sm bg-card/95 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Usuários do Sistema</CardTitle>
                      <CardDescription>
                        Gerencie os usuários com acesso ao sistema
                      </CardDescription>
                    </div>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Convidar Usuário
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {accessControl.users.map((user) => {
                      const role = accessControl.roles.find(r => r.id === user.role);
                      return (
                        <Card key={user.id} className="border border-border hover:shadow-md transition-shadow">
                          <CardContent className="py-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-semibold text-lg">
                                  {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="font-semibold">{user.name}</p>
                                    {user.status === 'pending' && (
                                      <Badge variant="secondary" className="gap-1">
                                        <Clock className="h-3 w-3" />
                                        Pendente
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground">{user.email}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                {role && (
                                  <Badge 
                                    variant="outline" 
                                    className={`bg-gradient-to-r ${role.color} text-white border-0`}
                                  >
                                    {role.name}
                                  </Badge>
                                )}
                                <Button variant="ghost" size="sm">
                                  <Settings className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Perfis de Acesso */}
              <Card className="border-border/50 backdrop-blur-sm bg-card/95 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Perfis de Acesso</CardTitle>
                      <CardDescription>
                        Configure os perfis e suas permissões
                      </CardDescription>
                    </div>
                    <Button variant="outline" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Novo Perfil
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {accessControl.roles.map((role) => (
                      <Card 
                        key={role.id} 
                        className="border-2 border-border hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
                      >
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <div className="flex items-start justify-between">
                              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${role.color} p-3 shadow-lg group-hover:shadow-xl transition-shadow`}>
                                <Shield className="h-full w-full text-white" />
                              </div>
                              <Button variant="ghost" size="sm">
                                <Settings className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <div>
                              <h3 className="font-bold text-lg">{role.name}</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {role.description}
                              </p>
                            </div>

                            <div className="space-y-2">
                              <p className="text-xs font-medium text-muted-foreground">PERMISSÕES</p>
                              <div className="flex flex-wrap gap-1">
                                {role.permissions.slice(0, 3).map((perm) => (
                                  <Badge key={perm} variant="secondary" className="text-xs">
                                    {accessControl.permissions[perm]?.label || perm}
                                  </Badge>
                                ))}
                                {role.permissions.length > 3 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{role.permissions.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t">
                              <p className="text-xs text-muted-foreground">
                                {accessControl.users.filter(u => u.role === role.id).length} usuários
                              </p>
                              <Button variant="ghost" size="sm" className="text-xs gap-1">
                                Ver detalhes
                                <ArrowLeft className="h-3 w-3 rotate-180" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Permissões Granulares */}
              <Card className="border-border/50 backdrop-blur-sm bg-card/95 shadow-lg">
                <CardHeader>
                  <CardTitle>Permissões Granulares</CardTitle>
                  <CardDescription>
                    Todas as permissões disponíveis no sistema organizadas por categoria
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(
                      Object.entries(accessControl.permissions).reduce((acc, [key, perm]) => {
                        const category = perm.category;
                        if (!acc[category]) acc[category] = [];
                        acc[category].push({ key, ...perm });
                        return acc;
                      }, {} as Record<string, Array<{ key: string; label: string; category: string }>>)
                    ).map(([category, perms]) => (
                      <div key={category} className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                            <Shield className="h-4 w-4 text-primary" />
                          </div>
                          <h4 className="font-semibold">{category}</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ml-10">
                          {perms.map((perm) => (
                            <Card 
                              key={perm.key} 
                              className="border border-border hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer"
                            >
                              <CardContent className="py-3 px-4">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium">{perm.label}</p>
                                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <p className="text-xs text-muted-foreground mt-1 font-mono">
                                  {perm.key}
                                </p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Logs de Auditoria */}
              <Card className="border-border/50 backdrop-blur-sm bg-card/95 shadow-lg">
                <CardHeader>
                  <CardTitle>Logs de Auditoria</CardTitle>
                  <CardDescription>
                    Histórico de alterações em acessos e permissões
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { action: 'Usuário adicionado', user: 'Admin', target: 'João Oliveira', time: 'Há 2 horas', type: 'add' },
                      { action: 'Perfil modificado', user: 'Admin', target: 'Médico', time: 'Há 5 horas', type: 'edit' },
                      { action: 'Permissão revogada', user: 'Admin', target: 'Maria Santos', time: 'Há 1 dia', type: 'remove' },
                    ].map((log, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          log.type === 'add' ? 'bg-green-500/20' :
                          log.type === 'edit' ? 'bg-blue-500/20' :
                          'bg-red-500/20'
                        }`}>
                          {log.type === 'add' ? <Plus className="h-5 w-5 text-green-500" /> :
                           log.type === 'edit' ? <Settings className="h-5 w-5 text-blue-500" /> :
                           <X className="h-5 w-5 text-red-500" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{log.action}</p>
                          <p className="text-xs text-muted-foreground">
                            {log.user} • {log.target}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">{log.time}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
