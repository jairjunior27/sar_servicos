"use client";
import { UsuarioContext } from "@/contextProvider/userContext";
import { useRouter } from "next/navigation";
import { ReactNode, useContext, useEffect } from "react";

export const AuthPrivate = ({ children }: { children: ReactNode }) => {
  const auth = useContext(UsuarioContext);
  const route = useRouter();

  useEffect(() => {
    if (!auth) return;

    if (auth.user === null) {
      const storageToken = localStorage.getItem("token");

      if (!storageToken) {
        route.replace("/");
      } else {
        auth.setLoading(false);
      }
    } else {
      auth.setLoading(false);
    }
  }, [auth, auth?.user, route]);

  if (auth?.loading) {
    return (
      <div className="flex items-center justify-center mt-20">
        Carregando...
      </div>
    );
  }

  return <>{children}</>;
};
