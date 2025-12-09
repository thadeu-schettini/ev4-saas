import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PeriodSelector, Period } from "./PeriodSelector";

const weekData = [
  { day: "Seg", agendados: 24, realizados: 22, cancelados: 2 },
  { day: "Ter", agendados: 28, realizados: 25, cancelados: 3 },
  { day: "Qua", agendados: 32, realizados: 30, cancelados: 2 },
  { day: "Qui", agendados: 26, realizados: 24, cancelados: 2 },
  { day: "Sex", agendados: 30, realizados: 28, cancelados: 2 },
  { day: "Sáb", agendados: 18, realizados: 16, cancelados: 2 },
];

const monthData = [
  { day: "Sem 1", agendados: 120, realizados: 108, cancelados: 12 },
  { day: "Sem 2", agendados: 135, realizados: 125, cancelados: 10 },
  { day: "Sem 3", agendados: 142, realizados: 130, cancelados: 12 },
  { day: "Sem 4", agendados: 128, realizados: 118, cancelados: 10 },
];

const quarterData = [
  { day: "Jan", agendados: 520, realizados: 478, cancelados: 42 },
  { day: "Fev", agendados: 545, realizados: 502, cancelados: 43 },
  { day: "Mar", agendados: 580, realizados: 538, cancelados: 42 },
];

const dataByPeriod = {
  week: weekData,
  month: monthData,
  quarter: quarterData,
};

const periodLabels = {
  week: "Esta Semana",
  month: "Este Mês",
  quarter: "Este Trimestre",
};

export function AppointmentsChart() {
  const [period, setPeriod] = useState<Period>("week");
  const [primaryColor, setPrimaryColor] = useState("hsl(217, 91%, 50%)");
  const [successColor, setSuccessColor] = useState("hsl(142, 76%, 36%)");
  const [destructiveColor, setDestructiveColor] = useState("hsl(0, 84%, 60%)");

  useEffect(() => {
    const updateColors = () => {
      const root = document.documentElement;
      const primary = getComputedStyle(root).getPropertyValue('--primary').trim();
      const success = getComputedStyle(root).getPropertyValue('--success').trim();
      const destructive = getComputedStyle(root).getPropertyValue('--destructive').trim();
      
      if (primary) setPrimaryColor(`hsl(${primary})`);
      if (success) setSuccessColor(`hsl(${success})`);
      if (destructive) setDestructiveColor(`hsl(${destructive})`);
    };

    updateColors();

    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['style', 'class'] 
    });

    return () => observer.disconnect();
  }, []);

  const data = dataByPeriod[period];

  return (
    <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Agendamentos</h3>
          <p className="text-sm text-muted-foreground">{periodLabels[period]}</p>
        </div>
        <PeriodSelector value={period} onChange={setPeriod} />
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(var(--border))" 
              vertical={false}
              className="opacity-50"
            />
            <XAxis
              dataKey="day"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "12px",
                boxShadow: "0 4px 20px -4px rgba(0, 0, 0, 0.1)",
                color: "hsl(var(--foreground))",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              cursor={{ fill: 'hsl(var(--muted))', opacity: 0.3 }}
            />
            <Bar
              dataKey="agendados"
              fill={primaryColor}
              radius={[4, 4, 0, 0]}
              name="Agendados"
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Bar
              dataKey="realizados"
              fill={successColor}
              radius={[4, 4, 0, 0]}
              name="Realizados"
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Bar
              dataKey="cancelados"
              fill={destructiveColor}
              radius={[4, 4, 0, 0]}
              name="Cancelados"
              animationDuration={800}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Agendados</span>
        </div>
        <div className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
          <div className="h-3 w-3 rounded-full bg-success" />
          <span className="text-sm text-muted-foreground">Realizados</span>
        </div>
        <div className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
          <div className="h-3 w-3 rounded-full bg-destructive" />
          <span className="text-sm text-muted-foreground">Cancelados</span>
        </div>
      </div>
    </div>
  );
}
