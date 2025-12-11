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
import { ClinicDetailModal } from "@/components/superadmin/ClinicDetailModal";
import { UserDetailModal } from "@/components/superadmin/UserDetailModal";
import { TicketDetailModal } from "@/components/superadmin/TicketDetailModal";
import { BroadcastModal } from "@/components/superadmin/BroadcastModal";
import { NewClinicModal } from "@/components/superadmin/NewClinicModal";
import { ClinicPlanModal } from "@/components/superadmin/ClinicPlanModal";
import { ClinicHistoryModal } from "@/components/superadmin/ClinicHistoryModal";
import { ClinicEditModal } from "@/components/superadmin/ClinicEditModal";
import { SuspendClinicModal } from "@/components/superadmin/SuspendClinicModal";
import { UserHistoryModal } from "@/components/superadmin/UserHistoryModal";
import { ResetPasswordModal } from "@/components/superadmin/ResetPasswordModal";
import { NewTicketModal } from "@/components/superadmin/NewTicketModal";
import { AuditDetailModal } from "@/components/superadmin/AuditDetailModal";
import { FeatureFlagModal } from "@/components/superadmin/FeatureFlagModal";
import { AnnouncementModal } from "@/components/superadmin/AnnouncementModal";
import { ContactChurnModal } from "@/components/superadmin/ContactChurnModal";
import { AlertsConfigModal } from "@/components/superadmin/AlertsConfigModal";
import { ReportsModal } from "@/components/superadmin/ReportsModal";
import { SecurityConfigModal } from "@/components/superadmin/SecurityConfigModal";
import { FunnelDrilldownModal } from "@/components/superadmin/FunnelDrilldownModal";
import { LeadSearchModal } from "@/components/superadmin/LeadSearchModal";
import { NewLeadModal } from "@/components/superadmin/NewLeadModal";
import { ContactJourneyModal } from "@/components/superadmin/ContactJourneyModal";
import { CarouselSlidesModal } from "@/components/superadmin/CarouselSlidesModal";
// New modals - Insights
import { FeatureUsageModal } from "@/components/superadmin/FeatureUsageModal";
import { ErrorTrackingModal } from "@/components/superadmin/ErrorTrackingModal";
import { RevenueProjectionModal } from "@/components/superadmin/RevenueProjectionModal";
import { CustomerJourneyModal } from "@/components/superadmin/CustomerJourneyModal";
// New modals - Support
import { LiveChatModal } from "@/components/superadmin/LiveChatModal";
import { KnowledgeBaseModal } from "@/components/superadmin/KnowledgeBaseModal";
import { SLAMonitoringModal } from "@/components/superadmin/SLAMonitoringModal";
import { SatisfactionSurveyModal } from "@/components/superadmin/SatisfactionSurveyModal";
// New modals - Operations
import { MaintenanceModeModal } from "@/components/superadmin/MaintenanceModeModal";
import { BulkOperationsModal } from "@/components/superadmin/BulkOperationsModal";
import { RefundsCreditsModal } from "@/components/superadmin/RefundsCreditsModal";
import { CustomPricingModal } from "@/components/superadmin/CustomPricingModal";
// New modals - Security
import { SuspiciousActivityModal } from "@/components/superadmin/SuspiciousActivityModal";
import { IPBlockingModal } from "@/components/superadmin/IPBlockingModal";
import { RateLimitingModal } from "@/components/superadmin/RateLimitingModal";
import { SecurityIncidentsModal } from "@/components/superadmin/SecurityIncidentsModal";
import { ActiveSessionsModal } from "@/components/superadmin/ActiveSessionsModal";
// New modals - Communications
import { EmailMarketingModal } from "@/components/superadmin/EmailMarketingModal";
import { PushNotificationsModal } from "@/components/superadmin/PushNotificationsModal";
import { SMSGatewayModal } from "@/components/superadmin/SMSGatewayModal";
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
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Tooltip, PieChart as RechartsPieChart, Pie, Cell, LineChart as RechartsLineChart, Line, Legend, ComposedChart, Scatter, ScatterChart, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Treemap, FunnelChart, Funnel, LabelList } from "recharts";
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

// Heatmap data - Usage by day and hour
const heatmapData = [
  { day: "Seg", h6: 12, h8: 45, h10: 89, h12: 67, h14: 92, h16: 78, h18: 45, h20: 23 },
  { day: "Ter", h6: 15, h8: 52, h10: 95, h12: 72, h14: 98, h16: 85, h18: 52, h20: 28 },
  { day: "Qua", h6: 18, h8: 58, h10: 102, h12: 78, h14: 105, h16: 92, h18: 58, h20: 32 },
  { day: "Qui", h6: 14, h8: 48, h10: 88, h12: 65, h14: 95, h16: 82, h18: 48, h20: 25 },
  { day: "Sex", h6: 22, h8: 62, h10: 110, h12: 85, h14: 115, h16: 98, h18: 62, h20: 35 },
  { day: "Sáb", h6: 8, h8: 25, h10: 45, h12: 38, h14: 42, h16: 35, h18: 22, h20: 12 },
  { day: "Dom", h6: 5, h8: 12, h10: 22, h12: 18, h14: 20, h16: 15, h18: 10, h20: 8 },
];

// Conversion funnel data
const funnelData = [
  { stage: "Visitantes", value: 10000, color: "hsl(var(--primary))" },
  { stage: "Cadastros Iniciados", value: 4500, color: "hsl(var(--info))" },
  { stage: "Cadastros Completos", value: 2800, color: "hsl(142, 76%, 36%)" },
  { stage: "Trial Ativado", value: 2100, color: "hsl(var(--warning))" },
  { stage: "Primeira Consulta", value: 1400, color: "hsl(280, 76%, 50%)" },
  { stage: "Conversão Paga", value: 980, color: "hsl(var(--success))" },
];

// Feature usage radar data
const featureUsageData = [
  { feature: "Agendamento", usage: 95 },
  { feature: "Prontuário", usage: 88 },
  { feature: "Financeiro", usage: 72 },
  { feature: "Relatórios", usage: 65 },
  { feature: "Telemedicina", usage: 45 },
  { feature: "WhatsApp", usage: 78 },
  { feature: "Receitas", usage: 82 },
  { feature: "Estoque", usage: 38 },
];

