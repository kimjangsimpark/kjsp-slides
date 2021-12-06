<script lang="ts">
  import { currentQueueObject$ } from '@/store/queueObject';
  import { objectReducer } from '@/store/object';
  import { onMount } from 'svelte';

  $: selectedObject = currentQueueObject$;

  let lineWidth = 1;

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

  onMount(() => {
    if (!$selectedObject) return;
    lineWidth = $selectedObject?.shape.lineWidth;
  });
</script>

<article>
  <header>Line</header>
  <div>
    <div>
      <label for="lineWidth" />
    </div>
    <div>
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
</article>

<style lang="scss" scoped>
  article {
    padding: {
      top: 20px;
      bottom: 20px;
    }

    header {
      text-align: center;
    }

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
</style>
