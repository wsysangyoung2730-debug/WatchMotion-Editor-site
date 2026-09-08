import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { site, publicOrigin, storeLinks } from "../lib/site.ts";
import { guides } from "../lib/guides.ts";
const root = fileURLToPath(new URL("../", import.meta.url));
function withEnv(name, value, fn) {
  const old = process.env[name];
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
  try {
    fn();
  } finally {
    if (old === undefined) delete process.env[name];
    else process.env[name] = old;
  }
}
test("only an explicit, clean HTTPS site origin is accepted", () => {
  for (const value of [
    undefined,
    "",
    "garbage",
    "http://example.com",
    "https://user:pass@example.com",
    "https://example.com/sub",
    "https://example.com/?key=secret",
    "https://example.com/#hash",
  ])
    withEnv("SITE_URL", value, () => assert.equal(publicOrigin(), undefined));
  withEnv("SITE_URL", "https://example.com/", () =>
    assert.equal(publicOrigin(), "https://example.com"),
  );
});
test("release links must point to Apple app listings", () => {
  for (const value of [
    undefined,
    "https://evil.example/id123",
    "https://apps.apple.com.evil.example/id123",
    "http://apps.apple.com/app/id123",
    "https://apps.apple.com",
    "https://user:secret@apps.apple.com/app/id123",
  ])
    withEnv("APP_STORE_MAC_URL", value, () =>
      assert.equal(storeLinks().mac, undefined),
    );
  withEnv(
    "APP_STORE_MAC_URL",
    "https://apps.apple.com/us/app/editor/id123456789",
    () =>
      assert.equal(
        storeLinks().mac,
        "https://apps.apple.com/us/app/editor/id123456789",
      ),
  );
});
test("public contact is the operator-approved contact", () => {
  assert.equal(site.email, "sangyoung2730@naver.com");
  assert.equal(site.operator, "우상영");
});
test("all five guide chapters have unique routes, sections and real screenshot assets", () => {
  assert.equal(guides.length, 5);
  assert.equal(new Set(guides.map((g) => g.slug)).size, 5);
  for (const g of guides) {
    assert.ok(g.description);
    assert.ok(g.sections.length >= 3);
    assert.equal(new Set(g.sections.map((s) => s.id)).size, g.sections.length);
    for (const s of g.sections) {
      if (s.image) {
        assert.ok(existsSync(root + "public" + s.image.src));
        assert.match(s.image.caption, /Actual Mac app/);
      }
    }
  }
});
test("example project and native captures are shipped", () => {
  const zip = readFileSync(
    root + "public/examples/everyday-hand-motions.watchmotion",
  );
  assert.equal(zip.subarray(0, 2).toString(), "PK");
  for (const name of [
    "mac-editor-dark.png",
    "mac-editor-light.png",
    "mac-segments.png",
  ]) {
    const b = readFileSync(root + "public/images/" + name);
    assert.equal(b.subarray(1, 4).toString(), "PNG");
    assert.equal(b.readUInt32BE(16), 3024);
    assert.equal(b.readUInt32BE(20), 1800);
  }
});
test("copy distinguishes activity suggestions from semantic recognition", () => {
  const text = JSON.stringify(guides);
  assert.match(text, /does not recognize the meaning/);
  assert.match(text, /Leaving the Watch app saves and stops/);
  assert.match(text, /synthetic motion samples/);
});
