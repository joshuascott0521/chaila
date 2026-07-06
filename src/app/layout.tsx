import type { Metadata } from "next";
import { Inter, Great_Vibes } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chaila — Beauty Nails",
  description:
    "Chaila Beauty Nails. Diseños de uñas hechos con detalle, para que tus manos hablen por ti.",
  openGraph: {
    title: "Chaila — Beauty Nails",
    description:
      "Diseños de uñas hechos con detalle, para que tus manos hablen por ti.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${greatVibes.variable} antialiased`}>
      <body className="bg-page text-ink min-h-screen overflow-x-clip">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
