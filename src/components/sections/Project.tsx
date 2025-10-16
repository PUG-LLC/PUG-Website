"use client";

import NextImage from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";

/** === 静的パス（/public 下） ====================== */
const alua01 = "/images/projects/alua-01.webp";
const alua02 = "/images/projects/alua-02.webp";
const alua03 = "/images/projects/alua-03.webp";
const alua04 = "/images/projects/alua-04.webp";

const alua01Logo = "/images/projects/alua-01-logo.webp";
const alua02Logo = "/images/projects/alua-02-logo.webp";
const alua03Logo = "/images/projects/alua-03-logo.webp";
const alua04Logo = "/images/projects/alua-04-logo.webp";

const startIcon = "/images/icon/start.svg";
const endIcon = "/images/icon/end.svg";

/** === データ ============================================ */
type Slide = {
  id: string;
  logo: string; // ← 文字列パスに合わせて修正
  image: string; // ← 文字列パスに合わせて修正
  alt: string;
  href?: string;
};

const SLIDES: Slide[] = [
  {
    id: "alua-01",
    logo: alua01Logo,
    image: alua01,
    alt: "ALUA 01",
    href: "/alua",
  },
  {
    id: "alua-02",
    logo: alua02Logo,
    image: alua02,
    alt: "ALUA 02",
    href: "/alua",
  },
  {
    id: "alua-03",
    logo: alua03Logo,
    image: alua03,
    alt: "ALUA 03",
    href: "/alua",
  },
  {
    id: "alua-04",
    logo: alua04Logo,
    image: alua04,
    alt: "ALUA 04",
    href: "/alua",
  },
];

/** === ドットナビ ======================================== */
type DotRailProps = {
  count?: number;
  activeIndex: number;
  onJump?: (index: number) => void;
};

function DotRail({ count = 4, activeIndex, onJump }: DotRailProps) {
  return (
    <div className="mt-5 flex items-center justify-center gap-3">
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
                ? "scale-125 bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]"
                : "scale-100 bg-white/40 hover:bg-white/70"
            )}
          />
        );
      })}
    </div>
  );
}

/** === ユーティリティ：次スライド先読み ================== */
function warmImageCache(src: string) {
  if (typeof window === "undefined") return;
  const img = new window.Image();
  img.src = src;
}

export default function Project() {
  const [index, setIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);
  const [isBgReady, setIsBgReady] = useState(false);

  const goTo = useCallback((i: number) => {
    setIsBgReady(false); // 新しい画像で再度フェード
    setFadeKey((k) => k + 1);
    setIndex((i + SLIDES.length) % SLIDES.length);
  }, []);

  /** 自動スライド */
  useEffect(() => {
    const t = setInterval(() => goTo(index + 1), 7000);
    return () => clearInterval(t);
  }, [index, goTo]);

  /** 次スライドを先読み（1枚先だけで十分） */
  useEffect(() => {
    const next = (index + 1) % SLIDES.length;
    warmImageCache(SLIDES[next].image);
  }, [index]);

  const active = SLIDES[index];
  const isFirst = index === 0;

  return (
    <section className="relative isolate h-[100svh] w-full overflow-hidden sm:h-[100dvh]">
      {/* === 背景 === */}
      <div className="absolute inset-0 -z-20 flex h-full w-full items-center justify-center bg-black">
        <div key={fadeKey} className="absolute inset-0">
          <NextImage
            src={active.image}
            alt={active.alt}
            fill
            priority={isFirst}
            fetchPriority={isFirst ? "high" : "auto"}
            placeholder="empty"
            quality={70}
            sizes="100vw"
            className={clsx(
              "object-cover object-center transition-opacity duration-500 ease-out will-change-opacity [transform:translateZ(0)]",
              isBgReady ? "opacity-100" : "opacity-0"
            )}
            onLoadingComplete={() => setIsBgReady(true)}
          />
          {/* グラデーション/ビネット */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,0,0,1) 25%, rgba(0,0,0,0.25) 100%)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_160px_rgba(0,0,0,0.65)]" />
        </div>
      </div>

      {/* === 左上・右下の装飾 === */}
      <div className="pointer-events-none absolute inset-0">
        <NextImage
          src={startIcon}
          alt=""
          width={20}
          height={20}
          sizes="20px"
          className="absolute left-[2%] top-[15%] w-[16px] opacity-80 sm:w-[18px] lg:w-[20px]"
        />
        <NextImage
          src={endIcon}
          alt=""
          width={20}
          height={20}
          sizes="20px"
          className="absolute bottom-[3.5%] right-[2%] w-[16px] opacity-80 sm:w-[18px] lg:w-[20px]"
        />
      </div>

      {/* === コンテンツ === */}
      <div className="relative mx-auto flex h-full items-center px-4 py-16 sm:px-6 lg:px-8">
        {" "}
        {/* ← min-h-screen を h-full に */}
        <div className="max-w-2xl animate-fadeSlideUpOnce">
          <h2 className="font-serif text-[clamp(32px,5vw,56px)] font-normal leading-tight tracking-tight text-white/95">
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
              prefetch={false}
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
          <NextImage
            src={active.logo}
            alt=""
            width={180}
            height={60}
            sizes="(max-width: 640px) 140px, 180px"
            className="mx-auto"
            priority={isFirst}
          />
        </div>
        <div className="pointer-events-auto">
          <DotRail count={SLIDES.length} activeIndex={index} onJump={goTo} />
        </div>
      </div>
    </section>
  );
}
