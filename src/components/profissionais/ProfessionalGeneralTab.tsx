import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Briefcase, User, Edit, Save, X, Plus } from "lucide-react";
import { toast } from "sonner";

interface Professional {
  id?: string;
  name: string;
  specialty: string;
  crm: string;
  phone: string;
  email: string;
  address: string;
}

interface ProfessionalGeneralTabProps {
  professional: Professional;
  onUpdate?: (data: Partial<Professional>) => void;
}

export const ProfessionalGeneralTab = ({ professional, onUpdate }: ProfessionalGeneralTabProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: professional.name,
    specialty: professional.specialty,
    crm: professional.crm,
    phone: professional.phone,
    email: professional.email,
    address: professional.address,
  });
  const [specialties, setSpecialties] = useState(["Clínica Geral", "Medicina Preventiva", "Saúde Ocupacional"]);
  const [newSpecialty, setNewSpecialty] = useState("");

  const handleSave = () => {
    onUpdate?.(formData);
    setIsEditing(false);
    toast.success("Dados atualizados com sucesso!");
  };

  const handleCancel = () => {
    setFormData({
      name: professional.name,
      specialty: professional.specialty,
      crm: professional.crm,
      phone: professional.phone,
      email: professional.email,
      address: professional.address,
    });
    setIsEditing(false);
  };

  const handleAddSpecialty = () => {
    if (newSpecialty.trim() && !specialties.includes(newSpecialty.trim())) {
      setSpecialties([...specialties, newSpecialty.trim()]);
      setNewSpecialty("");
    }
  };

  const handleRemoveSpecialty = (spec: string) => {
    setSpecialties(specialties.filter(s => s !== spec));
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            Informações Pessoais
          </h3>
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(f => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialty">Especialidade Principal</Label>
                <Input
                  id="specialty"
                  value={formData.specialty}
                  onChange={(e) => setFormData(f => ({ ...f, specialty: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="crm">Registro Profissional (CRM)</Label>
                <Input
                  id="crm"
                  value={formData.crm}
                  onChange={(e) => setFormData(f => ({ ...f, crm: e.target.value }))}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 mt-0.5">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <Label className="text-xs text-muted-foreground">Nome Completo</Label>
                <p className="text-sm font-medium">{formData.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 mt-0.5">
                <Briefcase className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <Label className="text-xs text-muted-foreground">Especialidade</Label>
                <p className="text-sm font-medium">{formData.specialty}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 mt-0.5">
                <Badge className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <Label className="text-xs text-muted-foreground">Registro Profissional</Label>
                <p className="text-sm font-medium">{formData.crm}</p>
              </div>
            </div>
          </div>
        )}
      </Card>

      <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Phone className="h-4 w-4 text-primary" />
          Contato
        </h3>

        {isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(f => ({ ...f, phone: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(f => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Local de Atendimento</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(f => ({ ...f, address: e.target.value }))}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 mt-0.5">
                <Phone className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <Label className="text-xs text-muted-foreground">Telefone</Label>
                <p className="text-sm font-medium">{formData.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 mt-0.5">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <Label className="text-xs text-muted-foreground">E-mail</Label>
                <p className="text-sm font-medium">{formData.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 mt-0.5">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <Label className="text-xs text-muted-foreground">Local de Atendimento</Label>
                <p className="text-sm font-medium">{formData.address}</p>
              </div>
            </div>
          </div>
        )}
      </Card>

      <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-primary" />
            Outras Especialidades
          </h3>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {specialties.map((spec) => (
            <Badge key={spec} variant="secondary" className="gap-1 pr-1">
              {spec}
              {isEditing && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => handleRemoveSpecialty(spec)}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </Badge>
          ))}
        </div>

        {isEditing && (
          <div className="flex gap-2">
            <Input
              placeholder="Adicionar especialidade..."
              value={newSpecialty}
              onChange={(e) => setNewSpecialty(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddSpecialty()}
            />
            <Button variant="outline" onClick={handleAddSpecialty}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};
