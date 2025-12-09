import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  iconColor?: string;
  iconGradient?: string;
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
  };
  backLink?: string;
  children?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  icon: Icon,
  iconColor,
  iconGradient,
  badge,
  backLink,
  children,
  actions,
  className,
}: PageHeaderProps) {
  const gradientClass = iconGradient || iconColor || "from-primary to-primary/70";

  return (
    <header className={cn(
      "border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-14 lg:top-0 z-30 lg:z-40 relative overflow-hidden",
      className
    )}>
      {/* Subtle decorative gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      {/* Micro background gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          {/* Left Section */}
          <div className="flex items-center gap-3">
            {backLink && (
              <Link to={backLink}>
                <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0 rounded-lg hover:bg-muted transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
            )}
            
            <div className="flex items-center gap-3">
              {Icon && (
                <div className={cn(
                  "h-10 w-10 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-sm transition-transform hover:scale-105",
                  gradientClass
                )}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
              )}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">
                    {title}
                  </h1>
                  {badge && (
                    <Badge variant={badge.variant || "secondary"} className="text-[10px] px-1.5 py-0 h-5 font-medium">
                      {badge.text}
                    </Badge>
                  )}
                </div>
                {description && (
                  <p className="text-xs sm:text-sm text-muted-foreground leading-none mt-0.5">
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Section - Actions */}
          {(children || actions) && (
            <div className="flex items-center gap-2">
              {children || actions}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}