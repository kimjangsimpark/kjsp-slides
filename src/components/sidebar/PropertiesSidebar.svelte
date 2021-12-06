<script type="ts">
  import CurrentQueueObjectActionList from './CurrentQueueObjectActionList.svelte';
  import CurrentQueueObjectEffectList from './CurrentQueueObjectEffectList.svelte';
  import CurrentQueueObjectBorder from './CurrentQueueObjectBorder.svelte';
  import { currentQueueObject$ } from '@/store/queueObject';

  $: selectedObject = currentQueueObject$;
</script>

<aside id="property-bar-root">
  <CurrentQueueObjectActionList />
  <CurrentQueueObjectEffectList />
  <button on:click={() => console.log($selectedObject)}>123123</button>
  {#if $selectedObject?.type === 'rectangle'}
    <CurrentQueueObjectBorder />
  {/if}
  <article class="fill-wrapper">fill</article>
</aside>

<style lang="scss">
  #property-bar-root {
    flex: 0 0 auto;
    width: 200px;
    border-left: 1px solid $gray-line-1;
  }
</style>
