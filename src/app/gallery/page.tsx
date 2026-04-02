// src/app/gallery/page.tsx
import { GalleryScene } from "@/components/gallery/GalleryScene";

export default function GalleryPage() {
  return (
    <main
      style={{
        background: "#f0efec",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Large serif italic heading — upper left, below header */}
      <div
        style={{
          position: "absolute",
          top: "80px",
          left: "4vw",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(56px, 8.5vw, 130px)",
            color: "#2a2924",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          Gallery
        </h1>
      </div>

      {/* 3D perspective cascade */}
      <GalleryScene />
    </main>
  );
}
