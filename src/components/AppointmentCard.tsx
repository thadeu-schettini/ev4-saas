import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Calendar, 
  MessageCircle, 
  Clock, 
  CreditCard, 
  FileText, 
  Stethoscope, 
  DollarSign,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  AlertCircle,
  XCircle,
  UserX
} from "lucide-react";

type AppointmentStatus = 
  | "pendente"
  | "aguardando_confirmacao"
  | "agendado"
  | "confirmado"
  | "remarcado"
  | "realizado"
  | "nao_compareceu"
  | "cancelado_clinica"
  | "cancelado_paciente";

interface AppointmentCardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusConfig: Record<AppointmentStatus, { label: string; color: string; icon: any }> = {
  pendente: { label: "Pendente", color: "bg-orange-500", icon: AlertCircle },
  aguardando_confirmacao: { label: "Aguardando confirmação", color: "bg-orange-500", icon: Clock },
  agendado: { label: "Agendado", color: "bg-orange-500", icon: Calendar },
  confirmado: { label: "Confirmado", color: "bg-blue-500", icon: CheckCircle2 },
  remarcado: { label: "Remarcado", color: "bg-orange-500", icon: Calendar },
  realizado: { label: "Realizado", color: "bg-green-500", icon: CheckCircle2 },
  nao_compareceu: { label: "Não compareceu", color: "bg-red-500", icon: UserX },
  cancelado_clinica: { label: "Cancelado (clínica)", color: "bg-red-500", icon: XCircle },
  cancelado_paciente: { label: "Cancelado (paciente)", color: "bg-red-500", icon: XCircle },
};

export const AppointmentCard = ({ open, onOpenChange }: AppointmentCardProps) => {
  const [status, setStatus] = useState<AppointmentStatus>("realizado");
  
  const currentStatus = statusConfig[status];
  const StatusIcon = currentStatus.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0 bg-background">
        {/* Header with gradient */}
        <div className="relative p-6 pb-8 bg-gradient-to-r from-primary to-primary overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
          
          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative h-20 w-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl font-bold text-white">PC</span>
                </div>
              </div>
              
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                  Paciente 7 Cruickshank
                  <Sparkles className="h-5 w-5 text-white/80 animate-pulse" />
                </h2>
                <div className="flex items-center gap-3 text-white/90">
                  <span className="text-sm font-medium">551910074070</span>
                  <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span className="text-xs font-semibold">WhatsApp</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 items-end">
              <Badge className={`${currentStatus.color} text-white shadow-lg border-0 px-4 py-2 text-sm font-semibold animate-slide-up`}>
                <StatusIcon className="h-4 w-4 mr-1.5" />
                {currentStatus.label}
              </Badge>
              <Select value={status} onValueChange={(value) => setStatus(value as AppointmentStatus)}>
                <SelectTrigger className="w-[220px] h-8 text-xs bg-white/20 backdrop-blur-sm border-white/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(statusConfig).map(([key, config]) => {
                    const Icon = config.icon;
                    return (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${config.color}`} />
                          <span>{config.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Date & Time Card */}
          <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 group animate-slide-up [animation-delay:100ms]">
            <div className="flex items-center gap-3 flex-1">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Data do Agendamento</p>
                <p className="text-base font-bold text-foreground">27 de Novembro, 2025</p>
              </div>
            </div>
            
            <div className="h-12 w-px bg-border" />
            
            <div className="flex items-center gap-3 flex-1">
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Horário</p>
                <p className="text-base font-bold text-foreground">12:05 - 12:35</p>
              </div>
            </div>
          </div>

          {/* Service & Payment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Service Card */}
            <div className="group p-5 bg-muted/30 rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-slide-up [animation-delay:200ms]">
              <div className="flex items-start gap-3 mb-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Stethoscope className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground font-medium mb-1">Serviço</p>
                  <p className="text-lg font-bold text-foreground">Consulta Dermatologia</p>
                </div>
              </div>
              <div className="pt-3 border-t border-border/50">
                <p className="text-xs text-muted-foreground font-medium mb-1">Tipo de atendimento</p>
                <p className="text-sm font-semibold text-foreground">Consulta Padrão</p>
              </div>
            </div>

            {/* Payment Card */}
            <div className="group p-5 bg-muted/30 rounded-xl border border-border/50 hover:border-success/30 hover:shadow-lg transition-all duration-300 animate-slide-up [animation-delay:300ms]">
              <div className="flex items-start gap-3 mb-3">
                <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="h-5 w-5 text-success" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground font-medium mb-1">Valor do serviço</p>
                  <p className="text-2xl font-bold text-success">R$ 210,00</p>
                </div>
              </div>
              <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1">Status do pagamento</p>
                  <p className="text-sm font-semibold text-warning">Pendente</p>
                </div>
              <Button 
                size="sm" 
                variant="default"
                className="shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <CreditCard className="h-3.5 w-3.5 mr-1.5" />
                Cobrar
              </Button>
              </div>
            </div>
          </div>

          {/* Observations */}
          <div className="p-5 bg-muted/30 rounded-xl border border-border/50 animate-slide-up [animation-delay:400ms]">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold text-foreground">Observações</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Agendamento gerado automaticamente (57)
            </p>
          </div>

          {/* Action Section */}
          <div className="relative overflow-hidden p-6 bg-primary/5 rounded-2xl border border-primary/20 animate-slide-up [animation-delay:500ms] group">
            <div className="relative space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Stethoscope className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                    Iniciar Atendimento
                    <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform duration-300" />
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Abra o modo de atendimento para acompanhar cronômetro, registrar prontuário e criar prescrições. 
                    Todas as alterações são registradas automaticamente no histórico do paciente.
                  </p>
                </div>
              </div>
              
              <Button 
                size="lg"
                className="w-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Sparkles className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Abrir Atendimento
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
