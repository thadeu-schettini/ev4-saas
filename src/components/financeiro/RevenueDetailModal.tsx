import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ArrowUpRight, Calendar, DollarSign } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const monthlyRevenue = [
  { month: "Jan", receita: 45000 },
  { month: "Fev", receita: 52000 },
  { month: "Mar", receita: 48000 },
  { month: "Abr", receita: 61000 },
  { month: "Mai", receita: 55000 },
  { month: "Jun", receita: 67000 },
];

const sourceRevenue = [
  { source: "Consultas", valor: 35000 },
  { source: "Exames", valor: 18000 },
  { source: "Procedimentos", valor: 12000 },
  { source: "Outros", valor: 2000 },
];

interface RevenueDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
}

export function RevenueDetailModal({ open, onOpenChange, total }: RevenueDetailModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-success/10">
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
            Receita Total
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
              <p className="text-sm text-muted-foreground">Total Mês</p>
              <p className="text-2xl font-bold text-success">R$ {total.toLocaleString('pt-BR')}</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <p className="text-sm text-muted-foreground">Variação</p>
              <p className="text-2xl font-bold text-primary flex items-center gap-1">
                <ArrowUpRight className="h-5 w-5" />
                +12%
              </p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-info/10 to-info/5 border border-info/20">
              <p className="text-sm text-muted-foreground">Média Diária</p>
              <p className="text-2xl font-bold text-info">R$ 2.2k</p>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Evolução Mensal</h4>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRevenue}>
                  <defs>
                    <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" fontSize={12} stroke="hsl(var(--muted-foreground))" />
                  <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${v/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} 
                    formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Receita']}
                  />
                  <Area type="monotone" dataKey="receita" stroke="hsl(142, 76%, 36%)" fill="url(#colorReceita)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue by Source */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Receita por Fonte</h4>
            <div className="h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sourceRevenue} layout="vertical">
                  <XAxis type="number" fontSize={10} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${v/1000}k`} />
                  <YAxis type="category" dataKey="source" fontSize={10} stroke="hsl(var(--muted-foreground))" width={90} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} 
                    formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
                  />
                  <Bar dataKey="valor" fill="hsl(var(--success))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
