<script type="ts" context="module">
  export const EDITOR_CONTEXT_KEY = 'editor-context-key';
  export interface EditorContext {
    onObjectClicked: (e: MouseEvent, obj: DocumentObject) => void;
  }
</script>

<script type="ts">
  import { map, pairwise, startWith, tap } from 'rxjs/operators';
  import { afterUpdate$, onDestroy$ } from '@/misc/svelte-rx';
  import { currentQueue$ } from '@/store/queue';
  import { currentQueueObject$ } from '@/store/queueObject';
  import { currentQueueObjectReducer } from '@/store/queueObject';
  import SelectedObject from './SelectedObject.svelte';
  import { scale$ } from '@/store/scale';
  import { DocumentObject, ObjectType } from '@/http/document';
  import { objectReducer } from '@/store/object';
  import { setContext } from 'svelte';
  import Rectangle from './objects/rectangle.svelte';
  import Textarea from './objects/Textarea.svelte';
  import { useSelector } from '@/provider/provider';
  import { documentSelector } from '@/document/document.store';

  let svgElement: SVGElement;
  let queueChanged = false;

  const queue$ = currentQueue$.pipe(startWith(null), pairwise());

  interface PreviousQueue {
    [key: string]: DocumentObject;
  }

  setContext<EditorContext>(EDITOR_CONTEXT_KEY, {
    onObjectClicked: (e: MouseEvent, obj: DocumentObject) => {
      e.preventDefault();
      e.stopPropagation();
      currentQueueObjectReducer({
        type: 'changeCurrentQueueObject',
        state: obj,
      });
    },
  });

  $: selectedObject = currentQueueObject$;
  $: document = useSelector(documentSelector());
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
    map(([, currentQueue]) => currentQueue?.objects),
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
              {#if object.type === ObjectType.RECTANGLE}
                <g class="object" on:click={e => onObjectClicked(e, object)}>
                  <Rectangle
                    currentObject={object}
                    previousObject={$previousObjects[object.uuid]}
                  />
                </g>
              {/if}
              {#if object.type === ObjectType.TEXTAREA}
                <g class="object" on:click={e => onObjectClicked(e, object)}>
                  <Textarea
                    currentObject={object}
                    previousObject={$previousObjects[object.uuid]}
                  />
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
</style>
