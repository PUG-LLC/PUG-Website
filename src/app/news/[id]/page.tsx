"use client";

import { useParams, notFound } from "next/navigation";
import { NEWS_ITEMS } from "@/config/news";
import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/sections/CTA";

export default function NewsDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const item = NEWS_ITEMS.find((n) => n.id === id);

  if (!item) {
    notFound();
  }

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
            />
          </div>
        )}

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div 
            className="text-[15px] lg:text-[16px] leading-[2.4] text-[#333] [font-feature-settings:'palt'] tracking-wide whitespace-pre-wrap"
          >
            {item.content}
          </div>
        </div>
      </article>

      <CTA />
    </main>
  );
}
