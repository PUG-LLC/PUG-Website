import { news } from "./data";
import type { NewsItem } from "./types";
export async function getNewsList(): Promise<NewsItem[]> {
  return [...news].sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
}
export async function getNewsForHome(limit = 3): Promise<NewsItem[]> {
  const all = await getNewsList();
  const featured = all.filter(n => n.featured);
  return (featured.length ? featured : all).slice(0, limit);
}
export async function getNewsBySlug(slug: string): Promise<{ item: NewsItem } | null> {
  const item = news.find(n => n.slug === slug || n.id === slug);
  return item ? { item } : null;
}
export async function getNewsSlugs(): Promise<string[]> { return news.map(n => n.slug); }
