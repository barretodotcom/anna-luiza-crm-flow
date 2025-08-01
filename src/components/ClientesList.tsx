import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Calendar, FileText, User, Briefcase, Lock, Eye, Scale } from 'lucide-react';
import ProcessosDialog from './ProcessosDialog';
import { Cliente, Processo } from '@/types/processo';

const STATUS_CONFIG = {
  'EM_ATENDIMENTO': { label: 'Em Atendimento', color: 'bg-info/10 text-info border-info/20', locked: true },
  'CONSULTORIA_AGENDADA': { label: 'Consultoria Agendada', color: 'bg-warning/10 text-warning border-warning/20', locked: false },
  'PROPOSTA_CUSTOMIZADA': { label: 'Proposta Customizada', color: 'bg-primary/10 text-primary border-primary/20', locked: false },
  'FINALIZADO': { label: 'Finalizado', color: 'bg-success/10 text-success border-success/20', locked: false },
  'AGUARDANDO': { label: 'Aguardando', color: 'bg-accent/10 text-accent border-accent/20', locked: false }
};

const ClientesList = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [processos, setProcessos] = useState<Processo[]>([]);
  const [loading, setLoading] = useState(true);
  const [processosDialogOpen, setProcessosDialogOpen] = useState(false);
  const [selectedClienteId, setSelectedClienteId] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchClientes();
    fetchProcessos();
  }, []);

  const fetchClientes = async () => {
    try {
      const { data, error } = await supabase
        .from('anna_luiza_clientes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClientes(data || []);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível carregar os clientes",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchProcessos = async () => {
    try {
      // Simulação até a tabela ser criada
      setProcessos([]);
    } catch (error) {
      console.error('Erro ao buscar processos:', error);
    }
  };

  const handleClienteClick = (cliente: Cliente) => {
    if (cliente.STATUS === 'EM_ATENDIMENTO') {
      toast({
        variant: "destructive",
        title: "Cliente em atendimento",
        description: "Não é possível gerenciar processos de clientes em atendimento",
      });
      return;
    }
    
    setSelectedClienteId(cliente.id);
    setProcessosDialogOpen(true);
  };

  const handleGerenciarProcessos = (cliente: Cliente, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (cliente.STATUS === 'EM_ATENDIMENTO') {
      toast({
        variant: "destructive",
        title: "Cliente em atendimento",
        description: "Não é possível gerenciar processos de clientes em atendimento",
      });
      return;
    }
    
    setSelectedClienteId(cliente.id);
    setProcessosDialogOpen(true);
  };

  const getProcessosCount = (clienteId: number) => {
    return processos.filter(p => p.anna_luiza_cliente_id === clienteId).length;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getStatusConfig = (status: string) => {
    return STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] || {
      label: status,
      color: 'bg-muted/10 text-muted-foreground border-muted/20',
      locked: false
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="crm-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Lista de Clientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="font-semibold">Cliente</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Interesse</TableHead>
                  <TableHead className="font-semibold">Data Criação</TableHead>
                  <TableHead className="font-semibold">Processos</TableHead>
                  <TableHead className="font-semibold">Indicadores</TableHead>
                  <TableHead className="font-semibold text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientes.map((cliente) => {
                  const statusConfig = getStatusConfig(cliente.STATUS);
                  const processosCount = getProcessosCount(cliente.id);
                  
                  return (
                    <TableRow 
                      key={cliente.id} 
                      className="hover:bg-muted/20 transition-colors"
                    >
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium text-foreground flex items-center gap-2">
                            {statusConfig.locked && <Lock className="h-3 w-3 text-info" />}
                            {cliente.name || 'Nome não informado'}
                          </div>
                          {cliente.informacoes_adicionais && (
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              <span className="truncate max-w-[200px]">
                                {cliente.informacoes_adicionais}
                              </span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Badge className={`${statusConfig.color} border`}>
                          {statusConfig.label}
                        </Badge>
                      </TableCell>
                      
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {cliente.interesse || 'Não informado'}
                        </span>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {formatDate(cliente.created_at)}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        {processosCount > 0 ? (
                          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                            <Briefcase className="h-3 w-3 mr-1" />
                            {processosCount}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground text-sm">-</span>
                        )}
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <div className={`w-2 h-2 rounded-full ${cliente.agendamento_realizado ? 'bg-success' : 'bg-muted-foreground/30'}`}></div>
                            <span className="text-xs text-muted-foreground">Agend.</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className={`w-2 h-2 rounded-full ${cliente.follow_up_1_realizado ? 'bg-success' : 'bg-muted-foreground/30'}`}></div>
                            <span className="text-xs text-muted-foreground">Follow-up</span>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => handleGerenciarProcessos(cliente, e)}
                            disabled={statusConfig.locked}
                            className="h-8 w-8 p-0 hover:bg-primary/10"
                            title="Gerenciar Processos"
                          >
                            <Scale className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleClienteClick(cliente)}
                            disabled={statusConfig.locked}
                            className="h-8 w-8 p-0 hover:bg-primary/10"
                            title="Visualizar Cliente"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          
          {clientes.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum cliente encontrado</p>
            </div>
          )}
        </CardContent>
      </Card>

      <ProcessosDialog
        open={processosDialogOpen}
        onOpenChange={setProcessosDialogOpen}
        clienteId={selectedClienteId}
        processos={processos}
        onProcessosUpdate={fetchProcessos}
      />
    </div>
  );
};

export default ClientesList;
