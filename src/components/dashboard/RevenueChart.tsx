import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Jan", receita: 45000, despesas: 32000 },
  { name: "Fev", receita: 52000, despesas: 34000 },
  { name: "Mar", receita: 48000, despesas: 31000 },
  { name: "Abr", receita: 61000, despesas: 35000 },
  { name: "Mai", receita: 55000, despesas: 33000 },
  { name: "Jun", receita: 67000, despesas: 38000 },
  { name: "Jul", receita: 72000, despesas: 40000 },
];

export function RevenueChart() {
  const [primaryColor, setPrimaryColor] = useState("hsl(217, 91%, 50%)");
  const [successColor, setSuccessColor] = useState("hsl(142, 76%, 36%)");

  // Listen for theme changes and update chart colors
  useEffect(() => {
    const updateColors = () => {
      const root = document.documentElement;
      const primary = getComputedStyle(root).getPropertyValue('--primary').trim();
      const success = getComputedStyle(root).getPropertyValue('--success').trim();
      
      if (primary) setPrimaryColor(`hsl(${primary})`);
      if (success) setSuccessColor(`hsl(${success})`);
    };

    updateColors();

    // Create observer for theme changes
    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['style', 'class'] 
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Receita vs Despesas</h3>
        <p className="text-sm text-muted-foreground">Últimos 7 meses</p>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={primaryColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={primaryColor} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorDespesas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={successColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={successColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(var(--border))" 
              className="opacity-50"
            />
            <XAxis
              dataKey="name"
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
              tickFormatter={(value) => `R$${value / 1000}k`}
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
              formatter={(value: number) =>
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(value)
              }
            />
            <Area
              type="monotone"
              dataKey="receita"
              stroke={primaryColor}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorReceita)"
              name="Receita"
              animationDuration={1000}
              animationEasing="ease-out"
            />
            <Area
              type="monotone"
              dataKey="despesas"
              stroke={successColor}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorDespesas)"
              name="Despesas"
              animationDuration={1000}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Receita</span>
        </div>
        <div className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
          <div className="h-3 w-3 rounded-full bg-success" />
          <span className="text-sm text-muted-foreground">Despesas</span>
        </div>
      </div>
    </div>
  );
}