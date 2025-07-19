import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ExcluirMembroModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  membroEmail: string | undefined;
  emailConfirm: string;
  setEmailConfirm: (email: string) => void;
  onDelete: () => void;
  loading: boolean;
}

const ExcluirMembroModal: React.FC<ExcluirMembroModalProps> = ({
  open,
  onOpenChange,
  membroEmail,
  emailConfirm,
  setEmailConfirm,
  onDelete,
  loading,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-[400px] bg-card border-border">
      <DialogHeader>
        <DialogTitle>Excluir Membro</DialogTitle>
        <DialogDescription>
          Para confirmar, digite o email do membro abaixo:<br />
          <span className="font-mono text-sm">{membroEmail}</span>
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <Label htmlFor="delete-email">Confirme o email do membro</Label>
        <Input
          id="delete-email"
          value={emailConfirm}
          onChange={(e) => setEmailConfirm(e.target.value)}
          placeholder="Digite o email do membro"
          className="bg-background/50"
          disabled={loading}
        />
      </div>
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
          Cancelar
        </Button>
        <Button
          variant="destructive"
          onClick={onDelete}
          disabled={loading || !emailConfirm}
        >
          {loading ? "Excluindo..." : "Excluir"}
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);

export default ExcluirMembroModal;