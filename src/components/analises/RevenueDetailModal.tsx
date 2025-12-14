import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DollarSign, TrendingUp, TrendingDown, Calendar, Download, ArrowUpRight } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

interface RevenueDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const monthlyData = [
  { month: "Jan", receita: 45000, despesas: 32000, lucro: 13000 },
  { month: "Fev", receita: 52000, despesas: 35000, lucro: 17000 },
  { month: "Mar", receita: 48000, despesas: 31000, lucro: 17000 },
  { month: "Abr", receita: 61000, despesas: 38000, lucro: 23000 },
  { month: "Mai", receita: 55000, despesas: 36000, lucro: 19000 },
  { month: "Jun", receita: 67000, despesas: 42000, lucro: 25000 },
];

const revenueByService = [
  { service: "Cardiologia", value: 28500, percentage: 42 },
  { service: "Dermatologia", value: 15200, percentage: 23 },
  { service: "Ortopedia", value: 12800, percentage: 19 },
  { service: "Pediatria", value: 7500, percentage: 11 },
  { service: "Outros", value: 3000, percentage: 5 },
];

const revenueByPaymentMethod = [
  { method: "Particular", value: 38000, percentage: 57 },
  { method: "Convênio", value: 22000, percentage: 33 },
  { method: "Cortesia", value: 7000, percentage: 10 },
];

export function RevenueDetailModal({ open, onOpenChange }: RevenueDetailModalProps) {
  const [period, setPeriod] = useState("6meses");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 shadow-lg">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl">Receita Líquida</DialogTitle>
                <p className="text-sm text-muted-foreground">Análise detalhada de faturamento</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30dias">30 dias</SelectItem>
                  <SelectItem value="3meses">3 meses</SelectItem>
                  <SelectItem value="6meses">6 meses</SelectItem>
                  <SelectItem value="12meses">12 meses</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="border-border/50">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Receita Total</p>
                <p className="text-xl font-bold text-emerald-600">R$ 328k</p>
                <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +18%
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Despesas Totais</p>
                <p className="text-xl font-bold text-red-500">R$ 214k</p>
                <div className="flex items-center gap-1 text-xs text-red-500 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +12%
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Lucro Líquido</p>
                <p className="text-xl font-bold text-primary">R$ 114k</p>
                <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +24%
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Margem de Lucro</p>
                <p className="text-xl font-bold">34.8%</p>
                <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +2.5pp
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Chart */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Evolução Mensal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`R$ ${value.toLocaleString()}`, ""]}
                    />
                    <Area type="monotone" dataKey="receita" stroke="hsl(142, 76%, 36%)" fill="url(#colorRevenue)" strokeWidth={2} name="Receita" />
                    <Area type="monotone" dataKey="despesas" stroke="hsl(0, 84%, 60%)" fill="transparent" strokeWidth={2} strokeDasharray="5 5" name="Despesas" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Breakdown by Service */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Por Especialidade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {revenueByService.map((item) => (
                    <div key={item.service} className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>{item.service}</span>
                          <span className="font-medium">R$ {item.value.toLocaleString()}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {item.percentage}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Por Forma de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueByPaymentMethod} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
                      <YAxis dataKey="method" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => [`R$ ${value.toLocaleString()}`, ""]}
                      />
                      <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
