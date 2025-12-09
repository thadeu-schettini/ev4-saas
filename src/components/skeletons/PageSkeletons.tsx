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
    <div className="flex h-[calc(100vh-200px)] gap-4">
      {/* Sidebar */}
      <div className="w-80 border-r border-border/50 p-4 space-y-4 hidden lg:block">
        <Skeleton className="h-6 w-40 mb-4" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border/30">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-8 w-48" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-8" />
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 35 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-lg" />
          ))}
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Patient Info */}
      <div className="lg:col-span-1 space-y-4">
        <div className="rounded-xl border border-border/50 bg-card p-6">
          <div className="flex items-center gap-4 mb-6">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-5 w-24" />
              </div>
            ))}
          </div>
        </div>

        {/* Vital Signs */}
        <div className="rounded-xl border border-border/50 bg-card p-6">
          <Skeleton className="h-5 w-28 mb-4" />
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/30">
                <Skeleton className="h-3 w-16 mb-2" />
                <Skeleton className="h-6 w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Area */}
      <div className="lg:col-span-2">
        <div className="rounded-xl border border-border/50 bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-9 w-28" />
          </div>
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-32 w-full" />
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border/50 bg-card p-4">
            <div className="flex items-center justify-between mb-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>

      {/* Chart and Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border/50 bg-card p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-64 w-full" />
        </div>
        <div className="rounded-xl border border-border/50 bg-card p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-border/30">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-5 w-20" />
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
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border/50 bg-card p-6 space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-14 w-14 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
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
      <div className="flex flex-wrap gap-3 justify-between">
        <div className="flex gap-3">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-36" />
        </div>
        <Skeleton className="h-10 w-48" />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border/50 bg-card overflow-hidden">
            <Skeleton className="h-32 w-full" />
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
