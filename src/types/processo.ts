export interface Processo {
  id: number;
  anna_luiza_cliente_id: number;
  
  // 1. Identificação do Processo
  numero_cnj: string;
  numero_interno: string;
  classe_processual: string;
  assunto_principal: string;
  tipo_processo: string;
  numero_processo: string;
  forma_processo: string; // Portugal: urgente, sumário, ordinário
  
  // 2. Informações do Tribunal/Instância
  tribunal_comarca: string;
  circunscricao: string;
  juiz_responsavel: string;
  instancia: string;
  secretaria_cartorio: string;
  
  // 3. Partes do Processo
  cliente_tipo: string; // requerente/requerido
  parte_contraria: string;
  representantes_legais: string;
  terceiros_intervenientes: string;
  ministerio_publico: boolean;
  
  // 4. Valores e Aspectos Financeiros
  valor_causa: number;
  honorarios_contratuais: number;
  honorarios_exito: number;
  custas_pagas: number;
  custas_abertas: number;
  depositos_judiciais: number;
  justica_gratuita: boolean;
  
  // 5. Prazos e Datas Críticas
  data_distribuicao: string;
  data_inicio: string;
  ultimo_prazo: string;
  data_limite_prazo: string;
  proxima_audiencia: string;
  data_sentenca: string;
  prazo_recursal: string;
  data_prescricao: string;
  data_prevista_conclusao: string;
  
  // 6. Status e Movimentação
  fase_processual: string;
  ultima_movimentacao: string;
  status_processo: string;
  recursos_pendentes: string;
  execucao_cumprimento: string;
  
  // 7. Documentação e Arquivo
  peticao_inicial: boolean;
  principais_documentos: string;
  localizacao_fisica: string;
  documentos_digitalizados: boolean;
  procuracoes_validas: boolean;
  documentos_necessarios: string;
  
  // 8. Área de Atuação e Especialização
  area_direito: string;
  subarea_especifica: string;
  complexidade_caso: string;
  estrategia_processual: string;
  
  // 9. Responsabilidades e Equipe
  responsavel: string;
  advogado_assistente: string;
  paralegal_designado: string;
  correspondente_local: string;
  
  // 10. Observações e Alertas
  resumo_caso: string;
  observacoes: string;
  alertas_especiais: string;
  historico_decisoes: string;
  
  // 11. Campos Específicos por País
  pais: string; // Brasil/Portugal
  codigo_assunto_cnj: string; // Brasil
  grau_sigilo: string; // Brasil
  jef: boolean; // Brasil - Juizado Especial Federal
  sistema_eletronico: string; // Brasil: PJe/PROJUDI, Portugal: CITIUS
  tipo_procedimento: string; // Portugal: declarativo, executivo, cautelar
  regime_custas: string; // Portugal
  apoio_judiciario: boolean; // Portugal
  
  // 12. Indicadores de Performance
  tempo_tramitacao: number;
  taxa_sucesso_prevista: number;
  risco_processual: string;
  probabilidade_exito: number;
  urgencia_caso: string;
  
  created_at: string;
}

export interface Cliente {
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