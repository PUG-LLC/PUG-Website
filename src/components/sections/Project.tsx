"use client";

import NextImage from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

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
  logo: string;
  image: string;
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

  // --- swipe/drag state ---
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const dxRef = useRef(0);
  const [dx, setDx] = useState(0); // 表示用（パララックス）

  const THRESHOLD = 60; // スワイプ判定しきい値(px)
  const FRICTION = 0.35; // ドラッグ時の視覚移動量

  const goTo = useCallback((i: number) => {
    setIsBgReady(false);
    setFadeKey((k) => k + 1);
    setIndex((i + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  /** 自動スライド（ドラッグ中は停止） */
  useEffect(() => {
    if (isDragging) return;
    const t = setInterval(() => next(), 7000);
    return () => clearInterval(t);
  }, [index, next, isDragging]);

  /** 次スライド先読み */
  useEffect(() => {
    const nxt = (index + 1) % SLIDES.length;
    warmImageCache(SLIDES[nxt].image);
  }, [index]);

  /** キーボード操作 */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const active = SLIDES[index];
  const isFirst = index === 0;

  /** Pointer handlers（マウス/タッチ両対応） */
  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
    startXRef.current = e.clientX;
    dxRef.current = 0;
    setDx(0);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    dxRef.current = e.clientX - startXRef.current;
    setDx(dxRef.current * FRICTION); // 視覚だけ少し動かす
  };

  const endDrag = (commit = true) => {
    if (commit) {
      if (dxRef.current > THRESHOLD) prev();
      else if (dxRef.current < -THRESHOLD) next();
    }
    setIsDragging(false);
    setDx(0);
    dxRef.current = 0;
  };

  const onPointerUp = () => endDrag(true);
  const onPointerCancel = () => endDrag(false);
  const onPointerLeave = () => endDrag(true);

  return (
    <section
      className="relative isolate h-[100svh] w-full overflow-hidden sm:h-[100dvh] select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onPointerLeave={onPointerLeave}
      aria-roledescription="carousel"
      aria-label="Project slides"
    >
      {/* === 背景 === */}
      <div className="absolute inset-0 -z-20 flex h-full w-full items-center justify-center bg-black">
        <div
          key={fadeKey}
          className="absolute inset-0"
          style={{ transform: `translateX(${dx * 0.15}px)` }} // パララックスでわずかに追従
        >
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
      <div
        className="relative mx-auto flex h-full items-center px-4 py-16 sm:px-6 lg:px-8 cursor-grab active:cursor-grabbing"
        style={{ transform: `translateX(${dx}px)` }} // ドラッグでわずかに動く
      >
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
              className="group inline-flex items-center gap-2 rounded-full border border-white/60 px-6 py-2.5 text-[13px] font-medium text-white transition-all hover:bg-white hover:text-black"
            >
              Project Page
              <ArrowUpRight
                size={16}
                strokeWidth={1.75}
                aria-hidden="true"
                className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
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
