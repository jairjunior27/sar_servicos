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

  const handleCpfContratante = (e: ChangeEvent<HTMLInputElement>) => {
    const linha = e.target.value;
    const digitos = linha.replace(/\D/g, "").slice(0, 11);

    const digitoFormatado = digitos
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    contrato?.setCpfContratante(digitoFormatado);
  };

  const handleRg = (e: ChangeEvent<HTMLInputElement>) => {
    const linha = e.target.value.replace(/\D/g, "");
    const parte1 = linha.slice(0, -2);
    const parte2 = linha.slice(-2);
    const formatado = `${parte1}-${parte2}`;
    contrato?.setRgContratante(formatado);
  };
  const handleClick = () => {
    if (
      !contrato?.nomeContratante ||
      !contrato.cpfContratante ||
      !contrato.rgContratante ||
      !contrato.obrigacaoContratante
    ) {
      return setMsg("Favor preencher todos os campos!");
    }
    route.push("/servicos/contrato/servico");
  };
  if (!contrato) return null;

  return (
    <AuthPrivate>
      <div className="">
        <Header />
        <div className="m-6">
          <div className="m-auto max-w-4xl">
            <h2 className="text-slate-800 font-bold text-xl text-center mb-10">
              Dados do Contratante
            </h2>
            <p className="font-semibold mb-5">Etapa 2/3</p>
            <InputItem
              className="bg-slate-900 p-3 text-gray-200 rounded mb-7"
              onChange={(e) => contrato.setNomeContratante(e.target.value)}
              placeholder="Digite o nome do Contratante"
              value={contrato.nomeContratante}
            />
            <InputItem
              className="bg-slate-900 p-3 text-gray-200 rounded mb-7"
              onChange={handleCpfContratante}
              placeholder="Digite o cpf do Contratante"
              value={contrato.cpfContratante}
            />
            <InputItem
              className="bg-slate-900 p-3 text-gray-200 rounded mb-7"
              onChange={handleRg}
              placeholder="Digite o rg do Contratante"
              value={contrato.rgContratante}
            />
            <InputItem
              className="bg-slate-900 p-3 text-gray-200 rounded mb-7 text-sm"
              onChange={(e) => contrato.setObrigacaoContratante(e.target.value)}
              placeholder="Digite a obrigação do contratante"
              value={contrato.obrigacaoContratante}
            />
            {msg && <p className="text-center text-red-500">{msg}</p>}
            <ButtomItem
              className="text-center bg-orange-300 p-3 rounded mt-20 cursor-pointer"
              label="Proximo"
              onClick={handleClick}
            />
            <ButtomItem
              className="text-center bg-yellow-300 p-3 rounded mt-10 cursor-pointer"
              label="Voltar"
              onClick={() => route.replace("/servicos/contrato/contratado")}
            />
          </div>
        </div>
      </div>
    </AuthPrivate>
  );
}
