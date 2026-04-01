// src/app/page.tsx
import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Philosophy from "@/components/sections/Philosophy";
import Work from "@/components/sections/Work";
import Project from "@/components/sections/Project";
import Members from "@/components/sections/Members";
import News from "@/components/sections/News"; // ← 修正：正しい import
import CTA from "@/components/sections/CTA";
import BackgroundVideo from "@/components/ui/BackgroundVideo";

export const metadata: Metadata = {
  title: "PUG LLC.",
  description: "Play toward Unknown Germination.",
  openGraph: {
    title: "PUG LLC.",
    description: "Play toward Unknown Germination.",
    url: "https://pug-cs.com/",
    type: "website",
    // 画像は layout の既定（/images/OGP.png）を継承
  },
};

export default function Page() {
  return (
    <main className="relative isolate min-h-screen w-full overflow-hidden">
      {/* 共通背景レイヤー（HeroとPhilosophyで共有） */}
      <BackgroundVideo />

      {/* ほんのり被せるトーン調整レイヤー */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-tr from-white/60 via-white/30 to-transparent backdrop-blur-[1px]" />

      {/* Sections */}
      <Hero />
      <Philosophy />
      <Work />
      <Project />
      <Members />
      <News />
      <CTA />
    </main>
  );
}
