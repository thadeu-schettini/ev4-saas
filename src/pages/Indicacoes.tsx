import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CelebrationConfetti } from "@/components/CelebrationConfetti";
import { LevelUpModal } from "@/components/LevelUpModal";
import { MissionCompleteModal } from "@/components/MissionCompleteModal";
import { ReferralJourneyTimeline } from "@/components/ReferralJourneyTimeline";
import { 
  Share2, 
  Copy, 
  Gift, 
  Trophy, 
  Target, 
  Users, 
  TrendingUp,
  Check,
  Sparkles,
  ArrowUpRight,
  ExternalLink
} from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Indicacoes = () => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showMissionComplete, setShowMissionComplete] = useState(false);
  const [completedMission, setCompletedMission] = useState({ title: "", reward: "" });
  const referralLink = "https://clinica.com/ref/DemoEV4";

  const currentLevel = {
    name: "SILVER",
    currentPoints: 850,
    nextLevel: "GOLD",
    pointsToNext: 1200,
    progress: 70.8
  };

  const stats = [
    { label: "Indicações Ativas", value: "12", change: "+3 este mês", icon: Users },
    { label: "Total Ganho", value: "R$ 1.850", change: "+R$ 180 este mês", icon: Gift },
    { label: "Taxa de Conversão", value: "68%", change: "+12% vs. média", icon: TrendingUp },
  ];

  const [weeklyMissions, setWeeklyMissions] = useState([
    { 
      id: 1, 
      title: "Indique sua primeira conta", 
      reward: "600 pts + R$ 15", 
      progress: 0, 
      total: 1,
      completed: false 
    },
    { 
      id: 2, 
      title: "Alcance 3 indicações ativas", 
      reward: "1200 pts + R$ 25", 
      progress: 0, 
      total: 3,
      completed: false 
    },
    { 
      id: 3, 
      title: "Compartilhe nas redes sociais", 
      reward: "300 pts", 
      progress: 1, 
      total: 3,
      completed: false 
    }
  ]);

  const recentReferrals = [
    { name: "Dra. Ana Silva", status: "Ativa", date: "27/11/2024", reward: "R$ 15,00", points: "+600 pts" },
    { name: "Dr. Carlos Mendes", status: "Pendente", date: "25/11/2024", reward: "—", points: "—" },
    { name: "Dra. Maria Santos", status: "Ativa", date: "20/11/2024", reward: "R$ 15,00", points: "+600 pts" }
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    toast({
      title: "Link copiado",
      description: "Compartilhe com seus colegas profissionais"
    });
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(`Conheça a melhor plataforma de gestão de clínicas. Use meu link: ${referralLink}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const handleCompleteMission = (missionId: number) => {
    const mission = weeklyMissions.find(m => m.id === missionId);
    if (mission && !mission.completed) {
      setWeeklyMissions(prev => 
        prev.map(m => 
          m.id === missionId 
            ? { ...m, progress: m.total, completed: true } 
            : m
        )
      );
      setCompletedMission({ title: mission.title, reward: mission.reward });
      setShowMissionComplete(true);
      setShowConfetti(true);
      toast({
        title: "Missão completa",
        description: `Você ganhou: ${mission.reward}`,
      });
    }
  };

  const handleLevelUp = () => {
    setShowLevelUp(true);
    setShowConfetti(true);
    toast({
      title: "Parabéns",
      description: "Você subiu de nível",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Celebration Effects */}
      <CelebrationConfetti trigger={showConfetti} onComplete={() => setShowConfetti(false)} />
      <LevelUpModal 
        isOpen={showLevelUp}
        onClose={() => setShowLevelUp(false)}
        oldLevel="SILVER"
        newLevel="GOLD"
        rewards={[
          "Acesso a recompensas exclusivas GOLD",
          "Bônus de 50% em todas as indicações",
          "Prioridade no suporte técnico"
        ]}
      />
      <MissionCompleteModal
        isOpen={showMissionComplete}
        onClose={() => setShowMissionComplete(false)}
        missionTitle={completedMission.title}
        reward={completedMission.reward}
      />

      {/* Subtle Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12 max-w-7xl">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h1 className="text-5xl font-light tracking-tight mb-3 text-foreground">
                Programa de Indicações
              </h1>
              <p className="text-lg text-muted-foreground font-light max-w-2xl">
                Compartilhe sua experiência e seja recompensado por cada profissional que se juntar à plataforma
              </p>
            </div>
            {/* Demo Buttons */}
            <div className="flex gap-2">
              <Button onClick={() => handleCompleteMission(1)} variant="ghost" size="sm" className="text-xs">
                Teste 1
              </Button>
              <Button onClick={handleLevelUp} variant="ghost" size="sm" className="text-xs">
                Teste 2
              </Button>
            </div>
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="mb-16">
          <ReferralJourneyTimeline currentPoints={currentLevel.currentPoints} />
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6 border-border/30 bg-card hover:border-border/50 transition-colors group">
              <div className="flex items-start justify-between mb-4">
                <div className="h-10 w-10 rounded-lg bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <Badge variant="secondary" className="text-xs font-normal bg-muted/50 border-0">
                  {stat.change}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-light text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Share Section */}
        <Card className="mb-16 p-8 border-border/30 bg-card">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-light mb-2 text-foreground">Seu Link Exclusivo</h2>
              <p className="text-sm text-muted-foreground">Compartilhe e acompanhe suas indicações</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-1 px-4 py-3 bg-muted/30 rounded-lg border border-border/30 font-mono text-sm text-foreground/80">
                  {referralLink}
                </div>
                <Button 
                  onClick={handleCopyLink} 
                  variant="outline" 
                  className="gap-2 border-border/30"
                >
                  {copiedLink ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copiedLink ? "Copiado" : "Copiar"}
                </Button>
              </div>
              
              <Button 
                onClick={handleWhatsAppShare}
                size="lg"
                className="w-full gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Compartilhar via WhatsApp
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Weekly Missions */}
          <Card className="p-8 border-border/30 bg-card">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-light mb-1 text-foreground">Missões Semanais</h3>
                <p className="text-sm text-muted-foreground">Complete para ganhar bônus extras</p>
              </div>
              <Badge variant="secondary" className="font-normal bg-muted/50 border-0">
                {weeklyMissions.filter(m => m.completed).length}/{weeklyMissions.length}
              </Badge>
            </div>

            <div className="space-y-4">
              {weeklyMissions.map((mission) => (
                <div 
                  key={mission.id} 
                  className={`
                    p-5 rounded-lg border transition-all duration-300
                    ${mission.completed 
                      ? 'bg-primary/5 border-primary/20' 
                      : 'bg-muted/20 border-border/30 hover:border-border/50'
                    }
                  `}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-medium mb-1 text-foreground">{mission.title}</h4>
                      <p className="text-sm text-muted-foreground">Recompensa: {mission.reward}</p>
                    </div>
                    {mission.completed && (
                      <Badge className="bg-primary text-primary-foreground border-0 gap-1">
                        <Check className="h-3 w-3" />
                        Completa
                      </Badge>
                    )}
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-2 text-muted-foreground">
                      <span>Progresso</span>
                      <span className="font-medium">{mission.progress}/{mission.total}</span>
                    </div>
                    <Progress value={(mission.progress / mission.total) * 100} className="h-1.5" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Referrals */}
          <Card className="p-8 border-border/30 bg-card">
            <div className="mb-8">
              <h3 className="text-2xl font-light mb-1 text-foreground">Indicações Recentes</h3>
              <p className="text-sm text-muted-foreground">Últimas atividades do programa</p>
            </div>

            <div className="space-y-3">
              {recentReferrals.map((referral, index) => (
                <div 
                  key={index} 
                  className="p-5 rounded-lg border border-border/30 bg-muted/10 hover:bg-muted/20 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-foreground mb-1">{referral.name}</h4>
                      <p className="text-xs text-muted-foreground">{referral.date}</p>
                    </div>
                    <Badge 
                      variant={referral.status === "Ativa" ? "default" : "secondary"}
                      className={referral.status === "Ativa" ? "bg-primary/90 border-0" : "bg-muted border-0"}
                    >
                      {referral.status}
                    </Badge>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Recompensa</span>
                    <div className="text-right">
                      <div className="font-medium text-foreground">{referral.reward}</div>
                      <div className="text-xs text-muted-foreground">{referral.points}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="ghost" className="w-full mt-4 gap-2 text-muted-foreground hover:text-foreground">
              Ver todas as indicações
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Indicacoes;
