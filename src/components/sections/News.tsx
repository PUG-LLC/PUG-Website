// src/components/sections/.tsx
"use client";

import Link from "next/link";
import Caret from "../ui/Caret";

type NewsItem = {
  id: string;
  title: string;
  date: string;
  category: string;
  href: string;
};

const NEWS_LIST: NewsItem[] = [
  {
    id: "1",
    title: "ALUAから新ブランド『叙事譚院』が登場",
    date: "2025/10/9",
    category: "ALUA",
    href: "//alua-brand",
  },
  {
    id: "2",
    title: "株式会社ZENと業務提携を開始",
    date: "2025/10/9",
    category: "Office",
    href: "//zen-partnership",
  },
  {
    id: "3",
    title: "映画『SENSEKI』新ポスターデザインが公開",
    date: "2025/10/9",
    category: "PUG Creative Studio",
    href: "//senseki-poster",
  },
];

export default function News() {
  return (
    // 背景色をやや明るいグレイに（参考画像寄せ）
    <section className="relative isolate w-full overflow-hidden bg-[#ECEFF1] text-[#111]">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-12 px-6 py-16 md:flex-row md:gap-16 md:py-20">
        {/* Left column */}
        <div className="w-full max-w-[520px]">
          <h2 className="font-serif text-[clamp(28px,4.6vw,44px)] leading-none text-[#111]/90">
            -News
          </h2>
          <p className="mt-5 text-[13.5px] leading-[2.1] tracking-[0.02em] text-[#111]/70">
            Coalisは、ファイナンシャルアドバイザリーサービス（FAS）やグローズバイアウトファンドを通じ、
            スタートアップエコシステムの深化に貢献し、日本における新しい産業の成長（グロース）を支援します。
            <Caret />
          </p>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-[#111]/30 px-5 py-2 text-[12.5px] tracking-wide text-[#111]/90 transition-colors hover:bg-[#111] hover:text-white focus:outline-none focus:ring-2 focus:ring-black/20"
            >
              News Page <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>

        {/* Right column */}
        <div className="w-full max-w-[720px]">
          <ul className="border-t border-[#111]/20">
            {NEWS_LIST.map((n, i) => (
              <li
                key={n.id}
                className="group border-b border-[#111]/20 py-6 md:py-7"
              >
                <Link
                  href={n.href}
                  className="block focus:outline-none focus:ring-2 focus:ring-black/20 rounded-sm"
                >
                  {/* ホバーで薄く半透明になる（“スッ”と引く） */}
                  <p className="text-[15px] font-medium tracking-tight text-[#111] transition-opacity duration-200 group-hover:opacity-70">
                    {n.title}
                  </p>
                  <p className="mt-2 text-[12px] text-[#111]/55 transition-opacity duration-200 group-hover:opacity-60">
                    {n.date} <span className="mx-2">|</span> {n.category}
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
