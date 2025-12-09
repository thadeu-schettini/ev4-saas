import { useState, useEffect, useCallback } from "react";
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
  PartyPopper,
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TourStep {
  id: string;
  title: string;
  description: string;
  target: string;
  position: "top" | "bottom" | "left" | "right" | "center";
  icon?: React.ElementType;
  highlight?: boolean;
}

const defaultSteps: TourStep[] = [
  {
    id: "welcome",
    title: "Bem-vindo ao MedClinic! 🎉",
    description: "Vamos fazer um tour rápido pelo sistema para você conhecer as principais funcionalidades e aproveitar ao máximo.",
    target: "center",
    position: "center",
    icon: Rocket
  },
  {
    id: "sidebar",
    title: "Menu de Navegação",
    description: "No menu lateral você encontra acesso a todas as seções: Dashboard, Agenda, Pacientes, Prontuário e muito mais.",
    target: "[data-sidebar]",
    position: "right",
    icon: LayoutDashboard,
    highlight: true
  },
  {
    id: "dashboard",
    title: "Dashboard Principal",
    description: "Acompanhe métricas importantes, agendamentos do dia e ações rápidas em um só lugar.",
    target: "center",
    position: "center",
    icon: LayoutDashboard
  },
  {
    id: "command",
    title: "Busca Rápida (⌘K)",
    description: "Pressione ⌘K (ou Ctrl+K) a qualquer momento para abrir a busca rápida e navegar instantaneamente.",
    target: "center",
    position: "center",
    icon: Search
  },
  {
    id: "theme",
    title: "Personalize seu Tema",
    description: "Alterne entre tema claro, escuro ou automático no canto superior direito para sua preferência visual.",
    target: "[data-theme-toggle]",
    position: "bottom",
    icon: Settings,
    highlight: true
  },
  {
    id: "complete",
    title: "Tudo Pronto! 🎊",
    description: "Você está preparado para explorar o MedClinic. Se precisar de ajuda, acesse as Configurações ou pressione ⌘K.",
    target: "center",
    position: "center",
    icon: PartyPopper
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
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  // Find and highlight target element
  const updateTargetPosition = useCallback(() => {
    if (!step || step.target === "center") {
      setTargetRect(null);
      return;
    }

    const element = document.querySelector(step.target);
    if (element) {
      const rect = element.getBoundingClientRect();
      setTargetRect(rect);
    } else {
      setTargetRect(null);
    }
  }, [step]);

  useEffect(() => {
    const seen = localStorage.getItem("medclinic-tour-completed");
    const welcomeModalDismissed = localStorage.getItem("medclinic-welcome-dismissed");
    
    if (!seen && welcomeModalDismissed) {
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
    if (seen) {
      setHasSeenTour(true);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      updateTargetPosition();
      window.addEventListener("resize", updateTargetPosition);
      window.addEventListener("scroll", updateTargetPosition, true);
      return () => {
        window.removeEventListener("resize", updateTargetPosition);
        window.removeEventListener("scroll", updateTargetPosition, true);
      };
    }
  }, [isOpen, currentStep, updateTargetPosition]);

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

  // Calculate tooltip position
  const getTooltipStyle = () => {
    if (!targetRect || step.position === "center") {
      return {
        position: "fixed" as const,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      };
    }

    const padding = 16;
    const tooltipWidth = 400;
    const tooltipHeight = 280;

    switch (step.position) {
      case "right":
        return {
          position: "fixed" as const,
          top: Math.max(padding, Math.min(targetRect.top, window.innerHeight - tooltipHeight - padding)),
          left: targetRect.right + padding
        };
      case "left":
        return {
          position: "fixed" as const,
          top: Math.max(padding, Math.min(targetRect.top, window.innerHeight - tooltipHeight - padding)),
          right: window.innerWidth - targetRect.left + padding
        };
      case "bottom":
        return {
          position: "fixed" as const,
          top: targetRect.bottom + padding,
          left: Math.max(padding, Math.min(targetRect.left, window.innerWidth - tooltipWidth - padding))
        };
      case "top":
        return {
          position: "fixed" as const,
          bottom: window.innerHeight - targetRect.top + padding,
          left: Math.max(padding, Math.min(targetRect.left, window.innerWidth - tooltipWidth - padding))
        };
      default:
        return {
          position: "fixed" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        };
    }
  };

  if (!isOpen) {
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

  const Icon = step.icon || Sparkles;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm animate-fade-in" />

      {/* Highlight cutout for target element */}
      {targetRect && step.highlight && (
        <div
          className="fixed z-[101] pointer-events-none"
          style={{
            top: targetRect.top - 8,
            left: targetRect.left - 8,
            width: targetRect.width + 16,
            height: targetRect.height + 16,
            boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)",
            borderRadius: "12px",
            border: "2px solid hsl(var(--primary))",
            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
          }}
        >
          {/* Glow effect */}
          <div 
            className="absolute inset-0 rounded-xl bg-primary/20 animate-pulse"
            style={{ filter: "blur(8px)" }}
          />
        </div>
      )}

      {/* Tour Card */}
      <Card
        className="fixed z-[102] w-[90vw] max-w-md p-6 shadow-2xl border-2 border-primary/20 animate-scale-in bg-card/95 backdrop-blur-xl"
        style={getTooltipStyle()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary" className="gap-1.5 px-3 py-1">
            <Sparkles className="h-3 w-3" />
            Passo {currentStep + 1} de {steps.length}
          </Badge>
          <Button variant="ghost" size="icon" onClick={handleSkip} className="h-8 w-8 -mr-2">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Progress */}
        <Progress value={progress} className="h-1.5 mb-6" />

        {/* Content */}
        <div className="text-center mb-8">
          {/* Icon */}
          <div className="mb-4 flex justify-center">
            <div className={cn(
              "h-20 w-20 rounded-full flex items-center justify-center",
              isLastStep 
                ? "bg-emerald-500/20 animate-bounce" 
                : isFirstStep 
                  ? "bg-primary/20 animate-pulse" 
                  : "bg-muted"
            )} style={{ animationDuration: "2s" }}>
              <Icon className={cn(
                "h-10 w-10",
                isLastStep ? "text-emerald-500" : "text-primary"
              )} />
            </div>
          </div>

          <h3 className="text-xl font-bold mb-3">{step.title}</h3>
          <p className="text-muted-foreground leading-relaxed">{step.description}</p>
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

          {/* Step Indicators */}
          <div className="flex gap-1.5">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === currentStep 
                    ? "w-6 bg-primary" 
                    : index < currentStep 
                      ? "w-2 bg-primary/50 hover:bg-primary/70" 
                      : "w-2 bg-muted hover:bg-muted-foreground/30"
                )}
                aria-label={`Ir para passo ${index + 1}`}
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
    </>
  );
}
