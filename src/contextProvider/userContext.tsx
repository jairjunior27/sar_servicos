import { User } from "@/type/user";
import { createContext } from "react";

interface usuarioContextType {
  user: User | null
  signin: (email: string, password: string) => Promise<boolean>
  signout: () => void
  loading: boolean
  setLoading: (l: boolean) => void
  token: string 
   setToken: (token: string) => void


}

export const UsuarioContext = createContext<usuarioContextType | undefined>(undefined)