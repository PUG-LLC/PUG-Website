import type { Metadata } from "next";
import NewsHero from "@/components/sections/news/NewsHero";
import NewsList from "@/components/sections/news/NewsList";
import CTA from "@/components/sections/CTA";
import { getNewsList } from "@/lib/notion/news";

// ISR: 5 分ごとに再生成（Notion を毎リクエスト叩かない）
export const revalidate = 300;

export const metadata: Metadata = {
  title: "News",
  description: "PUG LLC. のお知らせ・最新情報。",
};

export default async function NewsPage() {
  const items = await getNewsList();

  return (
    <main className="min-h-screen bg-[#ebebeb] text-[#1a1a1a]">
      <NewsHero />
      <NewsList items={items} />
      <CTA />
    </main>
  );
}
