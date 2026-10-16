"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/sections/CTA";
import { useState, useEffect } from "react";
import clsx from "clsx";
import type { Work, WorkMember } from "@/lib/content/types";

type NavItem = {
  id: string;
  label: string;
  subItems?: { name: string }[];
};

export default function WorkDetail({
  work,
  members,
  relatedWorks,
}: {
  work: Work;
  members: WorkMember[];
  relatedWorks: Work[];
}) {
  const hasProcess = Boolean(work.process);
  const hasCreations = work.creations.length > 0;
  const hasMembers = members.length > 0;

  // 入力のあるセクションだけをナビゲーション対象にする
  const navItems: NavItem[] = [
    { id: "overview", label: "Overview" },
    ...(hasProcess ? [{ id: "process", label: "Process" } as NavItem] : []),
    ...(hasCreations
      ? [
          {
            id: "works",
            label: "Works",
            subItems: work.creations.map((c) => ({ name: c.title })),
          } as NavItem,
        ]
      : []),
    ...(hasMembers ? [{ id: "members", label: "Members" } as NavItem] : []),
  ];

  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { root: null, rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // navItems はレンダー毎に作られるが、依存は work の同一性で十分
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [work.slug]);

  return (
    <main className="min-h-screen bg-[#ebebeb] text-[#1a1a1a]">
      {/* 1. Main Visual */}
      <section className="relative h-[60vh] lg:h-[85vh] w-full overflow-hidden pr-0 pt-24 lg:pr-[5%]">
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={work.mainImage}
            alt={work.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-16 pt-12 lg:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative">
          {/* Left Column: Content */}
          <div className="lg:col-span-9">
            <header className="mb-24 lg:mb-40">
              <p className="text-[16px] font-medium tracking-widest text-[#666] mb-4">
                {work.client}
              </p>
              <h1 className="text-[clamp(24px,3.5vw,40px)] font-medium leading-[1.2] [font-feature-settings:'palt'] tracking-tight">
                {work.title}
              </h1>
              {work.categories.length > 0 && (
                <p className="mt-4 text-[11px] tracking-[0.2em] text-[#888] font-medium uppercase">
                  {work.categories.join(" / ")}
                </p>
              )}
            </header>

            {/* 2. Overview */}
            <section id="overview" className="scroll-mt-40 mb-24 lg:mb-40">
              <h2 className="font-serif text-[32px] lg:text-[44px] font-normal">
                -Overview
              </h2>
              <p className="text-[13px] tracking-[0.2em] text-[#666] opacity-80 uppercase mb-8 lg:mb-12">
                プロジェクト概要
              </p>
              <p className="text-[15px] lg:text-[16px] leading-[2.6] text-[#333] [font-feature-settings:'palt'] tracking-wide whitespace-pre-wrap">
                {work.overview}
              </p>
            </section>

            {/* 3. Process */}
            {work.process && (
              <section
                id="process"
                className="scroll-mt-40 mb-32 lg:mb-56 border-t border-black/10 pt-10 lg:pt-16"
              >
                <h2 className="font-serif text-[32px] lg:text-[44px] font-normal">
                  -Process
                </h2>
                <p className="text-[13px] tracking-[0.2em] text-[#666] opacity-80 uppercase mb-8 lg:mb-12">
                  制作プロセス
                </p>

                {work.process.image && (
                  <div className="relative aspect-video lg:aspect-[16/9] overflow-hidden rounded-[2px] bg-neutral-200 mb-8 lg:mb-12">
                    <Image
                      src={work.process.image}
                      alt={work.process.title || work.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                  </div>
                )}

                {work.process.title && (
                  <h3 className="text-[18px] lg:text-[20px] font-bold mb-4 [font-feature-settings:'palt']">
                    {work.process.title}
                  </h3>
                )}
                {work.process.body && (
                  <p className="text-[14px] lg:text-[15px] leading-[2.4] text-[#444] [font-feature-settings:'palt'] whitespace-pre-wrap max-w-2xl">
                    {work.process.body}
                  </p>
                )}

                {work.process.gallery.length > 0 && (
                  <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {work.process.gallery.map((src, i) => (
                      <div
                        key={i}
                        className="relative aspect-square overflow-hidden rounded-[2px] bg-neutral-200"
                      >
                        <Image
                          src={src}
                          alt={`${work.process?.title || work.title} ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* 4. Works (Creations) */}
            {hasCreations && (
              <section
                id="works"
                className="scroll-mt-40 mb-32 lg:mb-56 border-t border-black/10 pt-10 lg:pt-16"
              >
                <h2 className="font-serif text-[32px] lg:text-[44px] font-normal">
                  -Works
                </h2>
                <p className="text-[13px] tracking-[0.2em] text-[#666] opacity-80 uppercase mb-8 lg:mb-12">
                  制作物
                </p>
                <div className="space-y-32 lg:space-y-56">
                  {work.creations.map((item, i) => (
                    <motion.div
                      key={i}
                      className="space-y-8"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                    >
                      {item.images.length > 0 && (
                        <div className="space-y-4 lg:space-y-6">
                          {item.images.map((src, idx) => (
                            <div
                              key={idx}
                              className="relative aspect-video lg:aspect-[16/9] overflow-hidden rounded-[2px] bg-neutral-200"
                            >
                              <Image
                                src={src}
                                alt={`${item.title} ${idx + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 66vw"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="max-w-2xl">
                        {item.title && (
                          <h3 className="text-[12px] font-bold tracking-[0.2em] mb-4 uppercase text-[#111]">
                            {item.title}
                          </h3>
                        )}
                        {item.description && (
                          <p className="text-[14px] lg:text-[15px] leading-[2.4] text-[#444] [font-feature-settings:'palt'] whitespace-pre-wrap">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* 5. Members（Members multi_select を Members DB で解決した氏名/役職/画像） */}
            {hasMembers && (
              <section
                id="members"
                className="scroll-mt-40 mb-32 lg:mb-56 border-t border-black/10 pt-10 lg:pt-16"
              >
                <h2 className="font-serif text-[32px] lg:text-[44px] font-normal">
                  -Members
                </h2>
                <p className="text-[13px] tracking-[0.2em] text-[#666] opacity-80 uppercase mb-8 lg:mb-12">
                  プロジェクトメンバー
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-8">
                  {members.map((member) => (
                    <Link
                      key={member.slug}
                      href={`/members/${member.slug}`}
                      className="group flex items-center gap-5"
                    >
                      <div className="relative aspect-square w-16 lg:w-20 shrink-0 overflow-hidden grayscale rounded-[2px] bg-neutral-200 transition-all duration-500 group-hover:grayscale-0">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="min-w-0">
                        {member.role && (
                          <p className="text-[11px] font-medium tracking-wide text-[#888] mb-0.5 truncate">
                            {member.role}
                          </p>
                        )}
                        <p className="text-[15px] lg:text-[16px] font-bold text-[#111] leading-tight group-hover:opacity-60 transition-opacity">
                          {member.name}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Sticky Navigation */}
          <aside className="hidden lg:block lg:col-span-3 h-full">
            <nav className="sticky top-40 pl-20 pb-20">
              <ul className="flex flex-col gap-10">
                {navItems.map((item) => (
                  <li key={item.id} className="group">
                    <button
                      onClick={() => {
                        document
                          .getElementById(item.id)
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={clsx(
                        "flex items-start gap-4 transition-all duration-300 text-left",
                        activeSection === item.id
                          ? "opacity-100"
                          : "opacity-40 hover:opacity-60",
                      )}
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <motion.span
                            className="h-1.5 w-1.5 rounded-full bg-[#FD2601]"
                            initial={false}
                            animate={{
                              scale: activeSection === item.id ? 1 : 0,
                            }}
                          />
                          <span className="text-[12px] font-bold tracking-[0.2em] uppercase">
                            {item.label}
                          </span>
                        </div>

                        {/* Sub items for Works */}
                        {item.id === "works" && item.subItems && (
                          <ul className="flex flex-col gap-2.5 ml-4">
                            {item.subItems.map((sub, idx) => (
                              <li
                                key={idx}
                                className="text-[10px] tracking-widest text-[#666] font-medium flex items-center gap-2"
                              >
                                <span className="h-[1px] w-3 bg-black/10" />
                                {sub.name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </div>

      {/* 6. Other Works */}
      {relatedWorks.length > 0 && (
        <section className="relative py-24 lg:py-32 border-t border-black/5 overflow-hidden">
          <Image
            src="/images/backgroundImage.png"
            alt=""
            fill
            className="object-cover pointer-events-none opacity-80"
            priority={false}
          />
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-12 lg:px-16">
            <header className="mb-12 lg:mb-16">
              <h2 className="font-serif text-[clamp(32px,4vw,44px)] font-normal leading-tight">
                -Other Works
              </h2>
              <p className="text-[12px] tracking-[0.1em] text-[#666] mt-2">
                その他の実績
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-20">
              {relatedWorks.map((w) => (
                <Link key={w.id} href={`/work/${w.slug}`} className="group">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-[1px] bg-neutral-200/50 mb-6">
                    <Image
                      src={w.mainImage}
                      alt={w.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="space-y-2 [font-feature-settings:'palt']">
                    <p className="text-[12px] text-[#666] font-medium tracking-wider">
                      {w.client}
                    </p>
                    <h3 className="text-[17px] lg:text-[19px] text-[#111] font-bold leading-tight group-hover:opacity-70 transition-opacity">
                      {w.title}
                    </h3>
                    <p className="text-[11px] text-[#888] tracking-widest leading-relaxed">
                      {w.categories.join(" / ")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex justify-center">
              <Link
                href="/work"
                className="group flex items-center gap-6 px-14 py-3 border border-black/40 rounded-full text-[13px] tracking-[0.1em] font-medium hover:bg-black hover:text-white transition-all duration-300"
              >
                View More
                <span className="text-[16px] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </section>
      )}

      <CTA />
    </main>
  );
}
