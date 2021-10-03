<script type="ts">
  import type { TreeModel } from './TreeModel';

  let clazz = '';
  export let models: TreeModel[];
  export let parent: HTMLElement | null;
  export { clazz as class };

  let active: TreeModel;
  let element: HTMLUListElement;

  const onMouseOver = (model: TreeModel) => {
    active = model;
  };
  const onMouseLeave = (model: TreeModel) => {
    active = model;
  };
  const onClick = (model: TreeModel, event: MouseEvent) => {
    if (model.onClick) {
      model.onClick(event);
    }
  };
</script>

<ul
  bind:this={element}
  class="tree {clazz || ''}"
  style={parent ? `top: ${-5}px; left: ${parent.clientWidth - 10}px` : ''}
>
  {#if models && models.length}
    {#each models as model}
      <li
        class="tree-item"
        on:mouseover={() => onMouseOver(model)}
        on:focus={() => onMouseOver(model)}
        on:mouseleave={() => onMouseLeave(model)}
        on:click={e => onClick(model, e)}
      >
        <div class="tree-item-title">
          {model.title}
        </div>
        <div class="tree-item-caret">
          {model.children ? '>' : ''}
        </div>
        {#if model.children && active === model}
          <svelte:self models={model.children} parent={element} />
        {/if}
      </li>
    {/each}
  {/if}
</ul>

<style type="scss">
  .tree {
    box-shadow: 0 2px 6px 2px rgb(60 64 67 / 15%);
    border-radius: 3px;
    background-color: white;
    position: absolute;
    min-width: 100px;
    max-width: 200px;
    padding: 5px;

    .tree-item {
      display: flex;
      justify-content: space-between;
      position: relative;

      -moz-user-select: -moz-none;
      -khtml-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;

      &:not(:first-child) {
        margin-top: 10px;
      }

      .tree-item-title {
        flex: 1 1 auto;
        &:hover {
          opacity: 0.5;
        }
      }

      .tree-item-caret {
        width: 10px;
      }
    }
  }
</style>
