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
} from "lucide-react";
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

const mainNavItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Agenda", url: "/calendar", icon: Calendar },
  { title: "Recepção", url: "/recepcao", icon: Building2 },
  { title: "Pacientes", url: "/pacientes", icon: Users },
  { title: "Prontuário", url: "/prontuario", icon: FileText },
];

const managementItems = [
  { title: "Profissionais", url: "/profissionais", icon: UserCog },
  { title: "Formulários", url: "/formularios-clinicos", icon: ClipboardList },
];

const otherItems = [
  { title: "Financeiro", url: "/financeiro", icon: DollarSign },
  { title: "Indicações", url: "/indicacoes", icon: Gift },
  { title: "Faturamento", url: "/billing", icon: CreditCard },
  { title: "Configurações", url: "/configuracoes", icon: Settings },
];

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  const renderNavItem = (item: typeof mainNavItems[0]) => (
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

      <SidebarContent className={cn("py-4", collapsed ? "px-2" : "px-3")}>
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
        <SidebarGroup className="mt-6">
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
        <SidebarGroup className="mt-6">
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
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <User className="h-4 w-4" />
              <span>Meu Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <Settings className="h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <Bell className="h-4 w-4" />
              <span>Notificações</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <HelpCircle className="h-4 w-4" />
              <span>Ajuda</span>
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
