import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Scale, Users, DollarSign, Calendar, Settings } from 'lucide-react';
import { Processo } from '@/types/processo';
import ReactInputMask from 'react-input-mask';

interface PortugalProcessFormProps {
  processo: Partial<Processo>;
  onChange: (field: keyof Processo, value: any) => void;
}

const PortugalProcessForm: React.FC<PortugalProcessFormProps> = ({ processo, onChange }) => {
  return (
    <Tabs defaultValue="identificacao" className="w-full">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="identificacao" className="gap-2">
          <FileText className="h-4 w-4" />
          Identificação
        </TabsTrigger>
        <TabsTrigger value="tribunal" className="gap-2">
          <Scale className="h-4 w-4" />
          Tribunal/Juízo
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
            <Label htmlFor="numero_processo">Número do Processo no Tribunal</Label>
            <ReactInputMask
              mask="999/99.9aaaaa.a9"
              value={processo.numero_processo || ''}
              onChange={(e) => onChange('numero_processo', e.target.value.toUpperCase())}
              placeholder="Ex: 123/20.0TBPRT.P1"
              id="numero_processo"
              maskChar={null}
            >
              {(inputProps: any) => <Input {...inputProps} />}
            </ReactInputMask>
          </div>
          <div className="space-y-2">
            <Label htmlFor="numero_interno">Número Interno</Label>
            <Input
              id="numero_interno"
              value={processo.numero_interno || ''}
              onChange={(e) => onChange('numero_interno', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tipo_procedimento">Tipo de Ação/Procedimento</Label>
            <Select
              value={processo.tipo_procedimento || ''}
              onValueChange={(value) => onChange('tipo_procedimento', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="declarativo">Declarativo</SelectItem>
                <SelectItem value="executivo">Executivo</SelectItem>
                <SelectItem value="cautelar">Cautelar</SelectItem>
                <SelectItem value="especial">Especial</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="forma_processo">Forma do Processo</Label>
            <Select
              value={processo.forma_processo || ''}
              onValueChange={(value) => onChange('forma_processo', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ordinario">Ordinário</SelectItem>
                <SelectItem value="sumario">Sumário</SelectItem>
                <SelectItem value="sumarissimo">Sumaríssimo</SelectItem>
                <SelectItem value="urgente">Urgente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="area_direito">Área de Competência</Label>
            <Select
              value={processo.area_direito || ''}
              onValueChange={(value) => onChange('area_direito', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="civil">Direito Civil</SelectItem>
                <SelectItem value="comercial">Direito Comercial</SelectItem>
                <SelectItem value="trabalho">Direito do Trabalho</SelectItem>
                <SelectItem value="familia">Direito da Família</SelectItem>
                <SelectItem value="penal">Direito Penal</SelectItem>
                <SelectItem value="administrativo">Direito Administrativo</SelectItem>
                <SelectItem value="administrativo">Direito Imigratório</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="instancia">Instância</Label>
            <Select
              value={processo.instancia || ''}
              onValueChange={(value) => onChange('instancia', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1_instancia">1ª Instância</SelectItem>
                <SelectItem value="relacao">Relação</SelectItem>
                <SelectItem value="supremo">Supremo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="regime_custas">Regime de Custas</Label>
            <Select
              value={processo.regime_custas || ''}
              onValueChange={(value) => onChange('regime_custas', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="isento">Isento</SelectItem>
                <SelectItem value="reduzido">Reduzido</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="tribunal" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tribunal_comarca">Tribunal/Juízo</Label>
            <Input
              id="tribunal_comarca"
              value={processo.tribunal_comarca || ''}
              onChange={(e) => onChange('tribunal_comarca', e.target.value)}
              placeholder="Ex: Tribunal de Comarca do Porto"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="circunscricao">Circunscrição Judicial</Label>
            <Input
              id="circunscricao"
              value={processo.circunscricao || ''}
              onChange={(e) => onChange('circunscricao', e.target.value)}
              placeholder="Ex: Porto"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="juiz_responsavel">Juiz de Direito</Label>
            <Input
              id="juiz_responsavel"
              value={processo.juiz_responsavel || ''}
              onChange={(e) => onChange('juiz_responsavel', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="secretaria_cartorio">Secretaria Judicial</Label>
            <Input
              id="secretaria_cartorio"
              value={processo.secretaria_cartorio || ''}
              onChange={(e) => onChange('secretaria_cartorio', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sistema_eletronico">Plataforma</Label>
            <Select
              value={processo.sistema_eletronico || ''}
              onValueChange={(value) => onChange('sistema_eletronico', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="citius">CITIUS</SelectItem>
                <SelectItem value="fisico">Físico</SelectItem>
                <SelectItem value="eletronico">Electrónico</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="partes" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="parte_contraria">Parte Contrária</Label>
            <Input
              id="parte_contraria"
              value={processo.parte_contraria || ''}
              onChange={(e) => onChange('parte_contraria', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cliente_tipo">Tipo do Cliente</Label>
            <Select
              value={processo.cliente_tipo || ''}
              onValueChange={(value) => onChange('cliente_tipo', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="requerente">Requerente</SelectItem>
                <SelectItem value="requerido">Requerido</SelectItem>
                <SelectItem value="demandante">Demandante</SelectItem>
                <SelectItem value="demandado">Demandado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="representantes_legais">Representantes Legais</Label>
            <Input
              id="representantes_legais"
              value={processo.representantes_legais || ''}
              onChange={(e) => onChange('representantes_legais', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="terceiros_intervenientes">Terceiros Intervenientes</Label>
            <Input
              id="terceiros_intervenientes"
              value={processo.terceiros_intervenientes || ''}
              onChange={(e) => onChange('terceiros_intervenientes', e.target.value)}
            />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="financeiro" className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="valor_causa">Valor da Ação (€)</Label>
            <Input
              id="valor_causa"
              type="number"
              step="0.01"
              value={processo.valor_causa || 0}
              onChange={(e) => onChange('valor_causa', Number(e.target.value))}
              placeholder="0,00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="honorarios_contratuais">Honorários Contratuais (€)</Label>
            <Input
              id="honorarios_contratuais"
              type="number"
              step="0.01"
              value={processo.honorarios_contratuais || 0}
              onChange={(e) => onChange('honorarios_contratuais', Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="custas_pagas">Custas Pagas (€)</Label>
            <Input
              id="custas_pagas"
              type="number"
              step="0.01"
              value={processo.custas_pagas || 0}
              onChange={(e) => onChange('custas_pagas', Number(e.target.value))}
            />
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apoio_judiciario_tipo">Apoio Judiciário</Label>
            <Select
              value={processo.apoio_judiciario ? "sim" : "nao"}
              onValueChange={(value) => onChange('apoio_judiciario', value === "sim")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nao">Não Concedido</SelectItem>
                <SelectItem value="sim">Total</SelectItem>
                <SelectItem value="parcial">Parcial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="prazos" className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="data_distribuicao">Data de Entrada/Distribuição</Label>
            <Input
              id="data_distribuicao"
              type="date"
              value={processo.data_distribuicao || ''}
              onChange={(e) => onChange('data_distribuicao', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="data_limite_prazo">Data Limite para Recursos</Label>
            <Input
              id="data_limite_prazo"
              type="date"
              value={processo.data_limite_prazo || ''}
              onChange={(e) => onChange('data_limite_prazo', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="proxima_audiencia">Próxima Audiência</Label>
            <Input
              id="proxima_audiencia"
              type="datetime-local"
              value={processo.proxima_audiencia || ''}
              onChange={(e) => onChange('proxima_audiencia', e.target.value)}
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
              value={processo.resumo_caso || ''}
              onChange={(e) => onChange('resumo_caso', e.target.value)}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={processo.observacoes || ''}
              onChange={(e) => onChange('observacoes', e.target.value)}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="estrategia_processual">Estratégia Processual</Label>
            <Textarea
              id="estrategia_processual"
              value={processo.estrategia_processual || ''}
              onChange={(e) => onChange('estrategia_processual', e.target.value)}
              rows={2}
            />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default PortugalProcessForm;