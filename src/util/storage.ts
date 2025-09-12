import { listaType } from "@/type/lista";
import { orcamentoType } from "@/type/orcamento";

export const StorageLista = {
  get: (): listaType[] => {
    const data = localStorage.getItem("lista");
    if (!data) return [];
    try {
      return JSON.parse(data) as listaType[];
    } catch {
      return [];
    }
  },
  set: (lista: listaType[]) => {
    localStorage.setItem("lista", JSON.stringify(lista));
  },
};

export const StorageOrcamento = {
  get: (): orcamentoType[] => {
    const data = localStorage.getItem("orcamento");
    if (!data) return [];
    try {
      return JSON.parse(data) as orcamentoType[];
    } catch (e) {
      return [];
    }
  },
  set: (orcamento: orcamentoType[]) => {
    localStorage.setItem("orcamento",JSON.stringify(orcamento));
  },
};
