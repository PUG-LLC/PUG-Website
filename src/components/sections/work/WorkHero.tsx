"use client";

import { motion } from "framer-motion";

export default function WorkHero() {
  return (
    <section className="relative py-16 lg:py-32 overflow-hidden bg-[#ebebeb]">
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-16">
        <motion.h1 
          className="font-serif text-[clamp(64px,12vw,120px)] font-normal leading-none tracking-tight text-[#1a1a1a]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Works
        </motion.h1>
      </div>
    </section>
  );
}
