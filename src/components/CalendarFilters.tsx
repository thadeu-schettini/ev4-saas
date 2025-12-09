import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ChevronDown, X, Sparkles, Filter } from "lucide-react";

export const CalendarFilters = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  return (
    <div className="bg-gradient-to-r from-card to-muted/20 border-b border-border/50 animate-fade-in backdrop-blur-sm">
      {/* Main Filters Row */}
      <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 overflow-x-auto scrollbar-hide">
        {/* Quick action button */}
        <Button 
          variant="outline" 
          size="sm"
          className="h-8 sm:h-9 px-2.5 sm:px-4 text-xs sm:text-sm font-semibold hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-300 group flex-shrink-0"
        >
          <Filter className="h-3.5 w-3.5 sm:mr-2 group-hover:rotate-12 transition-transform duration-300" />
          <span className="hidden sm:inline">Ocultar próximos</span>
        </Button>

        <div className="hidden sm:block h-6 w-px bg-border/50 flex-shrink-0" />

        {/* Filter dropdowns - horizontal scroll on mobile */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wide hidden lg:inline">Serviço</span>
          <Button 
            variant="outline" 
            size="sm"
            className="h-8 sm:h-9 px-2.5 sm:px-4 text-xs sm:text-sm font-medium hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all"
          >
            Serv.
            <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wide hidden lg:inline">Profissional</span>
          <Button 
            variant="outline" 
            size="sm"
            className="h-8 sm:h-9 px-2.5 sm:px-4 text-xs sm:text-sm font-medium hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all"
          >
            Prof.
            <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wide hidden lg:inline">Status</span>
          <Button 
            variant="outline" 
            size="sm"
            className="h-8 sm:h-9 px-2.5 sm:px-4 text-xs sm:text-sm font-medium hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all"
          >
            Stat.
            <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </div>

        {/* Switches with modern styling */}
        <div className="hidden lg:flex items-center gap-4 ml-auto flex-shrink-0">
          <div className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-muted/40 transition-all cursor-pointer group">
            <Switch id="show-external" className="data-[state=checked]:bg-primary scale-90" />
            <label 
              htmlFor="show-external" 
              className="text-sm font-medium text-foreground cursor-pointer group-hover:text-primary transition-colors whitespace-nowrap"
            >
              Mostrar externos
            </label>
          </div>

          <div className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-muted/40 transition-all cursor-pointer group">
            <Switch id="show-blocks" className="data-[state=checked]:bg-primary scale-90" />
            <label 
              htmlFor="show-blocks" 
              className="text-sm font-medium text-foreground cursor-pointer group-hover:text-primary transition-colors whitespace-nowrap"
            >
              Mostrar bloqueios
            </label>
          </div>
        </div>
      </div>

      {/* Active Filters Pills */}
      {activeFilters.length > 0 && (
        <div className="px-4 pb-3 flex items-center gap-2 flex-wrap animate-slide-up">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Filtros ativos:
          </span>
          {activeFilters.map((filter) => (
            <Badge 
              key={filter}
              variant="secondary"
              className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all duration-300 group cursor-pointer animate-scale-in"
            >
              {filter}
              <X 
                className="ml-2 h-3 w-3 group-hover:rotate-90 transition-transform duration-300" 
                onClick={() => removeFilter(filter)}
              />
            </Badge>
          ))}
          <Button 
            variant="ghost" 
            size="sm"
            className="h-7 px-3 text-xs font-medium text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => setActiveFilters([])}
          >
            Limpar tudo
          </Button>
        </div>
      )}
    </div>
  );
};
