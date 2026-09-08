export const locales = ["en", "ko", "ja", "zh-CN", "zh-TW"] as const;
export type Locale = (typeof locales)[number];
export const languageNames: Record<Locale, string> = {
  en: "English",
  ko: "한국어",
  ja: "日本語",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
};
export const languageTags: Record<Locale, string> = {
  en: "en",
  ko: "ko",
  ja: "ja",
  "zh-CN": "zh-Hans",
  "zh-TW": "zh-Hant",
};
export const preferenceCookie = "watchmotion-language";
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
export function stripLocale(path: string): string {
  const match = path.match(/^\/(en|ko|ja|zh-CN|zh-TW)(?=\/|$|[?#])/);
  if (!match) return path;
  const rest = path.slice(match[0].length);
  return !rest || rest.startsWith("?") || rest.startsWith("#")
    ? "/" + rest
    : rest;
}
export function localizedPath(path: string, locale: Locale): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const bare = stripLocale(path);
  if (
    /^\/(images|examples|_next)(\/|$)/.test(bare) ||
    /\.[a-z0-9]+(?:[?#]|$)/i.test(bare)
  )
    return bare;
  return locale === "en" ? bare : `/${locale}${bare === "/" ? "" : bare}`;
}
