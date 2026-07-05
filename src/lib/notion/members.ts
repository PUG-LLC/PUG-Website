import { MEMBERS as STATIC_MEMBERS } from "@/config/members";
import type { Member } from "./types";
import {
  DATABASE_IDS,
  devNotice,
  getNotionClient,
  isNotionEnabled,
} from "./client";
import {
  getCheckbox,
  getFiles,
  getNumber,
  getRichText,
  getTitle,
  NotionPage,
  publishedFilter,
  queryDatabase,
  slugify,
} from "./helpers";

const PLACEHOLDER_IMAGE = "/images/backgroundImage.png";

/* ============================================================
 * 静的フォールバック（src/config/members.ts → 正規化）
 * ========================================================== */
function staticMembers(): Member[] {
  return STATIC_MEMBERS.map((m) => ({
    id: m.id,
    slug: m.id, // 既存 id は slug 形式（例: taichi-suwa）なのでそのまま流用
    name: m.name,
    nameJp: m.nameJp,
    role: m.role,
    listRole: m.listRole,
    code: m.code,
    image: m.image,
    listImage: m.listImage,
    heroImage: m.heroImage,
    galleryMain: m.galleryMain,
    gallerySub: m.gallerySub,
    description: m.description,
    influence: m.influence,
    extra: m.extra,
    featured: false,
  }));
}

/* ============================================================
 * Notion ページ → Member
 * ========================================================== */
function mapMemberPage(page: NotionPage): Member {
  const name = getTitle(page, "Name");
  const avatars = getFiles(page, "AvatarImage");
  const heroes = getFiles(page, "HeroImage");
  const gallery = getFiles(page, "GalleryImages");

  // 画像フォールバック: AvatarImage 未設定でも Hero / Gallery で表示を成立させる
  const portrait = avatars[0] ?? heroes[0] ?? gallery[0] ?? PLACEHOLDER_IMAGE;
  const role = getRichText(page, "Role");
  return {
    id: page.id,
    slug: getRichText(page, "Slug") || slugify(name, page.id),
    name,
    nameJp: getRichText(page, "NameJp"),
    role,
    listRole: getRichText(page, "RoleShort") || role.toUpperCase(),
    code: getRichText(page, "Code"),
    image: portrait,
    listImage: portrait,
    heroImage: heroes[0] ?? avatars[0] ?? gallery[0],
    galleryMain: gallery[0] ?? portrait,
    gallerySub: gallery.slice(1),
    description: getRichText(page, "Bio"),
    influence: getRichText(page, "Influence") || undefined,
    extra: getRichText(page, "Extra") || undefined,
    featured: getCheckbox(page, "Featured"),
    sortOrder: getNumber(page, "SortOrder"),
  };
}

function sortMembers(items: Member[]): Member[] {
  // SortOrder 入力ありは昇順。未入力（同順扱い）は Notion の元順を反転した順で表示する。
  // 先に反転 → 安定ソートで、SortOrder付きは数値位置へ、未入力分は反転相対順を保持。
  return [...items].reverse().sort((a, b) => {
    const ao = a.sortOrder ?? Number.POSITIVE_INFINITY;
    const bo = b.sortOrder ?? Number.POSITIVE_INFINITY;
    return ao - bo;
  });
}

/* ============================================================
 * 公開 API
 * ========================================================== */
/** メンバー一覧（Published のみ、SortOrder 昇順）。失敗時は静的フォールバック。 */
export async function getMembersList(): Promise<Member[]> {
  if (!isNotionEnabled("members")) {
    devNotice("Members: NOTION 環境変数が未設定のため静的データを使用します。");
    return staticMembers();
  }
  const client = getNotionClient();
  if (!client) return staticMembers();

  try {
    const pages = await queryDatabase(client, {
      database_id: DATABASE_IDS.members!,
      filter: publishedFilter(),
    });
    return sortMembers(pages.map(mapMemberPage));
  } catch (e) {
    console.error(
      "[notion] getMembersList 失敗。静的データにフォールバックします。",
      e,
    );
    return staticMembers();
  }
}

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
