import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, Edit, Calendar, Phone, MapPin, FileText } from 'lucide-react';

interface Cliente {
  id: number;
  name: string;
  remote_jid: string;
  thread_id: string;
  last_message_timestamp: string;
  agendamento_realizado: boolean;
  follow_up_1_realizado: boolean;
  informacoes_adicionais: string;
  interesse: string;
  STATUS: string;
  created_at: string;
}

const Clientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Cliente>>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const { data, error } = await supabase
        .from('anna_luiza_clientes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar clientes:', error);
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível carregar os clientes",
        });
        return;
      }

      setClientes(data || []);
    } catch (error) {
      console.error('Erro:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro de conexão",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredClientes = clientes.filter(cliente =>
    cliente.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.interesse?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.STATUS?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'EM_ATENDIMENTO':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'FINALIZADO':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'AGUARDANDO':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleEdit = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setEditForm(cliente);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedCliente) return;

    try {
      const { error } = await supabase
        .from('anna_luiza_clientes')
        .update({
          name: editForm.name,
          interesse: editForm.interesse,
          informacoes_adicionais: editForm.informacoes_adicionais,
          STATUS: editForm.STATUS,
          agendamento_realizado: editForm.agendamento_realizado,
          follow_up_1_realizado: editForm.follow_up_1_realizado,
        })
        .eq('id', selectedCliente.id);

      if (error) {
        throw error;
      }

      toast({
        title: "Sucesso",
        description: "Cliente atualizado com sucesso",
      });

      setEditDialogOpen(false);
      fetchClientes();
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível atualizar o cliente",
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Clientes</h1>
        </div>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando clientes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Clientes</h1>
          <p className="text-muted-foreground">
            Gerencie os clientes do escritório
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background/50"
          />
        </div>
        <Badge variant="outline" className="text-sm">
          {filteredClientes.length} cliente(s)
        </Badge>
      </div>

      <div className="grid gap-4">
        {filteredClientes.length === 0 ? (
          <Card className="crm-card">
            <CardContent className="text-center py-8">
              <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-muted-foreground">
                {searchTerm ? 'Nenhum cliente encontrado' : 'Nenhum cliente cadastrado'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredClientes.map((cliente) => (
            <Card key={cliente.id} className="crm-card hover:bg-card/80 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold">{cliente.name || 'Nome não informado'}</h3>
                      <Badge className={`${getStatusColor(cliente.STATUS)} border`}>
                        {cliente.STATUS?.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Interesse:</span>
                        <span>{cliente.interesse || 'Não informado'}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Último contato:</span>
                        <span>{formatDate(cliente.last_message_timestamp)}</span>
                      </div>
                    </div>

                    {cliente.informacoes_adicionais && (
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-sm font-medium mb-1">Informações Adicionais:</p>
                        <p className="text-sm text-muted-foreground">{cliente.informacoes_adicionais}</p>
                      </div>
                    )}

                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${cliente.agendamento_realizado ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                        <span>Agendamento</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${cliente.follow_up_1_realizado ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                        <span>Follow-up</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(cliente)}
                    className="ml-4"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-card border-border">
          <DialogHeader>
            <DialogTitle>Editar Cliente</DialogTitle>
            <DialogDescription>
              Atualize as informações do cliente
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={editForm.name || ''}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="bg-background/50"
              />
            </div>
            
            <div>
              <Label htmlFor="interesse">Interesse</Label>
              <Input
                id="interesse"
                value={editForm.interesse || ''}
                onChange={(e) => setEditForm({ ...editForm, interesse: e.target.value })}
                className="bg-background/50"
              />
            </div>
            
            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={editForm.STATUS || ''}
                onChange={(e) => setEditForm({ ...editForm, STATUS: e.target.value })}
                className="w-full p-2 border border-border rounded-md bg-background/50"
              >
                <option value="EM_ATENDIMENTO">Em Atendimento</option>
                <option value="FINALIZADO">Finalizado</option>
                <option value="AGUARDANDO">Aguardando</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="informacoes">Informações Adicionais</Label>
              <Textarea
                id="informacoes"
                value={editForm.informacoes_adicionais || ''}
                onChange={(e) => setEditForm({ ...editForm, informacoes_adicionais: e.target.value })}
                className="bg-background/50"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="agendamento"
                  checked={editForm.agendamento_realizado || false}
                  onChange={(e) => setEditForm({ ...editForm, agendamento_realizado: e.target.checked })}
                  className="rounded border-border"
                />
                <Label htmlFor="agendamento">Agendamento realizado</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="followup"
                  checked={editForm.follow_up_1_realizado || false}
                  onChange={(e) => setEditForm({ ...editForm, follow_up_1_realizado: e.target.checked })}
                  className="rounded border-border"
                />
                <Label htmlFor="followup">Follow-up realizado</Label>
              </div>
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
    </div>
  );
};

export default Clientes;