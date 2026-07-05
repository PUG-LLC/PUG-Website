import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WorkDetail from "@/components/sections/work/WorkDetail";
import {
  getWorkBySlug,
  getRelatedWorks,
  getWorksSlugs,
} from "@/lib/notion/works";
import { getMembersList } from "@/lib/notion/members";
import type { WorkMember } from "@/lib/notion/types";

// 注: ルートフォルダ名は既存の [id] のまま（URL 互換）。値は slug を表す。
export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getWorksSlugs();
  return slugs.map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = await getWorkBySlug(id);
  if (!data) return { title: "Works" };
  return {
    title: data.item.title,
    description: data.item.overview?.slice(0, 120) || undefined,
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getWorkBySlug(id);

  if (!data) {
    notFound();
  }

  const { item } = data;

  // Members（multi_select の slug）を Members DB の氏名/役職/画像に解決
  const allMembers = await getMembersList();
  const memberMap = new Map(allMembers.map((m) => [m.slug, m]));
  const members: WorkMember[] = item.members
    .map((slug) => memberMap.get(slug))
    .filter((m): m is NonNullable<typeof m> => Boolean(m))
    .map((m) => ({ slug: m.slug, name: m.name, role: m.role, image: m.image }));

  const relatedWorks = await getRelatedWorks(item.slug, item.categories, 3);

  return (
    <WorkDetail work={item} members={members} relatedWorks={relatedWorks} />
  );
}
