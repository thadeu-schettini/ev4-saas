import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Bell, Mail, MessageSquare, Smartphone, CheckCircle2, XCircle, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { LucideIcon } from "lucide-react";

const channelIcons: Record<string, LucideIcon> = {
  Push: Bell,
  "E-mail": Mail,
  SMS: MessageSquare,
  WhatsApp: Smartphone,
};

const channelColors: Record<string, string> = {
  Push: "from-amber-500 to-orange-500",
  "E-mail": "from-blue-500 to-cyan-500",
  SMS: "from-emerald-500 to-green-500",
  WhatsApp: "from-green-500 to-emerald-500",
};

const weeklyData = [
  { day: "Seg", enviadas: 180, entregues: 172 },
  { day: "Ter", enviadas: 210, entregues: 201 },
  { day: "Qua", enviadas: 150, entregues: 144 },
  { day: "Qui", enviadas: 240, entregues: 232 },
  { day: "Sex", enviadas: 195, entregues: 188 },
  { day: "Sáb", enviadas: 110, entregues: 107 },
  { day: "Dom", enviadas: 60, entregues: 58 },
];

interface ChannelDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  channel: {
    name: string;
    sent: number;
    delivered: number;
    failed: number;
    rate: number;
  } | null;
}

export function ChannelDetailModal({ open, onOpenChange, channel }: ChannelDetailModalProps) {
  if (!channel) return null;
  
  const Icon = channelIcons[channel.name] || Bell;
  const color = channelColors[channel.name] || "from-primary to-primary";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${color}`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            Detalhes - {channel.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <p className="text-xs text-muted-foreground">Enviadas</p>
              <p className="text-xl font-bold text-primary">{channel.sent.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
              <p className="text-xs text-muted-foreground">Entregues</p>
              <p className="text-xl font-bold text-success">{channel.delivered.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-destructive/10 to-destructive/5 border border-destructive/20">
              <p className="text-xs text-muted-foreground">Falhas</p>
              <p className="text-xl font-bold text-destructive">{channel.failed}</p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-info/10 to-info/5 border border-info/20">
              <p className="text-xs text-muted-foreground">Taxa</p>
              <p className="text-xl font-bold text-info">{channel.rate}%</p>
            </div>
          </div>

          {/* Chart */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Performance Semanal</h4>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="colorEnv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorEnt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" fontSize={12} stroke="hsl(var(--muted-foreground))" />
                  <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="enviadas" stroke="hsl(var(--primary))" fill="url(#colorEnv)" strokeWidth={2} name="Enviadas" />
                  <Area type="monotone" dataKey="entregues" stroke="hsl(142, 76%, 36%)" fill="url(#colorEnt)" strokeWidth={2} name="Entregues" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Últimas Notificações</h4>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((_, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-2">
                    {idx % 4 !== 3 ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : (
                      <XCircle className="h-4 w-4 text-destructive" />
                    )}
                    <span className="text-sm">Paciente {idx + 1}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{idx * 5 + 2} min atrás</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
