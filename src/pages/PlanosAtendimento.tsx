import { useState } from "react";
import { 
  Layers, 
  Plus, 
  Search, 
  MoreVertical,
  Edit2,
  Trash2,
  Copy,
  Eye,
  Calendar,
  DollarSign,
  Users,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle2,
  Star,
  ArrowRight,
  Sparkles,
  Target
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer } from "@/components/ui/page-container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: 1,
    name: "Pré-natal Baixo Risco",
    description: "Acompanhamento completo da gestação de baixo risco",
    sessions: 6,
    price: 0,
    services: ["Consulta Obstétrica", "Ultrassonografia", "Exames Laboratoriais"],
    active: true,
    patients: 24,
    completion: 78,
    color: "from-pink-500 to-rose-500",
    popular: true
  },
  {
    id: 2,
    name: "Fisioterapia Lombar",
    description: "Protocolo de 10 sessões para dor lombar crônica",
    sessions: 10,
    price: 1500,
    services: ["Avaliação Fisioterapêutica", "Sessão de Fisioterapia", "Reavaliação"],
    active: true,
    patients: 18,
    completion: 65,
    color: "from-blue-500 to-cyan-500",
    popular: true
  },
  {
    id: 3,
    name: "Check-up Cardiológico",
    description: "Avaliação cardiológica completa com exames",
    sessions: 3,
    price: 890,
    services: ["Consulta Cardiologia", "ECG", "Ecocardiograma", "Teste Ergométrico"],
    active: true,
    patients: 42,
    completion: 92,
    color: "from-red-500 to-rose-500",
    popular: false
  },
  {
    id: 4,
    name: "Tratamento Dermatológico",
    description: "Protocolo para tratamento de acne severa",
    sessions: 8,
    price: 1200,
    services: ["Consulta Dermatologia", "Limpeza de Pele", "Peeling"],
    active: true,
    patients: 12,
    completion: 45,
    color: "from-violet-500 to-purple-500",
    popular: false
  },
  {
    id: 5,
    name: "Reabilitação Pós-Cirúrgica",
    description: "Recuperação após cirurgia ortopédica",
    sessions: 20,
    price: 2800,
    services: ["Avaliação", "Fisioterapia", "Hidroterapia"],
    active: false,
    patients: 8,
    completion: 100,
    color: "from-emerald-500 to-green-500",
    popular: false
  },
];

const stats = [
  { label: "Planos Ativos", value: 12, icon: Layers, change: "+2", color: "from-blue-500 to-cyan-500" },
  { label: "Pacientes em Tratamento", value: 104, icon: Users, change: "+18", color: "from-emerald-500 to-green-500" },
  { label: "Taxa de Conclusão", value: "76%", icon: Target, change: "+5%", color: "from-amber-500 to-orange-500" },
  { label: "Receita Gerada", value: "R$ 42.5k", icon: DollarSign, change: "+12%", color: "from-violet-500 to-purple-500" },
];

