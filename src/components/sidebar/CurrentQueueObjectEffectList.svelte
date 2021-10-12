<script lang="ts">
  import type { QueueObjectState } from '@/store/queueObject';

  export let currentQueueObject: QueueObjectState;

  $: currentQueueObjectEffectList = currentQueueObject.effect;
</script>

<article class="effect-list-wrapper">
  <header>
    <h2>Effect List</h2>
    <button>+</button>
  </header>
  <ol class="effect-list">
    {#each currentQueueObjectEffectList as action}
      <li class="effect-list-item">{action.type}</li>
    {/each}
  </ol>
</article>

<style lang="scss" scoped>
  .effect-list-wrapper {
    padding: {
      top: 20px;
      bottom: 20px;
    }

    header {
      position: relative;
      display: flex;
      justify-content: center;

      h2 {
        text-align: center;
        font: {
          size: 1rem;
          weight: normal;
        }
      }

      button {
        width: 30px;
        position: absolute;
        right: 0;
      }
    }

    .effect-list {
      min-height: 150px;
      height: 150px;
      padding: 1rem;
      list-style: none;
      overflow-y: auto;
      box-shadow: inset -1px -5px 6px $gray-line-1;

      .effect-list-item {
        padding: 0.4rem 0;
      }
    }
  }
</style>
