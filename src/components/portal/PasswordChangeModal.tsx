import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { 
  Lock, 
  Eye, 
  EyeOff, 
  Check, 
  X,
  Shield,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

interface PasswordChangeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PasswordChangeModal({ open, onOpenChange }: PasswordChangeModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  const passwordRequirements = [
    { label: "Mínimo 8 caracteres", valid: newPassword.length >= 8 },
    { label: "Letra maiúscula", valid: /[A-Z]/.test(newPassword) },
    { label: "Letra minúscula", valid: /[a-z]/.test(newPassword) },
    { label: "Número", valid: /[0-9]/.test(newPassword) },
    { label: "Caractere especial", valid: /[!@#$%^&*]/.test(newPassword) },
  ];

  const validCount = passwordRequirements.filter(r => r.valid).length;
  const passwordStrength = (validCount / passwordRequirements.length) * 100;

  const getStrengthColor = () => {
    if (passwordStrength <= 20) return "bg-destructive";
    if (passwordStrength <= 40) return "bg-orange-500";
    if (passwordStrength <= 60) return "bg-warning";
    if (passwordStrength <= 80) return "bg-info";
    return "bg-success";
  };

  const getStrengthLabel = () => {
    if (passwordStrength <= 20) return "Muito fraca";
    if (passwordStrength <= 40) return "Fraca";
    if (passwordStrength <= 60) return "Média";
    if (passwordStrength <= 80) return "Forte";
    return "Muito forte";
  };

  const passwordsMatch = newPassword === confirmPassword && confirmPassword.length > 0;
  const isFormValid = currentPassword.length > 0 && passwordStrength === 100 && passwordsMatch;

  const handleSubmit = () => {
    if (!isFormValid) return;
    
    // Simulate password change
    setTimeout(() => {
      setSuccess(true);
      toast.success("Senha alterada com sucesso!");
    }, 1000);
  };

  if (success) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-xl border-2 border-primary/20 rounded-2xl shadow-2xl">
          <div className="flex flex-col items-center py-8 text-center">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-4 animate-in zoom-in">
              <CheckCircle2 className="h-10 w-10 text-success" />
            </div>
            <h2 className="text-xl font-bold mb-2">Senha Alterada!</h2>
            <p className="text-muted-foreground mb-6">
              Sua senha foi atualizada com sucesso. Use a nova senha no próximo acesso.
            </p>
            <Button onClick={() => {
              setSuccess(false);
              onOpenChange(false);
            }}>
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-xl border-2 border-primary/20 rounded-2xl shadow-2xl">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/70">
              <Lock className="h-5 w-5 text-primary-foreground" />
            </div>
            Alterar Senha
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {/* Current Password */}
          <div className="space-y-2">
            <Label>Senha Atual</Label>
            <div className="relative">
              <Input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Digite sua senha atual"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowCurrent(!showCurrent)}
              >
                {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <Label>Nova Senha</Label>
            <div className="relative">
              <Input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Digite sua nova senha"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>

            {newPassword.length > 0 && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Força da senha</span>
                    <span className={cn(
                      "font-medium",
                      passwordStrength <= 40 && "text-destructive",
                      passwordStrength > 40 && passwordStrength <= 60 && "text-warning",
                      passwordStrength > 60 && "text-success"
                    )}>
                      {getStrengthLabel()}
                    </span>
                  </div>
                  <Progress value={passwordStrength} className={cn("h-2", getStrengthColor())} />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {passwordRequirements.map((req, index) => (
                    <div 
                      key={index}
                      className={cn(
                        "flex items-center gap-2 text-xs p-2 rounded-lg transition-colors",
                        req.valid ? "bg-success/10 text-success" : "bg-muted/30 text-muted-foreground"
                      )}
                    >
                      {req.valid ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <X className="h-3 w-3" />
                      )}
                      {req.label}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label>Confirmar Nova Senha</Label>
            <div className="relative">
              <Input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirme sua nova senha"
                className={cn(
                  confirmPassword.length > 0 && !passwordsMatch && "border-destructive"
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {confirmPassword.length > 0 && !passwordsMatch && (
              <p className="text-xs text-destructive">As senhas não coincidem</p>
            )}
            {passwordsMatch && (
              <p className="text-xs text-success flex items-center gap-1">
                <Check className="h-3 w-3" />
                Senhas coincidem
              </p>
            )}
          </div>

          <div className="p-3 rounded-lg bg-info/10 text-sm flex items-start gap-2">
            <Shield className="h-4 w-4 text-info mt-0.5" />
            <p className="text-muted-foreground">
              Por segurança, você será desconectado de outros dispositivos após alterar sua senha.
            </p>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit} 
            className="flex-1 gap-2"
            disabled={!isFormValid}
          >
            <Lock className="h-4 w-4" />
            Alterar Senha
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
