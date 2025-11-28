import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Lock } from "lucide-react";

interface Level {
  name: string;
  points: number;
  color: string;
  rewards: string[];
  unlocked: boolean;
  current: boolean;
}

interface ReferralJourneyTimelineProps {
  currentPoints: number;
}

export const ReferralJourneyTimeline = ({ currentPoints }: ReferralJourneyTimelineProps) => {
  const levels: Level[] = [
    {
      name: "Bronze",
      points: 0,
      color: "from-orange-900 to-orange-700",
      rewards: ["Recompensas básicas", "Suporte padrão"],
      unlocked: true,
      current: false,
    },
    {
      name: "Silver",
      points: 500,
      color: "from-slate-400 to-slate-600",
      rewards: ["Bônus +25%", "Resgates exclusivos"],
      unlocked: true,
      current: true,
    },
    {
      name: "Gold",
      points: 1200,
      color: "from-yellow-400 to-yellow-600",
      rewards: ["Bônus +50%", "Suporte prioritário"],
      unlocked: false,
      current: false,
    },
    {
      name: "Platinum",
      points: 2500,
      color: "from-purple-400 to-purple-600",
      rewards: ["Bônus +100%", "Consultoria exclusiva"],
      unlocked: false,
      current: false,
    },
  ];

  return (
    <Card className="p-8 bg-card border-border/30">
      <div className="mb-8">
        <h3 className="text-2xl font-light mb-2 text-foreground">Sua Jornada</h3>
        <p className="text-sm text-muted-foreground">Evolua através dos níveis e desbloqueie benefícios exclusivos</p>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute top-12 left-0 right-0 h-0.5 bg-border" />
        <div 
          className="absolute top-12 left-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 transition-all duration-1000"
          style={{ 
            width: `${Math.min((currentPoints / levels[levels.length - 1].points) * 100, 100)}%` 
          }}
        />

        {/* Levels */}
        <div className="grid grid-cols-4 gap-4 relative">
          {levels.map((level, index) => (
            <div key={level.name} className="relative group">
              {/* Level Node */}
              <div className="flex flex-col items-center mb-6">
                <div 
                  className={`
                    w-24 h-24 rounded-full flex items-center justify-center mb-4 transition-all duration-500
                    ${level.current 
                      ? `bg-gradient-to-br ${level.color} shadow-2xl scale-110 ring-4 ring-primary/20` 
                      : level.unlocked 
                        ? `bg-gradient-to-br ${level.color} shadow-lg` 
                        : 'bg-muted/30 backdrop-blur-sm'
                    }
                    ${!level.current && level.unlocked && 'group-hover:scale-105'}
                    ${!level.unlocked && 'group-hover:bg-muted/50'}
                  `}
                >
                  {level.unlocked ? (
                    <Check className={`h-10 w-10 ${level.current ? 'text-white animate-scale-in' : 'text-white/80'}`} />
                  ) : (
                    <Lock className="h-8 w-8 text-muted-foreground/50" />
                  )}
                </div>
                <h4 className={`text-lg font-medium mb-1 transition-colors ${
                  level.current ? 'text-foreground' : level.unlocked ? 'text-foreground/80' : 'text-muted-foreground'
                }`}>
                  {level.name}
                </h4>
                <p className="text-xs text-muted-foreground">{level.points.toLocaleString()} pts</p>
                {level.current && (
                  <Badge className="mt-2 bg-primary/10 text-primary border-primary/20">
                    Nível Atual
                  </Badge>
                )}
              </div>

              {/* Rewards Card - Show on hover/current */}
              <div className={`
                absolute top-32 left-1/2 -translate-x-1/2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10
                ${level.current && 'opacity-100 visible'}
              `}>
                <Card className="p-4 bg-background/95 backdrop-blur-sm border-border/50 shadow-xl">
                  <h5 className="text-sm font-medium mb-2 text-foreground">Benefícios</h5>
                  <ul className="space-y-1">
                    {level.rewards.map((reward, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{reward}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
