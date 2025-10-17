// src/components/sections/CTA.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

type CardProps = {
  title: string;
  desc: string;
  href: string;
};

function CTACard({ title, desc, href }: CardProps) {
  return (
    <div className="group relative overflow-hidden rounded-sm bg-[#161617] ring-1 ring-white/5 transition-transform duration-300 hover:-translate-y-[2px]">
      <div className="absolute inset-0 pointer-events-none [box-shadow:inset_0_0_80px_rgba(0,0,0,0.35)]" />
      <div className="flex items-start justify-between gap-6 p-8 sm:p-10 lg:p-12">
        <div className="max-w-[46ch]">
          <h3 className="font-serif text-[clamp(18px,2.4vw,24px)] leading-none text-white/95">
            {title}
          </h3>
          <p className="mt-6 text-[13px] leading-[2] tracking-[0.02em] text-white/70 ">
            {desc}
          </p>
        </div>

        <Link
          href={href}
          aria-label={`${title} へ`}
          className="mt-2 inline-flex h-9 w-9 items-center justify-center rounded-sm border border-white/15 text-white/80 transition-colors group-hover:border-white/30 group-hover:text-white"
        >
          {/* アイコンlibが無い場合は → に置き換え */}
          <ArrowRight className="h-4 w-4" />
          {/* <span aria-hidden>→</span> */}
        </Link>
      </div>
    </div>
  );
}

export default function CTA() {
  return (
    <section className="relative isolate w-full bg-black py-10 sm:py-14 lg:py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 sm:gap-8 md:grid-cols-2">
        <CTACard
          title="-Contact"
          href="/"
          desc="課題や要件が曖昧な段階でもかまいません。私たちの視点や経験が役立つことがあれば、どうぞお気軽にご相談ください。"
        />
        <CTACard
          title="-Document download"
          href="/"
          desc="課題や要件が曖昧な段階でもかまいません。私たちの視点や経験が役立つことがあれば、どうぞお気軽にご相談ください。"
        />
      </div>

      {/* セクションの上下を締めるうっすらビネット（任意） */}
      <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_24px_60px_-36px_rgba(0,0,0,0.9),inset_0_-24px_60px_-36px_rgba(0,0,0,0.9)]" />
    </section>
  );
}
