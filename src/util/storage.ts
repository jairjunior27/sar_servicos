import { clientType } from "@/type/clienteType";
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
    localStorage.setItem("orcamento", JSON.stringify(orcamento));
  },
  remove: (id: string | number) => {
    const data = StorageOrcamento.get();
    const update = data.filter((f) => f.id !== id);
    StorageOrcamento.set(update);
  },
};

export const storageCliente = {
  get: () => {
    const data = localStorage.getItem("cliente");
    if (!data) return null;
    try {
      return JSON.parse(data) as clientType;
    } catch (e) {
      return null;
    }
  },
  set: (cliente: clientType) => {
    localStorage.setItem("cliente", JSON.stringify(cliente));
  },
};
