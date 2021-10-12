<script type="ts">
  import CurrentQueueObjectActionList from './CurrentQueueObjectActionList.svelte';
  import CurrentQueueObjectEffectList from './CurrentQueueObjectEffectList.svelte';
  import { QueueObjectState, currentQueObject$ } from '@/store/queueObject';

  let currentQueueObject: QueueObjectState;
  currentQueObject$.subscribe(state => {
    currentQueueObject = state;
  });
</script>

<aside id="property-bar-root">
  <CurrentQueueObjectActionList {currentQueueObject} />
  <CurrentQueueObjectEffectList {currentQueueObject} />
  <article class="border-wrapper">border</article>
  <article class="fill-wrapper">fill</article>
</aside>

<style lang="scss">
  #property-bar-root {
    flex: 0 0 auto;
    width: 200px;
    border-left: 1px solid $gray-line-1;

    // & :global(article) {
    //   border-bottom: 1px solid $gray-line-2;
    // }
  }
</style>
