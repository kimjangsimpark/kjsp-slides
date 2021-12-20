<script type="ts">
  import { map, pairwise, startWith } from 'rxjs/operators';
  import { afterUpdate$, onDestroy$ } from '@/misc/svelte-rx';
  import { currentQueue$ } from '@/store/queue';
  import { currentQueueObjectReducer } from '@/store/queueObject';
  import { scale$ } from '@/store/scale';
  import { objectReducer } from '@/store/object';
  import { useDispatch, useSelector } from '@/app/hooks';
  import { documentSelector } from '@/document/document.store';
  import {
    DocumentObject,
    objectsByQueueIndexSelector,
    ObjectAnimatableRect,
    objectsByUUIDSelector,
    ObjectType,
    QueueObject,
  } from '@/document/object.store';
  import { currentQueueIndexSelector } from '@/document/queue.store';
  import { combineLatest } from 'rxjs';
  import { selectedObjectsSelector } from '@/document/selected.store';
  import Rectangle from './objects/rectangle.svelte';
  import Textarea from './objects/Textarea.svelte';

  let svgElement: SVGElement;
  let queueChanged = false;

  const dispatch = useDispatch();
  const document = useSelector(documentSelector());
  const objectByUUID = useSelector(objectsByUUIDSelector());
  const currentQueueIndex = useSelector(currentQueueIndexSelector());
  const objectsByQueueIndex = useSelector(objectsByQueueIndexSelector());
  const selectedObjects = useSelector(selectedObjectsSelector);

  const previous = combineLatest([currentQueueIndex, objectsByQueueIndex]).pipe(
    map(([index, objects]) => objects[index - 1] || []),
    map(objects =>
      objects.reduce<{ [key: string]: QueueObject }>((result, current) => {
        return Object.assign(result, {
          [current.uuid]: current,
        });
      }, {}),
    ),
  );

  const current = combineLatest([currentQueueIndex, objectsByQueueIndex]).pipe(
    map(([index, objects]) => objects[index] || []),
  );

  const next = combineLatest([currentQueueIndex, objectsByQueueIndex]).pipe(
    map(([index, objects]) => objects[index + 1] || []),
    map(objects =>
      objects.reduce<{ [key: string]: QueueObject }>((result, current) => {
        return Object.assign(result, {
          [current.uuid]: current,
        });
      }, {}),
    ),
  );

  const queue$ = currentQueue$.pipe(startWith(null), pairwise());

  interface PreviousQueue {
    [key: string]: DocumentObject;
  }

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
    if (!$selectedObjects) return;
    const queueIndex = $queue$[1]?.index as number;
    const object = { ...$selectedObjects[0] };
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
    if (!$selectedObjects) return;
    const queueIndex = $queue$[1]?.index as number;
    const position = e.detail.position;
    const object = { ...$selectedObjects };
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

  onDestroy$.subscribe({
    next: () => {
      onQueueChangedSubscriber.unsubscribe();
    },
  });
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
        {#if $current}
          {#each $current as object (object.uuid)}
            {#if $objectByUUID[object.uuid].type === ObjectType.RECTANGLE}
              <g
                class="object"
                on:click={e => onObjectClicked(e, $objectByUUID[object.uuid])}
              >
                <Rectangle
                  currentObject={$objectByUUID[object.uuid]}
                  previousObject={$previous[object.uuid]}
                />
              </g>
            {/if}
            {#if $objectByUUID[object.uuid].type === ObjectType.TEXTAREA}
              <g
                class="object"
                on:click={e => onObjectClicked(e, $objectByUUID[object.uuid])}
              >
                <Textarea
                  currentObject={$objectByUUID[object.uuid]}
                  previousObject={$previous[object.uuid]}
                />
              </g>
            {/if}
          {/each}
        {/if}
        <!-- {#if $selectedObject}
          <SelectedObject
            selected={$selectedObject}
            previous={$previousObjects[$selectedObject.uuid]}
            on:rect-mousedown={e => onSelectedObjectMouseDown(e)}
            on:vertex-mousedown={e => onSelectedObjectVertextMouseDown(e)}
          />
        {/if} -->
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

  .object {
    cursor: move;
  }

  .page {
    border: 1px solid gray;
    background: white;
  }
</style>
