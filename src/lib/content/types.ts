// アプリ全体で使う「正規化済み」コンテンツ型。
// content/ のファイルを
// これらの型で検証して UI に渡す。
// 既存 UI のフィールド名を踏襲し、CMS 化による表示崩れを最小化している。

/* ============================================================
 * News
 * ========================================================== */
export type NewsItem = {
  /** Notion ページ ID もしくはフォールバックの一意キー */
  id: string;
  /** URL に使う slug（/news/[slug]） */
  slug: string;
  title: string;
  /** Notion select 名をそのまま保持（カテゴリ一覧は items から動的生成する） */
  category: string;
  /** 表示用日付（例: 2025/10/9） */
  date: string;
  /** ソート用 ISO 日付（無い場合 null） */
  publishedAt: string | null;
  /** 一覧用説明文 */
  excerpt: string;
  mainImage?: string;
  featured: boolean;
  sortOrder?: number;
  /**
   * フォールバック（静的データ）用の本文プレーンテキスト。
   * Notion 由来の場合は本文はページブロックから取得するため通常 undefined。
   */
  content?: string;
};

/* ============================================================
 * Works
 * ========================================================== */
/** 制作物ブロック（Notion の Creation1〜5-title / -p / -img に対応） */
export type WorkCreation = {
  title: string;
  description: string;
  /** Creation{N}-img（複数可） */
  images: string[];
};

/** 制作プロセス（Notion の Process-title / Process / Process-img / Process-gallery） */
export type WorkProcess = {
  title: string;
  body: string;
  /** Process-img（先頭ファイル） */
  image?: string;
  /** Process-gallery（複数） */
  gallery: string[];
};

/** 実績詳細の参加メンバー（Members multi_select の slug を Members DB で解決したもの） */
export type WorkMember = {
  slug: string;
  name: string;
  role: string;
  image: string;
};

export type Work = {
  id: string;
  slug: string;
  title: string;
  client: string;
  overview: string;
  mainImage: string;
  categories: string[];
  featured: boolean;
  sortOrder?: number;
  /** 制作プロセス。未入力なら undefined。 */
  process?: WorkProcess;
  /** 制作物（Creation1〜5 のうち入力があるものだけ） */
  creations: WorkCreation[];
  /** 参加メンバーの slug（Members multi_select）。表示名/画像は Members DB から解決する */
  members: string[];
};

/* ============================================================
 * Members
 * ========================================================== */
export type Member = {
  id: string;
  /** URL に使う slug（/members/[slug]）。既存 id はそのまま slug として使える。 */
  slug: string;
  name: string;
  nameJp: string;
  role: string;
  /** 一覧グリッド用の大文字ロール表記 */
  listRole: string;
  /** 一覧グリッド用の識別コード（例: #001107） */
  code: string;
  image: string;
  /** 一覧グリッド用ポートレート */
  listImage: string;
  heroImage?: string;
  galleryMain?: string;
  gallerySub?: string[];
  description: string;
  influence?: string;
  extra?: string;
  featured: boolean;
  sortOrder?: number;
};
