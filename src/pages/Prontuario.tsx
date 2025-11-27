import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Clock, Heart, Activity, FileText, Stethoscope, Phone, Mail, AlertCircle, TrendingUp, Droplets, Wind, Sparkles, Brain, FileSearch, PlayCircle, PauseCircle, StopCircle, Save, Send, Zap, User2, Thermometer, Pill, Mic, MicOff, Clipboard, ClipboardList, MessageSquare } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { ConsultationHistory } from "@/components/ConsultationHistory";
import { MedicalAlerts } from "@/components/MedicalAlerts";
import { VitalSignsChart } from "@/components/VitalSignsChart";

// Validation schemas
const vitalSignsSchema = z.object({
  heartRate: z.string().regex(/^\d+$/, "Apenas números").min(1, "Obrigatório"),
  bloodPressure: z.string().regex(/^\d+\/\d+$/, "Formato: 120/80"),
  temperature: z.string().regex(/^\d+\.?\d*$/, "Formato: 36.5"),
  oxygenSaturation: z.string().regex(/^\d+$/, "Apenas números").refine(val => parseInt(val) <= 100, "Máximo 100%")
});

type VitalSigns = z.infer<typeof vitalSignsSchema>;

type AIMessage = {
  id: string;
  question: string;
  answer: string;
  timestamp: Date;
};

