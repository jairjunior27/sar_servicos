"use client";
import { ReactNode, useEffect, useState } from "react";
import { UsuarioContext } from "./userContext";
import { User } from "@/type/user";
import { useApi } from "@/util/axios";
import { useRouter } from "next/navigation";

export const UsuarioProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const route = useRouter();
  const isTokenExpired = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expiration = payload.exp * 1000;
      return Date.now() > expiration;
    } catch (e) {
      return true;
    }
  };
  useEffect(() => {
    const validaTokenLocal = async () => {
      const tokenLocal = localStorage.getItem("token");

      if (!tokenLocal) {
        setLoading(false);

        return;
      }

      if (isTokenExpired(tokenLocal)) {
        setLoading(false);
        setUser(null);
        setToken("");
        localStorage.removeItem("token");
        return;
      }

      try {
        const response = await useApi.validateToken(tokenLocal);
         
        if (response?.user && response.token) {
          setUser(response.user);
          setToken(response.token);
          localStorage.setItem("token", tokenLocal);
        } else {
          localStorage.removeItem("token");
          setUser(null);
          setToken("");
        }
      } catch (e) {
        localStorage.removeItem("token");
        setUser(null);
        setToken("");
        console.log("Token invalido", e);
      } finally {
        setLoading(false);
      }
    };

    validaTokenLocal();
  }, []);

  const signin = async (email: string, password: string) => {
    const response = await useApi.login(email, password);
    if (response?.user && response.token) {
      setUser(response.user);
      setToken(response.token);
      setLoading(false);

      localStorage.setItem("token", response.token);
      return true;
    }

    return false;
  };

  const signout = (redirecione = true) => {
    setUser(null);
    localStorage.removeItem("token");
    if (redirecione) {
      route.push("/");
    }
  };
  return (
    <UsuarioContext.Provider
      value={{
        loading,
        signin,
        signout,
        token,
        setToken,
        user,
        setLoading,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};