export default function SuperAdmin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClinic, setSelectedClinic] = useState<typeof clinics[0] | null>(null);
  const [selectedUser, setSelectedUser] = useState<typeof systemUsers[0] | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<typeof supportTickets[0] | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [selectedTab, setSelectedTab] = useState("overview");
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [showClinicModal, setShowClinicModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showNewClinicModal, setShowNewClinicModal] = useState(false);
  const [showClinicPlanModal, setShowClinicPlanModal] = useState(false);
  const [showClinicHistoryModal, setShowClinicHistoryModal] = useState(false);
  const [showClinicEditModal, setShowClinicEditModal] = useState(false);
  const [showSuspendClinicModal, setShowSuspendClinicModal] = useState(false);
  const [showUserHistoryModal, setShowUserHistoryModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [showAuditDetailModal, setShowAuditDetailModal] = useState(false);
  const [showFeatureFlagModal, setShowFeatureFlagModal] = useState(false);
  const [featureFlagMode, setFeatureFlagMode] = useState<"create" | "edit">("create");
  const [selectedFeatureFlag, setSelectedFeatureFlag] = useState<typeof featureFlags[0] | null>(null);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [announcementMode, setAnnouncementMode] = useState<"create" | "edit">("create");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<typeof announcements[0] | null>(null);
  const [showContactChurnModal, setShowContactChurnModal] = useState(false);
  const [selectedChurnClinic, setSelectedChurnClinic] = useState<{ name: string; score: number; mrr: number } | null>(null);
  const [selectedAuditLog, setSelectedAuditLog] = useState<typeof auditLogs[0] | null>(null);
  const [showAlertsConfigModal, setShowAlertsConfigModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [showSecurityConfigModal, setShowSecurityConfigModal] = useState(false);
  const [showFunnelDrilldown, setShowFunnelDrilldown] = useState(false);
  const [selectedFunnelStage, setSelectedFunnelStage] = useState<{ name: string; count: number; color: string } | null>(null);
  const [showLeadSearch, setShowLeadSearch] = useState(false);
  const [showNewLead, setShowNewLead] = useState(false);
  const [showContactJourney, setShowContactJourney] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [showCarouselSlides, setShowCarouselSlides] = useState(false);
  // New modal states - Insights
  const [showFeatureUsage, setShowFeatureUsage] = useState(false);
  const [showErrorTracking, setShowErrorTracking] = useState(false);
  const [showRevenueProjection, setShowRevenueProjection] = useState(false);
  const [showCustomerJourney, setShowCustomerJourney] = useState(false);
  // New modal states - Support
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [showKnowledgeBase, setShowKnowledgeBase] = useState(false);
  const [showSLAMonitoring, setShowSLAMonitoring] = useState(false);
  const [showSatisfactionSurvey, setShowSatisfactionSurvey] = useState(false);
  // New modal states - Operations
  const [showMaintenanceMode, setShowMaintenanceMode] = useState(false);
  const [showBulkOperations, setShowBulkOperations] = useState(false);
  const [showRefundsCredits, setShowRefundsCredits] = useState(false);
  const [showCustomPricing, setShowCustomPricing] = useState(false);
  // New modal states - Security
  const [showSuspiciousActivity, setShowSuspiciousActivity] = useState(false);
  const [showIPBlocking, setShowIPBlocking] = useState(false);
  const [showRateLimiting, setShowRateLimiting] = useState(false);
  const [showSecurityIncidents, setShowSecurityIncidents] = useState(false);
  const [showActiveSessions, setShowActiveSessions] = useState(false);
  // New modal states - Communications
  const [showEmailMarketing, setShowEmailMarketing] = useState(false);
  const [showPushNotifications, setShowPushNotifications] = useState(false);
  const [showSMSGateway, setShowSMSGateway] = useState(false);

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
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[100px] sm:w-[130px] h-8 sm:h-9 text-xs sm:text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 dias</SelectItem>
              <SelectItem value="30d">30 dias</SelectItem>
              <SelectItem value="90d">90 dias</SelectItem>
              <SelectItem value="1y">1 ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-1.5 h-8 sm:h-9 px-2 sm:px-3">
            <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline text-xs sm:text-sm">Exportar</span>
          </Button>
          <Button size="sm" className="gap-1.5 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 h-8 sm:h-9 px-2 sm:px-3">
            <Settings className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline text-xs sm:text-sm">Config</span>
          </Button>
        </div>
      </PageHeader>

      {/* Live Stats Bar */}
      <div className="px-3 sm:px-4 md:px-6 mb-3 sm:mb-4">
        <Card className="p-2.5 sm:p-3 bg-gradient-to-r from-primary/5 via-transparent to-success/5 border-primary/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-6 flex-wrap text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-success animate-pulse" />
                <span className="font-medium">{metricsData.activeUsers.toLocaleString()} online</span>
              </div>
              <Separator orientation="vertical" className="h-3 sm:h-4 hidden sm:block" />
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-warning" />
                <span className="hidden sm:inline">{metricsData.apiCalls.toLocaleString()} API/24h</span>
                <span className="sm:hidden">{(metricsData.apiCalls / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Activity className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-info" />
                <span>{metricsData.uptime}%</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="gap-1.5 text-[10px] sm:text-xs h-7 self-start sm:self-center">
              <RefreshCw className="h-3 w-3" />
              <span className="hidden sm:inline">Atualizado há 30s</span>
            </Button>
          </div>
        </Card>
      </div>

      {/* Main Metrics */}
      <div className="px-3 sm:px-4 md:px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
        <Card className="p-2.5 sm:p-3 md:p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:shadow-lg transition-all">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10">
                <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <Badge variant="outline" className="text-success text-[10px] sm:text-xs h-5">+8.2%</Badge>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-bold mt-2 sm:mt-3">{metricsData.totalClinics.toLocaleString()}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">Total Clínicas</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">{metricsData.activeClinics.toLocaleString()} ativas</p>
          </div>
        </Card>
        
        <Card className="p-2.5 sm:p-3 md:p-4 bg-gradient-to-br from-success/5 to-success/10 border-success/20 hover:shadow-lg transition-all">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="p-1.5 sm:p-2 rounded-lg bg-success/10">
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-success" />
              </div>
              <Badge variant="outline" className="text-success text-[10px] sm:text-xs h-5">+{metricsData.growthRate}%</Badge>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-bold mt-2 sm:mt-3 text-success">R$ {(metricsData.mrr / 1000).toFixed(0)}k</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">MRR</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">ARR: R$ {(metricsData.arr / 1000000).toFixed(1)}M</p>
          </div>
        </Card>
        
        <Card className="p-2.5 sm:p-3 md:p-4 bg-gradient-to-br from-info/5 to-info/10 border-info/20 hover:shadow-lg transition-all">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="p-1.5 sm:p-2 rounded-lg bg-info/10">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-info" />
              </div>
              <Badge variant="outline" className="text-success text-[10px] sm:text-xs h-5">+12.4%</Badge>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-bold mt-2 sm:mt-3 text-info">{metricsData.totalUsers.toLocaleString()}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">Total Usuários</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">{metricsData.activeUsers.toLocaleString()} ativos</p>
          </div>
        </Card>
        
        <Card className="p-2.5 sm:p-3 md:p-4 bg-gradient-to-br from-purple-500/5 to-purple-500/10 border-purple-500/20 hover:shadow-lg transition-all">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="p-1.5 sm:p-2 rounded-lg bg-purple-500/10">
                <Target className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
              </div>
              <Badge variant="outline" className="text-purple-600 text-[10px] sm:text-xs h-5">LTV/CAC</Badge>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-bold mt-2 sm:mt-3 text-purple-600">{(metricsData.ltv / metricsData.cac).toFixed(1)}x</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">LTV/CAC</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">LTV: R${metricsData.ltv}</p>
          </div>
        </Card>
        
        <Card className="p-2.5 sm:p-3 md:p-4 bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20 hover:shadow-lg transition-all">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="p-1.5 sm:p-2 rounded-lg bg-warning/10">
                <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 text-warning" />
              </div>
              <Badge variant="outline" className="text-success text-[10px] sm:text-xs h-5">-0.5%</Badge>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-bold mt-2 sm:mt-3 text-warning">{metricsData.churnRate}%</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">Churn Rate</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">Meta: &lt;2%</p>
          </div>
        </Card>
        
        <Card className="p-2.5 sm:p-3 md:p-4 bg-gradient-to-br from-cyan-500/5 to-cyan-500/10 border-cyan-500/20 hover:shadow-lg transition-all">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="p-1.5 sm:p-2 rounded-lg bg-cyan-500/10">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-600" />
              </div>
              <Badge variant="outline" className="text-cyan-600 text-[10px] sm:text-xs h-5">Excelente</Badge>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-bold mt-2 sm:mt-3 text-cyan-600">{metricsData.nps}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">NPS Score</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">Benchmark: 50+</p>
          </div>
        </Card>
      </div>

      <div className="px-3 sm:px-4 md:px-6 pb-4 sm:pb-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-3 sm:space-y-4 md:space-y-6">
          <ScrollArea className="w-full">
            <TabsList className="bg-muted/50 p-1 h-auto gap-0.5 sm:gap-1 w-max min-w-full">
              <TabsTrigger value="overview" className="gap-1 sm:gap-2 text-[10px] sm:text-xs md:text-sm px-2 sm:px-3">
                <LayoutDashboard className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden md:inline">Visão Geral</span>
              </TabsTrigger>
              <TabsTrigger value="clinics" className="gap-1 sm:gap-2 text-[10px] sm:text-xs md:text-sm px-2 sm:px-3">
                <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden md:inline">Clínicas</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-1 sm:gap-2 text-[10px] sm:text-xs md:text-sm px-2 sm:px-3">
                <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden md:inline">Usuários</span>
              </TabsTrigger>
              <TabsTrigger value="revenue" className="gap-1 sm:gap-2 text-[10px] sm:text-xs md:text-sm px-2 sm:px-3">
                <DollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden md:inline">Financeiro</span>
              </TabsTrigger>
              <TabsTrigger value="support" className="gap-1 sm:gap-2 text-[10px] sm:text-xs md:text-sm px-2 sm:px-3">
                <HeadphonesIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden md:inline">Suporte</span>
              </TabsTrigger>
              <TabsTrigger value="audit" className="gap-1 sm:gap-2 text-[10px] sm:text-xs md:text-sm px-2 sm:px-3">
                <History className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden md:inline">Auditoria</span>
              </TabsTrigger>
              <TabsTrigger value="features" className="gap-1 sm:gap-2 text-[10px] sm:text-xs md:text-sm px-2 sm:px-3">
                <Flag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden md:inline">Features</span>
              </TabsTrigger>
              <TabsTrigger value="system" className="gap-1 sm:gap-2 text-[10px] sm:text-xs md:text-sm px-2 sm:px-3">
                <Server className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden md:inline">Sistema</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-1 sm:gap-2 text-[10px] sm:text-xs md:text-sm px-2 sm:px-3">
                <BarChart3 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden md:inline">Analytics</span>
              </TabsTrigger>
            </TabsList>
          </ScrollArea>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            {/* Advanced Analytics Section */}
            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Usage Heatmap */}
              <Card className="p-3 sm:p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2">
                  <h3 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
                    <LayoutGrid className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    <span className="truncate">Mapa de Calor - Uso</span>
                  </h3>
                  <Badge variant="outline" className="text-[10px] sm:text-xs self-start sm:self-center">Última semana</Badge>
                </div>
                <div className="overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0">
                  <table className="w-full text-[10px] sm:text-xs min-w-[400px]">
                    <thead>
                      <tr>
                        <th className="text-left py-1.5 sm:py-2 px-0.5 sm:px-1 font-medium text-muted-foreground">Dia</th>
                        <th className="text-center py-1.5 sm:py-2 px-0.5 sm:px-1 font-medium text-muted-foreground">06h</th>
                        <th className="text-center py-1.5 sm:py-2 px-0.5 sm:px-1 font-medium text-muted-foreground">08h</th>
                        <th className="text-center py-1.5 sm:py-2 px-0.5 sm:px-1 font-medium text-muted-foreground">10h</th>
                        <th className="text-center py-1.5 sm:py-2 px-0.5 sm:px-1 font-medium text-muted-foreground">12h</th>
                        <th className="text-center py-1.5 sm:py-2 px-0.5 sm:px-1 font-medium text-muted-foreground">14h</th>
                        <th className="text-center py-1.5 sm:py-2 px-0.5 sm:px-1 font-medium text-muted-foreground">16h</th>
                        <th className="text-center py-1.5 sm:py-2 px-0.5 sm:px-1 font-medium text-muted-foreground">18h</th>
                        <th className="text-center py-1.5 sm:py-2 px-0.5 sm:px-1 font-medium text-muted-foreground">20h</th>
                      </tr>
                    </thead>
                    <tbody>
                      {heatmapData.map((row) => (
                        <tr key={row.day}>
                          <td className="py-0.5 sm:py-1 px-0.5 sm:px-1 font-medium text-[10px] sm:text-xs">{row.day}</td>
                          {[row.h6, row.h8, row.h10, row.h12, row.h14, row.h16, row.h18, row.h20].map((val, idx) => {
                            const intensity = Math.min(val / 120, 1);
                            return (
                              <td key={idx} className="py-0.5 sm:py-1 px-0.5 sm:px-1">
                                <div 
                                  className="w-full h-6 sm:h-8 rounded flex items-center justify-center text-[10px] sm:text-xs font-medium transition-all hover:scale-105"
                                  style={{ 
                                    backgroundColor: `hsl(var(--primary) / ${0.1 + intensity * 0.7})`,
                                    color: intensity > 0.5 ? 'white' : 'hsl(var(--foreground))'
                                  }}
                                >
                                  {val}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center justify-center gap-3 sm:gap-4 mt-3 sm:mt-4">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-primary/10" />
                    <span>Baixo</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-primary/40" />
                    <span>Médio</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-primary/80" />
                    <span>Alto</span>
                  </div>
                </div>
              </Card>

              {/* Conversion Funnel */}
              <Card className="p-3 sm:p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2">
                  <h3 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
                    <Target className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    Funil de Conversão
                  </h3>
                  <Badge variant="outline" className="text-[10px] sm:text-xs gap-1 self-start sm:self-center">
                    <TrendingUp className="h-3 w-3 text-success" />
                    9.8% taxa
                  </Badge>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {funnelData.map((item, idx) => {
                    const widthPercent = (item.value / funnelData[0].value) * 100;
                    const conversionRate = idx > 0 
                      ? ((item.value / funnelData[idx - 1].value) * 100).toFixed(1) 
                      : "100";
                    return (
                      <div key={item.stage} className="relative">
                        <div className="flex items-center justify-between text-xs sm:text-sm mb-0.5 sm:mb-1 gap-2">
                          <span className="font-medium truncate">{item.stage}</span>
                          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                            <span className="text-muted-foreground text-[10px] sm:text-xs">{item.value.toLocaleString()}</span>
                            {idx > 0 && (
                              <Badge variant="outline" className="text-[10px] sm:text-xs h-4 sm:h-5">
                                {conversionRate}%
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="h-6 sm:h-8 bg-muted/30 rounded-lg overflow-hidden">
                          <div 
                            className="h-full rounded-lg transition-all duration-500 flex items-center justify-end pr-1.5 sm:pr-2"
                            style={{ 
                              width: `${widthPercent}%`,
                              background: `linear-gradient(90deg, ${item.color}80, ${item.color})`
                            }}
                          >
                            {widthPercent > 30 && (
                              <span className="text-[10px] sm:text-xs font-medium text-white">
                                {widthPercent.toFixed(0)}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Separator className="my-3 sm:my-4" />
                <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                  <div>
                    <p className="text-sm sm:text-lg font-bold text-success">9.8%</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Taxa</p>
                  </div>
                  <div>
                    <p className="text-sm sm:text-lg font-bold text-primary">R$ 125</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">CAC</p>
                  </div>
                  <div>
                    <p className="text-sm sm:text-lg font-bold text-info">12 dias</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Tempo</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Feature Usage Radar + Actions */}
            <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
              <Card className="p-3 sm:p-4 md:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
                    <Layers className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    <span className="truncate">Uso Funcionalidades</span>
                  </h3>
                </div>
                <div className="h-[200px] sm:h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={featureUsageData}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis 
                        dataKey="feature" 
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 9 }}
                      />
                      <PolarRadiusAxis 
                        angle={30} 
                        domain={[0, 100]}
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 8 }}
                      />
                      <Radar
                        name="Uso"
                        dataKey="usage"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="lg:col-span-2 p-3 sm:p-4 md:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
                    <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    Ações Rápidas
                  </h3>
                </div>
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2 md:gap-3 mb-4">
                  <Button 
                    variant="outline" 
                    className="h-auto py-2.5 sm:py-3 md:py-4 flex-col gap-1 sm:gap-2 hover:bg-primary/5 hover:border-primary/30 text-[10px] sm:text-xs"
                    onClick={() => setShowBroadcastModal(true)}
                  >
                    <Megaphone className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    <span className="hidden sm:inline">Broadcast</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto py-2.5 sm:py-3 md:py-4 flex-col gap-1 sm:gap-2 hover:bg-success/5 hover:border-success/30 text-[10px] sm:text-xs"
                    onClick={() => setShowNewClinicModal(true)}
                  >
                    <UserPlus className="h-4 w-4 sm:h-5 sm:w-5 text-success" />
                    <span className="hidden sm:inline">Nova Clínica</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto py-2.5 sm:py-3 md:py-4 flex-col gap-1 sm:gap-2 hover:bg-info/5 hover:border-info/30 text-[10px] sm:text-xs"
                    onClick={() => setShowNewTicketModal(true)}
                  >
                    <Ticket className="h-4 w-4 sm:h-5 sm:w-5 text-info" />
                    <span className="hidden sm:inline">Novo Ticket</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto py-2.5 sm:py-3 md:py-4 flex-col gap-1 sm:gap-2 hover:bg-warning/5 hover:border-warning/30 text-[10px] sm:text-xs"
                    onClick={() => setShowAlertsConfigModal(true)}
                  >
                    <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-warning" />
                    <span className="hidden sm:inline">Alertas</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto py-2.5 sm:py-3 md:py-4 flex-col gap-1 sm:gap-2 hover:bg-purple-500/5 hover:border-purple-500/30 text-[10px] sm:text-xs"
                    onClick={() => {
                      setFeatureFlagMode("create");
                      setSelectedFeatureFlag(null);
                      setShowFeatureFlagModal(true);
                    }}
                  >
                    <Flag className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
                    <span className="hidden sm:inline">Nova Flag</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto py-2.5 sm:py-3 md:py-4 flex-col gap-1 sm:gap-2 hover:bg-cyan-500/5 hover:border-cyan-500/30 text-[10px] sm:text-xs"
                    onClick={() => setShowReportsModal(true)}
                  >
                    <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-500" />
                    <span className="hidden sm:inline">Relatórios</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto py-2.5 sm:py-3 md:py-4 flex-col gap-1 sm:gap-2 hover:bg-orange-500/5 hover:border-orange-500/30 text-[10px] sm:text-xs"
                    onClick={() => setSelectedTab("system")}
                  >
                    <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                    <span className="hidden sm:inline">Sistema</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto py-2.5 sm:py-3 md:py-4 flex-col gap-1 sm:gap-2 hover:bg-destructive/5 hover:border-destructive/30 text-[10px] sm:text-xs"
                    onClick={() => setShowSecurityConfigModal(true)}
                  >
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-destructive" />
                    <span className="hidden sm:inline">Segurança</span>
                  </Button>
                </div>

                {/* Category Cards Grid */}
                <div className="space-y-3">
                  {/* Insights Category */}
                  <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500/5 to-indigo-500/5 border border-blue-500/20">
                    <h4 className="text-xs font-semibold text-blue-600 mb-2 flex items-center gap-1.5">
                      <BarChart3 className="h-3.5 w-3.5" />
                      Insights & Analytics
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <Button variant="ghost" size="sm" className="h-auto py-2 justify-start gap-2 text-xs hover:bg-blue-500/10" onClick={() => setShowFeatureUsage(true)}>
                        <Layers className="h-3.5 w-3.5 text-blue-500" />
                        Uso de Features
                      </Button>
                      <Button variant="ghost" size="sm" className="h-auto py-2 justify-start gap-2 text-xs hover:bg-blue-500/10" onClick={() => setShowErrorTracking(true)}>
                        <Bug className="h-3.5 w-3.5 text-red-500" />
                        Tracking de Erros
                      </Button>
                      <Button variant="ghost" size="sm" className="h-auto py-2 justify-start gap-2 text-xs hover:bg-blue-500/10" onClick={() => setShowRevenueProjection(true)}>
                        <TrendingUp className="h-3.5 w-3.5 text-success" />
                        Projeções Receita
                      </Button>
                      <Button variant="ghost" size="sm" className="h-auto py-2 justify-start gap-2 text-xs hover:bg-blue-500/10" onClick={() => setShowCustomerJourney(true)}>
                        <Target className="h-3.5 w-3.5 text-purple-500" />
                        Jornada Cliente
                      </Button>
                    </div>
                  </div>

                  {/* Support Category */}
                  <div className="p-3 rounded-lg bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border border-emerald-500/20">
                    <h4 className="text-xs font-semibold text-emerald-600 mb-2 flex items-center gap-1.5">
                      <HeadphonesIcon className="h-3.5 w-3.5" />
                      Suporte & Atendimento
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <Button variant="ghost" size="sm" className="h-auto py-2 justify-start gap-2 text-xs hover:bg-emerald-500/10" onClick={() => setShowLiveChat(true)}>
                        <MessageCircle className="h-3.5 w-3.5 text-emerald-500" />
                        Chat ao Vivo
                      </Button>
                      <Button variant="ghost" size="sm" className="h-auto py-2 justify-start gap-2 text-xs hover:bg-emerald-500/10" onClick={() => setShowKnowledgeBase(true)}>
                        <BookOpen className="h-3.5 w-3.5 text-teal-500" />
                        Base de Conhecimento
                      </Button>
                      <Button variant="ghost" size="sm" className="h-auto py-2 justify-start gap-2 text-xs hover:bg-emerald-500/10" onClick={() => setShowSLAMonitoring(true)}>
                        <Timer className="h-3.5 w-3.5 text-warning" />
                        Monitoramento SLA
                      </Button>
                      <Button variant="ghost" size="sm" className="h-auto py-2 justify-start gap-2 text-xs hover:bg-emerald-500/10" onClick={() => setShowSatisfactionSurvey(true)}>
                        <ThumbsUp className="h-3.5 w-3.5 text-info" />
                        Pesquisa Satisfação
                      </Button>
                    </div>
                  </div>

                  {/* Operations Category */}
                  <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500/5 to-amber-500/5 border border-orange-500/20">
                    <h4 className="text-xs font-semibold text-orange-600 mb-2 flex items-center gap-1.5">
                      <Settings className="h-3.5 w-3.5" />
                      Operações
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <Button variant="ghost" size="sm" className="h-auto py-2 justify-start gap-2 text-xs hover:bg-orange-500/10" onClick={() => setShowMaintenanceMode(true)}>
                        <Construction className="h-3.5 w-3.5 text-orange-500" />
                        Modo Manutenção
                      </Button>
                      <Button variant="ghost" size="sm" className="h-auto py-2 justify-start gap-2 text-xs hover:bg-orange-500/10" onClick={() => setShowBulkOperations(true)}>
                        <ListChecks className="h-3.5 w-3.5 text-amber-500" />
                        Operações em Massa
                      </Button>
                      <Button variant="ghost" size="sm" className="h-auto py-2 justify-start gap-2 text-xs hover:bg-orange-500/10" onClick={() => setShowRefundsCredits(true)}>
                        <Coins className="h-3.5 w-3.5 text-yellow-500" />
                        Reembolsos/Créditos
                      </Button>
                      <Button variant="ghost" size="sm" className="h-auto py-2 justify-start gap-2 text-xs hover:bg-orange-500/10" onClick={() => setShowCustomPricing(true)}>
                        <BadgePercent className="h-3.5 w-3.5 text-success" />
                        Preços Customizados
                      </Button>
                    </div>
                  </div>

                  {/* Security Category */}
                  <div className="p-3 rounded-lg bg-gradient-to-r from-red-500/5 to-rose-500/5 border border-red-500/20">
                    <h4 className="text-xs font-semibold text-red-600 mb-2 flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Segurança
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      <Button variant="ghost" size="sm" className="h-auto py-2 justify-start gap-2 text-xs hover:bg-red-500/10" onClick={() => setShowSuspiciousActivity(true)}>
                        <ShieldAlert className="h-3.5 w-3.5 text-red-500" />
                        Atividades Suspeitas
                      </Button>
                      <Button variant="ghost" size="sm" className="h-auto py-2 justify-start gap-2 text-xs hover:bg-red-500/10" onClick={() => setShowIPBlocking(true)}>
                        <Ban className="h-3.5 w-3.5 text-destructive" />
                        Bloqueio de IPs
                      </Button>
                      <Button variant="ghost" size="sm" className="h-auto py-2 justify-start gap-2 text-xs hover:bg-red-500/10" onClick={() => setShowRateLimiting(true)}>
                        <Gauge className="h-3.5 w-3.5 text-warning" />
                        Rate Limiting
                      </Button>
                      <Button variant="ghost" size="sm" className="h-auto py-2 justify-start gap-2 text-xs hover:bg-red-500/10" onClick={() => setShowSecurityIncidents(true)}>
                        <AlertOctagon className="h-3.5 w-3.5 text-orange-500" />
                        Incidentes
                      </Button>
                      <Button variant="ghost" size="sm" className="h-auto py-2 justify-start gap-2 text-xs hover:bg-red-500/10" onClick={() => setShowActiveSessions(true)}>
                        <Monitor className="h-3.5 w-3.5 text-info" />
                        Sessões Ativas
                      </Button>
                    </div>
                  </div>

                  {/* Communications Category */}
                  <div className="p-3 rounded-lg bg-gradient-to-r from-violet-500/5 to-purple-500/5 border border-violet-500/20">
                    <h4 className="text-xs font-semibold text-violet-600 mb-2 flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5" />
                      Comunicações
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      <Button variant="ghost" size="sm" className="h-auto py-2 justify-start gap-2 text-xs hover:bg-violet-500/10" onClick={() => setShowEmailMarketing(true)}>
                        <Mail className="h-3.5 w-3.5 text-violet-500" />
                        Email Marketing
                      </Button>
                      <Button variant="ghost" size="sm" className="h-auto py-2 justify-start gap-2 text-xs hover:bg-violet-500/10" onClick={() => setShowPushNotifications(true)}>
                        <Bell className="h-3.5 w-3.5 text-purple-500" />
                        Push Notifications
                      </Button>
                      <Button variant="ghost" size="sm" className="h-auto py-2 justify-start gap-2 text-xs hover:bg-violet-500/10" onClick={() => setShowSMSGateway(true)}>
                        <Smartphone className="h-3.5 w-3.5 text-pink-500" />
                        Gateway SMS
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

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
                  <Button className="gap-2" onClick={() => setShowNewClinicModal(true)}>
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
                        <UITooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setSelectedClinic(clinic);
                                setShowClinicModal(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Ver detalhes</TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => setShowBroadcastModal(true)}
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Enviar mensagem</TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            className="gap-2"
                            onClick={() => {
                              setSelectedClinic(clinic);
                              setShowClinicModal(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="gap-2"
                            onClick={() => {
                              setSelectedClinic(clinic);
                              setShowClinicEditModal(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <ExternalLink className="h-4 w-4" />
                            Acessar como admin
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="gap-2"
                            onClick={() => {
                              setSelectedClinic(clinic);
                              setShowClinicPlanModal(true);
                            }}
                          >
                            <CreditCard className="h-4 w-4" />
                            Gerenciar plano
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="gap-2"
                            onClick={() => {
                              setSelectedClinic(clinic);
                              setShowClinicHistoryModal(true);
                            }}
                          >
                            <History className="h-4 w-4" />
                            Histórico
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {clinic.status === "suspended" ? (
                            <DropdownMenuItem 
                              className="gap-2 text-success"
                              onClick={() => {
                                setSelectedClinic(clinic);
                                setShowSuspendClinicModal(true);
                              }}
                            >
                              <Unlock className="h-4 w-4" />
                              Reativar
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem 
                              className="gap-2 text-destructive"
                              onClick={() => {
                                setSelectedClinic(clinic);
                                setShowSuspendClinicModal(true);
                              }}
                            >
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
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          setSelectedUser(user);
                          setShowUserModal(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setShowBroadcastModal(true)}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            className="gap-2"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowUserModal(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                            Ver perfil
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="gap-2"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowResetPasswordModal(true);
                            }}
                          >
                            <KeyRound className="h-4 w-4" />
                            Resetar senha
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="gap-2"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowUserHistoryModal(true);
                            }}
                          >
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
                  <Button className="gap-2" onClick={() => setShowNewTicketModal(true)}>
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
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-2"
                        onClick={() => {
                          setSelectedTicket(ticket);
                          setShowTicketModal(true);
                        }}
                      >
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
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => {
                          setSelectedAuditLog(log);
                          setShowAuditDetailModal(true);
                        }}
                      >
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
                  <Button 
                    className="gap-2"
                    onClick={() => {
                      setFeatureFlagMode("create");
                      setSelectedFeatureFlag(null);
                      setShowFeatureFlagModal(true);
                    }}
                  >
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
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            setFeatureFlagMode("edit");
                            setSelectedFeatureFlag(flag);
                            setShowFeatureFlagModal(true);
                          }}
                        >
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
                  <Button 
                    size="sm" 
                    className="gap-2"
                    onClick={() => {
                      setAnnouncementMode("create");
                      setSelectedAnnouncement(null);
                      setShowAnnouncementModal(true);
                    }}
                  >
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
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 text-xs"
                          onClick={() => {
                            setAnnouncementMode("edit");
                            setSelectedAnnouncement(ann);
                            setShowAnnouncementModal(true);
                          }}
                        >
                          Editar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Carousel Slides Management */}
              <Card className="lg:col-span-3 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                      <Layers className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Carrossel do Login</h3>
                      <p className="text-sm text-muted-foreground">Gerencie novidades, depoimentos e dicas exibidos na tela de login</p>
                    </div>
                  </div>
                  <Button 
                    className="gap-2"
                    onClick={() => setShowCarouselSlides(true)}
                  >
                    <Settings className="h-4 w-4" />
                    Gerenciar Slides
                  </Button>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Rocket className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-primary">4</p>
                        <p className="text-xs text-muted-foreground">Novidades</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-warning/5 border border-warning/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-warning" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-warning">3</p>
                        <p className="text-xs text-muted-foreground">Depoimentos</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-info/5 border border-info/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                        <Lightbulb className="h-5 w-5 text-info" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-info">2</p>
                        <p className="text-xs text-muted-foreground">Dicas</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-muted/30 border">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Shuffle className="h-4 w-4" />
                    A ordem dos slides é aleatória para cada visitante, garantindo que todos vejam conteúdos diferentes.
                  </p>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Cohort Analysis Full */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold flex items-center gap-2">
                  <LayoutGrid className="h-5 w-5 text-primary" />
                  Análise de Cohort - Retenção Mensal
                </h3>
                <div className="flex items-center gap-2">
                  <Select defaultValue="retention">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retention">Retenção</SelectItem>
                      <SelectItem value="revenue">Receita</SelectItem>
                      <SelectItem value="usage">Uso</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-3 font-semibold">Cohort</th>
                      <th className="text-center py-3 px-3 font-medium text-muted-foreground">M0</th>
                      <th className="text-center py-3 px-3 font-medium text-muted-foreground">M1</th>
                      <th className="text-center py-3 px-3 font-medium text-muted-foreground">M2</th>
                      <th className="text-center py-3 px-3 font-medium text-muted-foreground">M3</th>
                      <th className="text-center py-3 px-3 font-medium text-muted-foreground">M4</th>
                      <th className="text-center py-3 px-3 font-medium text-muted-foreground">M5</th>
                      <th className="text-center py-3 px-3 font-medium text-muted-foreground">M6</th>
                      <th className="text-center py-3 px-3 font-medium text-muted-foreground">Avg</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cohortData.map((row) => {
                      const values = [row.m0, row.m1, row.m2, row.m3, row.m4, row.m5, row.m6].filter(v => v !== null) as number[];
                      const avg = values.length > 1 ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(0) : "-";
                      return (
                        <tr key={row.cohort} className="border-b border-border/50 hover:bg-muted/30">
                          <td className="py-3 px-3 font-medium">{row.cohort}</td>
                          {[row.m0, row.m1, row.m2, row.m3, row.m4, row.m5, row.m6].map((val, idx) => (
                            <td key={idx} className="text-center py-3 px-3">
                              {val !== null ? (
                                <span 
                                  className={cn(
                                    "inline-block w-12 px-2 py-1 rounded-md text-xs font-medium",
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
                          <td className="text-center py-3 px-3">
                            <span className="inline-block w-12 px-2 py-1 rounded-md text-xs font-semibold bg-muted">
                              {avg}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* LTV by Segment */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    LTV por Segmento de Plano
                  </h3>
                  <Badge variant="outline" className="text-xs">Lifetime Value</Badge>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={[
                        { segment: "Free", ltv: 0, cac: 50, ratio: 0, customers: 456 },
                        { segment: "Starter", ltv: 1200, cac: 280, ratio: 4.3, customers: 312 },
                        { segment: "Pro", ltv: 4800, cac: 450, ratio: 10.7, customers: 489 },
                        { segment: "Business", ltv: 12500, cac: 850, ratio: 14.7, customers: 234 },
                        { segment: "Enterprise", ltv: 48000, cac: 2500, ratio: 19.2, customers: 77 },
                      ]}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={11} tickFormatter={(v) => `R$${v/1000}k`} />
                      <YAxis type="category" dataKey="segment" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                        formatter={(value: number, name: string) => [
                          `R$ ${value.toLocaleString()}`, 
                          name === 'ltv' ? 'LTV' : 'CAC'
                        ]}
                      />
                      <Bar dataKey="ltv" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="LTV" />
                      <Bar dataKey="cac" fill="hsl(var(--destructive))" radius={[0, 4, 4, 0]} name="CAC" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-5 gap-2">
                  {[
                    { segment: "Free", ratio: "-", color: "muted" },
                    { segment: "Starter", ratio: "4.3x", color: "warning" },
                    { segment: "Pro", ratio: "10.7x", color: "primary" },
                    { segment: "Business", ratio: "14.7x", color: "success" },
                    { segment: "Enterprise", ratio: "19.2x", color: "purple-600" },
                  ].map((item) => (
                    <div key={item.segment} className="text-center p-2 rounded-lg bg-muted/30">
                      <p className={cn("text-lg font-bold", `text-${item.color}`)}>{item.ratio}</p>
                      <p className="text-xs text-muted-foreground">LTV/CAC</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Churn Prediction */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-destructive" />
                    Previsão de Churn
                  </h3>
                  <Badge className="bg-destructive/10 text-destructive border-destructive/20">Alerta: 23 em risco</Badge>
                </div>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart 
                      data={[
                        { month: "Jan", actual: 2.1, predicted: null },
                        { month: "Fev", actual: 1.8, predicted: null },
                        { month: "Mar", actual: 2.5, predicted: null },
                        { month: "Abr", actual: 2.2, predicted: null },
                        { month: "Mai", actual: 2.0, predicted: null },
                        { month: "Jun", actual: 2.3, predicted: null },
                        { month: "Jul", actual: null, predicted: 2.1 },
                        { month: "Ago", actual: null, predicted: 1.9 },
                        { month: "Set", actual: null, predicted: 1.8 },
                      ]}
                    >
                      <defs>
                        <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--info))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--info))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickFormatter={(v) => `${v}%`} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                        formatter={(value: number) => [`${value}%`, 'Churn Rate']}
                      />
                      <Area type="monotone" dataKey="actual" stroke="hsl(var(--destructive))" fill="url(#colorActual)" strokeWidth={2} name="Atual" />
                      <Area type="monotone" dataKey="predicted" stroke="hsl(var(--info))" fill="url(#colorPredicted)" strokeWidth={2} strokeDasharray="5 5" name="Previsto" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-destructive" />
                      Churn Atual (Média 6m)
                    </span>
                    <span className="font-semibold">2.15%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-info" />
                      Previsão Próx. Trimestre
                    </span>
                    <span className="font-semibold text-success">1.93% ↓</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* At Risk Customers */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Clínicas em Risco de Churn
                </h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filtrar
                  </Button>
                  <Button size="sm" className="gap-2" onClick={() => setShowBroadcastModal(true)}>
                    <Megaphone className="h-4 w-4" />
                    Campanha de Retenção
                  </Button>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Clínica Prime Care", risk: 85, reason: "Inativo há 15 dias, pagamento falhou", plan: "Business", mrr: 450, lastLogin: "Há 15 dias" },
                  { name: "Saúde Total Integrada", risk: 72, reason: "Uso reduzido 60%, trial expirando", plan: "Starter", mrr: 99, lastLogin: "Há 3 dias" },
                  { name: "Centro Especialidades", risk: 58, reason: "Tickets de suporte não resolvidos", plan: "Pro", mrr: 299, lastLogin: "Há 6 horas" },
                  { name: "Clínica Integrada Saúde", risk: 45, reason: "Sem login há 45 dias", plan: "Free", mrr: 0, lastLogin: "Há 45 dias" },
                ].map((clinic, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-xl border transition-all",
                      clinic.risk >= 70 ? "bg-destructive/5 border-destructive/20" :
                      clinic.risk >= 50 ? "bg-warning/5 border-warning/20" :
                      "bg-muted/30 border-transparent"
                    )}
                  >
                    <div className="relative">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm",
                        clinic.risk >= 70 ? "bg-destructive/10 text-destructive" :
                        clinic.risk >= 50 ? "bg-warning/10 text-warning" :
                        "bg-muted text-muted-foreground"
                      )}>
                        {clinic.risk}%
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-medium">{clinic.name}</h4>
                        {getPlanBadge(clinic.plan)}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{clinic.reason}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {clinic.lastLogin}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          R$ {clinic.mrr}/mês
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-1"
                        onClick={() => {
                          setSelectedChurnClinic({ name: clinic.name, score: clinic.risk, mrr: clinic.mrr });
                          setShowContactChurnModal(true);
                        }}
                      >
                        <Mail className="h-3 w-3" />
                        Contatar
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          setSelectedClinic(clinics.find(c => c.name === clinic.name) || null);
                          setShowClinicModal(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Conversion Metrics */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Funnel */}
              <Card className="lg:col-span-2 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Layers className="h-5 w-5 text-primary" />
                    Funil de Conversão
                  </h3>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1"
                      onClick={() => setShowLeadSearch(true)}
                    >
                      <Search className="h-4 w-4" />
                      Buscar Lead
                    </Button>
                    <Select defaultValue="30d">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7d">7 dias</SelectItem>
                        <SelectItem value="30d">30 dias</SelectItem>
                        <SelectItem value="90d">90 dias</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  {funnelData.map((stage, index) => {
                    const prevValue = index > 0 ? funnelData[index - 1].value : stage.value;
                    const convRate = ((stage.value / prevValue) * 100).toFixed(1);
                    const totalRate = ((stage.value / funnelData[0].value) * 100).toFixed(1);
                    return (
                      <div 
                        key={stage.stage} 
                        className="relative cursor-pointer group"
                        onClick={() => {
                          setSelectedFunnelStage({ name: stage.stage, count: stage.value, color: stage.color });
                          setShowFunnelDrilldown(true);
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-40 text-sm font-medium truncate">{stage.stage}</div>
                          <div className="flex-1">
                            <div 
                              className="h-10 rounded-lg flex items-center px-4 text-white font-semibold text-sm transition-all group-hover:opacity-80 group-hover:scale-[1.02] group-hover:shadow-lg"
                              style={{ 
                                width: `${(stage.value / funnelData[0].value) * 100}%`, 
                                backgroundColor: stage.color,
                                minWidth: '60px'
                              }}
                            >
                              {stage.value.toLocaleString()}
                            </div>
                          </div>
                          <div className="w-20 text-right">
                            <p className="text-sm font-semibold">{totalRate}%</p>
                            {index > 0 && (
                              <p className="text-xs text-muted-foreground">{convRate}% ↓</p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 pt-4 border-t grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">9.8%</p>
                    <p className="text-xs text-muted-foreground">Taxa de Conversão Total</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success">R$ 1.250</p>
                    <p className="text-xs text-muted-foreground">CAC Médio</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-info">14 dias</p>
                    <p className="text-xs text-muted-foreground">Tempo Médio Conversão</p>
                  </div>
                </div>
              </Card>

              {/* Expansion Revenue */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold flex items-center gap-2">
                    <ArrowUpRight className="h-5 w-5 text-success" />
                    Receita de Expansão
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="text-center p-4 rounded-xl bg-success/5 border border-success/20">
                    <p className="text-3xl font-bold text-success">R$ 45.2k</p>
                    <p className="text-sm text-muted-foreground mt-1">Expansion MRR</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <ArrowUp className="h-4 w-4 text-success" />
                        Upgrades
                      </span>
                      <span className="font-semibold">R$ 32.4k</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <UserPlus className="h-4 w-4 text-info" />
                        Add-ons
                      </span>
                      <span className="font-semibold">R$ 8.1k</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        Usuários Extra
                      </span>
                      <span className="font-semibold">R$ 4.7k</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Net Revenue Retention</span>
                      <span className="font-bold text-success">118%</span>
                    </div>
                    <Progress value={118} max={150} className="h-2" />
                    <p className="text-xs text-muted-foreground">Meta: 115% • Benchmark SaaS: 100-120%</p>
                  </div>
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

      {/* Modals */}
      <ClinicDetailModal
        open={showClinicModal}
        onOpenChange={setShowClinicModal}
        clinic={selectedClinic ? {
          id: selectedClinic.id,
          name: selectedClinic.name,
          plan: selectedClinic.plan,
          status: selectedClinic.status,
          owner: selectedClinic.owner,
          email: selectedClinic.email,
          phone: selectedClinic.phone,
          location: selectedClinic.location,
          users: selectedClinic.users,
          patients: selectedClinic.patients,
          appointments: selectedClinic.appointments,
          mrr: selectedClinic.mrr,
          storage: selectedClinic.storage,
          createdAt: selectedClinic.createdAt,
          lastLogin: selectedClinic.lastLogin
        } : undefined}
      />

      <UserDetailModal
        open={showUserModal}
        onOpenChange={setShowUserModal}
        user={selectedUser ? {
          id: selectedUser.id,
          name: selectedUser.name,
          email: selectedUser.email,
          role: selectedUser.role,
          clinic: selectedUser.clinic,
          status: selectedUser.status,
          lastLogin: selectedUser.lastLogin,
          permissions: selectedUser.permissions,
          avatar: selectedUser.avatar
        } : undefined}
      />

      <TicketDetailModal
        open={showTicketModal}
        onOpenChange={setShowTicketModal}
        ticket={selectedTicket ? {
          id: selectedTicket.id,
          subject: selectedTicket.subject,
          clinic: selectedTicket.clinic,
          clinicId: selectedTicket.clinicId,
          priority: selectedTicket.priority,
          status: selectedTicket.status,
          category: selectedTicket.category,
          createdAt: selectedTicket.createdAt,
          assignee: selectedTicket.assignee,
          messages: selectedTicket.messages,
          sla: selectedTicket.sla
        } : undefined}
      />

      <BroadcastModal
        open={showBroadcastModal}
        onOpenChange={setShowBroadcastModal}
      />

      <NewClinicModal
        open={showNewClinicModal}
        onOpenChange={setShowNewClinicModal}
      />

      <ClinicPlanModal
        open={showClinicPlanModal}
        onOpenChange={setShowClinicPlanModal}
        clinic={selectedClinic ? {
          id: selectedClinic.id,
          name: selectedClinic.name,
          currentPlan: selectedClinic.plan,
          mrr: selectedClinic.mrr
        } : null}
      />

      <ClinicHistoryModal
        open={showClinicHistoryModal}
        onOpenChange={setShowClinicHistoryModal}
        clinic={selectedClinic ? {
          id: selectedClinic.id,
          name: selectedClinic.name
        } : null}
      />

      <ClinicEditModal
        open={showClinicEditModal}
        onOpenChange={setShowClinicEditModal}
        clinic={selectedClinic ? {
          id: selectedClinic.id,
          name: selectedClinic.name,
          owner: selectedClinic.owner,
          email: selectedClinic.email,
          phone: selectedClinic.phone,
          location: selectedClinic.location,
          plan: selectedClinic.plan,
          status: selectedClinic.status
        } : null}
      />

      <SuspendClinicModal
        open={showSuspendClinicModal}
        onOpenChange={setShowSuspendClinicModal}
        clinic={selectedClinic ? {
          id: selectedClinic.id,
          name: selectedClinic.name,
          status: selectedClinic.status
        } : null}
      />

      <UserHistoryModal
        open={showUserHistoryModal}
        onOpenChange={setShowUserHistoryModal}
        user={selectedUser ? {
          id: selectedUser.id,
          name: selectedUser.name,
          email: selectedUser.email
        } : null}
      />

      <ResetPasswordModal
        open={showResetPasswordModal}
        onOpenChange={setShowResetPasswordModal}
        user={selectedUser ? {
          id: selectedUser.id,
          name: selectedUser.name,
          email: selectedUser.email
        } : null}
      />

      <NewTicketModal
        open={showNewTicketModal}
        onOpenChange={setShowNewTicketModal}
      />

      <AuditDetailModal
        open={showAuditDetailModal}
        onOpenChange={setShowAuditDetailModal}
        log={selectedAuditLog}
      />

      <FeatureFlagModal
        open={showFeatureFlagModal}
        onOpenChange={setShowFeatureFlagModal}
        flag={selectedFeatureFlag}
        mode={featureFlagMode}
      />

      <AnnouncementModal
        open={showAnnouncementModal}
        onOpenChange={setShowAnnouncementModal}
        announcement={selectedAnnouncement}
        mode={announcementMode}
      />

      <ContactChurnModal
        open={showContactChurnModal}
        onOpenChange={setShowContactChurnModal}
        clinic={selectedChurnClinic}
      />

      <AlertsConfigModal
        open={showAlertsConfigModal}
        onOpenChange={setShowAlertsConfigModal}
      />

      <ReportsModal
        open={showReportsModal}
        onOpenChange={setShowReportsModal}
      />

      <SecurityConfigModal
        open={showSecurityConfigModal}
        onOpenChange={setShowSecurityConfigModal}
      />

      <FunnelDrilldownModal
        open={showFunnelDrilldown}
        onOpenChange={setShowFunnelDrilldown}
        stage={selectedFunnelStage}
        onViewContact={(contact) => {
          setSelectedContact(contact);
          setShowFunnelDrilldown(false);
          setShowContactJourney(true);
        }}
      />

      <LeadSearchModal
        open={showLeadSearch}
        onOpenChange={setShowLeadSearch}
        onViewContact={(contact) => {
          setSelectedContact(contact);
          setShowLeadSearch(false);
          setShowContactJourney(true);
        }}
        onNewLead={() => {
          setShowLeadSearch(false);
          setShowNewLead(true);
        }}
      />

      <NewLeadModal
        open={showNewLead}
        onOpenChange={setShowNewLead}
      />

      <ContactJourneyModal
        open={showContactJourney}
        onOpenChange={setShowContactJourney}
        contact={selectedContact}
      />

      <CarouselSlidesModal
        open={showCarouselSlides}
        onOpenChange={setShowCarouselSlides}
      />

      {/* New Modals - Insights */}
      <FeatureUsageModal
        open={showFeatureUsage}
        onOpenChange={setShowFeatureUsage}
      />

      <ErrorTrackingModal
        open={showErrorTracking}
        onOpenChange={setShowErrorTracking}
      />

      <RevenueProjectionModal
        open={showRevenueProjection}
        onOpenChange={setShowRevenueProjection}
      />

      <CustomerJourneyModal
        open={showCustomerJourney}
        onOpenChange={setShowCustomerJourney}
      />

      {/* New Modals - Support */}
      <LiveChatModal
        open={showLiveChat}
        onOpenChange={setShowLiveChat}
      />

      <KnowledgeBaseModal
        open={showKnowledgeBase}
        onOpenChange={setShowKnowledgeBase}
      />

      <SLAMonitoringModal
        open={showSLAMonitoring}
        onOpenChange={setShowSLAMonitoring}
      />

      <SatisfactionSurveyModal
        open={showSatisfactionSurvey}
        onOpenChange={setShowSatisfactionSurvey}
      />

      {/* New Modals - Operations */}
      <MaintenanceModeModal
        open={showMaintenanceMode}
        onOpenChange={setShowMaintenanceMode}
      />

      <BulkOperationsModal
        open={showBulkOperations}
        onOpenChange={setShowBulkOperations}
      />

      <RefundsCreditsModal
        open={showRefundsCredits}
        onOpenChange={setShowRefundsCredits}
      />

      <CustomPricingModal
        open={showCustomPricing}
        onOpenChange={setShowCustomPricing}
      />

      {/* New Modals - Security */}
      <SuspiciousActivityModal
        open={showSuspiciousActivity}
        onOpenChange={setShowSuspiciousActivity}
      />

      <IPBlockingModal
        open={showIPBlocking}
        onOpenChange={setShowIPBlocking}
      />

      <RateLimitingModal
        open={showRateLimiting}
        onOpenChange={setShowRateLimiting}
      />

      <SecurityIncidentsModal
        open={showSecurityIncidents}
        onOpenChange={setShowSecurityIncidents}
      />

      <ActiveSessionsModal
        open={showActiveSessions}
        onOpenChange={setShowActiveSessions}
      />

      {/* New Modals - Communications */}
      <EmailMarketingModal
        open={showEmailMarketing}
        onOpenChange={setShowEmailMarketing}
      />

      <PushNotificationsModal
        open={showPushNotifications}
        onOpenChange={setShowPushNotifications}
      />

      <SMSGatewayModal
        open={showSMSGateway}
        onOpenChange={setShowSMSGateway}
      />
    </PageContainer>
  );
}
