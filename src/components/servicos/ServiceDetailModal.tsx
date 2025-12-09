import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  Stethoscope,
  Clock,
  DollarSign,
  Users,
  Star,
  TrendingUp,
  TrendingDown,
  Calendar,
  FileText,
  Edit2,
  BarChart3,
  AlertCircle,
  CheckCircle2,
  Info,
  Activity,
  Clipboard,
  History
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Tooltip } from "recharts";

interface ServiceDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: {
    id: number;
    name: string;
    description: string;
    category: string;
    duration: number;
    price: number;
    professionals: number;
    active: boolean;
    popular?: boolean;
    uses: number;
    tussCode?: string;
  } | null;
  onEdit?: () => void;
}

// Mock usage data
const usageHistoryData = [
  { mes: "Jul", uso: 32 },
  { mes: "Ago", uso: 45 },
  { mes: "Set", uso: 38 },
  { mes: "Out", uso: 52 },
  { mes: "Nov", uso: 48 },
  { mes: "Dez", uso: 56 },
];

const weeklyUsageData = [
  { dia: "Seg", realizados: 8 },
  { dia: "Ter", realizados: 12 },
  { dia: "Qua", realizados: 10 },
  { dia: "Qui", realizados: 15 },
  { dia: "Sex", realizados: 11 },
];

const recentUsage = [
  { patient: "Maria Silva", professional: "Dr. Ricardo", date: "Hoje, 10:30", status: "completed" },
  { patient: "João Pedro", professional: "Dra. Ana Paula", date: "Hoje, 09:15", status: "completed" },
  { patient: "Ana Costa", professional: "Dr. Ricardo", date: "Ontem, 16:00", status: "completed" },
  { patient: "Carlos Lima", professional: "Dr. Marcos", date: "Ontem, 14:30", status: "cancelled" },
  { patient: "Fernanda Rocha", professional: "Dra. Ana Paula", date: "08/12/2024", status: "completed" },
];

const tussInfo = {
  codigo: "10101012",
  descricao: "Consulta em consultório (no horário normal ou preestabelecido)",
  capitulo: "1. Consultas, visitas e atendimentos",
  grupo: "01.01 - Consultas",
  subgrupo: "01.01.01 - Consulta em consultório",
  valorReferencia: "R$ 120,00",
  observacoes: "Inclui anamnese, exame físico e orientação ao paciente. Tempo mínimo de 15 minutos.",
  cobertura: ["Unimed", "SulAmérica", "Bradesco Saúde", "Amil"],
};

const linkedProfessionals = [
  { name: "Dr. Ricardo Carvalho", specialty: "Cardiologia", atendimentos: 89, rating: 4.9 },
  { name: "Dra. Ana Paula", specialty: "Cardiologia", atendimentos: 64, rating: 4.8 },
  { name: "Dr. Marcos Souza", specialty: "Cardiologia", atendimentos: 52, rating: 4.7 },
];

