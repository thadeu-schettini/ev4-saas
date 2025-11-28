import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Gift, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface MissionCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  missionTitle: string;
  reward: string;
}

export const MissionCompleteModal = ({ isOpen, onClose, missionTitle, reward }: MissionCompleteModalProps) => {
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
      <DialogContent className="max-w-md border-2 border-green-500/30 bg-gradient-to-br from-background via-green-500/5 to-background overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className={`relative z-10 text-center py-8 transition-all duration-700 ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          {/* Success Icon */}
          <div className="mb-6 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-xl animate-pulse" />
            </div>
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-lg opacity-50 animate-ping" />
              <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-green-400 via-green-500 to-emerald-500 flex items-center justify-center shadow-2xl mx-auto animate-scale-in">
                <Check className="h-12 w-12 text-white drop-shadow-lg" strokeWidth={4} />
              </div>
            </div>
          </div>

          {/* Sparkles Animation */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full">
            <Sparkles className="absolute top-0 left-1/4 h-6 w-6 text-green-400 animate-twinkle" style={{ animationDelay: '0s' }} />
            <Sparkles className="absolute top-4 right-1/4 h-5 w-5 text-emerald-300 animate-twinkle" style={{ animationDelay: '0.2s' }} />
            <Sparkles className="absolute top-8 left-1/3 h-4 w-4 text-green-500 animate-twinkle" style={{ animationDelay: '0.4s' }} />
          </div>

          {/* Content */}
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
            Missão Completa! 🎯
          </h2>
          <p className="text-muted-foreground mb-6">Parabéns por concluir a missão</p>

          {/* Mission Info */}
          <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border">
            <p className="font-semibold text-foreground mb-2">{missionTitle}</p>
            <Badge className="bg-green-600 text-white border-0">
              <Check className="h-3 w-3 mr-1" />
              Completa
            </Badge>
          </div>

          {/* Reward */}
          <div className="mb-8 p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border-2 border-green-500/30 animate-pulse-slow">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Gift className="h-6 w-6 text-green-600" />
              <h3 className="font-bold text-lg text-foreground">Recompensa Recebida</h3>
            </div>
            <p className="text-2xl font-bold text-green-600">{reward}</p>
          </div>

          <Button 
            onClick={onClose}
            size="lg"
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold shadow-lg"
          >
            Continuar 🚀
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
