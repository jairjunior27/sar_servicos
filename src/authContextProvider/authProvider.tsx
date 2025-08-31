"use client";

import { ReactNode, useEffect, useState } from "react";
import { UserContext } from "./authContext";
import { User } from "@/type/user";
import { useApi } from "@/utils/useApi";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const validasecretToken = async () => {
      const secret = localStorage.getItem("token");
      if (!secret) return;
      try {
        if (secret) {
          const response = await useApi.validateTokenLogin(secret);
          if (response?.token && response.user) {
            setToken(response.token);
            setUser(response.user);
          } else {
            localStorage.removeItem("token");
          }
        }
      } catch (e) {
        console.log("token invalido", e);
        localStorage.removeItem("token");
      }
    };
    validasecretToken();
  }, []);

  const signin = async (email: string, password: string) => {
    const response = await useApi.signin(email, password);
    if (response?.user && response.token) {
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem("token", response.token);
      return response.success;
    }

    return false;
  };

  const signup = () => {};
  return (
    <UserContext.Provider value={{ signin, signup, user, setToken, token }}>
      {children}
    </UserContext.Provider>
  );
};
