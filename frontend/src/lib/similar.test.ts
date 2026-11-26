import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import type { Story } from '#lib/useRoom.svelte.ts';
import { SIMILAR_FROM, similarStories } from '#lib/similar.ts';

type Vectors = {
  past: { title: string; estimate: string; looksLike: string }[];
  cases: { name: string; title: string; similar: string[] }[];
};

// The room computes the same list for get_room: one file proves both.
const vectors: Vectors = JSON.parse(
  readFileSync(new URL('../../../backend/internal/room/testdata/similar.json', import.meta.url), 'utf8'),
);
const actual = { files: 1, added: 10, removed: 0, tests: 0, minutes: 0 };
const past: Story[] = vectors.past.map((story) => ({ ...story, actual }));

describe('the delivered stories that look like the one on the table', () => {
  it('reads vectors that can prove something', () => {
    expect(vectors.past.length).toBeGreaterThanOrEqual(SIMILAR_FROM);
    expect(vectors.cases.length).toBeGreaterThanOrEqual(5);
  });

  it.each(vectors.cases)('$name', ({ title, similar }) => {
    const stories = [...past, { title, estimate: '' }];
    expect(similarStories(stories, stories.length - 1).map((s) => s.title)).toEqual(similar);
  });

  it('carries the estimate kept and the card the story was delivered like, and nothing else', () => {
    const stories = [...past, { title: 'Export the invoices as PDF', estimate: '' }];
    expect(similarStories(stories, stories.length - 1)).toContainEqual(
      { title: 'Export the invoices as CSV', estimate: '5', looksLike: '8' },
    );
  });

  it('names nothing under five measured stories', () => {
    const stories = [...past.slice(0, SIMILAR_FROM - 1), { title: 'Export the invoices as PDF', estimate: '' }];
    expect(similarStories(stories, stories.length - 1)).toEqual([]);
  });

  it('leaves out a story nobody measured and the story itself', () => {
    const stories = [...past, { title: 'Export the invoices as XML', estimate: '5' }];
    const named = similarStories(stories, 0).map((s) => s.title);
    expect(named).not.toContain('Export the invoices as XML');
    expect(named).not.toContain(stories[0].title);
  });

  it('names three stories at most', () => {
    const same: Story[] = Array.from({ length: 6 }, () => ({ title: 'Export the invoices as CSV', estimate: '5', actual }));
    expect(similarStories([...same, { title: 'Export the invoices as CSV', estimate: '' }], 6)).toHaveLength(3);
  });

  it('names nothing with no story on the table', () => {
    expect(similarStories(past, -1)).toEqual([]);
  });
});
