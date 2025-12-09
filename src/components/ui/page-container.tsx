import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {children}
    </div>
  );
}

interface PageContentProps {
  children: ReactNode;
  className?: string;
  size?: "default" | "full" | "wide";
  noPadding?: boolean;
}

export function PageContent({ children, className, size = "default", noPadding = false }: PageContentProps) {
  return (
    <div className={cn(
      !noPadding && "py-6",
      size === "default" && "container mx-auto px-4 sm:px-6",
      size === "wide" && "px-4 sm:px-6",
      size === "full" && "",
      className
    )}>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}
