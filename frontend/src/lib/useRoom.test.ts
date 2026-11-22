import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('$app/env', () => ({ browser: true }));
vi.mock('$app/env/public', () => ({ PUBLIC_WS_URL: 'ws://test' }));
const destroyHooks = vi.hoisted(() => [] as (() => void)[]);
vi.mock('svelte', async (original) => ({
  ...(await original<typeof import('svelte')>()),
  onDestroy: (hook: () => void) => destroyHooks.push(hook),
}));

class FakeSocket {
  static OPEN = 1;
  static last: FakeSocket;
  readyState = 0;
  sent: { type: string; payload: string; round?: number }[] = [];
  onopen: (() => void) | null = null;
  onmessage: ((e: { data: string }) => void) | null = null;
  onclose: (() => void) | null = null;
  onerror: (() => void) | null = null;
  constructor(public url: string) {
    FakeSocket.last = this;
  }
  send(data: string) {
    this.sent.push(JSON.parse(data));
  }
  close() {
    this.readyState = 3;
  }
  open() {
    this.readyState = 1;
    this.onopen?.();
  }
  receive(type: string, payload: unknown) {
    this.onmessage?.({ data: JSON.stringify({ type, payload }) });
  }
}

const T = { live: { newRound: () => '', revealed: '' } };

async function joined() {
  const { useRoom } = await import('./useRoom.svelte');
  const room = useRoom(() => 'r1', () => T as never);
  room.join('Alice', false);
  return room;
}

