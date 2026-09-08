export const site = {
  name: "WatchMotion Editor",
  email: "sangyoung2730@naver.com",
  operator: "우상영",
  policyDate: "September 9, 2026",
  minOS: { iphone: "iOS 18.6", watch: "watchOS 11.6", mac: "macOS 15" },
};

// Set only to your verified public origin. Do not derive canonical URLs from request headers.
export function publicOrigin(): string | undefined {
  const value = process.env.SITE_URL;
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.pathname !== "/") return undefined;
    return url.origin;
  } catch { return undefined; }
}

export function storeLinks() {
  function valid(value: string | undefined) {
    if (!value) return undefined;
    try { const url = new URL(value); return url.protocol === "https:" && url.hostname === "apps.apple.com" ? url.href : undefined; }
    catch { return undefined; }
  }
  return { iphone: valid(process.env.APP_STORE_IOS_URL), mac: valid(process.env.APP_STORE_MAC_URL) };
}
