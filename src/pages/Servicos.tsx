import { useState } from "react";
import { 
  Stethoscope, 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  DollarSign, 
  Users, 
  MoreVertical,
  Edit2,
  Trash2,
  Copy,
  Eye,
  TrendingUp,
  Star,
  Zap,
  LayoutGrid,
  List,
  ChevronDown,
  Settings2,
  ArrowUpRight,
  Heart,
  TestTube,
  Scissors,
  LucideIcon
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer, PageContent } from "@/components/ui/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ServiceDetailModal } from "@/components/servicos/ServiceDetailModal";
import { ServiceEditModal } from "@/components/servicos/ServiceEditModal";

const categories = [
  { id: "all", name: "Todos", count: 24 },
  { id: "consulta", name: "Consultas", count: 12 },
  { id: "exame", name: "Exames", count: 8 },
  { id: "procedimento", name: "Procedimentos", count: 4 },
];

// Cores por categoria - tons suaves
const categoryColors = {
  consulta: "from-blue-400/70 to-blue-500/70",
  exame: "from-emerald-400/70 to-emerald-500/70",
  procedimento: "from-violet-400/70 to-violet-500/70",
};

const categoryBgColors = {
  consulta: "bg-blue-500/10",
  exame: "bg-emerald-500/10",
  procedimento: "bg-violet-500/10",
};

// Ícones por categoria
const categoryIcons: Record<string, LucideIcon> = {
  consulta: Heart,
  exame: TestTube,
  procedimento: Scissors,
};

// Helper para obter ícone da categoria
const getCategoryIcon = (category: string) => {
  return categoryIcons[category] || Stethoscope;
};

const services = [
  { 
    id: 1, 
    name: "Consulta Cardiologia", 
    description: "Avaliação cardiológica completa",
    category: "consulta",
    duration: 30, 
    price: 200, 
    professionals: 3, 
    active: true,
    popular: true,
    uses: 248,
    tussCode: "10101012",
  },
  { 
    id: 2, 
    name: "Consulta Dermatologia", 
    description: "Avaliação dermatológica",
    category: "consulta",
    duration: 45, 
    price: 210, 
    professionals: 2, 
    active: true,
    popular: true,
    uses: 186,
    tussCode: "10101020",
  },
  { 
    id: 3, 
    name: "Consulta Ginecologia", 
    description: "Consulta ginecológica de rotina",
    category: "consulta",
    duration: 45, 
    price: 240, 
    professionals: 2, 
    active: true,
    popular: false,
    uses: 142,
  },
  { 
    id: 4, 
    name: "Consulta Ortopedia", 
    description: "Avaliação ortopédica",
    category: "consulta",
    duration: 60, 
    price: 220, 
    professionals: 1, 
    active: true,
    popular: false,
    uses: 98,
  },
  { 
    id: 5, 
    name: "Eletrocardiograma", 
    description: "ECG de repouso",
    category: "exame",
    duration: 20, 
    price: 120, 
    professionals: 4, 
    active: true,
    popular: true,
    uses: 312,
    tussCode: "40301010",
  },
  { 
    id: 6, 
    name: "Ecocardiograma", 
    description: "Ultrassonografia cardíaca",
    category: "exame",
    duration: 40, 
    price: 350, 
    professionals: 2, 
    active: true,
    popular: false,
    uses: 87,
  },
  { 
    id: 7, 
    name: "Limpeza de Pele", 
    description: "Procedimento estético facial",
    category: "procedimento",
    duration: 60, 
    price: 180, 
    professionals: 2, 
    active: false,
    popular: false,
    uses: 64,
  },
  { 
    id: 8, 
    name: "Pequena Cirurgia", 
    description: "Procedimentos cirúrgicos menores",
    category: "procedimento",
    duration: 90, 
    price: 450, 
    professionals: 1, 
    active: true,
    popular: false,
    uses: 23,
  },
];

const stats = [
  { label: "Total de Serviços", value: 24, icon: Stethoscope, change: "+3", color: "from-blue-400/60 to-blue-500/60" },
  { label: "Serviços Ativos", value: 21, icon: Zap, change: "+2", color: "from-emerald-400/60 to-emerald-500/60" },
  { label: "Receita Média", value: "R$ 215", icon: DollarSign, change: "+8%", color: "from-amber-400/60 to-amber-500/60" },
  { label: "Mais Utilizado", value: "ECG", icon: Star, change: "312x", color: "from-violet-400/60 to-violet-500/60" },
];

