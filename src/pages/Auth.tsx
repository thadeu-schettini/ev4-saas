import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
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
  ArrowLeft,
  Check,
  Sparkles,
  Shield,
  Zap,
  Crown,
  Building2,
  Phone,
  Gift
} from "lucide-react";
import { cn } from "@/lib/utils";

type AuthView = "login" | "register" | "recovery";

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
    gradient: "from-emerald-500 to-teal-500",
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
      "Suporte prioritário"
    ],
    icon: Crown,
    gradient: "from-primary to-blue-600",
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
      "Gerente dedicado",
      "SLA garantido"
    ],
    icon: Shield,
    gradient: "from-amber-500 to-orange-500",
    popular: false
  }
];

export default function Auth() {
  const navigate = useNavigate();
  const [view, setView] = useState<AuthView>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("professional");
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [step, setStep] = useState(1);
  
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
    setView("login");
  };

  const applyCoupon = () => {
    if (!couponCode) {
      toast.error("Informe um cupom");
      return;
    }
    if (couponCode.toUpperCase() === "MEDCLINIC20") {
      setCouponApplied(true);
      toast.success("Cupom aplicado! 20% de desconto");
    } else {
      toast.error("Cupom inválido");
    }
  };

  const changeView = (newView: AuthView) => {
    setView(newView);
    setStep(1);
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-blue-600">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-40 right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
          </div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }} />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 text-white">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl">
                <Building2 className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">MedClinic</h1>
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
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/15 hover:translate-x-2"
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <feature.icon className="w-6 h-6" />
                </div>
                <span className="text-lg font-medium">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-16 flex gap-12">
            {[
              { value: "5.000+", label: "Clínicas ativas" },
              { value: "99.9%", label: "Uptime garantido" },
              { value: "4.9★", label: "Avaliação média" }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">MedClinic</h1>
              <p className="text-xs text-muted-foreground">Sistema Médico</p>
            </div>
          </div>

          {/* Login View */}
          {view === "login" && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tight mb-2">Bem-vindo de volta</h2>
                <p className="text-muted-foreground">Entre com suas credenciais para acessar</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-sm font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input 
                      id="login-email"
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-12 h-12 rounded-xl border-border/50 bg-muted/30 focus:bg-background transition-colors"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password" className="text-sm font-medium">Senha</Label>
                    <button 
                      type="button"
                      onClick={() => changeView("recovery")}
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      Esqueceu a senha?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input 
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-12 pr-12 h-12 rounded-xl border-border/50 bg-muted/30 focus:bg-background transition-colors"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold group">
                  Entrar
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-3 text-muted-foreground">ou continue com</span>
                </div>
              </div>

              <Button variant="outline" className="w-full h-12 rounded-xl gap-3 font-medium">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>

              <p className="text-center text-muted-foreground mt-8">
                Não tem uma conta?{" "}
                <button
                  onClick={() => changeView("register")}
                  className="text-primary font-semibold hover:text-primary/80 transition-colors"
                >
                  Criar conta grátis
                </button>
              </p>
            </div>
          )}

          {/* Register View - Step 1 */}
          {view === "register" && step === 1 && (
            <div className="animate-fade-in">
              <button 
                onClick={() => changeView("login")}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar ao login
              </button>

              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold tracking-tight mb-2">Crie sua conta</h2>
                <p className="text-muted-foreground">Preencha seus dados para começar</p>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">1</div>
                  <span className="text-sm font-medium">Dados</span>
                </div>
                <div className="w-12 h-0.5 bg-border" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-semibold">2</div>
                  <span className="text-sm text-muted-foreground">Plano</span>
                </div>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="register-name" className="text-sm font-medium">Nome *</Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        id="register-name"
                        placeholder="João"
                        className="pl-11 h-11 rounded-xl border-border/50 bg-muted/30 focus:bg-background transition-colors"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-clinic" className="text-sm font-medium">Clínica</Label>
                    <Input 
                      id="register-clinic"
                      placeholder="Nome da clínica"
                      className="h-11 rounded-xl border-border/50 bg-muted/30 focus:bg-background transition-colors"
                      value={registerClinic}
                      onChange={(e) => setRegisterClinic(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-phone" className="text-sm font-medium">Telefone</Label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      id="register-phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      className="pl-11 h-11 rounded-xl border-border/50 bg-muted/30 focus:bg-background transition-colors"
                      value={registerPhone}
                      onChange={(e) => setRegisterPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-sm font-medium">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      id="register-email"
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-11 h-11 rounded-xl border-border/50 bg-muted/30 focus:bg-background transition-colors"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-sm font-medium">Senha *</Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••"
                        className="pl-11 pr-10 h-11 rounded-xl border-border/50 bg-muted/30 focus:bg-background transition-colors"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm" className="text-sm font-medium">Confirmar *</Label>
                    <div className="relative">
                      <Input 
                        id="register-confirm"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••"
                        className="pr-10 h-11 rounded-xl border-border/50 bg-muted/30 focus:bg-background transition-colors"
                        value={registerConfirmPassword}
                        onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold group mt-2">
                  Continuar
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>
          )}

          {/* Register View - Step 2 */}
          {view === "register" && step === 2 && (
            <div className="animate-fade-in">
              <button 
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar aos dados
              </button>

              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold tracking-tight mb-2">Escolha seu plano</h2>
                <p className="text-muted-foreground">Selecione o plano ideal para sua clínica</p>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">Dados</span>
                </div>
                <div className="w-12 h-0.5 bg-primary" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">2</div>
                  <span className="text-sm font-medium">Plano</span>
                </div>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                {/* Plan Cards */}
                <div className="space-y-3">
                  {plans.map((plan) => (
                    <Card 
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={cn(
                        "relative cursor-pointer transition-all duration-300 hover:shadow-lg border-2",
                        selectedPlan === plan.id 
                          ? "border-primary shadow-lg scale-[1.02]" 
                          : "border-transparent hover:border-primary/30"
                      )}
                    >
                      {plan.popular && (
                        <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground shadow-lg">
                          Mais Popular
                        </Badge>
                      )}
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0", plan.gradient)}>
                            <plan.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-2 flex-wrap">
                              <h3 className="font-bold text-lg">{plan.name}</h3>
                              <span className="text-xl font-bold text-primary">{plan.price}</span>
                              <span className="text-sm text-muted-foreground">{plan.period}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{plan.description}</p>
                          </div>
                          <div className={cn(
                            "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
                            selectedPlan === plan.id 
                              ? "border-primary bg-primary" 
                              : "border-muted-foreground/30"
                          )}>
                            {selectedPlan === plan.id && <Check className="w-4 h-4 text-primary-foreground" />}
                          </div>
                        </div>
                        
                        {selectedPlan === plan.id && (
                          <div className="mt-4 pt-4 border-t flex flex-wrap gap-2 animate-fade-in">
                            {plan.features.map((feature, index) => (
                              <Badge key={index} variant="secondary" className="text-xs font-normal">
                                <Check className="w-3 h-3 mr-1" />
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Coupon Section */}
                <Card className="border-dashed border-2">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Gift className="w-5 h-5 text-primary" />
                      <span className="font-medium">Tem um cupom de desconto?</span>
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Ex: MEDCLINIC20" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        disabled={couponApplied}
                        className="h-10 rounded-lg"
                      />
                      <Button 
                        type="button" 
                        variant={couponApplied ? "secondary" : "outline"}
                        onClick={applyCoupon}
                        disabled={couponApplied || !couponCode}
                        className="shrink-0"
                      >
                        {couponApplied ? (
                          <>
                            <Check className="w-4 h-4 mr-1" />
                            Aplicado
                          </>
                        ) : (
                          "Aplicar"
                        )}
                      </Button>
                    </div>
                    {couponApplied && (
                      <p className="text-sm text-emerald-600 mt-2 flex items-center gap-1 animate-fade-in">
                        <Sparkles className="w-4 h-4" />
                        20% de desconto aplicado!
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Terms */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/30">
                  <Checkbox 
                    id="terms" 
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    className="mt-0.5"
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                    Concordo com os{" "}
                    <button type="button" className="text-primary hover:underline">Termos de Uso</button>
                    {" "}e{" "}
                    <button type="button" className="text-primary hover:underline">Política de Privacidade</button>
                  </label>
                </div>

                <Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold group">
                  Finalizar Cadastro
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>
          )}

          {/* Recovery View */}
          {view === "recovery" && (
            <div className="animate-fade-in">
              <button 
                onClick={() => changeView("login")}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar ao login
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Recuperar senha</h2>
                <p className="text-muted-foreground">Digite seu email para receber o link de recuperação</p>
              </div>

              <form onSubmit={handleRecovery} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="recovery-email" className="text-sm font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input 
                      id="recovery-email"
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-12 h-12 rounded-xl border-border/50 bg-muted/30 focus:bg-background transition-colors"
                      value={recoveryEmail}
                      onChange={(e) => setRecoveryEmail(e.target.value)}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold group">
                  Enviar link de recuperação
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            Ao continuar, você concorda com nossos{" "}
            <button className="text-primary hover:underline">Termos</button>
            {" "}e{" "}
            <button className="text-primary hover:underline">Privacidade</button>
          </div>
        </div>
      </div>
    </div>
  );
}