import { Formatdata } from "@/util/formatedata";
import { formatarMoeda } from "@/util/formatMoeda";
import { useEffect, useState } from "react";
import { ButtomItem } from "./buttonItem";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { OrcamentoPdf } from "./orcamentoPdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
 
  const anoAtual = new Date().getFullYear();
  const subTotal = quantidade * valor;
  const numero = localStorage.getItem("ultimo")



  const handleOrcamento =() =>{
  

  }

  return (
    <div className="">
      <div className="border-b  flex flex-col">
        <span>radiovisao@ig.com.br</span>
        <span className="mb-2">sistemaalternativo72@gmail.com</span>
      </div>
      <h2 className="text-center my-3">
        Orçamento | N⁰{" "}
        {Number(numero) < 100 ? `00${numero}` : numero} -{" "}
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

      <div className="mt-10 flex flex-col items-end ">
        <span className="text-sm font-bold">
          Subtotal: {formatarMoeda(subTotal)}{" "}
        </span>
        <span className="text-sm font-bold border-b">
          Desconto: {formatarMoeda(valorDesconto)}{" "}
        </span>
        <span className="text-sm font-bold">
          Total: {formatarMoeda(subTotal - valorDesconto)}{" "}
        </span>
      </div>

      <div className="flex items-center  justify-center mt-10">
       <p> Excluir Orçamento </p><FontAwesomeIcon icon={faTrash}/>
      </div>
      <PDFDownloadLink
  document={<OrcamentoPdf checkImagem cliente={cliente} data={data} descricao={descricao} formaDePagamento={formaDePagamento} quantidade={quantidade}  servico={servico} telefone={telefone} valor={valor} valorDesconto={valorDesconto}/>}
        fileName="orcamento.pdf"
      >
         {({ loading }) => (
    <ButtomItem
      className="w-full text-center bg-amber-400 p-2 rounded my-10 max-w-xl m-auto font-bold"
      label={loading ? "Gerando PDF..." : "Baixar PDF"}
    />
  )}
      </PDFDownloadLink>

    
    </div>
  );
};
