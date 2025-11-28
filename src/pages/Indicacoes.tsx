import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CelebrationConfetti } from "@/components/CelebrationConfetti";
import { LevelUpModal } from "@/components/LevelUpModal";
import { MissionCompleteModal } from "@/components/MissionCompleteModal";
import { 
  Share2, 
  Copy, 
  Gift, 
  Trophy, 
  Target, 
  Zap, 
  Users, 
  TrendingUp,
  Award,
  Star,
  Check,
  Crown,
  Sparkles
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
    color: "from-slate-400 to-slate-600",
    icon: Award,
    currentPoints: 850,
    nextLevel: "GOLD",
    pointsToNext: 1200,
    progress: 70.8
  };

  const [weeklyMissions, setWeeklyMissions] = useState([
    { 
      id: 1, 
      title: "Indique 1 nova conta", 
      reward: "600 pts + R$ 15,00", 
      progress: 0, 
      total: 1,
      completed: false 
    },
    { 
      id: 2, 
      title: "Indique 3 novas contas", 
      reward: "1200 pts + R$ 25,00", 
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

  const rewards = [
    { id: 1, name: "R$50 em assinatura", points: "R$ 50,00", discount: "Abate R$50 na mensalidade", level: "Bronze" },
    { id: 2, name: "R$100 em assinatura", points: "R$ 100,00", discount: "Abate R$100 na mensalidade", level: "Silver" },
    { id: 3, name: "R$200 em assinatura", points: "R$ 200,00", discount: "Abate R$200 na mensalidade", level: "Gold" },
    { id: 4, name: "Consultoria Premium", points: "R$ 500,00", discount: "1 hora de consultoria personalizada", level: "Platinum" }
  ];

  const recentReferrals = [
    { name: "Dra. Ana Silva", status: "Ativa", date: "27/11/2024", reward: "R$ 15,00" },
    { name: "Dr. Carlos Mendes", status: "Pendente", date: "25/11/2024", reward: "Aguardando" },
    { name: "Dra. Maria Santos", status: "Ativa", date: "20/11/2024", reward: "R$ 15,00" }
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    toast({
      title: "Link copiado!",
      description: "Compartilhe com seus colegas e ganhe recompensas."
    });
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(`Junte-se à melhor plataforma de gestão de clínicas! ${referralLink}`);
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
        title: "Missão Completa! 🎉",
        description: `Você ganhou: ${mission.reward}`,
      });
    }
  };

  const handleLevelUp = () => {
    setShowLevelUp(true);
    setShowConfetti(true);
    toast({
      title: "Parabéns! 🎊",
      description: "Você subiu de nível!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
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
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Hero */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-semibold text-primary">Programa de Indicações</span>
          </div>
          
          {/* Demo Buttons - Remove in production */}
          <div className="flex gap-2 justify-center mb-4">
            <Button onClick={() => handleCompleteMission(1)} variant="outline" size="sm">
              Simular Missão 1
            </Button>
            <Button onClick={() => handleCompleteMission(2)} variant="outline" size="sm">
              Simular Missão 2
            </Button>
            <Button onClick={handleLevelUp} variant="outline" size="sm">
              Simular Level Up
            </Button>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Compartilhe e Ganhe Recompensas
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Convide outros profissionais e seja recompensado com benefícios exclusivos a cada nova indicação ativa
          </p>
        </div>

        {/* Share Section */}
        <Card className="mb-8 p-8 border-2 border-primary/20 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-xl animate-scale-in">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 w-full">
              <label className="text-sm font-semibold text-muted-foreground mb-2 block flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Seu link de convite
              </label>
              <div className="flex gap-2">
                <div className="flex-1 px-4 py-3 bg-muted/50 rounded-lg border border-border font-mono text-sm truncate">
                  {referralLink}
                </div>
                <Button onClick={handleCopyLink} variant="outline" className="gap-2">
                  {copiedLink ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copiedLink ? "Copiado!" : "Copiar"}
                </Button>
              </div>
            </div>
            <Button 
              onClick={handleWhatsAppShare}
              size="lg"
              className="gap-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-lg"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Compartilhar via WhatsApp
            </Button>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Level Progress */}
          <Card className="md:col-span-2 p-6 bg-gradient-to-br from-card to-muted/20 border-border/50 shadow-lg">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Nível e Progresso
                </h3>
                <p className="text-sm text-muted-foreground">Continue indicando para subir de nível</p>
              </div>
              <Badge className={`bg-gradient-to-r ${currentLevel.color} text-white border-0 px-4 py-2 text-sm font-bold shadow-lg`}>
                <Crown className="h-4 w-4 mr-1" />
                {currentLevel.name}
              </Badge>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-2xl font-bold text-foreground">{currentLevel.currentPoints} pts</span>
                  <span className="text-sm text-muted-foreground">
                    Rumo ao <span className="font-semibold text-foreground">{currentLevel.nextLevel}</span> ({currentLevel.pointsToNext} pts)
                  </span>
                </div>
                <Progress value={currentLevel.progress} className="h-3 bg-muted" />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>{currentLevel.currentPoints} pontos totais</span>
                  <span>{currentLevel.pointsToNext - currentLevel.currentPoints} pontos restantes</span>
                </div>
              </div>

              <Card className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-sm">Dicas rápidas</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Convide de 1 a 3 contas na semana para garantir os bônus em dobro. 
                      Ajude o indicado a completar o onboarding para validar a recompensa.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </Card>

          {/* Stats Cards */}
          <div className="space-y-4">
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-primary" />
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-3xl font-bold mb-1">12</div>
              <div className="text-sm text-muted-foreground">Indicações ativas</div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Gift className="h-8 w-8 text-green-600" />
                <Star className="h-5 w-5 text-yellow-500" />
              </div>
              <div className="text-3xl font-bold mb-1">R$ 180,00</div>
              <div className="text-sm text-muted-foreground">Ganhos este mês</div>
            </Card>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Weekly Missions */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Missões da Semana
                </h3>
                <p className="text-sm text-muted-foreground mt-1">Complete para ganhar bônus extras</p>
              </div>
              <Badge variant="secondary" className="font-semibold">
                0/{weeklyMissions.length}
              </Badge>
            </div>

            <ScrollArea className="h-[300px]">
              <div className="space-y-3 pr-4">
                {weeklyMissions.map((mission) => (
                  <Card 
                    key={mission.id} 
                    className={`p-4 transition-all duration-500 hover:shadow-md hover:scale-[1.02] ${
                      mission.completed 
                        ? 'bg-green-500/10 border-green-500/30 animate-pulse-slow' 
                        : 'bg-muted/30 border-border/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{mission.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Gift className="h-3 w-3" />
                          <span>Recompensa: <span className="font-semibold text-foreground">{mission.reward}</span></span>
                        </div>
                      </div>
                      {mission.completed && (
                        <Badge className="bg-green-600 text-white border-0 animate-scale-in">
                          <Check className="h-3 w-3 mr-1" />
                          Completa
                        </Badge>
                      )}
                      {!mission.completed && mission.progress < mission.total && (
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleCompleteMission(mission.id)}
                          className="text-xs"
                        >
                          Testar
                        </Button>
                      )}
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Progresso</span>
                        <span className="font-semibold">{mission.progress}/{mission.total}</span>
                      </div>
                      <Progress value={(mission.progress / mission.total) * 100} className="h-2" />
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </Card>

          {/* Rewards Catalog */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  Catálogo de Resgates
                </h3>
                <p className="text-sm text-muted-foreground mt-1">Troque seus pontos por benefícios</p>
              </div>
            </div>

            <ScrollArea className="h-[300px]">
              <div className="space-y-3 pr-4">
                {rewards.map((reward) => (
                  <Card key={reward.id} className="p-4 bg-muted/30 border-border/50 hover:border-primary/30 transition-all hover:shadow-md">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-sm">{reward.name}</h4>
                          <Badge variant="outline" className="text-xs">{reward.level}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{reward.discount}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">{reward.points}</div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-2">
                      Resgatar
                    </Button>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>

        {/* Recent Referrals */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Últimas Indicações
              </h3>
              <p className="text-sm text-muted-foreground mt-1">Acompanhe suas indicações recentes</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Convidado</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Data</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Recompensa</th>
                </tr>
              </thead>
              <tbody>
                {recentReferrals.map((referral, index) => (
                  <tr key={index} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4 font-medium">{referral.name}</td>
                    <td className="py-4 px-4">
                      <Badge 
                        variant={referral.status === "Ativa" ? "default" : "secondary"}
                        className={referral.status === "Ativa" ? "bg-green-600 border-0" : ""}
                      >
                        {referral.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{referral.date}</td>
                    <td className="py-4 px-4 font-semibold text-green-600">{referral.reward}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Indicacoes;