export default function PlanosAtendimento() {
  const [search, setSearch] = useState("");
  const [isNewPlanOpen, setIsNewPlanOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);

  const filteredPlans = plans.filter(plan => 
    plan.name.toLowerCase().includes(search.toLowerCase()) ||
    plan.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageContainer>
      <PageHeader
        icon={Layers}
        iconGradient="from-violet-500 to-purple-500"
        title="Planos de Atendimento"
        description="Crie e gerencie protocolos de tratamento para seus pacientes"
        actions={
          <Dialog open={isNewPlanOpen} onOpenChange={setIsNewPlanOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Novo Plano
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Criar Novo Plano
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome do Plano</Label>
                    <Input placeholder="Ex: Fisioterapia Lombar" />
                  </div>
                  <div className="space-y-2">
                    <Label>Número de Sessões</Label>
                    <Input type="number" placeholder="10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Descrição</Label>
                  <Textarea placeholder="Descreva o plano de atendimento..." />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Valor Total (R$)</Label>
                    <Input type="number" placeholder="1500,00" />
                  </div>
                  <div className="space-y-2">
                    <Label>Validade (dias)</Label>
                    <Input type="number" placeholder="90" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Serviços Inclusos</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione os serviços" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consulta">Consulta</SelectItem>
                      <SelectItem value="exame">Exame</SelectItem>
                      <SelectItem value="procedimento">Procedimento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsNewPlanOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setIsNewPlanOpen(false)}>
                    Criar Plano
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
            <div className={cn("absolute inset-0 opacity-5 bg-gradient-to-br", stat.color)} />
            <CardContent className="p-4 relative">
              <div className="flex items-start justify-between mb-3">
                <div className={cn("p-2.5 rounded-xl bg-gradient-to-br shadow-lg", stat.color)}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <Badge variant="secondary" className="text-xs font-medium text-emerald-600">
                  {stat.change}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <Card className="mb-6 border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar planos de atendimento..." 
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                Ativos: {plans.filter(p => p.active).length}
              </Badge>
              <Badge variant="outline" className="gap-1">
                Inativos: {plans.filter(p => !p.active).length}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
          <Card 
            key={plan.id}
            className={cn(
              "group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl cursor-pointer",
              !plan.active && "opacity-60"
            )}
            onClick={() => setSelectedPlan(plan)}
          >
            {/* Background gradient */}
            <div className={cn("absolute inset-0 opacity-5 bg-gradient-to-br", plan.color)} />
            
            {/* Header */}
            <CardHeader className="pb-3 relative">
              <div className="flex items-start justify-between">
                <div className={cn(
                  "p-3 rounded-2xl bg-gradient-to-br shadow-lg group-hover:scale-110 transition-transform",
                  plan.color
                )}>
                  <Layers className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-center gap-2">
                  {plan.popular && (
                    <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 gap-1">
                      <Star className="h-3 w-3 fill-amber-500" />
                      Popular
                    </Badge>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Eye className="h-4 w-4" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Edit2 className="h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Copy className="h-4 w-4" />
                        Duplicar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <Trash2 className="h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="mt-4">
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {plan.name}
                </CardTitle>
                <CardDescription className="mt-1 line-clamp-2">
                  {plan.description}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="relative space-y-4">
              {/* Meta Info */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                    <Calendar className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-lg font-bold">{plan.sessions}</p>
                  <p className="text-xs text-muted-foreground">Sessões</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                    <Users className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-lg font-bold">{plan.patients}</p>
                  <p className="text-xs text-muted-foreground">Pacientes</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                    <Target className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-lg font-bold">{plan.completion}%</p>
                  <p className="text-xs text-muted-foreground">Conclusão</p>
                </div>
              </div>

              {/* Services */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Serviços inclusos
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {plan.services.slice(0, 3).map((service, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                  {plan.services.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{plan.services.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Taxa de conclusão</span>
                  <span className="font-medium">{plan.completion}%</span>
                </div>
                <Progress value={plan.completion} className="h-2" />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <div>
                  {plan.price > 0 ? (
                    <p className="text-xl font-bold">
                      R$ {plan.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  ) : (
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                      Gratuito / SUS
                    </Badge>
                  )}
                </div>
                <Badge variant={plan.active ? "default" : "secondary"}>
                  {plan.active ? "Ativo" : "Inativo"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* New Plan Card */}
        <Card 
          className="border-2 border-dashed border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer group"
          onClick={() => setIsNewPlanOpen(true)}
        >
          <CardContent className="h-full min-h-[400px] flex flex-col items-center justify-center gap-4 text-center p-6">
            <div className="p-4 rounded-2xl bg-muted/50 group-hover:bg-primary/10 transition-colors">
              <Plus className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div>
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                Criar Novo Plano
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Configure um novo protocolo de atendimento
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plan Detail Modal */}
      <Dialog open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
        <DialogContent className="max-w-3xl">
          {selectedPlan && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "p-3 rounded-2xl bg-gradient-to-br shadow-lg",
                    selectedPlan.color
                  )}>
                    <Layers className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <DialogTitle className="text-xl">{selectedPlan.name}</DialogTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedPlan.description}
                    </p>
                  </div>
                </div>
              </DialogHeader>

              <div className="grid md:grid-cols-2 gap-6 py-4">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      Serviços Inclusos
                    </h4>
                    <div className="space-y-2">
                      {selectedPlan.services.map((service, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                        >
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="text-sm">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-muted/50 text-center">
                      <Calendar className="h-5 w-5 mx-auto text-muted-foreground mb-2" />
                      <p className="text-2xl font-bold">{selectedPlan.sessions}</p>
                      <p className="text-xs text-muted-foreground">Sessões</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50 text-center">
                      <Users className="h-5 w-5 mx-auto text-muted-foreground mb-2" />
                      <p className="text-2xl font-bold">{selectedPlan.patients}</p>
                      <p className="text-xs text-muted-foreground">Pacientes</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-6 rounded-xl border border-border/50 bg-card">
                    <div className="text-center mb-4">
                      <p className="text-sm text-muted-foreground mb-1">Valor do Plano</p>
                      {selectedPlan.price > 0 ? (
                        <p className="text-3xl font-bold">
                          R$ {selectedPlan.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      ) : (
                        <p className="text-2xl font-bold text-emerald-500">Gratuito</p>
                      )}
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Taxa de conclusão</span>
                        <span className="font-medium">{selectedPlan.completion}%</span>
                      </div>
                      <Progress value={selectedPlan.completion} className="h-3" />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 gap-2">
                      <Users className="h-4 w-4" />
                      Adicionar Paciente
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Edit2 className="h-4 w-4" />
                      Editar
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}
