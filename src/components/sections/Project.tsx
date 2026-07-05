// src/components/sections/Project.tsx
"use client";

import NextImage from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";

/** === 静的パス（/public 下） ====================== */
const alua01 = "/images/projects/alua-01.webp";
const alua02 = "/images/projects/alua-02.webp";
const alua03 = "/images/projects/alua-03.webp";
const alua04 = "/images/projects/alua-04.webp";

const alua01Logo = "/images/projects/alua-01-logo.webp";
const alua02Logo = "/images/projects/alua-02-logo.webp";
const alua03Logo = "/images/projects/alua-03-logo.webp";
const alua04Logo = "/images/projects/alua-04-logo.webp";


/** === データ ============================================ */
type Slide = {
  id: string;
  logo: string;
  image: string;
  alt: string;
  href?: string;
};

// TODO(ALUA): 専用ページ `/alua` は未実装。作成後に href を `/alua` へ差し替える。
// 暫定対応として、存在する `/work` に向けてリンク切れを回避している（遷移先は要確認）。
const SLIDES: Slide[] = [
  {
    id: "alua-01",
    logo: alua01Logo,
    image: alua01,
    alt: "ALUA 01",
    href: "/work",
  },
  {
    id: "alua-02",
    logo: alua02Logo,
    image: alua02,
    alt: "ALUA 02",
    href: "/work",
  },
  {
    id: "alua-03",
    logo: alua03Logo,
    image: alua03,
    alt: "ALUA 03",
    href: "/work",
  },
  {
    id: "alua-04",
    logo: alua04Logo,
    image: alua04,
    alt: "ALUA 04",
    href: "/work",
  },
];

/** === ドットナビ ======================================== */
function DotRail({
  count = 4,
  activeIndex,
  onJump,
}: {
  count?: number;
  activeIndex: number;
  onJump?: (index: number) => void;
}) {
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
                : "scale-100 bg-white/40 hover:bg-white/70",
            )}
          />
        );
      })}
    </div>
  );
}

/** === 画像キャッシュ === */
function warmImageCache(src: string) {
  if (typeof window === "undefined") return;
  const img = new window.Image();
  img.src = src;
}

export default function Project() {
  const [index, setIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);
  const [isBgReady, setIsBgReady] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const dxRef = useRef(0);
  const dyRef = useRef(0);
  const [dx, setDx] = useState(0);

  const THRESHOLD =
    typeof window !== "undefined" ? Math.min(60, window.innerWidth * 0.08) : 48;
  const FRICTION = 0.35;

  const goTo = useCallback((i: number) => {
    setIsBgReady(false);
    setFadeKey((k) => k + 1);
    setIndex((i + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  /** 自動スライド */
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

  /** スワイプ操作 */
  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setIsSwiping(false);
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    dxRef.current = 0;
    dyRef.current = 0;
    setDx(0);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    dxRef.current = e.clientX - startXRef.current;
    dyRef.current = e.clientY - startYRef.current;

    const horizontalIntent =
      Math.abs(dxRef.current) > 8 &&
      Math.abs(dxRef.current) > Math.abs(dyRef.current) * 1.2;

    if (horizontalIntent) {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      setIsSwiping(true);
      setDx(dxRef.current * FRICTION);
    }
  };

  const endDrag = (commit = true) => {
    if (commit) {
      if (dxRef.current > THRESHOLD) prev();
      else if (dxRef.current < -THRESHOLD) next();
    }
    setIsDragging(false);
    setDx(0);
    dxRef.current = 0;
    dyRef.current = 0;
    setTimeout(() => setIsSwiping(false), 200);
  };

  const onPointerUp = () => endDrag(true);
  const onPointerCancel = () => endDrag(false);

  const onPrimaryLinkClick: React.MouseEventHandler<HTMLAnchorElement> = (
    e,
  ) => {
    if (isSwiping) e.preventDefault();
  };

  return (
    <section
      className="relative isolate h-[100svh] w-full select-none overflow-hidden sm:h-[100dvh] touch-pan-y"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      aria-roledescription="carousel"
      aria-label="Project slides"
    >
      {/* === 背景 === */}
      <div className="absolute inset-0 -z-20 flex h-full w-full items-center justify-center bg-black">
        <div
          key={fadeKey}
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translateX(${dx * 0.25}px)` }} // ← 背景だけ動かす
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
              "object-cover object-center transition-opacity duration-500 ease-out",
              isBgReady ? "opacity-100" : "opacity-0",
            )}
            onLoadingComplete={() => setIsBgReady(true)}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/90 to-transparent" />
        </div>
      </div>

      {/* === コンテンツ（固定） === */}
      <div className="relative mx-auto flex h-full items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl animate-fadeSlideUpOnce">
          <h2 className="font-serif text-[clamp(32px,5vw,56px)] font-normal leading-tight tracking-tight text-white/95">
            -Project : ALUA
          </h2>
          <p className="pt-1 text-[13px] tracking-[0.2em] text-white/95 uppercase">
            自社コンテンツ
          </p>

          <div className="mt-8">
            <p className="text-[clamp(20px,2.8vw,28px)] font-medium text-white">
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
              onClick={onPrimaryLinkClick}
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
