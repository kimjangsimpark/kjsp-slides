<script type="ts">
  import { map, tap } from 'rxjs/operators';
  import { document$, QueueObject } from '@/store/document';
  import { currentQueue$ } from '@/store/queue';
  import { currentQueueObject$, currentQueueObjectReducer } from '@/store/queueObject';
  import SelectedObject from './SelectedObject.svelte';
  import { scale$ } from '@/store/scale';

  $: document = document$;
  $: objects = currentQueue$.pipe(map(currentQueue => currentQueue.objects));
  $: currentQueueObject = currentQueueObject$;
  $: scale = scale$;

  const onEmptySpaceClicked = () => {
    console.log('reset');
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
  <div id="scaler" style="transform: scale({$scale});">
    <div id="frame">
      <svg
        id="svg"
        class="page"
        style="width: {$document.rect.width}px; height: {$document.rect.height}px;"
        on:click={() => onEmptySpaceClicked()}
      >
        {#if $objects}
          {#each $objects as object}
            {#if object.type === 'rectangle'}
              <g on:click={e => onObjectClicked(e, object)}>
                <rect
                  x={object.shape.x}
                  y={object.shape.y}
                  width={object.shape.width}
                  height={object.shape.height}
                />
              </g>
            {/if}
          {/each}
        {/if}
        <SelectedObject />
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
