import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  Users,
  MonitorUp,
  MoreVertical,
  Clock,
  CheckCircle2,
  Wifi,
  Volume2
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

  useEffect(() => {
    if (open && isConnecting) {
      const interval = setInterval(() => {
        setConnectionProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsConnecting(false);
            setIsConnected(true);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
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

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setIsConnecting(true);
    setIsConnected(false);
    setConnectionProgress(0);
    setCallDuration(0);
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
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/70">
              <Video className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold">Teleconsulta</h3>
              <p className="text-sm text-muted-foreground">{defaultAppointment.professional}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isConnected && (
              <>
                <Badge className="bg-success/10 text-success border-success/20 gap-1">
                  <Wifi className="h-3 w-3" />
                  Conectado
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDuration(callDuration)}
                </Badge>
              </>
            )}
          </div>
        </div>

        {/* Main Video Area */}
        <div className="relative aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
          {isConnecting ? (
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto animate-pulse">
                <Video className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Conectando...</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Aguarde enquanto preparamos sua teleconsulta
              </p>
              <Progress value={connectionProgress} className="w-48 mx-auto" />
            </div>
          ) : (
            <>
              {/* Remote Video (Doctor) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4">
                    <span className="text-4xl">👨‍⚕️</span>
                  </div>
                  <h3 className="font-semibold">{defaultAppointment.professional}</h3>
                  <p className="text-sm text-muted-foreground">{defaultAppointment.specialty}</p>
                </div>
              </div>

              {/* Local Video (Patient) */}
              <div className="absolute bottom-4 right-4 w-40 h-28 rounded-xl bg-muted border-2 border-border overflow-hidden shadow-lg">
                {videoEnabled ? (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                    <span className="text-2xl">👤</span>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <VideoOff className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                  <Badge variant="secondary" className="text-[10px] h-5">Você</Badge>
                </div>
              </div>

              {/* Connection Quality */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <Badge variant="outline" className="bg-card/80 backdrop-blur-sm gap-1">
                  <div className="flex gap-0.5">
                    <div className="w-1 h-2 bg-success rounded-full" />
                    <div className="w-1 h-3 bg-success rounded-full" />
                    <div className="w-1 h-4 bg-success rounded-full" />
                    <div className="w-1 h-5 bg-success rounded-full" />
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
              className="h-12 w-12 rounded-full"
              onClick={() => setMicEnabled(!micEnabled)}
            >
              {micEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </Button>

            <Button
              variant={videoEnabled ? "outline" : "destructive"}
              size="icon"
              className="h-12 w-12 rounded-full"
              onClick={() => setVideoEnabled(!videoEnabled)}
            >
              {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full"
            >
              <Volume2 className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full"
            >
              <MonitorUp className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full"
            >
              <Settings className="h-5 w-5" />
            </Button>

            <div className="w-px h-8 bg-border mx-2" />

            <Button
              variant="destructive"
              size="icon"
              className="h-12 w-12 rounded-full"
              onClick={handleEndCall}
            >
              <Phone className="h-5 w-5 rotate-[135deg]" />
            </Button>
          </div>

          {/* Tips */}
          {isConnected && (
            <div className="mt-4 p-3 rounded-lg bg-info/10 border border-info/20 text-center">
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
