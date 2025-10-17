// src/components/sections/Work.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import Caret from "@/components/ui/Caret";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
} from "framer-motion";
import { useMemo, useRef } from "react";

/* =========================
   Tunables（好みで微調整）
========================= */
const EASE = [0.2, 0.8, 0.2, 1] as const;
const WORD_DELAY_MIN = 0.04;
const WORD_DELAY_RANGE = 0.28; // + α
const PARALLAX_RANGE: [number, number] = [-12, 10];
const TILT_MAX = { x: 5, y: 7 }; // 3Dチルト最大角度（deg）

/* =========================
   Helpers
========================= */
function splitWords(text: string) {
  return text.split(/(\s+)/).map((w, i) => ({ w, key: `${i}-${w}` }));
}

/* =========================
   Variants
========================= */
const sectionV = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.06, ease: EASE },
  },
};

const titleV = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

const bgToneV = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

const frameV = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const revealV = {
  hidden: { clipPath: "inset(100% 0% 0% 0% round 16px)", scale: 1.035 },
  show: {
    clipPath: "inset(0% 0% 0% 0% round 16px)",
    scale: 1,
    transition: { duration: 1.05, ease: EASE },
  },
};

const buttonV = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/* =========================
   Component
========================= */
export default function Work() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  // scroll parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 15%"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], PARALLAX_RANGE);

  // 3D tilt on hover
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useTransform(mx, [-0.5, 0.5], [-TILT_MAX.y, TILT_MAX.y]); // 左右
  const rotX = useTransform(my, [-0.5, 0.5], [TILT_MAX.x, -TILT_MAX.x]); // 上下

  const onMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width; // 0..1
    const y = (e.clientY - r.top) / r.height;
    mx.set(x - 0.5);
    my.set(y - 0.5);
    // CSS var（ハイライト用）
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const onLeave: React.MouseEventHandler<HTMLDivElement> = (e) => {
    mx.set(0);
    my.set(0);
    e.currentTarget.style.removeProperty("--mx");
    e.currentTarget.style.removeProperty("--my");
  };

  // リード文（単語ごと微ランダム）
  const lead = useMemo(() => {
    const words = splitWords(
      `PUG Creative Studioは、“Play toward Unknown Germination” を合言葉に、ブランドの芽を見つけ、育て、広げるチームです。戦略・体験・ビジュアルを横断して連携（Creative Coalition）させ、成長のための“手触りのあるデザイン”を提供します。`
    );
    const delays = words.map(
      () => WORD_DELAY_MIN + Math.random() * WORD_DELAY_RANGE
    );
    return words.map((w, i) => ({ ...w, d: delays[i] }));
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      variants={reduced ? undefined : sectionV}
    >
      {/* 背景トーン */}
      <motion.div
        className="absolute inset-0 -z-10 bg-neutral-200/95 backdrop-blur-[1px]"
        variants={reduced ? undefined : bgToneV}
      />
      {/* 超薄グレイン */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncA type='table' tableValues='0 0 0.23 0'/></feComponentTransfer></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        {/* Title */}
        <motion.div
          className="relative mx-auto w-fit overflow-hidden text-center font-serif text-[clamp(28px,4.6vw,44px)] leading-none text-[#222]"
          variants={reduced ? undefined : titleV}
        >
          <h3 className="relative inline-block">
            {/* 光のワイプ */}
            {!reduced && (
              <span
                className="absolute inset-0"
                aria-hidden
                style={{
                  transform: "translateX(-102%)",
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(0,0,0,.12) 30%, transparent 60%)",
                  animation:
                    "wipe 800ms cubic-bezier(0.2,0.8,0.2,1) 120ms forwards",
                }}
              />
            )}
            -Work
          </h3>
        </motion.div>

        {/* Lead（粒立ち） */}
        <p className="mx-auto mt-6 max-w-[760px] text-center text-[13.5px] leading-[2.08] tracking-[0.02em] text-[#333] [font-feature-settings:'palt']">
          {lead.map(({ w, key, d }) => (
            <motion.span
              key={key}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.5,
                ease: EASE,
                delay: reduced ? 0 : d,
              }}
              style={{ display: "inline-block", willChange: "transform" }}
            >
              {w}
            </motion.span>
          ))}
          <span className="align-baseline">
            <Caret />
          </span>
        </p>

        {/* CTA */}
        <motion.div className="mt-8 flex justify-center" variants={buttonV}>
          <Link
            href="/projects"
            prefetch={false}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#111]/30 px-5 py-2 text-[12.5px] tracking-wide text-[#111]/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
            onMouseMove={(e) => {
              const el = e.currentTarget;
              const r = el.getBoundingClientRect();
              el.style.setProperty("--mx", `${e.clientX - r.left}px`);
              el.style.setProperty("--my", `${e.clientY - r.top}px`);
            }}
          >
            {/* 黒フィル */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-20 translate-y-[110%] bg-[#111] transition-transform duration-400 ease-[cubic-bezier(.2,.9,.2,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0"
            />

            {/* 水彩インク（マウス位置に追従） */}
            <span
              aria-hidden
              className="ink pointer-events-none absolute inset-0 -z-10 opacity-0 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
            />

            {/* 細かいグレイン */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12] mix-blend-soft-light"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncA type='table' tableValues='0 0 0.22 0'/></feComponentTransfer></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
              }}
            />

            <span className="relative text-current">Project Page</span>
            <ArrowUpRight
              size={16}
              strokeWidth={1.75}
              aria-hidden="true"
              className="relative"
            />
          </Link>
        </motion.div>

        {/* Visual：微視差＋3Dチルト＋スペキュラ */}
        <motion.div
          className="mt-12"
          variants={reduced ? undefined : frameV}
          style={{ perspective: 1200 }}
        >
          <motion.div
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="relative overflow-hidden rounded-2xl border border-neutral-300/70 bg-neutral-100 shadow-[0_24px_72px_-36px_rgba(0,0,0,0.35)]"
            style={{
              y: parallaxY, // スクロール微視差
              rotateX: reduced ? 0 : rotX,
              rotateY: reduced ? 0 : rotY,
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              variants={revealV}
              className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl will-change-transform"
            >
              <Image
                src="/images/projects/alua-01.webp"
                alt="Selected works preview"
                fill
                priority
                className="object-cover"
              />
              {/* 薄ビネット */}
              <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_60px_120px_-90px_rgba(0,0,0,0.30),inset_0_-60px_120px_-90px_rgba(0,0,0,0.30)]" />
              {/* スペキュラ（ホバーで走る光） */}
              {!reduced && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(200px 140px at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.14), transparent 60%)",
                    mixBlendMode: "screen",
                  }}
                />
              )}
              {/* 斜めスイープ（初回だけ） */}
              {!reduced && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 translate-x-[-120%]"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.08) 12%, rgba(255,255,255,0.18) 16%, rgba(255,255,255,0.08) 20%, transparent 26%)",
                    animation: "sweep 2.6s cubic-bezier(.2,.9,.2,1) 600ms both",
                  }}
                />
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

