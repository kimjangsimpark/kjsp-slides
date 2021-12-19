import type { SelectorFn } from '@/app/hooks';
import type { RootDispatch, RootState } from '@/app/store';
import { DocumentObject, documentSlice } from '@/document/document.store';
import { AnyAction, createSlice, Middleware, MiddlewareAPI, PayloadAction } from '@reduxjs/toolkit';

export interface CurrentQueueState {
  index: number;
  objects: DocumentObject[];
}

export type CurrentQueueStateType = CurrentQueueState | null;

export function queueSelector(): SelectorFn<CurrentQueueStateType> {
  return state => state.queue;
}

export const queueMiddleware: Middleware = (api: MiddlewareAPI<RootDispatch, RootState>) => next => (action: AnyAction) => {
  if (action.type === documentSlice.actions.setDocument.type) {
    const state = api.getState();
    if (state.document) {
      next(queueSlice.actions.setCurrentQueue({
        index: 0,
        objects: [],
      }));
    } else {
      next(queueSlice.actions.setCurrentQueue(null));
    }
  }
  next(action);
};

export const queueSlice = createSlice({
  initialState: null as CurrentQueueStateType,
  name: 'queue',
  reducers: {
    setCurrentQueue: (state, params: PayloadAction<CurrentQueueStateType>) => {
      return params.payload;
    },
  },
});
