import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tag, Percent, Building2, Plus, Search, Edit, Trash2, Calendar, Users, X, Check } from "lucide-react";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { toast } from "sonner";

interface CustomPricingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockDiscounts = [
  { id: "1", name: "BLACK50", type: "percentage", value: 50, usageLimit: 100, used: 67, expiresAt: "31/01/2024", status: "active", plans: "all" },
  { id: "2", name: "WELCOME20", type: "percentage", value: 20, usageLimit: null, used: 234, expiresAt: null, status: "active", plans: "starter" },
  { id: "3", name: "UPGRADE100", type: "fixed", value: 100, usageLimit: 50, used: 50, expiresAt: "15/01/2024", status: "expired", plans: "professional" },
];

const mockCustomPricing = [
  { id: "1", clinic: "Hospital Central", plan: "Enterprise", originalPrice: 999, customPrice: 799, discount: 20, reason: "Acordo corporativo", validUntil: "31/12/2024" },
  { id: "2", clinic: "Rede MedPlus (5 unidades)", plan: "Professional", originalPrice: 299, customPrice: 249, discount: 17, reason: "Volume", validUntil: "31/12/2024" },
];

export function CustomPricingModal({ open, onOpenChange }: CustomPricingModalProps) {
  const [search, setSearch] = useState("");
  const [showNewCoupon, setShowNewCoupon] = useState(false);
  const [showNewPricing, setShowNewPricing] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<any>(null);
  const [editingPricing, setEditingPricing] = useState<any>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; type: 'coupon' | 'pricing'; id: string; name: string }>({ open: false, type: 'coupon', id: '', name: '' });

  // Form states for coupon
  const [couponForm, setCouponForm] = useState({
    name: "",
    type: "percentage",
    value: "",
    usageLimit: "",
    expiresAt: "",
    plans: "all",
    active: true
  });

  // Form states for pricing
  const [pricingForm, setPricingForm] = useState({
    clinic: "",
    plan: "",
    customPrice: "",
    validUntil: "",
    reason: ""
  });

  const handleEditCoupon = (coupon: any) => {
    setEditingCoupon(coupon);
    setCouponForm({
      name: coupon.name,
      type: coupon.type,
      value: coupon.value.toString(),
      usageLimit: coupon.usageLimit?.toString() || "",
      expiresAt: coupon.expiresAt || "",
      plans: coupon.plans || "all",
      active: coupon.status === "active"
    });
    setShowNewCoupon(false);
  };

  const handleEditPricing = (pricing: any) => {
    setEditingPricing(pricing);
    setPricingForm({
      clinic: pricing.clinic,
      plan: pricing.plan.toLowerCase(),
      customPrice: pricing.customPrice.toString(),
      validUntil: pricing.validUntil,
      reason: pricing.reason
    });
    setShowNewPricing(false);
  };

  const cancelEditCoupon = () => {
    setEditingCoupon(null);
    setCouponForm({ name: "", type: "percentage", value: "", usageLimit: "", expiresAt: "", plans: "all", active: true });
  };

  const cancelEditPricing = () => {
    setEditingPricing(null);
    setPricingForm({ clinic: "", plan: "", customPrice: "", validUntil: "", reason: "" });
  };

  const saveCoupon = () => {
    toast.success(editingCoupon ? "Cupom atualizado com sucesso!" : "Cupom criado com sucesso!");
    cancelEditCoupon();
  };

  const savePricing = () => {
    toast.success(editingPricing ? "Preço customizado atualizado!" : "Preço customizado criado!");
    cancelEditPricing();
  };

  const handleDelete = () => {
    if (deleteDialog.type === 'coupon') {
      toast.success(`Cupom "${deleteDialog.name}" excluído com sucesso!`);
    } else {
      toast.success(`Preço customizado excluído com sucesso!`);
    }
    setDeleteDialog({ open: false, type: 'coupon', id: '', name: '' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-primary" />
            Configuração de Preços e Descontos
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-4 mb-4 flex-wrap">
          <Card className="px-4 py-2">
            <div className="text-2xl font-bold text-primary">3</div>
            <div className="text-xs text-muted-foreground">Cupons Ativos</div>
          </Card>
          <Card className="px-4 py-2">
            <div className="text-2xl font-bold text-success">2</div>
            <div className="text-xs text-muted-foreground">Preços Customizados</div>
          </Card>
          <Card className="px-4 py-2">
            <div className="text-2xl font-bold text-warning">R$ 4.500</div>
            <div className="text-xs text-muted-foreground">Desconto Total/Mês</div>
          </Card>
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar cupons ou clínicas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="coupons" className="flex-1 flex flex-col overflow-hidden">
          <TabsList>
            <TabsTrigger value="coupons" className="gap-2">
              <Percent className="h-4 w-4" /> Cupons de Desconto
            </TabsTrigger>
            <TabsTrigger value="custom" className="gap-2">
              <Building2 className="h-4 w-4" /> Preços Customizados
            </TabsTrigger>
          </TabsList>

          <TabsContent value="coupons" className="flex-1 overflow-hidden mt-4">
            <div className="flex justify-end mb-4">
              <Button onClick={() => { setShowNewCoupon(true); cancelEditCoupon(); }}>
                <Plus className="h-4 w-4 mr-2" /> Novo Cupom
              </Button>
            </div>

            {(showNewCoupon || editingCoupon) && (
              <Card className="mb-4 border-primary">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center justify-between">
                    {editingCoupon ? "Editar Cupom" : "Novo Cupom"}
                    <Button variant="ghost" size="icon" onClick={() => { setShowNewCoupon(false); cancelEditCoupon(); }}>
                      <X className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <Label>Código</Label>
                      <Input 
                        placeholder="CODIGO20" 
                        className="mt-1 uppercase" 
                        value={couponForm.name}
                        onChange={(e) => setCouponForm({...couponForm, name: e.target.value.toUpperCase()})}
                      />
                    </div>
                    <div>
                      <Label>Tipo</Label>
                      <Select value={couponForm.type} onValueChange={(v) => setCouponForm({...couponForm, type: v})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Porcentagem</SelectItem>
                          <SelectItem value="fixed">Valor Fixo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Valor</Label>
                      <Input 
                        type="number" 
                        placeholder="20" 
                        className="mt-1" 
                        value={couponForm.value}
                        onChange={(e) => setCouponForm({...couponForm, value: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Limite de Uso</Label>
                      <Input 
                        type="number" 
                        placeholder="100 (vazio = ilimitado)" 
                        className="mt-1" 
                        value={couponForm.usageLimit}
                        onChange={(e) => setCouponForm({...couponForm, usageLimit: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <Label>Validade</Label>
                      <Input 
                        type="date" 
                        className="mt-1" 
                        value={couponForm.expiresAt}
                        onChange={(e) => setCouponForm({...couponForm, expiresAt: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Planos Aplicáveis</Label>
                      <Select value={couponForm.plans} onValueChange={(v) => setCouponForm({...couponForm, plans: v})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="starter">Starter</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="enterprise">Enterprise</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end gap-4">
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={couponForm.active} 
                          onCheckedChange={(v) => setCouponForm({...couponForm, active: v})}
                        />
                        <Label>Ativo</Label>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => { setShowNewCoupon(false); cancelEditCoupon(); }}>
                      Cancelar
                    </Button>
                    <Button onClick={saveCoupon}>
                      <Check className="h-4 w-4 mr-2" />
                      {editingCoupon ? "Salvar Alterações" : "Criar Cupom"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <ScrollArea className="h-[300px]">
              <div className="space-y-3 pr-4">
                {mockDiscounts.map((coupon) => (
                  <Card key={coupon.id} className={coupon.status === "expired" ? "opacity-60" : ""}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Percent className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-lg">{coupon.name}</span>
                            <Badge variant={coupon.status === "active" ? "default" : "secondary"}>
                              {coupon.status === "active" ? "Ativo" : "Expirado"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {coupon.used}{coupon.usageLimit ? `/${coupon.usageLimit}` : ""} usos
                            </span>
                            {coupon.expiresAt && (
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Até {coupon.expiresAt}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            {coupon.type === "percentage" ? `${coupon.value}%` : `R$ ${coupon.value}`}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {coupon.type === "percentage" ? "desconto" : "de desconto"}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditCoupon(coupon)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setDeleteDialog({ open: true, type: 'coupon', id: coupon.id, name: coupon.name })}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="custom" className="flex-1 overflow-hidden mt-4">
            <div className="flex justify-end mb-4">
              <Button onClick={() => { setShowNewPricing(true); cancelEditPricing(); }}>
                <Plus className="h-4 w-4 mr-2" /> Novo Preço Customizado
              </Button>
            </div>

            {(showNewPricing || editingPricing) && (
              <Card className="mb-4 border-primary">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center justify-between">
                    {editingPricing ? "Editar Preço Customizado" : "Novo Preço Customizado"}
                    <Button variant="ghost" size="icon" onClick={() => { setShowNewPricing(false); cancelEditPricing(); }}>
                      <X className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <Label>Clínica</Label>
                      <Input 
                        placeholder="Buscar clínica..." 
                        className="mt-1" 
                        value={pricingForm.clinic}
                        onChange={(e) => setPricingForm({...pricingForm, clinic: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Plano</Label>
                      <Select value={pricingForm.plan} onValueChange={(v) => setPricingForm({...pricingForm, plan: v})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="enterprise">Enterprise</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Preço Customizado (R$)</Label>
                      <Input 
                        type="number" 
                        placeholder="799" 
                        className="mt-1" 
                        value={pricingForm.customPrice}
                        onChange={(e) => setPricingForm({...pricingForm, customPrice: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Validade</Label>
                      <Input 
                        type="date" 
                        className="mt-1" 
                        value={pricingForm.validUntil}
                        onChange={(e) => setPricingForm({...pricingForm, validUntil: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label>Motivo</Label>
                    <Input 
                      placeholder="Ex: Acordo corporativo, volume, etc." 
                      className="mt-1" 
                      value={pricingForm.reason}
                      onChange={(e) => setPricingForm({...pricingForm, reason: e.target.value})}
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => { setShowNewPricing(false); cancelEditPricing(); }}>
                      Cancelar
                    </Button>
                    <Button onClick={savePricing}>
                      <Check className="h-4 w-4 mr-2" />
                      {editingPricing ? "Salvar Alterações" : "Salvar"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <ScrollArea className="h-[300px]">
              <div className="space-y-3 pr-4">
                {mockCustomPricing.map((pricing) => (
                  <Card key={pricing.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-success" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{pricing.clinic}</span>
                            <Badge variant="outline">{pricing.plan}</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">{pricing.reason}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Válido até: {pricing.validUntil}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground line-through">
                            R$ {pricing.originalPrice}
                          </div>
                          <div className="text-xl font-bold text-success">R$ {pricing.customPrice}</div>
                          <Badge className="bg-success/20 text-success">-{pricing.discount}%</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditPricing(pricing)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setDeleteDialog({ open: true, type: 'pricing', id: pricing.id, name: pricing.clinic })}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <DeleteConfirmDialog
          open={deleteDialog.open}
          onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
          title={deleteDialog.type === 'coupon' ? "Excluir Cupom" : "Excluir Preço Customizado"}
          description={`Tem certeza que deseja excluir ${deleteDialog.type === 'coupon' ? 'o cupom' : 'o preço customizado de'} "${deleteDialog.name}"? Esta ação não pode ser desfeita.`}
          onConfirm={handleDelete}
        />
      </DialogContent>
    </Dialog>
  );
}
