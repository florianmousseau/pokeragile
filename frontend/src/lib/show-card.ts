import type { Lang } from '#lib/lang.svelte.ts';

/** What the full-screen card says. Its own words: the room dictionaries stay as they are. */
export interface ShowCardWords {
  show: string;
  pick: string;
  change: string;
  close: string;
  hidden: string;
  flip: string;
}

export const SHOW_CARD_WORDS: Record<Lang, ShowCardWords> = {
  fr: {
    show: 'Ma carte en plein écran',
    pick: 'Choisir une carte',
    change: 'Changer de carte',
    close: 'Fermer',
    hidden: 'Carte face cachée',
    flip: 'Retourner la carte',
  },
  en: {
    show: 'My card, full screen',
    pick: 'Pick a card',
    change: 'Change card',
    close: 'Close',
    hidden: 'Card face down',
    flip: 'Flip the card',
  },
  es: {
    show: 'Mi carta a pantalla completa',
    pick: 'Elegir una carta',
    change: 'Cambiar de carta',
    close: 'Cerrar',
    hidden: 'Carta boca abajo',
    flip: 'Dar la vuelta a la carta',
  },
  de: {
    show: 'Meine Karte im Vollbild',
    pick: 'Karte wählen',
    change: 'Karte wechseln',
    close: 'Schließen',
    hidden: 'Karte verdeckt',
    flip: 'Karte umdrehen',
  },
  pt: {
    show: 'A minha carta em ecrã inteiro',
    pick: 'Escolher uma carta',
    change: 'Mudar de carta',
    close: 'Fechar',
    hidden: 'Carta virada para baixo',
    flip: 'Virar a carta',
  },
};

/**
 * Whether the card shows its face. Face down until the room reveals; a touch
 * turns it over by hand, for a team that reveals by voice or plays without a room.
 */
export function faceUp(revealed: boolean, flipped: boolean): boolean {
  return revealed !== flipped;
}

/**
 * The font size that lets a label fill a phone held up across a room: bounded
 * by the height for "5", by the width for "XXL" or a 16-character custom card.
 */
export function labelSize(label: string): string {
  const glyphs = Math.max([...label].length, 1);
  return `min(${Math.round(130 / glyphs)}vw, 62vh)`;
}

type Sentinel = { release(): Promise<void> };
export type ScreenHost = {
  navigator: { wakeLock?: { request(type: 'screen'): Promise<Sentinel> } };
  document: {
    visibilityState: string;
    addEventListener(type: 'visibilitychange', listener: () => void): void;
    removeEventListener(type: 'visibilitychange', listener: () => void): void;
  };
};

/**
 * Keep the screen on while a card is held up. The browser drops the lock when
 * the tab is hidden, so it is asked again each time the tab comes back.
 * Returns what lets the screen sleep again. A browser without the API, or one
 * that refuses (battery saver), leaves the card on screen all the same.
 */
export function keepScreenOn(host: ScreenHost): () => void {
  let held: Sentinel | null = null;
  let over = false;
  const ask = () => {
    if (over || host.document.visibilityState !== 'visible') return;
    host.navigator.wakeLock?.request('screen').then(
      (sentinel) => {
        if (over) void sentinel.release().catch(() => {});
        else held = sentinel;
      },
      () => {},
    );
  };
  host.document.addEventListener('visibilitychange', ask);
  ask();
  return () => {
    over = true;
    host.document.removeEventListener('visibilitychange', ask);
    void held?.release().catch(() => {});
    held = null;
  };
}
