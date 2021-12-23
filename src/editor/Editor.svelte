<script type="ts" context="module">
  export const EDITOR_CONTEXT_KEY = 'editor-context-key';
  export interface EditorContext {
    svgElement: SVGElement;
  }
</script>

<script type="ts">
  import { distinctUntilChanged, map, pairwise } from 'rxjs/operators';
  import { useDispatch, useSelector } from '@/app/hooks';
  import { Document, documentSelector } from '@/store/document.store';
  import {
    ObjectRect,
    objectsByUUIDSelector,
    objectsSlice,
    Animatable,
  } from '@/store/object.store';
  import {
    currentQueueIndexSelector,
    CurrentQueueRangeObject,
    currentQueueRangeObjectsSelector,
  } from '@/store/queue.store';
  import type { Observable } from 'rxjs';
  import { selectedObjectsSelector, selectedObjectsSlice } from '@/store/selected.store';
  import { scaleSelector } from '@/store/scale.store';
  import DocumentObject from './objects/DocumentObject.svelte';
  import SelectedObject from './objects/Resizers.svelte';

  let svgElement: SVGElement;

  const dispatch = useDispatch();
  const doc = useSelector(documentSelector()) as Observable<Document>;
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

  const onEmptySpaceClicked = () => {
    dispatch(selectedObjectsSlice.actions.reset());
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
        on:mousedown={() => onEmptySpaceClicked()}
      >
        {#each $current.objects as object (object.uuid)}
          <DocumentObject
            object={$objectByUUID[object.uuid]}
            to={object}
            from={$previousMap ? $previousMap[object.uuid] : null}
          />
        {/each}
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
