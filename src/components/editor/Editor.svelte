<script type="ts">
  import { document$, QueueObject } from '@/store/document';
  import { currentQueue$ } from '@/store/queue';
  import { currentQueueObjectReducer } from '@/store/queueObject';

  $: document = document$;
  $: currentQueue = currentQueue$;

  let scale = 0.6;

  const onEmptySpaceClicked = () => {
    currentQueueObjectReducer({
      type: 'resetCurrentQueueObject',
    });
  };

  const onObjectClicked = (e: MouseEvent, obj: QueueObject) => {
    e.preventDefault();
    e.stopPropagation();
    currentQueueObjectReducer({
      type: 'changeCurrentQueueObject',
      state: obj,
    });
  };
</script>

<div id="editor">
  <div id="scaler" style="transform: scale({scale});">
    <div id="frame">
      <svg
        class="page"
        style="width: {$document.rect.width}px; height: {$document.rect.height}px;"
        on:click={() => onEmptySpaceClicked()}
      >
        {#if $currentQueue.queue.objects}
          {#each $currentQueue.queue.objects as object}
            {#if object.type === 'rectangle'}
              <g on:click={e => onObjectClicked(e, object)}>
                <rect
                  x={object.rect.x}
                  y={object.rect.y}
                  width={object.rect.width}
                  height={object.rect.height}
                />
              </g>
            {/if}
          {/each}
        {/if}
      </svg>
    </div>
  </div>
</div>

<style type="scss">
  #editor {
    height: 100%;
    position: relative;
  }

  #scaler {
    display: inline-block;
    position: absolute;
    transform-origin: top left;
  }

  #frame {
    display: inline-block;
    padding: 20px;
  }

  .page {
    border: 1px solid gray;
    background: white;
  }
</style>
