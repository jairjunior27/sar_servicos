"use client";
import { UsuarioContext } from "@/contextProvider/userContext";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect } from "react";

export const ButtonHeader = () => {
  const { signout,token } = useContext(UsuarioContext)!;

 
 
  return (
    <>
      {token && (
        <FontAwesomeIcon
          icon={faRightFromBracket}
          style={{ color: "#0f172b", fontSize: 20 }}
          onClick={()=> signout()}
        />
      )}
    </>
  );
};
