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
  size?: "default" | "full";
}

export function PageContent({ children, className, size = "default" }: PageContentProps) {
  return (
    <div className={cn(
      "py-6",
      size === "default" ? "container mx-auto px-4 sm:px-6" : "px-4 sm:px-6",
      className
    )}>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}
