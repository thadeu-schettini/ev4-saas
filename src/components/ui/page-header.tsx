import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  iconColor?: string;
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
  };
  backLink?: string;
  children?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  icon: Icon,
  iconColor = "from-primary to-primary/70",
  badge,
  backLink,
  children,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-40", className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          {/* Left Section */}
          <div className="flex items-center gap-3">
            {backLink && (
              <Link to={backLink}>
                <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0 rounded-lg hover:bg-muted">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
            )}
            
            <div className="flex items-center gap-3">
              {Icon && (
                <div className={cn(
                  "h-10 w-10 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-sm",
                  iconColor
                )}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
              )}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-semibold tracking-tight text-foreground">
                    {title}
                  </h1>
                  {badge && (
                    <Badge variant={badge.variant || "secondary"} className="text-[10px] px-1.5 py-0 h-5 font-medium">
                      {badge.text}
                    </Badge>
                  )}
                </div>
                {description && (
                  <p className="text-sm text-muted-foreground leading-none mt-0.5">
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Section - Actions */}
          {children && (
            <div className="flex items-center gap-2">
              {children}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
