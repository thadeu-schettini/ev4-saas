import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tooltip as RechartsTooltip } from "recharts";
import { cn } from "@/lib/utils";
import {
  Shield,
  Users,
  Building2,
  CreditCard,
  BarChart3,
  Settings,
  Search,
  Filter,
  Eye,
  Ban,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  Clock,
  MoreVertical,
  RefreshCw,
  Download,
  AlertCircle,
  Zap,
  Server,
  Database,
  Globe,
  Lock,
  Unlock,
  UserPlus,
  ArrowUpRight,
  ChevronRight,
  HelpCircle,
  HeadphonesIcon,
  Ticket,
  Plus,
  FileText,
  History,
  AlertOctagon,
  ShieldCheck,
  ShieldAlert,
  Cpu,
  HardDrive,
  Wifi,
  WifiOff,
  Bell,
  BellOff,
  Send,
  Star,
  StarOff,
  Play,
  Pause,
  Terminal,
  Code,
  Bug,
  GitBranch,
  Layers,
  Package,
  Rocket,
  Target,
  Award,
  Crown,
  Sparkles,
  Flame,
  Eye as EyeIcon,
  EyeOff,
  Copy,
  ExternalLink,
  Map,
  MapPin,
  Trash2,
  Edit,
  PlusCircle,
  MinusCircle,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Power,
  PowerOff,
  Radio,
  Megaphone,
  Newspaper,
  BookOpen,
  GraduationCap,
  Briefcase,
  Wallet,
  Receipt,
  PieChart,
  LineChart,
  TrendingUp as TrendingUpIcon,
  LayoutDashboard,
  Gauge,
  Timer,
  Hourglass,
  CalendarDays,
  CalendarClock,
  UserCheck,
  UserX,
  UserCog,
  UserMinus,
  UsersRound,
  Building,
  Store,
  Factory,
  Landmark,
  GlobeLock,
  KeyRound,
  Fingerprint,
  ScanFace,
  QrCode,
  Barcode,
  CreditCard as CreditCardIcon,
  Banknote,
  Coins,
  CircleDollarSign,
  BadgePercent,
  Gift,
  PartyPopper,
  
  Heart,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  MessagesSquare,
  AtSign,
  Hash,
  Link,
  Unlink,
  Webhook,
  Cloud,
  CloudOff,
  Database as DatabaseIcon,
  HardDrive as HardDriveIcon,
  Folder,
  FolderOpen,
  File,
  FileCode,
  FileJson,
  FileCog,
  Settings2,
  Wrench,
  Hammer,
  Construction,
  AlertTriangle as AlertTriangleIcon,
  Info,
  HelpCircle as HelpCircleIcon,
  CircleHelp,
  Lightbulb,
  Megaphone as MegaphoneIcon,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Keyboard,
  Mouse,
  Printer,
  ScanLine,
  Scan,
  Share2,
  Upload,
  CloudUpload,
  Image,
  ImagePlus,
  Camera,
  Palette,
  Paintbrush,
  Brush,
  Wand2,
  Sparkle,
  Gem,
  Diamond,
  Infinity,
  CirclePlay,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Pentagon,
  Octagon,
  LayoutGrid,
  LayoutList,
  List,
  ListChecks,
  ListOrdered,
  ListTodo,
  ClipboardList,
  ClipboardCheck,
  Clipboard,
  Bookmark,
  BookmarkPlus,
  Flag,
  FlagOff,
  Pin,
  PinOff,
  Navigation,
  Compass,
  Move,
  Maximize,
  Minimize,
  Expand,
  Shrink,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Shuffle,
  Repeat,
  FastForward,
  Rewind,
  SkipForward,
  SkipBack,
  VolumeOff
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer } from "@/components/ui/page-container";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Tooltip, PieChart as RechartsPieChart, Pie, Cell, LineChart as RechartsLineChart, Line, Legend, ComposedChart, Scatter, ScatterChart, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Treemap } from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// Mock metrics data
const metricsData = {
  totalUsers: 12847,
  activeUsers: 8924,
  totalClinics: 1568,
  activeClinics: 1432,
  mrr: 452800,
  arr: 5433600,
  churnRate: 2.3,
  growthRate: 12.5,
  ltv: 8540,
  cac: 1250,
  arpu: 289,
  nps: 72,
  supportTickets: 45,
  avgResponseTime: 4.2,
  uptime: 99.97,
  apiCalls: 2847365,
};

// Mock revenue data (12 meses)
const revenueData = [
  { mes: "Jan", receita: 285000, novos: 45, churn: 12, net: 33 },
  { mes: "Fev", receita: 298000, novos: 52, churn: 8, net: 44 },
  { mes: "Mar", receita: 315000, novos: 61, churn: 15, net: 46 },
  { mes: "Abr", receita: 342000, novos: 58, churn: 10, net: 48 },
  { mes: "Mai", receita: 368000, novos: 72, churn: 14, net: 58 },
  { mes: "Jun", receita: 395000, novos: 68, churn: 11, net: 57 },
  { mes: "Jul", receita: 380000, novos: 55, churn: 18, net: 37 },
  { mes: "Ago", receita: 420000, novos: 78, churn: 12, net: 66 },
  { mes: "Set", receita: 395000, novos: 62, churn: 16, net: 46 },
  { mes: "Out", receita: 450000, novos: 85, churn: 14, net: 71 },
  { mes: "Nov", receita: 482000, novos: 92, churn: 11, net: 81 },
  { mes: "Dez", receita: 528000, novos: 108, churn: 15, net: 93 },
];

// Mock cohort data
const cohortData = [
  { cohort: "Jan 24", m0: 100, m1: 92, m2: 88, m3: 85, m4: 82, m5: 80, m6: 78 },
  { cohort: "Fev 24", m0: 100, m1: 94, m2: 90, m3: 87, m4: 84, m5: 82, m6: null },
  { cohort: "Mar 24", m0: 100, m1: 91, m2: 86, m3: 83, m4: 81, m5: null, m6: null },
  { cohort: "Abr 24", m0: 100, m1: 93, m2: 89, m3: 86, m4: null, m5: null, m6: null },
  { cohort: "Mai 24", m0: 100, m1: 95, m2: 91, m3: null, m4: null, m5: null, m6: null },
  { cohort: "Jun 24", m0: 100, m1: 96, m2: null, m3: null, m4: null, m5: null, m6: null },
];

