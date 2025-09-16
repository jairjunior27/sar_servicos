"use client";

import { Header } from "@/components/header";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { ReciboContext } from "@/contextProvider/reciboContext";
import { InputItem } from "@/components/inputItem";
import { ButtomItem } from "@/components/buttonItem";
import { useRouter } from "next/navigation";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReciboPdf } from "@/components/reciboPdf";

export default function Page() {
  const recibo = useContext(ReciboContext);
  const [selecionado, setSelecionado] = useState("");
  const [msg, setMsg] = useState("");
  const route = useRouter();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numeros = e.target.value.replace(/\D/g, "");
    const novo = numeros ? Number(numeros) / 100 : 0;
    recibo?.setValor(novo);
  };

  const handleClick = () => {
    if (
      !recibo?.empresa ||
      !recibo.referencia ||
      !recibo.importancia ||
      !recibo.valor
    ) {
      return setMsg("Favor preencher todos os campos!");
    }
    route.push("/servicos");
  };

  useEffect(() => {
    const dados = localStorage.getItem("selecionado");
    if (dados) {
      setSelecionado(dados);
    }
    if (!msg) return;
    const time = setTimeout(() => {
      setMsg("");
    }, 2000);
    return () => clearTimeout(time);
  }, [msg]);

  if (!recibo) return null;

  return (
    <div>
      <Header />
     <div className="m-6">
       <div className="max-w-7xl m-auto  pb-20 pt-10">
        <h2 className="text-center text-lg md:text-xl  font-semibold mb-10">
          Recibo | {selecionado}
        </h2>
        <InputItem
          className="bg-slate-900 text-gray-200 p-3 rounded"
          placeholder="Digite o nome da empresa"
          onChange={(e) => recibo.setEmpresa(e.target.value)}
          value={recibo.empresa}
        />
        <InputItem
          className="bg-slate-900 text-gray-200 p-3 rounded my-6"
          placeholder="Digite a importância"
          onChange={(e) => recibo.setImportancia(e.target.value)}
          value={recibo.importancia}
        />
        <InputItem
          className="bg-slate-900 text-gray-200 p-3 rounded my-6"
          placeholder="Digite a referência"
          onChange={(e) => recibo.setReferencia(e.target.value)}
          value={recibo.referencia}
        />
        <InputItem
          className="bg-slate-900 text-gray-200 p-3 rounded my-6"
          placeholder="Digite o valor do recibo"
          value={
            recibo.valor === 0
              ? ""
              : recibo.valor.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
          }
          onChange={handleChange}
        />
        <InputItem
          type="date"
          className="bg-sky-300 text-gray-200 p-3 rounded my-6"
          onChange={(e) => recibo.setData(e.target.value)}
          value={recibo.data}
        />
        <div className="mt-20">
          {msg && <div className="text-center  text-red-700 mb-2">{msg}</div>}
          {recibo.empresa &&
          recibo.importancia &&
          recibo.referencia &&
          recibo.data &&
          recibo.valor > 0 ? (
            <>
              <PDFDownloadLink
                key={`${recibo.empresa}-${recibo.referencia}-${recibo.valor}`}
                document={
                  <ReciboPdf
                    data={recibo.data}
                    empresa={recibo.empresa}
                    importancia={recibo.importancia}
                    referencia={recibo.referencia}
                    valor={recibo.valor}
                    selecionado={selecionado}
                  />
                }
                fileName="recibo.pdf"
              >
                {({ loading }) => (
                  <ButtomItem
                    className="w-full text-center bg-amber-400 p-3 rounded my-10 max-w-xl m-auto font-bold"
                    label={loading ? "Gerando PDF..." : "Baixar PDF"}
                  />
                )}
              </PDFDownloadLink>

              <ButtomItem
                className="text-center font-semibold bg-amber-300 p-3 rounded max-w-xl m-auto mt-10"
                label="Voltar"
                onClick={handleClick}
              />
            </>
          ) : (
            <ButtomItem
              className="w-full text-center bg-gray-400 p-3 rounded my-10 max-w-xl m-auto font-bold cursor-not-allowed"
              label="Baixar PDF"
              onClick={() => setMsg("Favor preencher todos os campos!")}
            />
          )}
        </div>
      </div>
     </div>
    </div>
  );
}
