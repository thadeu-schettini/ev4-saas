import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { PiggyBank, Wallet, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const balanceHistory = [
  { month: "Jan", saldo: 17000 },
  { month: "Fev", saldo: 21000 },
  { month: "Mar", saldo: 19000 },
  { month: "Abr", saldo: 26000 },
  { month: "Mai", saldo: 23000 },
  { month: "Jun", saldo: 29000 },
];

const monthlyComparison = [
  { month: "Jan", receita: 45000, despesa: 28000 },
  { month: "Fev", receita: 52000, despesa: 31000 },
  { month: "Mar", receita: 48000, despesa: 29000 },
  { month: "Abr", receita: 61000, despesa: 35000 },
  { month: "Mai", receita: 55000, despesa: 32000 },
  { month: "Jun", receita: 67000, despesa: 38000 },
];

interface BalanceDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
}

export function BalanceDetailModal({ open, onOpenChange, total }: BalanceDetailModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-info/10">
              <PiggyBank className="h-5 w-5 text-info" />
            </div>
            Saldo
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-info/10 to-info/5 border border-info/20">
              <p className="text-sm text-muted-foreground">Saldo Atual</p>
              <p className="text-2xl font-bold text-info">R$ {total.toLocaleString('pt-BR')}</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
              <p className="text-sm text-muted-foreground">Margem</p>
              <p className="text-2xl font-bold text-success">43%</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <p className="text-sm text-muted-foreground">Tendência</p>
              <p className="text-2xl font-bold text-primary flex items-center gap-1">
                <TrendingUp className="h-5 w-5" />
                +26%
              </p>
            </div>
          </div>

          {/* Balance Chart */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Evolução do Saldo</h4>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={balanceHistory}>
                  <defs>
                    <linearGradient id="colorSaldo" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--info))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--info))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" fontSize={12} stroke="hsl(var(--muted-foreground))" />
                  <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${v/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} 
                    formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Saldo']}
                  />
                  <Area type="monotone" dataKey="saldo" stroke="hsl(var(--info))" fill="url(#colorSaldo)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Comparison */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Receita x Despesa</h4>
            <div className="h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyComparison}>
                  <XAxis dataKey="month" fontSize={10} stroke="hsl(var(--muted-foreground))" />
                  <YAxis fontSize={10} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${v/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} 
                    formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
                  />
                  <Bar dataKey="receita" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} name="Receita" />
                  <Bar dataKey="despesa" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} name="Despesa" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
