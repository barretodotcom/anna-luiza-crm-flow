import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, Edit, Mail, User, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ExcluirMembroModal from './components/ExcluirMembro';

interface Membro {
  id: string;
  nome: string;
  email: string;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

const MembrosListagem = () => {
  const [membros, setMembros] = useState<Membro[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMembro, setSelectedMembro] = useState<Membro | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteEmailConfirm, setDeleteEmailConfirm] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [editForm, setEditForm] = useState<Partial<Membro>>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMembros();
  }, []);

  const fetchMembros = async () => {
    try {
      const { data, error } = await supabase
        .from('anna_luiza_usuarios')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível carregar os membros",
        });
        return;
      }

      setMembros(data || []);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro de conexão",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredMembros = membros.filter(membro =>
    membro.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    membro.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (membro: Membro) => {
    setSelectedMembro(membro);
    setEditForm(membro);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedMembro) return;

    try {
      const { error } = await supabase
        .from('anna_luiza_usuarios')
        .update({
          nome: editForm.nome,
          email: editForm.email,
          ativo: editForm.ativo,
        })
        .eq('id', selectedMembro.id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Membro atualizado com sucesso",
      });

      setEditDialogOpen(false);
      fetchMembros();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível atualizar o membro",
      });
    }
  };

  const handleDelete = async () => {
    if (!selectedMembro) return;
    if (deleteEmailConfirm !== selectedMembro.email) {
      toast({
        variant: "destructive",
        title: "Email incorreto",
        description: "O email informado não corresponde ao membro selecionado.",
      });
      return;
    }
    setDeleteLoading(true);
    try {
      const { error } = await supabase
        .from('anna_luiza_usuarios')
        .delete()
        .eq('id', selectedMembro.id);

      if (error) throw error;

      toast({
        title: "Membro excluído",
        description: "O membro foi excluído com sucesso.",
      });

      setDeleteDialogOpen(false);
      setSelectedMembro(null);
      setDeleteEmailConfirm('');
      fetchMembros();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível excluir o membro.",
      });
    } finally {
      setDeleteLoading(false);
    }
  };


  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Membros</h1>
        </div>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando membros...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Membros</h1>
          <p className="text-muted-foreground">
            Gerencie os membros do escritório
          </p>
        </div>
        <Button onClick={() => navigate('/dashboard/membros/novo')} className="crm-button-primary">
          <Plus className="h-4 w-4 mr-2" />
          Novo Membro
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar membros..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background/50"
          />
        </div>
        <Badge variant="outline" className="text-sm">
          {filteredMembros.length} membro(s)
        </Badge>
      </div>

      <div className="grid gap-4">
        {filteredMembros.length === 0 ? (
          <Card className="crm-card">
            <CardContent className="text-center py-8">
              <User className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-muted-foreground">
                {searchTerm ? 'Nenhum membro encontrado' : 'Nenhum membro cadastrado'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredMembros.map((membro) => (
            <Card key={membro.id} className="crm-card hover:bg-card/80 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold">{membro.nome}</h3>
                      <Badge className={membro.ativo ? "bg-green-500/20 text-green-400 border-green-500/50 border" : "bg-gray-500/20 text-gray-400 border-gray-500/50 border"}>
                        {membro.ativo ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Email:</span>
                        <span>{membro.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Criado em:</span>
                        <span>{new Date(membro.created_at).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(membro)}
                    className="ml-4"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedMembro(membro);
                      setDeleteDialogOpen(true);
                      setDeleteEmailConfirm('');
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[400px] bg-card border-border">
          <DialogHeader>
            <DialogTitle>Editar Membro</DialogTitle>
            <DialogDescription>
              Atualize as informações do membro
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                value={editForm.nome || ''}
                onChange={(e) => setEditForm({ ...editForm, nome: e.target.value })}
                className="bg-background/50"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={editForm.email || ''}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                className="bg-background/50"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="ativo"
                checked={editForm.ativo ?? true}
                onChange={(e) => setEditForm({ ...editForm, ativo: e.target.checked })}
                className="rounded border-border"
              />
              <Label htmlFor="ativo">Ativo</Label>
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit} className="crm-button-primary">
              Salvar Alterações
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ExcluirMembroModal
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        membroEmail={selectedMembro?.email}
        emailConfirm={deleteEmailConfirm}
        setEmailConfirm={setDeleteEmailConfirm}
        onDelete={handleDelete}
        loading={deleteLoading}
      />
    </div>
  );
};

export default MembrosListagem;