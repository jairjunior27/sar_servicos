"use client"
import { User } from "@/type/user";
import { createContext } from "react";

interface userTypeContext {
  user: User | null;
  signin: (email: string, password: string) => Promise <boolean>;
  signup: () => void;
  token: string
  setToken: (token: string) => void
}

export const UserContext = createContext<userTypeContext | undefined>(undefined);
