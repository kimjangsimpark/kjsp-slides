
import { defer, Subject, takeUntil } from 'rxjs';
import { params } from 'svelte-spa-router';
import { onDestroy$ } from './svelte-rx';

export const params$ = defer(() => {
	const subject = new Subject<any>();
	params.subscribe((p) => {
		subject.next(p)
	})
	return subject.asObservable().pipe(takeUntil(onDestroy$));
});

