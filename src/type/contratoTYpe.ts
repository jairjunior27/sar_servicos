export type ContratoType = {
  nomeContratado: string;
  cpfContratado: string; // <-- aqui está certo
  rgContratado: string;
  nomeContratante: string;
  cpfContratante: string;
  rgContratante: string;
  obrigacaoContratado: string;
  obrigacaoContratante: string;
  servico: string;
  descricao: string;
  prazo: string;
  rescisao: string;
  pagamento: string;
  tipoDePagamento: string | null;
  data: string;
  logo: string | null;
};
