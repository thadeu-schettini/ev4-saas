import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { PageContainer, PageContent } from "@/components/ui/page-container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ShoppingCart, 
  Search, 
  Plus, 
  Clock,
  CheckCircle2,
  Truck,
  Package,
  AlertTriangle,
  Filter,
  MoreVertical,
  Eye,
  Calendar,
  DollarSign,
  Building2,
  FileText,
  XCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PurchaseOrderModal } from "@/components/estoque/PurchaseOrderModal";
import { OrderDetailModal } from "@/components/estoque/OrderDetailModal";
import { ApproveOrderDialog } from "@/components/estoque/ApproveOrderDialog";
import { CancelOrderDialog } from "@/components/estoque/CancelOrderDialog";
import { ReceiveOrderDialog } from "@/components/estoque/ReceiveOrderDialog";
import { toast } from "sonner";

const mockOrders = [
  {
    id: "PC-2025-001",
    supplier: "MedSupply Ltda",
    date: "10/01/2025",
    items: 5,
    total: 1250.00,
    status: "delivered",
    deliveryDate: "12/01/2025",
    urgency: "normal"
  },
  {
    id: "PC-2025-002",
    supplier: "PharmaDistrib",
    date: "09/01/2025",
    items: 3,
    total: 890.50,
    status: "transit",
    expectedDate: "15/01/2025",
    urgency: "urgent"
  },
  {
    id: "PC-2025-003",
    supplier: "CleanMed",
    date: "08/01/2025",
    items: 8,
    total: 456.00,
    status: "approved",
    expectedDate: "18/01/2025",
    urgency: "normal"
  },
  {
    id: "PC-2025-004",
    supplier: "MedSupply Ltda",
    date: "07/01/2025",
    items: 2,
    total: 2300.00,
    status: "pending",
    expectedDate: null,
    urgency: "urgent"
  },
  {
    id: "PC-2025-005",
    supplier: "Diagnósticos Plus",
    date: "05/01/2025",
    items: 4,
    total: 678.90,
    status: "cancelled",
    cancelReason: "Fornecedor sem estoque",
    urgency: "normal"
  }
];

const statusConfig = {
  pending: { label: "Pendente", color: "bg-pending/10 text-pending border-pending/20", icon: Clock },
  approved: { label: "Aprovado", color: "bg-info/10 text-info border-info/20", icon: CheckCircle2 },
  transit: { label: "Em Trânsito", color: "bg-primary/10 text-primary border-primary/20", icon: Truck },
  delivered: { label: "Entregue", color: "bg-confirmed/10 text-confirmed border-confirmed/20", icon: Package },
  cancelled: { label: "Cancelado", color: "bg-destructive/10 text-destructive border-destructive/20", icon: XCircle }
};

