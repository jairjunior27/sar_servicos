"use client";
import { AuthPrivate } from "@/components/authPivate";
import { ButtomItem } from "@/components/buttonItem";
import { Header } from "@/components/header";
import { InputItem } from "@/components/inputItem";
import { OrcamentoContext } from "@/contextProvider/orcamentoContext";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Page() {
  const orcamento = useContext(OrcamentoContext);
  const [msg, setMsg] = useState("");
  const route = useRouter();

  useEffect(() => {
    if (!msg) return;
    const time = setTimeout(() => setMsg(""), 2000);
    return () => clearTimeout(time);
  }, [msg]);

  if (!orcamento) return null;

  const handleClick = () => {
    if (
      !orcamento.servico ||
      !orcamento.descricao ||
      !orcamento.quantidade ||
      !orcamento.valorServico
    ) {
      return setMsg("Favor inserir todos os dados!");
    }
    orcamento.addServicos();

    orcamento.setServico("");
    orcamento.setDescricao("");
    orcamento.setValorServico(0);
    orcamento.setValorDesconto(0);
    orcamento.setQuantidade(0);

    route.push("/servicos/orcamento/step3");
  };

  return (
    <AuthPrivate>
      <div>
        <Header />
        <div className="max-w-4xl m-auto mt-20">
          <div className="mx-4">
            <InputItem
              className="bg-slate-900 p-2 rounded text-gray-200 mb-5"
              placeholder="Digite o Serviço"
              value={orcamento.servico}
              onChange={(e) => orcamento.setServico(e.target.value)}
            />
            <InputItem
              className="bg-slate-900 p-2 rounded text-gray-200 mb-5"
              placeholder="Digite a descrição"
              value={orcamento.descricao}
              onChange={(e) => orcamento.setDescricao(e.target.value)}
            />
            <InputItem
              className="bg-slate-900 p-2 rounded text-gray-200 mb-5"
              placeholder="Digite valor R$ do serviço"
              value={
                orcamento.valorServico === 0
                  ? ""
                  : orcamento.valorServico.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
              }
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, "");
                const number = raw ? Number(raw) / 100 : 0;
                orcamento.setValorServico(number);
              }}
            />
            <InputItem
              className="bg-slate-900 p-2 rounded text-gray-200 mb-5"
              placeholder="Digite valor R$ do desconto"
              value={
                orcamento.valorDesconto === null
                  ? ""
                  : orcamento.valorDesconto.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
              }
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, "");
                const number = raw ? Number(raw) / 100 : null;
                number && orcamento.setValorDesconto(number);
              }}
            />

            <InputItem
              type="number"
              className="bg-slate-900 p-2 rounded text-gray-200 mb-5"
              placeholder="Digite a quantidade"
              value={orcamento.quantidade === 0 ? "" : orcamento.quantidade}
              onChange={(e) => orcamento.setQuantidade(Number(e.target.value))}
            />

            {msg && (
              <span className="flex items-center justify-center mt-2 text-red-500">
                {msg}
              </span>
            )}
            <ButtomItem
              className="text-center font-bold bg-orange-300 p-2 mt-10 rounded cursor-pointer"
              label="voltar"
              onClick={() => route.replace("/servicos")}
            />
            <ButtomItem
              className="text-center font-bold bg-yellow-500 p-2 mt-10 rounded cursor-pointer"
              label="Adicionar"
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </AuthPrivate>
  );
}
