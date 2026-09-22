/**
 * Builds an O(1) slug -> item lookup, computed once per data module instead
 * of re-scanning the source array with `.find()` on every request.
 */
export function bySlug<T extends { slug: string }>(
  items: readonly T[],
): ReadonlyMap<string, T> {
  return new Map(items.map((item) => [item.slug, item]));
}
