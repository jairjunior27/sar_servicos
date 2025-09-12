"use client";
import { ButtomItem } from "@/components/buttonItem";
import { Header } from "@/components/header";
import { InputItem } from "@/components/inputItem";
import { OrcamentoContext } from "@/contextProvider/orcamentoContext";
import { formatarMoeda } from "@/util/formatMoeda";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Page() {
  const orcamento = useContext(OrcamentoContext);
  const [selecionado, setSelecionado] = useState<string | null>(null);
  const [ultimo, setUltimo] = useState(0);
  const route = useRouter();


  useEffect(() => {
    const dados = localStorage.getItem("ultimo");
    if (dados) {
    setUltimo(Number(dados) + 1);
  } else {
    setUltimo(1);
  }
  }, []);

  useEffect(() => {
    if (ultimo > 0) {
    localStorage.setItem("ultimo", ultimo.toString());
  }
  }, [ultimo]);
  if (!orcamento) return null;
  const valorGeral = orcamento.orcamentoCliente.reduce(
    (acc, item) => (acc += item.valor),
    0
  );
  const quantidadeTotal = orcamento.orcamentoCliente.reduce(
    (acc, item) => (acc += item.quantidade),
    0
  );
  const descontoTotal = orcamento.orcamentoCliente.reduce(
    (acc, item) => (acc += item.desconto),
    0
  );
  const TotalGeral = orcamento.orcamentoCliente.reduce(
    (acc, item) => (acc += item.total),
    0
  );

  const handleClickVoltar = () => {
    route.replace("/servicos/orcamento/step2");
  };
  const handleClick = () => {};
  return (
    <div>
      <Header />

      <div className=" max-w-4xl m-auto">
        <div className="mx-4">
          <div className="border-b ">
            <p className="text-sm text-gray-700">radiovisao@ig.com.br</p>
            <p className="mb-2 text-sm text-gray-700">
              sistemaalternativo72@gmail.com
            </p>
          </div>
          <h2 className="text-center font-bold my-4 text-sm md:text-xl">
            Orçamento Nº {ultimo < 100 ? `00${ultimo}` : ultimo} |{" "}
            {orcamento.anoAtual}
          </h2>

          <div className="dados do Cliente">
            <p className="text-gray-700 font-bold text-xs md:text-lg">
              Dados do Cliente:
            </p>
            <p className="text-sm mt-2 font-semibold">
              {orcamento.nomecliente}
            </p>
            <p className="text-sm mb-4 font-semibold">
              {orcamento.telefoneCliente}
            </p>
          </div>

          <div className="overflow-x-auto flex">
            <table className="min-w-full">
              <thead className="border border-gray-300 text-sm">
                <tr>
                  <th className="border px-2 py-1">Serviço</th>
                  <th className="border px-2 py-1 ">Descrição</th>
                  <th className="border px-2 py-1 ">Valor</th>
                  <th className="border px-2 py-1 ">Quantidade</th>
                  <th className="border px-2 py-1 ">Desconto</th>
                  <th className="border px-2 py-1 ">Total</th>
                </tr>
              </thead>
              <tbody className="text-xs text-center">
                {orcamento.orcamentoCliente.map((item) => (
                  <tr key={item.id}>
                    <td>{item.servico}</td>
                    <td>{item.descricao}</td>
                    <td>{formatarMoeda(item.valor)}</td>
                    <td>{item.quantidade}</td>
                    <td>{formatarMoeda(item.desconto)}</td>
                    <td>{formatarMoeda(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="overflow-x-auto flex mt-20">
            <table className="min-w-full text-center">
              <thead className="border border-gray-300 text-xs">
                <tr>
                  <th className="border px-2 py-1">Valor Total</th>
                  <th className="border px-2 py-1">Quantidade Total</th>
                  <th className="border px-2 py-1">Desconto Total</th>
                  <th className="border px-2 py-1">Total Geral</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                <tr>
                  <td>{formatarMoeda(valorGeral)}</td>
                  <td>{quantidadeTotal}</td>
                  <td>{formatarMoeda(descontoTotal)}</td>
                  <td>{formatarMoeda(TotalGeral)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-10">
            <div className="flex justify-between mb-6">
              {["Pix", "Dinheiro"].map((item, index) => (
                <div className="flex" key={index}>
                  <InputItem
                    className=""
                    type="checkbox"
                    onChange={() => setSelecionado(item)}
                    checked={item === selecionado}
                  />
                  <span className="ml-2">{item}</span>
                </div>
              ))}
            </div>
            <InputItem
              type="date"
              className="bg-orange-200 p-2 rounded text-gray-700 mb-5"
              value={orcamento.data}
              onChange={(e) => orcamento.setData(e.target.value)}
            />
          </div>
          <ButtomItem
            className="text-center font-bold bg-orange-300 p-2 mt-10 rounded"
            label="Voltar"
            onClick={handleClickVoltar}
          />
          <ButtomItem
            className="text-center font-bold bg-green-500 p-2 mt-6 rounded"
            label="Adcionar"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
}
