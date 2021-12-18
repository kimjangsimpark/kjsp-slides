<script type="ts">
  import { counterSlice } from '@/store';
  import type { Store } from '@reduxjs/toolkit';
  import { setContext } from 'svelte';
  import { ROOT_STORE_CONTEXT } from './provider';
  export let store: Store;
  setContext<Store>(ROOT_STORE_CONTEXT, store);

  store.dispatch(counterSlice.actions.increment());
</script>

<slot />
