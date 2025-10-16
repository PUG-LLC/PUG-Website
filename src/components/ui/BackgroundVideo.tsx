// src/components/ui/BackgroundVideo.tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function BackgroundVideo() {
  const ref = useRef<HTMLVideoElement | null>(null);

  // iOS対策：再生を試みる
  const tryPlay = () => {
    const v = ref.current;
    if (!v) return;

    // プロパティと属性の両方で明示
    v.muted = true;
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", ""); // 非標準だがiOSで有効

    const p = v.play();
    if (p && typeof p.then === "function") {
      p.catch(() => {
        // ユーザー操作後に再試行
        const once = () => {
          v.play().finally(() => {
            window.removeEventListener("pointerdown", once, true);
          });
        };
        window.addEventListener("pointerdown", once, {
          once: true,
          capture: true,
        });
      });
    }
  };

  useEffect(() => {
    tryPlay();

    // タブ復帰で再生再試行
    const onVis = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // 低モーション配慮：フォールバック
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  if (prefersReducedMotion) {
    <Image
      src="/images/backgroundImage.png"
      alt=""
      aria-hidden
      fill
      className="pointer-events-none fixed inset-0 -z-10 object-cover"
      priority
    />;
  }

  return (
    <video
      ref={ref}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="/images/OGP.png"
      controls={false}
      // 非標準属性はJSで付与済み（JSXには書かない）
      // disableRemotePlayback は型未定義環境があるため省略（必要なら data-* で持たせる）
      disablePictureInPicture
    >
      <source src="/movies/PUG_HP_bg.mp4" type="video/mp4" />
      <source src="/movies/PUG_HP_bg.webm" type="video/webm" />
    </video>
  );
}
