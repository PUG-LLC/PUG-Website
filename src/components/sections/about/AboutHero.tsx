"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="relative py-16 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-16">
        <motion.h1
          className="font-serif text-[clamp(64px,12vw,120px)] font-normal leading-none tracking-tight text-[#1a1a1a]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          About
        </motion.h1>
      </div>
    </section>
  );
}
