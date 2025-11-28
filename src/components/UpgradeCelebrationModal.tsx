import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Sparkles, Check, X } from "lucide-react";
import { CelebrationConfetti } from "./CelebrationConfetti";

interface Feature {
  name: string;
  isNew: boolean;
}

interface UpgradeCelebrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
  features: Feature[];
  icon: React.ComponentType<{ className?: string }>;
}

export const UpgradeCelebrationModal = ({
  open,
  onOpenChange,
  planName,
  features,
  icon: Icon,
}: UpgradeCelebrationModalProps) => {
  return (
    <>
      <CelebrationConfetti trigger={open} />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl border-2 border-primary/50 bg-gradient-to-br from-primary/10 via-background to-purple-500/10">
          <div className="text-center space-y-6 py-6">
            {/* Icon and Title */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
                <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center animate-scale-in">
                  <Icon className="h-12 w-12 text-primary-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  Parabéns! 🎉
                </h2>
                <p className="text-xl text-muted-foreground">
                  Você fez upgrade para o plano{" "}
                  <span className="font-bold text-foreground">{planName}</span>
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Novos Recursos Desbloqueados</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                {features.map((feature, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      feature.isNew
                        ? "bg-primary/5 border-primary/50 animate-fade-in"
                        : "bg-muted/50 border-border"
                    }`}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                        feature.isNew ? "bg-primary/20" : "bg-muted"
                      }`}
                    >
                      {feature.isNew ? (
                        <Sparkles className="h-4 w-4 text-primary" />
                      ) : (
                        <Check className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <span className={feature.isNew ? "font-medium" : "text-muted-foreground"}>
                      {feature.name}
                    </span>
                    {feature.isNew && (
                      <Badge variant="secondary" className="ml-auto">
                        Novo
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <Button size="lg" className="w-full gap-2" onClick={() => onOpenChange(false)}>
              <Crown className="h-5 w-5" />
              Começar a Usar
            </Button>

            <p className="text-sm text-muted-foreground">
              Aproveite ao máximo todos os recursos premium disponíveis agora!
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
