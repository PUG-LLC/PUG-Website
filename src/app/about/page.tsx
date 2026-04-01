// src/app/about/page.tsx
import type { Metadata } from "next";
import AboutHero from "@/components/sections/about/AboutHero";
import Message from "@/components/sections/about/Message";
import Service from "@/components/sections/about/Service";
import Company from "@/components/sections/about/Company";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "About",
  description:
    "PUG LLC.について。代表メッセージ、サービス内容、会社概要をご覧いただけます。",
};

export default function AboutPage() {
  return (
    <main className="relative isolate min-h-screen w-full overflow-hidden bg-[#ebebeb]">
      {/* About特有の静かな背景トーン */}
      <div className="fixed inset-0 -z-10 bg-neutral-100/50" />

      {/* 各セクション */}
      <AboutHero />
      <Message />
      <Service />
      <Company />

      {/* 共通CTA */}
      <CTA />
    </main>
  );
}
