<script type="ts">
  import type { TreeModel } from './TreeModel';
  export let models: TreeModel[];
  let clazz = '';
  export { clazz as class };

  const onMouseOver = () => {
    console.log('focus');
  };
  const onMouseLeave = () => {
    console.log('out');
  };
</script>

<ul class="tree {clazz || ''}">
  {#if models && models.length}
    {#each models as model}
      <li
        class="tree-item"
        on:mouseover={onMouseOver}
        on:focus={onMouseOver}
        on:mouseleave={onMouseLeave}
      >
        {model.title}
        {#if model.children}
          <svelte:self models={model.children} />
        {/if}
      </li>
    {/each}
  {/if}
</ul>

<style type="scss">
  .tree {
    position: absolute;

    .tree-item {
      position: relative;
    }
  }
</style>
