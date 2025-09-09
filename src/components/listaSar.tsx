import { Document, Image, Page, Text, View } from "@react-pdf/renderer";

type prop = {
  nomeLista: string;
  lista: string[];
  tipo: string;
  checkImagem: boolean;
};

export const ListaSar = ({ lista, nomeLista, tipo, checkImagem }: prop) => {
  return (
    <Document>
      <Page size="A4" style={{ padding: 20 }}>
        {checkImagem && (
          <Image
            src="/assets/logojc.png"
            style={{ width:"100%", height: 170, }}
          />
        )}
        <View>
          <Text
            style={{
              marginTop: 10,
              marginBottom: 20,
              textAlign: "center",
              fontSize: 22,
            }}
          >
            {nomeLista}
          </Text>
        </View>
        <View style={{ fontSize: 14, marginBottom: 4, fontWeight: 400 }}>
          {tipo === "numerado"
            ? lista.map((item, index) => (
                <Text key={index}>
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}. {item}
                </Text>
              ))
            : lista.map((item, index) => <Text key={index}>• {item}</Text>)}
        </View>
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
