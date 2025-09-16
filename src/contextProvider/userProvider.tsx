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
    const tokenLocal = localStorage.getItem("token");
    const storedUser = localStorage.getItem("usuario");

    if (tokenLocal && storedUser && !isTokenExpired(tokenLocal)) {
      setUser({ name: storedUser } as User);
      setToken(tokenLocal);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    const validaTokenLocal = async () => {
      const tokenLocal = localStorage.getItem("token");
      if (!tokenLocal) return;

      if (isTokenExpired(tokenLocal)) {
        setUser(null);
        setToken("");
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        return;
      }

      try {
        const response = await useApi.validateToken(tokenLocal);

        if (response?.user && response.token) {
          setUser(response.user);
          setToken(response.token);
          localStorage.setItem("token", tokenLocal);
          localStorage.setItem("usuario", response.user.name);
        } else {
          setUser(null);
          setToken("");
          localStorage.removeItem("token");
          localStorage.removeItem("usuario");
        }
      } catch (e) {
        console.log("Token inválido", e);
        setUser(null);
        setToken("");
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
      }
    };

    validaTokenLocal();
  }, []);

  const signin = async (email: string, password: string) => {
    const response = await useApi.login(email, password);
   
    if (response?.user && response.token) {
 
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem("usuario", response.user.name);
      localStorage.setItem("token", response.token);
      setLoading(false);
      return true;
    }

    return false;
  };

  const signout = (redirecione = true) => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

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
