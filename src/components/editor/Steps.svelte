<script lang="ts">
  // src/components/Portal.svelte
  import { onMount, onDestroy } from 'svelte';

  let ref;
  let portal;
  onMount(() => {
    portal = document.createElement('div');
    portal.className = 'portal';
    document.body.appendChild(portal);
    portal.appendChild(ref);
  });

  onDestroy(() => {
    document.body.removeChild(portal);
  });
</script>

<div bind:this={ref} class="portal-clone">
  <slot />
</div>

<style>
  .portal-clone {
    background-color: #4fbe9f;
    height: 100px;
    width: 100px;
    position: absolute;
  }
</style>
