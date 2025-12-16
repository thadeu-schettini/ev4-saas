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
  Target,
  Baby,
  Bone,
  Heart,
  Palette,
  Activity,
  LucideIcon,
  LayoutGrid,
  List
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer, PageContent } from "@/components/ui/page-container";
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { PlanPatientModal } from "@/components/planos/PlanPatientModal";
import { PlanEditModal } from "@/components/planos/PlanEditModal";
import { PlanDetailModal } from "@/components/planos/PlanDetailModal";
import { ActivePlansModal } from "@/components/planos/ActivePlansModal";
import { TreatmentPatientsModal } from "@/components/planos/TreatmentPatientsModal";
import { CompletionRateModal } from "@/components/planos/CompletionRateModal";
import { RevenueGeneratedModal } from "@/components/planos/RevenueGeneratedModal";

// Cores por categoria de plano
const categoryColors: Record<string, string> = {
  gestacao: "from-pink-400/70 to-rose-500/70",
  fisioterapia: "from-blue-400/70 to-cyan-500/70",
  cardiologia: "from-red-400/70 to-rose-500/70",
  dermatologia: "from-violet-400/70 to-purple-500/70",
  reabilitacao: "from-emerald-400/70 to-green-500/70",
};

const categoryBgColors: Record<string, string> = {
  gestacao: "bg-pink-500/10",
  fisioterapia: "bg-blue-500/10",
  cardiologia: "bg-red-500/10",
  dermatologia: "bg-violet-500/10",
  reabilitacao: "bg-emerald-500/10",
};

// Ícones por categoria
const categoryIcons: Record<string, LucideIcon> = {
  gestacao: Baby,
  fisioterapia: Bone,
  cardiologia: Heart,
  dermatologia: Palette,
  reabilitacao: Activity,
};

