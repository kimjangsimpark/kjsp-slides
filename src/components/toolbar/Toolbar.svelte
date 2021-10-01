<script type="ts">
  import Tree from './Tree.svelte';
  import type { ToolbarModel } from './TreeModel';

  let currentActive: number | undefined;
  const items: ToolbarModel[] = [
    {
      title: 'File',
      children: [
        {
          title: 'item',
        },
      ],
    },
    {
      title: 'Edit',
      children: [
        {
          title: 'item',
        },
      ],
    },
    {
      title: 'View',
      children: [
        {
          title: 'item',
        },
      ],
    },
  ];

  const onToolbarClick = (index: number) => {
    if (currentActive === index) {
      currentActive = undefined;
    } else {
      currentActive = index;
    }
  };
</script>

<div>
  <div class="toolbar-root">
    {#each items as item, index}
      <div
        class="toolbar-item"
        class:active={currentActive === index}
        on:click={() => onToolbarClick(index)}
      >
        {item.title}
        {#if currentActive === index && item.children}
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
      position: relative;
      padding: 5px;
    }
  }
</style>
