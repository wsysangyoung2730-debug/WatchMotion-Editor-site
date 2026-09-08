// HTTP contract/link checks, not browser interaction or visual QA.
import assert from "node:assert/strict";
import { guides } from "../lib/guides.ts";
import { readFileSync } from "node:fs";
import {
  locales,
  languageTags,
  localizedPath,
  preferenceCookie,
} from "../lib/i18n/routing.ts";
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3017";
const routes = [
  "/",
  "/mac-editor",
  "/guide",
  "/support",
  "/privacy",
  ...guides.map((g) => `/guide/${g.slug}`),
];
const documents = new Map();
for (const locale of locales)
  for (const bare of routes) {
    const path = localizedPath(bare, locale);
    const response = await fetch(new URL(path, base));
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get("content-type"), /text\/html/);
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    const html = await response.text();
    assert.ok(
      html.includes(`<html lang="${languageTags[locale]}"`),
      `${path}: document language`,
    );
    const messages = JSON.parse(
      readFileSync(
        new URL(`../lib/i18n/messages/${locale}.json`, import.meta.url),
        "utf8",
      ),
    );
    assert.ok(
      html.includes(messages["Get the apps"]),
      `${path}: translated navigation`,
    );
    assert.ok(
      html.includes(messages["Language"]),
      `${path}: language control accessible label`,
    );
    if (bare.startsWith("/guide/")) {
      const guide = guides.find((g) => bare === `/guide/${g.slug}`);
      assert.ok(
        html.includes(messages[guide.title]),
        `${path}: translated guide`,
      );
    }
    if (process.env.SITE_URL) {
      const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
      assert.ok(canonical, `${path}: canonical exists`);
      assert.equal(
        new URL(canonical).href,
        new URL(path, process.env.SITE_URL).href,
        `${path}: canonical`,
      );
      for (const code of locales)
        assert.ok(
          html.includes(`hrefLang="${languageTags[code]}"`) ||
            html.includes(`hreflang="${languageTags[code]}"`),
          `${path}: alternate ${code}`,
        );
    }
    assert.equal(
      (html.match(/<h1(?:\s|>)/g) || []).length,
      1,
      `one h1 on ${path}`,
    );
    assert.ok(!html.includes("Website visual concept"));
    documents.set(path, html);
    console.log(`PASS ${path}`);
  }
const checked = new Set();
for (const [path, html] of documents) {
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const href = match[1].replaceAll("&amp;", "&");
    if (!href.startsWith("/") && !href.startsWith("#")) continue;
    const url = new URL(href, new URL(path, base));
    const key = url.pathname + url.hash;
    if (checked.has(key)) continue;
    checked.add(key);
    const res = await fetch(url);
    assert.equal(res.status, 200, `broken internal link ${path} → ${href}`);
    if (url.hash) {
      const target = documents.get(url.pathname) || (await res.text());
      assert.ok(
        target.includes(`id="${url.hash.slice(1)}"`),
        `missing anchor ${href}`,
      );
    }
  }
}
for (const path of [
  "/images/mac-editor-dark.png",
  "/images/mac-editor-light.png",
  "/images/mac-segments.png",
  "/images/showcase-backdrop.webp",
  "/robots.txt",
  "/sitemap.xml",
]) {
  const res = await fetch(new URL(path, base));
  assert.equal(res.status, 200, path);
}
assert.equal((await fetch(new URL("/guide/not-a-chapter", base))).status, 404);
assert.equal((await fetch(new URL("/not-a-page", base))).status, 404);
for (const locale of locales) {
  const missing = await fetch(
    new URL(localizedPath("/guide/not-a-chapter", locale), base),
  );
  assert.equal(missing.status, 404);
  const html = await missing.text();
  const d = JSON.parse(
    readFileSync(
      new URL(`../lib/i18n/messages/${locale}.json`, import.meta.url),
      "utf8",
    ),
  );
  assert.ok(html.includes(d["Page not found"]), `${locale}: localized 404`);
}
const root = new URL("/", base);
assert.equal(
  (
    await fetch(root, {
      headers: { "Accept-Language": "ja,ko;q=0.9" },
      redirect: "manual",
    })
  ).status,
  200,
  "first visit stays English",
);
for (const locale of locales) {
  const res = await fetch(root, {
    headers: { Cookie: `${preferenceCookie}=${locale}` },
    redirect: "manual",
  });
  assert.equal(res.status, locale === "en" ? 200 : 307);
  if (locale !== "en") {
    assert.equal(new URL(res.headers.get("location")).pathname, `/${locale}`);
    assert.match(res.headers.get("cache-control"), /no-store/);
  }
}
assert.equal(
  (
    await fetch(root, {
      headers: { Cookie: `${preferenceCookie}=invalid` },
      redirect: "manual",
    })
  ).status,
  200,
);
const explicit = await fetch(new URL("/ja/guide?source=test", base), {
  headers: { Cookie: `${preferenceCookie}=ko` },
  redirect: "manual",
});
assert.equal(
  explicit.status,
  200,
  "explicit language URL overrides preference",
);
const englishAlias = await fetch(new URL("/en/guide?source=test", base), {
  redirect: "manual",
});
const englishRootAlias = await fetch(new URL("/en?source=test", base), {
  redirect: "manual",
});
assert.equal(
  new URL(englishRootAlias.headers.get("location"), base).pathname,
  "/",
);
assert.equal(
  new URL(englishRootAlias.headers.get("location"), base).search,
  "?source=test",
);
assert.equal(
  new URL(englishAlias.headers.get("location"), base).pathname,
  "/guide",
);
assert.equal(
  new URL(englishAlias.headers.get("location"), base).search,
  "?source=test",
);
if (process.env.SITE_URL) {
  const xml = await (await fetch(new URL("/sitemap.xml", base))).text();
  assert.equal((xml.match(/<loc>/g) || []).length, 50);
}
console.log(
  `PASS ${routes.length * locales.length} pages, ${checked.size} internal links, assets, headers, localized 404s, preference routing and SEO`,
);
