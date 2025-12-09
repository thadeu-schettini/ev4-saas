import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2,
  Shield,
  KeyRound
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Password strength indicators
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const strengthScore = [hasMinLength, hasUppercase, hasLowercase, hasNumber, hasSpecial].filter(Boolean).length;
  const strengthLabel = strengthScore <= 2 ? "Fraca" : strengthScore <= 3 ? "Média" : strengthScore <= 4 ? "Boa" : "Forte";
  const strengthColor = strengthScore <= 2 ? "bg-destructive" : strengthScore <= 3 ? "bg-yellow-500" : strengthScore <= 4 ? "bg-blue-500" : "bg-green-500";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      toast.error("Preencha todos os campos");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("As senhas não conferem");
      return;
    }
    
    if (strengthScore < 3) {
      toast.error("A senha é muito fraca. Adicione mais caracteres variados.");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSuccess(true);
    toast.success("Senha redefinida com sucesso!");
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        </div>
        
        <Card className="w-full max-w-md border-border/50 shadow-2xl animate-scale-in relative overflow-hidden">
          {/* Success gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-primary/5 pointer-events-none" />
          
          <CardContent className="pt-12 pb-10 px-8 text-center relative">
            <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/30 animate-fade-in">
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-foreground mb-3 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Senha redefinida!
            </h2>
            
            <p className="text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Sua nova senha foi configurada com sucesso. Você já pode fazer login com suas novas credenciais.
            </p>
            
            <Button 
              onClick={() => navigate("/auth")}
              className="w-full h-12 text-base font-medium group animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              Ir para o Login
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/20">
            <span className="text-xl font-bold text-primary-foreground">M</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">MedClinic</h1>
            <p className="text-xs text-muted-foreground">Sistema Médico</p>
          </div>
        </div>

        <Card className="border-border/50 shadow-2xl overflow-hidden">
          {/* Top gradient line */}
          <div className="h-1 bg-gradient-to-r from-primary via-primary/70 to-primary" />
          
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <KeyRound className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Redefinir senha</CardTitle>
            <CardDescription>
              Crie uma nova senha segura para sua conta
            </CardDescription>
          </CardHeader>
          
          <CardContent className="px-6 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Nova senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua nova senha"
                    className="pl-10 pr-10 h-12 bg-muted/30 border-border/50 focus:border-primary transition-colors"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                
                {/* Password strength indicator */}
                {password && (
                  <div className="space-y-2 animate-fade-in">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div 
                          key={level}
                          className={cn(
                            "h-1.5 flex-1 rounded-full transition-all duration-300",
                            level <= strengthScore ? strengthColor : "bg-muted"
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Força da senha: <span className={cn(
                        "font-medium",
                        strengthScore <= 2 ? "text-destructive" : 
                        strengthScore <= 3 ? "text-yellow-500" : 
                        strengthScore <= 4 ? "text-blue-500" : "text-green-500"
                      )}>{strengthLabel}</span>
                    </p>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className={cn("flex items-center gap-1.5", hasMinLength ? "text-green-500" : "text-muted-foreground")}>
                        <CheckCircle2 className="h-3 w-3" />
                        <span>8+ caracteres</span>
                      </div>
                      <div className={cn("flex items-center gap-1.5", hasUppercase ? "text-green-500" : "text-muted-foreground")}>
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Letra maiúscula</span>
                      </div>
                      <div className={cn("flex items-center gap-1.5", hasLowercase ? "text-green-500" : "text-muted-foreground")}>
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Letra minúscula</span>
                      </div>
                      <div className={cn("flex items-center gap-1.5", hasNumber ? "text-green-500" : "text-muted-foreground")}>
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Número</span>
                      </div>
                      <div className={cn("flex items-center gap-1.5 col-span-2", hasSpecial ? "text-green-500" : "text-muted-foreground")}>
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Caractere especial (!@#$%...)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar nova senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repita a nova senha"
                    className={cn(
                      "pl-10 pr-10 h-12 bg-muted/30 border-border/50 focus:border-primary transition-colors",
                      confirmPassword && password !== confirmPassword && "border-destructive focus:border-destructive"
                    )}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-destructive animate-fade-in">As senhas não conferem</p>
                )}
                {confirmPassword && password === confirmPassword && password && (
                  <p className="text-xs text-green-500 flex items-center gap-1 animate-fade-in">
                    <CheckCircle2 className="h-3 w-3" />
                    Senhas conferem
                  </p>
                )}
              </div>

              {/* Security note */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Sua senha é criptografada e armazenada de forma segura. 
                  Recomendamos não reutilizar senhas de outros serviços.
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-medium group"
                disabled={isLoading || !password || !confirmPassword || password !== confirmPassword}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Redefinindo...
                  </div>
                ) : (
                  <>
                    Redefinir senha
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Lembrou a senha?{" "}
              <button
                onClick={() => navigate("/auth")}
                className="text-primary font-medium hover:underline"
              >
                Voltar ao login
              </button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}