<script type="ts">
  import { map, pairwise, startWith, tap } from 'rxjs/operators';
  import { document$, QueueObject } from '@/store/document';
  import { currentQueue$ } from '@/store/queue';
  import { currentQueueObjectReducer } from '@/store/queueObject';
  import SelectedObject from './SelectedObject.svelte';
  import { scale$ } from '@/store/scale';

  const queue$ = currentQueue$.pipe(startWith(null), pairwise());

  $: document = document$;
  $: previousObjects = queue$.pipe(
    map(([previousQueue]) => {
      return previousQueue?.objects;
    }),
  );
  $: objects = queue$.pipe(
    map(([, currentQueue]) => {
      return currentQueue?.objects;
    }),
  );
  $: scale = scale$;

  const onEmptySpaceClicked = () => {
    currentQueueObjectReducer({
      type: 'resetCurrentQueueObject',
    });
  };

  const previous = (object: QueueObject): boolean => {
    return false;
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
                >
                  <!--  -->
                </rect>
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
