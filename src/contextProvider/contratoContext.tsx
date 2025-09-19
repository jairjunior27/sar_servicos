import { createContext } from "react";

interface contratoTypeContext {
  nomeContratante: string;
  setNomeContratante: (s: string) => void;
  cpfContratante: string;
  setCpfContratante: (s: string) => void;
  rgContratante: string;
  setRgContratante: (s: string) => void;

  nomeContratado: string;
  setNomeContratado: (s: string) => void;
  cpfContratado: string;
  setCpfContratado: (s: string) => void;
  rgContratado: string;
  setRgContratado: (s: string) => void;

  servicoPrestado: string;
  setServicoPrestado: (s: string) => void;
  descricaoServicoPrestado: string;
  setDescricaoServicoPrestado: (s: string) => void;

  obrigacaoContratado: string;
  setObrigacaoContratado: (s: string) => void;
  obrigacaoContratante: string;
  setObrigacaoContratante: (s: string) => void;
  prazo: string;
  setPrazo: (s: string) => void;
  pagamento: string;
  setPagamento: (s: string) => void;
  rescisao: string;
  setRescisao: (s: string) => void;
  data: string;
  setData: (s: string) => void;
}

export const ContratoContext = createContext<contratoTypeContext | undefined>(
  undefined
);