<style jsx global>{`
  @keyframes wipe {
    to {
      transform: translateX(110%);
    }
  }
  @keyframes sweep {
    0% {
      transform: translateX(-120%);
    }
    100% {
      transform: translateX(140%);
    }
  }
  @keyframes drift {
    0% {
      transform: translate3d(0, 0, 0) scale(1);
      filter: blur(6px) saturate(110%);
    }
    100% {
      transform: translate3d(0, -1px, 0) scale(1.03);
      filter: blur(7px) saturate(115%);
    }
  }

  /* 水彩“インク”の見た目（マウス位置は --mx/--my 変数から） */
  .ink {
    background-image: radial-gradient(
        140px 90px at var(--mx, 50%) var(--my, 50%),
        rgba(255, 203, 112, 0.28),
        rgba(255, 203, 112, 0) 60%
      ),
      radial-gradient(
        120px 80px at calc(var(--mx, 50%) + 18px) calc(var(--my, 50%) + 6px),
        rgba(240, 171, 252, 0.3),
        rgba(240, 171, 252, 0) 62%
      ),
      radial-gradient(
        160px 100px at calc(var(--mx, 50%) - 14px) calc(var(--my, 50%) - 10px),
        rgba(125, 211, 252, 0.26),
        rgba(125, 211, 252, 0) 65%
      );
    background-repeat: no-repeat;
    filter: blur(6px) saturate(110%);
    animation: drift 4.2s cubic-bezier(0.2, 0.9, 0.2, 1) infinite alternate;
  }

  @keyframes wipe {
    to {
      transform: translateX(110%);
    }
  }
  @keyframes sweep {
    0% {
      transform: translateX(-120%);
    }
    100% {
      transform: translateX(140%);
    }
  }
`}</style>;
