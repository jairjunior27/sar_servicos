import { Formatdata } from "@/util/formatedata";
import { formatarMoeda } from "@/util/formatMoeda";
import { useEffect, useState } from "react";
import { ButtomItem } from "./buttonItem";

type prop = {
  cliente: string;
  telefone: string;
  descricao: string;
  servico: string;
  valor: number;
  valorDesconto: number;
  quantidade: number;
  formaDePagamento: string | null;
  data: string;
};
export const Orcamento = ({
  cliente,
  telefone,
  descricao,
  servico,
  valor,
  quantidade,
  formaDePagamento,
  data,
  valorDesconto,
}: prop) => {
  const [numeroOrcamento, setNumeroOrcamento] = useState<number>(0);
  let anoAtual = new Date().getFullYear();
  const subTotal = quantidade * valor;
  useEffect(() => {
    const ultimo = localStorage.getItem("ultimo");
    const ultimoNumero = ultimo ? Number(ultimo) : 0;
    setNumeroOrcamento(ultimoNumero + 1);
  }, []);

  useEffect(() => {
    localStorage.setItem("ultimo", numeroOrcamento.toString());
  }, [numeroOrcamento]);
  return (
    <div className="">
      <div className="border-b  flex flex-col">
        <span>radiovisao@ig.com.br</span>
        <span className="mb-2">sistemaalternativo72@gmail.com</span>
      </div>
      <h2 className="text-center my-3">
        Orçamento | N⁰{" "}
        {numeroOrcamento < 100 ? `00${numeroOrcamento}` : numeroOrcamento} -{" "}
        {anoAtual}
      </h2>
      <p className="text-sm">
        <span className="font-bold text-xs">Cliente:</span> {cliente}
      </p>
      <p className="text-sm">
        <span className="font-bold text-xs">Telefone:</span> {telefone}
      </p>
      <div className="mt-4">
        <h2 className="text-xs font-bold">Serviço:</h2>
        <p className="text-sm">{servico}</p>
        <p className="text-xs">{descricao}</p>
      </div>
      <div className="mt-4">
        <h2 className="text-xs font-bold">Preço:</h2>
        <p className="text-xs">{formatarMoeda(valor)}</p>
      </div>
      <div className="mt-4">
        <h2 className="text-xs font-bold">Quantidade</h2>
        <p className="text-xs">{quantidade}</p>
      </div>

      <div className="mt-4">
        <p className="text-xs font-bold">Forma de Pagamento:</p>
        <p className="text-xs">{formaDePagamento}</p>
      </div>


         <p className="text-xs mt-4 font-bold">Data: {Formatdata(data)}</p>
    
    
      <div className="mt-4 flex flex-col">
        <span className="text-sm font-bold">Subtotal: {formatarMoeda(subTotal)} </span>
        <span className="text-sm font-bold border-b">Desconto: {formatarMoeda(valorDesconto)} </span>
        <span className="text-sm font-bold">Total: {formatarMoeda(subTotal - valorDesconto)} </span>
      </div>

      <ButtomItem className="bg-yellow-400 p-2 rounded text-center font-bold text-gray-800 mt-12" label="Baixar pdf"/>
    </div>
  );
};
