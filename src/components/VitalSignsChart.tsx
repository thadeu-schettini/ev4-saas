import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from "recharts";
import { TrendingUp, TrendingDown, Activity, Heart, Thermometer, Wind } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type VitalSignData = {
  date: string;
  heartRate: number;
  systolic: number;
  diastolic: number;
  temperature: number;
  oxygenSaturation: number;
};

const mockVitalSignsHistory: VitalSignData[] = [
  {
    date: "05/09/2025",
    heartRate: 78,
    systolic: 145,
    diastolic: 92,
    temperature: 36.4,
    oxygenSaturation: 97
  },
  {
    date: "20/10/2025",
    heartRate: 74,
    systolic: 138,
    diastolic: 88,
    temperature: 36.6,
    oxygenSaturation: 98
  },
  {
    date: "15/11/2025",
    heartRate: 72,
    systolic: 128,
    diastolic: 82,
    temperature: 36.5,
    oxygenSaturation: 98
  },
  {
    date: "Hoje",
    heartRate: 72,
    systolic: 120,
    diastolic: 80,
    temperature: 36.5,
    oxygenSaturation: 98
  }
];

const getTrend = (data: VitalSignData[], key: keyof Omit<VitalSignData, 'date'>) => {
  if (data.length < 2) return { trend: "stable", percentage: 0 };
  
  const latest = data[data.length - 1][key];
  const previous = data[data.length - 2][key];
  const percentage = ((latest - previous) / previous) * 100;
  
  if (Math.abs(percentage) < 2) return { trend: "stable", percentage: 0 };
  return { trend: percentage > 0 ? "up" : "down", percentage: Math.abs(percentage) };
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
        <p className="text-xs font-semibold text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: <span className="font-semibold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function VitalSignsChart() {
  const heartRateTrend = getTrend(mockVitalSignsHistory, 'heartRate');
  const bloodPressureTrend = getTrend(mockVitalSignsHistory, 'systolic');
  const temperatureTrend = getTrend(mockVitalSignsHistory, 'temperature');
  const oxygenTrend = getTrend(mockVitalSignsHistory, 'oxygenSaturation');

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-4 bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Evolução dos Sinais Vitais</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Comparação temporal entre consultas</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-4">
            <TabsTrigger value="all" className="text-xs">Geral</TabsTrigger>
            <TabsTrigger value="heartRate" className="text-xs">FC</TabsTrigger>
            <TabsTrigger value="bloodPressure" className="text-xs">PA</TabsTrigger>
            <TabsTrigger value="temperature" className="text-xs">Temp</TabsTrigger>
            <TabsTrigger value="oxygen" className="text-xs">SpO2</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {/* Trends Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-center justify-between mb-1">
                  <Heart className="h-4 w-4 text-red-500" />
                  {heartRateTrend.trend === "down" && <TrendingDown className="h-3 w-3 text-green-600" />}
                  {heartRateTrend.trend === "up" && <TrendingUp className="h-3 w-3 text-red-600" />}
                </div>
                <p className="text-xs text-muted-foreground">Freq. Cardíaca</p>
                <p className="text-lg font-bold text-foreground">72 bpm</p>
                {heartRateTrend.percentage > 0 && (
                  <Badge variant={heartRateTrend.trend === "down" ? "default" : "destructive"} className="text-[9px] mt-1">
                    {heartRateTrend.trend === "down" ? "↓" : "↑"} {heartRateTrend.percentage.toFixed(1)}%
                  </Badge>
                )}
              </div>

              <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-center justify-between mb-1">
                  <Activity className="h-4 w-4 text-blue-500" />
                  {bloodPressureTrend.trend === "down" && <TrendingDown className="h-3 w-3 text-green-600" />}
                  {bloodPressureTrend.trend === "up" && <TrendingUp className="h-3 w-3 text-red-600" />}
                </div>
                <p className="text-xs text-muted-foreground">Pressão Arterial</p>
                <p className="text-lg font-bold text-foreground">120/80</p>
                {bloodPressureTrend.percentage > 0 && (
                  <Badge variant={bloodPressureTrend.trend === "down" ? "default" : "destructive"} className="text-[9px] mt-1">
                    {bloodPressureTrend.trend === "down" ? "↓" : "↑"} {bloodPressureTrend.percentage.toFixed(1)}%
                  </Badge>
                )}
              </div>

              <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-center justify-between mb-1">
                  <Thermometer className="h-4 w-4 text-orange-500" />
                  {temperatureTrend.trend === "up" && <TrendingUp className="h-3 w-3 text-orange-600" />}
                </div>
                <p className="text-xs text-muted-foreground">Temperatura</p>
                <p className="text-lg font-bold text-foreground">36.5°C</p>
                {temperatureTrend.percentage > 0 && (
                  <Badge variant="secondary" className="text-[9px] mt-1">
                    Estável
                  </Badge>
                )}
              </div>

              <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-center justify-between mb-1">
                  <Wind className="h-4 w-4 text-cyan-500" />
                  {oxygenTrend.trend === "up" && <TrendingUp className="h-3 w-3 text-green-600" />}
                </div>
                <p className="text-xs text-muted-foreground">Saturação O2</p>
                <p className="text-lg font-bold text-foreground">98%</p>
                {oxygenTrend.percentage > 0 && (
                  <Badge variant="default" className="text-[9px] mt-1">
                    ↑ {oxygenTrend.percentage.toFixed(1)}%
                  </Badge>
                )}
              </div>
            </div>

            {/* All Vitals Chart */}
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockVitalSignsHistory} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" stroke="hsl(var(--muted-foreground))" />
                  <YAxis className="text-xs" stroke="hsl(var(--muted-foreground))" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line type="monotone" dataKey="heartRate" stroke="#ef4444" name="FC (bpm)" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="systolic" stroke="#3b82f6" name="PAS (mmHg)" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="oxygenSaturation" stroke="#06b6d4" name="SpO2 (%)" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="heartRate">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockVitalSignsHistory} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorHeartRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" stroke="hsl(var(--muted-foreground))" />
                  <YAxis className="text-xs" stroke="hsl(var(--muted-foreground))" domain={[60, 90]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="heartRate" stroke="#ef4444" fillOpacity={1} fill="url(#colorHeartRate)" name="FC (bpm)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="bloodPressure">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockVitalSignsHistory} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" stroke="hsl(var(--muted-foreground))" />
                  <YAxis className="text-xs" stroke="hsl(var(--muted-foreground))" domain={[70, 150]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line type="monotone" dataKey="systolic" stroke="#3b82f6" name="Sistólica (mmHg)" strokeWidth={2} dot={{ r: 5 }} />
                  <Line type="monotone" dataKey="diastolic" stroke="#8b5cf6" name="Diastólica (mmHg)" strokeWidth={2} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="temperature">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockVitalSignsHistory} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorTemperature" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" stroke="hsl(var(--muted-foreground))" />
                  <YAxis className="text-xs" stroke="hsl(var(--muted-foreground))" domain={[35, 38]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="temperature" stroke="#f97316" fillOpacity={1} fill="url(#colorTemperature)" name="Temperatura (°C)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="oxygen">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockVitalSignsHistory} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorOxygen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" stroke="hsl(var(--muted-foreground))" />
                  <YAxis className="text-xs" stroke="hsl(var(--muted-foreground))" domain={[90, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="oxygenSaturation" stroke="#06b6d4" fillOpacity={1} fill="url(#colorOxygen)" name="SpO2 (%)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
