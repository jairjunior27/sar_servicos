"use client";
import { AuthPrivate } from "@/components/authPivate";
import { ButtomItem } from "@/components/buttonItem";
import { ContratoPdf } from "@/components/contratoPdf";
import { Header } from "@/components/header";
import { InputItem } from "@/components/inputItem";
import { ContratoContext } from "@/contextProvider/contratoContext";
import { UsuarioContext } from "@/contextProvider/userContext";
import { ContratoType } from "@/type/contratoTYpe";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Page() {
  const [selecionado, setSelecionado] = useState<string | null>(null);
  const [selecionadoLogo, setSelecionadoLogo] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const contrato = useContext(ContratoContext);
  const user = useContext(UsuarioContext);
  const route = useRouter();
  useEffect(() => {
    if (!msg) return;
    const time = setTimeout(() => setMsg(""), 2000);
    return () => clearTimeout(time);
  }, [msg]);
  if (!user) return null;
  if (!contrato) return null;
  const dadosContrato: ContratoType = {
    nomeContratado: contrato.nomeContratado || "",
    cpfContratado: contrato.cpfContratado || "",
    rgContratado: contrato.rgContratado || "",
    nomeContratante: contrato.nomeContratante || "",
    cpfContratante: contrato.cpfContratante || "",
    rgContratante: contrato.rgContratante || "",
    obrigacaoContratado: contrato.obrigacaoContratado || "",
    obrigacaoContratante: contrato.obrigacaoContratante || "",
    servico: contrato.servicoPrestado || "",
    descricao: contrato.descricaoServicoPrestado || "",
    prazo: contrato.prazo || "",
    rescisao: contrato.rescisao || "",
    pagamento: contrato.pagamento || "",
    tipoDePagamento: selecionado || "",
    data: contrato.data || "",
    logo: selecionadoLogo || "",
  };

  const logos =
    user.user?.name === process.env.NEXT_PUBLIC_NAME
      ? [
          "Rádio Novo Dial",
          "Rádio Uruguai",
          "Rádio Sintonia",
          "JC",
          "Sar",
          "Jair Junior",
          "Cesar Augusto",
          "Christian Cesar",
        ]
      : [user.user?.name || ""];

  const handleClick = () => {
    if (
      !contrato.servicoPrestado ||
      !contrato.prazo ||
      !contrato.rescisao ||
      !contrato.descricaoServicoPrestado ||
      !contrato.data ||
      !selecionado
    ) {
      return setMsg("Favor preencher todos os campos");
    }

    localStorage.setItem("contrato", JSON.stringify(dadosContrato));
    route.push("/servicos/contrato/contratado");
  };

  return (
    <AuthPrivate>
      <div>
        <Header />
        <div className="m-6">
          <div className=" max-w-4xl mx-auto">
            <h2 className="text-slate-800 font-bold text-xl text-center mb-10">
              Dados do Serviço
            </h2>
            <p className="font-semibold mb-5">Etapa 3/3</p>

            <div className="">
              <InputItem
                className="bg-slate-900 p-3 text-gray-200 rounded mb-7"
                onChange={(e) => contrato.setServicoPrestado(e.target.value)}
                placeholder="Digite o serviço"
                value={contrato.servicoPrestado}
              />
              <InputItem
                className="bg-slate-900 p-3 text-gray-200 rounded mb-7"
                onChange={(e) =>
                  contrato.setDescricaoServicoPrestado(e.target.value)
                }
                placeholder="Digite a descrição do serviço"
                value={contrato.descricaoServicoPrestado}
              />
              <InputItem
                className="bg-slate-900 p-3 text-gray-200 rounded mb-7"
                onChange={(e) => contrato.setPrazo(e.target.value)}
                placeholder="Digite o prazo de execução"
                value={contrato.prazo}
              />
              <InputItem
                className="bg-slate-900 p-3 text-gray-200 rounded mb-7"
                onChange={(e) => contrato.setRescisao(e.target.value)}
                placeholder="Termos de Rescisão"
                value={contrato.rescisao}
              />
              <InputItem
                className="bg-slate-900 p-3 text-gray-200 rounded mb-7"
                onChange={(e) => contrato.setPagamento(e.target.value)}
                placeholder="Descrição de pagamento"
                value={contrato.pagamento}
              />
              <InputItem
                className="bg-sky-200 p-3 text-gray-700 rounded mb-7"
                onChange={(e) => contrato.setData(e.target.value)}
                type="date"
                value={contrato.data}
              />

              <h2 className="text-center font-bold text-gray-700 mb-7">
                Forma de Pagamento
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 bg-slate-900 rounded">
                {["Pix", "Dinheiro"].map((item) => (
                  <div className="flex items-center p-2" key={item}>
                    <InputItem
                      type="radio"
                      className=""
                      checked={item === selecionado}
                      onChange={() => setSelecionado(item)}
                    />
                    <span className="ml-2 text-gray-200 font-bold">{item}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-center font-bold text-gray-700 mb-4 mt-4">
                Adicionar Logo
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 bg-slate-900 p-2 rounded">
                {logos.map((item) => (
                  <div className="flex items-center p-2" key={item}>
                    <InputItem
                      type="radio"
                      className=""
                      checked={item === selecionadoLogo}
                      onChange={() => setSelecionadoLogo(item)}
                    />
                    <span className="ml-2 text-gray-200 font-bold">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {msg && <p className="text-center text-red-500 mt-5">{msg}</p>}

            <ButtomItem
              className="text-center bg-orange-300 p-3 rounded mt-7"
              label="Voltar"
              onClick={() => route.replace("/servicos/contrato/contratante")}
            />

            {contrato.servicoPrestado &&
              contrato.descricaoServicoPrestado &&
              contrato.rescisao &&
              contrato.prazo &&
              contrato.data &&
              selecionado && (
                <div className="flex flex-col gap-4">
                  <PDFDownloadLink
                    document={<ContratoPdf contrato={dadosContrato} />}
                    fileName="Contrato.pdf"
                  >
                    {({ loading }) => (
                      <ButtomItem
                        label={loading ? "Gerando PDF..." : "Baixar PDF"}
                        className="text-center bg-yellow-500 p-3 mt-10 rounded text-gray-900 cursor-pointer"
                      />
                    )}
                  </PDFDownloadLink>

                  <ButtomItem
                    label="Próxima Etapa"
                    className="text-center bg-orange-300 p-3 mt-2 rounded"
                    onClick={handleClick}
                  />
                </div>
              )}
          </div>
        </div>
      </div>
    </AuthPrivate>
  );
}
