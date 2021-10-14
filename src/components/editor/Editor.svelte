<script type="ts">
  import { combineLatest } from 'rxjs';
  import { filter, map } from 'rxjs/operators';
  import { document$, QueueObject, QueueTransitionEffect } from '@/store/document';
  import { currentQueue$ } from '@/store/queue';
  import { currentQueueObject$, currentQueueObjectReducer } from '@/store/queueObject';

  $: document = document$;
  $: objects = currentQueue$.pipe(
    map(currentQueue => {
      const newState = { ...currentQueue };

      newState.objects = currentQueue.objects.map(object => {
        const immutable = { ...object };
        const index = currentQueue.index;
        const reversedEffects = object.effects.slice(0).reverse();

        const lastTransition = reversedEffects.find(
          effect => effect.index < index && effect.type === 'transition',
        ) as QueueTransitionEffect;
        const currentTransition = reversedEffects.find(
          effect => effect.index === index && effect.type === 'transition',
        ) as QueueTransitionEffect;

        immutable.shape = {
          ...object.shape,
          x: currentTransition?.x || lastTransition?.x || object.shape.x,
          y: currentTransition?.y || lastTransition?.y || object.shape.y,
          width: currentTransition?.width || lastTransition?.width || object.shape.width,
          height:
            currentTransition?.height || lastTransition?.height || object.shape.height,
        };

        return immutable;
      });
      console.log(newState.objects);
      return newState;
    }),
    map(currentQueue => currentQueue.objects),
  );

  $: currentQueueObject = combineLatest([currentQueue$, currentQueueObject$]).pipe(
    map(([currentQueue, object]) => {
      if (!object) {
        return null;
      }

      const immutable = { ...object };
      const index = currentQueue.index;
      const reversedEffects = object.effects.slice(0).reverse();

      const lastTransition = reversedEffects.find(
        effect => effect.index < index && effect.type === 'transition',
      ) as QueueTransitionEffect;
      const currentTransition = reversedEffects.find(
        effect => effect.index === index && effect.type === 'transition',
      ) as QueueTransitionEffect;

      immutable.shape = {
        ...object.shape,
        x: currentTransition?.x || lastTransition?.x || object.shape.x,
        y: currentTransition?.y || lastTransition?.y || object.shape.y,
        width: currentTransition?.width || lastTransition?.width || object.shape.width,
        height:
          currentTransition?.height || lastTransition?.height || object.shape.height,
      };

      return immutable;
    }),
  );

  let scale = 0.6;

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
</script>

<div id="editor">
  <div id="scaler" style="transform: scale({scale});">
    <div id="frame">
      <svg
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
                />
              </g>
            {/if}
          {/each}
        {/if}
        {#if $currentQueueObject}
          <g>
            <rect
              stroke="red"
              stroke-width="2"
              fill="none"
              x={$currentQueueObject.shape.x - 5}
              y={$currentQueueObject.shape.y - 5}
              width={$currentQueueObject.shape.width + 10}
              height={$currentQueueObject.shape.height + 10}
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
