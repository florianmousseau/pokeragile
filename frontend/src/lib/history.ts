import type { RoomState, Story } from '#lib/useRoom.svelte.ts';
import { chunkLines } from '#lib/export.ts';
import { historyKey } from '#lib/seat.ts';

/**
 * The estimates and measures a team kept, held in each participant's browser
 * under the room address. The server keeps a room in memory only: it forgets
 * it a day after the last activity and at every restart, and a story is
 * delivered days after the vote. The first browser back replays what it kept.
 */
export type Kept = Pick<Story, 'title' | 'estimate' | 'actual'>;

type HistoryStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

/** As many stories as a room holds. */
const MAX_KEPT = 100;

/** Under the burst the server allows one connection; the next arrival sends the rest. */
const MAX_FRAMES = 30;

function isKept(value: unknown): value is Kept {
  if (typeof value !== 'object' || value === null) return false;
  const story = value as Record<string, unknown>;
  return typeof story.title === 'string' && story.title !== ''
    && typeof story.estimate === 'string' && story.estimate !== '';
}

/** Read what the browser kept for a room; nothing when it cannot be read. */
export function loadHistory(storage: HistoryStorage, roomId: string): Kept[] {
  try {
    const parsed: unknown = JSON.parse(storage.getItem(historyKey(roomId)) ?? '[]');
    return Array.isArray(parsed) ? parsed.filter(isKept) : [];
  } catch {
    return [];
  }
}

function saveHistory(storage: HistoryStorage, roomId: string, kept: Kept[]): void {
  try {
    if (kept.length === 0) storage.removeItem(historyKey(roomId));
    else storage.setItem(historyKey(roomId), JSON.stringify(kept));
  } catch {
    // Private mode or a full quota: this browser just replays nothing.
  }
}

/**
 * What the browser holds after seeing the room's list. The room is right about
 * every story it lists: a kept estimate replaces the old one, a story left
 * without one is forgotten. The stories it does not list stay, oldest first.
 */
export function mergeHistory(kept: Kept[], stories: Story[]): Kept[] {
  const byTitle = new Map(kept.map((story) => [story.title, story]));
  for (const { title, estimate, actual } of stories) {
    if (estimate) byTitle.set(title, actual ? { title, estimate, actual } : { title, estimate });
    else byTitle.delete(title);
  }
  return [...byTitle.values()].slice(-MAX_KEPT);
}

/**
 * Bring the browser's copy up to date with a room state and, when `send` is
 * given (the first state after an arrival), replay the kept stories the room
 * does not hold. A list someone cleared takes the kept stories with it.
 */
export function syncHistory(
  storage: HistoryStorage, roomId: string, state: RoomState,
  send: ((type: string, payload: string) => unknown) | null,
): void {
  const stories = state.stories ?? [];
  const kept = mergeHistory(state.cleared ? [] : loadHistory(storage, roomId), stories);
  saveHistory(storage, roomId, kept);
  if (!send) return;
  const held = new Set(stories.map((story) => story.title));
  const missing = kept.filter((story) => !held.has(story.title));
  // A frame holds 4 KB: one story per line, in frames of whole lines.
  const frames = chunkLines(missing.map((story) => JSON.stringify(story)).join('\n'), 2500);
  for (const part of frames.slice(0, MAX_FRAMES)) send('restore', part);
}