describe('useRoom', () => {
  beforeEach(() => {
    destroyHooks.length = 0;
    vi.useFakeTimers();
    vi.stubGlobal('WebSocket', FakeSocket);
    vi.stubGlobal('sessionStorage', { getItem: () => null, setItem: () => {}, removeItem: () => {} });
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('drops its own vote when the room turns it into an observer', async () => {
    const room = await joined();
    FakeSocket.last.open();
    FakeSocket.last.receive('welcome', { id: 'me', token: 't', vote: '' });
    room.castVote('8');
    FakeSocket.last.receive('vote', '8');
    const state = (observer: boolean) => ({ id: 'r1', cards: ['8'], state: 'voting', round: 1, results: null, activity: [], players: [{ id: 'me', name: 'Alice', vote: '', observer }] });
    FakeSocket.last.receive('state', state(true));
    expect(room.myVote).toBe('');
    FakeSocket.last.receive('state', state(false));
    expect(room.myVote).toBe('');
    room.castVote('8');
    expect(FakeSocket.last.sent.at(-1)).toEqual({ type: 'vote', payload: '8', round: 1 });
  });

  it('drops a welcome vote the room no longer holds after a reload', async () => {
    const room = await joined();
    FakeSocket.last.open();
    FakeSocket.last.receive('welcome', { id: 'me', token: 't', vote: '8' });
    expect(room.myVote).toBe('8');
    const cleared = { id: 'r1', cards: ['8'], state: 'voting', round: 2, results: null, activity: [], players: [{ id: 'me', name: 'Alice', vote: '', observer: false }] };
    FakeSocket.last.receive('state', cleared);
    expect(room.myVote).toBe('');
  });

  it('keeps a vote on its way while the room has not counted it yet', async () => {
    const room = await joined();
    FakeSocket.last.open();
    FakeSocket.last.receive('welcome', { id: 'me', token: 't', vote: '' });
    FakeSocket.last.receive('state', { id: 'r1', cards: ['8'], state: 'voting', round: 1, results: null, activity: [], players: [{ id: 'me', name: 'Alice', vote: '', observer: false }] });
    room.castVote('8');
    FakeSocket.last.receive('state', { id: 'r1', cards: ['8'], state: 'voting', round: 1, results: null, activity: [], players: [{ id: 'me', name: 'Alice', vote: '', observer: false }] });
    expect(room.myVote).toBe('8');
  });

  it('replaces a socket that never leaves CONNECTING', async () => {
    await joined();
    const stuck = FakeSocket.last;
    vi.advanceTimersByTime(60_000);
    expect(stuck.readyState).toBe(3);
    vi.advanceTimersByTime(1000);
    expect(FakeSocket.last).not.toBe(stuck);
  });

  it('reconnects with the role the room holds now, not the one it joined with', async () => {
    await joined();
    FakeSocket.last.open();
    FakeSocket.last.receive('welcome', { id: 'me', token: 't', vote: '' });
    FakeSocket.last.receive('state', { id: 'r1', cards: ['8'], state: 'voting', round: 1, results: null, activity: [], players: [{ id: 'me', name: 'Alice', vote: '', observer: true }] });
    const before = FakeSocket.last;
    before.onclose?.();
    vi.advanceTimersByTime(1000);
    expect(FakeSocket.last).not.toBe(before);
    expect(FakeSocket.last.url).toContain('observer=true');
  });

  it('spaces its attempts while sockets open and close with no welcome, and starts over after one', async () => {
    await joined();
    FakeSocket.last.open();
    FakeSocket.last.receive('welcome', { id: 'me', token: 't', vote: '' });
    const dropThenWait = (ms: number) => {
      const before = FakeSocket.last;
      before.onclose?.();
      vi.advanceTimersByTime(ms - 1);
      expect(FakeSocket.last).toBe(before);
      vi.advanceTimersByTime(1);
      expect(FakeSocket.last).not.toBe(before);
      FakeSocket.last.open();
    };
    dropThenWait(1000);
    dropThenWait(2000);
    dropThenWait(4000);
    FakeSocket.last.receive('welcome', { id: 'me', token: 't', vote: '' });
    dropThenWait(1000);
  });

  it('names the round on screen with every command', async () => {
    const room = await joined();
    FakeSocket.last.open();
    FakeSocket.last.receive('state', { id: 'r1', cards: ['8'], state: 'revealed', round: 3, results: null, activity: [], players: [] });
    room.clear();
    expect(FakeSocket.last.sent.at(-1)).toEqual({ type: 'clear', payload: '', round: 3 });
  });

  it('does not show a vote that could not leave', async () => {
    const room = await joined();
    room.castVote('5');
    expect(room.myVote).toBe('');
    expect(FakeSocket.last.sent).toEqual([]);
  });

  it('shows the vote the room holds, not the one it refused', async () => {
    const room = await joined();
    FakeSocket.last.open();
    room.castVote('8');
    expect(room.myVote).toBe('8');
    FakeSocket.last.receive('vote', '5');
    expect(room.myVote).toBe('5');
  });

  it('does not let the answer to an earlier vote replace a later one', async () => {
    const room = await joined();
    FakeSocket.last.open();
    room.castVote('5');
    room.castVote('8');
    FakeSocket.last.receive('vote', '5');
    expect(room.myVote).toBe('8');
    FakeSocket.last.receive('vote', '8');
    expect(room.myVote).toBe('8');
    room.castVote('5');
    expect(FakeSocket.last.sent.at(-1)).toEqual({ type: 'vote', payload: '5', round: 0 });
  });

  it('pings, and reconnects after a silence', async () => {
    await joined();
    const first = FakeSocket.last;
    first.open();
    vi.advanceTimersByTime(25_000);
    expect(first.sent.at(-1)?.type).toBe('ping');
    vi.advanceTimersByTime(60_000);
    expect(first.readyState).toBe(3);
    vi.advanceTimersByTime(1_000);
    expect(FakeSocket.last).not.toBe(first);
  });

  it('opens no socket and sends no ping once destroyed during a scheduled reconnection', async () => {
    await joined();
    const first = FakeSocket.last;
    first.open();
    first.onclose?.();
    destroyHooks.forEach((hook) => hook());
    vi.advanceTimersByTime(120_000);
    expect(FakeSocket.last).toBe(first);
    expect(first.sent).toEqual([]);
  });

  it('closes its socket and stops pinging when destroyed while connected', async () => {
    await joined();
    const socket = FakeSocket.last;
    socket.open();
    destroyHooks.forEach((hook) => hook());
    expect(socket.readyState).toBe(3);
    socket.onclose?.();
    vi.advanceTimersByTime(120_000);
    expect(socket.sent).toEqual([]);
    expect(FakeSocket.last).toBe(socket);
  });

  it('forgets the seat and never reconnects once kicked', async () => {
    const removeItem = vi.fn();
    vi.stubGlobal('sessionStorage', { getItem: () => null, setItem: () => {}, removeItem });
    const room = await joined();
    const socket = FakeSocket.last;
    socket.open();
    socket.receive('welcome', { id: 'me', token: 't', vote: '' });
    socket.receive('kicked', null);
    expect(room.kicked).toBe(true);
    expect(removeItem).toHaveBeenCalled();
    expect(socket.readyState).toBe(3);
    socket.onclose?.();
    vi.advanceTimersByTime(120_000);
    expect(FakeSocket.last).toBe(socket);
  });

  // D-364: a room the server forgot is opened again at the same address.
  describe('the history a browser keeps', () => {
    const base = { id: 'r1', cards: ['3', '5'], state: 'voting', round: 1, results: null, activity: [], players: [{ id: 'me', name: 'Alice', vote: '', observer: false }] };
    const stories = [{ title: 'CSV export', estimate: '3', actual: { files: 4, added: 120, removed: 30, tests: 0, minutes: 0 } }];

    function deviceMemory(items = new Map<string, string>()) {
      vi.stubGlobal('localStorage', {
        getItem: (k: string) => items.get(k) ?? null,
        setItem: (k: string, v: string) => void items.set(k, v),
        removeItem: (k: string) => void items.delete(k),
      });
      return items;
    }
    // The module arrives through a dynamic import: let it land.
    const settled = async () => {
      await import('./history');
      await vi.advanceTimersByTimeAsync(0);
    };

    it('keeps the estimated stories of the room it sees', async () => {
      const items = deviceMemory();
      await joined();
      FakeSocket.last.open();
      FakeSocket.last.receive('welcome', { id: 'me', token: 't', vote: '' });
      FakeSocket.last.receive('state', { ...base, stories });
      await settled();
      expect(JSON.parse(items.get('cleanpoker:history:r1') ?? '[]')).toEqual(stories);
      expect(FakeSocket.last.sent.filter((m) => m.type === 'restore')).toEqual([]);
    });

    it('replays them once, on arrival in the room that came back empty', async () => {
      deviceMemory(new Map([['cleanpoker:history:r1', JSON.stringify(stories)]]));
      await joined();
      FakeSocket.last.open();
      FakeSocket.last.receive('welcome', { id: 'me', token: 't', vote: '' });
      FakeSocket.last.receive('state', { ...base, stories: [] });
      FakeSocket.last.receive('state', { ...base, stories: [] });
      await settled();
      const restores = FakeSocket.last.sent.filter((m) => m.type === 'restore');
      expect(restores).toHaveLength(1);
      expect(JSON.parse(restores[0].payload)).toEqual(stories[0]);
    });

    it('asks for nothing in a room with no list and no kept history', async () => {
      const getItem = vi.fn(() => null);
      vi.stubGlobal('localStorage', { getItem, setItem: () => {}, removeItem: () => {} });
      await joined();
      FakeSocket.last.open();
      FakeSocket.last.receive('welcome', { id: 'me', token: 't', vote: '' });
      FakeSocket.last.receive('state', base);
      await settled();
      expect(getItem).toHaveBeenCalledWith('cleanpoker:history:r1');
      expect(FakeSocket.last.sent).toEqual([]);
    });
  });
});
