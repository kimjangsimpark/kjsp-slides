import { Readable, writable } from 'svelte/store';

export type ReducerFn<S, A> = (state: S, action: A) => S;
export type DispatchFn<A> = (action: A) => void;

export function reducible<S, A>(
  state: S,
  reducer: ReducerFn<S, A>,
): [Readable<S>, DispatchFn<A>] {
	const { update, subscribe } = writable<S>(state);
	
	function dispatch(action: A): void {
		update(state => reducer(state, action));
	}
	
	return [{	subscribe }, dispatch];
}