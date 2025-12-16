import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Layers, TrendingUp, CheckCircle2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const planData = [
  { name: "Pré-natal", pacientes: 24 },
  { name: "Fisioterapia", pacientes: 18 },
  { name: "Check-up", pacientes: 42 },
  { name: "Dermatologia", pacientes: 12 },
];

const topPlans = [
  { name: "Check-up Cardiológico", patients: 42, status: "Ativo" },
  { name: "Pré-natal Baixo Risco", patients: 24, status: "Ativo" },
  { name: "Fisioterapia Lombar", patients: 18, status: "Ativo" },
  { name: "Tratamento Dermatológico", patients: 12, status: "Ativo" },
];

interface ActivePlansModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ActivePlansModal({ open, onOpenChange }: ActivePlansModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
              <Layers className="h-5 w-5 text-white" />
            </div>
            Planos Ativos
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20">
              <p className="text-sm text-muted-foreground">Total Ativos</p>
              <p className="text-2xl font-bold text-blue-600">12</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
              <p className="text-sm text-muted-foreground">Novos este mês</p>
              <p className="text-2xl font-bold text-success">+2</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <p className="text-sm text-muted-foreground">Mais Popular</p>
              <p className="text-lg font-bold text-primary">Check-up</p>
            </div>
          </div>

          {/* Chart */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Pacientes por Plano</h4>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={planData} layout="vertical">
                  <XAxis type="number" fontSize={12} stroke="hsl(var(--muted-foreground))" />
                  <YAxis type="category" dataKey="name" fontSize={12} stroke="hsl(var(--muted-foreground))" width={100} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                  <Bar dataKey="pacientes" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Plans */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Ranking de Planos</h4>
            <div className="space-y-2">
              {topPlans.map((plan, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                      {idx + 1}
                    </div>
                    <p className="font-medium text-sm">{plan.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{plan.patients} pacientes</Badge>
                    <Badge variant="default" className="text-xs gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      {plan.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
