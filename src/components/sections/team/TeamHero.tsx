"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function TeamHero() {
  const images = [
    "/images/team/team01.png",
    "/images/team/team02.png",
    "/images/team/team03.png",
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % images.length);
      }, 700);
    } else {
      setActiveIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  return (
    <section className="pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 mb-16 lg:mb-24">
        <h1 className="font-serif text-[clamp(60px,10vw,120px)] leading-none">
          Team
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch">
        <div className="w-full lg:w-1/2 px-6 lg:pl-[calc(max(1.5rem,calc((100vw-80rem)/2+1.5rem)))] lg:pr-24 mb-12 lg:mb-0">
          <div className="space-y-8 max-w-xl">
            <p className="text-[15px] lg:text-[16px] leading-[2] [font-feature-settings:'palt'] tracking-wide">
              つくることを通して、世の中に素敵な瞬間を増やしていきます。
              テキストテキストテキストテキストテキストテキスト
            </p>
            <p className="text-[14px] lg:text-[15px] leading-[2.2] text-[#666] [font-feature-settings:'palt'] whitespace-pre-wrap">
              テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            </p>
          </div>
        </div>

        <div 
          className="w-full lg:w-1/2 group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative aspect-[16/9] lg:h-full w-full overflow-hidden grayscale transition-all duration-500 group-hover:grayscale-0">
            {images.map((src, index) => (
              <Image
                key={src}
                src={src}
                alt={`PUG Team ${index + 1}`}
                fill
                priority={index === 0}
                className={`object-contain transition-opacity duration-500 ease-in-out ${
                  index === activeIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
