import { DadosMensal } from "@/util/dadosMensal";
import { Formatdata } from "@/util/formatedata";
import { formatarMoeda } from "@/util/formatMoeda";
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import { useEffect, useState } from "react";

type prop = {
  valor: number;
  importancia: string;
  empresa: string;
  referencia: string;
  data: string;
  selecionado: string;
};
export const ReciboPdf = ({
  valor,
  importancia,
  empresa,
  referencia,
  data,
  selecionado,
}: prop) => {
  const dadosMes = Formatdata(data);
  const [dia, mes, ano] = dadosMes.split("/");
  const [numeroAtual, setNumeroAtual] = useState(0);
  const dataModificada = `${dia} de ${DadosMensal[Number(mes) - 1]} / ${ano}`;

  useEffect(() => {
    const dados = localStorage.getItem("ultimo");
    setNumeroAtual(Number(dados));
  }, []);
  return (
    <Document>
      <Page size="A4" style={{ padding: 20 }}>
        {selecionado === "Rádio Novo Dial" && (
          <Image
            src="/assets/novoDial.png"
            style={{ width: "100%", height: 170 }}
          />
        )}

        {selecionado === "Rádio Uruguai" && (
          <Image
            src="/assets/radioUruguai.png"
            style={{ width: "100%", height: 170 }}
          />
        )}
        {selecionado === "Rádio Sintonia" && (
          <Image
            src="/assets/radioSintonia.png"
            style={{ width: "100%", height: 170 }}
          />
        )}
        {selecionado === "Sar" && (
          <Image
            src="/assets/sistemaSar.png"
            style={{ width: "100%", height: 170 }}
          />
        )}
        {selecionado === "JC" && (
          <Image
            src="/assets/logojc.png"
            style={{ width: "100%", height: 170 }}
          />
        )}
        {selecionado === "Jair Junior" && (
          <Image
            src="/assets/jairJunior.png"
            style={{ width: "100%", height: 130 }}
          />
        )}

        {selecionado === "Christian Cezar" && (
          <Image
            src="/assets/christianCezar.png"
            style={{ width: "100%", height: 170 }}
          />
        )}
        {selecionado === "Cesar Augusto" && (
          <Image
            src="/assets/cesarAugusto.png"
            style={{ width: "100%", height: 170 }}
          />
        )}

        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 17,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Recibo
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Text
              style={{ fontSize: 12, fontWeight: "bold", marginBottom: 10 }}
            >
              Nº {numeroAtual < 100 ? `00${numeroAtual}` : numeroAtual}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                marginBottom: 10,
                marginRight: 20,
              }}
            >
              Valor {formatarMoeda(valor)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "bold", marginRight: 7 }}>
              Recebemos do Sr(a):
            </Text>
            <Text
              style={{
                borderBottom: 1,

                paddingBottom: 1,
                flex: 1,
                fontSize: 9,
              }}
            >
              {empresa.toUpperCase()}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "bold", marginRight: 7 }}>
              a quantia de:
            </Text>

            {
              <Text
                style={{
                  borderBottom: 1,

                  paddingBottom: 1,
                  flex: 1,
                  fontSize: 9,
                }}
              >
                {importancia.toUpperCase()}
              </Text>
            }
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "bold", marginRight: 7 }}>
              Referente a:
            </Text>
            <Text
              style={{
                borderBottom: 1,

                paddingBottom: 1,
                flex: 1,
                fontSize: 9,
              }}
            >
              {referencia.toUpperCase()}
            </Text>
          </View>

          <View>
            <Text style={{ fontSize: 12, marginTop: 40 }}>
              Salvador , {dataModificada}
            </Text>
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-end",
                width: "100%",
                marginTop: 40,
              }}
            >
              <View
                style={{
                  width: 300,
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {selecionado === "JC" && (
                  <>
                    <Image
                      src="/assets/assinJc.png"
                      style={{ width: "100%", height: 40, borderBottom: 1 }}
                    />
                    <Text style={{ marginTop: 1, fontSize: 11 }}>
                      Jair Cezar Lima ( Diretor e Locutor )
                    </Text>
                  </>
                )}
                {selecionado === "Sar" && (
                  <>
                    <Image
                      src="/assets/assinJc.png"
                      style={{ width: "100%", height: 40, borderBottom: 1 }}
                    />
                    <Text style={{ marginTop: 1, fontSize: 11 }}>
                      Jair Cezar Lima ( Diretor e Locutor )
                    </Text>
                  </>
                )}
                {selecionado === "Rádio Novo Dial" && (
                  <>
                    <Image
                      src="/assets/assinJc.png"
                      style={{ width: "100%", height: 40, borderBottom: 1 }}
                    />
                    <Text style={{ marginTop: 1, fontSize: 11 }}>
                      Jair Cezar Lima ( Diretor e Locutor )
                    </Text>
                  </>
                )}
                {selecionado === "Rádio Uruguai" && (
                  <>
                    <Image
                      src="/assets/assinJc.png"
                      style={{ width: "100%", height: 40, borderBottom: 1 }}
                    />
                    <Text style={{ marginTop: 1, fontSize: 11 }}>
                      Jair Cezar Lima ( Diretor e Locutor )
                    </Text>
                  </>
                )}
                {selecionado === "Rádio Sintonia" && (
                  <>
                    <Image
                      src="/assets/assinJc.png"
                      style={{ width: "100%", height: 40, borderBottom: 1 }}
                    />
                    <Text style={{ marginTop: 1, fontSize: 11 }}>
                      Jair Cezar Lima ( Diretor e Locutor )
                    </Text>
                  </>
                )}
                {selecionado === "Jair Junior" && (
                  <>
                    <Image
                      src="/assets/assinJr.png"
                      style={{ width: "100%", height: 40, borderBottom: 1 }}
                    />
                    <Text style={{ marginTop: 1, fontSize: 11 }}>
                      Jair Cezar Junior ( Produtor e Musico )
                    </Text>
                  </>
                )}
                {selecionado === "Cesar Augusto" && (
                  <>
                    <Image
                      src="/assets/assinCesar.png"
                      style={{ width: "100%", height: 40, borderBottom: 1 }}
                    />
                    <Text style={{ marginTop: 1, fontSize: 11 }}>
                      Cezar Augusto ( Locutor e Vendedor )
                    </Text>
                  </>
                )}
                {selecionado === "Christian Cezar" && (
                  <>
                    <Image
                      src="/assets/assinChristian.png"
                      style={{ width: "100%", height: 40, borderBottom: 1 }}
                    />
                    <Text style={{ marginTop: 1, fontSize: 11 }}>
                      Christian Cezar ( Locutor e Apresentador de eventos )
                    </Text>
                  </>
                )}
              </View>
            </View>
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
