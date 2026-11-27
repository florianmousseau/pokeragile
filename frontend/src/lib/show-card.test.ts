import { readFileSync } from 'node:fs';
import { describe, expect, it, vi } from 'vitest';
import { POCKET_HASH, POCKET_WORDS } from '#lib/pocket-deck.ts';
import { SHOW_CARD_WORDS, faceUp, keepScreenOn, labelSize, type ScreenHost } from '#lib/show-card.ts';

describe('faceUp', () => {
  it('keeps the card face down until the room reveals', () => {
    expect(faceUp(false, false)).toBe(false);
    expect(faceUp(true, false)).toBe(true);
  });

  it('lets a touch turn the card either way', () => {
    expect(faceUp(false, true)).toBe(true);
    expect(faceUp(true, true)).toBe(false);
  });
});

describe('labelSize', () => {
  it('bounds a short label by the height and a long one by the width', () => {
    expect(labelSize('5')).toBe('min(130vw, 62vh)');
    expect(labelSize('XXL')).toBe('min(43vw, 62vh)');
    expect(labelSize('abcdefghijklmnop')).toBe('min(8vw, 62vh)');
  });

  it('counts an emoji card as one glyph and survives an empty label', () => {
    expect(labelSize('☕')).toBe(labelSize('?'));
    expect(labelSize('🤷')).toBe(labelSize('?'));
    expect(labelSize('')).toBe('min(130vw, 62vh)');
  });
});

function fakeHost(wakeLock: boolean | 'refused' = true) {
  const listeners = new Set<() => void>();
  const release = vi.fn(() => Promise.resolve());
  const request = vi.fn(() => (wakeLock === 'refused' ? Promise.reject(new Error('NotAllowedError')) : Promise.resolve({ release })));
  const host = {
    navigator: wakeLock ? { wakeLock: { request } } : {},
    document: {
      visibilityState: 'visible',
      addEventListener: (_: string, l: () => void) => void listeners.add(l),
      removeEventListener: (_: string, l: () => void) => void listeners.delete(l),
    },
  } satisfies ScreenHost;
  const becomes = (state: string) => {
    host.document.visibilityState = state;
    for (const l of listeners) l();
  };
  return { host, request, release, becomes, listeners };
}

describe('keepScreenOn', () => {
  it('asks for the screen lock and releases it at the end', async () => {
    const { host, request, release, listeners } = fakeHost();
    const letSleep = keepScreenOn(host);
    await Promise.resolve();
    expect(request).toHaveBeenCalledExactlyOnceWith('screen');
    letSleep();
    expect(release).toHaveBeenCalledOnce();
    expect(listeners.size).toBe(0);
  });

  it('asks again when the tab comes back, never while it is hidden', async () => {
    const { host, request, becomes } = fakeHost();
    keepScreenOn(host);
    becomes('hidden');
    expect(request).toHaveBeenCalledTimes(1);
    becomes('visible');
    expect(request).toHaveBeenCalledTimes(2);
  });

  it('releases a lock granted after the card was closed', async () => {
    const { host, release } = fakeHost();
    keepScreenOn(host)();
    await Promise.resolve();
    await Promise.resolve();
    expect(release).toHaveBeenCalledOnce();
  });

  it('does nothing once closed', () => {
    const { host, request, becomes } = fakeHost();
    keepScreenOn(host)();
    becomes('visible');
    expect(request).toHaveBeenCalledTimes(1);
  });

  it('shows the card all the same without the API or when it is refused', async () => {
    expect(() => keepScreenOn(fakeHost(false).host)()).not.toThrow();
    const refused = fakeHost('refused');
    const letSleep = keepScreenOn(refused.host);
    await Promise.resolve();
    expect(() => letSleep()).not.toThrow();
  });
});

describe('the words of the card', () => {
  it('says every line in the five languages', () => {
    const keys = Object.keys(SHOW_CARD_WORDS.en).sort();
    for (const [l, words] of Object.entries(SHOW_CARD_WORDS)) {
      expect(Object.keys(words).sort(), l).toEqual(keys);
      for (const [k, v] of Object.entries(words)) expect(v.trim(), `${l}.${k}`).not.toBe('');
    }
  });

  it('names the pocket deck in the five languages', () => {
    expect(Object.keys(POCKET_WORDS).sort()).toEqual(Object.keys(SHOW_CARD_WORDS).sort());
    for (const v of Object.values(POCKET_WORDS)) expect(v.trim()).not.toBe('');
  });

  it('never puts an ordinary space before a French double punctuation', () => {
    for (const v of [...Object.values(SHOW_CARD_WORDS.fr), POCKET_WORDS.fr]) expect(v).not.toMatch(/ [:;?!%»]|« /);
  });
});

describe('the pocket deck', () => {
  const manifest = JSON.parse(readFileSync('static/manifest.webmanifest', 'utf8'));

  it('opens from a discreet link in the footer, not from the form', () => {
    const home = readFileSync('src/lib/HomepageTemplate.svelte', 'utf8');
    expect(home.indexOf('data-testid="pocket-btn"')).toBeGreaterThan(home.indexOf('</form>'));
    expect(home).toContain('lead={homeLinks}');
  });

  it('opens from the shortcut the installed app offers', () => {
    expect(manifest.shortcuts.map((s: { url: string }) => s.url)).toEqual([`/${POCKET_HASH}`]);
  });

  it('is installable: standalone, a start address, a 192 and a 512 icon', () => {
    expect(manifest.display).toBe('standalone');
    expect(manifest.start_url).toBe('/');
    const sizes = manifest.icons.map((i: { sizes: string }) => i.sizes);
    expect(sizes).toEqual(expect.arrayContaining(['192x192', '512x512']));
  });

  it('keeps nothing offline: no service worker would serve an old room', () => {
    const html = readFileSync('src/app.html', 'utf8');
    expect(html).toContain('rel="manifest"');
    expect(html).not.toMatch(/serviceWorker/);
  });
});

describe('the full-screen card', () => {
  it('keeps its buttons above the card, clear of the hint Android lays at the bottom', () => {
    const source = readFileSync('src/lib/ShowCard.svelte', 'utf8');
    const markup = source.slice(source.indexOf('<dialog'));
    expect(markup.indexOf('class="bar"')).toBeGreaterThan(-1);
    expect(markup.indexOf('class="bar"')).toBeLessThan(markup.indexOf('show-card-deck'));
    expect(markup.indexOf('class="bar"')).toBeLessThan(markup.indexOf('show-card-face'));
  });
});

describe('where the card is fetched', () => {
  it('never travels with the room or the home page', () => {
    for (const file of ['src/routes/[id]/+page.svelte', 'src/lib/HomepageTemplate.svelte']) {
      const source = readFileSync(file, 'utf8');
      expect(source, file).toContain("() => import('#lib/ShowCard.svelte')");
      expect(source, file).not.toMatch(/^\s*import .*ShowCard\.svelte/m);
    }
    expect(readFileSync('src/routes/[id]/+page.svelte', 'utf8')).not.toContain('show-card.ts');
    // One file for a room: the home shares no module with the card.
    expect(readFileSync('src/lib/HomepageTemplate.svelte', 'utf8')).not.toContain('show-card.ts');
    expect(readFileSync('src/lib/ShowCard.svelte', 'utf8')).not.toContain('pocket-deck.ts');
  });
});
