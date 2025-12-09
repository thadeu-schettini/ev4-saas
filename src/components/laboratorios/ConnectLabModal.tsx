import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link2, FlaskConical, CheckCircle2, Search } from "lucide-react";

interface ConnectLabModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const availableLabs = [
  { id: 1, name: "Laboratório São Lucas", location: "São Paulo, SP", popular: true },
  { id: 2, name: "Lab Diagnósticos", location: "São Paulo, SP", popular: true },
  { id: 3, name: "Diagnósticos Avançados", location: "Rio de Janeiro, RJ", popular: false },
  { id: 4, name: "Lab Central", location: "Belo Horizonte, MG", popular: false },
  { id: 5, name: "BioLab Análises", location: "Curitiba, PR", popular: false },
  { id: 6, name: "Exame Certo", location: "Salvador, BA", popular: false },
];

export function ConnectLabModal({ open, onOpenChange }: ConnectLabModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedLab, setSelectedLab] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [credentials, setCredentials] = useState({
    apiKey: "",
    clientId: "",
  });

  const handleConnect = () => {
    onOpenChange(false);
    setStep(1);
    setSelectedLab(null);
    setCredentials({ apiKey: "", clientId: "" });
  };

  const filteredLabs = availableLabs.filter(lab => 
    lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lab.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Link2 className="h-5 w-5 text-primary" />
            {step === 1 ? "Selecionar Laboratório" : "Configurar Conexão"}
          </DialogTitle>
        </DialogHeader>

        {step === 1 ? (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar laboratório..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <ScrollArea className="h-[300px]">
              <div className="space-y-2">
                {filteredLabs.map((lab) => (
                  <div
                    key={lab.id}
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedLab === lab.id 
                        ? "bg-primary/5 border-primary/30" 
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedLab(lab.id)}
                  >
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <FlaskConical className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{lab.name}</p>
                        {lab.popular && (
                          <Badge variant="outline" className="text-xs bg-confirmed/10 text-confirmed border-confirmed/20">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{lab.location}</p>
                    </div>
                    {selectedLab === lab.id && (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setStep(2)} disabled={!selectedLab}>
                Próximo
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-muted/30 border">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <FlaskConical className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">
                    {availableLabs.find(l => l.id === selectedLab)?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {availableLabs.find(l => l.id === selectedLab)?.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>API Key</Label>
              <Input 
                type="password"
                placeholder="Insira a chave de API do laboratório"
                value={credentials.apiKey}
                onChange={(e) => setCredentials({ ...credentials, apiKey: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Você pode obter a API Key no portal do laboratório parceiro.
              </p>
            </div>

            <div className="space-y-2">
              <Label>Client ID</Label>
              <Input 
                placeholder="Insira o ID do cliente"
                value={credentials.clientId}
                onChange={(e) => setCredentials({ ...credentials, clientId: e.target.value })}
              />
            </div>

            <div className="p-3 rounded-lg bg-info/5 border border-info/20">
              <p className="text-sm text-info">
                Após conectar, os resultados de exames serão sincronizados automaticamente.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <Button variant="ghost" onClick={() => setStep(1)}>
                Voltar
              </Button>
              <Button onClick={handleConnect} className="gap-2">
                <Link2 className="h-4 w-4" />
                Conectar Laboratório
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