const PedidosCompra = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showReceiveDialog, setShowReceiveDialog] = useState(false);

  const stats = [
    { label: "Pedidos Ativos", value: 12, icon: ShoppingCart, color: "text-primary" },
    { label: "Em Trânsito", value: 4, icon: Truck, color: "text-info" },
    { label: "Entregues (Mês)", value: 23, icon: CheckCircle2, color: "text-confirmed" },
    { label: "Total (Mês)", value: "R$ 15.8k", icon: DollarSign, color: "text-pending" }
  ];

  const handleViewDetails = (order: typeof mockOrders[0]) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const handleApprove = (order: typeof mockOrders[0]) => {
    setSelectedOrder(order);
    setShowApproveDialog(true);
  };

  const handleCancel = (order: typeof mockOrders[0]) => {
    setSelectedOrder(order);
    setShowCancelDialog(true);
  };

  const handleMarkDelivered = (order: typeof mockOrders[0]) => {
    setSelectedOrder(order);
    setShowReceiveDialog(true);
  };

  const filteredOrders = mockOrders.filter(order => {
    if (activeTab === "all") return true;
    return order.status === activeTab;
  });

  return (
    <PageContainer>
      <PageHeader
        title="Pedidos de Compra"
        description="Acompanhe e gerencie pedidos de reposição"
        icon={ShoppingCart}
        actions={
          <Button className="gap-2" onClick={() => setShowNewOrderModal(true)}>
            <Plus className="h-4 w-4" />
            Novo Pedido
          </Button>
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
            <TabsList className="flex-wrap h-auto">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="pending">Pendentes</TabsTrigger>
              <TabsTrigger value="approved">Aprovados</TabsTrigger>
              <TabsTrigger value="transit">Em Trânsito</TabsTrigger>
              <TabsTrigger value="delivered">Entregues</TabsTrigger>
            </TabsList>

            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar pedido..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value={activeTab} className="space-y-4">
            <ScrollArea className="h-[calc(100vh-400px)]">
              <div className="space-y-4">
                {filteredOrders.map((order) => {
                  const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon;
                  return (
                    <Card key={order.id} className="group hover:shadow-md transition-all hover:border-primary/20">
                      <CardContent className="p-4">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                          {/* Order Info */}
                          <div className="flex items-center gap-3 min-w-[180px]">
                            <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                              order.urgency === "urgent" 
                                ? "bg-destructive/10" 
                                : "bg-muted/50"
                            }`}>
                              <ShoppingCart className={`h-5 w-5 ${
                                order.urgency === "urgent" 
                                  ? "text-destructive" 
                                  : "text-muted-foreground"
                              }`} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{order.id}</p>
                                {order.urgency === "urgent" && (
                                  <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 text-xs">
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    Urgente
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {order.date}
                              </p>
                            </div>
                          </div>

                          {/* Supplier */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-primary" />
                              <p className="font-medium">{order.supplier}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">{order.items} itens</p>
                          </div>

                          {/* Value & Dates */}
                          <div className="flex gap-6 text-sm">
                            <div>
                              <p className="text-xs text-muted-foreground">Valor Total</p>
                              <p className="font-semibold text-primary">
                                R$ {order.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </p>
                            </div>
                            {order.status === "delivered" && order.deliveryDate && (
                              <div>
                                <p className="text-xs text-muted-foreground">Entregue em</p>
                                <p className="text-confirmed">{order.deliveryDate}</p>
                              </div>
                            )}
                            {order.status === "transit" && order.expectedDate && (
                              <div>
                                <p className="text-xs text-muted-foreground">Previsão</p>
                                <p>{order.expectedDate}</p>
                              </div>
                            )}
                          </div>

                          {/* Status & Actions */}
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className={statusConfig[order.status as keyof typeof statusConfig].color}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {statusConfig[order.status as keyof typeof statusConfig].label}
                            </Badge>

                            <div className="flex gap-1">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="gap-1"
                                onClick={() => handleViewDetails(order)}
                              >
                                <Eye className="h-4 w-4" />
                                Ver
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleViewDetails(order)}>
                                    <FileText className="h-4 w-4 mr-2" />
                                    Ver Detalhes
                                  </DropdownMenuItem>
                                  {order.status === "pending" && (
                                    <DropdownMenuItem onClick={() => handleApprove(order)}>
                                      <CheckCircle2 className="h-4 w-4 mr-2" />
                                      Aprovar
                                    </DropdownMenuItem>
                                  )}
                                  {order.status === "transit" && (
                                    <DropdownMenuItem onClick={() => handleMarkDelivered(order)}>
                                      <Package className="h-4 w-4 mr-2" />
                                      Marcar Entregue
                                    </DropdownMenuItem>
                                  )}
                                  {(order.status === "pending" || order.status === "approved") && (
                                    <DropdownMenuItem 
                                      className="text-destructive"
                                      onClick={() => handleCancel(order)}
                                    >
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Cancelar
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>

                        {/* Cancel Reason */}
                        {order.status === "cancelled" && order.cancelReason && (
                          <div className="mt-3 pt-3 border-t">
                            <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                              <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                              <p className="text-sm text-destructive">{order.cancelReason}</p>
                            </div>
                          </div>
                        )}

                        {/* Progress for transit orders */}
                        {order.status === "transit" && (
                          <div className="mt-3 pt-3 border-t">
                            <div className="flex items-center gap-3">
                              <Truck className="h-4 w-4 text-primary" />
                              <Progress value={65} className="flex-1 h-2 [&>div]:bg-primary" />
                              <span className="text-xs text-muted-foreground">65% do trajeto</span>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </PageContent>

      <PurchaseOrderModal 
        open={showNewOrderModal} 
        onOpenChange={setShowNewOrderModal} 
      />
      
      <OrderDetailModal 
        open={showDetailsModal} 
        onOpenChange={setShowDetailsModal}
        order={selectedOrder}
      />
      
      <ApproveOrderDialog 
        open={showApproveDialog} 
        onOpenChange={setShowApproveDialog}
        order={selectedOrder}
      />
      
      <CancelOrderDialog 
        open={showCancelDialog} 
        onOpenChange={setShowCancelDialog}
        order={selectedOrder}
      />
      
      <ReceiveOrderDialog 
        open={showReceiveDialog} 
        onOpenChange={setShowReceiveDialog}
        order={selectedOrder}
      />
    </PageContainer>
  );
};

export default PedidosCompra;