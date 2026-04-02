// src/app/gallery/layout.tsx
import type { Metadata } from "next";
import Header from "@/components/layouts/Header";

export const metadata: Metadata = {
  title: "Gallery | PUG LLC.",
  description:
    "PUG Creative Studio — Gallery. 制作物・リサーチ・実験的プロジェクトのアーカイブ。",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
