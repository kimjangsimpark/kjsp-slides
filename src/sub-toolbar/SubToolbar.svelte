<script type="ts">
  import { useDispatch, useSelector } from '@/app/hooks';
  import QueButton from '@/buttons/QueButton.svelte';
  import {
    currentQueueIndexSelector,
    currentQueueRangeSelector,
    queueIndexSlice,
  } from '@/store/queue.store';
  import { scaleSlice } from '@/store/scale.store';

  const dispatch = useDispatch();
  const currentQueueIndex = useSelector(currentQueueIndexSelector());
  const range = useSelector(currentQueueRangeSelector());

  const onPrevClicked = () => {
    dispatch(queueIndexSlice.actions.set($currentQueueIndex - 1));
  };

  const onNextClicked = () => {
    dispatch(queueIndexSlice.actions.set($currentQueueIndex + 1));
  };

  const onIndexClicked = (index: number) => {
    dispatch(queueIndexSlice.actions.set(index));
  };

  const onScaleDownClicked = () => {
    dispatch(scaleSlice.actions.decrease());
  };

  const onScaleUpClicked = () => {
    dispatch(scaleSlice.actions.increase());
  };
</script>

<div id="subtoolbar">
  <div class="subtoolbar-button-group">
    <div class="subtoolbar-item">
      <QueButton class="subtoolbar-button">
        <i class="ri-arrow-go-back-line" />
      </QueButton>
    </div>
    <div class="subtoolbar-item">
      <QueButton class="subtoolbar-button">
        <i class="ri-arrow-go-forward-line" />
      </QueButton>
    </div>
  </div>

  <div class="subtoolbar-button-group">
    <div class="subtoolbar-item">
      <QueButton class="subtoolbar-button" on:click={() => onPrevClicked()}>
        <i class="ri-arrow-left-line" />
      </QueButton>
    </div>
    {#each $range as index}
      <div class="subtoolbar-item">
        <QueButton class="subtoolbar-button" on:click={() => onIndexClicked(index)}>
          <span class="que-index {index === $currentQueueIndex ? 'current' : ''}">
            {index > -1 ? index + 1 : ''}
          </span>
        </QueButton>
      </div>
    {/each}
    <div class="subtoolbar-item">
      <QueButton class="subtoolbar-button" on:click={() => onNextClicked()}>
        <i class="ri-arrow-right-line" />
      </QueButton>
    </div>
  </div>

  <div class="subtoolbar-button-group">
    <div class="subtoolbar-item">
      <QueButton class="subtoolbar-button" on:click={() => onScaleDownClicked()}>
        <i class="ri-subtract-line" />
      </QueButton>
    </div>

    <div class="subtoolbar-item">
      <QueButton class="subtoolbar-button" on:click={() => onScaleUpClicked()}>
        <i class="ri-add-line" />
      </QueButton>
    </div>
  </div>
</div>

<style type="scss">
  #subtoolbar {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(0 0 0 / 10%);

    .subtoolbar-item {
      height: 100%;
      width: 40px;
      display: flex;
    }
  }

  .subtoolbar-button-group {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .que-index {
    color: black;
    &.current {
      color: red;
    }
  }

  .subtoolbar-button {
    height: 100%;
  }
</style>
