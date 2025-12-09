import { Link } from "react-router-dom";
import {
  Calendar,
  UserPlus,
  ClipboardList,
  CreditCard,
  Settings,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  {
    title: "Novo Agendamento",
    description: "Agendar consulta",
    icon: Calendar,
    href: "/calendar",
    color: "from-primary to-primary/70",
  },
  {
    title: "Novo Paciente",
    description: "Cadastrar paciente",
    icon: UserPlus,
    href: "/pacientes",
    color: "from-success to-success/70",
  },
  {
    title: "Recepção",
    description: "Gerenciar fila",
    icon: Users,
    href: "/recepcao",
    color: "from-warning to-warning/70",
  },
  {
    title: "Prontuário",
    description: "Acessar registros",
    icon: ClipboardList,
    href: "/prontuario",
    color: "from-accent to-accent/70",
  },
  {
    title: "Faturamento",
    description: "Ver cobranças",
    icon: CreditCard,
    href: "/billing",
    color: "from-destructive to-destructive/70",
  },
  {
    title: "Configurações",
    description: "Ajustar sistema",
    icon: Settings,
    href: "/configuracoes",
    color: "from-muted-foreground to-muted-foreground/70",
  },
];

export function QuickActions() {
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Ações Rápidas</h3>
        <p className="text-sm text-muted-foreground">Acesso direto às principais funções</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.href}
            className="group flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-background/50 p-4 transition-all duration-200 hover:border-primary/20 hover:shadow-md hover:-translate-y-1"
          >
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg transition-transform duration-200 group-hover:scale-110",
                action.color
              )}
            >
              <action.icon className="h-6 w-6 text-white" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">{action.title}</p>
              <p className="text-xs text-muted-foreground">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}