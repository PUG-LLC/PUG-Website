// src/components/layouts/Footer.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

/* ================================
 * UI parts
 * ================================ */
function TopBand() {
  return (
    <div className="relative h-6 sm:h-4 lg:h-6 shrink-0">
      <Image
        src="/images/footer_bg.png"
        alt=""
        fill
        priority
        className="object-cover"
      />
    </div>
  );
}

/* ================================
 * Data
 * ================================ */
type NavLink = { label: string; href: string };

const NAV_COL_1: NavLink[] = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "WORKS", href: "/work" },
  { label: "MEMBERS", href: "/members" },
];

const NAV_COL_2: NavLink[] = [
  { label: "NEWS", href: "/news" },
  { label: "CONTACT", href: "/contact" },
];

/* ================================
 * Footer
 * ================================ */
export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative isolate w-full overflow-hidden bg-[#050404] text-white">
      {/* Warm radial glow — 中央やや右・やや下に置いた円形の柔らかい光。
          下部いっぱいの横長の帯ではなく、固定サイズの円 + blur で自然に黒へ溶かす。 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 rounded-full"
        style={{
          left: "58%",
          top: "60%",
          width: "min(52vw, 760px)",
          height: "min(52vw, 760px)",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(255,48,20,0.72) 0%, rgba(188,31,14,0.42) 22%, rgba(95,18,10,0.22) 42%, rgba(20,5,3,0.08) 58%, rgba(0,0,0,0) 72%)",
          filter: "blur(64px)",
          opacity: 0.72,
        }}
      />

      {/* Top band */}
      <TopBand />

      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 py-14 sm:py-16 lg:py-20">
        {/* Logo */}
        <Link
          href="/"
          aria-label="PUG LLC."
          className="inline-flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <span className="h-[11px] w-[11px] rounded-full bg-[#FD2601]" />
          <span className="text-[19px] font-bold leading-none tracking-wide">
            PUG <span className="font-normal text-white/45">LLC.</span>
          </span>
        </Link>

        {/* Main row */}
        <div className="mt-12 grid grid-cols-1 gap-12 sm:mt-14 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          {/* Left: tagline */}
          <div className="lg:col-span-4">
            <p className="font-serif text-[26px] leading-[1.28] text-white sm:text-[28px] lg:text-[30px]">
              Play toward
              <br />
              Unknown Germination.
            </p>
          </div>

          {/* Center: nav columns */}
          <nav className="lg:col-span-5">
            <div className="flex gap-x-12 sm:gap-x-16">
              {[NAV_COL_1, NAV_COL_2].map((col, i) => (
                <ul key={i} className="space-y-3.5">
                  {col.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-[13px] font-medium uppercase tracking-[0.06em] text-white/90 transition-opacity hover:opacity-60"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </nav>

          {/* Right: location + page top */}
          <div className="flex flex-col items-start gap-6 lg:col-span-3 lg:items-end">
            <address className="not-italic text-[10.5px] uppercase leading-[1.7] tracking-[0.06em] text-white/45 lg:text-right">
              Located in Shibuya, Tokyo.
              <br />
              Creating Unseen Moments.
              <br />
              35.6634° N, 139.7005° E
            </address>

            <button
              type="button"
              onClick={scrollTop}
              className="inline-flex items-center gap-6 rounded-md border border-white/10 bg-white/[0.05] px-4 py-2.5 text-[12px] tracking-wide text-white/70 transition-colors hover:bg-white/[0.1] hover:text-white"
            >
              Page top
              <ArrowUp size={14} strokeWidth={1.75} aria-hidden />
            </button>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-14 flex items-center justify-between text-[11px] text-white/45 sm:mt-16 lg:mt-24">
          <Link
            href="/privacy-policy"
            className="transition-opacity hover:opacity-70 hover:text-white"
          >
            Privacy Policy
          </Link>
          <span>©PUG LLC.</span>
        </div>
      </div>
    </footer>
  );
}
