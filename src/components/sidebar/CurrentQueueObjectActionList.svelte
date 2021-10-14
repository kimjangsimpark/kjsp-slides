<script lang="ts">
  import { currentQueueObject$ } from '@/store/queueObject';
  $: currentQueueObject = currentQueueObject$;
</script>

<article class="action-list-wrapper">
  <header>Action list</header>
  <ol class="action-list">
    {#if $currentQueueObject}
      {#each $currentQueueObject.effects as effect}
        <li class="action-list-item">#{effect.index} {effect.type}</li>
      {/each}
    {/if}
  </ol>
</article>

<style lang="scss">
  .action-list-wrapper {
    padding: {
      top: 20px;
      bottom: 20px;
    }

    header {
      text-align: center;
    }

    .action-list {
      min-height: 150px;
      height: 150px;
      padding: 1rem;
      list-style: none;
      overflow-y: auto;
      box-shadow: inset -1px -5px 6px $gray-line-1;

      .action-list-item {
        padding: 0.4rem 0;
      }
    }
  }
</style>
