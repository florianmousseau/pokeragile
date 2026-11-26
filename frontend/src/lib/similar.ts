import type { Story } from '#lib/useRoom.svelte.ts';

/**
 * The delivered stories of the team whose titles share words with the story
 * on the table. Computed here, on what the browser already holds: no title
 * leaves the room. get_room names the same stories to an assistant
 * (backend/internal/room/similar.go), and both read the same test vectors.
 */
export type Similar = Pick<Story, 'title' | 'estimate' | 'looksLike'>;

/** Fewer measured stories make a misleading reference. */
export const SIMILAR_FROM = 5;
const MAX_SIMILAR = 3;
/** The share of the weighted words two titles must have in common. */
const FLOOR = 0.15;
const MIN_WORD = 3;
const GRAIN = 1e6;

function titleWords(title: string): Set<string> {
  const words = title.toLowerCase().split(/[^\p{L}\p{N}]+/u);
  return new Set(words.filter((word) => [...word].length >= MIN_WORD));
}

/** 0 with no word in common, 1 for the same words; a word weighs less the more titles hold it. */
function overlap(a: Set<string>, b: Set<string>, weight: (word: string) => number): number {
  let shared = 0;
  let all = 0;
  for (const word of a) {
    all += weight(word);
    if (b.has(word)) shared += weight(word);
  }
  for (const word of b) if (!a.has(word)) all += weight(word);
  // Rounded: two titles as close as each other tie whatever the order of the sum.
  return all === 0 ? 0 : Math.round((shared / all) * GRAIN) / GRAIN;
}

/** Up to three measured stories close to the one at `current`, closest first, the most recent first among equals. */
export function similarStories(stories: Story[], current: number): Similar[] {
  const onTable = stories[current];
  if (!onTable) return [];
  const past = stories
    .map((story, index) => ({ story, index, words: titleWords(story.title) }))
    .filter(({ story, index }) => index !== current && story.actual && story.estimate);
  if (past.length < SIMILAR_FROM) return [];
  const held = new Map<string, number>();
  for (const { words } of past) for (const word of words) held.set(word, (held.get(word) ?? 0) + 1);
  const weight = (word: string) => Math.log((past.length + 1) / Math.max(held.get(word) ?? 0, 1));
  const wanted = titleWords(onTable.title);
  return past
    .map((p) => ({ ...p, score: overlap(wanted, p.words, weight) }))
    .filter((p) => p.score >= FLOOR)
    .sort((a, b) => b.score - a.score || b.index - a.index)
    .slice(0, MAX_SIMILAR)
    .map(({ story: { title, estimate, looksLike } }) => ({ title, estimate, looksLike }));
}
