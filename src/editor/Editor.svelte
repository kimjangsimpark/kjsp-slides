<script type="ts">
  import { map } from 'rxjs/operators';
  import { useDispatch, useSelector } from '@/app/hooks';
  import { Document, documentSelector } from '@/document/document.store';
  import {
    DocumentObject,
    ObjectRect,
    objectsByQueueIndexSelector,
    objectsByUUIDSelector,
    objectsSlice,
    ObjectType,
    QueueObject,
  } from '@/document/object.store';
  import { currentQueueIndexSelector } from '@/document/queue.store';
  import { combineLatest, Observable } from 'rxjs';
  import {
    selectedObjectsSelector,
    selectedObjectsSlice,
  } from '@/document/selected.store';
  import Rectangle from './objects/Rectangle.svelte';
  import Textarea from './objects/Textarea.svelte';
  import SelectedObject from './SelectedObject.svelte';
  import { scaleSelector } from '@/document/scale.store';

  let svgElement: SVGElement;

  const dispatch = useDispatch();
  const document = useSelector(documentSelector()) as Observable<Document>;
  const scale = useSelector(scaleSelector());
  const objectByUUID = useSelector(objectsByUUIDSelector());
  const objectsByQueueIndex = useSelector(objectsByQueueIndexSelector());
  const selectedObjects = useSelector(selectedObjectsSelector());
  const currentQueueIndex = useSelector(currentQueueIndexSelector());

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

  const onEmptySpaceClicked = () => {
    dispatch(selectedObjectsSlice.actions.reset());
  };

  const onObjectClicked = (e: MouseEvent, obj: DocumentObject) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(selectedObjectsSlice.actions.set([obj.uuid]));
  };

  const onSelectedObjectMouseDown = (customEvent: CustomEvent<{ event: MouseEvent }>) => {
    const e = customEvent.detail.event;
    if (!$selectedObjects.length) return;
    const object = { ...$selectedObjects[0] };
    const positionX = e.offsetX;
    const positionY = e.offsetY;
    const capture = object.shape;

    const onSelectedObjectMouseMove = (e: MouseEvent) => {
      const diffX = e.offsetX - positionX;
      const diffY = e.offsetY - positionY;
      const shape = {
        x: capture.x + diffX,
        y: capture.y + diffY,
        width: capture.width,
        height: capture.height,
      };
      dispatch(
        objectsSlice.actions.updateTransitionOfObject({
          index: $currentQueueIndex,
          uuid: object.uuid,
          rect: shape,
        }),
      );
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
    const position = e.detail.position;
    const object = $selectedObjects[0];
    const positionX = e.detail.event.offsetX;
    const positionY = e.detail.event.offsetY;
    const capture = {
      x: object.shape.x,
      y: object.shape.y,
      width: object.shape.width,
      height: object.shape.height,
    };
    let shape: ObjectRect;

    const onMouseMove = (e: MouseEvent) => {
      const diffX = e.offsetX - positionX;
      const diffY = e.offsetY - positionY;
      switch (position) {
        case 'top-left':
          shape = {
            x: capture.x + diffX,
            y: capture.y + diffY,
            width: capture.width + -diffX,
            height: capture.height + -diffY,
          };
          break;
        case 'top-middle':
          shape = {
            x: capture.x,
            y: capture.y + diffY,
            width: capture.width,
            height: capture.height + -diffY,
          };
          break;
        case 'top-right':
          shape = {
            x: capture.x,
            y: capture.y + diffY,
            width: capture.width + diffX,
            height: capture.height + -diffY,
          };
          break;
        case 'middle-right':
          shape = {
            x: capture.x,
            y: capture.y,
            width: capture.width + diffX,
            height: capture.height,
          };
          break;
        case 'bottom-right':
          shape = {
            x: capture.x,
            y: capture.y,
            width: capture.width + diffX,
            height: capture.height + diffY,
          };
          break;
        case 'bottom-middle':
          shape = {
            x: capture.x,
            y: capture.y,
            width: capture.width,
            height: capture.height + diffY,
          };
          break;
        case 'bottom-left':
          shape = {
            x: capture.x + diffX,
            y: capture.y,
            width: capture.width + -diffX,
            height: capture.height + diffY,
          };
          break;
        case 'middle-left':
          shape = {
            x: capture.x + diffX,
            y: capture.y,
            width: capture.width + -diffX,
            height: capture.height,
          };
          break;
      }
      dispatch(
        objectsSlice.actions.updateTransitionOfObject({
          index: $currentQueueIndex,
          uuid: object.uuid,
          rect: shape,
        }),
      );
    };

    const onMouseUp = (e: MouseEvent) => {
      svgElement.removeEventListener('mousemove', onMouseMove);
      svgElement.removeEventListener('mouseup', onMouseUp);
    };

    svgElement.addEventListener('mousemove', onMouseMove);
    svgElement.addEventListener('mouseup', onMouseUp);
  };

  const executeQueueAnimation = () => {
    const animators = svgElement.querySelectorAll<SVGAnimateElement>('.queue-animator');
    animators.forEach(animator => animator.beginElement());
  };
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
        {#if $selectedObjects && $selectedObjects.length}
          <SelectedObject
            selected={$selectedObjects[0]}
            previous={$previous[$selectedObjects[0].uuid]}
            on:rect-mousedown={e => onSelectedObjectMouseDown(e)}
            on:vertex-mousedown={e => onSelectedObjectVertextMouseDown(e)}
          />
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

  .object {
    cursor: move;
  }

  .page {
    border: 1px solid gray;
    background: white;
  }
</style>
