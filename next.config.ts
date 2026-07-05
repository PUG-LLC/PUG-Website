import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 640, 768, 1024, 1280, 1536, 1920],
    // Notion の Files プロパティ画像（署名付き S3 / file.notion.so）を next/image で扱うため許可。
    // 署名 URL は約1時間で失効するが、ISR(revalidate=300) で失効前に再取得されるため安全。
    remotePatterns: [
      { protocol: "https", hostname: "**.amazonaws.com" },
      { protocol: "https", hostname: "file.notion.so" },
      { protocol: "https", hostname: "**.notion.so" },
      { protocol: "https", hostname: "**.notion-static.com" },
    ],
  },
};

export default nextConfig;
