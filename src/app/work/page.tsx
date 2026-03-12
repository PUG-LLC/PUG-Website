"use client";

import WorkHero from "@/components/sections/work/WorkHero";
import WorkList from "@/components/sections/work/WorkList";
import CTA from "@/components/sections/CTA";

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[#ebebeb]">
      <WorkHero />
      <WorkList />
      <div className="bg-[#ebebeb]">
        <CTA />
      </div>
    </main>
  );
}
