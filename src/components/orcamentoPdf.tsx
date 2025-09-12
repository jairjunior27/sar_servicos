import { Document, Image, Page, Text, View } from "@react-pdf/renderer";

type prop = {
  cliente: string
  telefone: string
  descricao: string
  servico: string
  valor: number
  quantidade: number
  formaDePagamento: string | null
  data: string
  valorDesconto: number
  checkImagem: boolean
};

export const OrcamentoPdf = ({checkImagem, cliente,telefone,descricao,
  servico,valor,quantidade,formaDePagamento,data,valorDesconto}: prop) => {
  return (
    <Document>
      <Page size="A4" style={{ padding: 20 }}>
       
        
        
        <Text
          render={({ pageNumber, totalPages }) => `${pageNumber}/${totalPages}`}
          style={{
            position: "absolute",
            fontSize: 11,
            padding: 10,
            left: 0,
            right: 0,
            bottom: 0,
            textAlign: "center",
            color: "gray",
          }}
        ></Text>
      </Page>
    </Document>
  );
};
