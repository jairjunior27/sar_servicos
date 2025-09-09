import { useEffect, useState } from "react";
import { InputItem } from "./inputItem";
import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
import { ButtomItem } from "./buttonItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ListaSar } from "./listaSar";
import { StorageLista } from "@/util/storageLista";

export const ListaItem = () => {
  const [nome, setNome] = useState("");
  const [msg, setMsg] = useState("");
  const [nomeItem, setNomeItem] = useState("");
  const [lista, setLista] = useState<string[]>([]);
  const [showItem, setShowItem] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const [select, setSelect] = useState("");

  useEffect(() => {
    const time = setTimeout(() => {
      setMsg("");
    }, 2000);
    return () => clearTimeout(time);
  }, [msg]);


  useEffect(()=>{
    const handleAll = () =>{
    const response =  StorageLista.get()
    setLista(response)
    }
    handleAll()
  },[])
  const handleNome = () => {
    if (!nome) {
      return setMsg("Favor inserir o nome !");
    }
    setShowItem(true);
  };
  const handleClick = () => {
    if (!nomeItem) {
      setMsg("Favor inserir um item!");
      return;
    }
    const newLista = [...lista,nomeItem]
    setLista(newLista);
    setNomeItem("");
    StorageLista.set(newLista)
  };

  const handleDelete = (n: number) => {
    setLista(lista.filter((_, index) => index !== n));
  };
  return (
    <div className="max-w-4xl m-auto">
      {showItem ? (
        <InputItem
          className="bg-slate-900 w-full max-w-4xl m-auto rounded text-gray-200 px-3 py-2 flex items-center md:mt-4"
          placeholder="Adcione dados"
          onChange={(e) => setNomeItem(e.target.value)}
          value={nomeItem}
          icon={faArrowAltCircleRight}
          clickIcon={() => handleClick()}
        />
      ) : (
        <InputItem
          className="bg-slate-900 w-full max-w-4xl m-auto rounded text-gray-200 px-3 py-2 flex items-center md:mt-4"
          placeholder="Digite o nome da lista"
          onChange={(e) => setNome(e.target.value)}
          value={nome}
          icon={faArrowAltCircleRight}
          clickIcon={handleNome}
        />
      )}
      {msg && <div className="text-center mt-2 text-red-700">{msg}</div>}
      {showItem && (
        <div
          className="flex justify-between  text-slate-900 font-semibold"
          style={{ marginTop: 15, marginBottom: 10 }}
        >
          <select value={select} onChange={(e) => setSelect(e.target.value)}>
            <option value="">Selecione</option>
            <option value="numerado">Numerado</option>
            <option value="pontilhado">Pontilhado</option>
          </select>
          {`Total: ${lista.length}`}
        </div>
      )}
      {showItem && lista.length > 0 && <h2 className="text-center  text-xl">{nome.charAt(0).toLocaleUpperCase() + nome.slice(1)}</h2>}

      <div className="my-4">
        {select === "numerado" ? (
          <ul>
            {lista.map((item, index) => (
              <li key={index} className="flex  justify-between mb-2  ">
                <span className="truncate max-w-[220px]">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1} - {item.toLocaleUpperCase()}
                </span>
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => handleDelete(index)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="pl-2 ">
            {lista.map((item, index) => (
              <li
                key={index}
                className="relative pl-3 flex justify-between mb-2 before:content-['•'] before:absolute before:left-0 before:text-black"
              >
                <span className="truncate max-w-[220px]">{item.toLocaleUpperCase()}</span>

                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => handleDelete(index)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
     {lista.length > 0 &&  <div className="flex items-center justify-end mt-10">
        <InputItem
          className="mr-2"
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <span>Pdf com Imagem</span>
      </div>}
      {!showSelect && lista.length > 0 && (
        <PDFDownloadLink
          document={
            <ListaSar
              lista={lista}
              nomeLista={nome}
              tipo={select}
              checkImagem={checked}
            />
          }
          fileName="ListaSar.pdf"
        >
          <ButtomItem
            className="w-full text-center bg-amber-400 p-2 rounded my-10 max-w-xl m-auto font-bold"
            label="Baixar pdf"
          />
        </PDFDownloadLink>
      )}
    </div>
  );
};
