"use client";

import { useParams, notFound } from "next/navigation";
import { TEAM_MEMBERS } from "@/config/team";
import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/sections/CTA";

export default function TeamDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const member = TEAM_MEMBERS.find((m) => m.id === id);

  if (!member) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#ebebeb] text-[#1a1a1a]">
      {/* 1. Member Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-32 lg:pt-48 pb-24 lg:pb-32">
        <Link 
          href="/team" 
          className="inline-flex items-center gap-2 text-[12px] tracking-widest text-[#666] hover:opacity-50 transition-opacity mb-16 lg:mb-24"
        >
          ← Team
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          <div className="lg:col-span-6 space-y-6 lg:space-y-8">
            <h1 className="text-[clamp(40px,6vw,64px)] font-medium leading-tight tracking-tight">
              {member.name}
            </h1>
            <div className="space-y-2">
              <p className="text-[14px] lg:text-[16px] text-[#222] font-medium tracking-widest">
                {member.nameJp}
              </p>
              <p className="text-[12px] lg:text-[13px] text-[#666] tracking-[0.2em] font-medium uppercase">
                {member.role}
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden grayscale">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Profile Section */}
      <section className="mx-auto max-w-7xl px-6 pb-40 lg:pb-64">
        <div className="max-w-3xl">
          <div className="mb-12 lg:mb-16">
            <h2 className="font-serif text-[clamp(32px,4vw,44px)] font-normal leading-tight">
              -Profile
            </h2>
            <p className="text-[12px] tracking-[0.1em] text-[#666] mt-2">
              プロフィール
            </p>
          </div>
          
          <p className="text-[15px] lg:text-[16px] leading-[2.6] text-[#333] [font-feature-settings:'palt'] tracking-wide whitespace-pre-wrap">
            {member.description}
          </p>
        </div>
      </section>

      <CTA />
    </main>
  );
}
