<script type="ts">
  import type { RootState } from '@/app/store';
  import type { Store } from '@reduxjs/toolkit';
  import { setContext } from 'svelte';
  import { ROOT_STORE_CONTEXT } from '../app/hooks';
  export let store: Store<RootState>;
  setContext<Store<RootState>>(ROOT_STORE_CONTEXT, store);
</script>

<slot />
