import { userLoginType, validaTokenLogin } from "@/type/user";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const useApi = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post<userLoginType>("/login", {
        email,
        password,
      });
      if (response) {
        return response.data;
      }
    } catch (e) {
      console.log("Erro ao executar o login", e);
    }
  },

  validateToken: async (token: string) => {
   
    try {
       const headers = { Authorization: `Bearer ${token}` };
    const response = await api.post<validaTokenLogin>("/validatetoken",{}, {
      headers,
    });
      if (response) {
        return response.data;
      }
    } catch (e) {
      console.log("Erro ao validar token", e);
    }
  },
};