// Helper para obter ícone da categoria
const getCategoryIcon = (category: string) => {
  return categoryIcons[category] || Layers;
};

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
    category: "gestacao",
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
    category: "fisioterapia",
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
    category: "cardiologia",
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
    category: "dermatologia",
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
    category: "reabilitacao",
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
  const [view, setView] = useState<"grid" | "table">("table");
  const [isNewPlanOpen, setIsNewPlanOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [isEditPlanOpen, setIsEditPlanOpen] = useState(false);
  const [planToEdit, setPlanToEdit] = useState<typeof plans[0] | null>(null);
  const [activePlansModalOpen, setActivePlansModalOpen] = useState(false);
  const [treatmentModalOpen, setTreatmentModalOpen] = useState(false);
  const [completionModalOpen, setCompletionModalOpen] = useState(false);
  const [revenueModalOpen, setRevenueModalOpen] = useState(false);

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

      <PageContent>
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card 
            key={stat.label} 
            className="group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg cursor-pointer"
            onClick={() => {
              if (idx === 0) setActivePlansModalOpen(true);
              if (idx === 1) setTreatmentModalOpen(true);
              if (idx === 2) setCompletionModalOpen(true);
              if (idx === 3) setRevenueModalOpen(true);
            }}
          >
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

      <ActivePlansModal open={activePlansModalOpen} onOpenChange={setActivePlansModalOpen} />
      <TreatmentPatientsModal open={treatmentModalOpen} onOpenChange={setTreatmentModalOpen} />
      <CompletionRateModal open={completionModalOpen} onOpenChange={setCompletionModalOpen} />
      <RevenueGeneratedModal open={revenueModalOpen} onOpenChange={setRevenueModalOpen} />

      {/* Search */}
      <Card className="border-border/50">
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
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="gap-1">
                Ativos: {plans.filter(p => p.active).length}
              </Badge>
              <Badge variant="outline" className="gap-1">
                Inativos: {plans.filter(p => !p.active).length}
              </Badge>
              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg">
                <Button
                  variant={view === "table" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setView("table")}
                  className="h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={view === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setView("grid")}
                  className="h-8 w-8 p-0"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table View */}
      {view === "table" && (
        <Card className="border-border/50">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plano</TableHead>
                <TableHead className="hidden md:table-cell">Sessões</TableHead>
                <TableHead className="hidden sm:table-cell">Pacientes</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead className="hidden lg:table-cell">Conclusão</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlans.map((plan) => {
                const CategoryIcon = getCategoryIcon(plan.category);
                const categoryColor = categoryColors[plan.category as keyof typeof categoryColors] || "from-primary/70 to-primary/50";
                
                return (
                  <TableRow 
                    key={plan.id} 
                    className={cn("cursor-pointer", !plan.active && "opacity-60")}
                    onClick={() => setSelectedPlan(plan)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={cn("p-1.5 rounded-lg bg-gradient-to-br", categoryColor)}>
                          <CategoryIcon className="h-3.5 w-3.5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium flex items-center gap-2">
                            {plan.name}
                            {plan.popular && (
                              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground hidden sm:block line-clamp-1">
                            {plan.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">{plan.sessions}</Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <span className="text-muted-foreground">{plan.patients}</span>
                    </TableCell>
                    <TableCell className="font-medium">
                      {plan.price > 0 
                        ? `R$ ${plan.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` 
                        : <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs">Gratuito</Badge>
                      }
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <Progress value={plan.completion} className="h-1.5 w-16" />
                        <span className="text-xs text-muted-foreground">{plan.completion}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={plan.active ? "default" : "secondary"}>
                        {plan.active ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2" onClick={() => setSelectedPlan(plan)}>
                            <Eye className="h-4 w-4" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2" onClick={() => {
                            setPlanToEdit(plan);
                            setIsEditPlanOpen(true);
                          }}>
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
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Grid View */}
      {view === "grid" && (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => {
            const CategoryIcon = getCategoryIcon(plan.category);
            const categoryColor = categoryColors[plan.category as keyof typeof categoryColors] || "from-primary/70 to-primary/50";
            const categoryBg = categoryBgColors[plan.category as keyof typeof categoryBgColors] || "bg-primary/10";
            
            return (
              <Card 
                key={plan.id}
                className={cn(
                  "group relative overflow-hidden border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg cursor-pointer",
                  !plan.active && "opacity-60"
                )}
                onClick={() => setSelectedPlan(plan)}
              >
                {/* Subtle background accent */}
                <div className={cn("absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 bg-gradient-to-br", categoryColor)} />
                
                <CardContent className="p-4 relative">
                  {/* Header Row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={cn("p-1.5 rounded-lg bg-gradient-to-br", categoryColor)}>
                        <CategoryIcon className="h-3.5 w-3.5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-1">
                          {plan.name}
                        </h3>
                        <p className="text-xs text-muted-foreground capitalize">{plan.category}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2" onClick={(e) => { e.stopPropagation(); setSelectedPlan(plan); }}>
                          <Eye className="h-4 w-4" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2" onClick={(e) => {
                          e.stopPropagation();
                          setPlanToEdit(plan);
                          setIsEditPlanOpen(true);
                        }}>
                          <Edit2 className="h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2" onClick={(e) => e.stopPropagation()}>
                          <Copy className="h-4 w-4" />
                          Duplicar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-destructive" onClick={(e) => e.stopPropagation()}>
                          <Trash2 className="h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Quick Stats Row */}
                  <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{plan.sessions} sessões</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{plan.patients} pacientes</span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Conclusão</span>
                      <span className="font-medium">{plan.completion}%</span>
                    </div>
                    <Progress value={plan.completion} className="h-1.5" />
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    {plan.price > 0 ? (
                      <span className="text-lg font-bold">
                        R$ {plan.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    ) : (
                      <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs">
                        Gratuito
                      </Badge>
                    )}
                    <div className="flex items-center gap-2">
                      {plan.popular && (
                        <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 gap-1 text-xs">
                          <Star className="h-2.5 w-2.5 fill-amber-500" />
                          Popular
                        </Badge>
                      )}
                      <Badge variant={plan.active ? "default" : "secondary"} className="text-xs">
                        {plan.active ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* New Plan Card */}
          <Card 
            className="border-2 border-dashed border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer group"
            onClick={() => setIsNewPlanOpen(true)}
          >
            <CardContent className="h-full min-h-[200px] flex flex-col items-center justify-center gap-4 text-center p-6">
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
      )}

      {/* Plan Detail Modal */}
      <PlanDetailModal
        open={!!selectedPlan}
        onOpenChange={() => setSelectedPlan(null)}
        plan={selectedPlan}
        onAddPatient={() => setIsAddPatientOpen(true)}
        onEditPlan={() => {
          setPlanToEdit(selectedPlan);
          setIsEditPlanOpen(true);
        }}
      />

      <PlanPatientModal 
        open={isAddPatientOpen} 
        onOpenChange={setIsAddPatientOpen}
        plan={selectedPlan}
      />
      <PlanEditModal 
        open={isEditPlanOpen} 
        onOpenChange={setIsEditPlanOpen}
        plan={planToEdit}
      />
      </PageContent>
    </PageContainer>
  );
}
