// src/components/sections/Philosophy.tsx
"use client";

import React from "react";
import Caret from "../ui/Caret";

export default function Philosophy() {
  return (
    <section className="relative z-10 isolate h-dvh w-full overflow-hidden bg-transparent">
      {/* Hero と同じ横幅・余白を踏襲 */}
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-between px-4 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20 lg:px-8 lg:pt-32 lg:pb-28">
        {/* ===== Title group ===== */}
        <div className="self-start">
          <h2 className="font-serif text-[clamp(40px,6vw,74px)] font-normal leading-none tracking-[-0.01em] text-[#1a1a1a]">
            -Philosophy
          </h2>
        </div>

        {/* ===== Body ===== */}
        <div className="max-w-[900px]">
          <p className="text-[15px] leading-[2.1] tracking-[0.015em] text-[#333]">
            “Coalis”は、スタートアップエコシステムのさらなる発展と事業会社の次代の成長へ向けて、
            経験豊富なメンバーがそれぞれを最適な形で連携・連合（=Coaliation）することを支援するプロジェクトです。
            次世代の中に芽吹くイノベーションの光に対してそれぞれのポテンシャルを引き出す様々な形の“連合”を設計／実行して支援し、
            事業価値の最大化を目指します。
            <span className="align-baseline">
              <Caret />
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
