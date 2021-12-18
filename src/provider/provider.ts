import type { AnyAction, Dispatch, Store } from '@reduxjs/toolkit';
import { Observable } from 'rxjs';
import { getContext } from 'svelte';

export const ROOT_STORE_CONTEXT = 'root-store-context';

export type SelectorFn<T> = (state: any) => T;

export function useDispatch(): Dispatch<AnyAction> {
  const store = getContext<Store>(ROOT_STORE_CONTEXT);
  return store.dispatch;
}

export function useStore(): Store {
  const store = getContext<Store>(ROOT_STORE_CONTEXT);
  return store;
}

export function useSelector<T>(selectorFn: SelectorFn<T>): Observable<T> {
  const store = getContext<Store>(ROOT_STORE_CONTEXT);
  return new Observable<T>(context => {
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