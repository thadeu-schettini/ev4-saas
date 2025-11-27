import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Heart, Activity, FileText, Stethoscope, Phone, Mail, AlertCircle, TrendingUp, Droplets, Wind, Sparkles, Brain, FileSearch, PlayCircle, PauseCircle, StopCircle, Save, Send, Zap, User2, Thermometer, Pill } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const Prontuario = () => {
  const { toast } = useToast();
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [consultationData, setConsultationData] = useState({
    subjective: '',
    objective: '',
    assessment: '',
    plan: ''
  });

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartConsultation = () => {
    setTimerRunning(true);
    toast({
      title: "Consulta Iniciada",
      description: "O timer está ativo. Boa consulta!",
    });
  };

  const handlePauseConsultation = () => {
    setTimerRunning(false);
    toast({
      title: "Consulta Pausada",
      description: "Timer pausado.",
    });
  };

  const handleFinishConsultation = () => {
    setTimerRunning(false);
    toast({
      title: "Consulta Finalizada",
      description: `Duração total: ${formatTime(elapsedTime)}`,
    });
  };

  const handleAIAnalysis = (type: string) => {
    toast({
      title: "IA Analisando...",
      description: `Processando ${type} com inteligência artificial.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background p-4 md:p-6">
      {/* Header with Timer */}
      <div className="max-w-[1800px] mx-auto mb-6">
        <Card className="border-0 shadow-xl bg-gradient-to-r from-card via-card to-card/95 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between flex-wrap gap-4">
              {/* Left: Patient Info */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-16 w-16 ring-4 ring-primary/20 shadow-lg">
                    <AvatarImage src="" alt="Paciente" />
                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-secondary text-white">
                      PE
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-green-500 rounded-full border-2 border-background" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Paciente 13 Ebert-Lynch</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">28 anos</Badge>
                    <Badge variant="outline" className="text-xs">Cardiologia</Badge>
                  </div>
                </div>
              </div>

              {/* Center: Timer */}
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 px-6 py-4 rounded-2xl border border-primary/20 backdrop-blur-sm">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1 font-semibold">Duração da Consulta</p>
                    <p className="text-3xl font-mono font-bold text-primary">{formatTime(elapsedTime)}</p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  {!timerRunning && elapsedTime === 0 && (
                    <Button onClick={handleStartConsultation} className="gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg">
                      <PlayCircle className="h-4 w-4" />
                      Iniciar
                    </Button>
                  )}
                  {timerRunning && (
                    <Button onClick={handlePauseConsultation} variant="outline" className="gap-2">
                      <PauseCircle className="h-4 w-4" />
                      Pausar
                    </Button>
                  )}
                  {elapsedTime > 0 && (
                    <Button onClick={handleFinishConsultation} variant="destructive" className="gap-2" size="sm">
                      <StopCircle className="h-4 w-4" />
                      Finalizar
                    </Button>
                  )}
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <FileSearch className="h-4 w-4" />
                  Histórico
                </Button>
                <Button size="sm" className="gap-2 bg-gradient-to-r from-primary to-secondary">
                  <Save className="h-4 w-4" />
                  Salvar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Layout */}
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Panel - SOAP Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Subjetivo */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3 bg-gradient-to-r from-blue-500/5 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <User2 className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Subjetivo</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">Queixa principal e história</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => handleAIAnalysis('sintomas')}
                >
                  <Brain className="h-4 w-4" />
                  IA Analisar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <Textarea
                placeholder="Descreva a queixa principal, história da doença atual, sintomas relatados pelo paciente..."
                className="min-h-[140px] resize-none"
                value={consultationData.subjective}
                onChange={(e) => setConsultationData({...consultationData, subjective: e.target.value})}
              />
              <div className="mt-3 flex items-center gap-2">
                <Button variant="ghost" size="sm" className="gap-2 text-xs h-8">
                  <Sparkles className="h-3 w-3" />
                  Sugerir perguntas
                </Button>
                <Button variant="ghost" size="sm" className="gap-2 text-xs h-8">
                  <Zap className="h-3 w-3" />
                  Expandir texto
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Objetivo */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3 bg-gradient-to-r from-green-500/5 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <Activity className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Objetivo</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">Exame físico e sinais vitais</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => handleAIAnalysis('exame físico')}
                >
                  <Brain className="h-4 w-4" />
                  IA Analisar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <Textarea
                placeholder="Registre os achados do exame físico, sinais vitais aferidos, inspeção, palpação, ausculta..."
                className="min-h-[140px] resize-none"
                value={consultationData.objective}
                onChange={(e) => setConsultationData({...consultationData, objective: e.target.value})}
              />
              <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
                <Input placeholder="PA: 120/80" className="h-8 text-xs" />
                <Input placeholder="FC: 72 bpm" className="h-8 text-xs" />
                <Input placeholder="Temp: 36.5°C" className="h-8 text-xs" />
                <Input placeholder="SpO2: 98%" className="h-8 text-xs" />
              </div>
            </CardContent>
          </Card>

          {/* Avaliação */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3 bg-gradient-to-r from-purple-500/5 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Brain className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Avaliação</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">Hipóteses diagnósticas</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => handleAIAnalysis('diagnósticos')}
                >
                  <Sparkles className="h-4 w-4" />
                  IA Sugerir
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <Textarea
                placeholder="Descreva as hipóteses diagnósticas, diagnóstico diferencial, análise dos sintomas e achados..."
                className="min-h-[120px] resize-none"
                value={consultationData.assessment}
                onChange={(e) => setConsultationData({...consultationData, assessment: e.target.value})}
              />
            </CardContent>
          </Card>

          {/* Plano */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3 bg-gradient-to-r from-orange-500/5 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/10">
                    <FileText className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Plano</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">Conduta e tratamento</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => handleAIAnalysis('tratamento')}
                >
                  <Sparkles className="h-4 w-4" />
                  IA Sugerir
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <Textarea
                placeholder="Descreva o plano terapêutico, medicações prescritas, exames solicitados, orientações ao paciente..."
                className="min-h-[140px] resize-none"
                value={consultationData.plan}
                onChange={(e) => setConsultationData({...consultationData, plan: e.target.value})}
              />
              <div className="mt-3 flex items-center gap-2">
                <Button variant="ghost" size="sm" className="gap-2 text-xs h-8">
                  <Pill className="h-3 w-3" />
                  Prescrição rápida
                </Button>
                <Button variant="ghost" size="sm" className="gap-2 text-xs h-8">
                  <FileText className="h-3 w-3" />
                  Solicitar exames
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Patient Info & AI Tools */}
        <div className="space-y-6">
          {/* Vital Signs */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Sinais Vitais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium">FC</span>
                </div>
                <span className="text-lg font-bold">72 bpm</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">PA</span>
                </div>
                <span className="text-lg font-bold">120/80</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-orange-500/5 border border-orange-500/10">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">Temp</span>
                </div>
                <span className="text-lg font-bold">36.5°C</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/5 border border-green-500/10">
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">SpO₂</span>
                </div>
                <span className="text-lg font-bold">98%</span>
              </div>
            </CardContent>
          </Card>

          {/* AI Assistant */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 via-card to-secondary/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Assistente IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2 hover:bg-primary/10"
                onClick={() => handleAIAnalysis('sintomas completos')}
              >
                <Brain className="h-4 w-4" />
                Análise de Sintomas
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2 hover:bg-primary/10"
                onClick={() => handleAIAnalysis('diagnóstico diferencial')}
              >
                <FileSearch className="h-4 w-4" />
                Diagnóstico Diferencial
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2 hover:bg-primary/10"
                onClick={() => handleAIAnalysis('plano de tratamento')}
              >
                <Zap className="h-4 w-4" />
                Sugerir Tratamento
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2 hover:bg-primary/10"
                onClick={() => handleAIAnalysis('transcrição de voz')}
              >
                <Send className="h-4 w-4" />
                Transcrever Consulta
              </Button>
            </CardContent>
          </Card>

          {/* Important Info */}
          <Card className="border-0 shadow-lg border-l-4 border-l-orange-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                Informações Importantes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-1">Alergias</p>
                <p className="text-sm">Penicilina, Dipirona</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">Medicações em Uso</p>
                <p className="text-sm">Losartana 50mg (1x/dia)</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-1">Comorbidades</p>
                <p className="text-sm">Hipertensão Arterial</p>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>551191014814</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-xs">paciente@email.com</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Prontuario;
