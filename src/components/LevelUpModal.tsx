import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Crown, Star, Sparkles, Gift } from "lucide-react";
import { useEffect, useState } from "react";

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  oldLevel: string;
  newLevel: string;
  rewards: string[];
}

export const LevelUpModal = ({ isOpen, onClose, oldLevel, newLevel, rewards }: LevelUpModalProps) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowContent(true), 100);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md border-2 border-primary/30 bg-gradient-to-br from-background via-primary/5 to-background overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-500/10 rounded-full blur-2xl animate-spin-slow" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl animate-spin-slow" />
        </div>

        <div className={`relative z-10 text-center py-8 transition-all duration-700 ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          {/* Trophy Animation */}
          <div className="mb-6 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-xl animate-pulse" />
            </div>
            <div className="relative inline-block animate-bounce-slow">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-lg opacity-50 animate-ping" />
              <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 flex items-center justify-center shadow-2xl mx-auto">
                <Crown className="h-12 w-12 text-white drop-shadow-lg" />
              </div>
            </div>
          </div>

          {/* Stars Animation */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full">
            <Star className="absolute top-0 left-1/4 h-6 w-6 text-yellow-400 animate-twinkle" style={{ animationDelay: '0s' }} />
            <Star className="absolute top-4 right-1/4 h-4 w-4 text-yellow-300 animate-twinkle" style={{ animationDelay: '0.2s' }} />
            <Star className="absolute top-8 left-1/3 h-5 w-5 text-yellow-500 animate-twinkle" style={{ animationDelay: '0.4s' }} />
            <Sparkles className="absolute top-2 right-1/3 h-6 w-6 text-primary animate-twinkle" style={{ animationDelay: '0.6s' }} />
          </div>

          {/* Content */}
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent animate-gradient">
            Parabéns! 🎉
          </h2>
          <p className="text-lg text-muted-foreground mb-6">Você subiu de nível!</p>

          {/* Level Transition */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="px-6 py-3 rounded-lg bg-muted/50 border border-border">
              <span className="text-sm text-muted-foreground block mb-1">Nível Anterior</span>
              <span className="text-xl font-bold text-foreground">{oldLevel}</span>
            </div>
            <Trophy className="h-8 w-8 text-yellow-500 animate-pulse" />
            <div className="px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border-2 border-yellow-500/50 shadow-lg">
              <span className="text-sm text-muted-foreground block mb-1">Novo Nível</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                {newLevel}
              </span>
            </div>
          </div>

          {/* Rewards */}
          <div className="mb-8 space-y-3">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Gift className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Recompensas Desbloqueadas:</h3>
            </div>
            {rewards.map((reward, index) => (
              <div 
                key={index}
                className="px-4 py-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20 animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="text-sm font-medium">{reward}</p>
              </div>
            ))}
          </div>

          <Button 
            onClick={onClose}
            size="lg"
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold shadow-lg"
          >
            Continuar Evoluindo 🚀
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
