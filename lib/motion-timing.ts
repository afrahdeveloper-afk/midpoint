/**
 * PageLoader's counter (1.6s) + its 0.15s pause means its exit slide starts
 * at ~1.75s. Hero content is already in the viewport at mount, so its
 * scroll-triggered reveals would otherwise fire instantly, underneath the
 * loader. This delay lines Hero's reveal up with the loader's exit instead
 * of after it, so the curtain lifts on content already in motion.
 */
export const HERO_REVEAL_DELAY = 1.7;
