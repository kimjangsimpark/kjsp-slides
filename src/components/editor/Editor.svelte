<script type="ts">
  import { map, pairwise, startWith, tap } from 'rxjs/operators';
  import { afterUpdate$, onDestroy$ } from '@/misc/svelte-rx';
  import { document$ } from '@/store/document';
  import { currentQueue$ } from '@/store/queue';
  import { currentQueueObject$ } from '@/store/queueObject';
  import { currentQueueObjectReducer } from '@/store/queueObject';
  import SelectedObject from './SelectedObject.svelte';
  import { scale$ } from '@/store/scale';
  import type { DocumentObject } from '@/http/document';

  let svgElement: SVGElement;
  let queueChanged = false;

  const queue$ = currentQueue$.pipe(startWith(null), pairwise());

  interface PreviousQueue {
    [key: string]: DocumentObject;
  }

  $: selectedObject = currentQueueObject$;
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
    tap(() => (queueChanged = true)),
  );
  $: scale = scale$;

  const onEmptySpaceClicked = () => {
    currentQueueObjectReducer({
      type: 'resetCurrentQueueObject',
    });
  };

  const onObjectClicked = (e: MouseEvent, obj: DocumentObject) => {
    e.preventDefault();
    e.stopPropagation();
    currentQueueObjectReducer({
      type: 'changeCurrentQueueObject',
      state: obj,
    });
  };

  const onSelectedObjectMouseDown = (e: MouseEvent) => {
    if (!$selectedObject) return;
    const object = $selectedObject as DocumentObject;
    const positionX = e.clientX;
    const positionY = e.clientY;
    const captureX = object.shape.x;
    const captureY = object.shape.y;

    const onSelectedObjectMouseMove = (e: MouseEvent) => {
      object.shape.x = captureX + e.clientX - positionX;
      object.shape.y = captureY + e.clientY - positionY;
    };

    const onSelectedObjectMouseUp = (e: MouseEvent) => {
      svgElement.removeEventListener('mousemove', onSelectedObjectMouseMove);
      svgElement.removeEventListener('mouseup', onSelectedObjectMouseUp);
    };

    svgElement.addEventListener('mousemove', onSelectedObjectMouseMove);
    svgElement.addEventListener('mouseup', onSelectedObjectMouseUp);
  };

  const onQueueChangedSubscriber = afterUpdate$.subscribe({
    next: () => {
      if (queueChanged) {
        const animators =
          svgElement.querySelectorAll<SVGAnimateElement>('.queue-animator');
        animators.forEach(animator => animator.beginElement());
        queueChanged = false;
      }
    },
  });

  onDestroy$.subscribe({
    next: () => {
      onQueueChangedSubscriber.unsubscribe();
    },
  });
</script>

<div id="editor">
  <div id="scaler" style="transform: scale({$scale});">
    <div id="frame">
      {#if $document}
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
                <g class="object" on:click={e => onObjectClicked(e, object)}>
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
                        dur="0.5s"
                      />
                      <animate
                        class="queue-animator"
                        begin="indefinite"
                        attributeName="width"
                        from={$previousObjects[object.uuid].shape.width}
                        to={object.shape.width}
                        dur="0.5s"
                      />
                      <animate
                        class="queue-animator"
                        begin="indefinite"
                        attributeName="x"
                        from={$previousObjects[object.uuid].shape.x}
                        to={object.shape.x}
                        dur="0.5s"
                      />
                      <animate
                        class="queue-animator"
                        begin="indefinite"
                        attributeName="y"
                        from={$previousObjects[object.uuid].shape.y}
                        to={object.shape.y}
                        dur="0.5s"
                      />
                    {/if}
                  </rect>
                </g>
              {/if}
            {/each}
          {/if}
          {#if $selectedObject}
            <SelectedObject
              selected={$selectedObject}
              previous={$previousObjects[$selectedObject.uuid]}
              on:mousedown={onSelectedObjectMouseDown}
            />
          {/if}
        </svg>
      {/if}
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

  .object {
    cursor: move;
  }

  .page {
    border: 1px solid gray;
    background: white;
  }
</style>
