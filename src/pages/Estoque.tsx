import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer, PageContent } from "@/components/ui/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Package, 
  Search, 
  Plus, 
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Filter,
  MoreVertical,
  ShoppingCart,
  Pill,
  Syringe,
  Stethoscope,
  LayoutGrid,
  List
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockItems = [
  {
    id: 1,
    name: "Luvas de Procedimento M",
    category: "Materiais",
    quantity: 450,
    minQuantity: 200,
    unit: "pares",
    lastOrder: "05/01/2025",
    status: "ok",
    price: 0.45,
    supplier: "MedSupply"
  },
  {
    id: 2,
    name: "Seringa 5ml",
    category: "Materiais",
    quantity: 85,
    minQuantity: 100,
    unit: "unidades",
    lastOrder: "28/12/2024",
    status: "low",
    price: 0.32,
    supplier: "MedSupply"
  },
  {
    id: 3,
    name: "Dipirona 500mg",
    category: "Medicamentos",
    quantity: 12,
    minQuantity: 50,
    unit: "caixas",
    lastOrder: "15/12/2024",
    status: "critical",
    price: 8.50,
    supplier: "PharmaDistrib"
  },
  {
    id: 4,
    name: "Álcool 70%",
    category: "Limpeza",
    quantity: 35,
    minQuantity: 20,
    unit: "litros",
    lastOrder: "02/01/2025",
    status: "ok",
    price: 12.00,
    supplier: "CleanMed"
  },
  {
    id: 5,
    name: "Gaze Estéril",
    category: "Materiais",
    quantity: 180,
    minQuantity: 150,
    unit: "pacotes",
    lastOrder: "30/12/2024",
    status: "ok",
    price: 3.20,
    supplier: "MedSupply"
  },
  {
    id: 6,
    name: "Esparadrapo",
    category: "Materiais",
    quantity: 45,
    minQuantity: 60,
    unit: "rolos",
    lastOrder: "20/12/2024",
    status: "low",
    price: 5.80,
    supplier: "MedSupply"
  }
];

const statusConfig = {
  ok: { label: "Normal", color: "bg-confirmed/10 text-confirmed border-confirmed/20", icon: CheckCircle2 },
  low: { label: "Baixo", color: "bg-pending/10 text-pending border-pending/20", icon: TrendingDown },
  critical: { label: "Crítico", color: "bg-destructive/10 text-destructive border-destructive/20", icon: AlertTriangle }
};

const categoryIcons = {
  Materiais: Syringe,
  Medicamentos: Pill,
  Limpeza: Package,
  Equipamentos: Stethoscope
};

const Estoque = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");

  const stats = [
    { label: "Total de Itens", value: 234, icon: Package, color: "text-primary" },
    { label: "Estoque Baixo", value: 8, icon: TrendingDown, color: "text-pending" },
    { label: "Crítico", value: 3, icon: AlertTriangle, color: "text-destructive" },
    { label: "Valor Total", value: "R$ 45.2k", icon: ShoppingCart, color: "text-info" }
  ];

  const getStockPercentage = (current: number, min: number) => {
    return Math.min((current / (min * 2)) * 100, 100);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Controle de Estoque"
        description="Gerenciamento de materiais, medicamentos e insumos"
        icon={Package}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              Pedido de Compra
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Item
            </Button>
          </div>
        }
      />

      <PageContent>
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-md transition-all">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-muted/50 ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="materials">Materiais</TabsTrigger>
            <TabsTrigger value="medications">Medicamentos</TabsTrigger>
            <TabsTrigger value="cleaning">Limpeza</TabsTrigger>
          </TabsList>

          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar itens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === "table" ? "secondary" : "ghost"}
                size="icon"
                className="rounded-r-none"
                onClick={() => setViewMode("table")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="rounded-l-none"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <TabsContent value={activeTab} className="space-y-4">
          {viewMode === "table" ? (
            <Card>
              <ScrollArea className="h-[calc(100vh-420px)]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Fornecedor</TableHead>
                      <TableHead>Último Pedido</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockItems.map((item) => {
                      const StatusIcon = statusConfig[item.status as keyof typeof statusConfig].icon;
                      const CategoryIcon = categoryIcons[item.category as keyof typeof categoryIcons] || Package;
                      return (
                        <TableRow key={item.id} className="group">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-lg bg-muted/50 flex items-center justify-center">
                                <CategoryIcon className="h-4 w-4 text-muted-foreground" />
                              </div>
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-xs text-muted-foreground">R$ {item.price.toFixed(2)}/{item.unit}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{item.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{item.quantity}</span>
                                <span className="text-xs text-muted-foreground">/ {item.minQuantity} min</span>
                              </div>
                              <Progress 
                                value={getStockPercentage(item.quantity, item.minQuantity)} 
                                className={`h-1.5 ${
                                  item.status === "critical" ? "[&>div]:bg-destructive" :
                                  item.status === "low" ? "[&>div]:bg-pending" :
                                  "[&>div]:bg-confirmed"
                                }`}
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={statusConfig[item.status as keyof typeof statusConfig].color}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {statusConfig[item.status as keyof typeof statusConfig].label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{item.supplier}</TableCell>
                          <TableCell className="text-muted-foreground">{item.lastOrder}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Editar</DropdownMenuItem>
                                <DropdownMenuItem>Registrar Entrada</DropdownMenuItem>
                                <DropdownMenuItem>Registrar Saída</DropdownMenuItem>
                                <DropdownMenuItem>Histórico</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </ScrollArea>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockItems.map((item) => {
                const StatusIcon = statusConfig[item.status as keyof typeof statusConfig].icon;
                const CategoryIcon = categoryIcons[item.category as keyof typeof categoryIcons] || Package;
                return (
                  <Card key={item.id} className="group hover:shadow-md transition-all hover:border-primary/20">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center">
                            <CategoryIcon className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <Badge variant="outline" className="text-xs mt-1">
                              {item.category}
                            </Badge>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Registrar Entrada</DropdownMenuItem>
                            <DropdownMenuItem>Registrar Saída</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Estoque</span>
                            <span className="font-medium">{item.quantity} {item.unit}</span>
                          </div>
                          <Progress 
                            value={getStockPercentage(item.quantity, item.minQuantity)} 
                            className={`h-2 ${
                              item.status === "critical" ? "[&>div]:bg-destructive" :
                              item.status === "low" ? "[&>div]:bg-pending" :
                              "[&>div]:bg-confirmed"
                            }`}
                          />
                          <p className="text-xs text-muted-foreground mt-1">Mínimo: {item.minQuantity}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className={statusConfig[item.status as keyof typeof statusConfig].color}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusConfig[item.status as keyof typeof statusConfig].label}
                          </Badge>
                          <span className="text-sm font-medium">R$ {item.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
      </PageContent>
    </PageContainer>
  );
};

export default Estoque;
