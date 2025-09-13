"use client";

import { ReactNode, useEffect, useState } from "react";
import { OrcamentoContext } from "./orcamentoContext";
import { orcamentoType } from "@/type/orcamento";
import { StorageOrcamento } from "@/util/storage";

export const OrcamentoProvider = ({ children }: { children: ReactNode }) => {
  const [nomecliente, setNomeCliente] = useState("");
  const [telefoneCliente, setTelefoneCliente] = useState("");

  const [orcamentoCliente, setOrcamentoCliente] = useState<orcamentoType[]>([]);
  const [servico, setServico] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valorServico, setValorServico] = useState<number>(0);
  const [valorDesconto, setValorDesconto] = useState<number>(0);
  const [quantidade, setQuantidade] = useState<number>(0);
  const [data, setData] = useState("");
  const anoAtual = new Date().getFullYear();

  const loadServicos = () => {
    const dados = StorageOrcamento.get();

    setOrcamentoCliente(dados);
  };
  useEffect(() => {
    const all = () => {
      loadServicos();
    };
    all();
  }, []);

  useEffect(() => {
    StorageOrcamento.set(orcamentoCliente);
  }, [orcamentoCliente]);

  const excluirItemServico = (id: string) => {
    StorageOrcamento.remove(id);
    loadServicos();
  };

  const addServicos = () => {
    const newServicos: orcamentoType = {
      id: crypto.randomUUID(),
      servico,
      descricao,
      valor: valorServico,
      quantidade,
      desconto: valorDesconto,

      total: valorServico * quantidade,
    };

    setOrcamentoCliente((prev) => [...prev, newServicos]);
    StorageOrcamento.set(orcamentoCliente);
  };
  return (
    <OrcamentoContext.Provider
      value={{
        data,
        descricao,
        quantidade,
        servico,
        setData,
        setDescricao,
        setQuantidade,
        setServico,
        setValorDesconto,
        setValorServico,
        valorDesconto,
        valorServico,
        nomecliente,
        telefoneCliente,
        setTelefoneCliente,
        setNomeCliente,
        orcamentoCliente,
        setOrcamentoCliente,
        anoAtual,
        addServicos,
        excluirItemServico,
      }}
    >
      {children}
    </OrcamentoContext.Provider>
  );
};
