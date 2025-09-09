import type { Metadata } from "next";
import "./globals.css";
import { UsuarioProvider } from "@/contextProvider/userProvider";

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
       <div className=" flex flex-col">
         {children}
       </div>
        </UsuarioProvider>
      </body>
    </html>
  );
}
