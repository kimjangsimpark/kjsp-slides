import { writable } from 'svelte/store';

export interface QueueAction {
  type: string;
}

export interface QueueObject {
  type: string;
}

export interface Queue {
  index: number;
  actions: QueueAction[];
  objects: QueueObject[];
}

export interface DocumentState {
  documentName: string;
  queues: Queue[];
}

export const document$ = writable<DocumentState>({
  documentName: 'Document Name',
  queues: [],
});
