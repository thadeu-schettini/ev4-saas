import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ChevronDown, X, Sparkles, Filter, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const services = ["Consulta", "Retorno", "Exame", "Procedimento", "Avaliação"];
const professionals = ["Dr. Carlos Silva", "Dra. Ana Santos", "Dr. Pedro Lima", "Dra. Maria Costa"];
const statuses = ["Confirmado", "Pendente", "Cancelado", "Aguardando"];

interface CalendarFiltersProps {
  hideUpcoming?: boolean;
  onHideUpcomingChange?: (value: boolean) => void;
}

export const CalendarFilters = ({ hideUpcoming = true, onHideUpcomingChange }: CalendarFiltersProps) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showExternal, setShowExternal] = useState(false);
  const [showBlocks, setShowBlocks] = useState(false);

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  return (
    <div className="bg-gradient-to-r from-card to-muted/20 border-b border-border/50 animate-fade-in backdrop-blur-sm">
      {/* Main Filters Row */}
      <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 overflow-x-auto scrollbar-hide">
        {/* Quick action button */}
        <Button 
          variant={hideUpcoming ? "default" : "outline"}
          size="sm"
          onClick={() => onHideUpcomingChange?.(!hideUpcoming)}
          className={`h-8 sm:h-9 px-2.5 sm:px-4 text-xs sm:text-sm font-semibold transition-all duration-300 group flex-shrink-0 ${
            hideUpcoming 
              ? "bg-primary text-primary-foreground hover:bg-primary/90" 
              : "hover:bg-primary/10 hover:text-primary hover:border-primary/30"
          }`}
        >
          <Filter className="h-3.5 w-3.5 sm:mr-2 group-hover:rotate-12 transition-transform duration-300" />
          <span className="hidden sm:inline">{hideUpcoming ? "Mostrar próximos" : "Ocultar próximos"}</span>
        </Button>

        <div className="hidden sm:block h-6 w-px bg-border/50 flex-shrink-0" />

        {/* Service Filter Dropdown */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wide hidden lg:inline">Serviço</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="h-8 sm:h-9 px-2.5 sm:px-4 text-xs sm:text-sm font-medium hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all"
              >
                Serv.
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {services.map((service) => (
                <DropdownMenuItem 
                  key={service}
                  onClick={() => toggleFilter(service)}
                  className="cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    {service}
                    {activeFilters.includes(service) && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Professional Filter Dropdown */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wide hidden lg:inline">Profissional</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="h-8 sm:h-9 px-2.5 sm:px-4 text-xs sm:text-sm font-medium hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all"
              >
                Prof.
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {professionals.map((professional) => (
                <DropdownMenuItem 
                  key={professional}
                  onClick={() => toggleFilter(professional)}
                  className="cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    {professional}
                    {activeFilters.includes(professional) && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Status Filter Dropdown */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wide hidden lg:inline">Status</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="h-8 sm:h-9 px-2.5 sm:px-4 text-xs sm:text-sm font-medium hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all"
              >
                Stat.
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-44">
              {statuses.map((status) => (
                <DropdownMenuItem 
                  key={status}
                  onClick={() => toggleFilter(status)}
                  className="cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    {status}
                    {activeFilters.includes(status) && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Switches with modern styling */}
        <div className="hidden lg:flex items-center gap-4 ml-auto flex-shrink-0">
          <div 
            className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-muted/40 transition-all cursor-pointer group"
            onClick={() => setShowExternal(!showExternal)}
          >
            <Switch 
              id="show-external" 
              checked={showExternal}
              onCheckedChange={setShowExternal}
              className="data-[state=checked]:bg-primary scale-90" 
            />
            <label 
              htmlFor="show-external" 
              className="text-sm font-medium text-foreground cursor-pointer group-hover:text-primary transition-colors whitespace-nowrap"
            >
              Mostrar externos
            </label>
          </div>

          <div 
            className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-muted/40 transition-all cursor-pointer group"
            onClick={() => setShowBlocks(!showBlocks)}
          >
            <Switch 
              id="show-blocks" 
              checked={showBlocks}
              onCheckedChange={setShowBlocks}
              className="data-[state=checked]:bg-primary scale-90" 
            />
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
              onClick={() => removeFilter(filter)}
            >
              {filter}
              <X 
                className="ml-2 h-3 w-3 group-hover:rotate-90 transition-transform duration-300" 
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