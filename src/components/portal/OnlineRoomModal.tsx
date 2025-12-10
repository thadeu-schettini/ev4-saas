import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoOff,
  Phone,
  Settings,
  MessageSquare,
  MonitorUp,
  Clock,
  Wifi,
  Volume2,
  Sparkles,
  CheckCircle2
} from "lucide-react";

interface OnlineRoomModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment?: {
    professional: string;
    specialty: string;
    time: string;
  };
}

export function OnlineRoomModal({ open, onOpenChange, appointment }: OnlineRoomModalProps) {
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [isConnecting, setIsConnecting] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionProgress, setConnectionProgress] = useState(0);
  const [callDuration, setCallDuration] = useState(0);
  const [connectionStep, setConnectionStep] = useState(0);

  const connectionSteps = [
    "Verificando conexão...",
    "Conectando ao servidor...",
    "Preparando sala...",
    "Entrando na consulta..."
  ];

  useEffect(() => {
    if (open && isConnecting) {
      setConnectionProgress(0);
      setConnectionStep(0);
      
      const interval = setInterval(() => {
        setConnectionProgress(prev => {
          const newProgress = prev + 5;
          
          // Update connection step based on progress
          if (newProgress >= 25 && newProgress < 50) setConnectionStep(1);
          else if (newProgress >= 50 && newProgress < 75) setConnectionStep(2);
          else if (newProgress >= 75) setConnectionStep(3);
          
          if (newProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsConnecting(false);
              setIsConnected(true);
            }, 500);
            return 100;
          }
          return newProgress;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [open, isConnecting]);

  useEffect(() => {
    if (isConnected) {
      const timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isConnected]);

  useEffect(() => {
    if (!open) {
      // Reset state when modal closes
      setTimeout(() => {
        setIsConnecting(true);
        setIsConnected(false);
        setConnectionProgress(0);
        setCallDuration(0);
        setConnectionStep(0);
      }, 300);
    }
  }, [open]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    onOpenChange(false);
  };

  const defaultAppointment = appointment || {
    professional: "Dr. Ricardo Carvalho",
    specialty: "Cardiologia",
    time: "10:00"
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden bg-card/95 backdrop-blur-xl border-2 border-primary/20 rounded-2xl shadow-2xl p-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-xl transition-all duration-500",
              isConnected 
                ? "bg-gradient-to-br from-success to-success/70" 
                : "bg-gradient-to-br from-primary to-primary/70"
            )}>
              <Video className={cn(
                "h-5 w-5",
                isConnected ? "text-success-foreground" : "text-primary-foreground"
              )} />
            </div>
            <div>
              <h3 className="font-semibold">Teleconsulta</h3>
              <p className="text-sm text-muted-foreground">{defaultAppointment.professional}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isConnected && (
              <>
                <Badge className="bg-success/10 text-success border-success/20 gap-1 animate-[fade-in_0.3s_ease-out]">
                  <Wifi className="h-3 w-3" />
                  Conectado
                </Badge>
                <Badge variant="outline" className="gap-1 animate-[fade-in_0.3s_ease-out_0.1s_both]">
                  <Clock className="h-3 w-3" />
                  {formatDuration(callDuration)}
                </Badge>
              </>
            )}
          </div>
        </div>

        {/* Main Video Area */}
        <div className="relative aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden">
          {isConnecting ? (
            <div className="text-center z-10">
              {/* Animated Connection Circle */}
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center animate-ping absolute" />
                  <div className="w-16 h-16 rounded-full bg-primary/30 flex items-center justify-center">
                    <Video className="h-8 w-8 text-primary animate-pulse" />
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 animate-bounce">
                  <Sparkles className="h-6 w-6 text-warning" />
                </div>
              </div>
              
              <h3 className="font-semibold mb-1 animate-[fade-in_0.3s_ease-out]">
                {connectionSteps[connectionStep]}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 animate-[fade-in_0.3s_ease-out]">
                Aguarde enquanto preparamos sua teleconsulta
              </p>
              
              <div className="w-64 mx-auto space-y-2">
                <Progress value={connectionProgress} className="h-2" />
                <p className="text-xs text-muted-foreground">{connectionProgress}%</p>
              </div>

              {/* Connection Steps Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {[0, 1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      step <= connectionStep 
                        ? "bg-primary scale-125" 
                        : "bg-muted"
                    )}
                  />
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-info/5 animate-pulse" />
              
              {/* Remote Video (Doctor) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center animate-[scale-in_0.5s_ease-out]">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4 ring-4 ring-primary/20 animate-pulse">
                    <span className="text-5xl">👨‍⚕️</span>
                  </div>
                  <h3 className="font-semibold text-lg">{defaultAppointment.professional}</h3>
                  <p className="text-sm text-muted-foreground">{defaultAppointment.specialty}</p>
                  <Badge className="mt-2 bg-success/10 text-success border-success/20 gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Na chamada
                  </Badge>
                </div>
              </div>

              {/* Local Video (Patient) */}
              <div className="absolute bottom-4 right-4 w-40 h-28 rounded-xl bg-muted border-2 border-border overflow-hidden shadow-lg transition-all hover:scale-105 hover:shadow-xl animate-[slide-in-right_0.5s_ease-out]">
                {videoEnabled ? (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                    <span className="text-3xl">👤</span>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <VideoOff className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                  <Badge variant="secondary" className="text-[10px] h-5">Você</Badge>
                </div>
              </div>

              {/* Connection Quality */}
              <div className="absolute top-4 left-4 flex items-center gap-2 animate-[fade-in_0.5s_ease-out]">
                <Badge variant="outline" className="bg-card/80 backdrop-blur-sm gap-1">
                  <div className="flex gap-0.5">
                    {[2, 3, 4, 5].map((h, i) => (
                      <div 
                        key={i}
                        className="w-1 bg-success rounded-full transition-all"
                        style={{ 
                          height: `${h * 2}px`,
                          animationDelay: `${i * 100}ms`
                        }}
                      />
                    ))}
                  </div>
                  Excelente
                </Badge>
              </div>
            </>
          )}
        </div>

        {/* Controls */}
        <div className="p-4 bg-muted/30">
          <div className="flex items-center justify-center gap-3">
            <Button
              variant={micEnabled ? "outline" : "destructive"}
              size="icon"
              className={cn(
                "h-12 w-12 rounded-full transition-all duration-300",
                "hover:scale-110 active:scale-95",
                micEnabled ? "hover:bg-primary/10" : ""
              )}
              onClick={() => setMicEnabled(!micEnabled)}
            >
              {micEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </Button>

            <Button
              variant={videoEnabled ? "outline" : "destructive"}
              size="icon"
              className={cn(
                "h-12 w-12 rounded-full transition-all duration-300",
                "hover:scale-110 active:scale-95",
                videoEnabled ? "hover:bg-primary/10" : ""
              )}
              onClick={() => setVideoEnabled(!videoEnabled)}
            >
              {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full hover:scale-110 active:scale-95 transition-all hover:bg-primary/10"
            >
              <Volume2 className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full hover:scale-110 active:scale-95 transition-all hover:bg-primary/10"
            >
              <MonitorUp className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full hover:scale-110 active:scale-95 transition-all hover:bg-primary/10"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full hover:scale-110 active:scale-95 transition-all hover:bg-primary/10 hover:rotate-90"
            >
              <Settings className="h-5 w-5" />
            </Button>

            <div className="w-px h-8 bg-border mx-2" />

            <Button
              variant="destructive"
              size="icon"
              className="h-12 w-12 rounded-full hover:scale-110 active:scale-95 transition-all shadow-lg shadow-destructive/30"
              onClick={handleEndCall}
            >
              <Phone className="h-5 w-5 rotate-[135deg]" />
            </Button>
          </div>

          {/* Tips */}
          {isConnected && (
            <div className="mt-4 p-3 rounded-lg bg-info/10 border border-info/20 text-center animate-[fade-in_0.5s_ease-out]">
              <p className="text-sm text-info">
                💡 Dica: Mantenha-se em um ambiente bem iluminado e silencioso para melhor qualidade da consulta.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
