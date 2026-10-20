import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Comandas digitales",
  description: "Registra pedidos de tu restaurante, síguelos en cocina y cóbralos.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
