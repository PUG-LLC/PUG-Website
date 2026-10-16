"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Work } from "@/lib/content/types";

export default function WorkList({ items }: { items: Work[] }) {
  return (
    <section className="bg-[#ebebeb] pb-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-16">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-10 gap-y-16 lg:gap-y-24">
          {items.map((work) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <Link href={`/work/${work.slug}`} className="block">
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
                  <p className="text-[16px] text-[#666] font-medium tracking-wide">
                    {work.client}
                  </p>
                  <h3 className="text-[20px] text-[#111] font-semibold leading-relaxed tracking-normal">
                    {work.title}
                  </h3>
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {work.categories.map((cat, idx) => (
                      <span
                        key={idx}
                        className="text-[14px] text-[#111] tracking-wider"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* More Button（未実装のダミー） */}
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
