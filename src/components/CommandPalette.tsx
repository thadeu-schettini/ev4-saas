import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
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
  Moon,
  Sun,
  Search,
  Plus,
  LogOut,
  User,
  HelpCircle,
  Keyboard,
} from "lucide-react";
import { useTheme } from "next-themes";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const navigate = useNavigate();
  const { setTheme, theme } = useTheme();

  const runCommand = React.useCallback((command: () => void) => {
    onOpenChange(false);
    command();
  }, [onOpenChange]);

  const navigationItems = [
    { icon: Home, label: "Dashboard", shortcut: "D", path: "/" },
    { icon: Calendar, label: "Agenda", shortcut: "A", path: "/calendar" },
    { icon: Building2, label: "Recepção", shortcut: "R", path: "/recepcao" },
    { icon: Users, label: "Pacientes", shortcut: "P", path: "/pacientes" },
    { icon: FileText, label: "Prontuário", shortcut: "O", path: "/prontuario" },
    { icon: UserCog, label: "Profissionais", path: "/profissionais" },
    { icon: ClipboardList, label: "Formulários", path: "/formularios-clinicos" },
    { icon: DollarSign, label: "Financeiro", shortcut: "F", path: "/financeiro" },
    { icon: Gift, label: "Indicações", path: "/indicacoes" },
    { icon: CreditCard, label: "Faturamento", path: "/billing" },
    { icon: Settings, label: "Configurações", shortcut: "S", path: "/configuracoes" },
  ];

  const quickActions = [
    { icon: Plus, label: "Novo Agendamento", action: () => navigate("/calendar") },
    { icon: Plus, label: "Novo Paciente", action: () => navigate("/pacientes") },
    { icon: Search, label: "Buscar Paciente", action: () => navigate("/pacientes") },
  ];

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Digite um comando ou busque..." />
      <CommandList>
        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
        
        <CommandGroup heading="Navegação">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <CommandItem
                key={item.path}
                onSelect={() => runCommand(() => navigate(item.path))}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
                {item.shortcut && (
                  <CommandShortcut>⌘{item.shortcut}</CommandShortcut>
                )}
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Ações Rápidas">
          {quickActions.map((item, index) => {
            const Icon = item.icon;
            return (
              <CommandItem
                key={index}
                onSelect={() => runCommand(item.action)}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Tema">
          <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
            <Sun className="mr-2 h-4 w-4" />
            <span>Tema Claro</span>
            {theme === "light" && <CommandShortcut>✓</CommandShortcut>}
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
            <Moon className="mr-2 h-4 w-4" />
            <span>Tema Escuro</span>
            {theme === "dark" && <CommandShortcut>✓</CommandShortcut>}
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Tema do Sistema</span>
            {theme === "system" && <CommandShortcut>✓</CommandShortcut>}
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Conta">
          <CommandItem onSelect={() => runCommand(() => navigate("/configuracoes"))}>
            <User className="mr-2 h-4 w-4" />
            <span>Meu Perfil</span>
          </CommandItem>
          <CommandItem>
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Central de Ajuda</span>
          </CommandItem>
          <CommandItem>
            <Keyboard className="mr-2 h-4 w-4" />
            <span>Atalhos de Teclado</span>
            <CommandShortcut>⌘K</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}