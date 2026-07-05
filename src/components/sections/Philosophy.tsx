// src/components/sections/Philosophy.tsx
"use client";

import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";
import Caret from "../ui/Caret";
import { ArrowUpRight } from "lucide-react";

export default function Philosophy() {
  const heading = "世界には何もない。";
  const bodyText = [
    "夜空に張り付いた星々や、春先に降る雨。",
    "遥か昔から私たちは、そうした出来事たちに名前をつけ、",
    "互いに伝え、そのフィクションの上に暮らしてきました。",
    "",
    "フィクションをつくることは、世界をつくること。",
    "素敵な瞬間はいつも、私たち自身のなかにあります。",
    "",
    "あなたに知られなければ存在できなかった時間とコトが、意味を得て芽吹く。",
    "そのきっかけつくるため、私たちは今日も妄想を繰り広げています。",
  ];

  // 全テキストをフラット化。空行を含めて改行を維持
  const fullText = bodyText.join("\n");
  const chars = fullText.split("");

  return (
    <section className="relative z-10 isolate h-dvh w-full overflow-hidden bg-transparent">
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-6 pt-24 pb-16 sm:px-12 lg:px-16">
        {/* ===== Header group ===== */}
        <motion.div
          className="mb-10 flex flex-col gap-3 self-start"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="font-serif text-[clamp(44px,7vw,80px)] font-normal leading-none tracking-[-0.01em] text-[#1a1a1a]">
            -Philosophy
          </h2>
          <p className="pl-1 text-[13px] tracking-[0.2em] text-[#666] opacity-80 uppercase">
            私たちの信仰
          </p>
        </motion.div>

        {/* ===== Main Content ===== */}
        <div className="flex max-w-[900px] flex-col gap-12">
          <motion.h3
            className="text-[clamp(28px,4.5vw,42px)] font-medium tracking-tight text-[#1a1a1a] [font-feature-settings:'palt']"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            {heading}
          </motion.h3>

          <motion.div
            className="text-[15px] leading-[2.3] tracking-[0.06em] text-[#333] whitespace-pre-wrap [font-feature-settings:'palt']"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.008,
                },
              },
            }}
          >
            {chars.map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { duration: 0.1 },
                  },
                }}
              >
                {char}
              </motion.span>
            ))}
            <span className="inline-block align-baseline">
              <Caret />
            </span>
          </motion.div>
        </div>

        {/* ===== Bottom Link ===== */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          >
            <Link
              href="/about"
              className="group inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-white/30 backdrop-blur-sm px-8 py-3 text-[14px] font-medium transition-all hover:bg-black/5 hover:border-black/20"
            >
              About Page
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
