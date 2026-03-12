"use client";

import Image from "next/image";

export default function TeamHero() {
  return (
    <section className="pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 mb-16 lg:mb-24">
        <h1 className="font-serif text-[clamp(60px,10vw,120px)] leading-none">
          Team
        </h1>
      </div>
      
      <div className="flex flex-col lg:flex-row items-stretch">
        <div className="w-full lg:w-1/2 px-6 lg:pl-[calc(max(1.5rem,calc((100vw-80rem)/2+1.5rem)))] lg:pr-24 mb-12 lg:mb-0">
          <div className="space-y-8 max-w-xl">
            <p className="text-[15px] lg:text-[16px] leading-[2] [font-feature-settings:'palt'] tracking-wide">
              つくることを通して、世の中に素敵な瞬間を増やしていきます。
              テキストテキストテキストテキストテキストテキスト
            </p>
            <p className="text-[14px] lg:text-[15px] leading-[2.2] text-[#666] [font-feature-settings:'palt'] whitespace-pre-wrap">
              テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            </p>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2">
          <div className="relative aspect-[16/9] lg:h-full w-full overflow-hidden grayscale">
            <Image
              src="/images/team/taichi_suwa_message.png"
              alt="PUG Team"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
