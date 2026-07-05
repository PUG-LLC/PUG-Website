import type { Metadata } from "next";
import MembersHero from "@/components/sections/members/MembersHero";
import MemberList from "@/components/sections/members/MemberList";
import CTA from "@/components/sections/CTA";
import { getMembersList } from "@/lib/notion/members";

// ISR: 5 分ごとに再生成
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Members",
  description: "PUG LLC. のメンバー紹介。",
};

export default async function MembersPage() {
  const members = await getMembersList();

  return (
    <main className="min-h-screen bg-[#ebebeb] text-[#1a1a1a]">
      <MembersHero />
      <MemberList members={members} />
      <CTA />
    </main>
  );
}
