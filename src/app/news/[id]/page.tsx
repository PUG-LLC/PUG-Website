import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/sections/CTA";
import NotionRenderer from "@/components/notion/NotionRenderer";
import { getNewsBySlug, getNewsSlugs } from "@/lib/notion/news";

// 注: ルートフォルダ名は既存の [id] のまま（URL 互換のため）。値は slug を表す。
export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getNewsSlugs();
  return slugs.map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = await getNewsBySlug(id);
  if (!data) return { title: "News" };
  return {
    title: data.item.title,
    description: data.item.excerpt || undefined,
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getNewsBySlug(id);

  if (!data) {
    notFound();
  }

  const { item, blocks } = data;
  const hasBody = blocks.length > 0;
  // Notion 運用ではページ本文ブロックを使わず Excerpt に全文を入れているため、
  // ブロックが無い場合は 静的content → Excerpt の順でフォールバックする。
  const bodyText = item.content ?? item.excerpt;

  return (
    <main className="min-h-screen bg-[#ebebeb] text-[#1a1a1a]">
      <article className="mx-auto max-w-5xl px-6 pt-32 lg:pt-48 pb-32 lg:pb-48">
        {/* Breadcrumb */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-[12px] tracking-widest text-[#666] hover:opacity-50 transition-opacity mb-16 lg:mb-24"
        >
          ← News
        </Link>

        {/* Header */}
        <header className="mb-12 lg:mb-16">
          <h1 className="text-[clamp(24px,4vw,40px)] font-medium leading-[1.4] tracking-tight mb-4 [font-feature-settings:'palt']">
            {item.title}
          </h1>
          <div className="flex items-center gap-4 text-[12px] font-medium tracking-widest text-[#666]">
            <span>{item.date}</span>
            <span className="opacity-40">{item.category}</span>
          </div>
        </header>

        {/* Main Image */}
        {item.mainImage && (
          <div className="relative aspect-[16/9] w-full overflow-hidden mb-16 lg:mb-24">
            <Image
              src={item.mainImage}
              alt={item.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        )}

        {/* Content: Notion 本文があれば NotionRenderer、無ければ静的テキスト */}
        <div className="max-w-4xl mx-auto">
          {hasBody ? (
            <NotionRenderer blocks={blocks} />
          ) : bodyText ? (
            <div className="text-[15px] lg:text-[16px] leading-[2.4] text-[#333] [font-feature-settings:'palt'] tracking-wide whitespace-pre-wrap">
              {bodyText}
            </div>
          ) : null}
        </div>
      </article>

      <CTA />
    </main>
  );
}
