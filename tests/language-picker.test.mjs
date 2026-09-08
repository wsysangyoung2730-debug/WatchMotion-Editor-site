import test from "node:test";
import assert from "node:assert/strict";
import { languageFocusIndex } from "../lib/language-navigation.ts";

test("language disclosure enters from its full-width trigger in either direction", () => {
  assert.equal(languageFocusIndex("ArrowDown", -1, 5), 0);
  assert.equal(languageFocusIndex("ArrowUp", -1, 5), 4);
});
test("language links support wrapping arrow keys and Home/End", () => {
  assert.equal(languageFocusIndex("ArrowDown", 4, 5), 0);
  assert.equal(languageFocusIndex("ArrowUp", 0, 5), 4);
  assert.equal(languageFocusIndex("ArrowDown", 2, 5), 3);
  assert.equal(languageFocusIndex("ArrowUp", 2, 5), 1);
  assert.equal(languageFocusIndex("Home", 3, 5), 0);
  assert.equal(languageFocusIndex("End", 1, 5), 4);
  assert.equal(languageFocusIndex("ArrowDown", -1, 0), -1);
});
