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
import { Target, TrendingUp, TrendingDown, Clock, Download, Calendar } from "lucide-react";
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
} from "recharts";
import { cn } from "@/lib/utils";

interface OccupancyDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const weeklyOccupancy = [
  { day: "Seg", ocupacao: 92, meta: 90 },
  { day: "Ter", ocupacao: 88, meta: 90 },
  { day: "Qua", ocupacao: 95, meta: 90 },
  { day: "Qui", ocupacao: 85, meta: 90 },
  { day: "Sex", ocupacao: 78, meta: 90 },
  { day: "Sáb", ocupacao: 45, meta: 50 },
];

const hourlyOccupancy = [
  { hour: "08h", ocupacao: 65 },
  { hour: "09h", ocupacao: 85 },
  { hour: "10h", ocupacao: 95 },
  { hour: "11h", ocupacao: 90 },
  { hour: "12h", ocupacao: 45 },
  { hour: "13h", ocupacao: 50 },
  { hour: "14h", ocupacao: 98 },
  { hour: "15h", ocupacao: 95 },
  { hour: "16h", ocupacao: 88 },
  { hour: "17h", ocupacao: 75 },
  { hour: "18h", ocupacao: 60 },
];

const occupancyByProfessional = [
  { name: "Dr. Carlos Silva", ocupacao: 95, consultas: 28 },
  { name: "Dra. Maria Santos", ocupacao: 92, consultas: 25 },
  { name: "Dr. João Lima", ocupacao: 88, consultas: 22 },
  { name: "Dra. Ana Costa", ocupacao: 82, consultas: 20 },
  { name: "Dr. Pedro Alves", ocupacao: 78, consultas: 18 },
];

const monthlyTrend = [
  { month: "Jan", ocupacao: 82 },
  { month: "Fev", ocupacao: 85 },
  { month: "Mar", ocupacao: 88 },
  { month: "Abr", ocupacao: 86 },
  { month: "Mai", ocupacao: 90 },
  { month: "Jun", ocupacao: 87 },
];

export function OccupancyDetailModal({ open, onOpenChange }: OccupancyDetailModalProps) {
  const [period, setPeriod] = useState("semana");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl">Taxa de Ocupação</DialogTitle>
                <p className="text-sm text-muted-foreground">Análise de agenda e otimização</p>
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
                <p className="text-xs text-muted-foreground">Ocupação Atual</p>
                <p className="text-xl font-bold text-amber-600">87%</p>
                <div className="flex items-center gap-1 text-xs text-red-500 mt-1">
                  <TrendingDown className="h-3 w-3" />
                  -3% vs meta
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Meta</p>
                <p className="text-xl font-bold text-primary">90%</p>
                <Badge variant="outline" className="text-xs mt-1">
                  Definida
                </Badge>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Horário Pico</p>
                <p className="text-xl font-bold">14h-16h</p>
                <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                  <Clock className="h-3 w-3" />
                  98% ocupação
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Slots Vagos</p>
                <p className="text-xl font-bold text-blue-600">23</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Esta semana
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Occupancy */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Ocupação por Dia da Semana</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyOccupancy}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${v}%`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`${value}%`, ""]}
                    />
                    <Bar dataKey="ocupacao" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Ocupação" />
                    <Bar dataKey="meta" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} name="Meta" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Hourly Heatmap */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Ocupação por Horário</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-1 flex-wrap">
                {hourlyOccupancy.map((slot) => (
                  <div key={slot.hour} className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-12 h-10 rounded-lg flex items-center justify-center text-xs font-medium transition-colors",
                        slot.ocupacao >= 90 && "bg-emerald-500/80 text-white",
                        slot.ocupacao >= 70 && slot.ocupacao < 90 && "bg-amber-500/80 text-white",
                        slot.ocupacao >= 50 && slot.ocupacao < 70 && "bg-blue-500/50 text-foreground",
                        slot.ocupacao < 50 && "bg-muted text-muted-foreground"
                      )}
                    >
                      {slot.ocupacao}%
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-1">{slot.hour}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-emerald-500/80" />
                  <span className="text-muted-foreground">≥90%</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-amber-500/80" />
                  <span className="text-muted-foreground">70-89%</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-blue-500/50" />
                  <span className="text-muted-foreground">50-69%</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-muted" />
                  <span className="text-muted-foreground">&lt;50%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* By Professional */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Por Profissional</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {occupancyByProfessional.map((prof) => (
                  <div key={prof.name} className="flex items-center gap-3">
                    <div className="w-32 truncate text-sm">{prof.name}</div>
                    <div className="flex-1">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            prof.ocupacao >= 90 && "bg-emerald-500",
                            prof.ocupacao >= 80 && prof.ocupacao < 90 && "bg-amber-500",
                            prof.ocupacao < 80 && "bg-red-500"
                          )}
                          style={{ width: `${prof.ocupacao}%` }}
                        />
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs w-12 justify-center">
                      {prof.ocupacao}%
                    </Badge>
                    <span className="text-xs text-muted-foreground w-16">
                      {prof.consultas} cons.
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trend */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Tendência Mensal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis domain={[75, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${v}%`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`${value}%`, "Ocupação"]}
                    />
                    <Line type="monotone" dataKey="ocupacao" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
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
