<script lang="ts">
  import type { Extras, Translation } from '#lib/i18n.ts';
  import type { Story } from '#lib/useRoom.svelte.ts';
  import { lazily } from '#lib/lazy.svelte.ts';
  import { similarStories } from '#lib/similar.ts';

  let { stories, current, hidden = false, lang, T, X }: {
    stories: Story[]; current: number; hidden?: boolean; lang: string; T: Translation; X: Extras;
  } = $props();

  // Hidden from who has not voted yet when the room says so: they anchor a vote.
  const similar = $derived(hidden ? [] : similarStories(stories, current));
  // Only a browser with a built-in model can run the analysis.
  const LocalAi = lazily(() => 'LanguageModel' in globalThis, () => import('#lib/LocalAi.svelte'));
</script>

{#if similar.length > 0}
  <div class="table-wrap">
    <table class="similar" data-testid="similar-stories">
      <thead>
        <tr>
          <th scope="col">{X.stories.similar}</th>
          <th scope="col" class="card">{T.stories.colEstimate}</th>
          <th scope="col" class="card">{X.stories.colLooksLike}</th>
        </tr>
      </thead>
      <tbody>
        {#each similar as story (story.title)}
          <tr>
            <td>{story.title}</td>
            <td class="card">{story.estimate}</td>
            <td class="card">{story.looksLike || '-'}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}
{#if LocalAi.current}
  <LocalAi.current story={stories[current].title} {lang} {X} />
{/if}

<style>
  .similar { width: 100%; margin-top: 0.5rem; border-collapse: collapse; font-size: 0.85rem; text-align: left; }
  .similar th, .similar td { padding: 0.3rem min(0.5rem, 8px); border-bottom: 1px solid var(--color-border); }
  .similar th { color: var(--color-text-muted); font-weight: 600; }
  .similar .card { width: 5.5rem; font-weight: 700; }
</style>
