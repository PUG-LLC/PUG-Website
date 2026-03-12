"use client";

import { useParams, notFound } from "next/navigation";
import { WORKS } from "@/config/works";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/sections/CTA";
import { useState, useEffect } from "react";
import clsx from "clsx";

export default function WorkDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const work = WORKS.find((w) => w.id === id);

  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    ["overview", "works", "members", "voice"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (!work) {
    notFound();
  }

  const relatedWorks = WORKS.filter((w) =>
    work.relatedIds.includes(w.id),
  ).slice(0, 3);

  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "works", label: "Works", subItems: work.deliverables },
    { id: "members", label: "Members" },
    { id: "voice", label: "Voice", show: !!work.voice },
  ];

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
            </header>

            {/* 2. Overview */}
            <section id="overview" className="scroll-mt-40 mb-10 lg:mb-16">
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

            {/* 3. Works (Deliverables) */}
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
                {work.deliverables.map((item, i) => (
                  <motion.div
                    key={i}
                    className="space-y-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="relative aspect-video lg:aspect-[16/9] overflow-hidden rounded-[2px] bg-neutral-200">
                      <Image
                        src={item.thumbnail}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="max-w-2xl">
                      <h3 className="text-[12px] font-bold tracking-[0.2em] mb-4 uppercase text-[#111]">
                        {item.name}
                      </h3>
                      <p className="text-[14px] lg:text-[15px] leading-[2.4] text-[#444] [font-feature-settings:'palt']">
                        {item.description}
                      </p>
                      {item.link && (
                        <Link
                          href={item.link}
                          target="_blank"
                          className="inline-block mt-6 text-[11px] tracking-[0.3em] font-medium border-b border-black pb-1 hover:opacity-50 transition-opacity"
                        >
                          VIEW PROJECT
                        </Link>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 4. Members */}
            <section id="members" className="scroll-mt-40 mb-32 lg:mb-56">
              <h2 className="font-serif text-[32px] lg:text-[44px] font-normal">
                -Members
              </h2>
              <p className="text-[13px] tracking-[0.2em] text-[#666] opacity-80 uppercase mb-8 lg:mb-12">
                プロジェクトメンバー
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-16">
                {work.members.map((member, i) => (
                  <div key={i} className="flex items-center gap-6">
                    <div className="relative aspect-square w-24 lg:w-28 overflow-hidden grayscale flex-shrink-0">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-[#666] mb-1 opacity-80">
                        {member.role}
                      </p>
                      <p className="text-[18px] lg:text-[20px] font-bold text-[#111] leading-tight">
                        {member.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Voice */}
            {work.voice && (
              <section
                id="voice"
                className="scroll-mt-40 mb-32 lg:mb-56 pb-24 border-t border-black/10 pt-24 lg:pt-40"
              >
                <h2 className="font-serif text-[32px] lg:text-[44px] mb-12 lg:mb-16 font-normal">
                  -Voice
                </h2>
                <div className="max-w-3xl">
                  <p className="text-[16px] lg:text-[18px] leading-[2.6] text-[#222] italic [font-feature-settings:'palt']">
                    「{work.voice}」
                  </p>
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Sticky Navigation */}
          <aside className="hidden lg:block lg:col-span-3 h-full">
            <nav className="sticky top-40 pl-20 pb-20">
              <ul className="flex flex-col gap-10">
                {navItems.map(
                  (item) =>
                    item.show !== false && (
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
                            {item.id === "works" && (
                              <ul className="flex flex-col gap-2.5 ml-4">
                                {item.subItems?.map((sub, idx) => (
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
                    ),
                )}
              </ul>
            </nav>
          </aside>
        </div>
      </div>

      {/* 6. Other Works */}
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
              <Link key={w.id} href={`/work/${w.id}`} className="group">
                <div className="relative aspect-[3/2] overflow-hidden rounded-[1px] bg-neutral-200/50 mb-6">
                  <Image
                    src={w.mainImage}
                    alt={w.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
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

      <CTA />
    </main>
  );
}
