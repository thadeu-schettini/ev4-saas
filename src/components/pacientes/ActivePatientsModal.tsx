import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { UserCheck, TrendingUp, Activity, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const activityData = [
  { month: "Jan", ativos: 30 },
  { month: "Fev", ativos: 32 },
  { month: "Mar", ativos: 35 },
  { month: "Abr", ativos: 33 },
  { month: "Mai", ativos: 36 },
  { month: "Jun", ativos: 38 },
];

const recentActive = [
  { name: "Maria Silva", lastVisit: "Hoje", visits: 5 },
  { name: "João Santos", lastVisit: "Ontem", visits: 3 },
  { name: "Ana Costa", lastVisit: "2 dias", visits: 8 },
  { name: "Carlos Lima", lastVisit: "3 dias", visits: 4 },
];

interface ActivePatientsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  active: number;
}

export function ActivePatientsModal({ open, onOpenChange, active }: ActivePatientsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-success/10">
              <UserCheck className="h-5 w-5 text-success" />
            </div>
            Pacientes Ativos
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
              <p className="text-sm text-muted-foreground">Total Ativos</p>
              <p className="text-2xl font-bold text-success">{active}</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <p className="text-sm text-muted-foreground">% do Total</p>
              <p className="text-2xl font-bold text-primary">76%</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-info/10 to-info/5 border border-info/20">
              <p className="text-sm text-muted-foreground">Média Visitas</p>
              <p className="text-2xl font-bold text-info">4.2</p>
            </div>
          </div>

          {/* Chart */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Evolução de Pacientes Ativos</h4>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <XAxis dataKey="month" fontSize={12} stroke="hsl(var(--muted-foreground))" />
                  <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                  <Bar dataKey="ativos" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Active */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Últimos Atendimentos</h4>
            <div className="space-y-2">
              {recentActive.map((patient, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center text-success font-medium text-sm">
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{patient.name}</p>
                      <p className="text-xs text-muted-foreground">{patient.visits} consultas</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">{patient.lastVisit}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
