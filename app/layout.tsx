import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Cambiamos el título y descripción aquí para que aparezcan en la pestaña
export const metadata: Metadata = {
  title: "Auxiliar Contable - Entrenamiento En Vivo | CEFIN",
  description: "Entrenamiento gratuito para auxiliares contables con el Mtro. Alfredo Cobos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es" // Cambié "en" a "es" por ser contenido en español
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}