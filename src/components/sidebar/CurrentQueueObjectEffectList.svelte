<script lang="ts">
  import type { QueueEffect } from '@/store/document';
  import { currentQueue$, CurrentQueueState } from '@/store/queue';
  import { currentQueObject$ } from '@/store/queueObject';

  let currentQueue: CurrentQueueState;
  currentQueue$.subscribe(state => (currentQueue = state));

  let currentQueueObjectEffects: QueueEffect[] | undefined;
  currentQueObject$.subscribe(state => {
    const queueIndex = currentQueue.queue.index;
    currentQueueObjectEffects = state?.effects.filter(
      effect => effect.index === queueIndex,
    );
  });
</script>

<article class="effect-list-wrapper">
  <header>
    <h2>Effect List</h2>
    <button>+</button>
  </header>
  <ol class="effect-list">
    {#if currentQueueObjectEffects}
      {#each currentQueueObjectEffects as effect}
        <li class="effect-list-item">{effect.type}</li>
      {/each}
    {/if}
  </ol>
</article>

<style lang="scss" scoped>
  .effect-list-wrapper {
    padding: {
      top: 20px;
      bottom: 20px;
    }

    header {
      position: relative;
      display: flex;
      justify-content: center;

      h2 {
        text-align: center;
        font: {
          size: 1rem;
          weight: normal;
        }
      }

      button {
        width: 30px;
        position: absolute;
        right: 0;
      }
    }

    .effect-list {
      min-height: 150px;
      height: 150px;
      padding: 1rem;
      list-style: none;
      overflow-y: auto;
      box-shadow: inset -1px -5px 6px $gray-line-1;

      .effect-list-item {
        padding: 0.4rem 0;
      }
    }
  }
</style>
