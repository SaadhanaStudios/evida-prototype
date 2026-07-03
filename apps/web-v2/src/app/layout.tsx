import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCta from "@/components/StickyMobileCta";

// Inter carries the UI; Fraunces carries the editorial voice
// (headlines + pull-quotes) — the magazine feel from the July 3 review.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: {
    default: "Evida — More than a health check",
    template: "%s — Evida",
  },
  description:
    "Your membership to healthier years. Evida unites your blood biomarkers, wearable data and medical history in one place — read by a GP with the time to act on them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyMobileCta />
      </body>
    </html>
  );
}
