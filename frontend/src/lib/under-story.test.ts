import { render } from 'svelte/server';
import { describe, expect, it } from 'vitest';
import UnderStory from '#lib/UnderStory.svelte';
import { EN as T } from '#lib/i18n/en.ts';
import { EN as X } from '#lib/i18n/extras/en.ts';
import type { Story } from '#lib/useRoom.svelte.ts';

const actual = { files: 1, added: 10, removed: 0, tests: 0, minutes: 0 };
const delivered: Story[] = [
  { title: 'Export the invoices as CSV', estimate: '5', looksLike: '8', actual },
  { title: 'Reset password by email', estimate: '3', looksLike: '3', actual },
  { title: 'Export the orders as PDF', estimate: '8', looksLike: '13', actual },
  { title: 'Dark mode for the dashboard', estimate: '5', looksLike: '3', actual },
  { title: 'Rate limit on the public API', estimate: '13', looksLike: '8', actual },
];

function under(title: string): string {
  const stories = [...delivered, { title, estimate: '' }];
  return render(UnderStory, { props: { stories, current: stories.length - 1, lang: 'en', T, X } }).body;
}

/** The cells of each body row, as text. */
function rows(html: string): string[][] {
  const body = html.split('<tbody>')[1] ?? '';
  return [...body.matchAll(/<tr>(.*?)<\/tr>/gs)].map(([, row]) =>
    [...row.matchAll(/<td[^>]*>(.*?)<\/td>/gs)].map(([, cell]) => cell.replace(/<!--.*?-->/g, '')));
}

describe('under the story on the table', () => {
  it('shows the two delivered stories that share its words, with the estimate kept and the card each was delivered like', () => {
    expect(rows(under('Export the invoices as PDF'))).toEqual([
      ['Export the orders as PDF', '8', '13'],
      ['Export the invoices as CSV', '5', '8'],
    ]);
  });

  it('shows nothing for a story with no word in common', () => {
    const html = under('Migrate Postgres to version 17');
    expect(html).not.toContain('<table');
    expect(html).not.toContain(X.stories.similar);
  });

  it('shows no score and no sentence about the computation', () => {
    const html = under('Export the invoices as PDF');
    expect(html.replace(/<style.*?<\/style>/gs, '')).not.toMatch(/\d[.,]\d|%/);
    expect(html).not.toContain('<p');
  });
});

describe('a room that hides them from who has not voted', () => {
  it('shows nothing while hidden', () => {
    const stories = [...delivered, { title: 'Export the invoices as PDF', estimate: '' }];
    const html = render(UnderStory, { props: { stories, current: stories.length - 1, hidden: true, lang: 'en', T, X } }).body;
    expect(html).not.toContain('<table');
  });
});
