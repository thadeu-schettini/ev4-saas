import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ChevronDown } from "lucide-react";

export const CalendarFilters = () => {
  return (
    <div className="flex items-center gap-3 p-4 bg-card border-b border-border/50 flex-wrap animate-fade-in">
      {/* Ocultar próximos */}
      <Button 
        variant="outline" 
        size="sm"
        className="h-9 px-4 text-sm font-medium hover:bg-muted/50"
      >
        Ocultar próximos
      </Button>

      {/* Serviço dropdown */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground font-medium">Serviço</span>
        <Button 
          variant="outline" 
          size="sm"
          className="h-9 px-3 text-sm font-medium hover:bg-muted/50"
        >
          Todos
          <ChevronDown className="ml-2 h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Profissional dropdown */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground font-medium">Profissional</span>
        <Button 
          variant="outline" 
          size="sm"
          className="h-9 px-3 text-sm font-medium hover:bg-muted/50"
        >
          Todos
          <ChevronDown className="ml-2 h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Status dropdown */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground font-medium">Status</span>
        <Button 
          variant="outline" 
          size="sm"
          className="h-9 px-3 text-sm font-medium hover:bg-muted/50"
        >
          Todos
          <ChevronDown className="ml-2 h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Switches */}
      <div className="flex items-center gap-6 ml-auto">
        <div className="flex items-center gap-2">
          <Switch id="show-external" />
          <label 
            htmlFor="show-external" 
            className="text-sm font-medium text-foreground cursor-pointer"
          >
            Mostrar externos
          </label>
        </div>

        <div className="flex items-center gap-2">
          <Switch id="show-blocks" />
          <label 
            htmlFor="show-blocks" 
            className="text-sm font-medium text-foreground cursor-pointer"
          >
            Mostrar bloqueios
          </label>
        </div>
      </div>
    </div>
  );
};
