<script type="ts">
  import type { QueueObject } from '@/store/document';
  import { currentQueObject$ } from '@/store/queueObject';
  import CurrentQueueObjectActionList from './CurrentQueueObjectActionList.svelte';
  import CurrentQueueObjectEffectList from './CurrentQueueObjectEffectList.svelte';

  let currentQueueObject: QueueObject | null;
  currentQueObject$.subscribe(state => {
    currentQueueObject = state;
  });
</script>

<aside id="property-bar-root">
  <CurrentQueueObjectActionList {currentQueueObject} />
  <CurrentQueueObjectEffectList />
  <article class="border-wrapper">border</article>
  <article class="fill-wrapper">fill</article>
</aside>

<style lang="scss">
  #property-bar-root {
    flex: 0 0 auto;
    width: 200px;
    border-left: 1px solid $gray-line-1;
  }
</style>
