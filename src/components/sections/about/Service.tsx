"use client";

import { motion } from "framer-motion";

const services = [
  {
    category: "ブランド戦略設計",
    items: ["コンセプト設計", "ブランド構築"],
  },
  {
    category: "クリエイティブ制作",
    items: [
      "Web制作",
      "DTP制作",
      "コピーライティング",
      "アプリケーション開発",
      "映像制作",
      "3Dモデル制作",
      "スチール撮影",
      "空間デザイン設計",
    ],
  },
  {
    category: "コンテンツ企画",
    items: ["アプリケーション開発", "IP開発", "自社プロダクト開発"],
  },
];

export default function Service() {
  return (
    <section className="relative overflow-hidden bg-transparent">
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-16 text-[#1a1a1a]">
        {/* Section Title */}
        <div className="flex flex-col gap-4 mb-16">
          <h2 className="font-serif text-[clamp(32px,5vw,52px)] font-normal leading-none text-[#1a1a1a]">
            -Service
          </h2>
          <p className="text-[12px] tracking-[0.2em] text-[#666] font-medium">
            私たちがお力になれること
          </p>
        </div>

        {/* Service List */}
        <div className="flex flex-col gap-16">
          {services.map((s, i) => (
            <motion.div
              key={i}
              className="flex flex-col gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
            >
              <h4 className="text-[14px] font-semibold tracking-wider text-[#333]">
                {s.category}
              </h4>
              <ul className="flex flex-col gap-3">
                {s.items.map((item, j) => (
                  <li
                    key={j}
                    className="text-[13px] leading-relaxed text-[#555] tracking-wide flex items-start [font-feature-settings:'palt']"
                  >
                    <span className="mr-2">・</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
