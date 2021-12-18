<script type="ts" context="module">
  export const ROOT_STORE_CONTEXT = 'root-store-context';
  export interface StoreProvider {}

  export const useSelector = () => {};
</script>

<script type="ts">
  import type { Store } from '@reduxjs/toolkit';
  import { setContext } from 'svelte';
  export let store: Store;
  setContext<Store>(ROOT_STORE_CONTEXT, store);
</script>

<slot />
