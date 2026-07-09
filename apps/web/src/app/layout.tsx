import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCta from "@/components/StickyMobileCta";

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

const BASE_URL = "https://evida.uk";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Evida — More than a health check",
    template: "%s — Evida",
  },
  description:
    "Your membership to healthier years. Evida unites your blood biomarkers, wearable data and medical history in one place — read by a GP with the time to act on them.",

  applicationName: "Evida",
  keywords: [
    "preventative health",
    "GP consultation",
    "blood test",
    "health membership",
    "lifestyle medicine",
    "wearable data",
    "health check UK",
    "private GP UK",
  ],
  authors: [{ name: "Evida", url: BASE_URL }],
  creator: "Evida",
  publisher: "Evida",

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  openGraph: {
    type: "website",
    locale: "en_GB",
    url: BASE_URL,
    siteName: "Evida",
    title: "Evida — More than a health check",
    description:
      "Your membership to healthier years. Evida unites your blood biomarkers, wearable data and medical history in one place — read by a GP with the time to act on them.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Evida — More than a health check",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Evida — More than a health check",
    description:
      "Your membership to healthier years. Blood biomarkers, wearable data and GP-led prevention — all in one place.",
    images: ["/og-image.png"],
    site: "@evidahealth",
  },

  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-256x256.png", sizes: "256x256", type: "image/png" },
    ],
    apple: [{ url: "/favicon-256x256.png", sizes: "256x256", type: "image/png" }],
    shortcut: "/favicon-32x32.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#216A73",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
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
