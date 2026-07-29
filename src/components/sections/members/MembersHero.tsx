"use client";

import Image from "next/image";

export default function MembersHero() {
  return (
    <section className="relative pt-24 pb-24 lg:pt-32 lg:pb-32 overflow-hidden bg-[#ebebeb] text-[#333]">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Title */}
        <div className="mb-12 lg:mb-16">
          <h1 className="font-serif text-[clamp(64px,12vw,140px)] leading-[1.1] tracking-tight">
            Members
          </h1>
        </div>

        {/* Main Visual */}
        <div className="relative w-full aspect-[2/1] bg-gray-200 overflow-hidden mb-12 lg:mb-16">
          <Image
            src="/images/members/team01.png"
            alt="PUG Members"
            fill
            priority
            className="object-cover"
          />
          {/* Centered Caption */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-sm lg:text-lg font-medium tracking-[0.1em] flex items-center gap-1 drop-shadow-md">
              Play toward Unknown Germination.
              <span className="w-[2px] h-4 lg:h-5 bg-red-600 animate-caret" />
            </h2>
          </div>
        </div>

        {/* Description Text (2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-0">
          <div className="lg:pr-12">
            <p className="text-[14px] lg:text-[15px] leading-[2] [font-feature-settings:'palt'] tracking-wide"></p>
          </div>
          <div className="mt-8 lg:mt-0">
            <p className="text-[14px] lg:text-[15px] leading-[1.8] text-[#333] [font-feature-settings:'palt'] opacity-80 break-words">
              クリエイティブディレクター、デザイナー、エンジニア、映像制作者などで構成され、
              ブランディング、Web、映像、アプリ開発など複数領域に対応しています。
              プロジェクトごとに最適なチームを編成し、クライアントのフェーズや課題に応じて体制を設計。
              外部パートナーとも連携しながら、戦略設計から制作・運用まで一貫して対応します。
              ハードを掘り下げ、文脈に則した持続的なクリエイションを打つ。
              それがPUGの基本姿勢です。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
