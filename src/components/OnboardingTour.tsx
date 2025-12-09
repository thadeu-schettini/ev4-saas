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
  Settings,
  Search,
  Zap,
  Lightbulb
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TourStep {
  id: string;
  title: string;
  description: string;
  icon?: React.ElementType;
  tip?: string;
  target?: string; // CSS selector
  position?: "top" | "bottom" | "left" | "right" | "center";
}

const defaultSteps: TourStep[] = [
  {
    id: "welcome",
    title: "Bem-vindo ao MedClinic! 🎉",
    description: "Vamos fazer um tour rápido pelo sistema para você conhecer as principais funcionalidades.",
    icon: Rocket,
    tip: "Este tour leva cerca de 1 minuto",
    position: "center"
  },
  {
    id: "sidebar",
    title: "Menu de Navegação",
    description: "No menu lateral você encontra acesso a todas as seções: Dashboard, Agenda, Pacientes, Prontuário e mais.",
    icon: LayoutDashboard,
    tip: "Clique no ícone ☰ para expandir/recolher",
    target: "[data-sidebar]",
    position: "right"
  },
  {
    id: "dashboard",
    title: "Dashboard Principal",
    description: "Acompanhe métricas importantes como agendamentos, receita e taxa de ocupação em tempo real.",
    icon: Zap,
    tip: "Os cards são atualizados automaticamente",
    position: "center"
  },
  {
    id: "command",
    title: "Busca Rápida (⌘K)",
    description: "Pressione ⌘K (ou Ctrl+K) a qualquer momento para buscar e navegar instantaneamente.",
    icon: Search,
    tip: "Funciona em qualquer página!",
    position: "center"
  },
  {
    id: "theme",
    title: "Personalize seu Tema",
    description: "Alterne entre tema claro, escuro ou automático no canto superior direito.",
    icon: Settings,
    tip: "O sistema lembra sua preferência",
    target: "[data-theme-toggle]",
    position: "bottom"
  },
  {
    id: "complete",
    title: "Tudo Pronto! 🎊",
    description: "Você está preparado para explorar o MedClinic. Pressione ⌘K se precisar de ajuda.",
    icon: PartyPopper,
    tip: "Você pode refazer o tour a qualquer momento",
    position: "center"
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
  const [spotlightStyle, setSpotlightStyle] = useState<React.CSSProperties>({});
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;
  const isLastStep = currentStep === steps.length - 1;
  const hasTarget = step.target && step.position !== "center";

  // Calculate spotlight and tooltip positions
  const updatePositions = useCallback(() => {
    if (!step.target || step.position === "center") {
      setSpotlightStyle({});
      setTooltipStyle({
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      });
      return;
    }

    const element = document.querySelector(step.target);
    if (!element) {
      setSpotlightStyle({});
      setTooltipStyle({
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      });
      return;
    }

    const rect = element.getBoundingClientRect();
    const padding = 8;

    // Spotlight position
    setSpotlightStyle({
      position: "fixed",
      top: rect.top - padding,
      left: rect.left - padding,
      width: rect.width + padding * 2,
      height: rect.height + padding * 2,
      zIndex: 101
    });

    // Tooltip position based on step.position
    const tooltipWidth = 380;
    const tooltipGap = 16;

    let tooltipPos: React.CSSProperties = {};

    switch (step.position) {
      case "right":
        tooltipPos = {
          position: "fixed",
          top: Math.max(20, rect.top),
          left: rect.right + tooltipGap,
          maxWidth: `calc(100vw - ${rect.right + tooltipGap + 20}px)`
        };
        break;
      case "left":
        tooltipPos = {
          position: "fixed",
          top: Math.max(20, rect.top),
          right: window.innerWidth - rect.left + tooltipGap,
          maxWidth: rect.left - tooltipGap - 20
        };
        break;
      case "bottom":
        tooltipPos = {
          position: "fixed",
          top: rect.bottom + tooltipGap,
          left: Math.max(20, Math.min(rect.left, window.innerWidth - tooltipWidth - 20)),
          maxWidth: tooltipWidth
        };
        break;
      case "top":
        tooltipPos = {
          position: "fixed",
          bottom: window.innerHeight - rect.top + tooltipGap,
          left: Math.max(20, Math.min(rect.left, window.innerWidth - tooltipWidth - 20)),
          maxWidth: tooltipWidth
        };
        break;
      default:
        tooltipPos = {
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        };
    }

    setTooltipStyle(tooltipPos);
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
      updatePositions();
      window.addEventListener("resize", updatePositions);
      window.addEventListener("scroll", updatePositions, true);
      return () => {
        window.removeEventListener("resize", updatePositions);
        window.removeEventListener("scroll", updatePositions, true);
      };
    }
  }, [isOpen, currentStep, updatePositions]);

  const handleComplete = () => {
    localStorage.setItem("medclinic-tour-completed", "true");
    setIsOpen(false);
    setHasSeenTour(true);
    onComplete?.();
  };

  const handleSkip = () => handleComplete();

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
      {/* Dark Overlay with cutout */}
      <div className="fixed inset-0 z-[100] pointer-events-none">
        {/* Full overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] animate-fade-in" />
        
        {/* Spotlight cutout (if has target) */}
        {hasTarget && spotlightStyle.width && (
          <>
            {/* Glowing border around element */}
            <div
              className="absolute rounded-xl border-2 border-primary shadow-[0_0_0_4px_rgba(59,130,246,0.3),0_0_30px_rgba(59,130,246,0.4)] animate-pulse"
              style={{
                ...spotlightStyle,
                boxShadow: "0 0 0 9999px rgba(0,0,0,0.6), 0 0 30px 4px hsl(var(--primary)/0.5)"
              }}
            />
            {/* Arrow pointer */}
            <div
              className="absolute w-0 h-0"
              style={{
                top: (spotlightStyle.top as number) + (spotlightStyle.height as number) / 2 - 8,
                left: (spotlightStyle.left as number) + (spotlightStyle.width as number) + 4,
                borderTop: "8px solid transparent",
                borderBottom: "8px solid transparent",
                borderRight: "12px solid hsl(var(--primary))"
              }}
            />
          </>
        )}
      </div>

      {/* Tooltip Card */}
      <Card
        className={cn(
          "z-[102] w-[90vw] max-w-[380px] p-5 shadow-2xl border-2 border-primary/30 bg-card/95 backdrop-blur-xl pointer-events-auto",
          !hasTarget && "animate-scale-in"
        )}
        style={tooltipStyle}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary" className="gap-1.5 px-2.5 py-0.5 text-xs">
            <Sparkles className="h-3 w-3" />
            {currentStep + 1} de {steps.length}
          </Badge>
          <Button variant="ghost" size="icon" onClick={handleSkip} className="h-7 w-7 -mr-1 rounded-full hover:bg-muted">
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Progress */}
        <Progress value={progress} className="h-1 mb-4" />

        {/* Content */}
        <div className={cn("mb-5", !hasTarget && "text-center")}>
          {/* Icon (only for center modals) */}
          {!hasTarget && (
            <div className="mb-4 flex justify-center">
              <div className={cn(
                "relative h-16 w-16 rounded-full flex items-center justify-center",
                isLastStep ? "bg-emerald-500/20" : "bg-primary/20"
              )}>
                <div className={cn(
                  "absolute inset-0 rounded-full blur-xl opacity-50",
                  isLastStep ? "bg-emerald-500/30" : "bg-primary/30"
                )} />
                <Icon className={cn(
                  "h-8 w-8 relative z-10",
                  isLastStep ? "text-emerald-500" : "text-primary",
                  "animate-bounce"
                )} style={{ animationDuration: "2s" }} />
              </div>
            </div>
          )}

          {/* Icon inline for targeted steps */}
          {hasTarget && (
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <h3 className="text-base font-bold">{step.title}</h3>
            </div>
          )}

          {!hasTarget && <h3 className="text-lg font-bold mb-2">{step.title}</h3>}
          <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>

          {/* Tip */}
          {step.tip && (
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg px-2.5 py-1.5">
              <Lightbulb className="h-3 w-3 text-amber-500 shrink-0" />
              {step.tip}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="gap-1 h-8"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Anterior</span>
          </Button>

          {/* Step Indicators */}
          <div className="flex gap-1">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === currentStep 
                    ? "w-5 bg-primary" 
                    : index < currentStep 
                      ? "w-1.5 bg-primary/50" 
                      : "w-1.5 bg-muted"
                )}
              />
            ))}
          </div>

          <Button size="sm" onClick={handleNext} className="gap-1 h-8">
            {isLastStep ? (
              <>
                Começar
                <CheckCircle2 className="h-4 w-4" />
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Próximo</span>
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        {/* Skip link */}
        {!isLastStep && (
          <div className="mt-3 text-center">
            <button
              onClick={handleSkip}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Pular tour
            </button>
          </div>
        )}
      </Card>
    </>
  );
}
