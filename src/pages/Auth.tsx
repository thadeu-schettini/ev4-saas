import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Check,
  Sparkles,
  Shield,
  Zap,
  Crown,
  Tag,
  Building2,
  Phone
} from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "R$ 97",
    period: "/mês",
    description: "Ideal para profissionais autônomos",
    features: [
      "Até 100 pacientes",
      "Agenda básica",
      "Prontuário eletrônico",
      "Suporte por email"
    ],
    icon: Zap,
    gradient: "from-blue-500 to-cyan-500",
    popular: false
  },
  {
    id: "professional",
    name: "Professional",
    price: "R$ 197",
    period: "/mês",
    description: "Para clínicas em crescimento",
    features: [
      "Pacientes ilimitados",
      "Agenda avançada",
      "Prontuário completo",
      "Relatórios e métricas",
      "Suporte prioritário",
      "Integrações"
    ],
    icon: Crown,
    gradient: "from-primary to-primary/70",
    popular: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "R$ 397",
    period: "/mês",
    description: "Solução completa para clínicas",
    features: [
      "Tudo do Professional",
      "Multi-unidades",
      "API personalizada",
      "Gerente de conta dedicado",
      "SLA garantido",
      "Customizações"
    ],
    icon: Shield,
    gradient: "from-purple-500 to-pink-500",
    popular: false
  }
];

