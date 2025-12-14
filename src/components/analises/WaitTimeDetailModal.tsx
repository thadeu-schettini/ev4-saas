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
import { Activity, TrendingUp, TrendingDown, Clock, Download, AlertTriangle } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import { cn } from "@/lib/utils";

interface WaitTimeDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const waitTimeByDay = [
  { day: "Seg", espera: 15, meta: 10 },
  { day: "Ter", espera: 12, meta: 10 },
  { day: "Qua", espera: 8, meta: 10 },
  { day: "Qui", espera: 14, meta: 10 },
  { day: "Sex", espera: 10, meta: 10 },
  { day: "Sáb", espera: 5, meta: 10 },
];

const waitTimeByHour = [
  { hour: "08h", espera: 5 },
  { hour: "09h", espera: 8 },
  { hour: "10h", espera: 15 },
  { hour: "11h", espera: 18 },
  { hour: "12h", espera: 8 },
  { hour: "13h", espera: 6 },
  { hour: "14h", espera: 20 },
  { hour: "15h", espera: 16 },
  { hour: "16h", espera: 12 },
  { hour: "17h", espera: 8 },
  { hour: "18h", espera: 5 },
];

const waitTimeByProfessional = [
  { name: "Dr. Carlos Silva", espera: 8, variacao: -2 },
  { name: "Dra. Maria Santos", espera: 10, variacao: 0 },
  { name: "Dr. João Lima", espera: 15, variacao: +3 },
  { name: "Dra. Ana Costa", espera: 12, variacao: +1 },
  { name: "Dr. Pedro Alves", espera: 18, variacao: +5 },
];

const monthlyTrend = [
  { month: "Jan", espera: 18 },
  { month: "Fev", espera: 16 },
  { month: "Mar", espera: 14 },
  { month: "Abr", espera: 15 },
  { month: "Mai", espera: 13 },
  { month: "Jun", espera: 12 },
];

const waitTimeDistribution = [
  { range: "0-5 min", count: 120, percentage: 35 },
  { range: "5-10 min", count: 95, percentage: 28 },
  { range: "10-15 min", count: 68, percentage: 20 },
  { range: "15-20 min", count: 40, percentage: 12 },
  { range: "20+ min", count: 17, percentage: 5 },
];

export function WaitTimeDetailModal({ open, onOpenChange }: WaitTimeDetailModalProps) {
  const [period, setPeriod] = useState("semana");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 shadow-lg">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl">Tempo Médio de Espera</DialogTitle>
                <p className="text-sm text-muted-foreground">Análise de fluxo e otimização</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semana">Esta Semana</SelectItem>
                  <SelectItem value="mes">Este Mês</SelectItem>
                  <SelectItem value="trimestre">Trimestre</SelectItem>
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
                <p className="text-xs text-muted-foreground">Tempo Médio</p>
                <p className="text-xl font-bold text-primary">12 min</p>
                <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                  <TrendingDown className="h-3 w-3" />
                  -2 min vs mês anterior
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Meta</p>
                <p className="text-xl font-bold text-amber-600">10 min</p>
                <Badge variant="outline" className="text-xs mt-1">
                  +2 min da meta
                </Badge>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Pior Horário</p>
                <p className="text-xl font-bold text-red-500">14h</p>
                <div className="flex items-center gap-1 text-xs text-red-500 mt-1">
                  <Clock className="h-3 w-3" />
                  20 min média
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Satisfação</p>
                <p className="text-xl font-bold text-emerald-600">92%</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Pacientes satisfeitos
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Alerts */}
          <Card className="border-amber-500/50 bg-amber-500/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Oportunidade de Melhoria</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    O horário das 14h-15h apresenta consistentemente tempo de espera acima da meta. 
                    Considere redistribuir agendamentos ou adicionar suporte neste período.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wait Time by Day */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Por Dia da Semana</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={waitTimeByDay}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${v}min`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`${value} min`, ""]}
                    />
                    <Bar dataKey="espera" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Tempo Médio" />
                    <Bar dataKey="meta" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} name="Meta" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Hourly Pattern */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Padrão por Horário</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={waitTimeByHour}>
                    <defs>
                      <linearGradient id="colorWait" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${v}min`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`${value} min`, "Espera"]}
                    />
                    <Area type="monotone" dataKey="espera" stroke="hsl(var(--primary))" fill="url(#colorWait)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* By Professional and Distribution */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Por Profissional</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {waitTimeByProfessional.map((prof) => (
                    <div key={prof.name} className="flex items-center gap-3">
                      <div className="w-32 truncate text-sm">{prof.name}</div>
                      <div className="flex-1">
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              prof.espera <= 10 && "bg-emerald-500",
                              prof.espera > 10 && prof.espera <= 15 && "bg-amber-500",
                              prof.espera > 15 && "bg-red-500"
                            )}
                            style={{ width: `${Math.min(prof.espera / 20 * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-medium w-14">{prof.espera} min</span>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "text-xs w-12 justify-center",
                          prof.variacao < 0 && "text-emerald-600",
                          prof.variacao > 0 && "text-red-500"
                        )}
                      >
                        {prof.variacao > 0 ? "+" : ""}{prof.variacao}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Distribuição</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {waitTimeDistribution.map((item) => (
                    <div key={item.range} className="flex items-center gap-3">
                      <div className="w-20 text-sm">{item.range}</div>
                      <div className="flex-1">
                        <div className="h-4 bg-muted rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              item.range === "0-5 min" && "bg-emerald-500",
                              item.range === "5-10 min" && "bg-emerald-400",
                              item.range === "10-15 min" && "bg-amber-500",
                              item.range === "15-20 min" && "bg-orange-500",
                              item.range === "20+ min" && "bg-red-500"
                            )}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground w-16">
                        {item.count} pac.
                      </span>
                      <Badge variant="secondary" className="text-xs w-12 justify-center">
                        {item.percentage}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Trend */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Evolução Mensal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis domain={[0, 25]} stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${v}min`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`${value} min`, "Tempo Médio"]}
                    />
                    <Line type="monotone" dataKey="espera" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
