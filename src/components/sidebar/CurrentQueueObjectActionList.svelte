<script lang="ts">
  import type { QueueObjectState } from '@/store/queueObject';

  export let currentQueueObject: QueueObjectState;

  $: currentQueueObjectActionList = currentQueueObject.actions;
</script>

<article class="action-list-wrapper">
  <header>Action list</header>
  <ol class="action-list">
    {#each currentQueueObjectActionList as action}
      <li class="action-list-item">#{action.index} {action.type}</li>
    {/each}
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