export default function Servicos() {
  const [view, setView] = useState<"grid" | "table">("grid");
  const [onlyActive, setOnlyActive] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isNewServiceOpen, setIsNewServiceOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [isEditServiceOpen, setIsEditServiceOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<typeof services[0] | null>(null);

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(search.toLowerCase());
    const matchesActive = onlyActive ? service.active : true;
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    return matchesSearch && matchesActive && matchesCategory;
  });

  return (
    <PageContainer>
      <PageHeader
        icon={Stethoscope}
        iconGradient="from-blue-500 to-cyan-500"
        title="Serviços"
        description="Gerencie os serviços oferecidos pela sua clínica"
        actions={
          <Dialog open={isNewServiceOpen} onOpenChange={setIsNewServiceOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Novo Serviço
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Novo Serviço</DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome do Serviço</Label>
                    <Input placeholder="Ex: Consulta Cardiologia" />
                  </div>
                  <div className="space-y-2">
                    <Label>Categoria</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consulta">Consulta</SelectItem>
                        <SelectItem value="exame">Exame</SelectItem>
                        <SelectItem value="procedimento">Procedimento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Descrição</Label>
                  <Textarea placeholder="Descreva o serviço..." />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Duração (min)</Label>
                    <Input type="number" placeholder="30" />
                  </div>
                  <div className="space-y-2">
                    <Label>Preço (R$)</Label>
                    <Input type="number" placeholder="200,00" />
                  </div>
                  <div className="space-y-2">
                    <Label>Código TUSS</Label>
                    <Input placeholder="10101012" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsNewServiceOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setIsNewServiceOpen(false)}>
                    Criar Serviço
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
        {stats.map((stat) => (
          <Card key={stat.label} className="group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-md">
            <CardContent className="p-4 relative">
              <div className="flex items-center gap-3 mb-2">
                <div className={cn("p-1.5 rounded-lg bg-gradient-to-br", stat.color)}>
                  <stat.icon className="h-3.5 w-3.5 text-white" />
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold">{stat.value}</p>
                <Badge variant="secondary" className="text-xs font-medium text-muted-foreground">
                  {stat.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters Bar */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <Switch 
                  checked={onlyActive} 
                  onCheckedChange={setOnlyActive}
                  id="active-filter"
                />
                <Label htmlFor="active-filter" className="text-sm cursor-pointer">
                  Somente ativos
                </Label>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar serviços..." 
                  className="pl-9 w-[200px]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Categories */}
              <div className="hidden md:flex items-center gap-1 bg-muted/50 p-1 rounded-lg">
                {categories.map((cat) => (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat.id)}
                    className="h-8 px-3"
                  >
                    {cat.name}
                    <Badge variant="secondary" className="ml-1.5 h-5 px-1.5 text-xs">
                      {cat.count}
                    </Badge>
                  </Button>
                ))}
              </div>
              
              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg">
                <Button
                  variant={view === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setView("grid")}
                  className="h-8 w-8 p-0"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={view === "table" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setView("table")}
                  className="h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Categories */}
          <div className="md:hidden mt-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name} ({cat.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredServices.length} serviço{filteredServices.length !== 1 ? 's' : ''} encontrado{filteredServices.length !== 1 ? 's' : ''}
        </p>
        <Badge variant="outline" className="gap-1">
          Ativos: {services.filter(s => s.active).length} · Inativos: {services.filter(s => !s.active).length}
        </Badge>
      </div>

      {/* Grid View */}
      {view === "grid" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredServices.map((service) => (
            <Card 
              key={service.id}
              className={cn(
                "group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg cursor-pointer",
                !service.active && "opacity-60"
              )}
            >
              <CardContent className="p-4 relative">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const CategoryIcon = getCategoryIcon(service.category);
                      return (
                        <div className={cn("p-1.5 rounded-lg bg-gradient-to-br", categoryColors[service.category as keyof typeof categoryColors])}>
                          <CategoryIcon className="h-3.5 w-3.5 text-white" />
                        </div>
                      );
                    })()}
                    <Badge variant="outline" className={cn("text-xs capitalize", categoryBgColors[service.category as keyof typeof categoryBgColors])}>
                      {service.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    {service.popular && (
                      <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 gap-1">
                        <Star className="h-3 w-3 fill-amber-500" />
                        Popular
                      </Badge>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          className="gap-2"
                          onClick={() => setSelectedService(service)}
                        >
                          <Eye className="h-4 w-4" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2" onClick={() => {
                          setServiceToEdit(service);
                          setIsEditServiceOpen(true);
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
                  </div>
                </div>

                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                  {service.description}
                </p>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{service.duration} min</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{service.professionals} prof.</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <span className="text-lg font-bold">
                    R$ {service.price.toFixed(2)}
                  </span>
                  <Badge variant={service.active ? "default" : "secondary"}>
                    {service.active ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Table View */}
      {view === "table" && (
        <Card className="border-border/50">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden md:table-cell">Profissionais</TableHead>
                <TableHead>Duração</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead className="hidden sm:table-cell">Usos</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.map((service) => (
                <TableRow key={service.id} className={cn(!service.active && "opacity-60")}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {(() => {
                        const CategoryIcon = getCategoryIcon(service.category);
                        return (
                          <div className={cn("p-1.5 rounded-lg bg-gradient-to-br", categoryColors[service.category as keyof typeof categoryColors])}>
                            <CategoryIcon className="h-3.5 w-3.5 text-white" />
                          </div>
                        );
                      })()}
                      <div>
                        <p className="font-medium flex items-center gap-2">
                          {service.name}
                          {service.popular && (
                            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground hidden sm:block">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline">{service.professionals}</Badge>
                  </TableCell>
                  <TableCell>{service.duration} min</TableCell>
                  <TableCell className="font-medium">R$ {service.price.toFixed(2)}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="text-muted-foreground">{service.uses}x</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={service.active ? "default" : "secondary"}>
                      {service.active ? "Ativo" : "Inativo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      <ServiceDetailModal 
        open={!!selectedService} 
        onOpenChange={(open) => !open && setSelectedService(null)} 
        service={selectedService}
        onEdit={() => {
          setServiceToEdit(selectedService);
          setIsEditServiceOpen(true);
          setSelectedService(null);
        }}
      />
      <ServiceEditModal 
        open={isEditServiceOpen} 
        onOpenChange={setIsEditServiceOpen}
        service={serviceToEdit}
      />
      </PageContent>
    </PageContainer>
  );
}
