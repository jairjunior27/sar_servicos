"use client";

import { AuthPrivate } from "@/components/authPivate";
import { ButtomItem } from "@/components/buttonItem";
import { Header } from "@/components/header";
import { InputItem } from "@/components/inputItem";
import { OrcamentoPdf } from "@/components/orcamentoPdf";
import { OrcamentoContext } from "@/contextProvider/orcamentoContext";
import { UsuarioContext } from "@/contextProvider/userContext";
import { clientType } from "@/type/clienteType";
import { formatarMoeda } from "@/util/formatMoeda";
import { storageCliente } from "@/util/storage";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PDFDownloadLink } from "@react-pdf/renderer";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Page() {
  const orcamento = useContext(OrcamentoContext);
  const user = useContext(UsuarioContext);
  const [selecionadoFormaPagamento, setSelecionadoFormaPagamento] = useState<
    string | null
  >(null);
  const [selecionadoLogo, setSelecionadoLogo] = useState<string | null>(null);
  const [ultimo, setUltimo] = useState(0);
  const [msg, setMsg] = useState("");
  const [cliente, setCliente] = useState<clientType | null>(null);

  const route = useRouter();
  const hoje = new Date();
  const daqui30dias = new Date(hoje);
  daqui30dias.setDate(hoje.getDate() + 30);
  const hjAtualizada = hoje.toLocaleDateString("pt-BR");
  const daqui30diasAtualizada = daqui30dias.toLocaleDateString("pt-BR");

  useEffect(() => {
    const dados = localStorage.getItem("ultimo");
    if (dados) {
      setUltimo(Number(dados) + 1);
    } else {
      setUltimo(1);
    }
  }, []);

  useEffect(() => {
    const dados = storageCliente.get();
    setCliente(dados);
  }, []);

  useEffect(() => {
    if (!msg) return;
    const time = setTimeout(() => setMsg(""), 2000);
    return () => clearTimeout(time);
  }, [msg]);

  if (!orcamento) return null;
  if (!user) return null;

  const descontoTotal = orcamento.orcamentoCliente.reduce(
    (acc, item) => acc + item.desconto,
    0
  );
  const TotalGeral = orcamento.orcamentoCliente.reduce(
    (acc, item) => acc + item.total,
    0
  );

  const handleClickVoltar = () => {
    route.replace("/servicos/orcamento/step2");
  };

  const handleClickExcluir = (id: string) => {
    orcamento.excluirItemServico(id);
  };

  const handleClick = () => {
    const novoUltimo = ultimo + 1;
    setUltimo(novoUltimo);
    localStorage.setItem("ultimo", novoUltimo.toString());

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <AuthPrivate>
      <div>
        <Header />

        <div className="max-w-4xl m-auto">
          <div className="mx-4 mb-10">
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
              <p className="text-sm mt-2 font-semibold">{cliente?.nome}</p>
              <p className="text-sm font-semibold">{cliente?.telefone}</p>
              <p className="text-sm mb-4 font-semibold">{cliente?.email}</p>

              <div className="text-xs md:text-sm font-semibold flex flex-col md:flex-row md:justify-between my-10">
                <p className="text-gray-700 mb-1">
                  Orçamento Emitido:{" "}
                  <span className="text-slate-900">{hjAtualizada}</span>
                </p>
                <p className="text-gray-700 mb-1">
                  Validade Orçamento:{" "}
                  <span className="text-red-700">{daqui30diasAtualizada}</span>
                </p>
              </div>
            </div>

            <div className="overflow-x-auto flex">
              <table className="min-w-full">
                <thead className="border border-gray-300 text-sm">
                  <tr>
                    <th className="border px-2 py-1 bg-slate-900 text-gray-200 rounded-tl-xl">
                      Item
                    </th>
                    <th className="border px-2 py-1 bg-slate-900 text-gray-200">
                      Serviço
                    </th>
                    <th className="border px-2 py-1 bg-slate-900 text-gray-200">
                      Descrição
                    </th>
                    <th className="border px-2 py-1 bg-slate-900 text-gray-200">
                      Quantidade
                    </th>
                    <th className="border px-2 py-1 bg-slate-900 text-gray-200">
                      Valor Unitário
                    </th>
                    <th className="border px-2 py-1 bg-slate-900 text-gray-200">
                      Valor Total
                    </th>
                    <th className="border px-2 py-1 bg-slate-900 text-gray-200">
                      Desconto
                    </th>
                    <th className="border px-2 py-1 bg-slate-900 text-gray-200">
                      Sub-Total
                    </th>
                    <th className="border px-2 py-1 bg-slate-900 text-gray-200 rounded-tr-xl">
                      Excluir Item
                    </th>
                  </tr>
                </thead>
                <tbody className="text-xs text-center">
                  {orcamento.orcamentoCliente.map((item, index) => (
                    <tr key={item.id}>
                      <td className="p-2 border">{index + 1}</td>
                      <td className="p-2 border">{item.servico}</td>
                      <td className="p-2 border">{item.descricao}</td>
                      <td className="p-2 border">{item.quantidade}</td>
                      <td className="p-2 border">
                        {formatarMoeda(item.valor)}
                      </td>
                      <td className="p-2 border">
                        {formatarMoeda(item.total)}
                      </td>
                      <td className="p-2 border">
                        {formatarMoeda(item.desconto)}
                      </td>
                      <td className="p-2 border">
                        {formatarMoeda(item.total - item.desconto)}
                      </td>
                      <td className="p-2 border">
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => handleClickExcluir(item.id)}
                          className="cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col items-end mt-20">
              <p className="text-sm font-semibold">
                Sub-Total Geral: {formatarMoeda(TotalGeral)}
              </p>
              <p className="text-sm font-semibold">
                Desconto Geral: {formatarMoeda(descontoTotal)}
              </p>
              <p className="text-sm font-semibold">
                Total a Pagar: {formatarMoeda(TotalGeral - descontoTotal)}
              </p>
            </div>

            <div className="bg-slate-900 text-gray-200 p-2 rounded my-10">
              <h2 className="text-center mb-6 border-b">Forma de Pagamento</h2>

              <div className="flex justify-between px-2 mb-6">
                {["Pix", "Dinheiro"].map((item, index) => (
                  <div className="flex" key={index}>
                    <InputItem
                      className=""
                      type="radio"
                      onChange={() => setSelecionadoFormaPagamento(item)}
                      checked={item === selecionadoFormaPagamento}
                    />
                    <span className="ml-2">{item}</span>
                  </div>
                ))}
              </div>

              {user.user?.name === process.env.NEXT_PUBLIC_NAME && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                  {[
                    "Rádio Novo Dial",
                    "Rádio Uruguai",
                    "Rádio Sintonia",
                    "JC",
                    "Sar",
                    "Jair Junior",
                    "Cesar Augusto",
                    "Christian Cesar",
                  ].map((item, index) => (
                    <div className="flex m-2" key={index}>
                      <InputItem
                        className=""
                        onChange={() => setSelecionadoLogo(item)}
                        checked={item === selecionadoLogo}
                        type="checkbox"
                      />
                      <span className="ml-2">{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {user.user?.name === "Christian Cezar" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                  {[`${user.user?.name}`].map((item, index) => (
                    <div className="flex m-2" key={index}>
                      <InputItem
                        className=""
                        onChange={() => setSelecionadoLogo(item)}
                        checked={item === selecionadoLogo}
                        type="checkbox"
                      />
                      <span className="ml-2">{item}</span>
                    </div>
                  ))}
                </div>
              )}
              {user.user?.name === "Cesar Augusto" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                  {[
                    `${user.user?.name}`,
                    "Rádio Novo Dial",
                    "Rádio Uruguai",
                    "Rádio Sintonia",
                  ].map((item, index) => (
                    <div className="flex m-2" key={index}>
                      <InputItem
                        className=""
                        onChange={() => setSelecionadoLogo(item)}
                        checked={item === selecionadoLogo}
                        type="checkbox"
                      />
                      <span className="ml-2">{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
                        <ButtomItem
                className="text-center font-bold bg-orange-300 p-2 mt-10 rounded cursor-pointer"
                label="Voltar"
                onClick={handleClickVoltar}
              />

              {msg && (
                <span className="flex items-center justify-center mt-2 text-red-500">
                  {msg}
                </span>
              )}

              {selecionadoFormaPagamento !== null ? (
                <PDFDownloadLink
                  document={
                    <OrcamentoPdf
                      logoSelecionado={selecionadoLogo}
                      emissaoOrcamento={hjAtualizada}
                      validadeOrcamento={daqui30diasAtualizada}
                      formaDePagamento={selecionadoFormaPagamento}
                      ultimoNumero={ultimo}
                      anoAtual={orcamento.anoAtual}
                    />
                  }
                  fileName="Orçamento.pdf"
                >
                  {({ loading }) => (
                    <ButtomItem
                      label={loading ? "Gerando PDF..." : "Baixar PDF"}
                      className="text-center bg-red-500 p-2 mt-10 rounded text-gray-200 cursor-pointer"
                      onClick={handleClick}
                    />
                  )}
                </PDFDownloadLink>
              ) : (
                <ButtomItem
                  label="Baixar PDF"
                  className="text-center bg-red-500 p-2 mt-10 rounded text-gray-200 cursor-pointer"
                  onClick={() => setMsg("Favor preencher todos os campos!")}
                />
              )}

          </div>
          
        </div>
      </div>
    </AuthPrivate>
  );
}
