import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StaggeredAnimationProps {
  children: ReactNode;
  index: number;
  className?: string;
  baseDelay?: number;
  delayIncrement?: number;
}

export function StaggeredAnimation({
  children,
  index,
  className,
  baseDelay = 0,
  delayIncrement = 50,
}: StaggeredAnimationProps) {
  const delay = baseDelay + index * delayIncrement;

  return (
    <div
      className={cn(
        "animate-fade-in opacity-0",
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "forwards",
      }}
    >
      {children}
    </div>
  );
}

interface StaggeredContainerProps {
  children: ReactNode;
  className?: string;
}

export function StaggeredContainer({
  children,
  className,
}: StaggeredContainerProps) {
  return (
    <div className={cn("", className)}>
      {children}
    </div>
  );
}
