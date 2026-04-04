import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "MonoQrome Atelier | Premium Interior Design Studio",
  description:
    "Transforming spaces into extraordinary experiences. MonoQrome Atelier offers premium interior design services for residential and commercial projects.",
  keywords: "MonoQrome Atelier, interior design, luxury design, residential design, commercial design, architecture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${montserrat.variable} font-sans antialiased bg-black text-stone-100`}
      >
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
