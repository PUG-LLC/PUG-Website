// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://pug-cs.com";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // 管理/内部系を念のため除外（不要なら削除OK）
      disallow: ["/api", "/admin", "/_next"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
