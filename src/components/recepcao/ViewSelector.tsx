import { Button } from "@/components/ui/button";
import { LayoutGrid, LayoutList, Columns, Calendar } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ViewType = "timeline" | "kanban" | "hybrid" | "grid";

interface ViewSelectorProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const views = [
  { id: "hybrid" as ViewType, icon: Calendar, label: "Dashboard Híbrido" },
  { id: "timeline" as ViewType, icon: LayoutList, label: "Timeline" },
  { id: "kanban" as ViewType, icon: Columns, label: "Kanban" },
  { id: "grid" as ViewType, icon: LayoutGrid, label: "Grade" },
];

export const ViewSelector = ({ currentView, onViewChange }: ViewSelectorProps) => {
  return (
    <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg backdrop-blur-sm border border-border/50">
      {views.map((view) => (
        <Tooltip key={view.id}>
          <TooltipTrigger asChild>
            <Button
              variant={currentView === view.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewChange(view.id)}
              className={`transition-all duration-300 ${
                currentView === view.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "hover:bg-primary/10"
              }`}
            >
              <view.icon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{view.label}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};
