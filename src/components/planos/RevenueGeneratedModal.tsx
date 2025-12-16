import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Layers } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const revenueData = [
  { month: "Jan", receita: 32000 },
  { month: "Fev", receita: 35000 },
  { month: "Mar", receita: 38000 },
  { month: "Abr", receita: 41000 },
  { month: "Mai", receita: 40000 },
  { month: "Jun", receita: 42500 },
];

const planRevenue = [
  { name: "Check-up", receita: 18500 },
  { name: "Pré-natal", receita: 12000 },
  { name: "Fisioterapia", receita: 8500 },
  { name: "Dermatologia", receita: 3500 },
];

interface RevenueGeneratedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RevenueGeneratedModal({ open, onOpenChange }: RevenueGeneratedModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
            Receita Gerada
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-500/5 border border-violet-500/20">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold text-violet-600">R$ 42.5k</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
              <p className="text-sm text-muted-foreground">Variação</p>
              <p className="text-2xl font-bold text-success">+12%</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <p className="text-sm text-muted-foreground">Ticket Médio</p>
              <p className="text-2xl font-bold text-primary">R$ 408</p>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Evolução da Receita</h4>
            <div className="h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(262 83% 58%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(262 83% 58%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" fontSize={12} stroke="hsl(var(--muted-foreground))" />
                  <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${v/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} 
                    formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Receita']}
                  />
                  <Area type="monotone" dataKey="receita" stroke="hsl(262 83% 58%)" fill="url(#colorRevenue)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue by Plan */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Receita por Plano</h4>
            <div className="h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={planRevenue} layout="vertical">
                  <XAxis type="number" fontSize={10} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${v/1000}k`} />
                  <YAxis type="category" dataKey="name" fontSize={10} stroke="hsl(var(--muted-foreground))" width={80} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} 
                    formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Receita']}
                  />
                  <Bar dataKey="receita" fill="hsl(262 83% 58%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
