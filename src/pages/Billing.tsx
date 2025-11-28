import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Crown,
  Sparkles,
  TrendingUp,
  Check,
  X,
  CreditCard,
  Calendar,
  Users,
  Zap,
  Shield,
  Lock,
  Unlock,
  Gift,
  Download,
  Receipt,
} from "lucide-react";

const Billing = () => {
  const [selectedPlan, setSelectedPlan] = useState("starter");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const currentPlan = {
    name: "Starter",
    price: 99,
    users: 1,
    maxUsers: 3,
    storage: 45,
    maxStorage: 100,
    consultations: 120,
    maxConsultations: 200,
    nextBilling: "2025-01-15",
  };

  const plans = [
    {
      id: "starter",
      name: "Starter",
      icon: Zap,
      monthlyPrice: 99,
      annualPrice: 950,
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/50",
      features: [
        { name: "Até 3 usuários", included: true },
        { name: "100GB armazenamento", included: true },
        { name: "200 consultas/mês", included: true },
        { name: "Suporte por email", included: true },
        { name: "Relatórios básicos", included: true },
        { name: "Integrações avançadas", included: false },
        { name: "IA ilimitada", included: false },
        { name: "Suporte prioritário", included: false },
      ],
    },
    {
      id: "professional",
      name: "Professional",
      icon: Crown,
      monthlyPrice: 249,
      annualPrice: 2390,
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/50",
      badge: "Mais Popular",
      features: [
        { name: "Até 10 usuários", included: true },
        { name: "500GB armazenamento", included: true },
        { name: "Consultas ilimitadas", included: true },
        { name: "Suporte prioritário", included: true },
        { name: "Relatórios avançados", included: true },
        { name: "Integrações avançadas", included: true },
        { name: "IA com 10k créditos/mês", included: true },
        { name: "Telemedicina", included: true },
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      icon: Sparkles,
      monthlyPrice: 499,
      annualPrice: 4790,
      color: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/50",
      badge: "Completo",
      features: [
        { name: "Usuários ilimitados", included: true },
        { name: "2TB armazenamento", included: true },
        { name: "Consultas ilimitadas", included: true },
        { name: "Suporte 24/7", included: true },
        { name: "Relatórios customizados", included: true },
        { name: "Todas integrações", included: true },
        { name: "IA ilimitada", included: true },
        { name: "Gestor de conta dedicado", included: true },
      ],
    },
  ];

  const paymentHistory = [
    { id: 1, date: "2024-12-15", amount: 99, status: "paid", invoice: "#INV-2024-12" },
    { id: 2, date: "2024-11-15", amount: 99, status: "paid", invoice: "#INV-2024-11" },
    { id: 3, date: "2024-10-15", amount: 99, status: "paid", invoice: "#INV-2024-10" },
    { id: 4, date: "2024-09-15", amount: 99, status: "paid", invoice: "#INV-2024-09" },
  ];

  const calculateSavings = (monthly: number, annual: number) => {
    const monthlyTotal = monthly * 12;
    const savings = monthlyTotal - annual;
    const percentage = Math.round((savings / monthlyTotal) * 100);
    return { savings, percentage };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="border-b bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Planos e Faturamento</h1>
                <p className="text-sm text-muted-foreground">
                  Gerencie seu plano e desbloqueie mais recursos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Current Plan Card */}
        <Card className="border-2 bg-gradient-to-br from-primary/10 via-background to-primary/5 animate-fade-in">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-3xl flex items-center gap-2">
                  <Zap className="h-8 w-8 text-primary" />
                  Plano {currentPlan.name}
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  Seu plano atual • Próxima cobrança: {new Date(currentPlan.nextBilling).toLocaleDateString("pt-BR")}
                </CardDescription>
              </div>
              <Badge className="text-lg px-4 py-2">R$ {currentPlan.price}/mês</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Usage Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Usuários
                  </span>
                  <span className="font-medium">
                    {currentPlan.users}/{currentPlan.maxUsers}
                  </span>
                </div>
                <Progress value={(currentPlan.users / currentPlan.maxUsers) * 100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Armazenamento
                  </span>
                  <span className="font-medium">
                    {currentPlan.storage}GB/{currentPlan.maxStorage}GB
                  </span>
                </div>
                <Progress value={(currentPlan.storage / currentPlan.maxStorage) * 100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Consultas
                  </span>
                  <span className="font-medium">
                    {currentPlan.consultations}/{currentPlan.maxConsultations}
                  </span>
                </div>
                <Progress
                  value={(currentPlan.consultations / currentPlan.maxConsultations) * 100}
                  className="h-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Unlock More Section */}
        <Card className="border-2 border-primary/50 bg-gradient-to-r from-primary/5 to-purple-500/5 animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Desbloqueie Recursos Premium</h3>
                  <p className="text-sm text-muted-foreground">
                    Atualize para Professional e ganhe IA ilimitada, telemedicina e mais
                  </p>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="gap-2">
                    <Sparkles className="h-4 w-4" />
                    Ver Planos
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-3xl">Escolha seu plano ideal</DialogTitle>
                    <DialogDescription className="text-base">
                      Desbloqueie todo o potencial da sua clínica
                    </DialogDescription>
                  </DialogHeader>

                  {/* Billing Cycle Toggle */}
                  <div className="flex items-center justify-center gap-4 my-6">
                    <Button
                      variant={billingCycle === "monthly" ? "default" : "outline"}
                      onClick={() => setBillingCycle("monthly")}
                    >
                      Mensal
                    </Button>
                    <Button
                      variant={billingCycle === "annual" ? "default" : "outline"}
                      onClick={() => setBillingCycle("annual")}
                      className="gap-2"
                    >
                      Anual
                      <Badge variant="secondary" className="ml-2">
                        Economize até 20%
                      </Badge>
                    </Button>
                  </div>

                  {/* Plans Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {plans.map((plan) => {
                      const PlanIcon = plan.icon;
                      const savings = calculateSavings(plan.monthlyPrice, plan.annualPrice);
                      const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice;
                      const priceDisplay =
                        billingCycle === "monthly" ? `${price}/mês` : `${price}/ano`;

                      return (
                        <Card
                          key={plan.id}
                          className={`relative overflow-hidden transition-all hover:scale-105 cursor-pointer ${
                            selectedPlan === plan.id ? "ring-2 ring-primary" : ""
                          }`}
                          onClick={() => setSelectedPlan(plan.id)}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-50`} />
                          {plan.badge && (
                            <div className="absolute top-4 right-4">
                              <Badge className="gap-1">
                                <Crown className="h-3 w-3" />
                                {plan.badge}
                              </Badge>
                            </div>
                          )}
                          <CardHeader className="relative">
                            <div className="flex items-center gap-2 mb-2">
                              <PlanIcon className="h-6 w-6 text-primary" />
                              <CardTitle className="text-2xl">{plan.name}</CardTitle>
                            </div>
                            <div className="space-y-1">
                              <div className="text-4xl font-bold">R$ {priceDisplay}</div>
                              {billingCycle === "annual" && (
                                <p className="text-sm text-muted-foreground">
                                  Economize R$ {savings.savings} ({savings.percentage}%)
                                </p>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent className="relative space-y-4">
                            <div className="space-y-2">
                              {plan.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  {feature.included ? (
                                    <Check className="h-4 w-4 text-green-500 shrink-0" />
                                  ) : (
                                    <X className="h-4 w-4 text-muted-foreground shrink-0" />
                                  )}
                                  <span
                                    className={`text-sm ${
                                      !feature.included ? "text-muted-foreground" : ""
                                    }`}
                                  >
                                    {feature.name}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <Button
                              className="w-full"
                              variant={selectedPlan === plan.id ? "default" : "outline"}
                            >
                              {plan.id === "starter" ? "Plano Atual" : "Fazer Upgrade"}
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="payment" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="payment" className="gap-2">
              <CreditCard className="h-4 w-4" />
              Pagamento
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Receipt className="h-4 w-4" />
              Histórico
            </TabsTrigger>
            <TabsTrigger value="billing" className="gap-2">
              <Calendar className="h-4 w-4" />
              Dados Fiscais
            </TabsTrigger>
          </TabsList>

          {/* Payment Method Tab */}
          <TabsContent value="payment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Método de Pagamento</CardTitle>
                <CardDescription>Gerencie seus métodos de pagamento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-2 border-primary rounded-lg p-4 bg-primary/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Cartão de Crédito</p>
                          <p className="text-sm text-muted-foreground">•••• 4532</p>
                        </div>
                      </div>
                      <Badge>Padrão</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Validade: 08/2027</span>
                      <Button variant="ghost" size="sm">
                        Editar
                      </Button>
                    </div>
                  </div>
                  <div className="border-2 border-dashed rounded-lg p-4 flex items-center justify-center">
                    <Button variant="outline" className="gap-2">
                      <CreditCard className="h-4 w-4" />
                      Adicionar Método
                    </Button>
                  </div>
                </div>

                {/* Coupon Section */}
                <div className="pt-4 border-t space-y-4">
                  <div className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Cupom de Desconto</h3>
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Digite seu cupom" />
                    <Button>Aplicar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Pagamentos</CardTitle>
                <CardDescription>Visualize e baixe suas faturas</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {paymentHistory.map((payment) => (
                      <div
                        key={payment.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                            <Check className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <p className="font-medium">{payment.invoice}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(payment.date).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-semibold">R$ {payment.amount}</p>
                            <Badge variant="secondary" className="text-xs">
                              Pago
                            </Badge>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Info Tab */}
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Dados Fiscais</CardTitle>
                <CardDescription>Informações para emissão de nota fiscal</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cnpj">CNPJ/CPF</Label>
                      <Input id="cnpj" placeholder="00.000.000/0000-00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="razao">Razão Social</Label>
                      <Input id="razao" placeholder="Nome da empresa" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="email">Email para cobrança</Label>
                      <Input id="email" type="email" placeholder="contato@exemplo.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cep">CEP</Label>
                      <Input id="cep" placeholder="00000-000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endereco">Endereço</Label>
                      <Input id="endereco" placeholder="Rua, número" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bairro">Bairro</Label>
                      <Input id="bairro" placeholder="Bairro" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cidade">Cidade</Label>
                      <Input id="cidade" placeholder="Cidade" />
                    </div>
                  </div>
                  <Button className="w-full">Salvar Dados Fiscais</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Billing;
