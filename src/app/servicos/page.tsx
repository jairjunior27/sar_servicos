"use client";
import { AuthPrivate } from "@/components/authPivate";
import { Header } from "@/components/header";
import { InputItem } from "@/components/inputItem";
import { ListaItem } from "@/components/itemLista";
import { OrcamentoStep } from "@/components/orcamentoStep";
import { Recibo } from "@/components/recibo";
import { ReciboProvider } from "@/contextProvider/reciboProvider";
import { useState } from "react";

export default function Page() {
  const [selecionado, setSelecionado] = useState<string | null>(null);

  return (
    <AuthPrivate>
      <Header />
      <div className="m-6">
        <div
          className="grid grid-cols-2 md:grid-cols-4  bg-slate-900 rounded p-2 
         max-w-7xl m-auto"
        >
          {["lista", "orçamento", "contrato", "recibo"].map((item, index) => (
            <div className="px-3 py-2" key={index}>
              <div className="flex items-center ">
                <InputItem
                  className=""
                  type="checkbox"
                  checked={item === selecionado}
                  onChange={() => setSelecionado(item)}
                />
                <p className="mx-2 text-md  text-gray-200">
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className=" mt-20 max-w-7xl m-auto">
          {selecionado === "lista" && <ListaItem />}
          {selecionado === "orçamento" && <OrcamentoStep />}
          {selecionado === "contrato" && <div>Renderizando Contrato...</div>}
          {selecionado === "recibo" && (
            <ReciboProvider>
              <Recibo />
            </ReciboProvider>
          )}
        </div>
      </div>
    </AuthPrivate>
  );
}
