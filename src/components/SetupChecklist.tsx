import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  CheckCircle2, 
  ChevronUp, 
  ChevronDown, 
  Building2, 
  UserPlus, 
  Clock, 
  Calendar, 
  CreditCard, 
  Bell,
  Sparkles,
  Trophy
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CelebrationConfetti } from "./CelebrationConfetti";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  icon: typeof Building2;
  completed: boolean;
  actionLabel?: string;
  onAction?: () => void;
}

interface SetupChecklistProps {
  onItemComplete?: (itemId: string) => void;
}

export default function SetupChecklist({ onItemComplete }: SetupChecklistProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [items, setItems] = useState<ChecklistItem[]>([
    {
      id: "profile",
      title: "Complete o perfil da clínica",
      description: "Adicione logo, informações de contato e endereço",
      icon: Building2,
      completed: false,
      actionLabel: "Configurar",
      onAction: () => console.log("Navigate to profile")
    },
    {
      id: "professional",
      title: "Adicione o primeiro profissional",
      description: "Cadastre médicos e especialistas da sua equipe",
      icon: UserPlus,
      completed: false,
      actionLabel: "Adicionar",
      onAction: () => console.log("Navigate to professionals")
    },
    {
      id: "schedule",
      title: "Configure horários de atendimento",
      description: "Defina os dias e horários disponíveis",
      icon: Clock,
      completed: false,
      actionLabel: "Configurar",
      onAction: () => console.log("Navigate to schedule")
    },
    {
      id: "appointment",
      title: "Crie o primeiro agendamento",
      description: "Agende uma consulta para testar o sistema",
      icon: Calendar,
      completed: false,
      actionLabel: "Agendar",
      onAction: () => console.log("Navigate to calendar")
    },
    {
      id: "payment",
      title: "Configure métodos de pagamento",
      description: "Adicione formas de pagamento aceitas",
      icon: CreditCard,
      completed: false,
      actionLabel: "Configurar",
      onAction: () => console.log("Navigate to payments")
    },
    {
      id: "reminders",
      title: "Personalize lembretes automáticos",
      description: "Configure notificações para seus pacientes",
      icon: Bell,
      completed: false,
      actionLabel: "Configurar",
      onAction: () => console.log("Navigate to reminders")
    }
  ]);

  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;
  const progress = (completedCount / totalCount) * 100;
  const isFullyCompleted = completedCount === totalCount;

  const handleToggleItem = (itemId: string) => {
    setItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      );
      
      const newCompletedCount = updatedItems.filter(item => item.completed).length;
      const wasCompleted = prevItems.find(item => item.id === itemId)?.completed;
      
      // Trigger confetti when item is completed (not uncompleted)
      if (!wasCompleted && newCompletedCount > completedCount) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
      
      return updatedItems;
    });
    
    if (onItemComplete) {
      onItemComplete(itemId);
    }
  };

  if (isMinimized) {
    return (
      <>
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            onClick={() => setIsMinimized(false)}
            className="rounded-full h-14 w-14 shadow-lg bg-primary hover:bg-primary/90 relative group"
            size="icon"
          >
            <div className="absolute -top-1 -right-1">
              <Badge className="bg-accent text-accent-foreground h-6 w-6 rounded-full flex items-center justify-center p-0 animate-pulse">
                {completedCount}
              </Badge>
            </div>
            <Sparkles className="h-6 w-6 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
        {showConfetti && <CelebrationConfetti trigger={showConfetti} />}
      </>
    );
  }

  return (
    <>
      <Card className="fixed bottom-4 right-4 w-[380px] shadow-2xl z-50 border-2 overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary via-primary/90 to-accent p-4 text-primary-foreground">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center">
                {isFullyCompleted ? (
                  <Trophy className="h-4 w-4" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-sm">Configuração Inicial</h3>
                <p className="text-xs opacity-90">
                  {isFullyCompleted 
                    ? "🎉 Tudo pronto!" 
                    : `${completedCount} de ${totalCount} concluídas`
                  }
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-primary-foreground hover:bg-background/20"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-primary-foreground hover:bg-background/20"
                onClick={() => setIsMinimized(true)}
              >
                <span className="text-xs">✕</span>
              </Button>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="space-y-2">
            <Progress value={progress} className="h-2 bg-background/30" />
            <div className="flex items-center justify-between text-xs">
              <span className="opacity-90">Progresso</span>
              <span className="font-semibold">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>

        {/* Checklist items */}
        {isExpanded && (
          <div className="p-4 max-h-[400px] overflow-y-auto space-y-2">
            {items.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={cn(
                    "group rounded-lg border-2 p-3 transition-all duration-300",
                    item.completed 
                      ? "bg-accent/10 border-accent/30" 
                      : "bg-background border-border hover:border-primary/30 hover:shadow-md"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={item.completed}
                      onCheckedChange={() => handleToggleItem(item.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2">
                        <div className={cn(
                          "h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-all",
                          item.completed 
                            ? "bg-accent text-accent-foreground" 
                            : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                        )}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={cn(
                            "text-sm font-medium mb-1 transition-all",
                            item.completed && "line-through opacity-60"
                          )}>
                            {item.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mb-2">
                            {item.description}
                          </p>
                          {!item.completed && item.actionLabel && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs"
                              onClick={item.onAction}
                            >
                              {item.actionLabel}
                            </Button>
                          )}
                          {item.completed && (
                            <div className="flex items-center gap-1 text-accent">
                              <CheckCircle2 className="h-3 w-3" />
                              <span className="text-xs font-medium">Concluído!</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer celebration */}
        {isFullyCompleted && isExpanded && (
          <div className="border-t bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10 p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="h-5 w-5 text-accent animate-bounce" />
              <h4 className="font-semibold text-foreground">Parabéns!</h4>
              <Trophy className="h-5 w-5 text-accent animate-bounce" />
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Você completou toda a configuração inicial! 🎉
            </p>
            <Button 
              size="sm" 
              className="w-full"
              onClick={() => setIsMinimized(true)}
            >
              Entendi, obrigado!
            </Button>
          </div>
        )}
      </Card>
      {showConfetti && <CelebrationConfetti trigger={showConfetti} />}
    </>
  );
}
