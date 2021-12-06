<script type="ts">
  import { map, pairwise, startWith, tap } from 'rxjs/operators';
  import { afterUpdate$, onDestroy$ } from '@/misc/svelte-rx';
  import { document$ } from '@/store/document';
  import { currentQueue$ } from '@/store/queue';
  import { currentQueueObject$ } from '@/store/queueObject';
  import { currentQueueObjectReducer } from '@/store/queueObject';
  import SelectedObject from './SelectedObject.svelte';
  import { scale$ } from '@/store/scale';
  import type { DocumentObject, RectangleObject } from '@/http/document';
  import { objectReducer } from '@/store/object';
  import { Rect, Shape } from '@/components/sidebar/type';

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

  const onSelectedObjectMouseDown = (customEvent: CustomEvent<{ event: MouseEvent }>) => {
    const e = customEvent.detail.event;
    if (!$selectedObject) return;
    const queueIndex = $queue$[1]?.index as number;
    const object = { ...$selectedObject };
    const positionX = e.offsetX;
    const positionY = e.offsetY;
    const captureX = object.shape.x;
    const captureY = object.shape.y;
    const shape = { ...object.shape };

    const onSelectedObjectMouseMove = (e: MouseEvent) => {
      const diffX = e.offsetX - positionX;
      const diffY = e.offsetY - positionY;
      shape.x = captureX + diffX;
      shape.y = captureY + diffY;

      objectReducer({
        type: 'objectTransitionUpdate',
        uuid: object.uuid,
        queueIndex: queueIndex,
        shape: shape,
      });
    };

    const onSelectedObjectMouseUp = (e: MouseEvent) => {
      svgElement.removeEventListener('mousemove', onSelectedObjectMouseMove);
      svgElement.removeEventListener('mouseup', onSelectedObjectMouseUp);
    };

    svgElement.addEventListener('mousemove', onSelectedObjectMouseMove);
    svgElement.addEventListener('mouseup', onSelectedObjectMouseUp);
  };

  const onSelectedObjectVertextMouseDown = (
    e: CustomEvent<{
      position: string;
      event: MouseEvent;
    }>,
  ) => {
    if (!$selectedObject) return;
    const queueIndex = $queue$[1]?.index as number;
    const position = e.detail.position;
    const object = { ...$selectedObject };
    const positionX = e.detail.event.offsetX;
    const positionY = e.detail.event.offsetY;
    const capture = { ...object.shape };
    const shape = { ...object.shape };

    const onMouseMove = (e: MouseEvent) => {
      const diffX = e.offsetX - positionX;
      const diffY = e.offsetY - positionY;
      switch (position) {
        case 'top-left':
          shape.x = capture.x + diffX;
          shape.y = capture.y + diffY;
          shape.width = capture.width + -diffX;
          shape.height = capture.height + -diffY;
          break;
        case 'top-middle':
          shape.y = capture.y + diffY;
          shape.height = capture.height + -diffY;
          break;
        case 'top-right':
          shape.width = capture.width + diffX;
          shape.y = capture.y + diffY;
          shape.height = capture.height + -diffY;
          break;
        case 'middle-right':
          shape.width = capture.width + diffX;
          break;
        case 'bottom-right':
          shape.width = capture.width + diffX;
          shape.height = capture.height + diffY;
          break;
        case 'bottom-middle':
          shape.height = capture.height + diffY;
          break;
        case 'bottom-left':
          shape.x = capture.x + diffX;
          shape.width = capture.width + -diffX;
          shape.height = capture.height + diffY;
          break;
        case 'middle-left':
          shape.x = capture.x + diffX;
          shape.width = capture.width + -diffX;
          break;
      }
      objectReducer({
        type: 'objectTransitionUpdate',
        uuid: object.uuid,
        queueIndex: queueIndex,
        shape: shape,
      });
    };

    const onMouseUp = (e: MouseEvent) => {
      svgElement.removeEventListener('mousemove', onMouseMove);
      svgElement.removeEventListener('mouseup', onMouseUp);
    };

    svgElement.addEventListener('mousemove', onMouseMove);
    svgElement.addEventListener('mouseup', onMouseUp);
  };

  const onQueueChangedSubscriber = afterUpdate$.subscribe({
    next: () => {
      if (queueChanged) {
        executeQueueAnimation();
        queueChanged = false;
      }
    },
  });

  const executeQueueAnimation = () => {
    const animators = svgElement.querySelectorAll<SVGAnimateElement>('.queue-animator');
    animators.forEach(animator => animator.beginElement());
  };

  const getRect = (object: RectangleObject): Rect => {
    if (object.type === Shape.TEXT) {
      console.log(object.shape.width, object.shape.height);
      return {
        x: object.shape.x + (object.shape.width / 2),
        y: object.shape.y + (object.shape.height / 2),
        width: object.shape.width,
        height: object.shape.height,
      }
    }

    return {
      x: object.shape.x,
      y: object.shape.y,
      width: object.shape.width,
      height: object.shape.height,
    }
  }

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
            {#each $objects as object (object.uuid)}
              {#if object.type }
                <g class="object" on:click={e => onObjectClicked(e, object)}>
                  {#if object.type !== 'text'}
                    <rect
                      x={getRect(object).x}
                      y={getRect(object).y}
                      width={getRect(object).width}
                      height={getRect(object).height}
                      fill="transparent"
                      stroke="{object.type !== 'text' ? '#4fbe9f' : undefined}"
                      stroke-width={object.type !== 'text' ? object.shape.lineWidth : undefined}
                      rx={object.type === 'oval' ? '100' : undefined}
                      ry={object.type === 'oval' ? '50' : undefined}
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

              {#if object.type === 'text'}
                <g class="object" on:click={e => onObjectClicked(e, object)}>
                  <rect
                    x={object.shape.x}
                    y={object.shape.y}
                    width={object.shape.width}
                    height={object.shape.height}
                    stroke="#4fbe9f"
                    stroke-width={object.shape.lineWidth}
                    fill="transparent"
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
                  <foreignObject
                    x={object.shape.x}
                    y={object.shape.y}
                    width={object.shape.width}
                    height={object.shape.height}
                    stroke="#4fbe9f"
                    stroke-width={object.shape.lineWidth}
                    fill="transparent"
                  >
                    <textarea
                      class="object-textarea"
                      style="height: 100%; width: 100%;"
                      value={object.text.innerText}
                    />
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
                  </foreignObject>
                </g>
              {/if}
            {/each}
          {/if}
          {#if $selectedObject}
            <SelectedObject
              selected={$selectedObject}
              previous={$previousObjects[$selectedObject.uuid]}
              on:rect-mousedown={e => onSelectedObjectMouseDown(e)}
              on:vertex-mousedown={e => onSelectedObjectVertextMouseDown(e)}
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

  text {
    width: 200px;
    height: 40px;
    font-size: 35px;
  }

  .object-textarea {
    resize: none;
    border: none;
    overflow: hidden;
  }
</style>
