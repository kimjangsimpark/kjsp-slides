<script type="ts">
  import { useDispatch, useSelector } from '@/app/hooks';
  import { currentQueueIndexSelector, queueIndexSlice } from '@/document/queue.store';
  import { scaleSlice } from '@/document/scale.store';
  import { map } from 'rxjs';

  const dispatch = useDispatch();
  const currentQueueIndex = useSelector(currentQueueIndexSelector());

  const range = currentQueueIndex.pipe(
    map(index => {
      const result: number[] = [];
      let start = Math.max(index - 2, 0);
      while (result.length < 5) {
        result.push(start++);
      }
      return result;
    }),
  );

  const onPrevClicked = () => {
    dispatch(queueIndexSlice.actions.set($currentQueueIndex - 1));
  };

  const onNextClicked = () => {
    dispatch(queueIndexSlice.actions.set($currentQueueIndex + 1));
  };

  const onScaleDownClicked = () => {
    dispatch(scaleSlice.actions.increase());
  };

  const onScaleUpClicked = () => {
    dispatch(scaleSlice.actions.decrease());
  };
</script>

<div id="subtoolbar">
  <div class="subtoolbar-item btn prev">
    <button on:click={onPrevClicked}>prev</button>
  </div>
  {#if $range}
    {#each $range as index}
      <div class="subtoolbar-item {index === $currentQueueIndex ? 'current' : ''}">
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
