// src/components/sections/Members.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import Caret from "../ui/Caret";
import { ArrowUpRight } from "lucide-react";

import type { Member } from "@/lib/content/types";

export default function Members({ members }: { members: Member[] }) {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#1B1B1B] text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        {/* Header */}
        <header className="max-w-3xl">
          <h2 className="font-serif text-[clamp(28px,4.6vw,44px)] leading-none text-white/95">
            -Members
          </h2>
          <p className="pt-1 text-[13px] tracking-[0.2em] text-white/95 uppercase">
            パグたち
          </p>
          <p className="mt-5 text-[13.5px] leading-[2.1] tracking-[0.02em] text-white/75 ">
            つくることを通して、世の中に素敵な瞬間を引き起こします。
            <Caret />
          </p>

          <div className="mt-6">
            <Link
              href={"/members"}
              prefetch={false}
              className="group inline-flex items-center gap-2 rounded-full border border-white/60 px-6 py-2.5 text-[13px] font-medium text-white transition-all hover:bg-white hover:text-black"
            >
              Members Page
              <ArrowUpRight
                size={16} // or 18
                strokeWidth={1.75}
                aria-hidden="true"
                className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </header>

        {/* Members */}
        <ul className="mt-14 grid grid-cols-1 gap-x-16 gap-y-16 md:grid-cols-2">
          {members.map((m) => (
            <li key={m.id} className="relative flex flex-col gap-2">
              {/* 行レイアウト：左アバター 96px、右テキスト */}
              <div className="flex justify-between">
                <div className="flex items-start gap-6">
                  {/* Avatar（縦長 3:4） */}
                  <div className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden rounded-[3px] border border-white/15 bg-white/5">
                    <Image
                      src={m.image}
                      alt={`${m.name} portrait`}
                      fill
                      sizes="96px"
                      className="object-cover object-center grayscale transition-all duration-500 hover:grayscale-0"
                    />
                  </div>

                  {/* Texts */}
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase leading-tight tracking-[0.18em] text-white/60">
                      {m.role}
                    </p>
                    <p className="mt-1.5 text-[22px] text-white">{m.name}</p>
                  </div>
                </div>
                {/* 赤ドット */}
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full bg-[#FF3B00]"
                />
              </div>

              {/* Bio：横幅を絞って読みやすく */}
              <p className="mt-3 text-[13px] font-medium leading-[1.9] text-white/75 ">
                {m.description}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* 上下ビネット（ごく薄く） */}
      <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_40px_80px_-40px_rgba(0,0,0,0.6),inset_0_-40px_80px_-40px_rgba(0,0,0,0.6)]" />
    </section>
  );
}
