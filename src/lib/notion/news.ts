import { NEWS_ITEMS as STATIC_NEWS } from "@/config/news";
import type { NewsItem } from "./types";
import {
  DATABASE_IDS,
  devNotice,
  getNotionClient,
  isNotionEnabled,
} from "./client";
import {
  fetchBlocks,
  formatDisplayDate,
  getCheckbox,
  getFirstFile,
  getNumber,
  getRichText,
  getSelect,
  getDateStart,
  getTitle,
  NotionPage,
  publishedFilter,
  queryDatabase,
  slugify,
} from "./helpers";

/* ============================================================
 * 静的フォールバック（src/config/news.ts → 正規化）
 * ========================================================== */
function staticDateToIso(date: string): string | null {
  // "2025/10/9" → "2025-10-09"
  const m = date.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})/);
  if (!m) return null;
  const [, y, mo, d] = m;
  return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

function staticNews(): NewsItem[] {
  return STATIC_NEWS.map((n) => ({
    id: n.id,
    slug: n.id, // 既存 URL（/news/1 等）互換のため id をそのまま slug に
    title: n.title,
    category: n.category,
    date: n.date,
    publishedAt: staticDateToIso(n.date),
    excerpt: (n.content ?? "").slice(0, 80),
    mainImage: n.mainImage,
    featured: false,
    content: n.content,
  }));
}

/* ============================================================
 * Notion ページ → NewsItem
 * ========================================================== */
function mapNewsPage(page: NotionPage): NewsItem {
  // このDBでは Slug が title 型（主キー列, 値="1"/"2"）、Title が rich_text 型。
  // Notion の実スキーマに合わせて型を取り違えないこと。
  const title = getRichText(page, "Title");
  const publishedAt = getDateStart(page, "PublishedAt");
  return {
    id: page.id,
    slug: getTitle(page, "Slug") || slugify(title, page.id),
    title,
    category: getSelect(page, "Category"),
    date: formatDisplayDate(publishedAt),
    publishedAt,
    excerpt: getRichText(page, "Excerpt"),
    mainImage: getFirstFile(page, "MainImage"),
    featured: getCheckbox(page, "Featured"),
    sortOrder: getNumber(page, "SortOrder"),
  };
}

/* ============================================================
 * 公開 API
 * ========================================================== */
/** ニュース一覧（Published のみ、PublishedAt 降順）。失敗時は静的フォールバック。 */
export async function getNewsList(): Promise<NewsItem[]> {
  if (!isNotionEnabled("news")) {
    devNotice("News: NOTION 環境変数が未設定のため静的データを使用します。");
    return staticNews();
  }
  const client = getNotionClient();
  if (!client) return staticNews();

  try {
    const pages = await queryDatabase(client, {
      database_id: DATABASE_IDS.news!,
      filter: publishedFilter(),
      sorts: [{ property: "PublishedAt", direction: "descending" }],
    });
    return pages.map(mapNewsPage);
  } catch (e) {
    console.error("[notion] getNewsList 失敗。静的データにフォールバックします。", e);
    return staticNews();
  }
}

/** トップページ表示用。Featured 優先、無ければ最新から補完。 */
export async function getNewsForHome(limit = 3): Promise<NewsItem[]> {
  const all = await getNewsList();
  const featured = all.filter((n) => n.featured);
  const base = featured.length > 0 ? featured : all;
  return base.slice(0, limit);
}

/** 詳細用。slug（または既存 id）で 1 件取得し、本文ブロックも返す。 */
export async function getNewsBySlug(
  slug: string,
): Promise<{ item: NewsItem; blocks: unknown[] } | null> {
  if (!isNotionEnabled("news")) {
    const item = staticNews().find((n) => n.slug === slug || n.id === slug);
    return item ? { item, blocks: [] } : null;
  }
  const client = getNotionClient();
  if (!client) {
    const item = staticNews().find((n) => n.slug === slug || n.id === slug);
    return item ? { item, blocks: [] } : null;
  }

  try {
    const pages = await queryDatabase(client, {
      database_id: DATABASE_IDS.news!,
      filter: {
        and: [
          publishedFilter(),
          // Slug は title 型のため title フィルタで一致させる
          { property: "Slug", title: { equals: slug } },
        ],
      },
    });
    if (pages.length === 0) return null;
    const item = mapNewsPage(pages[0]);
    const blocks = await fetchBlocks(client, pages[0].id);
    return { item, blocks };
  } catch (e) {
    console.error("[notion] getNewsBySlug 失敗。", e);
    const fallback = staticNews().find((n) => n.slug === slug || n.id === slug);
    return fallback ? { item: fallback, blocks: [] } : null;
  }
}

/** 静的ビルド用の slug 一覧（generateStaticParams）。 */
export async function getNewsSlugs(): Promise<string[]> {
  const all = await getNewsList();
  return all.map((n) => n.slug);
}
