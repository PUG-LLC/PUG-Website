"use client";

import { useParams, notFound } from "next/navigation";
import { MEMBERS } from "@/config/members";
import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/sections/CTA";

export default function MemberDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const currentMemberIndex = MEMBERS.findIndex((m) => m.id === id);
  const member = currentMemberIndex >= 0 ? MEMBERS[currentMemberIndex] : null;

  if (!member) {
    notFound();
  }

  const nextMember = MEMBERS[(currentMemberIndex + 1) % MEMBERS.length];

  return (
    <main className="min-h-screen bg-[#E3E3E3]">
      {/* 1. Full Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden p-2 lg:h-[85vh] lg:p-3">
        <div className="relative h-full overflow-hidden">
          <Image
            src={member.heroImage || member.image}
            alt={member.name}
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>

      {/* 2. Text Content Section (Dark) */}
      <section className="text-[#363636] py-20">
        <div className="mx-auto max-w-6xl px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left side: Name Typography */}
            <div className="lg:col-span-3 flex flex-col justify-start">
              <h1 className="text-[64px] lg:text-[84px] leading-[0.9] mb-8 lg:mb-12 whitespace-pre-line">
                {member.name.split(" ").join("\n")}
              </h1>
              <div className="flex items-center gap-2 text-red-600">
                <span className="text-[12px] lg:text-[14px]">●</span>
                <span className="text-[#363636] text-[13px] lg:text-[14px] font-medium opacity-90">
                  {member.nameJp}
                </span>
              </div>
            </div>

            {/* Right side: Detailed Profile */}
            <div className="lg:col-span-9 flex flex-col justify-start space-y-8 lg:pt-4">
              <p className="text-[13px] lg:text-[15px] leading-[1.8] lg:leading-[2] opacity-90 tracking-wider [font-feature-settings:'palt']">
                {member.description}
              </p>

              {member.influence && (
                <p className="text-[11px] lg:text-[12px] opacity-60 tracking-widest font-light">
                  影響を受けた作品 : {member.influence}
                </p>
              )}

              {member.extra && (
                <p className="text-[12px] lg:text-[13px] leading-[1.8] lg:leading-[2] opacity-80 tracking-widest font-light">
                  {member.extra}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Image Gallery Section */}
      <section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Main Large Image */}
          <div className="relative aspect-square">
            <Image
              src={member.galleryMain || member.image}
              alt={`${member.name} Gallery 01`}
              fill
              className="object-cover"
            />
          </div>

          {/* 2x2 Supporting Gallery */}
          <div className="grid grid-cols-2">
            {(member.gallerySub || []).map((img, i) => (
              <div key={i} className="relative aspect-square">
                <Image
                  src={img}
                  alt={`${member.name} Gallery ${i + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-black/10 bg-[#E3E3E3] px-4 py-5 lg:px-8 lg:py-16">
          <div className="mx-auto grid max-w-5xl grid-cols-2 items-center gap-4 text-[#363636]">
            <Link
              href="/members"
              className="flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.14em] transition-opacity hover:opacity-60 lg:text-[14px]"
            >
              <span aria-hidden>←</span>
              <span>Back to Index</span>
            </Link>

            <Link
              href={`/members/${nextMember.id}`}
              className="flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.14em] transition-opacity hover:opacity-60 lg:text-[14px]"
            >
              <span>Next Member</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
