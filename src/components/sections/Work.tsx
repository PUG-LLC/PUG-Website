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
        <p className="mx-auto mt-6 max-w-[760px] text-center text-[13.5px] leading-[2.1] tracking-[0.02em] text-[#333]">
          PUG Creative Studioは、
          <span className="font-medium">“Play toward Unknown Germination”</span>
          を合言葉に、ブランドの芽を見つけ、育て、広げるチームです。
          戦略・体験・ビジュアルを横断して連携（Creative Coalition）させ、
          成長のための“手触りのあるデザイン”を提供します。
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
