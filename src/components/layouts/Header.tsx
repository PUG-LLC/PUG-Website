// src/components/layouts/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/service", label: "SERVICE" },
  { href: "/team", label: "TEAM" },
  { href: "/news", label: "NEWS" },
  { href: "/contact", label: "CONTACT" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        // 画面上部に固定（スクロール追従）
        "fixed inset-x-0 top-0 z-50 w-full",
        "transition-colors duration-300"
      )}
    >
      <div
        className={clsx(
          "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 bg-transparent"
        )}
      >
        {/* Left: Logo */}
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

        {/* Right: comma-separated nav */}
        <nav className="hidden md:block">
          <ul className="flex items-center text-[12px] tracking-widest text-[#C8C8C8]">
            {NAV.map((item, i) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);
              return (
                <li key={item.href} className="flex items-center">
                  <Link
                    href={item.href}
                    className={clsx(
                      "py-1 uppercase transition-opacity hover:opacity-50",
                      active ? "opacity-100" : "opacity-75"
                    )}
                  >
                    {item.label}
                  </Link>
                  {i < NAV.length - 1 && <span aria-hidden>,</span>}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
