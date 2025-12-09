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
  X,
  Sparkles,
  Shield,
  Zap,
  Crown,
  Building2,
  Phone,
  Gift,
  TrendingUp,
  Star,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

type AuthView = "login" | "register" | "recovery";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 97,
    originalPrice: null,
    period: "/mês",
    description: "Para começar",
    features: [
      { text: "Até 100 pacientes", included: true },
      { text: "1 profissional", included: true },
      { text: "Agenda básica", included: true },
      { text: "Prontuário eletrônico", included: true },
      { text: "Suporte por email", included: true },
      { text: "Relatórios avançados", included: false },
      { text: "IA integrada", included: false },
      { text: "Multi-unidades", included: false },
    ],
    icon: Zap,
    gradient: "from-slate-400 to-slate-500",
    savings: null,
    badge: null,
    highlight: false
  },
  {
    id: "professional",
    name: "Professional",
    price: 197,
    originalPrice: null,
    period: "/mês",
    description: "Mais escolhido",
    features: [
      { text: "Pacientes ilimitados", included: true },
      { text: "5 profissionais", included: true },
      { text: "Agenda avançada", included: true },
      { text: "Prontuário completo", included: true },
      { text: "Suporte prioritário", included: true },
      { text: "Relatórios avançados", included: true },
      { text: "IA integrada", included: false },
      { text: "Multi-unidades", included: false },
    ],
    icon: Crown,
    gradient: "from-primary to-blue-600",
    savings: null,
    badge: "Popular",
    highlight: false
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 397,
    originalPrice: 597,
    period: "/mês",
    description: "Máximo retorno",
    features: [
      { text: "Pacientes ilimitados", included: true },
      { text: "Profissionais ilimitados", included: true },
      { text: "Agenda inteligente com IA", included: true },
      { text: "Prontuário com IA integrada", included: true },
      { text: "Gerente de conta dedicado", included: true },
      { text: "Relatórios executivos", included: true },
      { text: "IA para diagnósticos", included: true },
      { text: "Multi-unidades + API", included: true },
    ],
    icon: Shield,
    gradient: "from-amber-500 to-orange-500",
    savings: "Economize R$ 200/mês",
    badge: "Melhor Custo-Benefício",
    highlight: true
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
      {/* Left Side - Branding (Fixed) */}
      <div className="hidden lg:flex lg:w-1/2 fixed left-0 top-0 bottom-0 overflow-hidden">
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

      {/* Right Side - Forms (Scrollable) */}
      <div className="w-full lg:w-1/2 lg:ml-[50%] min-h-screen flex items-center justify-center px-6 py-8 sm:px-8 md:px-12 lg:px-12 bg-background overflow-y-auto">
        <div className="w-full max-w-md mx-auto">
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
                {/* ROI Calculator Teaser */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Clínicas Enterprise faturam em média 40% mais</p>
                      <p className="text-xs text-muted-foreground">Automações e IA liberam seu tempo para mais atendimentos</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  {plans.map((plan) => (
                    <div key={plan.id} className={plan.badge ? "pt-3" : ""}>
                      <Card 
                        onClick={() => setSelectedPlan(plan.id)}
                        className={cn(
                          "relative cursor-pointer transition-all duration-300 border-2",
                          plan.highlight && "ring-2 ring-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.15)]",
                          selectedPlan === plan.id 
                            ? "border-primary shadow-lg scale-[1.02]" 
                            : plan.highlight 
                              ? "border-amber-500/50 hover:border-amber-500" 
                              : "border-transparent hover:border-primary/30"
                        )}
                      >
                      {/* Highlight Glow Effect */}
                      {plan.highlight && (
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5 pointer-events-none" />
                      )}
                      
                      {plan.badge && (
                        <Badge className={cn(
                          "absolute -top-2.5 left-1/2 -translate-x-1/2 shadow-lg",
                          plan.highlight 
                            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0" 
                            : "bg-primary text-primary-foreground"
                        )}>
                          {plan.badge}
                        </Badge>
                      )}
                      
                      <CardContent className="p-4 relative">
                        <div className="flex items-start gap-4">
                          <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0", plan.gradient)}>
                            <plan.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-2 flex-wrap">
                              <h3 className="font-bold text-lg">{plan.name}</h3>
                              {plan.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">R$ {plan.originalPrice}</span>
                              )}
                              <span className={cn(
                                "text-xl font-bold",
                                plan.highlight ? "text-amber-600" : "text-primary"
                              )}>R$ {plan.price}</span>
                              <span className="text-sm text-muted-foreground">{plan.period}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{plan.description}</p>
                            {plan.savings && (
                              <Badge variant="secondary" className="mt-2 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                                <Sparkles className="w-3 h-3 mr-1" />
                                {plan.savings}
                              </Badge>
                            )}
                          </div>
                          <div className={cn(
                            "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all mt-1",
                            selectedPlan === plan.id 
                              ? plan.highlight ? "border-amber-500 bg-amber-500" : "border-primary bg-primary"
                              : "border-muted-foreground/30"
                          )}>
                            {selectedPlan === plan.id && <Check className="w-4 h-4 text-white" />}
                          </div>
                        </div>
                        
                        {/* Features List - Always visible */}
                        <div className="mt-4 pt-4 border-t space-y-2">
                          {plan.features.map((feature, index) => (
                            <div 
                              key={index} 
                              className={cn(
                                "flex items-center gap-2 text-sm",
                                feature.included ? "text-foreground" : "text-muted-foreground/50"
                              )}
                            >
                              {feature.included ? (
                                <Check className={cn(
                                  "w-4 h-4 shrink-0",
                                  plan.highlight ? "text-amber-500" : "text-emerald-500"
                                )} />
                              ) : (
                                <X className="w-4 h-4 text-muted-foreground/30 shrink-0" />
                              )}
                              <span className={!feature.included ? "line-through" : ""}>{feature.text}</span>
                            </div>
                          ))}
                        </div>

                        {/* Enterprise Exclusive Benefits */}
                        {plan.highlight && (
                          <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                            <div className="flex items-center gap-2 text-sm font-medium text-amber-700 mb-2">
                              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                              Exclusivo Enterprise
                            </div>
                            <ul className="space-y-1 text-xs text-muted-foreground">
                              <li className="flex items-center gap-1.5">
                                <Zap className="w-3 h-3 text-amber-500" />
                                Onboarding personalizado gratuito
                              </li>
                              <li className="flex items-center gap-1.5">
                                <Shield className="w-3 h-3 text-amber-500" />
                                Migração de dados sem custo
                              </li>
                              <li className="flex items-center gap-1.5">
                                <Clock className="w-3 h-3 text-amber-500" />
                                Suporte 24/7 com SLA de 1h
                              </li>
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    </div>
                  ))}
                </div>

                {/* Social Proof */}
                <div className="flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-blue-600 border-2 border-background flex items-center justify-center">
                        <User className="w-3 h-3 text-white" />
                      </div>
                    ))}
                  </div>
                  <span>+2.847 clínicas já usam o plano Enterprise</span>
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