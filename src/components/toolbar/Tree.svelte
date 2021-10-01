<script type="ts">
  import type { TreeModel } from './TreeModel';
  export let models: TreeModel[];
  let clazz = '';
  export { clazz as class };
</script>

<ul class={clazz || ''}>
  {#if models && models.length}
    {#each models as model}
      <li>{model.title}</li>
      {#if model.children}
        <svelte:self models={model.children} />
      {/if}
    {/each}
  {/if}
</ul>

<style type="scss">
</style>
