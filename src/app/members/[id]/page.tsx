import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/sections/CTA";
import { getMemberBySlug, getMembersSlugs } from "@/lib/content/members";

// 注: ルートフォルダ名は既存の [id] のまま（URL 互換）。値は slug を表す。
export const revalidate = false;
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getMembersSlugs();
  return slugs.map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = await getMemberBySlug(id);
  if (!data) return { title: "Members" };
  return {
    title: `${data.member.name}（${data.member.nameJp}）`,
    description: data.member.description?.slice(0, 120) || undefined,
  };
}

export default async function MemberDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getMemberBySlug(id);

  if (!data) {
    notFound();
  }

  const { member, nextMember } = data;

  // GalleryImages（Notion では 1 枚にまとめている運用）。複数枚でも縦積みで対応。
  const galleryImages = [
    member.galleryMain,
    ...(member.gallerySub ?? []),
  ].filter((src): src is string => Boolean(src));

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
            sizes="100vw"
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

      {/* 3. Image Gallery Section（GalleryImages は 1 枚にまとめた画像を全幅・非クロップで表示） */}
      <section className="bg-white">
        {galleryImages.length > 0 && (
          <div className="flex flex-col">
            {galleryImages.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt={`${member.name} Gallery ${i + 1}`}
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-full"
              />
            ))}
          </div>
        )}

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
              href={`/members/${nextMember.slug}`}
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
