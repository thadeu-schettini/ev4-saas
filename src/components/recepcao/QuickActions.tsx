import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  UserPlus,
  MessageCircle,
  DollarSign,
  Calendar,
  Phone,
  FileText,
  Clock,
  Users
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const actions = [
  {
    icon: UserPlus,
    label: "Novo Paciente",
    description: "Cadastrar novo paciente",
    color: "text-primary",
    bgColor: "bg-primary/10",
    count: null
  },
  {
    icon: Calendar,
    label: "Novo Agendamento",
    description: "Criar novo agendamento",
    color: "text-accent",
    bgColor: "bg-accent/10",
    count: null
  },
  {
    icon: MessageCircle,
    label: "Enviar Mensagem",
    description: "WhatsApp ou SMS",
    color: "text-success",
    bgColor: "bg-success/10",
    count: 3
  },
  {
    icon: DollarSign,
    label: "Registrar Pagamento",
    description: "Lançar pagamento",
    color: "text-warning",
    bgColor: "bg-warning/10",
    count: 5
  }
];

const quickStats = [
  { icon: Users, label: "Na Sala de Espera", value: "4", color: "text-primary" },
  { icon: Clock, label: "Em Atendimento", value: "2", color: "text-success" },
  { icon: Phone, label: "Aguardando Confirmação", value: "7", color: "text-warning" }
];

export const QuickActions = () => {
  return (
    <div className="p-4 sm:p-5 space-y-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 h-full">
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">Ações Rápidas</h3>
        <div className="space-y-2">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start h-auto p-3 hover:bg-primary/5 group transition-all duration-300"
            >
              <div className={`h-10 w-10 rounded-lg ${action.bgColor} flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                <action.icon className={`h-5 w-5 ${action.color}`} />
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-medium text-foreground">{action.label}</p>
                <p className="text-xs text-muted-foreground truncate">{action.description}</p>
              </div>
              {action.count && (
                <Badge variant="secondary" className="ml-2 flex-shrink-0">
                  {action.count}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-base font-semibold text-foreground mb-4">Status Atual</h3>
        <div className="space-y-3">
          {quickStats.map((stat, index) => (
            <div
              key={index}
              className="p-3 bg-background/50 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-base font-semibold text-foreground mb-4">Comunicação</h3>
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start hover:bg-primary/5">
            <MessageCircle className="h-4 w-4 mr-2 text-success" />
            Templates WhatsApp
          </Button>
          <Button variant="outline" className="w-full justify-start hover:bg-primary/5">
            <FileText className="h-4 w-4 mr-2 text-primary" />
            Relatório do Dia
          </Button>
        </div>
      </div>
    </div>
  );
};
