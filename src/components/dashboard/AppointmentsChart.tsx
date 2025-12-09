import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { day: "Seg", agendados: 24, realizados: 22, cancelados: 2 },
  { day: "Ter", agendados: 28, realizados: 25, cancelados: 3 },
  { day: "Qua", agendados: 32, realizados: 30, cancelados: 2 },
  { day: "Qui", agendados: 26, realizados: 24, cancelados: 2 },
  { day: "Sex", agendados: 30, realizados: 28, cancelados: 2 },
  { day: "Sáb", agendados: 18, realizados: 16, cancelados: 2 },
];

export function AppointmentsChart() {
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Agendamentos da Semana</h3>
        <p className="text-sm text-muted-foreground">Comparativo diário</p>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="hsl(220, 9%, 46%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(220, 9%, 46%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(220, 13%, 91%)",
                borderRadius: "12px",
                boxShadow: "0 4px 20px -4px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Bar
              dataKey="agendados"
              fill="hsl(217, 91%, 50%)"
              radius={[4, 4, 0, 0]}
              name="Agendados"
            />
            <Bar
              dataKey="realizados"
              fill="hsl(142, 76%, 36%)"
              radius={[4, 4, 0, 0]}
              name="Realizados"
            />
            <Bar
              dataKey="cancelados"
              fill="hsl(0, 84%, 60%)"
              radius={[4, 4, 0, 0]}
              name="Cancelados"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Agendados</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-success" />
          <span className="text-sm text-muted-foreground">Realizados</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-destructive" />
          <span className="text-sm text-muted-foreground">Cancelados</span>
        </div>
      </div>
    </div>
  );
}