// Mock plan distribution
const planDistribution = [
  { name: "Free", value: 456, color: "hsl(var(--muted-foreground))", revenue: 0 },
  { name: "Starter", value: 312, color: "hsl(var(--info))", revenue: 31200 },
  { name: "Pro", value: 489, color: "hsl(var(--primary))", revenue: 97311 },
  { name: "Business", value: 234, color: "hsl(142, 76%, 36%)", revenue: 105300 },
  { name: "Enterprise", value: 77, color: "hsl(280, 76%, 50%)", revenue: 218989 },
];

// Mock clinics
const clinics = [
  { id: 1, name: "Clínica MedSaúde Premium", owner: "Dr. Ricardo Carvalho", email: "ricardo@medsaude.com", phone: "(11) 98765-4321", plan: "Enterprise", users: 45, status: "active", mrr: 2890, createdAt: "15/01/2024", lastLogin: "Há 2 horas", storage: 82, appointments: 1247, patients: 3456, location: "São Paulo, SP" },
  { id: 2, name: "Centro Médico Vida Plena", owner: "Dra. Ana Paula Costa", email: "ana@vidaplena.com", phone: "(21) 99876-5432", plan: "Business", users: 28, status: "active", mrr: 1450, createdAt: "22/02/2024", lastLogin: "Há 5 horas", storage: 65, appointments: 892, patients: 2134, location: "Rio de Janeiro, RJ" },
  { id: 3, name: "Clínica Bem Estar Total", owner: "Dr. Marcos Souza Lima", email: "marcos@bemestar.com", phone: "(31) 98765-1234", plan: "Pro", users: 12, status: "active", mrr: 399, createdAt: "05/03/2024", lastLogin: "Há 1 dia", storage: 34, appointments: 456, patients: 987, location: "Belo Horizonte, MG" },
  { id: 4, name: "Saúde Total Integrada", owner: "Dra. Fernanda Lima", email: "fernanda@saudetotal.com", phone: "(41) 99765-4321", plan: "Starter", users: 5, status: "trial", mrr: 99, createdAt: "08/11/2024", lastLogin: "Há 3 dias", storage: 12, appointments: 78, patients: 156, location: "Curitiba, PR" },
  { id: 5, name: "Clínica Prime Care", owner: "Dr. Carlos Silva", email: "carlos@primecare.com", phone: "(51) 98654-3210", plan: "Business", users: 18, status: "suspended", mrr: 0, createdAt: "01/05/2024", lastLogin: "Há 15 dias", storage: 45, appointments: 234, patients: 678, location: "Porto Alegre, RS" },
  { id: 6, name: "Instituto de Saúde Avançada", owner: "Dra. Mariana Oliveira", email: "mariana@saudeavancada.com", phone: "(61) 99876-5432", plan: "Enterprise", users: 62, status: "active", mrr: 3890, createdAt: "10/06/2024", lastLogin: "Há 30 min", storage: 91, appointments: 2156, patients: 5678, location: "Brasília, DF" },
  { id: 7, name: "Centro de Especialidades Médicas", owner: "Dr. Pedro Almeida", email: "pedro@especialidades.com", phone: "(85) 98765-4321", plan: "Pro", users: 8, status: "active", mrr: 299, createdAt: "15/07/2024", lastLogin: "Há 6 horas", storage: 28, appointments: 345, patients: 789, location: "Fortaleza, CE" },
  { id: 8, name: "Clínica Integrada Saúde", owner: "Dra. Juliana Santos", email: "juliana@integradasaude.com", phone: "(71) 99654-3210", plan: "Free", users: 2, status: "inactive", mrr: 0, createdAt: "20/08/2024", lastLogin: "Há 45 dias", storage: 5, appointments: 23, patients: 45, location: "Salvador, BA" },
];

// Mock users for detailed view
const systemUsers = [
  { id: 1, name: "Ricardo Carvalho", email: "ricardo@medsaude.com", role: "owner", clinic: "Clínica MedSaúde", status: "active", lastLogin: "Há 2 horas", permissions: ["all"], avatar: null },
  { id: 2, name: "Ana Paula Costa", email: "ana@vidaplena.com", role: "owner", clinic: "Centro Médico Vida", status: "active", lastLogin: "Há 5 horas", permissions: ["all"], avatar: null },
  { id: 3, name: "João Silva", email: "joao@medsaude.com", role: "doctor", clinic: "Clínica MedSaúde", status: "active", lastLogin: "Há 1 hora", permissions: ["appointments", "patients", "records"], avatar: null },
  { id: 4, name: "Maria Santos", email: "maria@medsaude.com", role: "receptionist", clinic: "Clínica MedSaúde", status: "active", lastLogin: "Há 30 min", permissions: ["appointments", "reception"], avatar: null },
  { id: 5, name: "Carlos Oliveira", email: "carlos@vidaplena.com", role: "admin", clinic: "Centro Médico Vida", status: "suspended", lastLogin: "Há 7 dias", permissions: ["all"], avatar: null },
];

// Mock support tickets
const supportTickets = [
  { id: 1, clinic: "Clínica MedSaúde", clinicId: 1, subject: "Erro ao gerar relatório financeiro", priority: "critical", status: "open", category: "bug", createdAt: "Há 2 horas", assignee: "Lucas Tech", messages: 3, sla: "2h restantes" },
  { id: 2, clinic: "Centro Médico Vida", clinicId: 2, subject: "Dúvida sobre integração com laboratório", priority: "medium", status: "in_progress", category: "integration", createdAt: "Há 5 horas", assignee: "Ana Support", messages: 8, sla: "4h restantes" },
  { id: 3, clinic: "Clínica Bem Estar", clinicId: 3, subject: "Solicitação de funcionalidade - Teleconsulta", priority: "low", status: "waiting", category: "feature", createdAt: "Há 1 dia", assignee: null, messages: 2, sla: "24h restantes" },
  { id: 4, clinic: "Saúde Total", clinicId: 4, subject: "Erro crítico no agendamento", priority: "critical", status: "open", category: "bug", createdAt: "Há 30 min", assignee: "Pedro Dev", messages: 1, sla: "1h 30min restantes" },
  { id: 5, clinic: "Instituto de Saúde", clinicId: 6, subject: "Upgrade de plano Enterprise", priority: "high", status: "resolved", category: "billing", createdAt: "Há 2 dias", assignee: "Carla Sales", messages: 12, sla: "Concluído" },
  { id: 6, clinic: "Centro Especialidades", clinicId: 7, subject: "Treinamento da equipe", priority: "medium", status: "scheduled", category: "training", createdAt: "Há 3 dias", assignee: "Marcos CS", messages: 5, sla: "Agendado: 15/12" },
];

