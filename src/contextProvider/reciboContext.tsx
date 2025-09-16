import { createContext } from "react";

interface reciboContextType {
  valor: number
  setValor: (value: number) => void;
  importancia: string;
  setImportancia: (importancia: string) => void;
  empresa: string;
  setEmpresa: (empresa: string) => void;
  referencia: string;
  setReferencia: (referencia: string) => void;
  data: string;
  setData: (d: string) => void;
  selecionado: string | null
  setSelecionado: (selecionado: string) => void 
   selecionadoLogo: string | null
  setSelecionadoLogo: (selecionado: string) => void 
}

export const ReciboContext = createContext<reciboContextType | undefined>(
  undefined
);
