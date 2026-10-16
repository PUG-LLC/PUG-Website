// src/components/sections/News.tsx
"use client";

import Link from "next/link";
import Caret from "../ui/Caret";
import { ArrowUpRight } from "lucide-react";
import type { NewsItem } from "@/lib/content/types";

export default function News({ items }: { items: NewsItem[] }) {
  // 表示件数は呼び出し側（getNewsForHome）で制御済み
  const displayNews = items;

  return (
    <section className="relative isolate w-full overflow-hidden bg-[#ECEFF1] text-[#111]">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-12 px-6 py-16 md:flex-row md:gap-16 md:py-20">
        {/* Left column */}
        <div className="w-full max-w-[520px]">
          <h2 className="font-serif text-[clamp(28px,4.6vw,44px)] leading-none text-[#111]/90">
            -News
          </h2>
          <p className="pt-1 text-[13px] tracking-[0.2em] text-[#111]/90 uppercase">
            お知らせ
          </p>
          <p className="mt-5 text-[13.5px] leading-[2.1] tracking-[0.02em] text-[#111]/70 ">
            PUG LLC.は
            <span className="font-medium">
              “Play toward Unknown Germination”
            </span>
            を掲げ、ブランドの芽を見つけて育てるデザインチームです。
            戦略・体験・ビジュアルを横断して連携（Creative Coalition）し、
            組織やプロジェクトのポテンシャルを引き出す成果にこだわります。
            最新の取り組みや制作事例は本ページで随時更新していきます。
            <Caret />
          </p>

          <div className="mt-8">
            <Link
              href={"/news"}
              prefetch={false}
              className="inline-flex items-center gap-2 rounded-full border border-[#111]/30 px-5 py-2 text-[12.5px] tracking-wide text-[#111]/90 transition-colors hover:bg-[#111] hover:text-white focus:outline-none focus:ring-2 focus:ring-black/20"
            >
              View all news
              <ArrowUpRight
                size={16} // or 18
                strokeWidth={1.75}
                aria-hidden="true"
                className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>

        {/* Right column */}
        <div className="w-full max-w-[720px]">
          <ul className="border-t border-[#111]/20">
            {displayNews.map((n) => (
              <li
                key={n.id}
                className="group border-b border-[#111]/20 py-6 md:py-7"
              >
                <Link
                  href={`/news/${n.slug}`}
                  className="block rounded-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                >
                  <p className="text-[15px] font-medium tracking-tight text-[#111] transition-opacity duration-200 group-hover:opacity-80 ">
                    {n.title}
                  </p>
                  <p className="mt-2 text-[12px] text-[#111]/55 transition-opacity duration-200 group-hover:opacity-70 ">
                    <time dateTime={n.date.replaceAll("/", "-")}>{n.date}</time>
                    <span className="mx-2 ">|</span>
                    {n.category}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
