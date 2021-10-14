<script type="ts">
  import { combineLatest } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { document$ } from '@/store/document';
  import { currentQueue$, currentQueueReducer } from '@/store/queue';

  $: documentState = document$;
  $: currentQueueState = currentQueue$;

  $: ranges = combineLatest([document$, currentQueue$]).pipe(
    map(([document, state]) => {
      const max = document.objects.reduce((result, current) => {
        const max = current.effects.reduce((r, c) => (r > c.index ? r : c.index), 0);
        return result > max ? result : max;
      }, 0);
      const start = Math.max(state.index - 3, 0);
      const end = Math.min(state.index + 4, max);
      const array = [];
      for (let i = start; i < end; i++) {
        array.push(i);
      }
      return array;
    }),
  );

  const onPrevClicked = () => {
    const pendingIndex = $currentQueueState.index - 1;
    if (pendingIndex < 0) {
      return;
    }
    currentQueueReducer({
      type: 'changeCurrentQueue',
      index: pendingIndex,
    });
  };

  const onNextClicked = () => {
    const pendingIndex = $currentQueueState.index + 1;
    if (pendingIndex > $ranges[$ranges.length - 1]) {
      return;
    }
    currentQueueReducer({
      type: 'changeCurrentQueue',
      index: pendingIndex,
    });
  };
</script>

<div id="subtoolbar">
  <div class="subtoolbar-item btn prev">
    <button on:click={onPrevClicked}>prev</button>
  </div>
  {#each $ranges as index}
    <div class="subtoolbar-item {index === $currentQueueState.index ? 'current' : ''}">
      {index + 1}
    </div>
  {/each}
  <div class="subtoolbar-item btn prev">
    <button on:click={onNextClicked}>next</button>
  </div>
</div>

<style type="scss">
  #subtoolbar {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgb(0 0 0 / 10%);

    .subtoolbar-item {
      margin: 10px;

      &.current {
        color: red;
      }
    }
  }
</style>
