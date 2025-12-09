import { Skeleton } from "@/components/ui/skeleton";

// Generic Card Skeleton
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-border/50 bg-card p-4 sm:p-6 shadow-sm ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="h-20 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    </div>
  );
}

// Table Row Skeleton
export function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-border/30">
      <Skeleton className="h-10 w-10 rounded-full shrink-0" />
      <Skeleton className="h-4 w-32 flex-1" />
      <Skeleton className="h-4 w-24 hidden sm:block" />
      <Skeleton className="h-4 w-20 hidden md:block" />
      <Skeleton className="h-6 w-16 rounded-full" />
      <Skeleton className="h-8 w-8 rounded shrink-0" />
    </div>
  );
}

// Patient Card Skeleton
export function PatientCardSkeleton() {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-4 shadow-sm animate-fade-in">
      <div className="flex items-start gap-3 mb-4">
        <Skeleton className="h-12 w-12 rounded-full shrink-0" />
        <div className="space-y-2 flex-1 min-w-0">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
      <div className="flex gap-2 mt-4">
        <Skeleton className="h-8 flex-1" />
        <Skeleton className="h-8 w-8" />
      </div>
    </div>
  );
}

// Pacientes Page Skeleton
export function PacientesSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border/50 bg-card p-4">
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-8 w-12" />
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Skeleton className="h-10 flex-1 min-w-[200px] max-w-md" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-24" />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <PatientCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

// Calendar Page Skeleton
export function CalendarSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-200px)] gap-4">
      {/* Sidebar - Hidden on mobile */}
      <div className="hidden xl:flex flex-col w-[360px] border border-border/50 rounded-xl bg-card/50 overflow-hidden">
        <div className="px-4 py-3 bg-muted/30 border-b border-border/30">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 p-3 border-b border-border/30">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="text-center p-2 rounded-lg bg-muted/30">
              <Skeleton className="h-4 w-4 mx-auto mb-1" />
              <Skeleton className="h-5 w-8 mx-auto mb-1" />
              <Skeleton className="h-2 w-12 mx-auto" />
            </div>
          ))}
        </div>
        <div className="flex-1 p-3 space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-border/50 bg-card p-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-16 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 rounded-xl border border-border/50 bg-card/50 overflow-hidden">
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border/50">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 sm:h-9 sm:w-9" />
            <Skeleton className="h-8 w-8 sm:h-9 sm:w-9" />
            <Skeleton className="h-8 w-16 sm:h-9 sm:w-20" />
            <Skeleton className="h-8 w-24 sm:h-9 sm:w-32" />
          </div>
          <div className="flex gap-1 p-1 rounded-lg bg-muted/30">
            <Skeleton className="h-7 w-16 sm:h-8 sm:w-20" />
            <Skeleton className="h-7 w-16 sm:h-8 sm:w-20" />
            <Skeleton className="h-7 w-16 sm:h-8 sm:w-20" />
          </div>
        </div>
        <div className="p-2 sm:p-4">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-8" />
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }).map((_, i) => (
              <Skeleton key={i} className="h-16 sm:h-24 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Recepcao Page Skeleton
export function RecepcaoSkeleton() {
  return (
    <div className="space-y-6">
      {/* View Selector */}
      <div className="flex flex-wrap gap-3 items-center">
        <Skeleton className="h-10 flex-1 min-w-[200px] max-w-md" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-10" />
          ))}
        </div>
      </div>

      {/* Kanban/Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, col) => (
          <div key={col} className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-8 rounded-full" />
            </div>
            {Array.from({ length: 3 }).map((_, row) => (
              <div key={row} className="rounded-xl border border-border/50 bg-card p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-7 flex-1" />
                  <Skeleton className="h-7 w-7" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Prontuario Page Skeleton
export function ProntuarioSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      {/* Patient Info */}
      <div className="lg:col-span-1 space-y-4">
        <div className="rounded-xl border border-border/50 bg-card p-4 sm:p-6">
          <div className="flex items-center gap-4 mb-6">
            <Skeleton className="h-14 w-14 sm:h-16 sm:w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 sm:h-6 w-32 sm:w-40" />
              <Skeleton className="h-3 sm:h-4 w-24 sm:w-28" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-5 w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Area */}
      <div className="lg:col-span-2">
        <div className="rounded-xl border border-border/50 bg-card p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-9 w-28" />
          </div>
          <div className="space-y-4 sm:space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-24 sm:h-32 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Financeiro Page Skeleton
