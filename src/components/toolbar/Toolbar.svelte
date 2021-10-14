<script type="ts">
  import { map } from 'rxjs/operators';
  import { document$ } from '@/store/document';

  import Tree from './Tree.svelte';
  import type { ToolbarModel } from './TreeModel';

  $: title = document$.pipe(map(document => document.documentName));

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

<div id="toolbar-root-container">
  <div id="icon-container">
    <svg
      id="icon"
      data-name="Layer 1"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="The Que Logo"
      role="img"
    >
      <title>The Que Logo</title>
      <defs
        ><style>
          .cls-1 {
            fill: #4fbe9f;
          }
          .cls-2 {
            fill: #09816c;
          }
        </style></defs
      ><title /><path
        class="cls-1"
        d="M51.38,45.67h0s-.23,3.44-3.37,3.44c-2.42,0-4.07-1.84-5.61-4.24l0,0c-1-1.78-3.55-5.68-3.55-5.68-1.61-2.29-3.53-4.24-6.28-4.86a13.3,13.3,0,0,0-9.54,1.59,1.17,1.17,0,0,0-.44,1.51l.33.68a1.21,1.21,0,0,0,1.29.76,9.07,9.07,0,0,1,3.6.24c2,.46,3.52,3.2,5.28,6.35a8.47,8.47,0,0,1-3.81.93c-6.53,0-11.83-7.82-11.83-17.46s5.3-17.46,11.83-17.46,11.82,7.81,11.82,17.46a25.7,25.7,0,0,1-.34,4.17,3.74,3.74,0,0,0,1,3.23,28.69,28.69,0,0,1,3.06,3.81.92.92,0,0,0,1.54,0,21.3,21.3,0,0,0,3.15-11.18C49.58,17.36,40.5,8,29.3,8S9,17.36,9,28.91,18.1,49.82,29.3,49.82a19.6,19.6,0,0,0,5.85-.89c2.34,3.72,5.31,7.07,10,7.07C54.59,56,55,45.67,55,45.67Z"
      /><path
        class="cls-2"
        d="M33.11,45.44a8.47,8.47,0,0,1-3.81.93c-3.24,0-6.17-1.92-8.3-5A1.87,1.87,0,0,0,18.17,41c-2,1.83-.32,4.36,2.4,6.76a19.58,19.58,0,0,0,14.58,1.17Z"
      /><path class="cls-2" d="M32.52,44.4h0l0,0Z" /><path
        class="cls-2"
        d="M36,50.26v0Z"
      /></svg
    >
  </div>
  <div id="toolbar-container">
    <div id="title-container">
      <span id="title">{$title || ''}</span>
    </div>
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
</div>

<style type="scss">
  #toolbar-root-container {
    display: flex;
    border-bottom: 1px solid rgb(0 0 0 / 10%);

    #icon-container {
      display: flex;
      justify-content: center;
      align-items: center;
      #icon {
        width: 40px;
        height: 40px;
        margin-left: 10px;
      }
    }

    #toolbar-container {
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;

      #title-container {
        padding-top: 10px;
        padding-left: 10px;
      }
    }
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
