export const formatarNumeros = (valor: string) => {
  let apenasNumeros = valor.replace(/\D/g, "");

  if (apenasNumeros.length > 11) {
    apenasNumeros = apenasNumeros.slice(0, 11);
  }


  if (apenasNumeros.length <= 2) {
    return `(${apenasNumeros}`;
  }


  if (apenasNumeros.length <= 7) {
    return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2)}`;
  }


  return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(
    2,
    apenasNumeros.length - 4
  )}-${apenasNumeros.slice(apenasNumeros.length - 4)}`;
};
