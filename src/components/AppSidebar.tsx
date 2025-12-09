import { useLocation } from "react-router-dom";
import {
  Home,
  Calendar,
  Users,
  UserCog,
  FileText,
  ClipboardList,
  Settings,
  Gift,
  CreditCard,
  DollarSign,
  Building2,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  Bell,
  HelpCircle,
  Stethoscope,
  Layers,
  Video,
  BarChart3,
  Target,
  MessageSquare,
  Brain,
  Star,
  FileBarChart,
  Lock,
  ClipboardCheck,
  BookOpen,
  Users2,
  TrendingUp,
  BarChart2,
  Package,
  Pill,
  FileCheck,
  ThumbsUp,
  TestTube,
  FileSignature,
  MessageCircle,
  Beaker,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItem {
  title: string;
  url: string;
  icon: typeof Home;
  comingSoon?: boolean;
}

const mainNavItems: NavItem[] = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Agenda", url: "/calendar", icon: Calendar },
  { title: "Recepção", url: "/recepcao", icon: Building2 },
  { title: "Pacientes", url: "/pacientes", icon: Users },
  { title: "Prontuário", url: "/prontuario", icon: FileText },
];

const managementItems: NavItem[] = [
  { title: "Profissionais", url: "/profissionais", icon: UserCog },
  { title: "Serviços", url: "/servicos", icon: Stethoscope },
  { title: "Planos", url: "/planos-atendimento", icon: Layers },
  { title: "Formulários", url: "/formularios-clinicos", icon: ClipboardList },
];

const otherItems: NavItem[] = [
  { title: "Pipeline", url: "/pipeline", icon: Target },
  { title: "Chat", url: "/chat", icon: MessageSquare },
  { title: "Notificações", url: "/notificacoes", icon: Bell },
  { title: "Telemedicina", url: "/telemedicina", icon: Video, comingSoon: true },
  { title: "Relatórios", url: "/relatorios", icon: FileBarChart },
  { title: "Análises", url: "/analises", icon: Brain },
  { title: "Avaliações", url: "/avaliacoes", icon: Star },
  { title: "Financeiro", url: "/financeiro", icon: DollarSign },
  { title: "Indicações", url: "/indicacoes", icon: Gift },
  { title: "Faturamento", url: "/billing", icon: CreditCard },
  { title: "Configurações", url: "/configuracoes", icon: Settings },
];

