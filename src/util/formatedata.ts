export const Formatdata = (d: string) => {
  const [ano, mes, dia] = d.split("-");
  return `${dia}/${mes}/${ano}`;
};
