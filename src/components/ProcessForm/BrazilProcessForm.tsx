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

interface BrazilProcessFormProps {
  processo: Partial<Processo>;
  onChange: (field: keyof Processo, value: any) => void;
}


const assuntosPorClasse: Record<string, { value: string; label: string }[]> = {
  '801': [
    { value: '1146', label: 'Usucapião Extraordinária' },
    { value: '1147', label: 'Usucapião Ordinária' },
  ],
  '843': [
    { value: '1118', label: 'Posse' },
    { value: '1150', label: 'Esbulho Possessório' },
  ],
  '46': [
    { value: '953', label: 'Pensão Alimentícia' },
    { value: '954', label: 'Prestação de Alimentos' },
  ],
  '72': [
    { value: '965', label: 'Separação Litigiosa' },
    { value: '966', label: 'Divórcio Contencioso' },
  ],
  '875': [
    { value: '1178', label: 'Descumprimento Contratual' },
    { value: '1179', label: 'Rescisão por Inadimplemento' },
  ],
};

const BrazilProcessForm: React.FC<BrazilProcessFormProps> = ({ processo, onChange }) => {
  const assuntosCompatíveis = processo.classe_processual ? assuntosPorClasse[processo.classe_processual] || [] : [];

  return (
    <Tabs defaultValue="identificacao" className="w-full">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="identificacao" className="gap-2">
          <FileText className="h-4 w-4" />
          Identificação
        </TabsTrigger>
        <TabsTrigger value="tribunal" className="gap-2">
          <Scale className="h-4 w-4" />
          Vara/Tribunal
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
            <Label htmlFor="numero_cnj">Número CNJ (formato: 0000000-00.0000.0.00.0000)</Label>
            <ReactInputMask
              mask="9999999-99.9999.9.99.9999"
              value={processo.numero_cnj || ''}
              onChange={(e) => onChange('numero_cnj', e.target.value)}
              placeholder="0000000-00.0000.0.00.0000"
              id="numero_cnj"
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
            <Label htmlFor="classe_processual">Classe Processual</Label>
            <Select
              value={processo.classe_processual || ''}
              onValueChange={(value) => onChange('classe_processual', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a classe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="46 - Ação de Alimentos">Ação de Alimentos</SelectItem>
                <SelectItem value="29 - Ação de Cobrança">Ação de Cobrança</SelectItem>
                <SelectItem value="107 - Cobrança (Aluguel, IPTU etc.)">Cobrança (Aluguel, IPTU etc.)</SelectItem>
                <SelectItem value="72 - Divórcio Litigioso">Divórcio Litigioso</SelectItem>
                <SelectItem value="73 - Divórcio Consensual">Divórcio Consensual</SelectItem>
                <SelectItem value="102 - Despejo">Despejo</SelectItem>
                <SelectItem value="353 - Execução de Título Extrajudicial">Execução de Título Extrajudicial</SelectItem>
                <SelectItem value="1040 - Extinção de Condomínio">Extinção de Condomínio</SelectItem>
                <SelectItem value="10162 - Falência">Falência</SelectItem>
                <SelectItem value="54 - Guarda">Guarda</SelectItem>
                <SelectItem value="392 - Interdição">Interdição</SelectItem>
                <SelectItem value="252 - Investigação de Paternidade">Investigação de Paternidade</SelectItem>
                <SelectItem value="844 - Manutenção de Posse">Manutenção de Posse</SelectItem>
                <SelectItem value="1123 - Ação Monitória">Ação Monitória</SelectItem>
                <SelectItem value="998 - Nunciação de Obra Nova">Nunciação de Obra Nova</SelectItem>
                <SelectItem value="324 - Regulamentação de Visitas">Regulamentação de Visitas</SelectItem>
                <SelectItem value="843 - Reintegração de Posse">Reintegração de Posse</SelectItem>
                <SelectItem value="875 - Rescisão Contratual">Rescisão Contratual</SelectItem>
                <SelectItem value="10161 - Recuperação Judicial">Recuperação Judicial</SelectItem>
                <SelectItem value="47 - Revisão de Alimentos">Revisão de Alimentos</SelectItem>
                <SelectItem value="801 - Usucapião">Usucapião</SelectItem>
                <SelectItem value="233 - Alvará Judicial">Alvará Judicial</SelectItem>
              </SelectContent>


            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="codigo_assunto_cnj">Código do Assunto CNJ</Label>
            <Select
              value={processo.codigo_assunto_cnj || ''}
              onValueChange={(value) => onChange('codigo_assunto_cnj', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o assunto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1010">Direito Civil - Geral</SelectItem>
                <SelectItem value="1210">Cobrança</SelectItem>  {/* Aqui é o código correto para cobrança */}
                <SelectItem value="1020">Direito Penal</SelectItem>
                <SelectItem value="1030">Direito do Trabalho</SelectItem>
                <SelectItem value="1040">Direito Tributário</SelectItem>
                <SelectItem value="1050">Direito Administrativo</SelectItem>
                <SelectItem value="1021">Crimes contra a Pessoa</SelectItem>
                <SelectItem value="1031">Relações de Trabalho</SelectItem>
                <SelectItem value="1211">Cobrança de Aluguéis</SelectItem>
                <SelectItem value="1230">Contratos</SelectItem>
              </SelectContent>
            </Select>
          </div>

        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="grau_sigilo">Grau de Sigilo</Label>
            <Select
              value={processo.grau_sigilo || ''}
              onValueChange={(value) => onChange('grau_sigilo', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="publico">Público</SelectItem>
                <SelectItem value="segredo_justica">Segredo de Justiça</SelectItem>
                <SelectItem value="tramitacao_reservada">Tramitação Reservada</SelectItem>
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
                <SelectItem value="1_grau">1º Grau</SelectItem>
                <SelectItem value="2_grau">2º Grau</SelectItem>
                <SelectItem value="stj">STJ</SelectItem>
                <SelectItem value="stf">STF</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 flex items-end">
            <div className="flex items-center space-x-2">
              <Switch
                id="jef"
                checked={processo.jef || false}
                onCheckedChange={(checked) => onChange('jef', checked)}
              />
              <Label htmlFor="jef">JEF (Juizado Especial Federal)</Label>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="tribunal" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tribunal_comarca">Vara/Tribunal</Label>
            <Input
              id="tribunal_comarca"
              value={processo.tribunal_comarca || ''}
              onChange={(e) => onChange('tribunal_comarca', e.target.value)}
              placeholder="Ex: 1ª Vara Federal de São Paulo"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="circunscricao">Comarca</Label>
            <Input
              id="circunscricao"
              value={processo.circunscricao || ''}
              onChange={(e) => onChange('circunscricao', e.target.value)}
              placeholder="Ex: São Paulo/SP"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="juiz_responsavel">Juiz(a) Responsável</Label>
            <Input
              id="juiz_responsavel"
              value={processo.juiz_responsavel || ''}
              onChange={(e) => onChange('juiz_responsavel', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="secretaria_cartorio">Cartório/Secretaria</Label>
            <Input
              id="secretaria_cartorio"
              value={processo.secretaria_cartorio || ''}
              onChange={(e) => onChange('secretaria_cartorio', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sistema_eletronico">Sistema Processual</Label>
            <Select
              value={processo.sistema_eletronico || ''}
              onValueChange={(value) => onChange('sistema_eletronico', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pje">PJe</SelectItem>
                <SelectItem value="projudi">PROJUDI</SelectItem>
                <SelectItem value="fisico">Físico</SelectItem>
                <SelectItem value="esaj">ESAJ</SelectItem>
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
                <SelectItem value="autor">Autor</SelectItem>
                <SelectItem value="reu">Réu</SelectItem>
                <SelectItem value="requerente">Requerente</SelectItem>
                <SelectItem value="requerido">Requerido</SelectItem>
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
          <div className="space-y-2 flex items-end">
            <div className="flex items-center space-x-2">
              <Switch
                id="ministerio_publico"
                checked={processo.ministerio_publico || false}
                onCheckedChange={(checked) => onChange('ministerio_publico', checked)}
              />
              <Label htmlFor="ministerio_publico">Ministério Público</Label>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="financeiro" className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="valor_causa">Valor da Causa (R$)</Label>
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
            <Label htmlFor="honorarios_contratuais">Honorários Contratuais (R$)</Label>
            <Input
              id="honorarios_contratuais"
              type="number"
              step="0.01"
              value={processo.honorarios_contratuais || 0}
              onChange={(e) => onChange('honorarios_contratuais', Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="custas_pagas">Custas Pagas (R$)</Label>
            <Input
              id="custas_pagas"
              type="number"
              step="0.01"
              value={processo.custas_pagas || 0}
              onChange={(e) => onChange('custas_pagas', Number(e.target.value))}
            />
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Switch
              id="justica_gratuita"
              checked={processo.justica_gratuita || false}
              onCheckedChange={(checked) => onChange('justica_gratuita', checked)}
            />
            <Label htmlFor="justica_gratuita">Justiça Gratuita</Label>
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
              value={processo.data_distribuicao || ''}
              onChange={(e) => onChange('data_distribuicao', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="data_limite_prazo">Data Limite para Prazo</Label>
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

export default BrazilProcessForm;