"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";

const SLIDES = [
  {
    id: "alua-01",
    logo: "/images/projects/alua-01-logo.png",
    image: "/images/projects/alua-01.jpg",
    alt: "ALUA 01",
    href: "//alua",
  },
  {
    id: "alua-02",
    logo: "/images/projects/alua-02-logo.png",
    image: "/images/projects/alua-02.jpg",
    alt: "ALUA 02",
    href: "//alua",
  },
  {
    id: "alua-03",
    logo: "/images/projects/alua-03-logo.png",
    image: "/images/projects/alua-03.jpg",
    alt: "ALUA 03",
    href: "//alua",
  },
  {
    id: "alua-04",
    logo: "/images/projects/alua-04-logo.png",
    image: "/images/projects/alua-04.jpg",
    alt: "ALUA 04",
    href: "//alua",
  },
];

type DotRailProps = {
  count?: number;
  activeIndex: number;
  onJump?: (index: number) => void;
};

function DotRail({ count = 4, activeIndex, onJump }: DotRailProps) {
  return (
    <div className="flex items-center justify-center gap-3 mt-5">
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={i}
            onClick={() => onJump?.(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={clsx(
              "relative h-[6px] w-[6px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.35,1)]",
              isActive
                ? "bg-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.9)]"
                : "bg-white/40 hover:bg-white/70 scale-100"
            )}
          />
        );
      })}
    </div>
  );
}

export default function Project() {
  const [index, setIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

  const goTo = useCallback((i: number) => {
    setFadeKey((k) => k + 1);
    setIndex((i + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const t = setInterval(() => goTo(index + 1), 7000);
    return () => clearInterval(t);
  }, [index, goTo]);

  const active = SLIDES[index];

  return (
    <section className="relative isolate w-full overflow-hidden min-h-screen">
      {/* === 背景 === */}
      <div className="absolute inset-0 -z-20 flex items-center justify-center bg-black">
        <div key={fadeKey} className="absolute inset-0 animate-fadeZoom">
          <Image
            src={active.image}
            alt={active.alt}
            fill
            priority
            className="object-cover transition-opacity duration-[1500ms] ease-in-out"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,0,0,1) 25%, rgba(0,0,0,0.25) 100%)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_160px_rgba(0,0,0,0.65)]" />
        </div>
      </div>

      {/* === 左上・右下の装飾 === */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/icon/start.svg"
          alt=""
          width={12}
          height={12}
          className="absolute top-[15%] left-[2%] w-[16px] sm:w-[18px] lg:w-[20px] opacity-80"
        />
        <Image
          src="/images/icon/end.svg"
          alt=""
          width={12}
          height={12}
          className="absolute bottom-[3.5%] right-[2%] w-[16px] sm:w-[18px] lg:w-[20px] opacity-80"
        />
      </div>

      {/* === コンテンツ === */}
      <div className="relative mx-auto flex min-h-screen items-center max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl animate-fadeSlideUpOnce">
          <h2 className="font-serif text-[clamp(32px,5vw,56px)] font-normal leading-tight text-white/95 tracking-tight">
            -Project : ALUA
          </h2>

          <div className="mt-8">
            <p className="text-[clamp(20px,2.8vw,28px)] font-medium tracking-[0.02em] text-white">
              From nothing.
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-white/80">
              徒然なるままに。
              <br />
              自社ブランド・コンテンツ開発。
            </p>
          </div>

          <div className="mt-10">
            <Link
              href={active.href ?? "/"}
              className="inline-flex items-center gap-2 rounded-full border border-white/60 px-6 py-2.5 text-[13px] font-medium text-white transition-all hover:bg-white hover:text-black"
            >
              Project Page <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </div>

      {/* === 下部ロゴ＋ドット === */}
      <div className="pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center">
        <div
          key={fadeKey + "-logo"}
          className="animate-fadeSlideUp delay-[300ms]"
        >
          <Image
            src={active.logo}
            alt=""
            width={180}
            height={60}
            className="mx-auto"
          />
        </div>
        <div className="pointer-events-auto">
          <DotRail
            count={SLIDES.length}
            activeIndex={index}
            onJump={(i) => goTo(i)}
          />
        </div>
      </div>
    </section>
  );
}
