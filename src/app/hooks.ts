import type { RootDispatch, RootState } from '@/app/store';
import type { AnyAction, Dispatch, Store } from '@reduxjs/toolkit';
import { Observable } from 'rxjs';
import { getContext } from 'svelte';

export const ROOT_STORE_CONTEXT = 'root-store-context';

export type SelectorFn<T> = (state: RootState) => T;

export function useDispatch(): RootDispatch {
  const store = getContext<Store>(ROOT_STORE_CONTEXT);
  return store.dispatch;
}

export function useStore(): Store<RootState> {
  const store = getContext<Store<RootState>>(ROOT_STORE_CONTEXT);
  return store;
}

export function useSelector<T>(selectorFn: SelectorFn<T>): Observable<T> {
  const store = getContext<Store<RootState>>(ROOT_STORE_CONTEXT);
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
