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

<div id="toolbar-container">
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
  #toolbar-container {
    box-shadow: 0 2px 6px 0 rgb(0 0 0 / 10%);
  }

  .toolbar-root {
    display: flex;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;

    .toolbar-item {
      cursor: pointer;
      .toolbar-item-title {
        margin: 10px;
        &:hover {
          opacity: 0.45;
        }
      }
      position: relative;
    }
  }
</style>
