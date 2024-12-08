import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
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
    <html
      lang="it"
      className={`${instrument.variable} scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="relative">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Header />
            <main className="mb-14 mt-14 p-5">{children}</main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
