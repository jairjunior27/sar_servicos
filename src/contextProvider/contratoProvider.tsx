"use client";
import { ReactNode, useState } from "react";
import { ContratoContext } from "./contratoContext";

export const ContratoProvider = ({ children }: { children: ReactNode }) => {
  const [nomeContratado, setNomeContratado] = useState("");
  const [cpfContratado, setCpfContratado] = useState("");
  const [rgContratado, setRgContratado] = useState("");
  const [nomeContratante, setNomeContratante] = useState("");
  const [cpfContratante, setCpfContratante] = useState("");
  const [rgContratante, setRgContratante] = useState("");
  const [obrigacaoContratante, setObrigacaoContratante] = useState("");
  const [obrigacaoContratado, setObrigacaoContratado] = useState("");
  const [descricaoServicoPrestado, setDescricaoServicoPrestado] = useState("");
  const [servicoPrestado, setServicoPrestado] = useState("");
  const [pagamento, setPagamento] = useState("");
  const [data, setData] = useState("");

  const [prazo, setPrazo] = useState("");

  const [rescisao, setRescisao] = useState("");
  return (
    <ContratoContext.Provider
      value={{
        cpfContratado,
        setCpfContratado,
        cpfContratante,
        descricaoServicoPrestado,
        data,
        setData,
        nomeContratado,
        nomeContratante,
        obrigacaoContratado,
        obrigacaoContratante,
        pagamento,
        setPagamento,
        prazo,
        rescisao,
        rgContratado,
        rgContratante,
        servicoPrestado,
        setCpfContratante,
        setDescricaoServicoPrestado,

        setNomeContratado,
        setNomeContratante,
        setObrigacaoContratado,
        setObrigacaoContratante,

        setPrazo,
        setRescisao,
        setRgContratado,
        setRgContratante,
        setServicoPrestado,
      }}
    >
      {children}
    </ContratoContext.Provider>
  );
};
