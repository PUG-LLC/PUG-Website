// src/components/layouts/Footer.tsx
"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/* ================================
 * Data
 * ================================ */
type LinkGroup = { title: string; items: string[] };

const GROUPS_TOP: LinkGroup[] = [
  {
    title: "Philosophy",
    items: ["私たちの志題", "私たちの信条", "仲間", "ご挨拶"],
  },
  {
    title: "Work",
    items: ["ブランドデザイン", "デジタルデザイン", "ビジネスデザイン"],
  },
  {
    title: "Project",
    items: ["ブランドデザイン", "デジタルデザイン", "ビジネスデザイン"],
  },
];

const GROUPS_BOTTOM: LinkGroup[] = [
  {
    title: "Team",
    items: [
      "株式会社monopo tokyo",
      "株式会社Y&L Projects",
      "株式会社ハイビジョン",
    ],
  },
  {
    title: "News",
    items: ["繋｜Synthesis", "実｜Yield", "棲｜Nest", "関｜Connect"],
  },
  { title: "Company", items: ["組織情報", "アクセス"] },
];

/* ================================
 * UI parts
 * ================================ */
function TopBand() {
  return (
    <div className="relative h-16 sm:h-20 lg:h-24 shrink-0">
      <Image
        src="/images/footer_bg.png"
        alt=""
        fill
        priority
        className="object-cover"
      />
      {/* <div className="absolute inset-0 bg-white/5 backdrop-blur-sm [mask-image:linear-gradient(to_bottom,rgba(255,255,255,1),rgba(255,255,255,.35))]" /> */}
    </div>
  );
}

function LinkColumns({
  groups,
  gridClass,
}: {
  groups: LinkGroup[];
  gridClass: string;
}) {
  return (
    <div className={gridClass}>
      {groups.map((g) => (
        <div key={g.title}>
          <h3 className="font-serif text-[17px] sm:text-[18px] text-white/95">
            {g.title}
          </h3>
          <ul className="mt-3 sm:mt-4 space-y-2.5 sm:space-y-3">
            {g.items.map((label) => (
              <li key={label}>
                <Link
                  href="#"
                  className="block py-1 text-[12.5px] leading-6 text-white/65 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function BottomRow({ onTop }: { onTop: () => void }) {
  return (
    <div className="mt-8 flex flex-row items-center justify-between gap-4 text-[12px] text-white/55 pb-8">
      <div className="flex flex-row items-center gap-2 sm:gap-8">
        <Link
          href="/"
          className="inline-flex h-10 items-center rounded px-2 hover:text-white transition-colors"
        >
          Privacy Policy
        </Link>
        <span className="text-white/40 ">© PUG Creative Studio</span>
      </div>

      <button
        type="button"
        onClick={onTop}
        className="inline-flex h-10 items-center gap-2 rounded-sm border border-white/20 px-3 text-white/85 hover:text-white hover:border-white/40 transition-colors"
      >
        Page top
        <span
          aria-hidden
          className="ml-1 inline-flex h-[18px] w-[18px] items-center justify-center rounded-[3px] border border-white/20 text-[11px]"
        >
          ↑
        </span>
      </button>
    </div>
  );
}

/* ================================
 * Footer
 * ================================ */
export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative isolate w-full bg-black text-white/85 min-h-[100svh] flex flex-col">
      {/* Top band */}
      <TopBand />

      {/* Main */}
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 pt-10 sm:pt-16 lg:pt-20">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-12">
          {/* Left column */}
          <div className="lg:col-span-4">
            <p className="text-[17px] sm:text-[18px] lg:text-[20px] font-medium tracking-wide text-white/90">
              クリエイティブを泳ぐ。
            </p>

            <div className="mt-8 sm:mt-12 space-y-8 sm:space-y-12 text-[12.5px]">
              <div>
                <p className="mb-2 sm:mb-3 text-white/50">Follow Us</p>
                <Link
                  href="https://instagram.com/"
                  target="_blank"
                  className="inline-flex h-10 items-center gap-2 rounded px-2 text-white/80 hover:text-white transition-colors"
                >
                  Instagram{" "}
                  <ArrowUpRight
                    size={16} // or 18
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>

              <div>
                <p className="mb-2 sm:mb-3 text-white/50">A</p>
                <address className="not-italic leading-relaxed text-white/80">
                  1433-2 Yamada, Koga City, Ibaraki Prefecture
                  <br />
                  306-0115
                </address>
              </div>
            </div>
          </div>

          {/* Right: link groups */}
          <div className="lg:col-span-8">
            {/* 上段 */}
            <LinkColumns
              groups={GROUPS_TOP}
              gridClass="grid grid-cols-3 xs:grid-cols-2 md:grid-cols-3 gap-x-8 sm:gap-x-12 gap-y-8 sm:gap-y-12"
            />
            {/* 下段 */}
            <LinkColumns
              groups={GROUPS_BOTTOM}
              gridClass="mt-10 sm:mt-14 grid grid-cols-3 xs:grid-cols-2 md:grid-cols-3 gap-x-8 sm:gap-x-12 gap-y-8 sm:gap-y-12"
            />

            {/* Read us / Contact */}
            <div className="mt-12 sm:mt-16 grid grid-cols-2 gap-6 sm:gap-10 md:grid-cols-2">
              <Link
                href="#"
                className="font-serif text-[17px] sm:text-[18px] text-white/90 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors"
              >
                Read us
              </Link>
              <Link
                href="/"
                className="font-serif text-[17px] sm:text-[18px] text-white/90 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <BottomRow onTop={scrollTop} />
      </div>

      {/* Inner vignette */}
      <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_40px_80px_-50px_rgba(0,0,0,.7)]" />
    </footer>
  );
}
