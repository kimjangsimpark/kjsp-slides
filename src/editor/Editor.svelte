<script type="ts">
  import { map, pairwise, startWith } from 'rxjs/operators';
  import { useDispatch, useSelector } from '@/app/hooks';
  import { Document, documentSelector } from '@/document/document.store';
  import {
    DocumentObject,
    ObjectRect,
    objectsByUUIDSelector,
    objectsSlice,
    ObjectType,
    QueueObject,
  } from '@/document/object.store';
  import {
    currentQueueIndexSelector,
    CurrentQueueRangeObject,
    currentQueueRangeObjectsSelector,
  } from '@/document/queue.store';
  import type { Observable } from 'rxjs';
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
  const selectedObjects = useSelector(selectedObjectsSelector());
  const currentQueueIndex = useSelector(currentQueueIndexSelector());
  const rangeObjects = useSelector(currentQueueRangeObjectsSelector());

  const current = rangeObjects.pipe(
    map(ranges => ranges.find(range => range.current) as CurrentQueueRangeObject),
  );

  const currentMap = rangeObjects.pipe(
    map(ranges => ranges.find(range => range.current) as CurrentQueueRangeObject),
    map(current => {
      if (current) {
        return current.objects.reduce<{ [key: string]: QueueObject }>(
          (result, object) => Object.assign(result, { [object.uuid]: object }),
          {},
        );
      } else {
        return {};
      }
    }),
  );

  const previousMap = current.pipe(
    pairwise(),
    map(([previous, current]) => {
      if (previous) {
        return previous.objects.reduce<{ [key: string]: QueueObject }>(
          (result, object) => Object.assign(result, { [object.uuid]: object }),
          {},
        );
      } else {
        return {};
      }
    }),
  );

  const onEmptySpaceClicked = () => {
    dispatch(selectedObjectsSlice.actions.reset());
  };

  const onObjectClicked = (e: MouseEvent, obj: QueueObject) => {
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
        {#each $current.objects as object (object.uuid)}
          {#if object.type === ObjectType.RECTANGLE}
            <g class="object" on:click={e => onObjectClicked(e, object)}>
              <Rectangle
                currentObject={object}
                previousObject={$previousMap ? $previousMap[object.uuid] : null}
              />
            </g>
          {/if}
          {#if $objectByUUID[object.uuid].type === ObjectType.TEXTAREA}
            <g class="object" on:click={e => onObjectClicked(e, object)}>
              <Textarea
                currentObject={object}
                previousObject={$previousMap ? $previousMap[object.uuid] : null}
              />
            </g>
          {/if}
        {/each}
        {#if $selectedObjects && $selectedObjects.length}
          <SelectedObject
            selected={$selectedObjects[0]}
            previous={$previousMap ? $previousMap[$selectedObjects[0].uuid] : null}
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
