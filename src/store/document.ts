import { writable } from 'svelte/store';

export interface DocumentState {
  documentName: string;
}

export const document$ = writable<DocumentState>({
  documentName: 'Document Name',
});
