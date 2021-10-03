<script type="ts">
  import type { TreeModel } from './TreeModel';
  export let models: TreeModel[];
  let clazz = '';
  export { clazz as class };
  export let parent: HTMLLIElement | null;

  let active: TreeModel;
  let element: HTMLLIElement;

  const onMouseOver = (model: TreeModel) => {
    active = model;
  };
  const onMouseLeave = (model: TreeModel) => {
    console.log('mouse leave');
    active = model;
  };
</script>

<ul
  class="tree {clazz || ''}"
  style={parent ? `top: 0; left: ${parent.clientWidth}px` : ''}
>
  {#if models && models.length}
    {#each models as model}
      <li
        class="tree-item"
        bind:this={element}
        on:mouseover={() => onMouseOver(model)}
        on:focus={() => onMouseOver(model)}
        on:mouseleave={() => onMouseLeave(model)}
      >
        {model.title}
        {#if model.children && active === model}
          <svelte:self models={model.children} parent={element} />
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
