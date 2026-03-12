"use client";

import TeamHero from "@/components/sections/team/TeamHero";
import MemberList from "@/components/sections/team/MemberList";
import CTA from "@/components/sections/CTA";

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-[#ebebeb] text-[#1a1a1a]">
      <TeamHero />
      <MemberList />
      <CTA />
    </main>
  );
}
