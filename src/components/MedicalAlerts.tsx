import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, AlertCircle, Info, XCircle } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

type AlertSeverity = "critical" | "warning" | "info";

type MedicalAlert = {
  id: string;
  type: "drug_interaction" | "allergy" | "condition" | "contraindication";
  severity: AlertSeverity;
  title: string;
  description: string;
  medications?: string[];
  recommendation: string;
};

const mockAlerts: MedicalAlert[] = [
  {
    id: "1",
    type: "drug_interaction",
    severity: "critical",
    title: "Interação Medicamentosa Grave",
    description: "Losartana e Anti-inflamatórios (AINEs) podem reduzir o efeito anti-hipertensivo e aumentar risco de lesão renal.",
    medications: ["Losartana 50mg", "Ibuprofeno"],
    recommendation: "Evitar uso concomitante. Considerar analgésicos alternativos como Paracetamol."
  },
  {
    id: "2",
    type: "allergy",
    severity: "critical",
    title: "Alergia Registrada",
    description: "Paciente possui alergia conhecida a Penicilinas e derivados.",
    medications: ["Penicilina", "Amoxicilina", "Ampicilina"],
    recommendation: "Evitar prescrição de antibióticos beta-lactâmicos. Considerar macrolídeos ou quinolonas."
  },
  {
    id: "3",
    type: "condition",
    severity: "warning",
    title: "Diabetes Tipo 2 em Tratamento",
    description: "Paciente diabético em uso de Metformina. Atenção ao prescrever corticoides ou diuréticos tiazídicos.",
    recommendation: "Monitorar glicemia se prescrever medicações que afetam controle glicêmico."
  },
  {
    id: "4",
    type: "contraindication",
    severity: "warning",
    title: "Hipertensão Arterial",
    description: "Cuidado com medicamentos que elevam pressão arterial (descongestionantes, AINEs, anticoncepcionais).",
    recommendation: "Priorizar medicações que não interfiram com controle pressórico."
  },
  {
    id: "5",
    type: "condition",
    severity: "info",
    title: "Histórico Familiar Relevante",
    description: "Histórico familiar de doença cardiovascular (pai com IAM aos 55 anos).",
    recommendation: "Manter controle rigoroso de fatores de risco cardiovascular."
  }
];

const getSeverityConfig = (severity: AlertSeverity) => {
  switch (severity) {
    case "critical":
      return {
        icon: XCircle,
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/50",
        iconColor: "text-red-600 dark:text-red-500",
        badgeVariant: "destructive" as const
      };
    case "warning":
      return {
        icon: AlertTriangle,
        bgColor: "bg-yellow-500/10",
        borderColor: "border-yellow-500/50",
        iconColor: "text-yellow-600 dark:text-yellow-500",
        badgeVariant: "secondary" as const
      };
    case "info":
      return {
        icon: Info,
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/50",
        iconColor: "text-blue-600 dark:text-blue-500",
        badgeVariant: "outline" as const
      };
  }
};

const getTypeLabel = (type: MedicalAlert["type"]) => {
  switch (type) {
    case "drug_interaction":
      return "Interação Medicamentosa";
    case "allergy":
      return "Alergia";
    case "condition":
      return "Condição Pré-existente";
    case "contraindication":
      return "Contraindicação";
  }
};

export function MedicalAlerts() {
  const [expandedAlerts, setExpandedAlerts] = useState<string[]>(["1", "2"]);

  const criticalAlerts = mockAlerts.filter(a => a.severity === "critical");
  const warningAlerts = mockAlerts.filter(a => a.severity === "warning");
  const infoAlerts = mockAlerts.filter(a => a.severity === "info");

  const toggleAlert = (alertId: string) => {
    setExpandedAlerts(prev =>
      prev.includes(alertId)
        ? prev.filter(id => id !== alertId)
        : [...prev, alertId]
    );
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-4 bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/10">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Alertas de Segurança</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {criticalAlerts.length} críticos • {warningAlerts.length} avisos • {infoAlerts.length} informativos
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {mockAlerts.map((alert) => {
              const config = getSeverityConfig(alert.severity);
              const Icon = config.icon;
              const isExpanded = expandedAlerts.includes(alert.id);

              return (
                <Collapsible
                  key={alert.id}
                  open={isExpanded}
                  onOpenChange={() => toggleAlert(alert.id)}
                >
                  <Alert className={`${config.bgColor} ${config.borderColor} border-2`}>
                    <CollapsibleTrigger className="w-full">
                      <div className="flex items-start gap-3 text-left">
                        <Icon className={`h-5 w-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="font-semibold text-sm text-foreground leading-tight">
                              {alert.title}
                            </h4>
                            <Badge variant={config.badgeVariant} className="text-[10px] flex-shrink-0">
                              {getTypeLabel(alert.type)}
                            </Badge>
                          </div>
                          {!isExpanded && (
                            <AlertDescription className="text-xs text-muted-foreground line-clamp-1">
                              {alert.description}
                            </AlertDescription>
                          )}
                        </div>
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent className="mt-3">
                      <div className="space-y-3 ml-8">
                        <AlertDescription className="text-xs text-muted-foreground leading-relaxed">
                          {alert.description}
                        </AlertDescription>

                        {alert.medications && alert.medications.length > 0 && (
                          <div className="space-y-1.5">
                            <p className="text-xs font-semibold text-foreground">Medicamentos Relacionados:</p>
                            <div className="flex flex-wrap gap-1.5">
                              {alert.medications.map((med, idx) => (
                                <Badge key={idx} variant="outline" className="text-[10px] font-normal">
                                  {med}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="pt-2 border-t border-border/50">
                          <p className="text-xs font-semibold text-foreground mb-1">Recomendação:</p>
                          <p className="text-xs text-muted-foreground leading-relaxed bg-background/50 p-2 rounded border border-border/30">
                            {alert.recommendation}
                          </p>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Alert>
                </Collapsible>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
