import { useState } from "react";
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  UserCheck,
  CalendarCheck,
  AlertCircle,
} from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { AppointmentsChart } from "@/components/dashboard/AppointmentsChart";
import { UpcomingAppointments } from "@/components/dashboard/UpcomingAppointments";
import { QuickActions } from "@/components/dashboard/QuickActions";
import WelcomeSetupModal from "@/components/WelcomeSetupModal";
import SetupChecklist from "@/components/SetupChecklist";

const Index = () => {
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              Bom dia, Dr. Ricardo 👋
            </h1>
            <p className="text-muted-foreground">
              Aqui está o resumo da sua clínica hoje,{" "}
              {new Date().toLocaleDateString("pt-BR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-warning/10 px-4 py-2 text-warning">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm font-medium">3 confirmações pendentes</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Agendamentos Hoje"
          value={24}
          change="+12%"
          changeType="positive"
          icon={Calendar}
          description="vs. semana passada"
        />
        <MetricCard
          title="Pacientes Ativos"
          value="1.284"
          change="+48"
          changeType="positive"
          icon={Users}
          description="este mês"
        />
        <MetricCard
          title="Receita Mensal"
          value="R$ 67.5k"
          change="+8.2%"
          changeType="positive"
          icon={DollarSign}
          description="vs. mês anterior"
        />
        <MetricCard
          title="Taxa de Ocupação"
          value="87%"
          change="-3%"
          changeType="negative"
          icon={TrendingUp}
          description="capacidade utilizada"
        />
      </div>

      {/* Charts Row */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <RevenueChart />
        <AppointmentsChart />
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <UpcomingAppointments />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Tempo Médio de Espera"
          value="12min"
          change="-2min"
          changeType="positive"
          icon={Clock}
          description="vs. média anterior"
        />
        <MetricCard
          title="Taxa de Comparecimento"
          value="94%"
          change="+2%"
          changeType="positive"
          icon={UserCheck}
          description="no-show reduzido"
        />
        <MetricCard
          title="Consultas Realizadas"
          value={156}
          change="+18"
          changeType="positive"
          icon={CalendarCheck}
          description="esta semana"
        />
        <MetricCard
          title="Novos Pacientes"
          value={23}
          change="+5"
          changeType="positive"
          icon={Users}
          description="esta semana"
        />
      </div>

      {/* Setup components */}
      <WelcomeSetupModal open={showWelcomeModal} onOpenChange={setShowWelcomeModal} />
      <SetupChecklist />
    </div>
  );
};

export default Index;