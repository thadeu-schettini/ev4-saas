import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Gauge, Activity, AlertTriangle, CheckCircle2, Settings, Save, X, Edit } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

interface RateLimitingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const trafficData = [
  { time: "00:00", requests: 1200 },
  { time: "04:00", requests: 800 },
  { time: "08:00", requests: 3500 },
  { time: "12:00", requests: 4200 },
  { time: "16:00", requests: 3800 },
  { time: "20:00", requests: 2100 },
];

const rateLimitRules = [
  { id: "1", name: "API Geral", endpoint: "/api/*", limit: 100, window: "1 min", enabled: true, violations: 23 },
  { id: "2", name: "Login", endpoint: "/auth/login", limit: 5, window: "5 min", enabled: true, violations: 156 },
  { id: "3", name: "Exportação", endpoint: "/export/*", limit: 10, window: "1 hora", enabled: true, violations: 8 },
  { id: "4", name: "Upload", endpoint: "/upload/*", limit: 20, window: "1 min", enabled: true, violations: 3 },
  { id: "5", name: "Webhook", endpoint: "/webhook/*", limit: 1000, window: "1 min", enabled: false, violations: 0 },
];

const chartConfig = {
  requests: { label: "Requests", color: "hsl(var(--primary))" },
};

export function RateLimitingModal({ open, onOpenChange }: RateLimitingModalProps) {
  const [rules, setRules] = useState(rateLimitRules);
  const [globalLimit, setGlobalLimit] = useState([100]);
  const [editingRule, setEditingRule] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ limit: 0, window: "" });

  const toggleRule = (id: string) => {
    setRules(rules.map(rule =>
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const startEditRule = (rule: typeof rateLimitRules[0]) => {
    setEditingRule(rule.id);
    setEditForm({ limit: rule.limit, window: rule.window });
  };

  const saveRuleEdit = (id: string) => {
    setRules(rules.map(rule =>
      rule.id === id ? { ...rule, limit: editForm.limit, window: editForm.window } : rule
    ));
    setEditingRule(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gauge className="h-5 w-5 text-primary" />
            Configuração de Rate Limiting
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-primary/10 to-transparent">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Requests/min</span>
                </div>
                <div className="text-2xl font-bold">3.2K</div>
                <div className="text-xs text-muted-foreground">média atual</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-success/10 to-transparent">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="text-sm text-muted-foreground">Taxa de Sucesso</span>
                </div>
                <div className="text-2xl font-bold text-success">99.2%</div>
                <div className="text-xs text-muted-foreground">últimas 24h</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-warning/10 to-transparent">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <span className="text-sm text-muted-foreground">Rate Limited</span>
                </div>
                <div className="text-2xl font-bold text-warning">190</div>
                <div className="text-xs text-muted-foreground">requests bloqueados</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-info/10 to-transparent">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="h-4 w-4 text-info" />
                  <span className="text-sm text-muted-foreground">Regras Ativas</span>
                </div>
                <div className="text-2xl font-bold">{rules.filter(r => r.enabled).length}</div>
                <div className="text-xs text-muted-foreground">de {rules.length} configuradas</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tráfego nas Últimas 24 Horas</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[180px] w-full">
                <AreaChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="time" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Area
                    type="monotone"
                    dataKey="requests"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary) / 0.2)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Limite Global</CardTitle>
              <Badge variant="outline">{globalLimit[0]} req/min por IP</Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground w-12">10</span>
                <Slider
                  value={globalLimit}
                  onValueChange={setGlobalLimit}
                  min={10}
                  max={500}
                  step={10}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground w-12">500</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Regras por Endpoint</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {rules.map((rule) => (
                  <Card key={rule.id} className={!rule.enabled ? "opacity-60" : ""}>
                    <CardContent className="p-4">
                      {editingRule === rule.id ? (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{rule.name}</span>
                            <code className="text-xs bg-muted px-2 py-0.5 rounded">{rule.endpoint}</code>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm">Limite de Requests</Label>
                              <Input
                                type="number"
                                value={editForm.limit}
                                onChange={(e) => setEditForm({ ...editForm, limit: parseInt(e.target.value) })}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-sm">Janela de Tempo</Label>
                              <Select value={editForm.window} onValueChange={(v) => setEditForm({ ...editForm, window: v })}>
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1 min">1 minuto</SelectItem>
                                  <SelectItem value="5 min">5 minutos</SelectItem>
                                  <SelectItem value="15 min">15 minutos</SelectItem>
                                  <SelectItem value="1 hora">1 hora</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => setEditingRule(null)}>
                              <X className="h-4 w-4 mr-1" /> Cancelar
                            </Button>
                            <Button size="sm" onClick={() => saveRuleEdit(rule.id)}>
                              <Save className="h-4 w-4 mr-1" /> Salvar
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4">
                          <Switch
                            checked={rule.enabled}
                            onCheckedChange={() => toggleRule(rule.id)}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{rule.name}</span>
                              <code className="text-xs bg-muted px-2 py-0.5 rounded">{rule.endpoint}</code>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {rule.limit} requests / {rule.window}
                            </div>
                          </div>
                          <div className="text-right">
                            {rule.violations > 0 ? (
                              <Badge variant="destructive">{rule.violations} violações</Badge>
                            ) : (
                              <Badge variant="secondary">Sem violações</Badge>
                            )}
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => startEditRule(rule)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button className="transition-transform hover:scale-105 active:scale-95" onClick={() => toast.success("Configurações de rate limiting salvas!")}>
              <Save className="h-4 w-4 mr-2" />
              Salvar Configurações
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
