// src/components/layouts/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "ABOUT" },
  { href: "/work", label: "WORK" },
  { href: "/members", label: "Members" },
  { href: "/news", label: "NEWS" },
  { href: "/contact", label: "CONTACT" },
  { href: "/gallery", label: "GALLERY" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isMemberDetailPage = pathname?.startsWith("/members/");

  // Home以外のページ（Aboutなど）を「ライトテーマ（黒文字）」、Homeを「ダークテーマ（白文字）」とする
  const isHome = pathname === "/";
  const isLightMode = !isHome;

  // 背景スクロール抑止
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  if (isMemberDetailPage) {
    return null;
  }

  return (
    <header className="fixed inset-x-0 top-0 z-[60] w-full bg-transparent">
      {/* Top bar */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          aria-label="PUG LLC."
          className="flex items-center transition-opacity hover:opacity-95"
        >
          <Image
            src={
              isLightMode ? "/images/logo_dark.svg" : "/images/logo_light.svg"
            }
            alt="PUG LLC."
            width={180}
            height={24}
            priority
            className={clsx("h-4 w-auto")}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:block">
          <ul
            className={clsx(
              "flex items-center text-[11px] tracking-[0.14em] font-medium",
              isLightMode ? "text-black/60" : "text-white/60",
            )}
          >
            {NAV.map((item, i) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.label} className="flex items-center group">
                  <Link
                    href={item.href}
                    className={clsx(
                      "flex items-center py-1 uppercase transition-all duration-300 hover:opacity-100",
                      isActive ? "opacity-100 font-semibold" : "opacity-80",
                    )}
                  >
                    {isActive && (
                      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-[#FD2601]" />
                    )}
                    <span
                      className={clsx(
                        isActive && (isLightMode ? "text-black" : "text-white"),
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                  {i < NAV.length - 1 && (
                    <span className="mx-2 opacity-40">,</span>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className={clsx(
            "z-10 transition md:hidden",
            isLightMode && !menuOpen
              ? "text-[#111]"
              : "text-gray-300 hover:text-white",
          )}
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
            : "pointer-events-none opacity-0 invisible -translate-y-4",
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
                  src="/images/logo_light.svg"
                  alt="PUG LLC."
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
            © 2025 PUG LLC.
          </div>
        </div>
      </div>
    </header>
  );
}
