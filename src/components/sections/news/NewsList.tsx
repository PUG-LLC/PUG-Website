"use client";

import { useState } from "react";
import Link from "next/link";
import { NEWS_ITEMS, NewsCategory } from "@/config/news";
import clsx from "clsx";

export default function NewsList() {
  const [activeCategory, setActiveCategory] = useState<NewsCategory | "All">(
    "All",
  );

  const categories: (NewsCategory | "All")[] = [
    "All",
    ...new Set(NEWS_ITEMS.map((item) => item.category)),
  ];

  const filteredItems =
    activeCategory === "All"
      ? NEWS_ITEMS
      : NEWS_ITEMS.filter((item) => item.category === activeCategory);

  const getCount = (cat: NewsCategory | "All") => {
    if (cat === "All") return NEWS_ITEMS.length;
    return NEWS_ITEMS.filter((item) => item.category === cat).length;
  };

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 lg:pb-32">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-x-8 gap-y-4 mb-16 lg:mb-24">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={clsx(
              "text-[12px] tracking-widest font-medium transition-opacity",
              activeCategory === cat
                ? "opacity-100"
                : "opacity-40 hover:opacity-60",
            )}
          >
            {cat}({getCount(cat)})
          </button>
        ))}
      </div>

      {/* List */}
      <div className="border-t border-black/10">
        {filteredItems.map((item) => (
          <Link
            key={item.id}
            href={`/news/${item.id}`}
            className="group grid grid-cols-1 lg:grid-cols-12 items-center py-8 lg:py-10 border-b border-black/10 hover:bg-black/[0.02] transition-colors px-4 -mx-4"
          >
            <div className="lg:col-span-1 text-[12px] font-medium tracking-widest text-[#1a1a1a]">
              {item.date}
            </div>
            <div className="lg:col-span-2 text-[10px] items-center text-[#666] tracking-[0.2em] font-medium uppercase mt-2 lg:mt-0">
              {item.category}
            </div>
            <div className="lg:col-span-9 text-[15px] lg:text-[16px] font-medium text-[#111] leading-relaxed mt-4 lg:mt-0 group-hover:opacity-60 transition-opacity">
              {item.title}
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Placeholder */}
      <div className="mt-20 lg:mt-32 flex justify-center gap-8">
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            className={clsx(
              "text-[12px] tracking-widest font-medium",
              num === 1 ? "opacity-100" : "opacity-40 hover:opacity-60",
            )}
          >
            {num}
          </button>
        ))}
      </div>
    </section>
  );
}
