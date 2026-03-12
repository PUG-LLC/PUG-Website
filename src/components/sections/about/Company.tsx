"use client";

import { motion } from "framer-motion";

const companyInfo = [
  { label: "会社名", value: "合同会社PUG" },
  { label: "設立日", value: "2026年1月?日" },
  { label: "代表者", value: "諏訪 太一" },
  {
    label: "事業所",
    value: "〒150-0041\n東京都渋谷区神南1-11-4 FPGリンクス神南 5F",
  },
  {
    label: "事業案内",
    value: "・ブランド戦略設計\n・クリエイティブ制作\n・コンテンツ企画",
  },
];

export default function Company() {
  return (
    <section className="relative py-24 lg:py-48 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-16">
        {/* Section Title */}
        <div className="flex flex-col gap-4 mb-20">
          <h2 className="font-serif text-[clamp(28px,4.5vw,44px)] font-normal leading-none text-[#1a1a1a]">
            -Company
          </h2>
          <p className="text-[12px] tracking-[0.2em] text-[#666] uppercase font-medium">
            会社概要
          </p>
        </div>

        <motion.div
          className="max-w-4xl border-t border-black/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <dl className="divide-y divide-black/10">
            {companyInfo.map((info, i) => (
              <div
                key={i}
                className="grid grid-cols-1 sm:grid-cols-[200px_1fr] py-10 gap-x-12 gap-y-4"
              >
                <dt className="text-[11px] font-bold tracking-[0.2em] text-[#888] uppercase self-start pt-1">
                  {info.label}
                </dt>
                <dd className="text-[14.5px] leading-relaxed text-[#111] whitespace-pre-wrap tracking-wide [font-feature-settings:'palt']">
                  {info.value}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
