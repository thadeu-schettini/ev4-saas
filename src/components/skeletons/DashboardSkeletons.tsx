import { Skeleton } from "@/components/ui/skeleton";

export function MetricCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card p-4 sm:p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-3 flex-1 min-w-0">
          <Skeleton className="h-4 w-24 sm:w-28" />
          <div className="flex items-baseline gap-2 flex-wrap">
            <Skeleton className="h-8 sm:h-9 w-16 sm:w-20" />
            <Skeleton className="h-4 w-10 sm:w-12" />
          </div>
          <Skeleton className="h-3 w-20 sm:w-24" />
        </div>
        <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl shrink-0" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-4 sm:p-6 shadow-sm">
      <div className="mb-4 sm:mb-6 space-y-2">
        <Skeleton className="h-5 w-32 sm:w-36" />
        <Skeleton className="h-4 w-24 sm:w-28" />
      </div>
      <div className="h-[200px] sm:h-[300px] flex items-end gap-1 sm:gap-2 pb-6 sm:pb-8">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <Skeleton 
              className="w-full rounded-t-sm transition-all duration-500" 
              style={{ 
                height: `${30 + Math.sin(i) * 30 + 20}%`,
                animationDelay: `${i * 100}ms`
              }} 
            />
            <Skeleton className="h-3 w-6 sm:w-8" />
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-4 w-14 sm:w-16" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-4 w-14 sm:w-16" />
        </div>
      </div>
    </div>
  );
}

export function AppointmentItemSkeleton({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="flex items-center gap-3 sm:gap-4 rounded-xl border border-border/50 bg-background/50 p-3 sm:p-4"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Skeleton className="h-9 w-9 sm:h-10 sm:w-10 rounded-full shrink-0" />
      <div className="flex-1 space-y-2 min-w-0">
        <Skeleton className="h-4 w-24 sm:w-32" />
        <Skeleton className="h-3 w-36 sm:w-48" />
      </div>
      <Skeleton className="h-5 sm:h-6 w-16 sm:w-20 rounded-full shrink-0" />
    </div>
  );
}

export function AppointmentListSkeleton() {
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-4 sm:p-6 shadow-sm">
      <div className="mb-4 sm:mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div className="space-y-2">
          <Skeleton className="h-5 w-36 sm:w-40" />
          <Skeleton className="h-4 w-24 sm:w-28" />
        </div>
        <Skeleton className="h-6 w-20 sm:w-24 rounded-full" />
      </div>
      
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <AppointmentItemSkeleton key={i} delay={i * 80} />
        ))}
      </div>
    </div>
  );
}

export function QuickActionsSkeleton() {
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-4 sm:p-6 shadow-sm">
      <div className="mb-4 space-y-2">
        <Skeleton className="h-5 w-24 sm:w-28" />
        <Skeleton className="h-4 w-36 sm:w-40" />
      </div>
      
      <div className="grid gap-2 sm:gap-3 grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton 
            key={i} 
            className="h-16 sm:h-20 rounded-xl" 
            style={{ animationDelay: `${i * 60}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Metrics Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div 
            key={i} 
            className="animate-fade-in" 
            style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
          >
            <MetricCardSkeleton />
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
          <ChartSkeleton />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
          <ChartSkeleton />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '500ms', animationFillMode: 'both' }}>
          <AppointmentListSkeleton />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
          <QuickActionsSkeleton />
        </div>
      </div>
    </div>
  );
}
