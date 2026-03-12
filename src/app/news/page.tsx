"use client";

import NewsHero from "@/components/sections/news/NewsHero";
import NewsList from "@/components/sections/news/NewsList";
import CTA from "@/components/sections/CTA";

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-[#ebebeb] text-[#1a1a1a]">
      <NewsHero />
      <NewsList />
      <CTA />
    </main>
  );
}
