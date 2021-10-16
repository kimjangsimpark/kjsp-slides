<script type="ts">
  import { map, pairwise, startWith, tap } from 'rxjs/operators';
  import { afterUpdate$ } from '@/misc/svelte-rx';
  import { document$, QueueObject } from '@/store/document';
  import { currentQueue$ } from '@/store/queue';
  import { currentQueueObjectReducer } from '@/store/queueObject';
  import SelectedObject from './SelectedObject.svelte';
  import { scale$ } from '@/store/scale';

  let svgElement: SVGElement;

  const queue$ = currentQueue$.pipe(startWith(null), pairwise());

  interface PreviousQueue {
    [key: string]: QueueObject;
  }

  $: document = document$;
  $: previousObjects = queue$.pipe(
    map(([previousQueue]) => {
      if (!previousQueue) {
        return {};
      }
      return previousQueue.objects.reduce<PreviousQueue>((result, current) => {
        result[current.uuid] = current;
        return result;
      }, {});
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

  const onObjectClicked = (e: MouseEvent, obj: QueueObject) => {
    e.preventDefault();
    e.stopPropagation();
    currentQueueObjectReducer({
      type: 'changeCurrentQueueObject',
      state: obj,
    });
  };

  afterUpdate$
    .pipe(
      tap(() => {
        const animators =
          svgElement.querySelectorAll<SVGAnimateElement>('.queue-animator');
        console.log(animators);
        animators.forEach(animator => animator.beginElement());
      }),
    )
    .subscribe();
</script>

<div id="editor">
  <div id="scaler" style="transform: scale({$scale});">
    <div id="frame">
      <svg
        bind:this={svgElement}
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
                  {#if $previousObjects[object.uuid]}
                    <animate
                      class="queue-animator"
                      begin="indefinite"
                      attributeName="height"
                      from={$previousObjects[object.uuid].shape.height}
                      to={object.shape.height}
                      dur="1s"
                    />
                    <animate
                      class="queue-animator"
                      begin="indefinite"
                      attributeName="width"
                      from={$previousObjects[object.uuid].shape.width}
                      to={object.shape.width}
                      dur="1s"
                    />
                    <animate
                      class="queue-animator"
                      begin="indefinite"
                      attributeName="x"
                      from={$previousObjects[object.uuid].shape.x}
                      to={object.shape.x}
                      dur="1s"
                    />
                    <animate
                      class="queue-animator"
                      begin="indefinite"
                      attributeName="y"
                      from={$previousObjects[object.uuid].shape.y}
                      to={object.shape.y}
                      dur="1s"
                    />
                  {/if}
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