// Temporary menu for new features evaluation
const newFeaturesItems: NavItem[] = [
  { title: "Triagem", url: "/triagem", icon: ClipboardCheck },
  { title: "Protocolos", url: "/protocolos", icon: BookOpen },
  { title: "Interconsulta", url: "/interconsulta", icon: Users2 },
  { title: "Produtividade", url: "/produtividade", icon: TrendingUp },
  { title: "Previsão Demanda", url: "/previsao-demanda", icon: BarChart2 },
  { title: "Estoque", url: "/estoque", icon: Package },
  { title: "Lembretes Med.", url: "/lembretes-medicacao", icon: Pill },
  { title: "Consentimentos", url: "/consentimentos", icon: FileCheck },
  { title: "Pesquisa NPS", url: "/pesquisa-nps", icon: ThumbsUp },
  { title: "Labs", url: "/integracao-laboratorios", icon: Beaker },
  { title: "Receita Digital", url: "/receita-digital", icon: FileSignature },
  { title: "WhatsApp", url: "/whatsapp-business", icon: MessageCircle },
];

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  const renderNavItem = (item: NavItem) => {
    // Coming soon items are disabled
    if (item.comingSoon) {
      return (
        <SidebarMenuItem key={item.title} className={cn(collapsed && "flex justify-center")}>
          <SidebarMenuButton
            tooltip={collapsed ? `${item.title} (Em breve)` : undefined}
            className={cn(
              "cursor-not-allowed opacity-50",
              collapsed && "w-10 h-10 p-0 flex items-center justify-center mx-auto"
            )}
            onClick={(e) => e.preventDefault()}
          >
            <div className={cn(
              "flex items-center gap-3 w-full",
              collapsed && "justify-center w-10 h-10 p-0"
            )}>
              <item.icon className="h-5 w-5 shrink-0 text-muted-foreground" />
              {!collapsed && (
                <>
                  <span className="text-muted-foreground">{item.title}</span>
                  <Badge 
                    variant="outline" 
                    className="ml-auto text-[9px] px-1.5 py-0 h-4 bg-warning/15 text-warning border-warning/30 font-medium whitespace-nowrap shrink-0"
                  >
                    <Lock className="w-2.5 h-2.5 mr-0.5 shrink-0" />
                    Breve
                  </Badge>
                </>
              )}
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    }

    return (
      <SidebarMenuItem key={item.title} className={cn(collapsed && "flex justify-center")}>
        <SidebarMenuButton
          asChild
          isActive={isActive(item.url)}
          tooltip={collapsed ? item.title : undefined}
          className={cn(
            collapsed && "w-10 h-10 p-0 flex items-center justify-center mx-auto"
          )}
        >
          <NavLink 
            to={item.url} 
            end 
            className={cn(
              "flex items-center gap-3",
              collapsed && "justify-center w-10 h-10 p-0"
            )}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar
      data-sidebar
      className="border-r border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300"
      collapsible="icon"
    >
      {/* Header with Logo */}
      <SidebarHeader className={cn(
        "border-b border-border/50 py-4",
        collapsed ? "px-0" : "px-4"
      )}>
        <div className="flex items-center justify-center w-full">
          {!collapsed ? (
            <div className="flex items-center gap-3 w-full">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/20 shrink-0">
                <span className="text-lg font-bold text-primary-foreground">M</span>
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-semibold text-foreground truncate">MedClinic</h2>
                <p className="text-xs text-muted-foreground truncate">Sistema Médico</p>
              </div>
            </div>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/20 mx-auto">
              <span className="text-base font-bold text-primary-foreground">M</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className={cn("py-4 overflow-y-auto flex-1", collapsed ? "px-2" : "px-3")}>
        {/* Main Navigation */}
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="px-3 mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
              Principal
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainNavItems.map(renderNavItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Management */}
        <SidebarGroup className="mt-4">
          {!collapsed && (
            <SidebarGroupLabel className="px-3 mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
              Gestão
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {managementItems.map(renderNavItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Other */}
        <SidebarGroup className="mt-4">
          {!collapsed && (
            <SidebarGroupLabel className="px-3 mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
              Outros
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {otherItems.map(renderNavItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* New Features - Temporary */}
        <SidebarGroup className="mt-4">
          {!collapsed && (
            <SidebarGroupLabel className="px-3 mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
              🆕 Novas Funcionalidades
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {newFeaturesItems.map(renderNavItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with user and collapse */}
      <SidebarFooter className={cn(
        "border-t border-border/50 space-y-3",
        collapsed ? "px-0 py-3" : "p-3"
      )}>
        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full gap-3 px-2 py-6 hover:bg-accent",
                collapsed ? "justify-center px-0" : "justify-start"
              )}
            >
              <Avatar className={cn("shrink-0", collapsed ? "h-10 w-10" : "h-9 w-9")}>
                <AvatarImage src="https://github.com/shadcn.png" alt="Usuário" />
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  DR
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="flex flex-col items-start text-left">
                  <span className="text-sm font-medium text-foreground">Dr. Ricardo</span>
                  <span className="text-xs text-muted-foreground">Cardiologista</span>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            side="top" 
            align="start" 
            className="w-56 bg-popover border border-border shadow-lg"
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Dr. Ricardo Silva</p>
                <p className="text-xs text-muted-foreground">ricardo@medclinic.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 cursor-pointer" asChild>
              <NavLink to="/meu-perfil">
                <User className="h-4 w-4" />
                <span>Meu Perfil</span>
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer" asChild>
              <NavLink to="/configuracoes">
                <Settings className="h-4 w-4" />
                <span>Configurações</span>
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer" asChild>
              <NavLink to="/notificacoes">
                <Bell className="h-4 w-4" />
                <span>Notificações</span>
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer" asChild>
              <NavLink to="/ajuda">
                <HelpCircle className="h-4 w-4" />
                <span>Ajuda</span>
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 cursor-pointer text-destructive focus:text-destructive">
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Collapse Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="w-full justify-center gap-2 text-muted-foreground hover:text-foreground"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span>Recolher</span>
            </>
          )}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
