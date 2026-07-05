import {
  Client,
  collectPaginatedAPI,
  isFullBlock,
  isFullPage,
} from "@notionhq/client";

// Notion の生レスポンスは深くネストし、プロパティ名のリネーム/削除でも落ちないことを最優先する。
// そのため Zod で throw させず、欠損時はデフォルト値を返す「防御的ヘルパ」で正規化する。

/* ============================================================
 * 最小構造型（@notionhq/client の巨大な union を直接使わず、使う形だけ定義）
 * ========================================================== */
export type NotionRichText = {
  plain_text: string;
  href: string | null;
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
};

type NotionFile = {
  name?: string;
  type?: "file" | "external";
  file?: { url: string; expiry_time?: string };
  external?: { url: string };
};

type AnyProperty = {
  type?: string;
  title?: NotionRichText[];
  rich_text?: NotionRichText[];
  select?: { name: string } | null;
  multi_select?: { name: string }[];
  date?: { start: string | null; end: string | null } | null;
  checkbox?: boolean;
  number?: number | null;
  files?: NotionFile[];
  url?: string | null;
};

export type NotionPage = {
  id: string;
  properties: Record<string, AnyProperty>;
};

/* ============================================================
 * プロパティ抽出ヘルパ（すべて欠損安全）
 * ========================================================== */
function prop(page: NotionPage, name: string): AnyProperty | undefined {
  return page.properties?.[name];
}

export function richTextToPlain(rt?: NotionRichText[]): string {
  if (!Array.isArray(rt)) return "";
  return rt.map((t) => t?.plain_text ?? "").join("");
}

export function getTitle(page: NotionPage, name: string): string {
  return richTextToPlain(prop(page, name)?.title).trim();
}

export function getRichText(page: NotionPage, name: string): string {
  return richTextToPlain(prop(page, name)?.rich_text).trim();
}

export function getSelect(page: NotionPage, name: string): string {
  return prop(page, name)?.select?.name ?? "";
}

export function getMultiSelect(page: NotionPage, name: string): string[] {
  const ms = prop(page, name)?.multi_select;
  if (!Array.isArray(ms)) return [];
  return ms.map((o) => o?.name).filter((n): n is string => Boolean(n));
}

export function getDateStart(page: NotionPage, name: string): string | null {
  return prop(page, name)?.date?.start ?? null;
}

export function getCheckbox(page: NotionPage, name: string): boolean {
  return prop(page, name)?.checkbox ?? false;
}

export function getNumber(page: NotionPage, name: string): number | undefined {
  const n = prop(page, name)?.number;
  return typeof n === "number" ? n : undefined;
}

export function getUrl(page: NotionPage, name: string): string | undefined {
  return prop(page, name)?.url ?? undefined;
}

/** 単一ファイル URL（files プロパティの先頭）。file / external 両対応。 */
function fileUrl(f?: NotionFile): string | undefined {
  if (!f) return undefined;
  return f.file?.url ?? f.external?.url ?? undefined;
}

export function getFirstFile(
  page: NotionPage,
  name: string,
): string | undefined {
  return fileUrl(prop(page, name)?.files?.[0]);
}

export function getFiles(page: NotionPage, name: string): string[] {
  const files = prop(page, name)?.files;
  if (!Array.isArray(files)) return [];
  return files
    .map((f) => fileUrl(f))
    .filter((u): u is string => Boolean(u));
}

/** カンマ区切り rich_text を配列に（RelatedSlugs 用） */
export function getCsv(page: NotionPage, name: string): string[] {
  return getRichText(page, name)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/* ============================================================
 * 整形ユーティリティ
 * ========================================================== */
/** ISO 日付 → 表示用 "YYYY/M/D"（既存 UI の表記に合わせる）。失敗時は元文字列。 */
export function formatDisplayDate(iso: string | null): string {
  if (!iso) return "";
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return iso;
  const [, y, mo, d] = m;
  return `${y}/${Number(mo)}/${Number(d)}`;
}

/** slug 未設定時のフォールバック生成 */
export function slugify(input: string, fallback: string): string {
  const s = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9぀-ヿ一-龯]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return s || fallback;
}

/* ============================================================
 * クエリ / ブロック取得
 * ========================================================== */
/** Published のみ表示するための共通 select フィルタ */
export function publishedFilter(statusProp = "Status") {
  return {
    property: statusProp,
    select: { equals: "Published" },
  };
}

type QueryArgs = {
  database_id: string;
  filter?: unknown;
  sorts?: unknown;
};

/**
 * databases.query をページネーション込みで実行し、フルページのみを NotionPage[] で返す。
 * Notion の厳密な引数 union との摩擦を避けるため、引数はこの境界で型キャストする。
 */
export async function queryDatabase(
  client: Client,
  args: QueryArgs,
): Promise<NotionPage[]> {
  const results = await collectPaginatedAPI(
    client.databases.query,
    args as Parameters<Client["databases"]["query"]>[0],
  );
  return results.filter(isFullPage) as unknown as NotionPage[];
}

/** ページ本文ブロックを全件取得（ページネーション対応）。失敗時は空配列。 */
export async function fetchBlocks(
  client: Client,
  blockId: string,
): Promise<unknown[]> {
  try {
    const blocks = await collectPaginatedAPI(client.blocks.children.list, {
      block_id: blockId,
    });
    return blocks.filter(isFullBlock);
  } catch {
    return [];
  }
}
