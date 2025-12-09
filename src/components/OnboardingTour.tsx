import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  X, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Rocket,
  CheckCircle2,
  PartyPopper
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TourStep {
  id: string;
  title: string;
  description: string;
  target: string; // CSS selector
  position: "top" | "bottom" | "left" | "right";
}

const defaultSteps: TourStep[] = [
  {
    id: "welcome",
    title: "Bem-vindo ao MedClinic! 🎉",
    description: "Vamos fazer um tour rápido pelo sistema para você conhecer as principais funcionalidades.",
    target: "body",
    position: "bottom"
  },
  {
    id: "sidebar",
    title: "Menu de Navegação",
    description: "Aqui você encontra acesso rápido a todas as seções: Dashboard, Agenda, Pacientes e muito mais.",
    target: "[data-sidebar]",
    position: "right"
  },
  {
    id: "command",
    title: "Busca Rápida (⌘K)",
    description: "Pressione ⌘K (ou Ctrl+K) para abrir a busca rápida e navegar pelo sistema instantaneamente.",
    target: "body",
    position: "bottom"
  },
  {
    id: "theme",
    title: "Personalize seu Tema",
    description: "Alterne entre tema claro e escuro conforme sua preferência no canto superior.",
    target: "[data-theme-toggle]",
    position: "bottom"
  },
  {
    id: "complete",
    title: "Tudo Pronto!",
    description: "Você está pronto para explorar o MedClinic. Se precisar de ajuda, acesse a Central de Suporte.",
    target: "body",
    position: "bottom"
  }
];

interface OnboardingTourProps {
  onComplete?: () => void;
  steps?: TourStep[];
}

export function OnboardingTour({ onComplete, steps = defaultSteps }: OnboardingTourProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenTour, setHasSeenTour] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("medclinic-tour-completed");
    const welcomeModalDismissed = localStorage.getItem("medclinic-welcome-dismissed");
    
    if (!seen && welcomeModalDismissed) {
      // Only show tour after welcome modal is dismissed
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
    if (seen) {
      setHasSeenTour(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem("medclinic-tour-completed", "true");
    setIsOpen(false);
    setHasSeenTour(true);
    onComplete?.();
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const resetTour = () => {
    localStorage.removeItem("medclinic-tour-completed");
    setCurrentStep(0);
    setIsOpen(true);
    setHasSeenTour(false);
  };

  if (!isOpen) {
    // Show reset button if user has seen the tour
    if (hasSeenTour) {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={resetTour}
          className="fixed bottom-4 left-4 z-50 gap-2 opacity-50 hover:opacity-100 transition-opacity"
        >
          <Rocket className="h-4 w-4" />
          <span className="hidden sm:inline">Refazer Tour</span>
        </Button>
      );
    }
    return null;
  }

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm animate-fade-in" />
      
      {/* Tour Card */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6 shadow-2xl border-2 border-primary/20 animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="h-3 w-3" />
              {currentStep + 1} de {steps.length}
            </Badge>
            <Button variant="ghost" size="icon" onClick={handleSkip} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress */}
          <Progress value={progress} className="h-1.5 mb-6" />

          {/* Content */}
          <div className="text-center mb-8">
            {isLastStep ? (
              <div className="mb-4 flex justify-center">
                <div className="h-20 w-20 rounded-full bg-success/20 flex items-center justify-center animate-bounce-slow">
                  <PartyPopper className="h-10 w-10 text-success" />
                </div>
              </div>
            ) : currentStep === 0 ? (
              <div className="mb-4 flex justify-center">
                <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                  <Rocket className="h-10 w-10 text-primary" />
                </div>
              </div>
            ) : null}

            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
            <p className="text-muted-foreground">{step.description}</p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>

            <div className="flex gap-1">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    index === currentStep 
                      ? "w-6 bg-primary" 
                      : index < currentStep 
                        ? "w-2 bg-primary/50" 
                        : "w-2 bg-muted"
                  )}
                />
              ))}
            </div>

            <Button onClick={handleNext} className="gap-2">
              {isLastStep ? (
                <>
                  Começar
                  <CheckCircle2 className="h-4 w-4" />
                </>
              ) : (
                <>
                  Próximo
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          {/* Skip link */}
          {!isLastStep && (
            <div className="mt-4 text-center">
              <button
                onClick={handleSkip}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Pular tour
              </button>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}