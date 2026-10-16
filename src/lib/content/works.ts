import { works } from "./data";
import type { Work } from "./types";

export async function getWorksList(): Promise<Work[]> { return [...works]; }
export async function getWorksForHome(limit = 3): Promise<Work[]> {
  const featured = works.filter(w => w.featured);
  return (featured.length ? featured : works).slice(0, limit);
}
export async function getWorkBySlug(slug: string): Promise<{ item: Work } | null> {
  const item = works.find(w => w.slug === slug || w.id === slug);
  return item ? { item } : null;
}

/**
 * 関連実績。カテゴリが重なる実績を優先し、不足分は他の実績で補完する。
 * （RelatedSlugs は廃止されたため、Categories ベースで関連付ける）
 */
export async function getRelatedWorks(
  excludeSlug: string,
  categories: string[] = [],
  limit = 3,
): Promise<Work[]> {
  const all = (await getWorksList()).filter((w) => w.slug !== excludeSlug);
  const shared = all.filter((w) =>
    w.categories.some((c) => categories.includes(c)),
  );
  const rest = all.filter((w) => !shared.some((s) => s.slug === w.slug));
  return [...shared, ...rest].slice(0, limit);
}

/** 静的ビルド用の slug 一覧（generateStaticParams）。 */
export async function getWorksSlugs(): Promise<string[]> {
  const all = await getWorksList();
  return all.map((w) => w.slug);
}
