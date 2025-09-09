export const StorageLista = {
  get: () => {
    return JSON.parse(localStorage.getItem("lista") || "[]");
  },
  set: (lista: string[]) => {
    localStorage.setItem("lista", JSON.stringify(lista));
  },
};

