<script type="ts" context="module">
  export const EDITOR_CONTEXT_KEY = 'editor-context-key';
  export interface EditorContext {
    svgElement: SVGElement;
  }
</script>

<script type="ts">
  import {
    distinctUntilChanged,
    filter,
    map,
    pairwise,
    takeUntil,
    tap,
  } from 'rxjs/operators';
  import { useDispatch, useSelector } from '@/app/hooks';
  import { Document, documentSelector } from '@/store/document.store';
  import { objectsByUUIDSelector, Animatable } from '@/store/object.store';
  import {
    currentQueueIndexSelector,
    CurrentQueueRangeObject,
    currentQueueRangeObjectsSelector,
  } from '@/store/queue.store';
  import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
  import { selectedObjectsSlice } from '@/store/selected.store';
  import { scaleSelector } from '@/store/scale.store';
  import DocumentObject from './objects/DocumentObject.svelte';

  let svgElement: SVGElement;

  const dispatch = useDispatch();
  const doc = useSelector(documentSelector()) as Observable<Document>;
  const scale = useSelector(scaleSelector());
  const objectByUUID = useSelector(objectsByUUIDSelector());
  const currentQueueIndex = useSelector(currentQueueIndexSelector());
  const rangeObjects = useSelector(currentQueueRangeObjectsSelector());
  const selectionRange = new BehaviorSubject<any>(null);

  const current = rangeObjects.pipe(
    map(ranges => ranges.find(range => range.current) as CurrentQueueRangeObject),
  );

  const currentMap = rangeObjects.pipe(
    map(ranges => ranges.find(range => range.current) as CurrentQueueRangeObject),
    map(current => {
      if (current) {
        return current.objects.reduce<{ [key: string]: Animatable }>(
          (result, object) => Object.assign(result, { [object.uuid]: object }),
          {},
        );
      } else {
        return {};
      }
    }),
  );

  const previousMap = currentMap.pipe(
    pairwise(),
    map(([previous]) => previous || {}),
  );

  currentQueueIndex.pipe(distinctUntilChanged(), pairwise()).subscribe({
    next: ([previousIndex, currentIndex]) => {
      const diff =
        previousIndex > currentIndex
          ? previousIndex - currentIndex
          : currentIndex - previousIndex;
      if (diff === 1 && svgElement) {
        const animators =
          svgElement.querySelectorAll<SVGAnimateElement>('.queue-animator');
        animators.forEach(animator => animator.beginElement());
      }
    },
  });

  const onEmptySpaceClicked = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    dispatch(selectedObjectsSlice.actions.reset());
    const startOffsetX = e.offsetX;
    const startOffsetY = e.offsetY;
    const startClientX = e.clientX;
    const startClientY = e.clientY;
    fromEvent<MouseEvent>(document.body, 'mousemove')
      .pipe(
        takeUntil(
          fromEvent<MouseEvent>(document.body, 'mouseup').pipe(
            tap(() => {
              const range = selectionRange.getValue();
              if (!range) {
                return;
              }

              const selections = $current.objects.map(object => {
                return (
                  object.shape.x > range.x &&
                  object.shape.x + object.shape.width < range.x + range.width
                );
              });

              selectionRange.next(null);
            }),
          ),
        ),
      )
      .subscribe({
        next: e => {
          const movedX = (e.clientX - startClientX) * (1 / $scale);
          const movedY = (e.clientY - startClientY) * (1 / $scale);
          const startX = movedX >= 0 ? startOffsetX : startOffsetX + movedX;
          const startY = movedY >= 0 ? startOffsetY : startOffsetY + movedY;
          const width = Math.abs(movedX);
          const height = Math.abs(movedY);
          selectionRange.next({
            x: startX,
            y: startY,
            width: width,
            height: height,
          });
        },
      });
  };
</script>

<div id="editor">
  <div id="scaler" style="transform: scale({$scale});">
    <div id="frame">
      <svg
        bind:this={svgElement}
        id="svg"
        class="page"
        style="width: {$doc.rect.width}px; height: {$doc.rect.height}px;"
        on:mousedown={e => onEmptySpaceClicked(e)}
      >
        {#each $current.objects as object (object.uuid)}
          <DocumentObject
            object={$objectByUUID[object.uuid]}
            to={object}
            from={$previousMap ? $previousMap[object.uuid] : null}
          />
        {/each}

        {#if $selectionRange}
          <g class="range-selector">
            <rect
              x={$selectionRange.x}
              y={$selectionRange.y}
              width={$selectionRange.width}
              height={$selectionRange.height}
              stroke="black"
              stroke-width="1"
              fill="transparent"
            />
          </g>
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
