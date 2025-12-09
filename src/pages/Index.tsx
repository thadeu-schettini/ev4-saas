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
  LayoutDashboard,
} from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { AppointmentsChart } from "@/components/dashboard/AppointmentsChart";
import { UpcomingAppointments } from "@/components/dashboard/UpcomingAppointments";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { PageContainer, PageContent } from "@/components/ui/page-container";
import { PageHeader } from "@/components/ui/page-header";
import WelcomeSetupModal from "@/components/WelcomeSetupModal";
import SetupChecklist from "@/components/SetupChecklist";
import { DashboardSkeleton } from "@/components/skeletons/DashboardSkeletons";
import { useSimulatedLoading } from "@/hooks/use-loading";

const Index = () => {
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const isLoading = useSimulatedLoading(1200);

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Bom dia" : currentHour < 18 ? "Boa tarde" : "Boa noite";

  return (
    <PageContainer>
      <PageHeader
        title={`${greeting}, Dr. Ricardo`}
        description={new Date().toLocaleDateString("pt-BR", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })}
        icon={LayoutDashboard}
        iconColor="from-primary to-primary/70"
      >
        <div className="flex items-center gap-2 rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 text-amber-600">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm font-medium">3 confirmações pendentes</span>
        </div>
      </PageHeader>

      <PageContent>
        {isLoading ? (
          <DashboardSkeleton />
        ) : (
          <>
            {/* Metrics Grid */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
              <RevenueChart />
              <AppointmentsChart />
            </div>

            {/* Bottom Section */}
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <UpcomingAppointments />
              </div>
              <div>
                <QuickActions />
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
          </>
        )}
      </PageContent>

      {/* Setup components */}
      <WelcomeSetupModal open={showWelcomeModal} onOpenChange={setShowWelcomeModal} />
      <SetupChecklist />
    </PageContainer>
  );
};

export default Index;
