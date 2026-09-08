import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import {
  locales,
  isLocale,
  localizedPath,
  stripLocale,
} from "../lib/i18n/routing.ts";
import { guides, translateGuides } from "../lib/guides.ts";
const require = createRequire(import.meta.url);
const babel = require("next/dist/compiled/babel/core");
const dictionary = (locale) =>
  JSON.parse(
    readFileSync(
      new URL(`../lib/i18n/messages/${locale}.json`, import.meta.url),
      "utf8",
    ),
  );
const english = dictionary("en");

test("all five dictionaries have complete, nonempty translations", () => {
  assert.equal(locales.length, 5);
  for (const locale of locales) {
    const d = dictionary(locale);
    assert.deepEqual(
      Object.keys(d).sort(),
      Object.keys(english).sort(),
      locale,
    );
    for (const [key, value] of Object.entries(d)) {
      assert.ok(value.trim(), `${locale}: ${key}`);
      if (locale !== "en" && key !== "WatchMotion Editor ·")
        assert.notEqual(value, key, `${locale}: ${key}`);
    }
  }
});

test("route helpers preserve English URLs, chapters, fragments, assets and external links", () => {
  assert.equal(
    localizedPath("/guide/review-and-segment#suggestions", "ko"),
    "/ko/guide/review-and-segment#suggestions",
  );
  assert.equal(
    localizedPath("/ja/guide?from=nav#example", "zh-TW"),
    "/zh-TW/guide?from=nav#example",
  );
  assert.equal(localizedPath("/ko/guide", "en"), "/guide");
  assert.equal(localizedPath("/", "en"), "/");
  assert.equal(localizedPath("/", "ko"), "/ko");
  assert.equal(localizedPath("/ko/#download", "ja"), "/ja/#download");
  assert.equal(stripLocale("/korea"), "/korea");
  for (const path of [
    "/images/mac-editor-dark.png",
    "/examples/everyday-hand-motions.watchmotion",
    "mailto:help@example.com",
    "https://apps.apple.com/app/id123",
    "//example.com/path",
  ])
    assert.equal(localizedPath(path, "ko"), path);
  assert.equal(isLocale("zh-CN"), true);
  for (const bad of ["zh", "fr", "__proto__", "../ko"])
    assert.equal(isLocale(bad), false);
});

test("translated guides preserve all routes, steps, anchors and real screenshots", () => {
  const fields = new Set();
  for (const locale of locales) {
    const d = dictionary(locale);
    const t = (text) => {
      assert.ok(Object.hasOwn(d, text), `${locale}: ${text}`);
      fields.add(text);
      return d[text];
    };
    const translated = translateGuides(t);
    assert.deepEqual(
      translated.map((g) => g.slug),
      guides.map((g) => g.slug),
    );
    for (const [i, g] of translated.entries())
      for (const [j, s] of g.sections.entries()) {
        const original = guides[i].sections[j];
        assert.equal(s.id, original.id);
        assert.equal(s.steps?.length, original.steps?.length);
        assert.equal(s.paragraphs?.length, original.paragraphs?.length);
        assert.equal(s.image?.src, original.image?.src);
      }
  }
  assert.ok(fields.size > 80);
});

test("every literal translation call has a catalog entry", () => {
  function scan(folder) {
    for (const item of readdirSync(folder, { withFileTypes: true })) {
      const path = new URL(item.name + (item.isDirectory() ? "/" : ""), folder);
      if (item.isDirectory()) scan(path);
      else if (item.name.endsWith(".tsx")) {
        const ast = babel.parseSync(readFileSync(path, "utf8"), {
          filename: item.name,
          configFile: false,
          babelrc: false,
          parserOpts: { plugins: ["typescript", "jsx"] },
        });
        babel.traverse(ast, {
          CallExpression(p) {
            if (
              p.node.callee.name === "t" &&
              p.node.arguments[0]?.type === "StringLiteral"
            )
              assert.ok(
                Object.hasOwn(english, p.node.arguments[0].value),
                `${path}: ${p.node.arguments[0].value}`,
              );
          },
        });
      }
    }
  }
  scan(new URL("../app/", import.meta.url));
  scan(new URL("../components/", import.meta.url));
});
