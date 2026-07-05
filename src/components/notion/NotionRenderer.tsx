import { Fragment } from "react";
import type { NotionRichText } from "@/lib/notion/helpers";

// Notion ページ本文（ブロック）を描画する最小レンダラ。
// 対応: paragraph / heading_1..3 / bulleted_list_item / numbered_list_item / quote / image
// 未対応ブロックは本番では何も描画しない（表示崩れ防止）。開発時のみ薄いマーカーを出す。

/* ============================================================
 * 最小ブロック型（使う形だけ定義）
 * ========================================================== */
type RichTextBlock = { rich_text?: NotionRichText[] };
type ImageBlock = {
  type?: "file" | "external";
  file?: { url: string };
  external?: { url: string };
  caption?: NotionRichText[];
};

type NotionBlock = {
  id: string;
  type: string;
  paragraph?: RichTextBlock;
  heading_1?: RichTextBlock;
  heading_2?: RichTextBlock;
  heading_3?: RichTextBlock;
  bulleted_list_item?: RichTextBlock;
  numbered_list_item?: RichTextBlock;
  quote?: RichTextBlock;
  image?: ImageBlock;
};

/* ============================================================
 * Rich text（装飾・リンク対応）
 * ========================================================== */
function RichText({ value }: { value?: NotionRichText[] }) {
  if (!Array.isArray(value) || value.length === 0) return null;
  return (
    <>
      {value.map((t, i) => {
        const a = t.annotations ?? ({} as NotionRichText["annotations"]);
        const className = [
          a.bold ? "font-semibold" : "",
          a.italic ? "italic" : "",
          a.underline ? "underline" : "",
          a.strikethrough ? "line-through" : "",
          a.code
            ? "font-mono text-[0.9em] bg-black/5 rounded px-1 py-0.5"
            : "",
        ]
          .filter(Boolean)
          .join(" ");

        const text = t.plain_text ?? "";
        const content =
          className.length > 0 ? (
            <span className={className}>{text}</span>
          ) : (
            text
          );

        if (t.href) {
          return (
            <a
              key={i}
              href={t.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:opacity-60 transition-opacity"
            >
              {content}
            </a>
          );
        }
        return <Fragment key={i}>{content}</Fragment>;
      })}
    </>
  );
}

function imageUrl(block: ImageBlock | undefined): string | undefined {
  if (!block) return undefined;
  return block.file?.url ?? block.external?.url ?? undefined;
}

/* ============================================================
 * 個別ブロック
 * ========================================================== */
function Block({ block }: { block: NotionBlock }) {
  switch (block.type) {
    case "paragraph": {
      const rt = block.paragraph?.rich_text;
      if (!rt || rt.length === 0) return <p className="h-4" aria-hidden />;
      return (
        <p className="text-[15px] lg:text-[16px] leading-[2.2] text-[#333] [font-feature-settings:'palt']">
          <RichText value={rt} />
        </p>
      );
    }
    case "heading_1":
      return (
        <h2 className="mt-12 mb-4 text-[24px] lg:text-[28px] font-semibold leading-snug text-[#111] [font-feature-settings:'palt']">
          <RichText value={block.heading_1?.rich_text} />
        </h2>
      );
    case "heading_2":
      return (
        <h3 className="mt-10 mb-3 text-[20px] lg:text-[22px] font-semibold leading-snug text-[#111] [font-feature-settings:'palt']">
          <RichText value={block.heading_2?.rich_text} />
        </h3>
      );
    case "heading_3":
      return (
        <h4 className="mt-8 mb-2 text-[17px] lg:text-[18px] font-semibold leading-snug text-[#111] [font-feature-settings:'palt']">
          <RichText value={block.heading_3?.rich_text} />
        </h4>
      );
    case "quote":
      return (
        <blockquote className="my-6 border-l-2 border-black/30 pl-5 text-[15px] leading-[2] italic text-[#444] [font-feature-settings:'palt']">
          <RichText value={block.quote?.rich_text} />
        </blockquote>
      );
    case "image": {
      const url = imageUrl(block.image);
      if (!url) return null;
      const caption = block.image?.caption;
      const alt =
        caption && caption.length > 0
          ? caption.map((c) => c.plain_text ?? "").join("")
          : "";
      return (
        <figure className="my-8">
          {/* 本文画像はサイズ不定のため next/image ではなく素の img（lazy）で安全に表示 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt={alt}
            loading="lazy"
            className="w-full rounded-[2px] object-cover"
          />
          {alt && (
            <figcaption className="mt-3 text-[12px] text-[#888] tracking-wide">
              {alt}
            </figcaption>
          )}
        </figure>
      );
    }
    default:
      // 未対応ブロックは本番では描画しない（崩れ防止）。開発時のみ存在が分かるようにする。
      if (process.env.NODE_ENV !== "production") {
        return (
          <div className="my-2 text-[11px] text-amber-600/70">
            [NotionRenderer] 未対応ブロック: {block.type}
          </div>
        );
      }
      return null;
  }
}

/* ============================================================
 * リスト項目をまとめて ul / ol にグルーピングして描画
 * ========================================================== */
export default function NotionRenderer({ blocks }: { blocks: unknown[] }) {
  const list = (blocks ?? []) as NotionBlock[];
  if (list.length === 0) return null;

  const out: React.ReactNode[] = [];
  let i = 0;

  while (i < list.length) {
    const b = list[i];

    if (b.type === "bulleted_list_item" || b.type === "numbered_list_item") {
      const ordered = b.type === "numbered_list_item";
      const items: NotionBlock[] = [];
      while (i < list.length && list[i].type === b.type) {
        items.push(list[i]);
        i++;
      }
      const ListTag = ordered ? "ol" : "ul";
      out.push(
        <ListTag
          key={`list-${items[0].id}`}
          className={`my-5 space-y-2 pl-6 text-[15px] leading-[2] text-[#333] [font-feature-settings:'palt'] ${
            ordered ? "list-decimal" : "list-disc"
          }`}
        >
          {items.map((it) => (
            <li key={it.id}>
              <RichText
                value={
                  ordered
                    ? it.numbered_list_item?.rich_text
                    : it.bulleted_list_item?.rich_text
                }
              />
            </li>
          ))}
        </ListTag>,
      );
      continue;
    }

    out.push(<Block key={b.id} block={b} />);
    i++;
  }

  return <div className="notion-body space-y-5">{out}</div>;
}
