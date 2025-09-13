import { useRouter } from "next/navigation";
import { ButtomItem } from "./buttonItem";
import { InputItem } from "./inputItem";
import { useContext, useEffect, useState } from "react";
import { OrcamentoContext } from "@/contextProvider/orcamentoContext";
import { storageCliente } from "@/util/storage";

export const OrcamentoStep = () => {
  const route = useRouter();
  const orcamento = useContext(OrcamentoContext);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const time = setTimeout(() => {
      setMsg("");
    }, 2000);
    return () => clearTimeout(time);
  }, [msg]);

  const handleClick = () => {
    if (!orcamento?.nomecliente || !orcamento.telefoneCliente) {
      return setMsg("Favor inserir todos os dados !");
    }

    const cliente = {
      id: crypto.randomUUID(),
      nome: orcamento.nomecliente,
      telefone: orcamento.telefoneCliente
    }

    storageCliente.set(cliente)

    route.push("/servicos/orcamento/step2");
  };
  return (
    <div className="max-w-4xl m-auto mt-20">
      <InputItem
        className="bg-slate-900 p-2 rounded text-gray-200 mb-5"
        placeholder="Digite o nome do cliente"
        onChange={(e) => orcamento?.setNomeCliente(e.target.value)}
        value={orcamento?.nomecliente}
      />
      <InputItem
        className="bg-slate-900 p-2 rounded text-gray-200 mb-5"
        placeholder="Digite o telefone Ex: 11 91111-1111"
        onChange={(e) => orcamento?.setTelefoneCliente(e.target.value)}
        value={orcamento?.telefoneCliente}
      />

      {msg && (
        <span className="flex items-center justify-center mt-2 text-red-500">
          {msg}
        </span>
      )}

      <ButtomItem
        className="bg-yellow-500 p-2 rounded text-center font-bold text-gray-800 mt-10 cursor-pointer"
        label="Adcionar"
        onClick={handleClick}
      />
    </div>
  );
};
