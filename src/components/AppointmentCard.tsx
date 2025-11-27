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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
  UserX,
  Pencil,
  Save,
  X,
  Link as LinkIcon,
  MapPin
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
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    date: "2025-11-27",
    startTime: "12:05",
    endTime: "12:35",
    professional: "Dr(a). Cleta Bogisich",
    service: "Consulta Dermatologia",
    serviceValue: "210,00",
    attendanceType: "Consulta Padrão",
    mode: "online", // "online" | "presencial" | "domiciliar"
    onlineLink: "https://meet.google.com/abc-defg-hij",
    homeAddress: "Rua Example, 123 - Bairro - Cidade/UF",
    planSession: "",
    observations: "Agendamento gerado automaticamente (57)"
  });
  
  const currentStatus = statusConfig[status];
  const StatusIcon = currentStatus.icon;

  const handleSave = () => {
    setIsEditing(false);
    // Aqui você pode adicionar a lógica para salvar no backend
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0 bg-background">
        {/* Header with gradient */}
        <div className="relative p-6 pb-8 bg-gradient-to-r from-primary to-primary overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
          
          <div className="relative">
            <div className="flex items-start justify-between mb-4">
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
                    <div className="flex items-center gap-1.5 bg-green-500/30 backdrop-blur-sm px-3 py-1 rounded-full border border-green-400/50">
                      <MessageCircle className="h-3.5 w-3.5 text-green-100" />
                      <span className="text-xs font-semibold text-green-50">WhatsApp</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30 h-9 px-3"
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-1.5" />
                      Salvar
                    </>
                  ) : (
                    <>
                      <Pencil className="h-4 w-4 mr-1.5" />
                      Editar
                    </>
                  )}
                </Button>
                {isEditing && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditing(false)}
                    className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30 h-9 w-9 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Select value={status} onValueChange={(value) => setStatus(value as AppointmentStatus)}>
                <SelectTrigger className="w-auto min-w-[200px] h-auto px-4 py-2.5 bg-white/20 backdrop-blur-md border-white/30 text-white rounded-xl shadow-lg hover:bg-white/30 transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <StatusIcon className="h-4 w-4" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent className="z-50">
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
          {isEditing ? (
            /* Edit Mode */
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date" className="text-sm font-medium">Data</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="startTime" className="text-sm font-medium">Hora inicial</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="endTime" className="text-sm font-medium">Hora final</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="professional" className="text-sm font-medium">Profissional</Label>
                <Input
                  id="professional"
                  value={formData.professional}
                  onChange={(e) => setFormData({ ...formData, professional: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="service" className="text-sm font-medium">Serviço</Label>
                <Input
                  id="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="serviceValue" className="text-sm font-medium">Valor do serviço (R$)</Label>
                  <Input
                    id="serviceValue"
                    value={formData.serviceValue}
                    onChange={(e) => setFormData({ ...formData, serviceValue: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="attendanceType" className="text-sm font-medium">Tipo de atendimento</Label>
                  <Select value={formData.attendanceType} onValueChange={(value) => setFormData({ ...formData, attendanceType: value })}>
                    <SelectTrigger id="attendanceType" className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Consulta Padrão">Consulta Padrão</SelectItem>
                      <SelectItem value="Retorno">Retorno</SelectItem>
                      <SelectItem value="Emergência">Emergência</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="mode" className="text-sm font-medium">Modo</Label>
                <Select value={formData.mode} onValueChange={(value) => setFormData({ ...formData, mode: value })}>
                  <SelectTrigger id="mode" className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="presencial">Presencial</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="domiciliar">Domiciliar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.mode === "online" && (
                <div>
                  <Label htmlFor="onlineLink" className="text-sm font-medium">Link da sala online</Label>
                  <Input
                    id="onlineLink"
                    value={formData.onlineLink}
                    onChange={(e) => setFormData({ ...formData, onlineLink: e.target.value })}
                    placeholder="https://meet.google.com/..."
                    className="mt-1"
                  />
                </div>
              )}

              {formData.mode === "domiciliar" && (
                <div>
                  <Label htmlFor="homeAddress" className="text-sm font-medium">Endereço para atendimento domiciliar</Label>
                  <Input
                    id="homeAddress"
                    value={formData.homeAddress}
                    onChange={(e) => setFormData({ ...formData, homeAddress: e.target.value })}
                    placeholder="Rua, número - Bairro - Cidade/UF"
                    className="mt-1"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="planSession" className="text-sm font-medium">Sessão do plano (opcional)</Label>
                <Input
                  id="planSession"
                  value={formData.planSession}
                  onChange={(e) => setFormData({ ...formData, planSession: e.target.value })}
                  placeholder="Sem vínculo"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="observations" className="text-sm font-medium">Observações</Label>
                <Textarea
                  id="observations"
                  value={formData.observations}
                  onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                  rows={3}
                  className="mt-1"
                />
              </div>
            </div>
          ) : (
            /* View Mode */
            <>
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

              {/* Mode-specific information */}
              {formData.mode === "online" && (
                <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/30 animate-slide-up [animation-delay:150ms]">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <LinkIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground font-medium mb-1">Atendimento Online</p>
                      <a 
                        href={formData.onlineLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {formData.onlineLink}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {formData.mode === "domiciliar" && (
                <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/30 animate-slide-up [animation-delay:150ms]">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground font-medium mb-1">Endereço do Atendimento</p>
                      <p className="text-sm font-semibold text-foreground">{formData.homeAddress}</p>
                    </div>
                  </div>
                </div>
              )}

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
                      <p className="text-lg font-bold text-foreground">{formData.service}</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-border/50">
                    <p className="text-xs text-muted-foreground font-medium mb-1">Tipo de atendimento</p>
                    <p className="text-sm font-semibold text-foreground">{formData.attendanceType}</p>
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
                      <p className="text-2xl font-bold text-success">R$ {formData.serviceValue}</p>
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
                      className="shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-primary-glow border-0"
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
                  {formData.observations}
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
                    className="w-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group bg-gradient-to-r from-primary to-primary-glow border-0"
                  >
                    <Sparkles className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    Abrir Atendimento
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
