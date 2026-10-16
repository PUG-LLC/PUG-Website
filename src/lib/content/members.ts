import { members } from "./data";
import type { Member } from "./types";
export async function getMembersList(): Promise<Member[]> { return [...members]; }

/** トップページ表示用。Featured があればそれを、無ければ全員（既存挙動を維持）。 */
export async function getMembersForHome(): Promise<Member[]> {
  const all = await getMembersList();
  const featured = all.filter((m) => m.featured);
  return featured.length > 0 ? featured : all;
}

/** 詳細用。slug（または id）でメンバーと「次のメンバー」を返す。 */
export async function getMemberBySlug(
  slug: string,
): Promise<{ member: Member; nextMember: Member } | null> {
  const all = await getMembersList();
  const index = all.findIndex((m) => m.slug === slug || m.id === slug);
  if (index < 0) return null;
  return {
    member: all[index],
    nextMember: all[(index + 1) % all.length],
  };
}

/** 静的ビルド用の slug 一覧（generateStaticParams）。 */
export async function getMembersSlugs(): Promise<string[]> {
  const all = await getMembersList();
  return all.map((m) => m.slug);
}
