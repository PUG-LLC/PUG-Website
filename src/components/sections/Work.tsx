// src/components/sections/Work.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import Caret from "@/components/ui/Caret";

export default function Work() {
  return (
    <section className="relative isolate w-full overflow-hidden">
      {/* 背景トーン（動画の上に薄いグレーをかけて紙面風に） */}
      <div className="absolute inset-0 -z-10 bg-neutral-200/95 backdrop-blur-[1px]" />

      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        {/* Title */}
        <h2 className="text-center font-serif text-[clamp(28px,4.6vw,44px)] leading-none text-[#222]">
          -Work
        </h2>

        {/* Lead paragraph */}
        <p className="mx-auto mt-6 max-w-[760px] text-center text-[13.5px] leading-[2.15] tracking-[0.02em] text-[#333]">
          “Coalis”は、スタートアップエコシステムのさらなる発展と事業会社の次代の
          成長へ向けて、経験豊富なメンバーがそれぞれを最適な形で連携・連合
          （=Coaliation）することを支援するプロジェクトです。次世代の中に芽吹く
          イノベーションの光に対してそれぞれのポテンシャルを引き出す様々な形の
          “連合”を設計／実行まで支援し、事業価値の最大化を目指します。
          <Caret />
        </p>

        {/* Button */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-800/70 px-5 py-2 text-[12.5px] tracking-wide text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
          >
            Project Page
            <span aria-hidden>↗</span>
          </Link>
        </div>

        {/* Work image */}
        <div className="mt-12 overflow-hidden rounded-xl shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)]">
          <div className="relative aspect-[16/9] w-full border border-neutral-300/70 bg-neutral-100">
            {/* <Image
              src="/images/work/hero.jpg"
              alt="Selected works preview"
              fill
              className="object-cover"
              priority
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
