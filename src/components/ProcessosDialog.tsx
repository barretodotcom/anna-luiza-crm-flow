
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Save, Trash2, Scale, Edit, AlertTriangle, FileText } from 'lucide-react';
import { Processo } from '@/types/processo';
import BrazilProcessForm from './ProcessForm/BrazilProcessForm';
import PortugalProcessForm from './ProcessForm/PortugalProcessForm';
import AccessDenied from './ProcessForm/AccessDenied';

interface Cliente {
  id: number;
  name: string;
  STATUS: string;
  destino?: string;
}

interface ProcessosDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clienteId: number | null;
  processos: Processo[];
  onProcessosUpdate: () => Promise<void>;
}

const ProcessosDialog: React.FC<ProcessosDialogProps> = ({
  open,
  onOpenChange,
  clienteId,
  processos,
  onProcessosUpdate,
}) => {
  const [clienteProcessos, setClienteProcessos] = useState<Processo[]>([]);
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(false);
  const [novoProcesso, setNovoProcesso] = useState<Partial<Processo>>({
    anna_luiza_cliente_id: clienteId || 0,
    pais: 'Brasil',
    numero_cnj: '',
    numero_interno: '',
    classe_processual: '',
    assunto_principal: '',
    tipo_processo: '',
    forma_processo: '',
    tribunal_comarca: '',
    circunscricao: '',
    juiz_responsavel: '',
    instancia: '',
    secretaria_cartorio: '',
    cliente_tipo: '',
    parte_contraria: '',
    representantes_legais: '',
    terceiros_intervenientes: '',
    ministerio_publico: false,
    valor_causa: 0,
    honorarios_contratuais: 0,
    honorarios_exito: 0,
    custas_pagas: 0,
    custas_abertas: 0,
    depositos_judiciais: 0,
    justica_gratuita: false,
    data_distribuicao: '',
    data_inicio: '',
    ultimo_prazo: '',
    data_limite_prazo: '',
    proxima_audiencia: '',
    data_sentenca: '',
    prazo_recursal: '',
    data_prescricao: '',
    data_prevista_conclusao: '',
    fase_processual: '',
    ultima_movimentacao: '',
    status_processo: '',
    recursos_pendentes: '',
    execucao_cumprimento: '',
    peticao_inicial: false,
    principais_documentos: '',
    localizacao_fisica: '',
    documentos_digitalizados: false,
    procuracoes_validas: false,
    documentos_necessarios: '',
    area_direito: '',
    subarea_especifica: '',
    complexidade_caso: '',
    estrategia_processual: '',
    responsavel: '',
    advogado_assistente: '',
    paralegal_designado: '',
    correspondente_local: '',
    resumo_caso: '',
    observacoes: '',
    alertas_especiais: '',
    historico_decisoes: '',
    codigo_assunto_cnj: '',
    grau_sigilo: '',
    jef: false,
    sistema_eletronico: '',
    tipo_procedimento: '',
    regime_custas: '',
    apoio_judiciario: false,
    tempo_tramitacao: 0,
    taxa_sucesso_prevista: 0,
    risco_processual: '',
    probabilidade_exito: 0,
    urgencia_caso: '',
    numero_processo: ''
  });
  const [editandoProcesso, setEditandoProcesso] = useState<Processo | null>(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCliente = async () => {
      if (clienteId && open) {
        setLoading(true);
        try {
          const { data, error } = await supabase
            .from('anna_luiza_clientes')
            .select('id, name, STATUS, destino')
            .eq('id', clienteId)
            .single();

          if (error) {
            console.error('Erro ao buscar cliente:', error);
            return;
          }

          setCliente(data);
          const processosCliente = processos.filter(p => p.anna_luiza_cliente_id === clienteId);
          setClienteProcessos(processosCliente);
          setNovoProcesso(prev => ({ 
            ...prev, 
            anna_luiza_cliente_id: clienteId,
            pais: data?.destino || 'Brasil'
          }));
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCliente();
  }, [clienteId, processos, open]);

  const handleSalvarProcesso = async () => {
    if (!clienteId) return;

    try {
      const processoData = editandoProcesso ? 
        { ...editandoProcesso, ...novoProcesso } : 
        { ...novoProcesso, anna_luiza_cliente_id: clienteId };

      // Simulação de salvamento - implementar quando a tabela for criada
      console.log('Salvando processo:', processoData);
      
      toast({
        title: "Processo salvo",
        description: `Processo ${editandoProcesso ? 'atualizado' : 'criado'} com sucesso`,
      });

      setMostrarForm(false);
      setEditandoProcesso(null);
      setNovoProcesso({
        anna_luiza_cliente_id: clienteId,
        pais: 'Brasil',
        numero_cnj: '',
        numero_interno: '',
        // ... reset todos os campos
      });
      
      await onProcessosUpdate();
    } catch (error) {
      console.error('Erro ao salvar processo:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível salvar o processo",
      });
    }
  };

  const handleEditarProcesso = (processo: Processo) => {
    setEditandoProcesso(processo);
    setNovoProcesso(processo);
    setMostrarForm(true);
  };

  const handleExcluirProcesso = async (processoId: number) => {
    try {
      // Simulação de exclusão - implementar quando a tabela for criada
      console.log('Excluindo processo:', processoId);
      
      toast({
        title: "Processo excluído",
        description: "Processo removido com sucesso",
      });
      
      await onProcessosUpdate();
    } catch (error) {
      console.error('Erro ao excluir processo:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível excluir o processo",
      });
    }
  };

  if (!clienteId || loading) return null;

  // Verificar regras de acesso
  const canAccessProcesses = () => {
    return true; // Sempre permitir acesso independente do status
  };

  const getAccessDeniedMessage = () => {
    return ''; // Sem mensagens de acesso negado
  };

  const handleProcessoChange = (field: keyof Processo, value: any) => {
    setNovoProcesso(prev => ({ ...prev, [field]: value }));
  };

  const renderProcessForm = () => {
    const destino = novoProcesso.pais || cliente?.destino;
    
    if (!destino) {
      return (
        <AccessDenied 
          message="Selecione a jurisdição (Brasil ou Portugal) para configurar o formulário."
        />
      );
    }
    
    switch (destino) {
      case 'Brasil':
        return (
          <BrazilProcessForm 
            processo={novoProcesso} 
            onChange={handleProcessoChange}
          />
        );
      case 'Portugal':
        return (
          <PortugalProcessForm 
            processo={novoProcesso} 
            onChange={handleProcessoChange}
          />
        );
      default:
        return (
          <AccessDenied 
            message="Jurisdição inválida. Selecione Brasil ou Portugal."
          />
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            Gerenciar Processos
          </DialogTitle>
          <DialogDescription>
            Gerencie os processos jurídicos deste cliente
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-sm px-4 py-2">
                Total: {clienteProcessos.length} processo(s)
              </Badge>
              {(cliente?.destino || novoProcesso.pais) && (
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  Jurisdição Padrão: {cliente?.destino || 'Não definida'}
                </Badge>
              )}
            </div>
            <Button 
              onClick={() => setMostrarForm(true)} 
              className="gap-2"
              disabled={!canAccessProcesses()}
            >
              <Plus className="h-4 w-4" />
              Novo Processo
            </Button>
          </div>

          {!canAccessProcesses() && (
            <AccessDenied 
              message={getAccessDeniedMessage()}
            />
          )}

          {mostrarForm && canAccessProcesses() && (
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>
                    {editandoProcesso ? 'Editar Processo' : 'Novo Processo'}
                  </span>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="destino-select" className="text-sm font-normal">Jurisdição:</Label>
                    <Select
                      value={novoProcesso.pais || cliente?.destino || ''}
                      onValueChange={(value) => handleProcessoChange('pais', value)}
                    >
                      <SelectTrigger className="w-[120px] h-8">
                        <SelectValue placeholder="Destino" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Brasil">Brasil</SelectItem>
                        <SelectItem value="Portugal">Portugal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {novoProcesso.pais ? renderProcessForm() : (
                  <AccessDenied 
                    message="Selecione a jurisdição (Brasil ou Portugal) para configurar o formulário."
                  />
                )}

                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setMostrarForm(false);
                      setEditandoProcesso(null);
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleSalvarProcesso} className="gap-2">
                    <Save className="h-4 w-4" />
                    {editandoProcesso ? 'Atualizar' : 'Salvar'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {clienteProcessos.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum processo encontrado para este cliente</p>
                <p className="text-sm">Clique em "Novo Processo" para adicionar o primeiro</p>
              </div>
            ) : (
              clienteProcessos.map((processo) => (
                <Card key={processo.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          <Scale className="h-5 w-5 text-primary" />
                          {processo.numero_cnj || processo.numero_interno || 'Processo sem número'}
                        </h3>
                        <p className="text-muted-foreground">
                          {processo.classe_processual} - {processo.assunto_principal}
                        </p>
                        {processo.resumo_caso && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {processo.resumo_caso}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Valor: R$ {processo.valor_causa?.toLocaleString('pt-BR') || '0,00'}</span>
                          <span>Status: {processo.status_processo || 'Em andamento'}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditarProcesso(processo)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleExcluirProcesso(processo.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessosDialog;
