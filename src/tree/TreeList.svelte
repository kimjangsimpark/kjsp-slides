<script type="ts" context="module">
</script>

<script type="ts">
  import { getContext } from 'svelte';
  import { TreeGroupContext, TREE_GROUP_CONTEXT_KEY } from './TreeGroup.svelte';
  const groupContext = getContext<TreeGroupContext>(TREE_GROUP_CONTEXT_KEY);
</script>

{#if true}
  <div>.</div>
{/if}
