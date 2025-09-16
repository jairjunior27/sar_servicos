"use client"
import { ReactNode, useState } from "react";
import { ReciboContext } from "./reciboContext";

export const ReciboProvider = ({ children }: { children: ReactNode }) => {
  const [valor, setValor] = useState<number>(0);
  const [importancia, setImportancia] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [referencia, setReferencia] = useState("");
  const [data, setData] = useState("");
  const [selecionado, setSelecionado] = useState<string | null>(null);
  return (
    <ReciboContext.Provider
      value={{
        data,
        empresa,
        importancia,
        referencia,
        setData,
        setEmpresa,
        setImportancia,
        setReferencia,
        setValor,
        valor,
        selecionado,
        setSelecionado,
      }}
    >
      {children}
    </ReciboContext.Provider>
  );
};
