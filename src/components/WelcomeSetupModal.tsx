import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  UserPlus,
  Clock,
  Calendar,
  CreditCard,
  Bell,
  Sparkles,
  Rocket,
  ChevronRight,
  Trophy
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WelcomeSetupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const setupSteps = [
  {
    id: "profile",
    title: "Complete o perfil da clínica",
    description: "Adicione logo, informações de contato e endereço para personalizar sua clínica",
    icon: Building2,
    benefit: "Pacientes terão mais confiança ao ver um perfil completo",
    estimatedTime: "3 min"
  },
  {
    id: "professional",
    title: "Adicione profissionais",
    description: "Cadastre médicos e especialistas da sua equipe",
    icon: UserPlus,
    benefit: "Comece a organizar agendamentos por profissional",
    estimatedTime: "2 min"
  },
  {
    id: "schedule",
    title: "Configure horários",
    description: "Defina os dias e horários de atendimento disponíveis",
    icon: Clock,
    benefit: "Evite conflitos de agenda automaticamente",
    estimatedTime: "5 min"
  },
  {
    id: "appointment",
    title: "Crie o primeiro agendamento",
    description: "Agende uma consulta para testar todo o fluxo",
    icon: Calendar,
    benefit: "Veja na prática como o sistema funciona",
    estimatedTime: "2 min"
  },
  {
    id: "payment",
    title: "Configure pagamentos",
    description: "Adicione formas de pagamento aceitas pela clínica",
    icon: CreditCard,
    benefit: "Facilite o processo de cobrança",
    estimatedTime: "3 min"
  },
  {
    id: "reminders",
    title: "Configure lembretes",
    description: "Personalize notificações automáticas para pacientes",
    icon: Bell,
    benefit: "Reduza faltas e melhore a comunicação",
    estimatedTime: "2 min"
  }
];

export default function WelcomeSetupModal({ open, onOpenChange }: WelcomeSetupModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const progress = ((currentStep + 1) / setupSteps.length) * 100;
  const step = setupSteps[currentStep];
  const Icon = step.icon;
  const isLastStep = currentStep === setupSteps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      localStorage.setItem("medclinic-welcome-dismissed", "true");
      onOpenChange(false);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem("medclinic-welcome-dismissed", "true");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-br from-primary via-primary/90 to-accent p-6 pb-8 text-primary-foreground relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <Sparkles className="h-32 w-32" />
          </div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center">
                <Rocket className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold">Bem-vindo! 🎉</DialogTitle>
                <p className="text-sm opacity-90">Vamos configurar sua clínica em poucos passos</p>
              </div>
            </div>
            
            {/* Progress */}
            <div className="space-y-2 mt-6">
              <div className="flex items-center justify-between text-xs">
                <span className="opacity-90">Progresso da configuração</span>
                <span className="font-semibold">{currentStep + 1} de {setupSteps.length}</span>
              </div>
              <Progress value={progress} className="h-2 bg-background/30" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Current step card */}
          <div className="bg-gradient-to-br from-accent/5 via-primary/5 to-accent/5 rounded-xl p-6 border-2 border-primary/20 mb-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground shrink-0 shadow-lg">
                <Icon className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                  <Badge variant="secondary" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {step.estimatedTime}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {step.description}
                </p>
                <div className="flex items-start gap-2 bg-background/50 rounded-lg p-3 border border-border/50">
                  <Sparkles className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <p className="text-xs text-foreground">
                    <span className="font-semibold">Benefício:</span> {step.benefit}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Steps overview */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-accent" />
              Todos os passos
            </h4>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {setupSteps.map((s, index) => {
                const StepIcon = s.icon;
                const isActive = index === currentStep;
                const isPast = index < currentStep;
                
                return (
                  <button
                    key={s.id}
                    onClick={() => setCurrentStep(index)}
                    className={cn(
                      "p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-1.5 group",
                      isActive && "border-primary bg-primary/5 scale-105",
                      isPast && "border-accent/30 bg-accent/5",
                      !isActive && !isPast && "border-border hover:border-primary/30 hover:bg-muted/50"
                    )}
                  >
                    <StepIcon className={cn(
                      "h-5 w-5 transition-all",
                      isActive && "text-primary",
                      isPast && "text-accent",
                      !isActive && !isPast && "text-muted-foreground group-hover:text-primary"
                    )} />
                    <span className="text-[10px] text-center text-muted-foreground leading-tight">
                      Passo {index + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              onClick={handleSkip}
              className="text-muted-foreground hover:text-foreground"
            >
              Pular tutorial
            </Button>
            <div className="flex items-center gap-2">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                >
                  Voltar
                </Button>
              )}
              <Button
                onClick={handleNext}
                className="group"
              >
                {isLastStep ? (
                  <>
                    <Trophy className="h-4 w-4 mr-2" />
                    Começar a usar!
                  </>
                ) : (
                  <>
                    Próximo
                    <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Footer tip */}
        {!isLastStep && (
          <div className="bg-muted/30 px-6 py-3 border-t">
            <p className="text-xs text-muted-foreground text-center">
              💡 <span className="font-medium">Dica:</span> Você pode voltar e completar isso depois através do widget no canto inferior direito
            </p>
          </div>
        )}

        {/* Celebration footer */}
        {isLastStep && (
          <div className="bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 px-6 py-4 border-t">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Trophy className="h-5 w-5 text-accent animate-bounce" />
                <p className="text-sm font-semibold text-foreground">
                  Você está pronto para começar! 🎉
                </p>
                <Trophy className="h-5 w-5 text-accent animate-bounce" />
              </div>
              <p className="text-xs text-muted-foreground">
                Complete as configurações no seu ritmo usando o checklist lateral
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
