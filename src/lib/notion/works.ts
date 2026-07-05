import { WORKS as STATIC_WORKS } from "@/config/works";
import type { Work } from "./types";
import {
  DATABASE_IDS,
  devNotice,
  getNotionClient,
  isNotionEnabled,
} from "./client";
import {
  getCheckbox,
  getFiles,
  getFirstFile,
  getMultiSelect,
  getNumber,
  getRichText,
  getTitle,
  NotionPage,
  publishedFilter,
  queryDatabase,
  slugify,
} from "./helpers";

// MainImage 欠損時のフォールバック（next/image が空文字で落ちないように）
const PLACEHOLDER_IMAGE = "/images/backgroundImage.png";

/* ============================================================
 * 静的フォールバック（src/config/works.ts → 正規化）
 * ========================================================== */
function staticWorks(): Work[] {
  return STATIC_WORKS.map((w) => ({
    id: w.id,
    slug: w.id, // 既存 URL（/work/1 等）互換
    title: w.title,
    client: w.client,
    overview: w.overview,
    mainImage: w.mainImage,
    categories: w.categories ?? [],
    featured: false,
    process: undefined,
    creations: (w.deliverables ?? []).map((d) => ({
      title: d.name,
      description: d.description,
      images: d.thumbnail ? [d.thumbnail] : [],
    })),
    // 静的フォールバックは Members DB を持たないため空（オフライン時のみ通る経路）
    members: [],
  }));
}

/* ============================================================
 * Notion ページ → Work（構造化: Creation1〜5 / Process / Members を読む）
 * ========================================================== */
function mapWorkPage(page: NotionPage): Work {
  const title = getTitle(page, "Title");

  // Creation1〜5 → creations（title/p/img のいずれかが入っているものだけ採用）
  const creations = [];
  for (let i = 1; i <= 5; i++) {
    const cTitle = getRichText(page, `Creation${i}-title`);
    const cDesc = getRichText(page, `Creation${i}-p`);
    const cImages = getFiles(page, `Creation${i}-img`);
    if (cTitle || cDesc || cImages.length > 0) {
      creations.push({ title: cTitle, description: cDesc, images: cImages });
    }
  }

  // Process セクション
  const pTitle = getRichText(page, "Process-title");
  const pBody = getRichText(page, "Process");
  const pImage = getFirstFile(page, "Process-img");
  const pGallery = getFiles(page, "Process-gallery");
  const process =
    pTitle || pBody || pImage || pGallery.length > 0
      ? { title: pTitle, body: pBody, image: pImage, gallery: pGallery }
      : undefined;

  return {
    id: page.id,
    slug: getRichText(page, "Slug") || slugify(title, page.id),
    title,
    client: getRichText(page, "Client"),
    overview: getRichText(page, "Overview"),
    // Notion 側のプロパティ名が "MainImage "（末尾スペース）になっているため両対応
    mainImage:
      getFirstFile(page, "MainImage") ??
      getFirstFile(page, "MainImage ") ??
      PLACEHOLDER_IMAGE,
    categories: getMultiSelect(page, "Categories"),
    featured: getCheckbox(page, "Featured"),
    sortOrder: getNumber(page, "SortOrder"),
    process,
    creations,
    // Members は multi_select（メンバー slug）。表示は Members DB から解決する
    members: getMultiSelect(page, "Members"),
  };
}

function sortWorks(items: Work[]): Work[] {
  // SortOrder 入力ありは昇順に並べる。未入力（同順扱い）は Notion の元順を反転した順で表示する。
  // 先に反転 → 安定ソートすることで、SortOrder付きは数値位置へ、未入力分は反転相対順を保持。
  return [...items].reverse().sort((a, b) => {
    const ao = a.sortOrder ?? Number.POSITIVE_INFINITY;
    const bo = b.sortOrder ?? Number.POSITIVE_INFINITY;
    return ao - bo;
  });
}

/* ============================================================
 * 公開 API
 * ========================================================== */
/** 制作実績一覧（Published のみ）。SortOrder 昇順。失敗時は静的フォールバック。 */
export async function getWorksList(): Promise<Work[]> {
  if (!isNotionEnabled("works")) {
    devNotice("Works: NOTION 環境変数が未設定のため静的データを使用します。");
    return staticWorks();
  }
  const client = getNotionClient();
  if (!client) return staticWorks();

  try {
    const pages = await queryDatabase(client, {
      database_id: DATABASE_IDS.works!,
      filter: publishedFilter(),
    });
    return sortWorks(pages.map(mapWorkPage));
  } catch (e) {
    console.error("[notion] getWorksList 失敗。静的データにフォールバックします。", e);
    return staticWorks();
  }
}

/** トップページ表示用（現状トップに一覧は無いが将来用）。Featured 優先。 */
export async function getWorksForHome(limit = 3): Promise<Work[]> {
  const all = await getWorksList();
  const featured = all.filter((w) => w.featured);
  return (featured.length > 0 ? featured : all).slice(0, limit);
}

/** 詳細用。slug（または既存 id）で 1 件取得。本文は構造化プロパティから組み立てる。 */
export async function getWorkBySlug(
  slug: string,
): Promise<{ item: Work } | null> {
  const client = getNotionClient();

  if (!isNotionEnabled("works") || !client) {
    const item = staticWorks().find((w) => w.slug === slug || w.id === slug);
    return item ? { item } : null;
  }

  try {
    const pages = await queryDatabase(client, {
      database_id: DATABASE_IDS.works!,
      filter: {
        and: [
          publishedFilter(),
          // Works の Slug は rich_text 型
          { property: "Slug", rich_text: { equals: slug } },
        ],
      },
    });
    if (pages.length === 0) return null;
    return { item: mapWorkPage(pages[0]) };
  } catch (e) {
    console.error("[notion] getWorkBySlug 失敗。", e);
    const fallback = staticWorks().find(
      (w) => w.slug === slug || w.id === slug,
    );
    return fallback ? { item: fallback } : null;
  }
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
