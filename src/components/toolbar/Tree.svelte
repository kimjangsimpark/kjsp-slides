<script type="ts">
  import type { TreeModel } from './TreeModel';
  export let model: TreeModel;
  let clazz = '';
  export { clazz as class };
</script>

<li class={clazz || ''}>
  {model.title}
  <ul>
    {#if model.children}
      {#each model.children as item}
        <svelte:self model={item} />
      {/each}
    {/if}
  </ul>
</li>

<style type="scss">
</style>
