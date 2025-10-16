// src/app/page.tsx
import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Philosophy from "@/components/sections/Philosophy";
import Work from "@/components/sections/Work";
import Project from "@/components/sections/Project";
import Team from "@/components/sections/Team"; // ← 修正：正しい import
import News from "@/components/sections/News"; // ← 修正：正しい import
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "PUG Creative Studio",
  description: "Play toward Unknown Germination.",
  openGraph: {
    title: "PUG Creative Studio",
    description: "Play toward Unknown Germination.",
    url: "https://pug-creative-studio.vercel.app/",
    type: "website",
    // 画像は layout の既定（/images/OGP.png）を継承
  },
};

export default function Page() {
  return (
    <main className="relative isolate min-h-screen w-full overflow-hidden">
      {/* 共通背景レイヤー（HeroとPhilosophyで共有） */}
      <video
        className="pointer-events-none fixed inset-0 -z-10 h-full w-full object-cover"
        src="/movies/PUG_HP_bg.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* ほんのり被せるトーン調整レイヤー */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-tr from-white/60 via-white/30 to-transparent backdrop-blur-[1px]" />

      {/* Sections */}
      <Hero />
      <Philosophy />
      <Work />
      <Project />
      <Team />
      <News />
      <CTA />
    </main>
  );
}
