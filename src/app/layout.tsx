import type { Metadata } from "next";
import "./globals.css";
import { UsuarioProvider } from "@/contextProvider/userProvider";
import { OrcamentoProvider } from "@/contextProvider/orcamentoProvider";

export const metadata: Metadata = {
  title: "Serviços Sar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="">
      
        <UsuarioProvider>
            <OrcamentoProvider>
       <div className=" flex flex-col">
         {children}
       </div>
       </OrcamentoProvider>
        </UsuarioProvider>
      </body>
    </html>
  );
}
