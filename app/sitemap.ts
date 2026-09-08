import type { MetadataRoute } from "next";
import { publicOrigin } from "@/lib/site";
import { guides } from "@/lib/guides";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = publicOrigin();
  if (!origin || process.env.VERCEL_ENV === "preview") return [];
  return [
    "",
    "/mac-editor",
    "/guide",
    "/support",
    "/privacy",
    ...guides.map((g) => `/guide/${g.slug}`),
  ].map((path) => ({ url: `${origin}${path}` }));
}