export function FinanceiroSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border/50 bg-card p-3 sm:p-4">
            <div className="flex items-center justify-between mb-3">
              <Skeleton className="h-4 w-20 sm:w-24" />
              <Skeleton className="h-7 w-7 sm:h-8 sm:w-8 rounded-full" />
            </div>
            <Skeleton className="h-6 sm:h-8 w-24 sm:w-32 mb-2" />
            <Skeleton className="h-3 w-16 sm:w-20" />
          </div>
        ))}
      </div>

      {/* Chart and Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="rounded-xl border border-border/50 bg-card p-4 sm:p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-48 sm:h-64 w-full" />
        </div>
        <div className="rounded-xl border border-border/50 bg-card p-4 sm:p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 sm:gap-4 p-3 rounded-lg border border-border/30">
                <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-full" />
                <div className="flex-1 space-y-2 min-w-0">
                  <Skeleton className="h-4 w-28 sm:w-32" />
                  <Skeleton className="h-3 w-20 sm:w-24" />
                </div>
                <Skeleton className="h-5 w-16 sm:w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Profissionais Page Skeleton
export function ProfissionaisSkeleton() {
  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Skeleton className="h-10 flex-1 min-w-[200px] max-w-md" />
        <Skeleton className="h-10 w-28 sm:w-32" />
        <Skeleton className="h-10 w-32 sm:w-40" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border/50 bg-card p-4 sm:p-6 space-y-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <Skeleton className="h-12 w-12 sm:h-14 sm:w-14 rounded-full" />
              <div className="space-y-2 flex-1 min-w-0">
                <Skeleton className="h-5 w-28 sm:w-32" />
                <Skeleton className="h-4 w-20 sm:w-24" />
              </div>
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-14 sm:w-16 rounded-full" />
              <Skeleton className="h-6 w-16 sm:w-20 rounded-full" />
            </div>
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/30">
              <div className="space-y-1">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-5 w-10" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-5 w-10" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// FormulariosClinicos Page Skeleton
export function FormulariosSkeleton() {
  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="flex gap-3">
          <Skeleton className="h-10 w-32 sm:w-40" />
          <Skeleton className="h-10 w-28 sm:w-36" />
        </div>
        <Skeleton className="h-10 w-full sm:w-48" />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border/50 bg-card overflow-hidden">
            <Skeleton className="h-28 sm:h-32 w-full" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-5 w-32" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
              <Skeleton className="h-3 w-full" />
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-8 flex-1" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Chat Page Skeleton
export function ChatSkeleton() {
  return (
    <div className="flex h-[calc(100vh-200px)] gap-4">
      {/* Conversations List - Hidden on mobile */}
      <div className="hidden md:flex flex-col w-80 border border-border/50 rounded-xl bg-card/50 overflow-hidden">
        <div className="p-4 border-b border-border/30">
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="flex-1 p-3 space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-40" />
              </div>
              <Skeleton className="h-3 w-12" />
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col rounded-xl border border-border/50 bg-card/50 overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b border-border/30">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <div className="flex-1 p-4 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
              <Skeleton className={`h-16 ${i % 2 === 0 ? 'w-2/3' : 'w-1/2'} rounded-2xl`} />
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-border/30">
          <div className="flex gap-2">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Analytics/Analises Page Skeleton
export function AnalisesSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border/50 bg-card p-4">
            <div className="flex items-center justify-between mb-3">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <Skeleton className="h-8 w-24 mb-2" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="rounded-xl border border-border/50 bg-card p-4 sm:p-6">
          <Skeleton className="h-6 w-40 mb-4" />
          <Skeleton className="h-64 w-full" />
        </div>
        <div className="rounded-xl border border-border/50 bg-card p-4 sm:p-6">
          <Skeleton className="h-6 w-40 mb-4" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>

      {/* AI Insights */}
      <div className="rounded-xl border border-border/50 bg-card p-4 sm:p-6">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-4 rounded-lg border border-border/30">
              <Skeleton className="h-5 w-24 mb-3" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Configuracoes Page Skeleton
export function ConfiguracoesSkeleton() {
  return (
    <div className="space-y-6">
      {/* Settings Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border/50 bg-card p-4 sm:p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-3 w-40" />
              </div>
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="flex items-center gap-2">
                  <Skeleton className="h-3 w-3 rounded-full" />
                  <Skeleton className="h-3 w-24" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Indicacoes Page Skeleton
export function IndicacoesSkeleton() {
  return (
    <div className="space-y-6">
      {/* Level Progress */}
      <div className="rounded-xl border border-border/50 bg-card p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="flex-1 text-center sm:text-left space-y-2">
            <Skeleton className="h-6 w-32 mx-auto sm:mx-0" />
            <Skeleton className="h-4 w-48 mx-auto sm:mx-0" />
            <Skeleton className="h-3 w-full max-w-md" />
          </div>
          <Skeleton className="h-12 w-32" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border/50 bg-card p-4 text-center">
            <Skeleton className="h-8 w-12 mx-auto mb-2" />
            <Skeleton className="h-4 w-20 mx-auto" />
          </div>
        ))}
      </div>

      {/* Missions */}
      <div className="rounded-xl border border-border/50 bg-card p-4 sm:p-6">
        <Skeleton className="h-6 w-24 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-4 rounded-lg border border-border/30">
              <div className="flex items-center gap-3 mb-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Billing Page Skeleton
export function BillingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="rounded-xl border border-border/50 bg-card p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border/50 bg-card p-4 sm:p-6 space-y-4">
            <Skeleton className="h-6 w-24" />
            <div className="flex items-baseline gap-1">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-4 w-full" />
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Telemedicina Page Skeleton
export function TelemedicinaSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border/50 bg-card p-4">
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-8 w-16" />
          </div>
        ))}
      </div>

      {/* Sessions */}
      <div className="rounded-xl border border-border/50 bg-card p-4 sm:p-6">
        <Skeleton className="h-6 w-40 mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-lg border border-border/30">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-9 w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
