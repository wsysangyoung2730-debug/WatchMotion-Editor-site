import type { MetadataRoute } from "next";
import { publicOrigin } from "@/lib/site";
import { guides } from "@/lib/guides";
import { locales, languageTags, localizedPath } from "@/lib/i18n/routing";
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
  ].flatMap((path) =>
    locales.map((locale) => ({
      url: origin + localizedPath(path || "/", locale),
      alternates: {
        languages: {
          ...Object.fromEntries(
            locales.map((code) => [
              languageTags[code],
              origin + localizedPath(path || "/", code),
            ]),
          ),
          "x-default": origin + (path || "/"),
        },
      },
    })),
  );
}
