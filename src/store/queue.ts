import { writable } from 'svelte/store';

export interface Queue {
  index: number;
}

export interface QueueState {
  currentQueueIndex: number;
  queues: Queue[];
}

export const queue$ = writable<QueueState>({
  currentQueueIndex: 0,
  queues: [],
});

