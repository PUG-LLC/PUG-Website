"use client";

import React from "react";
import Caret from "@/components/ui/Caret";

export default function Hero() {
  return (
    <section className="relative z-10 isolate h-dvh w-full overflow-hidden bg-transparent">
      {/* コンテンツ */}
      <div className="relative mx-auto flex h-full max-w-7xl items-end px-4 pt-20 pb-12 sm:px-6 sm:pt-28 sm:pb-20 lg:px-8 lg:pt-32 lg:pb-28">
        <div className="max-w-[900px]">
          {/* 英文コピー（Instrument Serif） */}
          <div className="font-serif text-balance text-[clamp(32px,7vw,86px)] leading-[1.05] tracking-[-0.01em] text-black">
            <h1>Play toward</h1>
            <h1>Unknown Germination.</h1>
          </div>

          {/* 日本語コピー（Inter） + カーソル */}
          <p className="mt-4 sm:mt-6 text-[clamp(12px,1.8vw,14px)] font-sans font-bold leading-[1.3] tracking-[0.08em] text-black/90">
            <span className="inline-flex items-stretch align-baseline">
              挑し、芽吹く。
              <Caret />
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
