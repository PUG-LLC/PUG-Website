// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-instrument-serif",
});

// ---- site constants ----
const siteUrl = "https://pug-cs.com";
const siteName = "PUG LLC.";
const siteDesc = "Play toward Unknown Germination.";
const ogImage = "/images/OGP.png"; // /public/images/OGP.png（1200x630推奨）

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDesc,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: siteName,
    title: siteName,
    description: siteDesc,
    locale: "ja_JP",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: `${siteName} OGP`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDesc,
    images: [ogImage],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" }, // マルチサイズICO
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#111111" },
      { rel: "manifest", url: "/manifest.webmanifest" }, // Nextのmanifest.tsが自動で /manifest.webmanifest を返します
      // { rel: "shortcut icon", url: "/favicon.ico" },   // 必要なら
      // { rel: "msapplication-TileImage", url: "/mstile-150x150.png" }, // 任意
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#111111",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <head>
        {/* 動画の先読みは初期描画を遅らせる可能性があるため削除 */}
      </head>
      <body className="bg-white font-sans text-black antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
