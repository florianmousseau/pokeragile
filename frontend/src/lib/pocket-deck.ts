import type { Lang } from '#lib/lang.svelte.ts';

/*
 * All a home page carries of the pocket deck: its name and its address. The
 * card itself comes on demand, and shares no module with this one, so a room
 * fetches a single file for it.
 */
export const POCKET_WORDS: Record<Lang, string> = {
  fr: 'Cartes en main, sans salle',
  en: 'Cards in hand, no room',
  es: 'Cartas en mano, sin sala',
  de: 'Karten in der Hand, ohne Raum',
  pt: 'Cartas na mão, sem sala',
};

/** The fragment that opens the pocket deck on a home page, also the manifest shortcut. */
export const POCKET_HASH = '#cards';
