import type { MetadataRoute } from "next";
import { publicOrigin } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  const origin = publicOrigin();
  if (!origin || process.env.VERCEL_ENV === "preview")
    return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${origin}/sitemap.xml`,
  };
}
