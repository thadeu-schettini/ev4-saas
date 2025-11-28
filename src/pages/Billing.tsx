import { useState, useEffect } from "react";
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
  ArrowRightLeft,
  Clock,
  Play,
} from "lucide-react";
import { UpgradeCelebrationModal } from "@/components/UpgradeCelebrationModal";
import { FeaturePreviewModal } from "@/components/FeaturePreviewModal";
import { useToast } from "@/hooks/use-toast";

const Billing = () => {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState("starter");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [showCelebration, setShowCelebration] = useState(false);
  const [upgradedPlan, setUpgradedPlan] = useState<any>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonPlans, setComparisonPlans] = useState<string[]>(["starter", "professional"]);
  const [showFeaturePreview, setShowFeaturePreview] = useState(false);
  const [previewFeature, setPreviewFeature] = useState<string>("");
  const [previewRequiredPlan, setPreviewRequiredPlan] = useState<string>("");
  const [trialActive, setTrialActive] = useState(false);
  const [trialEndDate, setTrialEndDate] = useState<Date | null>(null);
  const [trialDaysLeft, setTrialDaysLeft] = useState(0);

  // Calculate trial days remaining
  useEffect(() => {
    if (trialActive && trialEndDate) {
      const calculateDaysLeft = () => {
        const now = new Date();
        const diff = trialEndDate.getTime() - now.getTime();
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        setTrialDaysLeft(Math.max(0, days));
      };

      calculateDaysLeft();
      const interval = setInterval(calculateDaysLeft, 1000 * 60 * 60); // Update every hour

      return () => clearInterval(interval);
    }
  }, [trialActive, trialEndDate]);

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

  const handleStartTrial = (plan: any) => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 14); // 14 days trial
    setTrialEndDate(endDate);
    setTrialActive(true);
    setSelectedPlan(plan.id);

    toast({
      title: "Test Drive Ativado! 🎉",
      description: `Você tem 14 dias para explorar todos os recursos do plano ${plan.name}.`,
    });
  };

  const plans = [
    {
      id: "starter",
      name: "Starter",
      icon: Zap,
      monthlyPrice: 99,
      annualPrice: 950,
      color: "from-primary/10 to-primary/5",
      borderColor: "border-primary/50",
      badge: null,
      recommended: false,
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
      color: "from-primary/15 to-accent/10",
      borderColor: "border-primary",
      badge: "Mais Popular",
      recommended: true,
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
      color: "from-primary/20 to-primary-glow/15",
      borderColor: "border-primary-glow/50",
      badge: "Melhor Valor",
      recommended: false,
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

  const handleUpgrade = (plan: any) => {
    // Simulate upgrade process
    toast({
      title: "Processando upgrade...",
      description: "Aguarde enquanto processamos seu upgrade.",
    });

    setTimeout(() => {
      const currentFeatures = plans.find((p) => p.id === "starter")?.features || [];
      const newFeatures = plan.features;

      const upgradedFeatures = newFeatures.map((feature: any) => ({
        name: feature.name,
        isNew: !currentFeatures.find((cf) => cf.name === feature.name)?.included && feature.included,
      }));

      setUpgradedPlan({ ...plan, upgradedFeatures });
      setShowCelebration(true);
    }, 1500);
  };

  const lockedFeatures = [
    {
      title: "Telemedicina Integrada",
      description: "Realize consultas online com sala virtual integrada",
      requiredPlan: "Professional",
      icon: Shield,
      previewId: "telemedicina",
    },
    {
      title: "IA Ilimitada",
      description: "Assistente de IA sem limites de uso mensal",
      requiredPlan: "Enterprise",
      icon: Sparkles,
      previewId: "ia-ilimitada",
    },
    {
      title: "Relatórios Avançados",
      description: "Analytics completo com insights de negócio",
      requiredPlan: "Professional",
      icon: TrendingUp,
      previewId: "relatorios-avancados",
    },
    {
      title: "Gestor de Conta Dedicado",
      description: "Suporte personalizado com gestor exclusivo",
      requiredPlan: "Enterprise",
      icon: Crown,
      previewId: "gestor-dedicado",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Celebration Modal */}
      {upgradedPlan && (
        <UpgradeCelebrationModal
          open={showCelebration}
          onOpenChange={setShowCelebration}
          planName={upgradedPlan.name}
          features={upgradedPlan.upgradedFeatures}
          icon={upgradedPlan.icon}
        />
      )}

      {/* Feature Preview Modal */}
      <FeaturePreviewModal
        open={showFeaturePreview}
        onOpenChange={setShowFeaturePreview}
        feature={previewFeature}
        requiredPlan={previewRequiredPlan}
        onUpgrade={() => {
          setShowFeaturePreview(false);
          const plan = plans.find((p) => p.name === previewRequiredPlan);
          if (plan) {
            setSelectedPlan(plan.id);
            document.getElementById("upgrade-dialog-trigger")?.click();
          }
        }}
      />
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
        {/* Trial Banner */}
        {trialActive && (
          <Card className="border-2 border-primary/50 bg-gradient-to-r from-primary/10 to-accent/5 animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Test Drive Premium Ativo</h3>
                    <p className="text-sm text-muted-foreground">
                      Você tem <span className="font-bold text-foreground">{trialDaysLeft} dias</span> restantes para explorar todos os recursos premium
                    </p>
                  </div>
                </div>
                <Button size="lg" className="gap-2">
                  <Crown className="h-4 w-4" />
                  Converter em Plano Pago
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

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

        {/* Locked Features Section */}
        <Card className="border-2 border-warning/30 bg-gradient-to-br from-warning/5 via-background to-warning/10 animate-fade-in">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-warning/20 flex items-center justify-center">
                <Lock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <CardTitle className="text-lg sm:text-xl">Recursos Premium Bloqueados</CardTitle>
                <CardDescription className="text-sm">Faça upgrade para desbloquear funcionalidades avançadas</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {lockedFeatures.map((feature, idx) => {
                const FeatureIcon = feature.icon;
                return (
                  <div
                    key={idx}
                    className="relative overflow-hidden rounded-lg border-2 border-dashed border-muted-foreground/30 p-4 bg-muted/20 hover:bg-muted/40 transition-all group"
                  >
                    <div className="absolute top-2 right-2">
                      <div className="h-8 w-8 rounded-full bg-warning/20 flex items-center justify-center">
                        <Lock className="h-4 w-4 text-warning" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 opacity-50">
                          <FeatureIcon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground/70">{feature.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t gap-2">
                        <Badge variant="outline" className="gap-1">
                          <Crown className="h-3 w-3" />
                          {feature.requiredPlan}
                        </Badge>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => {
                              setPreviewFeature(feature.previewId);
                              setPreviewRequiredPlan(feature.requiredPlan);
                              setShowFeaturePreview(true);
                            }}
                          >
                            <Play className="h-3 w-3" />
                            Preview
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => {
                              const plan = plans.find((p) => p.name === feature.requiredPlan);
                              if (plan) {
                                setSelectedPlan(plan.id);
                                document.getElementById("upgrade-dialog-trigger")?.click();
                              }
                            }}
                          >
                            <Unlock className="h-3 w-3" />
                            Desbloquear
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Unlock More Section */}
        <Card className="border-2 border-primary/50 bg-gradient-to-r from-primary/5 to-accent/5 animate-fade-in">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2"
                  onClick={() => setShowComparison(true)}
                >
                  <ArrowRightLeft className="h-4 w-4" />
                  Comparar Planos
                </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button id="upgrade-dialog-trigger" size="lg" className="gap-2">
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
                          className={`relative transition-all hover:scale-[1.02] cursor-pointer ${
                            selectedPlan === plan.id ? "ring-2 ring-primary" : ""
                          } ${plan.recommended ? "border-2 border-primary" : ""}`}
                          onClick={() => setSelectedPlan(plan.id)}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-30`} />
                          
                          <CardHeader className="relative space-y-4">
                            {/* Badge Section */}
                            {plan.recommended && (
                              <Badge className="gap-1 bg-primary text-primary-foreground border-0 shadow-sm w-fit">
                                <Sparkles className="h-3 w-3" />
                                Recomendado para você
                              </Badge>
                            )}
                            {plan.badge && !plan.recommended && (
                              <Badge variant="outline" className="gap-1 w-fit">
                                <Crown className="h-3 w-3" />
                                {plan.badge}
                              </Badge>
                            )}
                            
                            {/* Plan Info */}
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
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
                            </div>
                          </CardHeader>
                          <CardContent className="relative space-y-4">
                            <div className="space-y-2">
                              {plan.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  {feature.included ? (
                                    <Check className="h-4 w-4 text-success shrink-0" />
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
                            <div className="space-y-2">
                              <Button
                                className="w-full"
                                variant={selectedPlan === plan.id ? "default" : "outline"}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (plan.id !== "starter") {
                                    handleUpgrade(plan);
                                  }
                                }}
                                disabled={plan.id === "starter"}
                              >
                                {plan.id === "starter" ? "Plano Atual" : "Fazer Upgrade"}
                              </Button>
                              {plan.id !== "starter" && !trialActive && (
                                <Button
                                  className="w-full gap-2"
                                  variant="ghost"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStartTrial(plan);
                                  }}
                                >
                                  <Clock className="h-4 w-4" />
                                  Testar por 14 dias
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </DialogContent>
              </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plan Comparison Dialog */}
        <Dialog open={showComparison} onOpenChange={setShowComparison}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-3xl">Comparador de Planos</DialogTitle>
              <DialogDescription className="text-base">
                Compare planos lado a lado para escolher o melhor para você
              </DialogDescription>
            </DialogHeader>

            {/* Plan Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="space-y-2">
                <Label>Plano 1</Label>
                <select
                  className="w-full px-3 py-2 border rounded-lg bg-background text-sm"
                  value={comparisonPlans[0]}
                  onChange={(e) => setComparisonPlans([e.target.value, comparisonPlans[1]])}
                >
                  {plans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Plano 2</Label>
                <select
                  className="w-full px-3 py-2 border rounded-lg bg-background text-sm"
                  value={comparisonPlans[1]}
                  onChange={(e) => setComparisonPlans([comparisonPlans[0], e.target.value])}
                >
                  {plans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {comparisonPlans.map((planId) => {
                const plan = plans.find((p) => p.id === planId);
                if (!plan) return null;

                const PlanIcon = plan.icon;
                const savings = calculateSavings(plan.monthlyPrice, plan.annualPrice);

                return (
                  <Card key={plan.id} className="relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-30`} />
                    {plan.badge && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="gap-1">
                          <Crown className="h-3 w-3" />
                          {plan.badge}
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="relative">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                          <PlanIcon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">{plan.name}</CardTitle>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-muted-foreground">Mensal</div>
                          <div className="text-2xl font-bold">R$ {plan.monthlyPrice}/mês</div>
                        </div>
                        <div className="pt-3 border-t">
                          <div className="text-sm text-muted-foreground">Anual</div>
                          <div className="text-2xl font-bold">R$ {plan.annualPrice}/ano</div>
                          <p className="text-sm text-success mt-1">
                            Economize R$ {savings.savings} ({savings.percentage}%)
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="relative space-y-4">
                      <div className="space-y-3">
                        {plan.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center gap-2 p-2 rounded ${
                              feature.included ? "bg-success/10" : "bg-muted/50"
                            }`}
                          >
                            {feature.included ? (
                              <Check className="h-4 w-4 text-success shrink-0" />
                            ) : (
                              <X className="h-4 w-4 text-muted-foreground shrink-0" />
                            )}
                            <span
                              className={`text-sm ${
                                !feature.included ? "text-muted-foreground line-through" : ""
                              }`}
                            >
                              {feature.name}
                            </span>
                          </div>
                        ))}
                      </div>
                      <Button
                        className="w-full"
                        variant={plan.id === "starter" ? "outline" : "default"}
                        onClick={() => {
                          if (plan.id !== "starter") {
                            setShowComparison(false);
                            handleUpgrade(plan);
                          }
                        }}
                        disabled={plan.id === "starter"}
                      >
                        {plan.id === "starter" ? "Plano Atual" : "Escolher este plano"}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </DialogContent>
        </Dialog>

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
                          <div className="h-10 w-10 rounded-full bg-success/20 flex items-center justify-center">
                            <Check className="h-5 w-5 text-success" />
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
