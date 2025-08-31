"use client";

import { useContext, useEffect, useState } from "react";
import { ButtomItem } from "./buttom";
import { InputItem } from "./inputItem";
import { useRouter } from "next/navigation";
import { UserContext } from "@/authContextProvider/authContext";

export const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const userAuth = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const time = setInterval(() => {
      setMsg("");
    }, 3000);
    return () => clearInterval(time);
  }, [msg]);
  const handleClick = async () => {
    if (!email || !password) {
      return setMsg("Favor preencher todos os campos");
    }
    const response = await userAuth?.signin(email, password);
    if (!response) {
      setMsg("Usuario não encontrado");

      return router.push("/");
    }

    router.push("/servicos");
  };
  return (
    <form className=" max-w-4xl m-auto mt-20">
      <InputItem
        classname="bg-slate-800 w-full rounded-xl py-2 px-4 mb-8 text-gray-200 outline-0"
        placeholder="Digite seu E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputItem
        classname="bg-slate-800 w-full rounded-xl py-2 px-4  text-gray-200 outline-0"
        placeholder="Digite sua senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {msg && <div className="mt-4 text-red-700 text-center">{msg}</div>}
      <ButtomItem
        label="Enviar"
        buttomClick={() => handleClick()}
        className="bg-orange-300 p-2 rounded-xl text-center font-bold text-gray-600 cursor-pointer mt-6"
      />
    </form>
  );
};
