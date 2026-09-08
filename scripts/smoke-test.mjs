// HTTP contract/link checks, not browser interaction or visual QA.
import assert from "node:assert/strict";
import { guides } from "../lib/guides.ts";
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
for (const path of routes) {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 200, path);
  assert.match(response.headers.get("content-type"), /text\/html/);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  const html = await response.text();
  assert.match(html, /<html[^>]*lang="en"/);
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
console.log(
  `PASS ${routes.length} pages, ${checked.size} internal links, assets, headers, and 404 routes`,
);
