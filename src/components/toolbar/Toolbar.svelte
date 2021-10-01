<script type="ts" context="module">
  import Tree from './Tree.svelte';
  import type { ToolbarModel, TreeModel } from './TreeModel';

  let currentActive: number | undefined;
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

  const onToolbarClick = (e: MouseEvent, item: ToolbarModel, index: number) => {
    currentActive = index;
    console.log(currentActive);
  };
</script>

<div>
  <div class="toolbar-root">
    {#each items as item, index}
      <div
        class="toolbar-item"
        class:active={currentActive === index}
        on:click={e => onToolbarClick(e, item, index)}
      >
        {item.title}
        {#if currentActive === index}
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