export default function Auth() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("professional");
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [step, setStep] = useState(1); // 1: dados pessoais, 2: plano
  
  // Form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerClinic, setRegisterClinic] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast.error("Preencha todos os campos");
      return;
    }
    toast.success("Login realizado com sucesso!");
    navigate("/");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!registerName || !registerEmail || !registerPassword || !registerConfirmPassword) {
        toast.error("Preencha todos os campos obrigatórios");
        return;
      }
      if (registerPassword !== registerConfirmPassword) {
        toast.error("As senhas não conferem");
        return;
      }
      if (registerPassword.length < 6) {
        toast.error("A senha deve ter pelo menos 6 caracteres");
        return;
      }
      setStep(2);
      return;
    }
    
    if (!acceptTerms) {
      toast.error("Aceite os termos de uso para continuar");
      return;
    }
    toast.success("Conta criada com sucesso!");
    navigate("/");
  };

  const handleRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryEmail) {
      toast.error("Informe seu email");
      return;
    }
    toast.success("Email de recuperação enviado!");
    setActiveTab("login");
  };

  const applyCoupon = () => {
    if (!couponCode) {
      toast.error("Informe um cupom");
      return;
    }
    // Simulating coupon validation
    if (couponCode.toUpperCase() === "MEDCLINIC20") {
      setCouponApplied(true);
      toast.success("Cupom aplicado! 20% de desconto");
    } else {
      toast.error("Cupom inválido");
    }
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-40 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white/10 rounded-full blur-2xl animate-pulse delay-500" />
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm shadow-2xl">
                <span className="text-3xl font-bold">M</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold">MedClinic</h1>
                <p className="text-white/70">Sistema Médico Inteligente</p>
              </div>
            </div>
            
            <h2 className="text-4xl xl:text-5xl font-bold leading-tight mb-6">
              Transforme a gestão
              <br />
              <span className="text-white/80">da sua clínica</span>
            </h2>
            
            <p className="text-lg text-white/70 max-w-md leading-relaxed">
              Prontuário eletrônico, agendamento inteligente e gestão financeira 
              em uma única plataforma moderna e intuitiva.
            </p>
          </div>
          
          {/* Features */}
          <div className="space-y-4">
            {[
              { icon: Sparkles, text: "IA integrada para auxílio clínico" },
              { icon: Shield, text: "Dados seguros e criptografados" },
              { icon: Zap, text: "Interface rápida e intuitiva" }
            ].map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 text-white/90"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                  <feature.icon className="h-5 w-5" />
                </div>
                <span className="text-lg">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Right Side - Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg">
              <span className="text-xl font-bold text-primary-foreground">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">MedClinic</h1>
              <p className="text-xs text-muted-foreground">Sistema Médico</p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={(value) => {
            setActiveTab(value);
            if (value === "register") setStep(1);
          }} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-muted/50 p-1 h-12">
              <TabsTrigger 
                value="login" 
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300 data-[state=active]:scale-[1.02]"
              >
                Entrar
              </TabsTrigger>
              <TabsTrigger 
                value="register"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300 data-[state=active]:scale-[1.02]"
              >
                Criar Conta
              </TabsTrigger>
              <TabsTrigger 
                value="recovery"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300 data-[state=active]:scale-[1.02]"
              >
                Recuperar
              </TabsTrigger>
            </TabsList>

            {/* Login */}
            <TabsContent value="login" className="mt-0 animate-fade-in" key="login">
              <Card className="border-0 shadow-none bg-transparent">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl font-bold">Bem-vindo de volta</CardTitle>
                  <CardDescription>
                    Entre com suas credenciais para acessar o sistema
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0 space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="login-email"
                          type="email"
                          placeholder="seu@email.com"
                          className="pl-10 h-12 bg-muted/30 border-border/50 focus:border-primary"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="login-password">Senha</Label>
                        <button 
                          type="button"
                          onClick={() => setActiveTab("recovery")}
                          className="text-xs text-primary hover:underline"
                        >
                          Esqueceu a senha?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10 h-12 bg-muted/30 border-border/50 focus:border-primary"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full h-12 text-base font-medium group">
                      Entrar
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border/50" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        ou continue com
                      </span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full h-12 gap-2">
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </Button>

                  <p className="text-center text-sm text-muted-foreground mt-6">
                    Não tem uma conta?{" "}
                    <button
                      onClick={() => { setActiveTab("register"); setStep(1); }}
                      className="text-primary font-medium hover:underline"
                    >
                      Criar conta grátis
                    </button>
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Register */}
            <TabsContent value="register" className="mt-0 animate-fade-in" key={`register-${step}`}>
              <Card className="border-0 shadow-none bg-transparent">
                <CardHeader className="px-0 pt-0">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-2xl font-bold">
                      {step === 1 ? "Crie sua conta" : "Escolha seu plano"}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      Passo {step} de 2
                    </Badge>
                  </div>
                  <CardDescription>
                    {step === 1 
                      ? "Preencha seus dados para começar" 
                      : "Selecione o plano ideal para sua clínica"
                    }
                  </CardDescription>
                  
                  {/* Progress bar */}
                  <div className="flex gap-2 mt-4">
                    <div className={cn(
                      "h-1 flex-1 rounded-full transition-colors",
                      step >= 1 ? "bg-primary" : "bg-muted"
                    )} />
                    <div className={cn(
                      "h-1 flex-1 rounded-full transition-colors",
                      step >= 2 ? "bg-primary" : "bg-muted"
                    )} />
                  </div>
                </CardHeader>
                
                <CardContent className="px-0">
                  <form onSubmit={handleRegister} className="space-y-4">
                    {step === 1 ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="register-name">Nome completo *</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              id="register-name"
                              placeholder="Dr. João Silva"
                              className="pl-10 h-12 bg-muted/30 border-border/50 focus:border-primary"
                              value={registerName}
                              onChange={(e) => setRegisterName(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="register-email">Email *</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              id="register-email"
                              type="email"
                              placeholder="seu@email.com"
                              className="pl-10 h-12 bg-muted/30 border-border/50 focus:border-primary"
                              value={registerEmail}
                              onChange={(e) => setRegisterEmail(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label htmlFor="register-phone">Telefone</Label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input 
                                id="register-phone"
                                placeholder="(11) 99999-9999"
                                className="pl-10 h-12 bg-muted/30 border-border/50 focus:border-primary"
                                value={registerPhone}
                                onChange={(e) => setRegisterPhone(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="register-clinic">Clínica</Label>
                            <div className="relative">
                              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input 
                                id="register-clinic"
                                placeholder="Nome da clínica"
                                className="pl-10 h-12 bg-muted/30 border-border/50 focus:border-primary"
                                value={registerClinic}
                                onChange={(e) => setRegisterClinic(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="register-password">Senha *</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              id="register-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Mínimo 6 caracteres"
                              className="pl-10 pr-10 h-12 bg-muted/30 border-border/50 focus:border-primary"
                              value={registerPassword}
                              onChange={(e) => setRegisterPassword(e.target.value)}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="register-confirm-password">Confirmar senha *</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              id="register-confirm-password"
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Repita a senha"
                              className="pl-10 pr-10 h-12 bg-muted/30 border-border/50 focus:border-primary"
                              value={registerConfirmPassword}
                              onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        <Button type="submit" className="w-full h-12 text-base font-medium group">
                          Continuar
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </>
                    ) : (
                      <>
                        {/* Plan Selection */}
                        <div className="space-y-3">
                          {plans.map((plan) => (
                            <div
                              key={plan.id}
                              onClick={() => setSelectedPlan(plan.id)}
                              className={cn(
                                "relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                                selectedPlan === plan.id
                                  ? "border-primary bg-primary/5 shadow-md"
                                  : "border-border/50 hover:border-border bg-card/50 hover:bg-card"
                              )}
                            >
                              {plan.popular && (
                                <Badge className="absolute -top-2.5 right-4 bg-primary text-primary-foreground text-xs">
                                  Mais popular
                                </Badge>
                              )}
                              
                              <div className="flex items-start gap-4">
                                <div className={cn(
                                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br",
                                  plan.gradient
                                )}>
                                  <plan.icon className="h-6 w-6 text-white" />
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-baseline justify-between mb-1">
                                    <h3 className="font-semibold text-foreground">{plan.name}</h3>
                                    <div className="text-right">
                                      <span className="text-lg font-bold text-foreground">
                                        {couponApplied ? (
                                          <>
                                            <span className="line-through text-muted-foreground text-sm mr-1">
                                              {plan.price}
                                            </span>
                                            R$ {(parseInt(plan.price.replace(/\D/g, '')) * 0.8).toFixed(0)}
                                          </>
                                        ) : plan.price}
                                      </span>
                                      <span className="text-xs text-muted-foreground">{plan.period}</span>
                                    </div>
                                  </div>
                                  <p className="text-xs text-muted-foreground mb-2">{plan.description}</p>
                                  
                                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                                    {plan.features.slice(0, 3).map((feature, i) => (
                                      <span key={i} className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Check className="h-3 w-3 text-primary" />
                                        {feature}
                                      </span>
                                    ))}
                                    {plan.features.length > 3 && (
                                      <span className="text-xs text-primary">
                                        +{plan.features.length - 3} mais
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className={cn(
                                  "h-5 w-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors",
                                  selectedPlan === plan.id
                                    ? "border-primary bg-primary"
                                    : "border-border"
                                )}>
                                  {selectedPlan === plan.id && (
                                    <Check className="h-3 w-3 text-primary-foreground" />
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Coupon */}
                        <div className="space-y-2 pt-2">
                          <Label htmlFor="coupon" className="text-sm flex items-center gap-2">
                            <Tag className="h-4 w-4" />
                            Cupom de desconto
                          </Label>
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <Input 
                                id="coupon"
                                placeholder="Digite seu cupom"
                                className="h-11 bg-muted/30 border-border/50 focus:border-primary uppercase"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                disabled={couponApplied}
                              />
                              {couponApplied && (
                                <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                              )}
                            </div>
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={applyCoupon}
                              disabled={couponApplied}
                              className="h-11"
                            >
                              {couponApplied ? "Aplicado" : "Aplicar"}
                            </Button>
                          </div>
                          {couponApplied && (
                            <p className="text-xs text-green-600 flex items-center gap-1">
                              <Sparkles className="h-3 w-3" />
                              Desconto de 20% aplicado em todos os planos!
                            </p>
                          )}
                        </div>

                        {/* Terms */}
                        <div className="flex items-start gap-2 pt-2">
                          <Checkbox 
                            id="terms" 
                            checked={acceptTerms}
                            onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                            className="mt-0.5"
                          />
                          <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                            Li e aceito os{" "}
                            <a href="#" className="text-primary hover:underline">Termos de Uso</a>
                            {" "}e a{" "}
                            <a href="#" className="text-primary hover:underline">Política de Privacidade</a>
                          </label>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-2">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setStep(1)}
                            className="h-12"
                          >
                            Voltar
                          </Button>
                          <Button type="submit" className="flex-1 h-12 text-base font-medium group">
                            Criar conta
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </>
                    )}
                  </form>

                  <p className="text-center text-sm text-muted-foreground mt-6">
                    Já tem uma conta?{" "}
                    <button
                      onClick={() => setActiveTab("login")}
                      className="text-primary font-medium hover:underline"
                    >
                      Fazer login
                    </button>
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Password Recovery */}
            <TabsContent value="recovery" className="mt-0 animate-fade-in" key="recovery">
              <Card className="border-0 shadow-none bg-transparent">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl font-bold">Recuperar senha</CardTitle>
                  <CardDescription>
                    Informe seu email e enviaremos instruções para redefinir sua senha
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0 space-y-4">
                  <form onSubmit={handleRecovery} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="recovery-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="recovery-email"
                          type="email"
                          placeholder="seu@email.com"
                          className="pl-10 h-12 bg-muted/30 border-border/50 focus:border-primary"
                          value={recoveryEmail}
                          onChange={(e) => setRecoveryEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full h-12 text-base font-medium group">
                      Enviar link de recuperação
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>

                  <p className="text-center text-sm text-muted-foreground mt-6">
                    Lembrou a senha?{" "}
                    <button
                      onClick={() => setActiveTab("login")}
                      className="text-primary font-medium hover:underline"
                    >
                      Voltar ao login
                    </button>
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}