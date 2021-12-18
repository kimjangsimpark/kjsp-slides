<script type="ts">
  import type { Store } from '@reduxjs/toolkit';
  import { setContext } from 'svelte';
  import { ROOT_STORE_CONTEXT } from './provider';
  export let store: Store;
  setContext<Store>(ROOT_STORE_CONTEXT, store);
</script>

<slot />
