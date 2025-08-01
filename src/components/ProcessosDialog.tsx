
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Save, Trash2, FileText, Scale, Users, DollarSign, Calendar, AlertCircle, Settings, BarChart3 } from 'lucide-react';
import { Processo } from '@/types/processo';

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
    if (clienteId && open) {
      const processosCliente = processos.filter(p => p.anna_luiza_cliente_id === clienteId);
      setClienteProcessos(processosCliente);
      setNovoProcesso(prev => ({ ...prev, anna_luiza_cliente_id: clienteId }));
    }
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

  if (!clienteId) return null;

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
            </div>
            <Button onClick={() => setMostrarForm(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Processo
            </Button>
          </div>

          {mostrarForm && (
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">
                  {editandoProcesso ? 'Editar Processo' : 'Novo Processo'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="identificacao" className="w-full">
                  <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="identificacao" className="gap-2">
                      <FileText className="h-4 w-4" />
                      Identificação
                    </TabsTrigger>
                    <TabsTrigger value="tribunal" className="gap-2">
                      <Scale className="h-4 w-4" />
                      Tribunal
                    </TabsTrigger>
                    <TabsTrigger value="partes" className="gap-2">
                      <Users className="h-4 w-4" />
                      Partes
                    </TabsTrigger>
                    <TabsTrigger value="financeiro" className="gap-2">
                      <DollarSign className="h-4 w-4" />
                      Financeiro
                    </TabsTrigger>
                    <TabsTrigger value="prazos" className="gap-2">
                      <Calendar className="h-4 w-4" />
                      Prazos
                    </TabsTrigger>
                    <TabsTrigger value="outros" className="gap-2">
                      <Settings className="h-4 w-4" />
                      Outros
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="identificacao" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="numero_cnj">Número CNJ</Label>
                        <Input
                          id="numero_cnj"
                          value={novoProcesso.numero_cnj || ''}
                          onChange={(e) => setNovoProcesso(prev => ({ ...prev, numero_cnj: e.target.value }))}
                          placeholder="NNNNNNN-DD.AAAA.J.TR.OOOO"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="numero_interno">Número Interno</Label>
                        <Input
                          id="numero_interno"
                          value={novoProcesso.numero_interno || ''}
                          onChange={(e) => setNovoProcesso(prev => ({ ...prev, numero_interno: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="classe_processual">Classe Processual</Label>
                        <Input
                          id="classe_processual"
                          value={novoProcesso.classe_processual || ''}
                          onChange={(e) => setNovoProcesso(prev => ({ ...prev, classe_processual: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="assunto_principal">Assunto Principal</Label>
                        <Input
                          id="assunto_principal"
                          value={novoProcesso.assunto_principal || ''}
                          onChange={(e) => setNovoProcesso(prev => ({ ...prev, assunto_principal: e.target.value }))}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="tribunal" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tribunal_comarca">Tribunal/Comarca</Label>
                        <Input
                          id="tribunal_comarca"
                          value={novoProcesso.tribunal_comarca || ''}
                          onChange={(e) => setNovoProcesso(prev => ({ ...prev, tribunal_comarca: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="juiz_responsavel">Juiz Responsável</Label>
                        <Input
                          id="juiz_responsavel"
                          value={novoProcesso.juiz_responsavel || ''}
                          onChange={(e) => setNovoProcesso(prev => ({ ...prev, juiz_responsavel: e.target.value }))}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="partes" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="parte_contraria">Parte Contrária</Label>
                        <Input
                          id="parte_contraria"
                          value={novoProcesso.parte_contraria || ''}
                          onChange={(e) => setNovoProcesso(prev => ({ ...prev, parte_contraria: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cliente_tipo">Tipo do Cliente</Label>
                        <Select
                          value={novoProcesso.cliente_tipo || ''}
                          onValueChange={(value) => setNovoProcesso(prev => ({ ...prev, cliente_tipo: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="requerente">Requerente</SelectItem>
                            <SelectItem value="requerido">Requerido</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="financeiro" className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="valor_causa">Valor da Causa</Label>
                        <Input
                          id="valor_causa"
                          type="number"
                          value={novoProcesso.valor_causa || 0}
                          onChange={(e) => setNovoProcesso(prev => ({ ...prev, valor_causa: Number(e.target.value) }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="honorarios_contratuais">Honorários Contratuais</Label>
                        <Input
                          id="honorarios_contratuais"
                          type="number"
                          value={novoProcesso.honorarios_contratuais || 0}
                          onChange={(e) => setNovoProcesso(prev => ({ ...prev, honorarios_contratuais: Number(e.target.value) }))}
                        />
                      </div>
                      <div className="space-y-2 flex items-end">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="justica_gratuita"
                            checked={novoProcesso.justica_gratuita || false}
                            onCheckedChange={(checked) => setNovoProcesso(prev => ({ ...prev, justica_gratuita: checked }))}
                          />
                          <Label htmlFor="justica_gratuita">Justiça Gratuita</Label>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="prazos" className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="data_distribuicao">Data Distribuição</Label>
                        <Input
                          id="data_distribuicao"
                          type="date"
                          value={novoProcesso.data_distribuicao || ''}
                          onChange={(e) => setNovoProcesso(prev => ({ ...prev, data_distribuicao: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ultimo_prazo">Último Prazo</Label>
                        <Input
                          id="ultimo_prazo"
                          value={novoProcesso.ultimo_prazo || ''}
                          onChange={(e) => setNovoProcesso(prev => ({ ...prev, ultimo_prazo: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="proxima_audiencia">Próxima Audiência</Label>
                        <Input
                          id="proxima_audiencia"
                          type="datetime-local"
                          value={novoProcesso.proxima_audiencia || ''}
                          onChange={(e) => setNovoProcesso(prev => ({ ...prev, proxima_audiencia: e.target.value }))}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="outros" className="space-y-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="resumo_caso">Resumo do Caso</Label>
                        <Textarea
                          id="resumo_caso"
                          value={novoProcesso.resumo_caso || ''}
                          onChange={(e) => setNovoProcesso(prev => ({ ...prev, resumo_caso: e.target.value }))}
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="observacoes">Observações</Label>
                        <Textarea
                          id="observacoes"
                          value={novoProcesso.observacoes || ''}
                          onChange={(e) => setNovoProcesso(prev => ({ ...prev, observacoes: e.target.value }))}
                          rows={3}
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

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
