<script type="ts" context="module">
  import Tree from './Tree.svelte';
  import type { ToolbarModel, TreeModel } from './TreeModel';

  let currentActive: ToolbarModel | null = null;
  const items: ToolbarModel[] = [
    {
      title: 'File',
      children: [],
    },
    {
      title: 'Edit',
      children: [],
    },
    {
      title: 'View',
      children: [],
    },
  ];

  const onToolbarClick = (e: MouseEvent, item: ToolbarModel) => {
    currentActive = item;
  };
</script>

<div>
  <div class="toolbar-root">
    {#each items as item}
      <div
        class="toolbar-item"
        class:active={currentActive === item}
        on:click={e => onToolbarClick(e, item)}
      >
        {item.title}
        {#if currentActive === item}
          <Tree models={item.children} />
        {/if}
      </div>
    {/each}
  </div>
</div>

<style type="scss">
  .toolbar-root {
    display: flex;

    .toolbar-item {
      &:hover {
        opacity: 0.45;
      }
      &:active {
        background-color: yellow;
      }
      padding: 5px;
    }
  }
</style>
