// グローバル/モジュール CSS の副作用インポート（import "./globals.css" 等）を
// TypeScript に認識させるためのアンビエント宣言。
// 実際のバンドルは Next.js（Turbopack）が処理する。TS6 の TS2882 対策も兼ねる。
declare module "*.css";

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
