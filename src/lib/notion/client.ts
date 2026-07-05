import { Client } from "@notionhq/client";

// このモジュールはサーバー専用。client.ts / helpers.ts / news.ts / works.ts / members.ts は
// "use client" コンポーネントから import しないこと（@notionhq/client がクライアントへ混入する）。
// データ取得関数は必ず Server Component から呼び出す。
// NOTION_TOKEN は絶対に NEXT_PUBLIC_ を付けないこと（クライアントへ漏れる）。
if (typeof window !== "undefined") {
  throw new Error(
    "[notion] src/lib/notion/* はサーバー専用です。クライアントから import しないでください。",
  );
}

export const NOTION_TOKEN = process.env.NOTION_TOKEN;

export const DATABASE_IDS = {
  news: process.env.NOTION_NEWS_DATABASE_ID,
  works: process.env.NOTION_WORKS_DATABASE_ID,
  members: process.env.NOTION_MEMBERS_DATABASE_ID,
} as const;

export type ContentKind = keyof typeof DATABASE_IDS;

/** 指定コンテンツの Notion 連携が有効か（トークン + 対象DB ID が揃っているか） */
export function isNotionEnabled(kind: ContentKind): boolean {
  return Boolean(NOTION_TOKEN && DATABASE_IDS[kind]);
}

let client: Client | null = null;

/** Notion クライアントのシングルトン取得。未設定なら null を返す（呼び出し側でフォールバック）。 */
export function getNotionClient(): Client | null {
  if (!NOTION_TOKEN) return null;
  if (!client) {
    client = new Client({ auth: NOTION_TOKEN });
  }
  return client;
}

/** 開発時のみ、連携未設定/失敗を分かりやすく通知する（本番では静かにフォールバック）。 */
export function devNotice(message: string): void {
  if (process.env.NODE_ENV !== "production") {
    console.warn(`[notion] ${message}`);
  }
}