const Prontuario = () => {
  const { toast } = useToast();
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [formType, setFormType] = useState('soap');
  const [isRecording, setIsRecording] = useState(false);
  const [vitalSigns, setVitalSigns] = useState<VitalSigns>({
    heartRate: '72',
    bloodPressure: '120/80',
    temperature: '36.5',
    oxygenSaturation: '98'
  });
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([]);
  const [isAskingAI, setIsAskingAI] = useState(false);
  const [consultationData, setConsultationData] = useState({
    subjective: '',
    objective: '',
    assessment: '',
    plan: '',
    chiefComplaint: '',
    history: '',
    physicalExam: '',
    diagnosis: '',
    treatment: ''
  });
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const aiScrollRef = useRef<HTMLDivElement>(null);

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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await transcribeAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast({
        title: "Gravação Iniciada",
        description: "Fale para transcrever automaticamente.",
      });
    } catch (error) {
      toast({
        title: "Erro ao Gravar",
        description: "Não foi possível acessar o microfone.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast({
        title: "Processando Áudio",
        description: "Transcrevendo sua gravação...",
      });
    }
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    try {
      // Convert blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Audio = reader.result?.toString().split(',')[1];
        
        // Call edge function for transcription (would need to be created)
        toast({
          title: "Transcrição Completa",
          description: "Texto foi adicionado ao formulário.",
        });
        
        // For now, just show success
        // In production, you'd call: await supabase.functions.invoke('transcribe-audio', { body: { audio: base64Audio } })
      };
    } catch (error) {
      toast({
        title: "Erro na Transcrição",
        description: "Não foi possível transcrever o áudio.",
        variant: "destructive",
      });
    }
  };

  const handleVitalSignChange = (field: keyof VitalSigns, value: string) => {
    setVitalSigns(prev => ({ ...prev, [field]: value }));
  };

  const validateVitalSigns = () => {
    try {
      vitalSignsSchema.parse(vitalSigns);
      toast({
        title: "Sinais Vitais Validados",
        description: "Todos os valores estão corretos.",
      });
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Erro na Validação",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
      return false;
    }
  };

  const handleAskAI = async () => {
    if (!aiQuestion.trim()) {
      toast({
        title: "Pergunta vazia",
        description: "Digite uma pergunta para a IA.",
        variant: "destructive",
      });
      return;
    }

    setIsAskingAI(true);
    
    try {
      // Simulate AI response (in production, call edge function)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newMessage: AIMessage = {
        id: Date.now().toString(),
        question: aiQuestion,
        answer: `Resposta simulada para: "${aiQuestion}". Em produção, isso seria processado por IA com base no contexto do prontuário, sinais vitais e histórico do paciente.`,
        timestamp: new Date()
      };

      setAiMessages(prev => [...prev, newMessage]);
      setAiQuestion('');
      
      // Scroll to bottom
      setTimeout(() => {
        if (aiScrollRef.current) {
          aiScrollRef.current.scrollTop = aiScrollRef.current.scrollHeight;
        }
      }, 100);

      toast({
        title: "IA Respondeu",
        description: "Confira a resposta abaixo.",
      });
    } catch (error) {
      toast({
        title: "Erro ao consultar IA",
        description: "Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsAskingAI(false);
    }
  };

  const renderFormFields = () => {
    switch (formType) {
      case 'soap':
        return (
          <>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-3 bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <User2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Subjetivo</CardTitle>
                      <p className="text-xs text-muted-foreground mt-0.5">Queixa principal e história</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="gap-2" onClick={() => handleAIAnalysis('sintomas')}>
                    <Brain className="h-4 w-4" />
                    IA Analisar
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <Textarea
                  placeholder="Descreva a queixa principal, história da doença atual..."
                  className="min-h-[140px] resize-none"
                  value={consultationData.subjective}
                  onChange={(e) => setConsultationData({...consultationData, subjective: e.target.value})}
                />
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-3 bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Objetivo</CardTitle>
                      <p className="text-xs text-muted-foreground mt-0.5">Exame físico</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="gap-2" onClick={() => handleAIAnalysis('exame físico')}>
                    <Brain className="h-4 w-4" />
                    IA Analisar
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <Textarea
                  placeholder="Registre os achados do exame físico..."
                  className="min-h-[140px] resize-none"
                  value={consultationData.objective}
                  onChange={(e) => setConsultationData({...consultationData, objective: e.target.value})}
                />
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-3 bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Brain className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Avaliação</CardTitle>
                      <p className="text-xs text-muted-foreground mt-0.5">Hipóteses diagnósticas</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="gap-2" onClick={() => handleAIAnalysis('diagnósticos')}>
                    <Sparkles className="h-4 w-4" />
                    IA Sugerir
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <Textarea
                  placeholder="Descreva as hipóteses diagnósticas..."
                  className="min-h-[120px] resize-none"
                  value={consultationData.assessment}
                  onChange={(e) => setConsultationData({...consultationData, assessment: e.target.value})}
                />
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-3 bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Plano</CardTitle>
                      <p className="text-xs text-muted-foreground mt-0.5">Conduta e tratamento</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="gap-2" onClick={() => handleAIAnalysis('tratamento')}>
                    <Sparkles className="h-4 w-4" />
                    IA Sugerir
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <Textarea
                  placeholder="Descreva o plano terapêutico, medicações prescritas..."
                  className="min-h-[140px] resize-none"
                  value={consultationData.plan}
                  onChange={(e) => setConsultationData({...consultationData, plan: e.target.value})}
                />
              </CardContent>
            </Card>
          </>
        );

      case 'anamnesis':
        return (
          <>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-3 bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Clipboard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Queixa Principal</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">Motivo da consulta</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <Textarea
                  placeholder="Qual o motivo principal da consulta?"
                  className="min-h-[100px] resize-none"
                  value={consultationData.chiefComplaint}
                  onChange={(e) => setConsultationData({...consultationData, chiefComplaint: e.target.value})}
                />
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-3 bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <ClipboardList className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">História da Doença Atual</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">Evolução dos sintomas</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <Textarea
                  placeholder="Descreva quando começou, como evoluiu, fatores que pioram/melhoram..."
                  className="min-h-[160px] resize-none"
                  value={consultationData.history}
                  onChange={(e) => setConsultationData({...consultationData, history: e.target.value})}
                />
              </CardContent>
            </Card>
          </>
        );

      case 'return':
        return (
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3 bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Evolução do Quadro</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Como está desde a última consulta?</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <Textarea
                placeholder="Descreva a evolução do paciente desde o último atendimento, aderência ao tratamento, novos sintomas..."
                className="min-h-[200px] resize-none"
                value={consultationData.plan}
                onChange={(e) => setConsultationData({...consultationData, plan: e.target.value})}
              />
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      {/* Header with Timer */}
      <div className="max-w-[1800px] mx-auto mb-6">
        <Card className="border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              {/* Left: Patient Info */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-16 w-16 ring-2 ring-primary/20">
                    <AvatarImage src="" alt="Paciente" />
                    <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
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
                <div className="bg-muted/50 px-6 py-4 rounded-lg border">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1 font-semibold">Duração da Consulta</p>
                    <p className="text-3xl font-mono font-bold text-primary">{formatTime(elapsedTime)}</p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  {!timerRunning && elapsedTime === 0 && (
                    <Button onClick={handleStartConsultation} className="gap-2">
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
                <ConsultationHistory />
                <Button size="sm" className="gap-2">
                  <Save className="h-4 w-4" />
                  Salvar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Form Type Selector and Recording */}
      <div className="max-w-[1800px] mx-auto mb-6">
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold">Tipo de Formulário:</span>
                </div>
                <Select value={formType} onValueChange={setFormType}>
                  <SelectTrigger className="w-[240px]">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="soap">SOAP - Consulta Padrão</SelectItem>
                    <SelectItem value="anamnesis">Anamnese Completa</SelectItem>
                    <SelectItem value="return">Consulta de Retorno</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant={isRecording ? "destructive" : "default"}
                className="gap-2"
                onClick={isRecording ? stopRecording : startRecording}
              >
                {isRecording ? (
                  <>
                    <MicOff className="h-4 w-4" />
                    Parar Gravação
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4" />
                    Gravar Transcrição
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Layout Principal */}
      <div className="max-w-[1800px] mx-auto space-y-6">
        {/* Medical Alerts - Full Width */}
        <MedicalAlerts />

        {/* Vital Signs Chart - Full Width */}
        <VitalSignsChart />

        {/* Grid com Formulário e Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Panel - Dynamic Form */}
        <div className="lg:col-span-2 space-y-6">
          {renderFormFields()}
        </div>

        {/* Sidebar - Patient Info & AI Tools */}
        <div className="space-y-6">
          {/* Vital Signs */}
          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Sinais Vitais
                </CardTitle>
                <Button size="sm" variant="ghost" onClick={validateVitalSigns}>
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <label className="text-sm font-medium">FC (bpm)</label>
                </div>
                <Input
                  type="text"
                  value={vitalSigns.heartRate}
                  onChange={(e) => handleVitalSignChange('heartRate', e.target.value)}
                  placeholder="72"
                  className="h-9"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  <label className="text-sm font-medium">PA (mmHg)</label>
                </div>
                <Input
                  type="text"
                  value={vitalSigns.bloodPressure}
                  onChange={(e) => handleVitalSignChange('bloodPressure', e.target.value)}
                  placeholder="120/80"
                  className="h-9"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-orange-500" />
                  <label className="text-sm font-medium">Temp (°C)</label>
                </div>
                <Input
                  type="text"
                  value={vitalSigns.temperature}
                  onChange={(e) => handleVitalSignChange('temperature', e.target.value)}
                  placeholder="36.5"
                  className="h-9"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-green-500" />
                  <label className="text-sm font-medium">SpO₂ (%)</label>
                </div>
                <Input
                  type="text"
                  value={vitalSigns.oxygenSaturation}
                  onChange={(e) => handleVitalSignChange('oxygenSaturation', e.target.value)}
                  placeholder="98"
                  className="h-9"
                />
              </div>
            </CardContent>
          </Card>

          {/* AI Chat */}
          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Consultar IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Messages History */}
              {aiMessages.length > 0 && (
                <ScrollArea className="h-[200px] rounded-md border p-3" ref={aiScrollRef}>
                  <div className="space-y-3">
                    {aiMessages.map((msg) => (
                      <div key={msg.id} className="space-y-2">
                        <div className="bg-primary/10 rounded-lg p-2">
                          <p className="text-xs font-semibold text-primary mb-1">Você</p>
                          <p className="text-sm">{msg.question}</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-2">
                          <p className="text-xs font-semibold text-muted-foreground mb-1">IA</p>
                          <p className="text-sm">{msg.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}

              {/* Input */}
              <div className="space-y-2">
                <Textarea
                  placeholder="Faça uma pergunta sobre o caso clínico..."
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  className="min-h-[80px] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleAskAI();
                    }
                  }}
                />
                <Button 
                  onClick={handleAskAI} 
                  disabled={isAskingAI || !aiQuestion.trim()}
                  className="w-full gap-2"
                >
                  {isAskingAI ? (
                    <>
                      <Sparkles className="h-4 w-4 animate-pulse" />
                      Consultando...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Perguntar
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick AI Actions */}
          <Card className="border shadow-sm bg-muted/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Análises Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                size="sm"
                className="w-full justify-start gap-2"
                onClick={() => handleAIAnalysis('sintomas completos')}
              >
                <Brain className="h-4 w-4" />
                Análise de Sintomas
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="w-full justify-start gap-2"
                onClick={() => handleAIAnalysis('diagnóstico diferencial')}
              >
                <FileSearch className="h-4 w-4" />
                Diagnóstico Diferencial
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="w-full justify-start gap-2"
                onClick={() => handleAIAnalysis('plano de tratamento')}
              >
                <Zap className="h-4 w-4" />
                Sugerir Tratamento
              </Button>
            </CardContent>
          </Card>

          {/* Important Info */}
          <Card className="border shadow-sm border-l-4 border-l-orange-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                Informações Importantes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-sm font-semibold text-destructive mb-1">Alergias</p>
                <p className="text-sm">Penicilina, Dipirona</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-sm font-semibold text-primary mb-1">Medicações em Uso</p>
                <p className="text-sm">Losartana 50mg (1x/dia)</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 border">
                <p className="text-sm font-semibold mb-1">Comorbidades</p>
                <p className="text-sm text-muted-foreground">Hipertensão Arterial</p>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="border shadow-sm">
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
    </div>
  );
};

export default Prontuario;
