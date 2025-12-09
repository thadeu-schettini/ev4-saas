import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Package, Plus } from "lucide-react";

interface NewItemModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewItemModal({ open, onOpenChange }: NewItemModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    minQuantity: "",
    unit: "",
    price: "",
    supplier: "",
    description: ""
  });

  const handleSubmit = () => {
    onOpenChange(false);
    setFormData({
      name: "",
      category: "",
      quantity: "",
      minQuantity: "",
      unit: "",
      price: "",
      supplier: "",
      description: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Novo Item de Estoque
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Nome do Item</Label>
            <Input 
              placeholder="Ex: Luvas de Procedimento M"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="materiais">Materiais</SelectItem>
                  <SelectItem value="medicamentos">Medicamentos</SelectItem>
                  <SelectItem value="limpeza">Limpeza</SelectItem>
                  <SelectItem value="equipamentos">Equipamentos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Unidade</Label>
              <Select 
                value={formData.unit} 
                onValueChange={(value) => setFormData({ ...formData, unit: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unidades">Unidades</SelectItem>
                  <SelectItem value="pares">Pares</SelectItem>
                  <SelectItem value="caixas">Caixas</SelectItem>
                  <SelectItem value="pacotes">Pacotes</SelectItem>
                  <SelectItem value="litros">Litros</SelectItem>
                  <SelectItem value="rolos">Rolos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Quantidade Atual</Label>
              <Input 
                type="number"
                placeholder="0"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Quantidade Mínima</Label>
              <Input 
                type="number"
                placeholder="0"
                value={formData.minQuantity}
                onChange={(e) => setFormData({ ...formData, minQuantity: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Preço Unitário (R$)</Label>
              <Input 
                type="number"
                step="0.01"
                placeholder="0,00"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Fornecedor</Label>
              <Input 
                placeholder="Nome do fornecedor"
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Observações</Label>
            <Textarea 
              placeholder="Informações adicionais sobre o item..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} className="gap-2">
              <Plus className="h-4 w-4" />
              Adicionar Item
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
