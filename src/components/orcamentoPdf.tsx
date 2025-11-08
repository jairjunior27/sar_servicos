import { formatarMoeda } from "@/util/formatMoeda";
import { storageCliente, StorageOrcamento } from "@/util/storage";
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";

type prop = {
  formaDePagamento: string | null;
  logoSelecionado: string | null;
  emissaoOrcamento: string;
  validadeOrcamento: string;

  ultimoNumero: number;
  anoAtual: number;
};

export const OrcamentoPdf = ({
  logoSelecionado,

  formaDePagamento,
  emissaoOrcamento,
  validadeOrcamento,

  ultimoNumero,
  anoAtual,
}: prop) => {
  const orcamento = StorageOrcamento.get();
  const cliente = storageCliente.get();
  const subTotal = orcamento
    .filter((f) => f.total)
    .reduce((acc, item) => (acc += item.total), 0);
  const descontoGeral = orcamento
    .filter((f) => f.desconto)
    .reduce((acc, item) => (acc += item.desconto), 0);

  const totalPagar = subTotal - descontoGeral;
  return (
    <Document>
      <Page size="A4" style={{ padding: 20 }}>
        {logoSelecionado === "JC" && (
          <Image
            src="/assets/logojc.png"
            style={{ width: "100%", height: 170 }}
          />
        )}
        {logoSelecionado === "Jair Junior" && (
          <Image
            src="/assets/jairJunior.png"
            style={{ width: "100%", height: 170 }}
          />
        )}
        {logoSelecionado === "Sar" && (
          <Image
            src="/assets/sistemaSar.png"
            style={{ width: "100%", height: 170 }}
          />
        )}
        {logoSelecionado === "Rádio Novo Dial" && (
          <Image
            src="/assets/novoDial.png"
            style={{ width: "100%", height: 170 }}
          />
        )}
        {logoSelecionado === "Rádio Sintonia" && (
          <Image
            src="/assets/radioSintonia.png"
            style={{ width: "100%", height: 170 }}
          />
        )}
        {logoSelecionado === "Rádio Uruguai" && (
          <Image
            src="/assets/radioUruguai.png"
            style={{ width: "100%", height: 170 }}
          />
        )}
        {logoSelecionado === "Christian Cesar" && (
          <Image
            src="/assets/christianCezar.png"
            style={{ width: "100%", height: 170 }}
          />
        )}
        {logoSelecionado === "Cesar Augusto" && (
          <Image
            src="/assets/cesarAugusto.png"
            style={{ width: "100%", height: 170 }}
          />
        )}
        <Text
          style={{
            textAlign: "center",

            fontSize: 16,
            marginBottom: 20,
          }}
        >
          Orçamento Nº {ultimoNumero < 100 ? `00${ultimoNumero}` : ultimoNumero}{" "}
          | {anoAtual}{" "}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 10,
          }}
        >
          <Text style={{ fontSize: 10 }}>Emitido: {emissaoOrcamento}</Text>
          <View
            style={{ flexDirection: "row", alignItems: "center", fontSize: 10 }}
          >
            <Text>Validade: </Text>
            <Text
              style={{
                color: "#ff0000",
              }}
            >
              {validadeOrcamento}
            </Text>
          </View>
        </View>

        <View
          style={{
            marginBottom: 10,
            borderTop: 2,
            borderBottom: 2,
            paddingVertical: 10,
          }}
          key={cliente?.id}
        >
          <Text style={{ fontSize: 12, marginBottom: 4, textAlign: "center" }}>
            Dados do Cliente:
          </Text>
          <View
            style={{
              flexDirection: "row",
              fontSize: 11,
              flexWrap: "wrap",
              marginBottom: 3,
              alignItems: "center",
            }}
          >
            <Text>Cliente:</Text>
            <Text style={{ fontWeight: "bold", marginHorizontal: 3 }}>
              {cliente?.nome}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              fontSize: 11,
              flexWrap: "wrap",
              marginBottom: 3,
              alignItems: "center",
            }}
          >
            <Text>Telefone:</Text>
            <Text style={{ fontWeight: "bold", marginHorizontal: 3 }}>
              {" "}
              {cliente?.telefone}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              fontSize: 11,
              flexWrap: "wrap",
              marginBottom: 3,
              alignItems: "center",
            }}
          >
            <Text>Email:</Text>
            <Text style={{ fontWeight: "bold", marginHorizontal: 3 }}>
              {cliente?.email}
            </Text>
          </View>
        </View>

        <View
          style={{
            textAlign: "center",

            fontSize: 11,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: 2,
            paddingBottom: 10,
            marginBottom: 7,
          }}
        >
          <Text>Forma de Pagamento:</Text>
          <Text style={{ fontWeight: "bold" }}> {formaDePagamento}</Text>
        </View>

        {orcamento.map((item, index) => (
          <View key={item.id} style={{ marginBottom: 10 }}>
            <Text
              style={{ fontSize: 10, marginBottom: 10, fontWeight: "bold" }}
            >
              Item {index + 1 < 10 ? `0${index + 1}` : index + 1}:
            </Text>
            <View
              style={{
                fontSize: 10,
                marginBottom: 5,
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Text>Serviço:</Text>
              <Text style={{ fontWeight: "bold", marginHorizontal: 3 }}>
                {item.servico.toUpperCase()}
              </Text>
            </View>
            <View
              style={{
                fontSize: 10,
                marginBottom: 5,
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Text> Descrição:</Text>
              <Text style={{ fontWeight: "bold", marginHorizontal: 3 }}>
                {item.descricao.toUpperCase()}
              </Text>
            </View>
            <View
              style={{
                fontSize: 10,
                marginBottom: 5,
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Text>Valor Unitário:</Text>
              <Text style={{ fontWeight: "bold", marginHorizontal: 3 }}>
                {formatarMoeda(item.valor)}
              </Text>
            </View>
            <View
              style={{
                fontSize: 10,
                marginBottom: 5,
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Text>Quantidade:</Text>
              <Text style={{ fontWeight: "bold", marginHorizontal: 3 }}>
                {item.quantidade}
              </Text>
            </View>
            <View
              style={{
                fontSize: 10,
                marginBottom: 5,
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Text>Valor Total:</Text>
              <Text style={{ fontWeight: "bold", marginHorizontal: 3 }}>
                {formatarMoeda(item.total)}
              </Text>
            </View>
            <View
              style={{
                fontSize: 10,
                marginBottom: 5,
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Text>Desconto:</Text>
              <Text style={{ fontWeight: "bold", marginHorizontal: 3 }}>
                {formatarMoeda(item.desconto)}
              </Text>
            </View>
            <View
              style={{
                fontSize: 10,
                marginBottom: 5,
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Text>Sub-Total:</Text>
              <Text
                style={{
                  fontWeight: "bold",
                  marginHorizontal: 3,
                  marginBottom: 7,
                }}
              >
                {formatarMoeda(item.total - item.desconto)}
              </Text>
            </View>
          </View>
        ))}

        <Text
          style={{
            textAlign: "right",
            fontSize: 10,
            marginTop: 30,
            marginBottom: 8,
          }}
        >
          Total de Itens:{" "}
          {orcamento.length < 10 ? `0${orcamento.length}` : orcamento.length}
        </Text>

        <View
          style={{
            textAlign: "right",

            borderTop: 2,
            paddingTop: 10,
          }}
        >
          <View style={{ flexDirection: "row", marginBottom: 5, fontSize: 11 }}>
            <Text>Sub-Total Geral:</Text>
            <Text style={{ fontWeight: "bold", marginHorizontal: 3 }}>
              {formatarMoeda(subTotal)}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 5, fontSize: 11 }}>
            <Text>Desconto Geral:</Text>
            <Text style={{ fontWeight: "bold", marginHorizontal: 3 }}>
              {formatarMoeda(descontoGeral)}
            </Text>
          </View>

          <Text style={{ fontWeight: "bold", fontSize: 14 }}>
            Total a Pagar: {formatarMoeda(totalPagar)}
          </Text>
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