// Mock audit logs
const auditLogs = [
  { id: 1, action: "user_login", user: "Ricardo Carvalho", clinic: "Clínica MedSaúde", details: "Login bem-sucedido via web", ip: "192.168.1.100", timestamp: "10/12/2024 14:32:15", severity: "info" },
  { id: 2, action: "plan_upgrade", user: "Sistema", clinic: "Centro Médico Vida", details: "Upgrade de Pro para Business", ip: "Sistema", timestamp: "10/12/2024 14:28:00", severity: "success" },
  { id: 3, action: "user_suspended", user: "Admin Sistema", clinic: "Clínica Prime Care", details: "Usuário suspenso por inadimplência", ip: "10.0.0.1", timestamp: "10/12/2024 13:45:22", severity: "warning" },
  { id: 4, action: "data_export", user: "Ana Paula Costa", clinic: "Centro Médico Vida", details: "Exportação de dados de pacientes", ip: "189.45.67.89", timestamp: "10/12/2024 12:15:00", severity: "info" },
  { id: 5, action: "failed_login", user: "unknown@test.com", clinic: "-", details: "3 tentativas falhas de login", ip: "45.67.89.123", timestamp: "10/12/2024 11:30:45", severity: "error" },
  { id: 6, action: "api_key_generated", user: "Marcos Souza", clinic: "Clínica Bem Estar", details: "Nova API key gerada para integração", ip: "192.168.2.50", timestamp: "10/12/2024 10:20:00", severity: "info" },
  { id: 7, action: "backup_completed", user: "Sistema", clinic: "Todas", details: "Backup diário concluído com sucesso", ip: "Sistema", timestamp: "10/12/2024 03:00:00", severity: "success" },
  { id: 8, action: "security_alert", user: "Sistema", clinic: "Clínica MedSaúde", details: "Detecção de padrão suspeito de acesso", ip: "Sistema", timestamp: "09/12/2024 22:45:00", severity: "critical" },
];

// Mock feature flags
const featureFlags = [
  { id: 1, name: "new_dashboard", label: "Novo Dashboard", description: "Habilita o novo layout do dashboard com métricas avançadas", enabled: true, rollout: 100, environment: "production" },
  { id: 2, name: "ai_transcription", label: "Transcrição por IA", description: "Permite transcrição automática de consultas usando IA", enabled: true, rollout: 75, environment: "production" },
  { id: 3, name: "telemedicine_v2", label: "Telemedicina 2.0", description: "Nova versão da telemedicina com salas virtuais aprimoradas", enabled: true, rollout: 50, environment: "beta" },
  { id: 4, name: "whatsapp_automation", label: "Automação WhatsApp", description: "Automações avançadas de mensagens via WhatsApp", enabled: true, rollout: 100, environment: "production" },
  { id: 5, name: "prescription_qr", label: "QR Code em Receitas", description: "Adiciona QR Code para validação de receitas digitais", enabled: false, rollout: 0, environment: "development" },
  { id: 6, name: "multi_clinic", label: "Multi-Clínica", description: "Permite gerenciar múltiplas clínicas em uma conta", enabled: true, rollout: 25, environment: "beta" },
  { id: 7, name: "patient_portal_v2", label: "Portal Paciente 2.0", description: "Nova versão do portal do paciente com agendamento online", enabled: false, rollout: 0, environment: "staging" },
  { id: 8, name: "advanced_reports", label: "Relatórios Avançados", description: "Relatórios personalizados com filtros avançados", enabled: true, rollout: 100, environment: "production" },
];

// Mock announcements
const announcements = [
  { id: 1, title: "Manutenção Programada", message: "Manutenção programada para 15/12 das 02h às 06h", type: "maintenance", status: "scheduled", targetPlans: ["all"], createdAt: "08/12/2024" },
  { id: 2, title: "Nova Funcionalidade: IA no Prontuário", message: "Lançamos a transcrição automática por IA. Confira!", type: "feature", status: "active", targetPlans: ["pro", "business", "enterprise"], createdAt: "05/12/2024" },
  { id: 3, title: "Black Friday - 40% OFF", message: "Aproveite 40% de desconto no upgrade de plano!", type: "promotion", status: "ended", targetPlans: ["free", "starter"], createdAt: "25/11/2024" },
];

// Mock system status
const systemStatus = [
  { name: "API Gateway", status: "operational", uptime: "99.99%", latency: "45ms", requests: "1.2M/dia" },
  { name: "Database Primary", status: "operational", uptime: "99.98%", latency: "12ms", requests: "8.5M/dia" },
  { name: "Database Replica", status: "operational", uptime: "99.99%", latency: "8ms", requests: "2.1M/dia" },
  { name: "Storage (S3)", status: "operational", uptime: "100%", latency: "85ms", requests: "450K/dia" },
  { name: "Email Service", status: "degraded", uptime: "98.5%", latency: "320ms", requests: "125K/dia" },
  { name: "SMS Gateway", status: "operational", uptime: "99.95%", latency: "180ms", requests: "45K/dia" },
  { name: "WhatsApp API", status: "operational", uptime: "99.92%", latency: "250ms", requests: "380K/dia" },
  { name: "Payment Gateway", status: "operational", uptime: "99.99%", latency: "95ms", requests: "12K/dia" },
  { name: "AI Service", status: "operational", uptime: "99.85%", latency: "450ms", requests: "85K/dia" },
  { name: "CDN", status: "operational", uptime: "100%", latency: "25ms", requests: "5.2M/dia" },
];

