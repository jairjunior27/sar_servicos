"use client";
import { AuthPrivate } from "@/components/authPivate";
import { ButtomItem } from "@/components/buttonItem";
import { Header } from "@/components/header";
import { InputItem } from "@/components/inputItem";
import { ContratoContext } from "@/contextProvider/contratoContext";
import { useRouter } from "next/navigation";
import { ChangeEvent, useContext, useEffect, useState } from "react";

export default function Page() {
  const contrato = useContext(ContratoContext);
  const route = useRouter();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!msg) return;
    const time = setTimeout(() => {
      setMsg("");
    }, 2000);
    return () => clearTimeout(time);
  }, [msg]);

  const handleCpfContratado = (e: ChangeEvent<HTMLInputElement>) => {
    const linha = e.target.value;
    const digitos = linha.replace(/\D/g, "").slice(0, 11);

    const digitoFormatado = digitos
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    contrato?.setCpfContratado(digitoFormatado);
  };

  const handleRg = (e: ChangeEvent<HTMLInputElement>) => {
    const linha = e.target.value.replace(/\D/g, "");
    const parte1 = linha.slice(0, -2);
    const parte2 = linha.slice(-2);
    const formatado = `${parte1}-${parte2}`;
    contrato?.setRgContratado(formatado);
  };
  const handleClick = () => {
    if (
      !contrato?.nomeContratado ||
      !contrato.cpfContratado ||
      !contrato.rgContratado || !contrato.obrigacaoContratado
    ) {
      return setMsg("Favor preencher todos os campos!");
    }
    route.push("/servicos/contrato/contratante");
  };
  if (!contrato) return null;

  return (
    <AuthPrivate>
    <div className="">
      <Header />
      <div className="m-6">
        <div className="m-auto max-w-4xl">
          <h2 className="text-slate-800 font-bold text-xl text-center mb-10">
            Dados do Contratado
          </h2>
          <p className="font-semibold mb-5">Etapa 1/3</p>
          <InputItem
            className="bg-slate-900 p-3 text-gray-200 rounded mb-7"
            onChange={(e) => contrato.setNomeContratado(e.target.value)}
            placeholder="Digite o nome do Contratado"
            value={contrato.nomeContratado}
          />
          <InputItem
            className="bg-slate-900 p-3 text-gray-200 rounded mb-7"
            onChange={handleCpfContratado}
            placeholder="Digite o cpf do Contratado"
            value={contrato.cpfContratado}
          />
          <InputItem
            className="bg-slate-900 p-3 text-gray-200 rounded mb-7"
            onChange={handleRg}
            placeholder="Digite o rg do Contratado"
            value={contrato.rgContratado}
          />
          <InputItem
            className="bg-slate-900 p-3 text-gray-200 rounded mb-7"
            onChange={(e) => contrato.setObrigacaoContratado(e.target.value)}
            placeholder="Digite a obrigação do contratado"
            value={contrato.obrigacaoContratado}
          />
          {msg && <p className="text-center text-red-500">{msg}</p>}
          <ButtomItem
            className="text-center bg-orange-300 p-3 rounded mt-20 cursor-pointer"
            label="Proximo"
            onClick={handleClick}
          />

          <ButtomItem className="bg-yellow-300 p-3 rounded mt-10 text-center font-bold cursor-pointer"
           label="Voltar"
           onClick={()=> route.push("/servicos")}
           />
        
        </div>
      </div>
    </div>
    </AuthPrivate>
  );
}
