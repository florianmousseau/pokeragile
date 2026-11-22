import { describe, expect, it } from 'vitest';
import { loadHistory, mergeHistory, syncHistory } from './history';
import { historyKey } from './seat';
import type { RoomState, Story } from './useRoom.svelte';

function memoryStorage() {
  const items = new Map<string, string>();
  return {
    getItem: (k: string) => items.get(k) ?? null,
    setItem: (k: string, v: string) => void items.set(k, v),
    removeItem: (k: string) => void items.delete(k),
    items,
  };
}

const actual = { files: 4, added: 120, removed: 30, tests: 2, minutes: 0 };
const csv: Story = { title: 'CSV export', estimate: '3', actual, looksLike: '5' };
const login: Story = { title: 'Login', estimate: '5' };
const draft: Story = { title: 'Search', estimate: '' };

const stateWith = (stories: Story[], more: Partial<RoomState> = {}) => ({ stories, activity: [], ...more }) as unknown as RoomState;

function recorder() {
  const sent: { type: string; payload: string }[] = [];
  return { sent, send: (type: string, payload: string) => sent.push({ type, payload }) };
}

describe('mergeHistory', () => {
  it('keeps the estimated stories with their measure, and not what the room computes', () => {
    expect(mergeHistory([], [csv, login, draft])).toEqual([
      { title: 'CSV export', estimate: '3', actual },
      { title: 'Login', estimate: '5' },
    ]);
  });

  it('keeps the stories the room no longer lists', () => {
    expect(mergeHistory([{ title: 'Old', estimate: '8' }], [login]).map((s) => s.title)).toEqual(['Old', 'Login']);
  });

  it('takes the room\'s word on a story it lists', () => {
    const kept = [{ title: 'Login', estimate: '8' }, { title: 'Search', estimate: '2' }];
    expect(mergeHistory(kept, [login, draft])).toEqual([{ title: 'Login', estimate: '5' }]);
  });

  it('holds no more than a room does', () => {
    const many = Array.from({ length: 130 }, (_, i) => ({ title: `story ${i}`, estimate: '3' }));
    const kept = mergeHistory([], many);
    expect(kept).toHaveLength(100);
    expect(kept.at(-1)?.title).toBe('story 129');
  });
});

describe('syncHistory', () => {
  it('keeps what the room shows, under the room address', () => {
    const storage = memoryStorage();
    syncHistory(storage, 'team42', stateWith([csv, draft]), null);
    expect(loadHistory(storage, 'team42')).toEqual([{ title: 'CSV export', estimate: '3', actual }]);
    expect(loadHistory(storage, 'other')).toEqual([]);
  });

  // D-364: the server forgot the room, the address is opened again.
  it('replays the kept stories into a room that came back empty', () => {
    const storage = memoryStorage();
    syncHistory(storage, 'team42', stateWith([csv, login]), null);
    const { sent, send } = recorder();
    syncHistory(storage, 'team42', stateWith([]), send);
    expect(sent).toHaveLength(1);
    expect(sent[0].type).toBe('restore');
    expect(sent[0].payload.split('\n').map((line) => JSON.parse(line))).toEqual([
      { title: 'CSV export', estimate: '3', actual },
      { title: 'Login', estimate: '5' },
    ]);
    expect(loadHistory(storage, 'team42')).toHaveLength(2);
  });

  it('replays only what the room does not hold, and nothing once it holds it all', () => {
    const storage = memoryStorage();
    syncHistory(storage, 'team42', stateWith([csv, login]), null);
    const first = recorder();
    syncHistory(storage, 'team42', stateWith([login]), first.send);
    expect(first.sent.map((m) => JSON.parse(m.payload).title)).toEqual(['CSV export']);
    const second = recorder();
    syncHistory(storage, 'team42', stateWith([csv, login]), second.send);
    expect(second.sent).toEqual([]);
  });

  it('does not replay outside an arrival', () => {
    const storage = memoryStorage();
    syncHistory(storage, 'team42', stateWith([csv]), null);
    syncHistory(storage, 'team42', stateWith([]), null);
    expect(loadHistory(storage, 'team42')).toHaveLength(1);
  });

  it('sends a long history in frames of whole lines under 4 KB', () => {
    const storage = memoryStorage();
    const many = Array.from({ length: 40 }, (_, i) => ({ title: `${'é'.repeat(190)} "${i}"`, estimate: '13', actual }));
    syncHistory(storage, 'team42', stateWith(many), null);
    const { sent, send } = recorder();
    syncHistory(storage, 'team42', stateWith([]), send);
    expect(sent.length).toBeGreaterThan(1);
    const frame = (m: { type: string; payload: string }) => new TextEncoder().encode(JSON.stringify({ ...m, round: 0 })).length;
    expect(Math.max(...sent.map(frame))).toBeLessThan(4096);
    expect(sent.flatMap((m) => m.payload.split('\n')).map((line) => JSON.parse(line).title)).toEqual(many.map((s) => s.title));
  });

  it('stays under the burst one connection may send', () => {
    const storage = memoryStorage();
    const many = Array.from({ length: 100 }, (_, i) => ({ title: `${'\u{1F600}'.repeat(199)}${i}`, estimate: '13', actual }));
    syncHistory(storage, 'team42', stateWith(many), null);
    const { sent, send } = recorder();
    syncHistory(storage, 'team42', stateWith([]), send);
    expect(sent).toHaveLength(30);
  });

  it('forgets the kept stories once someone cleared the list', () => {
    const storage = memoryStorage();
    syncHistory(storage, 'team42', stateWith([csv, login]), null);
    const { sent, send } = recorder();
    syncHistory(storage, 'team42', stateWith([], { cleared: true }), send);
    expect(sent).toEqual([]);
    expect(storage.items.has(historyKey('team42'))).toBe(false);
  });

  it('keeps only the new list after a clear', () => {
    const storage = memoryStorage();
    syncHistory(storage, 'team42', stateWith([csv]), null);
    syncHistory(storage, 'team42', stateWith([login], { cleared: true }), null);
    expect(loadHistory(storage, 'team42')).toEqual([{ title: 'Login', estimate: '5' }]);
  });

  it('reads nothing from a copy it cannot parse', () => {
    const storage = memoryStorage();
    storage.setItem(historyKey('team42'), '{"not":"a list"');
    expect(loadHistory(storage, 'team42')).toEqual([]);
    storage.setItem(historyKey('team42'), JSON.stringify([{ title: 'no estimate' }, 4, null, login]));
    expect(loadHistory(storage, 'team42')).toEqual([login]);
  });

  it('survives a storage that refuses to write', () => {
    const storage = { getItem: () => null, setItem: () => { throw new Error('quota'); }, removeItem: () => { throw new Error('quota'); } };
    expect(() => syncHistory(storage, 'team42', stateWith([csv]), null)).not.toThrow();
    expect(() => syncHistory(storage, 'team42', stateWith([]), null)).not.toThrow();
  });
});
