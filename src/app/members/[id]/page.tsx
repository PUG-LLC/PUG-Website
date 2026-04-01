"use client";

import { useParams, notFound } from "next/navigation";
import { MEMBERS } from "@/config/members";
import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/sections/CTA";

export default function MemberDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const member = MEMBERS.find((m) => m.id === id);

  if (!member) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#1D1D1D]">
      {/* 1. Full Hero Section */}
      <section className="relative -mt-16 w-full h-[70vh] lg:h-[85vh] overflow-hidden">
        <Image
          src={member.heroImage || member.image}
          alt={member.name}
          fill
          priority
          className="object-cover"
        />
      </section>

      {/* 2. Text Content Section (Dark) */}
      <section className="text-white py-20">
        <div className="mx-auto max-w-6xl px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left side: Name Typography */}
            <div className="lg:col-span-3 flex flex-col justify-start">
              <h1 className="text-[64px] lg:text-[84px] font-bold leading-[0.9] mb-8 lg:mb-12 whitespace-pre-line">
                {member.name.split(" ").join("\n")}
              </h1>
              <div className="flex items-center gap-2 text-red-600">
                <span className="text-[12px] lg:text-[14px]">●</span>
                <span className="text-white text-[13px] lg:text-[14px] font-medium opacity-90">
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
      </section>

      <CTA />
    </main>
  );
}