export function ServiceDetailModal({ open, onOpenChange, service, onEdit }: ServiceDetailModalProps) {
  const [isActive, setIsActive] = useState(service?.active ?? true);

  if (!service) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Stethoscope className="h-6 w-6 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl flex items-center gap-2">
                  {service.name}
                  {service.popular && (
                    <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 gap-1">
                      <Star className="h-3 w-3 fill-amber-500" />
                      Popular
                    </Badge>
                  )}
                </DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={isActive} onCheckedChange={setIsActive} />
              <span className="text-sm text-muted-foreground">
                {isActive ? "Ativo" : "Inativo"}
              </span>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="info" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="bg-muted/50 p-1 mb-4 flex-wrap h-auto gap-1">
            <TabsTrigger value="info" className="gap-2 text-xs sm:text-sm">
              <Info className="h-4 w-4 hidden sm:block" />
              Informações
            </TabsTrigger>
            <TabsTrigger value="tuss" className="gap-2 text-xs sm:text-sm">
              <Clipboard className="h-4 w-4 hidden sm:block" />
              TUSS/Convênios
            </TabsTrigger>
            <TabsTrigger value="usage" className="gap-2 text-xs sm:text-sm">
              <BarChart3 className="h-4 w-4 hidden sm:block" />
              Histórico de Uso
            </TabsTrigger>
            <TabsTrigger value="professionals" className="gap-2 text-xs sm:text-sm">
              <Users className="h-4 w-4 hidden sm:block" />
              Profissionais
            </TabsTrigger>
          </TabsList>

          {/* Info Tab */}
          <TabsContent value="info" className="flex-1 overflow-auto mt-0 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Duração</span>
                </div>
                <p className="text-2xl font-bold">{service.duration} min</p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs text-muted-foreground">Preço</span>
                </div>
                <p className="text-2xl font-bold text-emerald-600">R$ {service.price.toFixed(2)}</p>
              </div>
              <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-xs text-muted-foreground">Profissionais</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">{service.professionals}</p>
              </div>
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-4 w-4 text-amber-600" />
                  <span className="text-xs text-muted-foreground">Realizados</span>
                </div>
                <p className="text-2xl font-bold text-amber-600">{service.uses}x</p>
              </div>
            </div>

            {/* Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  Detalhes do Serviço
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 rounded-lg bg-muted/30">
                    <span className="text-sm text-muted-foreground">Categoria</span>
                    <Badge variant="outline" className="capitalize">{service.category}</Badge>
                  </div>
                  <div className="flex justify-between p-3 rounded-lg bg-muted/30">
                    <span className="text-sm text-muted-foreground">Código TUSS</span>
                    <span className="text-sm font-mono font-medium">{service.tussCode || "Não informado"}</span>
                  </div>
                  <div className="flex justify-between p-3 rounded-lg bg-muted/30">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge variant={isActive ? "default" : "secondary"}>
                      {isActive ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                  <div className="flex justify-between p-3 rounded-lg bg-muted/30">
                    <span className="text-sm text-muted-foreground">Popularidade</span>
                    <div className="flex items-center gap-1">
                      {service.popular ? (
                        <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 gap-1">
                          <Star className="h-3 w-3 fill-amber-500" />
                          Top 5
                        </Badge>
                      ) : (
                        <span className="text-sm">Regular</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  Performance
                </h4>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={usageHistoryData}>
                      <defs>
                        <linearGradient id="colorUso" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                      <Area type="monotone" dataKey="uso" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorUso)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tendência</span>
                  <div className="flex items-center gap-1 text-emerald-600">
                    <TrendingUp className="h-4 w-4" />
                    +17% este mês
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TUSS Tab */}
          <TabsContent value="tuss" className="flex-1 overflow-auto mt-0 space-y-6">
            {service.tussCode ? (
              <>
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Clipboard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Código TUSS</h4>
                      <p className="text-2xl font-mono font-bold text-primary">{tussInfo.codigo}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{tussInfo.descricao}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Classificação</h4>
                    <div className="space-y-2">
                      <div className="p-3 rounded-lg bg-muted/30">
                        <p className="text-xs text-muted-foreground mb-1">Capítulo</p>
                        <p className="text-sm font-medium">{tussInfo.capitulo}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/30">
                        <p className="text-xs text-muted-foreground mb-1">Grupo</p>
                        <p className="text-sm font-medium">{tussInfo.grupo}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/30">
                        <p className="text-xs text-muted-foreground mb-1">Subgrupo</p>
                        <p className="text-sm font-medium">{tussInfo.subgrupo}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Valor e Cobertura</h4>
                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                      <p className="text-xs text-muted-foreground mb-1">Valor de Referência ANS</p>
                      <p className="text-2xl font-bold text-emerald-600">{tussInfo.valorReferencia}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Convênios Aceitos</p>
                      <div className="flex flex-wrap gap-2">
                        {tussInfo.cobertura.map((convenio) => (
                          <Badge key={convenio} variant="outline" className="gap-1">
                            <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                            {convenio}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/30">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium mb-1">Observações</p>
                      <p className="text-sm text-muted-foreground">{tussInfo.observacoes}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="p-4 rounded-2xl bg-muted/50 mb-4">
                  <Clipboard className="h-8 w-8 text-muted-foreground" />
                </div>
                <h4 className="font-medium mb-1">Código TUSS não configurado</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Este serviço ainda não possui um código TUSS vinculado
                </p>
                <Button variant="outline" className="gap-2">
                  <Edit2 className="h-4 w-4" />
                  Vincular Código TUSS
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Usage Tab */}
          <TabsContent value="usage" className="flex-1 overflow-auto mt-0 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Weekly Chart */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  Uso Semanal
                </h4>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyUsageData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="dia" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="realizados" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  Estatísticas
                </h4>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-muted/30">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Este Mês</span>
                      <span className="font-bold">56 realizações</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">75% da meta mensal</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <p className="text-xs text-muted-foreground">Média/Dia</p>
                      <p className="text-xl font-bold text-emerald-600">8.2</p>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <p className="text-xs text-muted-foreground">Dia de Pico</p>
                      <p className="text-xl font-bold text-blue-600">Quinta</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Usage */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <History className="h-4 w-4 text-muted-foreground" />
                Utilizações Recentes
              </h4>
              <div className="space-y-2">
                {recentUsage.map((usage, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        usage.status === "completed" ? "bg-emerald-500" : "bg-red-500"
                      )} />
                      <div>
                        <p className="text-sm font-medium">{usage.patient}</p>
                        <p className="text-xs text-muted-foreground">{usage.professional}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={usage.status === "completed" ? "default" : "destructive"}
                        className={usage.status === "completed" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : ""}
                      >
                        {usage.status === "completed" ? "Realizado" : "Cancelado"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{usage.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Professionals Tab */}
          <TabsContent value="professionals" className="flex-1 overflow-auto mt-0 space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-medium flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                Profissionais Vinculados
              </h4>
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Vincular Profissional
              </Button>
            </div>

            <div className="space-y-3">
              {linkedProfessionals.map((prof, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-semibold text-primary">
                        {prof.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <p className="font-semibold">{prof.name}</p>
                        <p className="text-sm text-muted-foreground">{prof.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-xl font-bold">{prof.atendimentos}</p>
                        <p className="text-xs text-muted-foreground">Atendimentos</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                          <p className="text-xl font-bold">{prof.rating}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">Avaliação</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Ver Perfil
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={onEdit}>
              <Edit2 className="h-4 w-4" />
              Editar
            </Button>
            <Button className="gap-2">
              <Calendar className="h-4 w-4" />
              Agendar Consulta
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Add missing Plus import to the icons
import { Plus } from "lucide-react";