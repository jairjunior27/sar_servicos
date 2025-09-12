"use client";
import { useEffect, useState } from "react";
import { InputItem } from "./inputItem";
import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
import { ButtomItem } from "./buttonItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ListaSar } from "./listaSar";
import { StorageLista } from "@/util/storage";
import { listaType } from "@/type/lista";

export const ListaItem = () => {
  const [nome, setNome] = useState("");
  const [msg, setMsg] = useState("");
  const [nomeItem, setNomeItem] = useState("");
  const [lista, setLista] = useState<listaType[]>([]);
  const [showItem, setShowItem] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selecionado, setSelecionado] = useState("");
  const [select, setSelect] = useState("");

  useEffect(() => {
    const time = setTimeout(() => setMsg(""), 2000);
    return () => clearTimeout(time);
  }, [msg]);

  useEffect(() => {
    const response = StorageLista.get() || [];
    setLista(response);
  }, []);

  const handleNome = () => {
    if (!nome) return setMsg("Favor inserir o nome!");
    setShowItem(true);
  };

  const handleClick = () => {
    if (!nomeItem) return setMsg("Favor inserir um item!");
    const newItem: listaType = {
      id: crypto.randomUUID(),
      name: nomeItem,
    };
    const newLista = [...lista, newItem];
    setLista(newLista);
    StorageLista.set(newLista);
    setNomeItem("");
  };

  const handleDelete = (id: string) => {
    const listaFiltrada = lista.filter((item) => item.id !== id);
    setLista(listaFiltrada);
    StorageLista.set(listaFiltrada);
    return;
  };

  const handleExcluir = () => {
    localStorage.removeItem("lista");
    setLista([]);
    setNome("");
    setShowItem(false);
    setSelect("");
    setSelecionado("");
  };
  return (
    <div className="max-w-4xl m-auto">
      {showItem ? (
        <InputItem
          className="bg-slate-900 w-full max-w-4xl m-auto rounded text-gray-200 px-3 py-2 flex items-center md:mt-4"
          placeholder="Adicione dados"
          value={nomeItem}
          onChange={(e) => setNomeItem(e.target.value)}
          icon={faArrowAltCircleRight}
          clickIcon={handleClick}
        />
      ) : (
        <InputItem
          className="bg-slate-900 w-full max-w-4xl m-auto rounded text-gray-200 px-3 py-2 flex items-center md:mt-4"
          placeholder="Digite o nome da lista"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          icon={faArrowAltCircleRight}
          clickIcon={handleNome}
        />
      )}

      {msg && <div className="text-center mt-2 text-red-700">{msg}</div>}

      {showItem && lista.length > 0 && (
        <div className="flex justify-between text-slate-900 font-semibold my-4">
          <select
            value={select}
            onChange={(e) => setSelect(e.target.value)}
            className="bg-slate-900 p-2 text-gray-200 rounded"
          >
            <option value="">Selecione</option>
            <option value="numerado">Numerado</option>
            <option value="pontilhado">Pontilhado</option>
          </select>
          <span>{`Total: ${lista.length}`}</span>
        </div>
      )}

      {showItem && lista.length > 0 && (
        <h2 className="text-center text-xl">
          {nome.charAt(0).toUpperCase() + nome.slice(1)}
        </h2>
      )}

      <div className="my-4">
        <ul>
          {lista.map((item, index) => (
            <li
              key={item.id}
              className={`flex justify-between mb-2 ${
                select === "pontilhado"
                  ? "relative pl-3 before:content-['•'] before:absolute before:left-0 before:text-black"
                  : ""
              }`}
            >
              <span className="truncate max-w-[220px]">
                {select === "numerado"
                  ? `${index + 1 < 10 ? `0${index + 1}` : index + 1} - ${
                      item.name.toUpperCase() || ""
                    }`
                  : item.name.toUpperCase() || ""}
              </span>
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => handleDelete(item.id)}
              />
            </li>
          ))}
        </ul>
      </div>

      {lista.length > 0 && (
        <>
          <h2 className="text-center text-gray-500 font-bold text-sm">
            Pdf com Imagem:
          </h2>
          <div className="flex items-center justify-between mt-4 bg-slate-900 p-2">
            {["Img Sar", "Img Jc"].map((item, index) => (
              <div className="flex " key={index}>
                <InputItem
                  type="checkbox"
                  className=""
                  onChange={() => setSelecionado(item)}
                  checked={selecionado === item}
                />
                <div className="ml-2 text-sm font-bold text-gray-600">
                  {item}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

   {lista.length > 0 &&
      <div
        className="text-sm text-gray-500 items-center justify-center flex mt-4"
        onClick={handleExcluir}
      >
        Excluir Lista <FontAwesomeIcon icon={faTrash} className="ml-2" />
      </div>
   }

      {lista.length > 0 && (
        <PDFDownloadLink
          key={`${lista.length}-${select}-${selecionado}`}
          document={
            <ListaSar
              lista={lista}
              nomeLista={nome}
              tipo={select}
              checkImagem={selecionado}
            />
          }
          fileName="ListaSar.pdf"
        >
          {({ loading }) => (
            <ButtomItem
              className="w-full text-center bg-amber-400 p-2 rounded my-10 max-w-xl m-auto font-bold"
              label={loading ? "Gerando PDF..." : "Baixar PDF"}
            />
          )}
        </PDFDownloadLink>
      )}
    </div>
  );
};
