import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppointmentListItemProps {
  time: string;
  patientName: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
}

const statusConfig = {
  confirmed: {
    color: "bg-success",
    dotColor: "bg-success"
  },
  pending: {
    color: "bg-warning",
    dotColor: "bg-warning"
  },
  completed: {
    color: "bg-primary",
    dotColor: "bg-primary"
  },
  cancelled: {
    color: "bg-destructive",
    dotColor: "bg-destructive"
  }
};

export const AppointmentListItem = ({ time, patientName, status }: AppointmentListItemProps) => {
  const config = statusConfig[status];

  return (
    <div className="group p-4 bg-card hover:bg-muted/30 border-b border-border/50 transition-all duration-200 cursor-pointer animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className={`h-2 w-2 rounded-full ${config.dotColor} animate-pulse`} />
          <div className="flex-1">
            <div className="text-sm text-muted-foreground font-medium mb-0.5">
              Hoje, {time}
            </div>
            <div className="text-base font-semibold text-foreground">
              {patientName}
            </div>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
