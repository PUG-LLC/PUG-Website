"use client";

import MembersHero from "@/components/sections/members/MembersHero";
import MemberList from "@/components/sections/members/MemberList";
import CTA from "@/components/sections/CTA";

export default function MembersPage() {
  return (
    <main className="min-h-screen bg-[#ebebeb] text-[#1a1a1a]">
      <MembersHero />
      <MemberList />
      <CTA />
    </main>
  );
}
