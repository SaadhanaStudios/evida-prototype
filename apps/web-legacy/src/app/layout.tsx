import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";
import "@/styles/evida.css";
import "@/styles/interactions.css";

const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-geist",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Evida",
  description:
    "Evida brings together your data, technology, and clinical expertise in a GP-led health check so that you can take action for a healthier you.",
  icons: {
    icon: "/assets/69cb2ba27042ece99a236722/69cbec139b02d284b660d451_Favicon%2032%20X%2032.png",
    apple:
      "/assets/69cb2ba27042ece99a236722/69cbec1a9be01c1de3ec35cc_Favicon%20256%20X%20256.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${inter.variable}`}>
      <body className="body">{children}</body>
    </html>
  );
}
