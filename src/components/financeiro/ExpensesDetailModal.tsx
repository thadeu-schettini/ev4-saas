import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, ArrowDownRight, Receipt } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const monthlyExpenses = [
  { month: "Jan", despesa: 28000 },
  { month: "Fev", despesa: 31000 },
  { month: "Mar", despesa: 29000 },
  { month: "Abr", despesa: 35000 },
  { month: "Mai", despesa: 32000 },
  { month: "Jun", despesa: 38000 },
];

const categoryExpenses = [
  { name: "Aluguel", value: 40, color: "hsl(var(--chart-1))" },
  { name: "Salários", value: 35, color: "hsl(var(--chart-2))" },
  { name: "Materiais", value: 15, color: "hsl(var(--chart-3))" },
  { name: "Outros", value: 10, color: "hsl(var(--chart-4))" },
];

interface ExpensesDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
}

export function ExpensesDetailModal({ open, onOpenChange, total }: ExpensesDetailModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-destructive/10">
              <TrendingDown className="h-5 w-5 text-destructive" />
            </div>
            Despesas
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-destructive/10 to-destructive/5 border border-destructive/20">
              <p className="text-sm text-muted-foreground">Total Mês</p>
              <p className="text-2xl font-bold text-destructive">R$ {total.toLocaleString('pt-BR')}</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
              <p className="text-sm text-muted-foreground">Variação</p>
              <p className="text-2xl font-bold text-success flex items-center gap-1">
                <ArrowDownRight className="h-5 w-5" />
                -5%
              </p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-info/10 to-info/5 border border-info/20">
              <p className="text-sm text-muted-foreground">Média Diária</p>
              <p className="text-2xl font-bold text-info">R$ 1.9k</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground">Evolução Mensal</h4>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyExpenses}>
                    <defs>
                      <linearGradient id="colorDespesa" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" fontSize={10} stroke="hsl(var(--muted-foreground))" />
                    <YAxis fontSize={10} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${v/1000}k`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} 
                      formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Despesa']}
                    />
                    <Area type="monotone" dataKey="despesa" stroke="hsl(var(--destructive))" fill="url(#colorDespesa)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground">Por Categoria</h4>
              <div className="h-[140px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryExpenses} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" paddingAngle={3}>
                      {categoryExpenses.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1">
                {categoryExpenses.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
