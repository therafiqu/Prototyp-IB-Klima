import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date("2026-09-27"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/polityka-prywatnosci`,
      lastModified: new Date("2026-09-27"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
