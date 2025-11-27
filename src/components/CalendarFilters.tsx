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
      <div className="flex items-center gap-3 p-4 flex-wrap">
        {/* Quick action button */}
        <Button 
          variant="outline" 
          size="sm"
          className="h-9 px-4 text-sm font-semibold hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-300 group"
        >
          <Filter className="h-3.5 w-3.5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
          Ocultar próximos
        </Button>

        <div className="h-6 w-px bg-border/50" />

        {/* Filter dropdowns with modern design */}
        <div className="flex items-center gap-2 group">
          <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Serviço</span>
          <Button 
            variant="outline" 
            size="sm"
            className="h-9 px-4 text-sm font-medium hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-300 hover:scale-105"
          >
            Todos
            <ChevronDown className="ml-2 h-3.5 w-3.5 group-hover:translate-y-0.5 transition-transform duration-300" />
          </Button>
        </div>

        <div className="flex items-center gap-2 group">
          <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Profissional</span>
          <Button 
            variant="outline" 
            size="sm"
            className="h-9 px-4 text-sm font-medium hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-300 hover:scale-105"
          >
            Todos
            <ChevronDown className="ml-2 h-3.5 w-3.5 group-hover:translate-y-0.5 transition-transform duration-300" />
          </Button>
        </div>

        <div className="flex items-center gap-2 group">
          <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Status</span>
          <Button 
            variant="outline" 
            size="sm"
            className="h-9 px-4 text-sm font-medium hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-300 hover:scale-105"
          >
            Todos
            <ChevronDown className="ml-2 h-3.5 w-3.5 group-hover:translate-y-0.5 transition-transform duration-300" />
          </Button>
        </div>

        {/* Switches with modern styling */}
        <div className="flex items-center gap-6 ml-auto">
          <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-muted/40 transition-all duration-300 cursor-pointer group">
            <Switch id="show-external" className="data-[state=checked]:bg-primary" />
            <label 
              htmlFor="show-external" 
              className="text-sm font-medium text-foreground cursor-pointer group-hover:text-primary transition-colors"
            >
              Mostrar externos
            </label>
          </div>

          <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-muted/40 transition-all duration-300 cursor-pointer group">
            <Switch id="show-blocks" className="data-[state=checked]:bg-primary" />
            <label 
              htmlFor="show-blocks" 
              className="text-sm font-medium text-foreground cursor-pointer group-hover:text-primary transition-colors"
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
