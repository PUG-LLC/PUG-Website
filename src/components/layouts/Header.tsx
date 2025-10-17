// src/components/layouts/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { href: "/", label: "HOME" },
  { href: "/", label: "ABOUT" },
  { href: "/", label: "SERVICE" },
  { href: "/", label: "TEAM" },
  { href: "/", label: "NEWS" },
  { href: "/", label: "CONTACT" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // 背景スクロール抑止
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-[60] w-full bg-transparent">
      {/* Top bar */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          aria-label="PUG Creative Studio"
          className="flex items-center transition-opacity hover:opacity-95"
        >
          <Image
            src="/images/logo.svg"
            alt="PUG Creative Studio"
            width={180}
            height={24}
            priority
            className="h-4 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:block">
          <ul className="flex items-center text-[12px] tracking-widest text-[#C8C8C8]">
            {NAV.map((item, i) => (
              <li key={item.label} className="flex items-center">
                <Link
                  href={item.href}
                  className={clsx(
                    "py-1 uppercase transition-opacity hover:opacity-50",
                    pathname === item.href ? "opacity-100" : "opacity-75"
                  )}
                >
                  {item.label}
                </Link>
                {i < NAV.length - 1 && <span aria-hidden>,</span>}
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="z-10 text-gray-300 transition hover:text-white md:hidden"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile fullscreen overlay */}
      <div
        className={clsx(
          // 全画面 & 最前面 & 安全領域
          "fixed inset-0 z-[999] h-[100svh] w-screen text-white transition-all duration-500 ease-out",
          "pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]",
          // 背景画像
          "bg-cover bg-center bg-no-repeat",
          // 表示制御
          menuOpen
            ? "pointer-events-auto opacity-100 visible translate-y-0"
            : "pointer-events-none opacity-0 invisible -translate-y-4"
        )}
        style={{
          backgroundImage: "url('/images/backgroundImage.png')",
          backgroundAttachment: "scroll", // iOSでの描画乱れ回避
        }}
      >
        {/* 黒グラデーションヴェール */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/90"
        />

        {/* Close button */}
        <button
          type="button"
          onClick={() => setMenuOpen(false)}
          className="absolute right-3 top-5 z-20 text-white transition hover:opacity-70"
          aria-label="Close menu"
        >
          <X size={28} />
        </button>

        {/* ========================
            Content row & Footer
           ======================== */}
        <div className="relative z-10 flex h-full flex-col justify-between">
          {/* ▼▼▼ ここを h-full → flex-1 に変更（重要） ▼▼▼ */}
          <div className="flex flex-1 items-end justify-between px-8 pb-8 min-h-0">
            {/* Left vertical logo (kept inside bounds) */}
            <div className="relative flex h-full w-auto flex-col items-center justify-end">
              <div className="origin-bottom-left -rotate-90 translate-x-3">
                <Image
                  src="/images/logo.svg"
                  alt="PUG Creative Studio"
                  width={180}
                  height={24}
                  priority
                  className="h-3 w-auto"
                />
              </div>
            </div>

            {/* Menu items (right aligned) */}
            <div className="flex max-h-[calc(100svh-100px)] flex-col justify-end space-y-5 overflow-y-auto pr-4 pb-[2px]">
              {NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[20px] uppercase tracking-[0.15em] transition-opacity hover:opacity-70"
                >
                  <h3>{item.label}</h3>
                </Link>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 mb-6 text-center text-[11px] text-gray-300">
            © 2025 PUG Creative Studio by BLISSPHOMY Inc.
          </div>
        </div>
      </div>
    </header>
  );
}
