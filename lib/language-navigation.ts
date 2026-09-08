/** Arrow-key navigation for the language disclosure, including focus on its trigger. */
export function languageFocusIndex(
  key: string,
  current: number,
  count: number,
): number {
  if (count <= 0) return -1;
  if (key === "Home") return 0;
  if (key === "End") return count - 1;
  if (current < 0) return key === "ArrowUp" ? count - 1 : 0;
  return key === "ArrowUp"
    ? (current - 1 + count) % count
    : (current + 1) % count;
}
