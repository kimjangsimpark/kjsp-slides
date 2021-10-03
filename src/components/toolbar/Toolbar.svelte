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
          children: [
            {
              title: 'item',
            },
            {
              title: 'item',
              children: [
                {
                  title: 'item',
                },
                {
                  title: 'item',
                },
              ],
            },
          ],
        },
        {
          title: 'item',
          children: [
            {
              title: 'item',
            },
            {
              title: 'item',
            },
            {
              title: 'item',
              children: [
                {
                  title: 'item',
                },
                {
                  title: 'item',
                },
              ],
            },
          ],
        },
        {
          title: 'item',
          children: [
            {
              title: 'item',
            },
            {
              title: 'item',
            },
            {
              title: 'item',
              children: [
                {
                  title: 'item',
                },
                {
                  title: 'item',
                },
                {
                  title: 'item',
                },
              ],
            },
          ],
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
        <div class="toolbar-item-title">
          {item.title}
        </div>
        {#if currentActive === index && item.children}
          <Tree models={item.children} parent={null} />
        {/if}
      </div>
    {/each}
  </div>
</div>

<style type="scss">
  .toolbar-root {
    display: flex;

    .toolbar-item {
      .toolbar-item-title:hover {
        opacity: 0.45;
      }
      .toolbar-item-title:active {
        background-color: yellow;
      }
      position: relative;
    }
  }
</style>
