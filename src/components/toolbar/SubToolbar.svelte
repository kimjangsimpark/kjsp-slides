<script type="ts">
  import { document$, DocumentState, Queue } from '@/store/document';
  import { currentQueue$, currentQueueReducer, CurrentQueueState } from '@/store/queue';

  let documentState: DocumentState;
  document$.subscribe(state => {
    documentState = state;
  });

  let currentQueueState: CurrentQueueState;
  let ranges: Queue[] = [];
  currentQueue$.subscribe(state => {
    currentQueueState = state;
    const start = Math.max(state.queue.index - 3, 0);
    const end = Math.min(state.queue.index + 4, documentState.queues.length);
    ranges = documentState.queues.slice(start, end);
  });

  const onPrevClicked = () => {
    const pendingIndex = currentQueueState.queue.index - 1;
    if (pendingIndex < 0) {
      return;
    }
    currentQueueReducer({
      type: 'changeCurrentQueue',
      index: pendingIndex,
    });
  };

  const onNextClicked = () => {
    const pendingIndex = currentQueueState.queue.index + 1;
    if (pendingIndex >= documentState.queues.length - 1) {
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
  {#each ranges as queue}
    <div class="subtoolbar-item {queue === currentQueueState.queue ? 'current' : ''}">
      {Number(queue.index) + 1}
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
