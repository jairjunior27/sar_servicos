import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/authContextProvider/authProvider";

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
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
