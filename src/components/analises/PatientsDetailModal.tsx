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
import { Users, TrendingUp, UserPlus, UserMinus, Download, Calendar } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface PatientsDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const patientGrowth = [
  { month: "Jan", novos: 42, ativos: 1180, inativos: 35 },
  { month: "Fev", novos: 38, ativos: 1195, inativos: 28 },
  { month: "Mar", novos: 55, ativos: 1220, inativos: 30 },
  { month: "Abr", novos: 48, ativos: 1245, inativos: 25 },
  { month: "Mai", novos: 52, ativos: 1270, inativos: 32 },
  { month: "Jun", novos: 48, ativos: 1284, inativos: 22 },
];

const patientsByAge = [
  { name: "0-18", value: 180, color: "hsl(var(--primary))" },
  { name: "19-35", value: 420, color: "hsl(142, 76%, 36%)" },
  { name: "36-50", value: 380, color: "hsl(262, 83%, 58%)" },
  { name: "51-65", value: 220, color: "hsl(38, 92%, 50%)" },
  { name: "65+", value: 84, color: "hsl(var(--muted))" },
];

const patientsByGender = [
  { name: "Feminino", value: 720, color: "hsl(330, 80%, 60%)" },
  { name: "Masculino", value: 540, color: "hsl(210, 80%, 50%)" },
  { name: "Outro", value: 24, color: "hsl(var(--muted))" },
];

const retentionData = [
  { month: "Jan", taxa: 92 },
  { month: "Fev", taxa: 94 },
  { month: "Mar", taxa: 91 },
  { month: "Abr", taxa: 95 },
  { month: "Mai", taxa: 93 },
  { month: "Jun", taxa: 96 },
];

export function PatientsDetailModal({ open, onOpenChange }: PatientsDetailModalProps) {
  const [period, setPeriod] = useState("6meses");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl">Pacientes Ativos</DialogTitle>
                <p className="text-sm text-muted-foreground">Análise demográfica e crescimento</p>
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
                <p className="text-xs text-muted-foreground">Total Ativos</p>
                <p className="text-xl font-bold text-primary">1.284</p>
                <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +48 este mês
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Novos (6 meses)</p>
                <p className="text-xl font-bold text-emerald-600">283</p>
                <div className="flex items-center gap-1 text-xs mt-1">
                  <UserPlus className="h-3 w-3 text-emerald-600" />
                  +47/mês média
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Inativos (6 meses)</p>
                <p className="text-xl font-bold text-amber-600">172</p>
                <div className="flex items-center gap-1 text-xs mt-1">
                  <UserMinus className="h-3 w-3 text-amber-600" />
                  -29/mês média
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Taxa Retenção</p>
                <p className="text-xl font-bold text-blue-600">93.5%</p>
                <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +1.2pp
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Growth Chart */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Crescimento de Pacientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={patientGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line type="monotone" dataKey="novos" stroke="hsl(142, 76%, 36%)" strokeWidth={2} name="Novos" dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="inativos" stroke="hsl(38, 92%, 50%)" strokeWidth={2} name="Inativos" dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Demographics */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Por Faixa Etária</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={patientsByAge}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {patientsByAge.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {patientsByAge.map((item) => (
                    <div key={item.name} className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-muted-foreground">{item.name}:</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Por Gênero</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={patientsByGender}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {patientsByGender.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  {patientsByGender.map((item) => (
                    <div key={item.name} className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-muted-foreground">{item.name}:</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Retention Chart */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Taxa de Retenção Mensal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={retentionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis domain={[85, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${v}%`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`${value}%`, "Taxa"]}
                    />
                    <Line type="monotone" dataKey="taxa" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
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
