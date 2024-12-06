import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/theme/Header";

const instrument = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  title: "pizhub",
  description: "pizhub",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${instrument.variable} antialiased`}>
      <body className="relative flex min-h-svh w-full flex-col bg-stone-50 text-stone-900">
        <Header />
        {children}
      </body>
    </html>
  );
}
