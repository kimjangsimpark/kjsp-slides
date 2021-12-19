<script type="ts">
  import { useDispatch, useSelector } from '@/app/hooks';
  import { queueIndexSelector, queueIndexSlice } from '@/queue/queue.store';

  import { currentQueue$, currentQueueReducer } from '@/store/queue';
  import { scale$, scaleReducer } from '@/store/scale';
  import { map } from 'rxjs';

  $: scale = scale$;
  $: currentQueueState = currentQueue$;
  $: ranges = currentQueueState.pipe(
    map(({ index }) => {
      return [index - 2, index - 1, index, index + 1, index + 2];
    }),
  );

  const dispatch = useDispatch();
  const currentQueueIndex = useSelector(queueIndexSelector());

  const onPrevClicked = () => {
    const pendingIndex = $currentQueueState.index - 1;
    if (pendingIndex < 0) {
      return;
    }
    dispatch(queueIndexSlice.actions.setCurrentQueue(pendingIndex));
    currentQueueReducer({
      type: 'changeCurrentQueue',
      index: pendingIndex,
    });
  };

  const onNextClicked = () => {
    const pendingIndex = $currentQueueState.index + 1;
    dispatch(queueIndexSlice.actions.setCurrentQueue(pendingIndex));
    currentQueueReducer({
      type: 'changeCurrentQueue',
      index: pendingIndex,
    });
  };

  const onScaleDownClicked = () => {
    const current = $scale;
    scaleReducer({
      type: 'scaleChange',
      value: current - 0.1,
    });
  };

  const onScaleUpClicked = () => {
    const current = $scale;
    scaleReducer({
      type: 'scaleChange',
      value: current + 0.1,
    });
  };
</script>

<div id="subtoolbar">
  <div class="subtoolbar-item btn prev">
    <button on:click={onPrevClicked}>prev</button>
  </div>
  {#if $ranges}
    {#each $ranges as index}
      <div class="subtoolbar-item {index === $currentQueueState.index ? 'current' : ''}">
        {index > -1 ? index + 1 : ''}
      </div>
    {/each}
  {/if}
  <div class="subtoolbar-item btn prev">
    <button on:click={onNextClicked}>next</button>
  </div>

  <div>
    <button on:click={onScaleDownClicked}>-</button>
    <button on:click={onScaleUpClicked}>+</button>
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
