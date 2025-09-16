"use client";
import { useContext, useEffect, useState } from "react";
import { InputItem } from "./inputItem";
import { ButtomItem } from "./buttonItem";
import { ReciboContext } from "@/contextProvider/reciboContext";
import { useRouter } from "next/navigation";
export const Recibo = () => {
  const [msg, setMsg] = useState("");
  const recibo = useContext(ReciboContext);
  const route = useRouter();
  useEffect(() => {
    if (!msg) return;
    const time = setTimeout(() => setMsg(""), 2000);
    return () => clearTimeout(time);
  }, [msg]);

  const handleClick = () => {
    if (recibo?.selecionado === null) {
      setMsg("Favor selecionar uma opção");
    }
    if (recibo?.selecionado) {
      localStorage.setItem("selecionado", recibo?.selecionado);
    }
    route.push("/servicos/recibos");
  };
  if (!recibo) return null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-slate-900 text-gray-200 p-2 rounded">
        {[
          "Rádio Novo Dial",
          "Rádio Uruguai",
          "Rádio Sintonia",
          "JC",
          "Sar",
          "Jair Junior",
          "Cesar Augusto",
          "Christian Cesar",
          "Layne Coelho",
        ].map((item, index) => (
          <div className="flex mb-2 items-center p-2" key={index}>
            <InputItem
              type="checkbox"
              className=""
              onChange={() => recibo.setSelecionado(item)}
              checked={item === recibo.selecionado}
            />
            <span className="ml-2 text-md md:text-lg">{item}</span>
          </div>
        ))}
      </div>
      {msg && (
        <span className="flex items-center justify-center mt-5 text-red-500">
          {msg}
        </span>
      )}
      <ButtomItem
        className="text-center bg-orange-300 mt-15 md:mt-30 p-3 rounded max-w-3xl m-auto font-semibold text-slate-700"
        label="Criar recibo"
        onClick={handleClick}
      />
    </>
  );
};
