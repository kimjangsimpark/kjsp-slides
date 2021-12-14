<script type="ts" context="module">
</script>

<script type="ts">
  import { onMount } from 'svelte';
  import { combineLatest, Subscription } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { onDestroy$ } from '@/misc/svelte-rx';
  import { objectReducer } from '@/store/object';
  import { currentQueue$ } from '@/store/queue';
  import { currentQueueObject$ } from '@/store/queueObject';

  $: selectedObject = currentQueueObject$;
  $: currentQueueObjectEffects = combineLatest([currentQueue$, currentQueueObject$]).pipe(
    map(([currentQueue, currentQueueObject]) => {
      if (currentQueueObject) {
        const queueIndex = currentQueue.index;
        return currentQueueObject?.effects.filter(effect => effect.index === queueIndex);
      } else {
        return null;
      }
    }),
  );

  let lineWidth = 1;
  let lineColor = '';
  let selectedObjectSubscription: Subscription;

  const handleDecreaseButtonClick = () => {
    lineWidth--;
    updateObjectLineWidth();
  };

  const handleIncreaseButtonClick = () => {
    lineWidth++;
    updateObjectLineWidth();
  };

  const handleLineWdithInputChange = () => {
    console.log('change!');
    updateObjectLineWidth();
  };

  const updateObjectLineWidth = () => {
    if (!$selectedObject) return;

    objectReducer({
      type: 'objectShapeUpdateAction',
      uuid: $selectedObject.uuid,
      shape: { ...$selectedObject.shape, lineWidth },
    });
  };

  const onColorPickerInput = () => {
    if (!$selectedObject) return;

    objectReducer({
      type: 'objectShapeUpdateAction',
      uuid: $selectedObject.uuid,
      shape: { ...$selectedObject.shape, lineColor },
    });
  };

  onMount(() => {
    console.log('ObjectControlPanel onMount');

    selectedObjectSubscription = selectedObject.subscribe({
      next: () => {
        if (!$selectedObject) return;

        console.log('setSelectedObjectShape');
        console.log($selectedObject?.shape.lineColor);

        lineWidth = $selectedObject?.shape.lineWidth;
        lineColor = $selectedObject?.shape.lineColor;
      },
    });
  });

  onDestroy$.subscribe({
    next: () => {
      selectedObjectSubscription.unsubscribe();
    },
  });
</script>

<aside id="object-control-panel-root">
  <section class="panel-section action-list-wrapper">
    <header><h2>Action list</h2></header>
    <ol class="list">
      {#if $selectedObject}
        {#each $selectedObject.effects as effect}
          <li class="list-item">
            #{Number(effect.index) + 1}
            {effect.type}
          </li>
        {/each}
      {/if}
    </ol>
  </section>

  <section class="panel-section effect-list-wrapper">
    <header>
      <h2>Effect List</h2>
      <button>+</button>
    </header>
    <ol class="list">
      {#if $currentQueueObjectEffects}
        {#each $currentQueueObjectEffects as effect}
          <li class="list-item">{effect.type}</li>
        {/each}
      {/if}
    </ol>
  </section>

  <button on:click={() => console.log($selectedObject)}>123123</button>
  <section class="panel-section line-wrapper">
    <header><h2>Line</h2></header>
    <div>
      <div class="line-width-input-wrapper">
        <button on:click={handleDecreaseButtonClick}>&nbsp;-&nbsp;</button>
        <input
          type="number"
          name="lineWidth"
          id="lineWidth"
          bind:value={lineWidth}
          on:input={handleLineWdithInputChange}
        />
        <button on:click={handleIncreaseButtonClick}>&nbsp;+&nbsp;</button>
      </div>
      <div class="line-color-input-wrapper">
        <label for="lineColorPicker">color</label>
        <input
          type="color"
          name="lineColorPicker"
          id="lineColorPicker"
          bind:value={lineColor}
          on:input={onColorPickerInput}
        />
      </div>
    </div>
    <ul>
      <li>
        <button>
          <div class="dotted" />
        </button>
      </li>
      <li>
        <button>
          <div class="dashed" />
        </button>
      </li>
      <li>
        <button>
          <div class="double" />
        </button>
      </li>
      <li>
        <button>
          <div class="solid" />
        </button>
      </li>
    </ul>
  </section>

  <section class="panel-section fill-wrapper">
    <header><h2>fill</h2></header>
  </section>
</aside>

<style lang="scss">
  #object-control-panel-root {
    flex: 0 0 auto;
    width: 200px;
    border-left: 1px solid $gray-line-1;

    .panel-section {
      padding: {
        top: 20px;
        bottom: 20px;
      }

      header {
        h2 {
          font-size: 1.125rem;
          text-align: center;
        }
      }

      ol.list {
        min-height: 150px;
        height: 150px;
        padding: 1rem;
        list-style: none;
        overflow-y: auto;
        box-shadow: inset -1px -5px 6px $gray-line-1;

        .list-item {
          padding: 0.4rem 0;
        }
      }

      // &.action-list-wrapper {
      // }

      &.effect-list-wrapper {
        header {
          position: relative;
          display: flex;
          justify-content: center;

          button {
            width: 30px;
            position: absolute;
            right: 0;
          }
        }
      }

      &.line-wrapper {
        ul {
          height: 100px;
          padding: 1rem;
          list-style: none;
          overflow-y: auto;
          box-shadow: inset -1px -5px 6px $gray-line-1;

          li {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 1.5rem;
            padding-bottom: 0.5rem;

            button {
              display: flex;
              align-items: center;
              width: 100%;
              height: 100%;
              border: none;
              background: none;

              &:hover {
                background: $gray-line-1;
              }

              div {
                width: 100%;

                &.dotted {
                  border-top: 1px #000000 dotted;
                }

                &.dashed {
                  border-top: 1px #000000 dashed;
                }

                &.double {
                  border-top: 1px #000000 double;
                }

                &.solid {
                  border-top: 1px #000000 solid;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
