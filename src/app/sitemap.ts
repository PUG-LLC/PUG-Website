// app/sitemap.ts
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://pug-cs.com";
  // 固定ページの一覧（必要に応じて追加/編集）
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${base}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/news`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/members`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/gallery`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    // NOTE: `/alua` は実ルートが存在しないため削除。専用ページ作成後に再追加する。
  ];

  // ==== 動的ルートがある場合の例（DB/FSから取得して連結） ====
  // const news = await getAllNewsSlugs(); // 例: [{ slug: "senseki-poster", updatedAt: "2025-10-09" }, ...]
  // const newsEntries: MetadataRoute.Sitemap = news.map(n => ({
  //   url: `${base}/news/${n.slug}`,
  //   lastModified: n.updatedAt ? new Date(n.updatedAt) : new Date(),
  //   changeFrequency: "monthly",
  //   priority: 0.7,
  // }));

  // return [...staticPages, ...newsEntries];

  return staticPages;
}
