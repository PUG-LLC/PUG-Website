'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'Gallery',  href: '/gallery',  active: true },
  { label: 'Works',    href: '/work' },
  { label: 'Members',  href: '/members' },
  { label: 'Contact',  href: '/contact' },
];

export function GalleryNav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-7 left-7 z-50 flex items-center gap-4"
    >
      {/* Logo mark */}
      <Link href="/" aria-label="PUG LLC." className="flex items-center opacity-60 hover:opacity-100 transition-opacity duration-300">
        <Image
          src="/images/logo_dark.svg"
          alt="PUG"
          width={64}
          height={20}
          className="h-3.5 w-auto"
          priority
        />
      </Link>

      {/* Divider */}
      <span className="h-4 w-px bg-black/15" />

      {/* Nav items */}
      <ul className="flex items-center gap-0.5">
        {NAV_ITEMS.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className={`
                px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.14em] transition-all duration-250
                ${item.active
                  ? 'bg-black/[0.06] text-black/80 font-medium'
                  : 'text-black/40 hover:text-black/70 hover:bg-black/[0.04]'
                }
              `}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
