"use client";

import { ButtomItem } from "./buttom";
import { InputItem } from "./inputItem";

export const SigninForm = () => {
  const handleClick = () => {};
  return (
    <form className=" max-w-4xl m-auto mt-20">
      <InputItem
        classname="bg-slate-800 w-full rounded-xl py-2 px-4 mb-8 text-gray-200"
        placeholder="Digite seu E-mail"
      />
      <InputItem
        classname="bg-slate-800 w-full rounded-xl py-2 px-4 mb-8 text-gray-200"
        placeholder="Digite sua senha"
      />
      <ButtomItem label="Enviar" buttomClick={() => handleClick} className="bg-orange-300 p-2 rounded-xl text-center font-bold text-gray-600 cursor-pointer" />
    </form>
  );
};
