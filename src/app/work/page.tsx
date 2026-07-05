import type { Metadata } from "next";
import WorkHero from "@/components/sections/work/WorkHero";
import WorkList from "@/components/sections/work/WorkList";
import CTA from "@/components/sections/CTA";
import { getWorksList } from "@/lib/notion/works";

// ISR: 5 分ごとに再生成
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Works",
  description: "PUG LLC. の制作実績。",
};

export default async function WorkPage() {
  const items = await getWorksList();

  return (
    <main className="min-h-screen bg-[#ebebeb]">
      <WorkHero />
      <WorkList items={items} />
      <div className="bg-[#ebebeb]">
        <CTA />
      </div>
    </main>
  );
}
