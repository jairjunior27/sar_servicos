"use client";

import { useContext, useEffect, useState } from "react";
import { InputItem } from "./inputItem";
import { ButtomItem } from "./buttonItem";
import { UsuarioContext } from "@/contextProvider/userContext";
import { useRouter } from "next/navigation";

export const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState("");
  const userAuth = useContext(UsuarioContext);
  const route = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const time = setTimeout(() => {
      setMensagem("");
      setEmail("");
      setPassword("");
    }, 2000);

    return () => clearTimeout(time);
  }, [mensagem]);

  const handleButton = async () => {
    if (!email || !password) {
      return setMensagem("Favor preencher todos os campos");
    }

      setLoading(true);
    const response = await userAuth?.signin(email, password);
    if (response) {
    
      route.push("/servicos");
      setLoading(false);
    } else {

      setMensagem("Usuario não existe !");
       setLoading(false);
      return;
    }
  };

  return (
    <div className="max-w-2xl m-auto mt-20">
      <InputItem
        className="bg-slate-900 p-3 rounded-xl text-gray-200 mb-6"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Digite seu email"
        type="email"
      />
      <InputItem
        className="bg-slate-900 p-3 rounded-xl text-gray-200 mb-6 flex items-center"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Digite sua senha"
        password
      />
      {loading && <div className="text-center mt-2">Carregando...</div>}
      {mensagem && (
        <div className="text-center  text-red-700 mb-2">{mensagem}</div>
      )}
      <ButtomItem
        label="Enviar"
        onClick={handleButton}
        className="bg-orange-400 mt-10  p-3 rounded-xl text-center font-bold text-gray-300 opacity-100 hover:opacity-75 cursor-pointer"
      />
    </div>
  );
};
