// src/components/sections/Philosophy.tsx
"use client";

import { motion } from "framer-motion";
import React from "react";
import Caret from "../ui/Caret";

export default function Philosophy() {
  const text =
    "「Play toward Unknown Germination（未知への芽吹きを遊ぶ）」という精神のもと、デザイン・アート・テクノロジーを横断して新しい価値を形にするクリエイティブチームです。私たちは、企業やブランド、プロジェクトが持つ本来のポテンシャルを見出し、ビジュアル・体験・戦略を最適な形で連携（=Creative Coalition）させることで、デザインを通じた“共創”と“進化”を支援します。アイデアの芽が生まれ、広がり、世界に根づいていく。その瞬間をデザインするのが、PUG Creative Studioです。";

  // テキストを一文字ずつ配列化
  const chars = text.split("");

  return (
    <section className="relative z-10 isolate h-dvh w-full overflow-hidden bg-transparent">
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-between px-4 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20 lg:px-8 lg:pt-32 lg:pb-28">
        {/* ===== Title group ===== */}
        <div className="self-start">
          <h2 className="font-serif text-[clamp(40px,6vw,74px)] font-normal leading-none tracking-[-0.01em] text-[#1a1a1a]">
            -Philosophy
          </h2>
        </div>

        {/* ===== Body ===== */}
        <div className="max-w-[900px]">
          <motion.p
            className="text-[15px] leading-[2.1] tracking-[0.015em] text-[#333]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.015, // 一文字ずつ間隔
                },
              },
            }}
          >
            {chars.map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 4 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.25, ease: "easeOut" },
                  },
                }}
              >
                {char}
              </motion.span>
            ))}
            <span className="align-baseline">
              <Caret />
            </span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
