"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

import { WORKS } from "@/config/works";

const CATEGORIES = [
  "All",
  "Branding",
  "Web",
  "Graphic",
  "3D Model",
  "Application",
  "Movie",
];

export default function WorkList() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredWorks = activeCategory === "All" 
    ? WORKS 
    : WORKS.filter(work => work.categories.includes(activeCategory));

  return (
    <section className="bg-[#ebebeb] pb-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-16">
        {/* Filters */}
        <div className="mb-16 overflow-x-auto overflow-y-hidden pb-4 scrollbar-hide">
          <ul className="flex items-center gap-x-6 lg:gap-x-12 whitespace-nowrap text-[10.5px] font-medium tracking-[0.1em] text-[#888] uppercase">
            {CATEGORIES.map((cat) => {
              const count = cat === "All" 
                ? WORKS.length 
                : WORKS.filter(w => w.categories.includes(cat)).length;
              const isActive = activeCategory === cat;
              
              return (
                <li key={cat}>
                  <button 
                    onClick={() => setActiveCategory(cat)}
                    className={clsx(
                      "transition-colors duration-300 hover:text-black",
                      isActive ? "text-[#111]" : "text-[#888]"
                    )}
                  >
                    {cat} ({count})
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-10 gap-y-16 lg:gap-y-24">
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((work) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group"
              >
                <Link href={`/work/${work.id}`} className="block">
                  <div className="relative aspect-[3/2] overflow-hidden bg-neutral-200 mb-6 rounded-[2px]">
                    <Image
                      src={work.mainImage}
                      alt={work.title}
                      fill
                      className="object-cover transition-all duration-1000 ease-in-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="space-y-2 [font-feature-settings:'palt']">
                    <p className="text-[11px] text-[#666] font-medium tracking-wide">
                      {work.client}
                    </p>
                    <h3 className="text-[16px] text-[#111] font-semibold leading-relaxed tracking-normal">
                      {work.title}
                    </h3>
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {work.tags?.map((tag, idx) => (
                        <span key={idx} className="text-[10.5px] text-[#999] tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* More Button */}
        <div className="mt-32 text-center pb-12">
          <button className="inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.2em] text-[#111] transition-all hover:opacity-50 group">
            More +
            <span className="h-[1px] w-0 bg-black transition-all duration-300 group-hover:w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
