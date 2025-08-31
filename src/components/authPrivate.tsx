"use client"
import { UserContext } from "@/authContextProvider/authContext";
import { useRouter } from "next/navigation";
import { ReactNode, useContext, useEffect, useState } from "react";

export const AuthPrivate = ({ children }: { children: ReactNode }) => {
  const auth = useContext(UserContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth === null) {
      const storageToken = localStorage.getItem("token");
      if (!storageToken) {
        router.replace("/");
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [auth?.user, router]);

  if (loading) {
    return <div className="flex items-center justify-center mt-12">Carregando...</div>;
  }

  return <>{children}</>;
};
