<script type="ts" context="module">
  export const ROOT_STORE_CONTEXT = 'root-store-context';
  export interface StoreProvider {}

  export function useDispatch(): Dispatch<AnyAction> {
    const store = getContext<Store>(ROOT_STORE_CONTEXT);
    return store.dispatch;
  }

  export function useSelector(selectorFn: (state: any) => any): Observable<any> {
    const store = getContext<Store>(ROOT_STORE_CONTEXT);
    return new Observable(context => {
      const state = store.getState();
      const selected = selectorFn(state);
      context.next(selected);
      store.subscribe(() => {
        const state = store.getState();
        const selected = selectorFn(state);
        context.next(selected);
      });
    });
  }
</script>

<script type="ts">
  import { counterSlice } from '@/store';
  import type { AnyAction, Dispatch, Store } from '@reduxjs/toolkit';
  import { defer, Observable } from 'rxjs';
  import { getContext, setContext } from 'svelte';
  export let store: Store;
  setContext<Store>(ROOT_STORE_CONTEXT, store);

  store.dispatch(counterSlice.actions.increment());
</script>

<slot />
