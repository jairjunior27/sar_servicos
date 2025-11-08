import { ContratoType } from "@/type/contratoTYpe";
import { Formatdata } from "@/util/formatedata";
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";

type Props = {
  contrato: ContratoType;
};

export const ContratoPdf = ({ contrato }: Props) => {
  const { logo } = contrato;

  const logoMap: Record<string, string> = {
    "Rádio Novo Dial": "/assets/novoDial.png",
    "Rádio Uruguai": "/assets/radioUruguai.png",
    "Rádio Sintonia": "/assets/radioSintonia.png",
    Sar: "/assets/sistemaSar.png",
    JC: "/assets/logojc.png",
    "Jair Junior": "/assets/jairJunior.png",
    "Christian Cesar": "/assets/christianCezar.png",
    "Cesar Augusto": "/assets/cesarAugusto.png",
  };
  const logoAssinMap: Record<string, string> = {
    "Rádio Novo Dial": "/assets/assinJc.png",
    "Rádio Uruguai": "/assets/assinJc.png",
    "Rádio Sintonia": "/assets/assinJc.png",
    Sar: "/assets/assinJc.png",
    JC: "/assets/assinJc.png",
    "Jair Junior": "/assets/assinJr.png",
    "Cesar Augusto": "/assets/assinCezar.png",
    "Christian Cesar": "/assets/assinChristian.png",
  };

  return (
    <Document>
      <Page size="A4" style={{ padding: 20 }}>
        {logo && logoMap[logo] && (
          <Image src={logoMap[logo]} style={{ width: "100%", height: 170 }} />
        )}

        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: "bold",
            marginBottom: 15,
          }}
        >
          Contrato de Prestação de Serviços
        </Text>

        <View
          style={{
            fontSize: 12,
            marginBottom: 20,
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <Text>
            Pelo presente instrumento particular de contrato, de um lado, como
            Contratante:
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 11,
              marginRight: 2,
              marginHorizontal: 2,
            }}
          >
            {contrato.nomeContratante.toUpperCase()}
          </Text>
          <Text>, portador(a) do CPF</Text>
          <View
            style={{
              fontSize: 11,
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", marginHorizontal: 2 }}>
              {contrato.cpfContratante}
            </Text>
            <Text>e</Text>
            <Text style={{ fontWeight: "bold", marginHorizontal: 2 }}>
              RG {contrato.rgContratante}
            </Text>
          </View>
          <Text>, e de outro lado, como Contratado:</Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 11,
              marginRight: 2,
              marginHorizontal: 2,
            }}
          >
            {contrato.nomeContratado.toUpperCase()}
          </Text>
          <Text>, portador(a) do CPF</Text>
          <View
            style={{
              fontSize: 11,
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", marginHorizontal: 2 }}>
              {contrato.cpfContratado}
            </Text>
            <Text>e</Text>
            <Text style={{ fontWeight: "bold", marginHorizontal: 2 }}>
              RG {contrato.rgContratado}
            </Text>
          </View>

          <Text>, têm entre si justo e contratado o que segue:</Text>
        </View>

        <View style={{ textAlign: "center", marginBottom: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 12, marginBottom: 10 }}>
            Cláusula 1ª - Objeto
          </Text>
          <Text style={{ fontSize: 12 }}>{contrato.servico}</Text>
        </View>

        <View style={{ textAlign: "center", marginBottom: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 12, marginBottom: 10 }}>
            Cláusula 2ª - Descrição
          </Text>
          <Text style={{ fontSize: 12 }}>{contrato.descricao}</Text>
        </View>

        <View style={{ textAlign: "center", marginBottom: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 12, marginBottom: 10 }}>
            Cláusula 3ª - Obrigações
          </Text>
          <View
            style={{
              flexDirection: "row",
              fontSize: 12,
              flexWrap: "wrap",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 7,
            }}
          >
            <Text>O Contratado Sr(a): </Text>
            <Text style={{ fontWeight: "bold" }}>
              {contrato.nomeContratado.toUpperCase()}
            </Text>
            <Text style={{ marginHorizontal: 3 }}>
              {contrato.obrigacaoContratado}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              fontSize: 12,
              flexWrap: "wrap",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>O Contratante Sr(a): </Text>
            <Text style={{ fontWeight: "bold" }}>
              {contrato.nomeContratante.toUpperCase()}
            </Text>
            <Text style={{ marginHorizontal: 3 }}>
              {contrato.obrigacaoContratante}
            </Text>
          </View>
        </View>

        <View style={{ textAlign: "center", marginBottom: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 12, marginBottom: 10 }}>
            Cláusula 4ª - Prazo
          </Text>
          <Text style={{ fontSize: 12 }}>{contrato.prazo}</Text>
        </View>

        <View style={{ textAlign: "center", marginBottom: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 12, marginBottom: 10 }}>
            Cláusula 5ª - Pagamento
          </Text>
          <Text style={{ fontSize: 12 }}>{contrato.pagamento}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 12 }}>Forma de Pagamento escolhida:</Text>
            <Text style={{ fontWeight: "bold", fontSize: 11, marginLeft: 3 }}>
              {contrato.tipoDePagamento}
            </Text>
          </View>
        </View>

        <View style={{ textAlign: "center", marginBottom: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 12, marginBottom: 10 }}>
            Cláusula 6ª - Rescisão
          </Text>
          <Text style={{ fontSize: 12 }}>{contrato.rescisao}</Text>
        </View>

        <View style={{ textAlign: "center", marginBottom: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 12, marginBottom: 10 }}>
            Cláusula 7ª - Foro
          </Text>
          <Text style={{ fontSize: 12 }}>
            Para dirimir quaisquer controvérsias oriundas deste contrato, as
            partes elegem o foro da comarca de Salvador - BA. E por estarem
            assim justos e contratados, firmam o presente instrumento em duas
            vias de igual teor e forma.
          </Text>
          <Text
            style={{ marginVertical: 20, textAlign: "center", fontSize: 11 }}
          >
            Salvador - BA, {Formatdata(contrato.data)}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
            width: "100%",
          }}
        >
          <View style={{ alignItems: "center", marginBottom: 40 }}>
            {logo && logoAssinMap[logo] && (
              <>
                <Image
                  src={logoAssinMap[logo]}
                  style={{ width: 250, height: 40, borderBottom: 1 }}
                />
                <Text
                  style={{ fontSize: 11, textAlign: "center", marginTop: 1 }}
                >
                  {contrato.nomeContratado.toUpperCase()}
                </Text>
              </>
            )}
          </View>

          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Text
              style={{
                fontSize: 11,
                textAlign: "center",
                borderTop: 1,
                paddingTop: 5,
                width: 250,
              }}
            >
              {contrato.nomeContratante.toUpperCase()}
            </Text>
          </View>
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
