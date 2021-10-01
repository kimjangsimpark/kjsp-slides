<script type="ts" context="module">
  import Tree from './Tree.svelte';
  import type { TreeModel } from './TreeModel';

  const items: TreeModel[] = [
    {
      title: 'File',
      children: [
        {
          title: 'Hello World',
        },
      ],
    },
    {
      title: 'Edit',
    },
    {
      title: 'View',
    },
  ];
</script>

<div class="toolbar-root">
  <ul>
    {#each items as item}
      <Tree class="tree" model={item} />
    {/each}
  </ul>
  toolbar
</div>

<style type="scss">
  .toolbar-root {
  }
</style>
