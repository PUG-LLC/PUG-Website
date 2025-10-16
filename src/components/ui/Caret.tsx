// src/components/ui/Caret.tsx
"use client";

import clsx from "clsx";

type CaretProps = {
  /** カーソルの色 */
  color?: string;
  /** 太さ(px). デフォルト 2 */
  thickness?: number;
  /** 左マージン（emなども可） */
  gap?: string | number;
  /** 点滅スピード(ms) */
  durationMs?: number;
  className?: string;
};

/**
 * 行の高さ(=1em)に自動でフィットする点滅カーソル。
 * テキストの直後に <Caret /> を置くだけでOK。
 */
export default function Caret({
  color = "#FF3B00",
  thickness = 2,
  gap = "0.25em",
  durationMs = 1000,
  className,
}: CaretProps) {
  return (
    <span
      aria-hidden
      className={clsx(
        // 行内要素として 1em 高さにフィット
        "inline-block align-baseline h-[1em] caret-blink animate-caret",
        className
      )}
      style={{
        backgroundColor: color,
        width: `${thickness}px`,
        marginLeft: typeof gap === "number" ? `${gap}px` : gap,
        animationDuration: `${durationMs}ms`,
        // フォントにより微妙に上下する場合の微調整（お好みで）
        transform: "translateY(0.02em)",
        borderRadius: thickness <= 2 ? thickness / 2 : 1, // ほんのり丸め
      }}
    />
  );
}
