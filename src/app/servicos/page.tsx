"use client";
import { AuthPrivate } from "@/components/authPivate";
import { Header } from "@/components/header";
import { InputItem } from "@/components/inputItem";
import { ListaItem } from "@/components/itemLista";
import { OrcamentoStep } from "@/components/orcamentoStep";
import { useState } from "react";

export default function Page() {
  const [selecionado, setSelecionado] = useState<string | null>(null);

  return (
    <AuthPrivate>
      <Header />
      <div className="grid grid-cols-2 md:grid-cols-4 m-6 bg-slate-900 rounded ">
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

      <div className="mx-6">
        {selecionado === "lista" && <ListaItem />}
        {selecionado === "orçamento" && <OrcamentoStep />}
        {selecionado === "contrato" && <div>Renderizando Contrato...</div>}
        {selecionado === "recibo" && <div>Renderizando Recibo...</div>}
      </div>
    </AuthPrivate>
  );
}
