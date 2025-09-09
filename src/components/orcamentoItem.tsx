import { useEffect, useState } from "react";
import { InputItem } from "./inputItem";
import { ButtomItem } from "./buttonItem";

import { Orcamento } from "./orcamento";

export const OrcamentoItem = () => {
  const [valorServico, setValorServico] = useState<number>(0);
  const [valorDesconto, setValorDesconto] = useState<number>(0);
  const [quantidade, setQuantidade] = useState<number>(0);
  const [cliente, setCliente] = useState("");
  const [telefone, setTelefone] = useState("");
  const [servico, setServico] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showOrcamento, setShowOrcamento] = useState(false);
  const [selecionado, setSelecionado] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  const handleButtonPrimeiro = () => {
    if (!cliente || !telefone) {
      return setMsg("Favor Inserir todos os dados! ");
    }

    setShowInput(true);
  };

  useEffect(() => {
    const time = setTimeout(() => {
      setMsg("");
    }, 2000);

    return () => clearTimeout(time);
  }, [msg]);

  const handleOrcamento = () => {
    if (
      !servico ||
      !descricao ||
      !valorServico ||
      !quantidade ||
      selecionado === null ||
      !data || !valorDesconto
    ) {
      return setMsg("Favor inserir todos os dados!");
    }

    setShowOrcamento(true);
  };
  return (
    <div className="">
      {showOrcamento ? (
        <Orcamento
          cliente={cliente}
          data={data}
          descricao={descricao}
          formaDePagamento={selecionado}
          quantidade={quantidade}
          servico={servico}
          telefone={telefone}
          valor={valorServico}
          valorDesconto={valorDesconto}
        />
      ) : (
        <div>
          {!showInput ? (
            <>
              <InputItem
                className="bg-slate-900 p-2 rounded text-gray-200 mb-5"
                placeholder="Digite o nome do cliente"
                onChange={(e) => setCliente(e.target.value)}
                value={cliente}
              />
              <InputItem
                className="bg-slate-900 p-2 rounded text-gray-200 mb-5"
                placeholder="Digite o telefone do cliente"
                onChange={(e) => setTelefone(e.target.value)}
                value={telefone}
              />
              {msg && (
                <span className="flex items-center justify-center mt-2 text-red-500">
                  {msg}
                </span>
              )}
              <ButtomItem
                className="bg-yellow-400 text-center p-2 rounded font-bold text-gray-700 mt-10"
                label="Enviar"
                onClick={handleButtonPrimeiro}
              />
            </>
          ) : (
            <>
              <InputItem
                className="bg-slate-900 p-2 rounded text-gray-200 mb-5"
                placeholder="Digite o Serviço"
                onChange={(e) => setServico(e.target.value)}
                value={servico}
              />
              <InputItem
                className="bg-slate-900 p-2 rounded text-gray-200 mb-5"
                placeholder="Digite a descrição"
                onChange={(e) => setDescricao(e.target.value)}
                value={descricao}
              />
              <InputItem
                className="bg-slate-900 p-2 rounded text-gray-200 mb-5"
                placeholder="Digite valor R$ do serviço "
                onChange={(e) => {
                  const isNumber = e.target.value.replace(/\D/g, "");
                  const number = Number(isNumber) / 100;
                  setValorServico(number);
                }}
                value={
                  valorServico === 0
                    ? ""
                    : valorServico.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })
                }
              />
              <InputItem
                className="bg-slate-900 p-2 rounded text-gray-200 mb-5"
                placeholder="Digite valor R$ do desconto "
                onChange={(e) => {
                  const isNumber = e.target.value.replace(/\D/g, "");
                  const number = Number(isNumber) / 100;
                  setValorDesconto(number);
                }}
                value={
                  valorDesconto === 0
                    ? ""
                    : valorDesconto.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })
                }
              />
              <InputItem
                className="bg-slate-900 p-2 rounded text-gray-200 mb-5"
                placeholder="Digite a quantidade "
                onChange={(e) => {
                  const isNumber = e.target.value.replace(/\D/g, "");
                  setQuantidade(Number(isNumber));
                }}
                value={quantidade === 0 ? "" : quantidade}
              />
              <div className="flex justify-between">
                {["Dinheiro", "Pix"].map((item, index) => (
                  <div className="flex" key={index}>
                    <InputItem
                      className=""
                      type="checkbox"
                      onChange={() => setSelecionado(item)}
                      checked={item === selecionado}
                    />
                    <p className="ml-2">{item}</p>
                  </div>
                ))}
              </div>
              <InputItem
                className="my-6"
                onChange={(e) => setData(e.target.value)}
                value={data}
                type="date"
              />
              {msg && (
                <span className="flex items-center justify-center mt-2 text-red-500">
                  {msg}
                </span>
              )}
              <ButtomItem
                className="bg-yellow-400 text-center p-2 rounded font-bold text-gray-700 mt-10"
                label="Enviar"
                onClick={handleOrcamento}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};
