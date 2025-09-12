import { orcamentoType } from "@/type/orcamento";
import { createContext } from "react";

interface orcamentType {
  nomecliente: string;
  setNomeCliente: (cliente: string) => void;
  telefoneCliente: string;
  setTelefoneCliente: (telefone: string) => void;

  orcamentoCliente: orcamentoType[];
  setOrcamentoCliente: (orcamento: orcamentoType[]) => void;
  servico: string;
  setServico: (value: string) => void;
  descricao: string;
  setDescricao: (value: string) => void;
  valorServico: number;
  setValorServico: (value: number) => void;
  valorDesconto: number;
  setValorDesconto: (value: number) => void;
  quantidade: number;
  setQuantidade: (value: number) => void;
  data: string;
  setData: (value: string) => void;
  anoAtual: number | string;
  addServicos: () => void;
}

export const OrcamentoContext = createContext<orcamentType | undefined>(
  undefined
);