// Geographic distribution
const geoData = [
  { state: "SP", clinics: 456, users: 3245, revenue: 185000 },
  { state: "RJ", clinics: 234, users: 1678, revenue: 98000 },
  { state: "MG", clinics: 189, users: 1234, revenue: 72000 },
  { state: "RS", clinics: 145, users: 987, revenue: 54000 },
  { state: "PR", clinics: 123, users: 876, revenue: 48000 },
  { state: "BA", clinics: 98, users: 654, revenue: 35000 },
  { state: "DF", clinics: 87, users: 567, revenue: 42000 },
  { state: "Outros", clinics: 236, users: 1683, revenue: 45800 },
];

// Usage by time
const usageByHour = [
  { hour: "00h", users: 45 },
  { hour: "02h", users: 12 },
  { hour: "04h", users: 8 },
  { hour: "06h", users: 34 },
  { hour: "08h", users: 456 },
  { hour: "10h", users: 1234 },
  { hour: "12h", users: 987 },
  { hour: "14h", users: 1456 },
  { hour: "16h", users: 1678 },
  { hour: "18h", users: 876 },
  { hour: "20h", users: 345 },
  { hour: "22h", users: 123 },
];

export default function SuperAdmin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClinic, setSelectedClinic] = useState<typeof clinics[0] | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [selectedTab, setSelectedTab] = useState("overview");
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [showNewClinicModal, setShowNewClinicModal] = useState(false);

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "Enterprise":
        return <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20 gap-1"><Crown className="h-3 w-3" />Enterprise</Badge>;
      case "Business":
        return <Badge className="bg-success/10 text-success border-success/20 gap-1"><Briefcase className="h-3 w-3" />Business</Badge>;
      case "Pro":
        return <Badge className="bg-primary/10 text-primary border-primary/20 gap-1"><Star className="h-3 w-3" />Pro</Badge>;
      case "Starter":
        return <Badge className="bg-info/10 text-info border-info/20">Starter</Badge>;
      default:
        return <Badge variant="outline">Free</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-status-confirmed/10 text-status-confirmed border-status-confirmed/20 gap-1"><CheckCircle2 className="h-3 w-3" />Ativo</Badge>;
      case "trial":
        return <Badge className="bg-info/10 text-info border-info/20 gap-1"><Clock className="h-3 w-3" />Trial</Badge>;
      case "suspended":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20 gap-1"><Ban className="h-3 w-3" />Suspenso</Badge>;
      case "inactive":
        return <Badge className="bg-muted text-muted-foreground gap-1"><PowerOff className="h-3 w-3" />Inativo</Badge>;
      default:
        return null;
    }
  };

  const getTicketPriority = (priority: string) => {
    switch (priority) {
      case "critical":
        return <Badge className="bg-red-600/10 text-red-600 border-red-600/20 gap-1 animate-pulse"><AlertOctagon className="h-3 w-3" />Crítica</Badge>;
      case "high":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Alta</Badge>;
      case "medium":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Média</Badge>;
      default:
        return <Badge className="bg-info/10 text-info border-info/20">Baixa</Badge>;
    }
  };

  const getTicketStatus = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="outline" className="text-destructive border-destructive/30 gap-1"><AlertCircle className="h-3 w-3" />Aberto</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="text-warning border-warning/30 gap-1"><RefreshCw className="h-3 w-3 animate-spin" />Em Andamento</Badge>;
      case "waiting":
        return <Badge variant="outline" className="text-info border-info/30 gap-1"><Clock className="h-3 w-3" />Aguardando</Badge>;
      case "scheduled":
        return <Badge variant="outline" className="text-primary border-primary/30 gap-1"><Calendar className="h-3 w-3" />Agendado</Badge>;
      case "resolved":
        return <Badge variant="outline" className="text-success border-success/30 gap-1"><CheckCircle2 className="h-3 w-3" />Resolvido</Badge>;
      default:
        return null;
    }
  };

  const getAuditSeverity = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-red-600/10 text-red-600 border-red-600/20 gap-1"><ShieldAlert className="h-3 w-3" />Crítico</Badge>;
      case "error":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Erro</Badge>;
      case "warning":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Aviso</Badge>;
      case "success":
        return <Badge className="bg-success/10 text-success border-success/20">Sucesso</Badge>;
      default:
        return <Badge className="bg-info/10 text-info border-info/20">Info</Badge>;
    }
  };

  const filteredClinics = clinics.filter(clinic => 
    clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clinic.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clinic.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageContainer>
      <PageHeader
        icon={Shield}
        iconGradient="from-red-500 to-orange-600"
        title="Painel SuperAdmin"
        description="Gestão completa de usuários, clínicas, métricas e sistema"
      >
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="90d">Últimos 90 dias</SelectItem>
              <SelectItem value="1y">Último ano</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Exportar</span>
        </Button>
        <Button className="gap-2 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700">
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline">Configurações</span>
        </Button>
      </PageHeader>

      {/* Live Stats Bar */}
      <div className="px-4 sm:px-6 mb-4">
        <Card className="p-3 bg-gradient-to-r from-primary/5 via-transparent to-success/5 border-primary/20">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-sm font-medium">{metricsData.activeUsers.toLocaleString()} usuários online</span>
              </div>
              <Separator orientation="vertical" className="h-4 hidden sm:block" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="h-4 w-4 text-warning" />
                <span>{metricsData.apiCalls.toLocaleString()} API calls/24h</span>
              </div>
              <Separator orientation="vertical" className="h-4 hidden sm:block" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Activity className="h-4 w-4 text-info" />
                <span>Uptime: {metricsData.uptime}%</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="gap-2 text-xs">
                <RefreshCw className="h-3 w-3" />
                Atualizado há 30s
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Metrics */}
      <div className="px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <Card className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:shadow-lg transition-all">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <Badge variant="outline" className="text-success text-xs">+8.2%</Badge>
            </div>
            <p className="text-2xl font-bold mt-3">{metricsData.totalClinics.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Clínicas</p>
            <p className="text-xs text-muted-foreground mt-1">{metricsData.activeClinics.toLocaleString()} ativas</p>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-success/5 to-success/10 border-success/20 hover:shadow-lg transition-all">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-success/10">
                <DollarSign className="h-5 w-5 text-success" />
              </div>
              <Badge variant="outline" className="text-success text-xs">+{metricsData.growthRate}%</Badge>
            </div>
            <p className="text-2xl font-bold mt-3 text-success">R$ {(metricsData.mrr / 1000).toFixed(0)}k</p>
            <p className="text-xs text-muted-foreground">MRR</p>
            <p className="text-xs text-muted-foreground mt-1">ARR: R$ {(metricsData.arr / 1000000).toFixed(1)}M</p>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-info/5 to-info/10 border-info/20 hover:shadow-lg transition-all">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-info/10">
                <Users className="h-5 w-5 text-info" />
              </div>
              <Badge variant="outline" className="text-success text-xs">+12.4%</Badge>
            </div>
            <p className="text-2xl font-bold mt-3 text-info">{metricsData.totalUsers.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Usuários</p>
            <p className="text-xs text-muted-foreground mt-1">{metricsData.activeUsers.toLocaleString()} ativos</p>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-purple-500/5 to-purple-500/10 border-purple-500/20 hover:shadow-lg transition-all">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Target className="h-5 w-5 text-purple-600" />
              </div>
              <Badge variant="outline" className="text-purple-600 text-xs">LTV/CAC</Badge>
            </div>
            <p className="text-2xl font-bold mt-3 text-purple-600">{(metricsData.ltv / metricsData.cac).toFixed(1)}x</p>
            <p className="text-xs text-muted-foreground">LTV/CAC Ratio</p>
            <p className="text-xs text-muted-foreground mt-1">LTV: R${metricsData.ltv}</p>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20 hover:shadow-lg transition-all">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-warning/10">
                <TrendingDown className="h-5 w-5 text-warning" />
              </div>
              <Badge variant="outline" className="text-success text-xs">-0.5%</Badge>
            </div>
            <p className="text-2xl font-bold mt-3 text-warning">{metricsData.churnRate}%</p>
            <p className="text-xs text-muted-foreground">Churn Rate</p>
            <p className="text-xs text-muted-foreground mt-1">Meta: &lt;2%</p>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-cyan-500/5 to-cyan-500/10 border-cyan-500/20 hover:shadow-lg transition-all">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-cyan-500/10">
                <Heart className="h-5 w-5 text-cyan-600" />
              </div>
              <Badge variant="outline" className="text-cyan-600 text-xs">Excelente</Badge>
            </div>
            <p className="text-2xl font-bold mt-3 text-cyan-600">{metricsData.nps}</p>
            <p className="text-xs text-muted-foreground">NPS Score</p>
            <p className="text-xs text-muted-foreground mt-1">Benchmark: 50+</p>
          </div>
        </Card>
      </div>

      <div className="px-4 sm:px-6 pb-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4 sm:space-y-6">
          <ScrollArea className="w-full">
            <TabsList className="bg-muted/50 p-1 h-auto gap-1 w-max min-w-full sm:w-auto">
              <TabsTrigger value="overview" className="gap-2 text-xs sm:text-sm">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">Visão Geral</span>
              </TabsTrigger>
              <TabsTrigger value="clinics" className="gap-2 text-xs sm:text-sm">
                <Building2 className="h-4 w-4" />
                <span className="hidden sm:inline">Clínicas</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-2 text-xs sm:text-sm">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Usuários</span>
              </TabsTrigger>
              <TabsTrigger value="revenue" className="gap-2 text-xs sm:text-sm">
                <DollarSign className="h-4 w-4" />
                <span className="hidden sm:inline">Financeiro</span>
              </TabsTrigger>
              <TabsTrigger value="support" className="gap-2 text-xs sm:text-sm">
                <HeadphonesIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Suporte</span>
              </TabsTrigger>
              <TabsTrigger value="audit" className="gap-2 text-xs sm:text-sm">
                <History className="h-4 w-4" />
                <span className="hidden sm:inline">Auditoria</span>
              </TabsTrigger>
              <TabsTrigger value="features" className="gap-2 text-xs sm:text-sm">
                <Flag className="h-4 w-4" />
                <span className="hidden sm:inline">Features</span>
              </TabsTrigger>
              <TabsTrigger value="system" className="gap-2 text-xs sm:text-sm">
                <Server className="h-4 w-4" />
                <span className="hidden sm:inline">Sistema</span>
              </TabsTrigger>
            </TabsList>
          </ScrollArea>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Revenue Chart */}
              <Card className="lg:col-span-2 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Receita e Crescimento
                  </h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="gap-1"><div className="w-2 h-2 rounded-full bg-primary" />Receita</Badge>
                    <Badge variant="outline" className="gap-1"><div className="w-2 h-2 rounded-full bg-success" />Novos</Badge>
                    <Badge variant="outline" className="gap-1"><div className="w-2 h-2 rounded-full bg-destructive" />Churn</Badge>
                  </div>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${v/1000}k`} />
                      <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Area yAxisId="left" type="monotone" dataKey="receita" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorReceita)" strokeWidth={2} />
                      <Bar yAxisId="right" dataKey="novos" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} barSize={20} />
                      <Bar yAxisId="right" dataKey="churn" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} barSize={20} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Plan Distribution */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  Distribuição por Plano
                </h3>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={planDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {planDistribution.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-4">
                  {planDistribution.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">{item.value}</span>
                        <span className="text-muted-foreground text-xs ml-2">R${(item.revenue/1000).toFixed(0)}k</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Usage by Hour */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Uso por Horário
                </h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={usageByHour}>
                      <defs>
                        <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--info))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--info))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Area type="monotone" dataKey="users" stroke="hsl(var(--info))" fillOpacity={1} fill="url(#colorUsage)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Geographic Distribution */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Distribuição Geográfica
                </h3>
                <div className="space-y-3">
                  {geoData.slice(0, 6).map((item, index) => (
                    <div key={item.state} className="flex items-center gap-3">
                      <div className="w-8 text-center">
                        <Badge variant={index === 0 ? "default" : "outline"} className="text-xs">
                          {item.state}
                        </Badge>
                      </div>
                      <div className="flex-1">
                        <Progress value={(item.clinics / geoData[0].clinics) * 100} className="h-2" />
                      </div>
                      <span className="text-sm font-medium w-12 text-right">{item.clinics}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Ações Rápidas
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2 hover:bg-primary/5 hover:border-primary/30">
                    <Building2 className="h-5 w-5" />
                    <span className="text-xs">Nova Clínica</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2 hover:bg-primary/5 hover:border-primary/30">
                    <Users className="h-5 w-5" />
                    <span className="text-xs">Novo Usuário</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2 hover:bg-primary/5 hover:border-primary/30">
                    <Megaphone className="h-5 w-5" />
                    <span className="text-xs">Broadcast</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2 hover:bg-primary/5 hover:border-primary/30">
                    <Download className="h-5 w-5" />
                    <span className="text-xs">Relatório</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2 hover:bg-warning/5 hover:border-warning/30">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    <span className="text-xs">Alertas</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2 hover:bg-success/5 hover:border-success/30">
                    <Gift className="h-5 w-5 text-success" />
                    <span className="text-xs">Promoção</span>
                  </Button>
                </div>
              </Card>
            </div>

            {/* Cohort Analysis */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <LineChart className="h-5 w-5 text-primary" />
                Análise de Cohort - Retenção
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3">Cohort</th>
                      <th className="text-center py-2 px-3">Mês 0</th>
                      <th className="text-center py-2 px-3">Mês 1</th>
                      <th className="text-center py-2 px-3">Mês 2</th>
                      <th className="text-center py-2 px-3">Mês 3</th>
                      <th className="text-center py-2 px-3">Mês 4</th>
                      <th className="text-center py-2 px-3">Mês 5</th>
                      <th className="text-center py-2 px-3">Mês 6</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cohortData.map((row) => (
                      <tr key={row.cohort} className="border-b border-border/50 hover:bg-muted/30">
                        <td className="py-2 px-3 font-medium">{row.cohort}</td>
                        {[row.m0, row.m1, row.m2, row.m3, row.m4, row.m5, row.m6].map((val, idx) => (
                          <td key={idx} className="text-center py-2 px-3">
                            {val !== null ? (
                              <span 
                                className={cn(
                                  "inline-block px-2 py-1 rounded text-xs font-medium",
                                  val >= 90 ? "bg-success/20 text-success" :
                                  val >= 80 ? "bg-primary/20 text-primary" :
                                  val >= 70 ? "bg-warning/20 text-warning" :
                                  "bg-destructive/20 text-destructive"
                                )}
                              >
                                {val}%
                              </span>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Clinics Tab */}
          <TabsContent value="clinics" className="space-y-6">
            <Card className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar clínicas, proprietários, emails..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="active">Ativos</SelectItem>
                      <SelectItem value="trial">Trial</SelectItem>
                      <SelectItem value="suspended">Suspensos</SelectItem>
                      <SelectItem value="inactive">Inativos</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Plano" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="starter">Starter</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Mais Filtros
                  </Button>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Nova Clínica
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                {filteredClinics.map((clinic) => (
                  <div 
                    key={clinic.id} 
                    className="flex flex-col lg:flex-row lg:items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all border border-transparent hover:border-border/50"
                  >
                    <Avatar className="h-12 w-12 shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {clinic.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold">{clinic.name}</h4>
                        {getPlanBadge(clinic.plan)}
                        {getStatusBadge(clinic.status)}
                      </div>
                      <div className="flex items-center gap-3 flex-wrap text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <UserCog className="h-3 w-3" />
                          {clinic.owner}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {clinic.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {clinic.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <p className="font-semibold">{clinic.users}</p>
                        <p className="text-xs text-muted-foreground">Usuários</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold">{clinic.patients.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Pacientes</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold">{clinic.appointments.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Consultas</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-success">R$ {clinic.mrr}</p>
                        <p className="text-xs text-muted-foreground">/mês</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Ver detalhes</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Enviar mensagem</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-4 w-4" />
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Edit className="h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <ExternalLink className="h-4 w-4" />
                            Acessar como admin
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2">
                            <CreditCard className="h-4 w-4" />
                            Gerenciar plano
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <History className="h-4 w-4" />
                            Histórico
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {clinic.status === "suspended" ? (
                            <DropdownMenuItem className="gap-2 text-success">
                              <Unlock className="h-4 w-4" />
                              Reativar
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="gap-2 text-destructive">
                              <Ban className="h-4 w-4" />
                              Suspender
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t">
                <p className="text-sm text-muted-foreground">Mostrando {filteredClinics.length} de {clinics.length} clínicas</p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>Anterior</Button>
                  <Button variant="outline" size="sm">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <Button variant="outline" size="sm">Próximo</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="grid lg:grid-cols-4 gap-4 mb-6">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Usuários</p>
                    <p className="text-2xl font-bold">{metricsData.totalUsers.toLocaleString()}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/10">
                    <UserCheck className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Ativos</p>
                    <p className="text-2xl font-bold text-success">{metricsData.activeUsers.toLocaleString()}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-warning/10">
                    <UserMinus className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Inativos (+30d)</p>
                    <p className="text-2xl font-bold text-warning">1,245</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-destructive/10">
                    <UserX className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Suspensos</p>
                    <p className="text-2xl font-bold text-destructive">89</p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar usuários..."
                    className="pl-9"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Função" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="owner">Proprietário</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="doctor">Médico</SelectItem>
                      <SelectItem value="receptionist">Recepcionista</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                {systemUsers.map((user) => (
                  <div 
                    key={user.id} 
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-medium">{user.name}</h4>
                        <Badge variant="outline" className="text-xs capitalize">{user.role}</Badge>
                        {user.status === "active" ? (
                          <Badge className="bg-success/10 text-success border-success/20 text-xs">Ativo</Badge>
                        ) : (
                          <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-xs">Suspenso</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span>{user.email}</span>
                        <span className="flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          {user.clinic}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {user.lastLogin}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-4 w-4" />
                            Ver perfil
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <KeyRound className="h-4 w-4" />
                            Resetar senha
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <History className="h-4 w-4" />
                            Histórico
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Ban className="h-4 w-4" />
                            Suspender
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <div className="grid lg:grid-cols-4 gap-4 mb-6">
              <Card className="p-4 bg-gradient-to-br from-success/5 to-success/10 border-success/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/10">
                    <DollarSign className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">MRR</p>
                    <p className="text-2xl font-bold text-success">R$ {(metricsData.mrr / 1000).toFixed(0)}k</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">ARR</p>
                    <p className="text-2xl font-bold text-primary">R$ {(metricsData.arr / 1000000).toFixed(1)}M</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-info/5 to-info/10 border-info/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-info/10">
                    <Coins className="h-5 w-5 text-info" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">ARPU</p>
                    <p className="text-2xl font-bold text-info">R$ {metricsData.arpu}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-purple-500/5 to-purple-500/10 border-purple-500/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Target className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">LTV</p>
                    <p className="text-2xl font-bold text-purple-600">R$ {metricsData.ltv.toLocaleString()}</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Receita por Mês
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${v/1000}k`} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                        formatter={(value: number) => [`R$ ${value.toLocaleString()}`, 'Receita']}
                      />
                      <Bar dataKey="receita" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Receita por Plano
                </h3>
                <div className="space-y-4">
                  {planDistribution.map((plan) => (
                    <div key={plan.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: plan.color }} />
                          <span className="font-medium">{plan.name}</span>
                        </div>
                        <span className="font-semibold">R$ {plan.revenue.toLocaleString()}</span>
                      </div>
                      <Progress value={(plan.revenue / 218989) * 100} className="h-2" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{plan.value} clínicas</span>
                        <span>{((plan.revenue / metricsData.mrr) * 100).toFixed(1)}% do total</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Receipt className="h-5 w-5 text-primary" />
                Últimas Transações
              </h3>
              <div className="space-y-3">
                {[
                  { clinic: "Clínica MedSaúde", type: "Mensalidade", amount: 2890, status: "paid", date: "10/12/2024" },
                  { clinic: "Centro Médico Vida", type: "Upgrade para Business", amount: 1450, status: "paid", date: "09/12/2024" },
                  { clinic: "Instituto de Saúde", type: "Mensalidade", amount: 3890, status: "paid", date: "08/12/2024" },
                  { clinic: "Clínica Prime Care", type: "Mensalidade", amount: 450, status: "failed", date: "05/12/2024" },
                  { clinic: "Saúde Total", type: "Trial expirado", amount: 0, status: "expired", date: "04/12/2024" },
                ].map((tx, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {tx.clinic.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{tx.clinic}</p>
                        <p className="text-xs text-muted-foreground">{tx.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn("font-semibold", tx.status === "paid" ? "text-success" : "text-destructive")}>
                        {tx.amount > 0 ? `R$ ${tx.amount.toLocaleString()}` : "-"}
                      </p>
                      <Badge variant="outline" className={cn(
                        "text-xs",
                        tx.status === "paid" ? "text-success border-success/30" :
                        tx.status === "failed" ? "text-destructive border-destructive/30" :
                        "text-muted-foreground"
                      )}>
                        {tx.status === "paid" ? "Pago" : tx.status === "failed" ? "Falhou" : "Expirado"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support" className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-500/10">
                    <AlertOctagon className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Críticos</p>
                    <p className="text-2xl font-bold text-red-600">2</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-destructive/10">
                    <Ticket className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Abertos</p>
                    <p className="text-2xl font-bold text-destructive">8</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-warning/10">
                    <RefreshCw className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Em Andamento</p>
                    <p className="text-2xl font-bold text-warning">5</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/10">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Resolvidos Hoje</p>
                    <p className="text-2xl font-bold text-success">12</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-info/10">
                    <Timer className="h-5 w-5 text-info" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Tempo Médio</p>
                    <p className="text-2xl font-bold text-info">{metricsData.avgResponseTime}h</p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold flex items-center gap-2">
                  <HeadphonesIcon className="h-5 w-5 text-primary" />
                  Tickets de Suporte
                </h3>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="critical">Crítica</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="medium">Média</SelectItem>
                      <SelectItem value="low">Baixa</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Novo Ticket
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                {supportTickets.map((ticket) => (
                  <div 
                    key={ticket.id} 
                    className={cn(
                      "flex flex-col lg:flex-row lg:items-center gap-4 p-4 rounded-xl transition-all cursor-pointer border",
                      ticket.priority === "critical" ? "bg-red-500/5 border-red-500/20 hover:bg-red-500/10" : "bg-muted/30 border-transparent hover:bg-muted/50"
                    )}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-medium">{ticket.subject}</h4>
                        {getTicketPriority(ticket.priority)}
                        {getTicketStatus(ticket.status)}
                        <Badge variant="outline" className="text-xs">{ticket.category}</Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          {ticket.clinic}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {ticket.createdAt}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {ticket.messages} mensagens
                        </span>
                        {ticket.assignee && (
                          <span className="flex items-center gap-1">
                            <UserCog className="h-3 w-3" />
                            {ticket.assignee}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={cn(
                        "text-xs",
                        ticket.sla.includes("restantes") ? (
                          ticket.sla.includes("1h") || ticket.sla.includes("2h") ? "text-warning border-warning/30" : "text-muted-foreground"
                        ) : "text-success border-success/30"
                      )}>
                        <Clock className="h-3 w-3 mr-1" />
                        {ticket.sla}
                      </Badge>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Eye className="h-4 w-4" />
                        Ver
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Audit Tab */}
          <TabsContent value="audit" className="space-y-6">
            <Card className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h3 className="font-semibold flex items-center gap-2">
                  <History className="h-5 w-5 text-primary" />
                  Logs de Auditoria
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Buscar logs..." className="pl-9 w-[200px]" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Severidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="critical">Crítico</SelectItem>
                      <SelectItem value="error">Erro</SelectItem>
                      <SelectItem value="warning">Aviso</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                {auditLogs.map((log) => (
                  <div 
                    key={log.id} 
                    className={cn(
                      "flex flex-col lg:flex-row lg:items-center gap-3 p-3 rounded-lg border",
                      log.severity === "critical" ? "bg-red-500/5 border-red-500/20" :
                      log.severity === "error" ? "bg-destructive/5 border-destructive/20" :
                      log.severity === "warning" ? "bg-warning/5 border-warning/20" :
                      "bg-muted/20 border-transparent"
                    )}
                  >
                    <div className="flex items-center gap-2 shrink-0">
                      {getAuditSeverity(log.severity)}
                      <span className="text-xs text-muted-foreground font-mono">{log.timestamp}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="text-xs font-mono">{log.action}</Badge>
                        <span className="text-sm font-medium">{log.user}</span>
                        {log.clinic !== "-" && (
                          <span className="text-xs text-muted-foreground">• {log.clinic}</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{log.details}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant="outline" className="text-xs font-mono">
                        <Globe className="h-3 w-3 mr-1" />
                        {log.ip}
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center mt-6 pt-4 border-t">
                <Button variant="outline">Carregar mais logs</Button>
              </div>
            </Card>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Feature Flags */}
              <Card className="lg:col-span-2 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Flag className="h-5 w-5 text-primary" />
                    Feature Flags
                  </h3>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Nova Flag
                  </Button>
                </div>

                <div className="space-y-3">
                  {featureFlags.map((flag) => (
                    <div 
                      key={flag.id} 
                      className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all"
                    >
                      <Switch checked={flag.enabled} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-medium">{flag.label}</h4>
                          <Badge variant="outline" className="text-xs font-mono">{flag.name}</Badge>
                          <Badge className={cn(
                            "text-xs",
                            flag.environment === "production" ? "bg-success/10 text-success border-success/20" :
                            flag.environment === "beta" ? "bg-warning/10 text-warning border-warning/20" :
                            flag.environment === "staging" ? "bg-info/10 text-info border-info/20" :
                            "bg-muted text-muted-foreground"
                          )}>
                            {flag.environment}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{flag.description}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm font-medium">{flag.rollout}%</p>
                          <p className="text-xs text-muted-foreground">Rollout</p>
                        </div>
                        <Progress value={flag.rollout} className="w-20 h-2" />
                        <Button variant="ghost" size="icon">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Announcements */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Megaphone className="h-5 w-5 text-primary" />
                    Anúncios
                  </h3>
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Novo
                  </Button>
                </div>

                <div className="space-y-3">
                  {announcements.map((ann) => (
                    <div key={ann.id} className="p-3 rounded-lg bg-muted/30 border border-transparent hover:border-border/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={cn(
                          "text-xs",
                          ann.type === "maintenance" ? "bg-warning/10 text-warning border-warning/20" :
                          ann.type === "feature" ? "bg-success/10 text-success border-success/20" :
                          "bg-primary/10 text-primary border-primary/20"
                        )}>
                          {ann.type === "maintenance" ? "Manutenção" : 
                           ann.type === "feature" ? "Novidade" : "Promoção"}
                        </Badge>
                        <Badge variant="outline" className={cn(
                          "text-xs",
                          ann.status === "active" ? "text-success border-success/30" :
                          ann.status === "scheduled" ? "text-info border-info/30" :
                          "text-muted-foreground"
                        )}>
                          {ann.status === "active" ? "Ativo" : 
                           ann.status === "scheduled" ? "Agendado" : "Encerrado"}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-sm">{ann.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{ann.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">{ann.createdAt}</span>
                        <Button variant="ghost" size="sm" className="h-6 text-xs">
                          Editar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* System Status */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Server className="h-5 w-5 text-primary" />
                    Status dos Serviços
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-sm text-success font-medium">Sistema Operacional</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {systemStatus.map((service) => (
                    <div 
                      key={service.name} 
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-2.5 h-2.5 rounded-full",
                          service.status === "operational" ? "bg-success" : "bg-warning animate-pulse"
                        )} />
                        <span className="font-medium text-sm">{service.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-xs">{service.latency}</Badge>
                        <Badge variant="outline" className="text-xs">{service.uptime}</Badge>
                        <Badge className={cn(
                          "text-xs",
                          service.status === "operational" 
                            ? "bg-success/10 text-success border-success/20" 
                            : "bg-warning/10 text-warning border-warning/20"
                        )}>
                          {service.status === "operational" ? "Operacional" : "Degradado"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* System Metrics */}
              <Card className="p-6">
                <h3 className="font-semibold mb-6 flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-primary" />
                  Métricas de Infraestrutura
                </h3>
                <div className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-muted-foreground" />
                        <span>CPU</span>
                      </div>
                      <span className="font-medium text-success">42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4 text-muted-foreground" />
                        <span>Memória</span>
                      </div>
                      <span className="font-medium text-warning">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-muted-foreground" />
                        <span>Disco</span>
                      </div>
                      <span className="font-medium text-success">35%</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <div className="flex items-center gap-2">
                        <Wifi className="h-4 w-4 text-muted-foreground" />
                        <span>Bandwidth</span>
                      </div>
                      <span className="font-medium text-success">28%</span>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 rounded-lg bg-muted/30">
                      <p className="text-2xl font-bold text-primary">{metricsData.uptime}%</p>
                      <p className="text-xs text-muted-foreground">Uptime (30d)</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/30">
                      <p className="text-2xl font-bold text-info">{(metricsData.apiCalls / 1000000).toFixed(1)}M</p>
                      <p className="text-xs text-muted-foreground">API Calls (24h)</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-primary" />
                  Ações do Sistema
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <RefreshCw className="h-5 w-5" />
                  <span className="text-xs">Limpar Cache</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <Database className="h-5 w-5" />
                  <span className="text-xs">Backup Manual</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <RotateCcw className="h-5 w-5" />
                  <span className="text-xs">Reiniciar Serviços</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <Bug className="h-5 w-5" />
                  <span className="text-xs">Debug Mode</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <Mail className="h-5 w-5" />
                  <span className="text-xs">Testar Email</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <span className="text-xs">Testar SMS</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <Webhook className="h-5 w-5" />
                  <span className="text-xs">Webhooks</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2 text-destructive hover:bg-destructive/5">
                  <Power className="h-5 w-5" />
                  <span className="text-xs">Modo Manutenção</span>
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
