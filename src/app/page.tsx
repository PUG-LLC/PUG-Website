// src/app/page.tsx
import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Philosophy from "@/components/sections/Philosophy";
import Work from "@/components/sections/Work";
import Project from "@/components/sections/Project";
import Team from "@/components/sections/News";
import News from "@/components/sections/Team";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "PUG Creative Studio",
  description: "Play toward Unknown Germination.",
  openGraph: {
    title: "PUG Creative Studio",
    description: "Play toward Unknown Germination.",
    url: "https://example.com/",
    type: "website",
  },
  metadataBase: new URL("https://example.com"),
};

export default function Page() {
  return (
    <main className="relative isolate min-h-screen w-full overflow-hidden">
      {/* 共通背景レイヤー（HeroとPhilosophyで共有） */}
      <video
        className="pointer-events-none fixed inset-0 h-full w-full object-cover -z-10"
        src="/movies/PUG_HP_bg.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* ほんのり被せるトーン調整レイヤー（必要に応じて） */}
      <div className="fixed inset-0 bg-gradient-to-tr from-white/60 via-white/30 to-transparent backdrop-blur-[1px] -z-10" />

      {/* HeroとPhilosophyは背景透過 */}
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
