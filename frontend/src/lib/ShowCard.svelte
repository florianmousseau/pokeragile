<script lang="ts">
  import { lang, type Lang } from '#lib/lang.svelte.ts';
  import { SHOW_CARD_WORDS, faceUp, keepScreenOn, labelSize } from '#lib/show-card.ts';

  interface Props {
    /** The language of the page that carries it; a room speaks the visitor's. */
    locale?: Lang;
    /** The deck to pick from, for a pocket deck: nothing is sent anywhere. */
    deck?: string[];
    /** What the pocket deck is called, said by the page that opens it. */
    name?: string;
    /** The card voted in a room. */
    vote?: string;
    /** Whether the room has revealed its votes. */
    revealed?: boolean;
    onclose?: () => void;
  }
  let { locale = lang.current, deck, name, vote = '', revealed = false, onclose }: Props = $props();

  const W = $derived(SHOW_CARD_WORDS[locale]);
  let dialog = $state<HTMLDialogElement | null>(null);
  let stage = $state<HTMLDivElement | null>(null);
  let open = $state(false);
  let picked = $state('');
  let flipped = $state(false);
  const card = $derived(deck ? picked : vote);
  const face = $derived(faceUp(revealed, flipped));

  // A hand flip belongs to one card in one state of the round.
  $effect(() => {
    void card; void revealed;
    flipped = false;
  });

  function show() {
    if (!dialog || dialog.open) return;
    dialog.showModal();
    open = true;
    // A dialog cannot go full screen itself; what it holds can. Refused in an
    // iPhone browser: the dialog already covers the page.
    stage?.requestFullscreen?.().catch(() => {});
  }

  function closed() {
    open = false;
    picked = '';
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
    onclose?.();
  }

  $effect(() => {
    if (open) return keepScreenOn({ navigator, document });
  });

  // A new round takes the vote back, and the card with it.
  $effect(() => {
    if (!deck && !vote && dialog?.open) dialog.close();
  });

  // A pocket deck has no button of its own: it opens as soon as it is here.
  $effect(() => {
    if (deck && dialog) show();
  });
</script>

{#if !deck && vote}
  <button type="button" class="btn btn-secondary btn-sm show-btn" onclick={show} data-testid="show-card-btn">{W.show}</button>
{/if}

<dialog bind:this={dialog} onclose={closed} aria-label={name ?? W.show} data-testid="show-card">
  <div class="stage" bind:this={stage}>
    {#if open}
      {#if card}
        <button type="button" class="big" class:back={!face} onclick={() => (flipped = !flipped)}
          aria-label={W.flip} data-testid="show-card-face">
          {#if face}
            <span class="label" style:font-size={labelSize(card)}>{card}</span>
          {:else}
            <span class="sr-only">{W.hidden}</span>
          {/if}
        </button>
      {:else}
        <ul class="deck" role="list" aria-label={W.pick} data-testid="show-card-deck">
          {#each deck ?? [] as c, i (i)}
            <li><button type="button" class="pick" onclick={() => (picked = c)}>{c}</button></li>
          {/each}
        </ul>
      {/if}
      <div class="bar">
        {#if deck && card}
          <button type="button" class="btn btn-secondary btn-sm" onclick={() => (picked = '')} data-testid="show-card-change">{W.change}</button>
        {/if}
        <button type="button" class="btn btn-secondary btn-sm" onclick={() => dialog?.close()} data-testid="show-card-close">{W.close}</button>
      </div>
    {/if}
  </div>
</dialog>

<style>
  .show-btn { margin-top: 0.75rem; }
  dialog {
    width: 100vw; height: 100dvh; max-width: none; max-height: none;
    margin: 0; padding: 0; border: 0; background: var(--color-bg); color: var(--color-text);
  }
  .stage {
    width: 100%; height: 100%; box-sizing: border-box; background: var(--color-bg);
    display: flex; flex-direction: column; gap: 12px; padding: 12px;
  }
  .big {
    flex: 1; min-height: 0; width: 100%; padding: 0; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    font-family: inherit; color: var(--color-primary); cursor: pointer;
    background: var(--color-card-face); border: 6px solid var(--color-card-border-selected);
    border-radius: 24px;
  }
  .big.back {
    background:
      repeating-linear-gradient(45deg, transparent 0 14px, rgba(255, 255, 255, 0.16) 14px 28px),
      var(--color-primary);
    box-shadow: inset 0 0 0 10px var(--color-card-face);
  }
  .label { font-weight: 800; line-height: 1; overflow-wrap: anywhere; text-align: center; }
  .deck {
    flex: 1; min-height: 0; overflow-y: auto; list-style: none; margin: 0; padding: 0;
    display: grid; grid-template-columns: repeat(auto-fill, minmax(min(5rem, 28%), 1fr)); gap: 10px; align-content: start;
  }
  .pick {
    width: 100%; min-height: 6rem; padding: 4px; overflow-wrap: anywhere;
    font: inherit; font-size: 1.75rem; font-weight: 700; color: var(--color-text); cursor: pointer;
    background: var(--color-card-face); border: 2px solid var(--color-border); border-radius: var(--radius);
  }
  .pick:hover { border-color: var(--color-primary); }
  .bar { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
</style>
