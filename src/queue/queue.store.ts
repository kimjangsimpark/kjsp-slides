import type { SelectorFn } from '@/app/hooks';
import type { RootDispatch, RootState } from '@/app/store';
import { DocumentObject, documentSlice } from '@/document/document.store';
import { AnyAction, createSlice, Middleware, MiddlewareAPI, PayloadAction } from '@reduxjs/toolkit';

export function queueSelector(): SelectorFn<number> {
  return state => state.queue;
}

export const queueMiddleware: Middleware = (api: MiddlewareAPI<RootDispatch, RootState>) => next => (action: AnyAction) => {
  if (action.type === documentSlice.actions.setDocument.type) {
    // next(queueSlice.actions.setCurrentQueue(0));
  }
  next(action);
};

export const queueSlice = createSlice({
  initialState: 0,
  name: 'queue',
  reducers: {
    setCurrentQueue: (state, params: PayloadAction<number>) => {
      return params.payload;
    },
  },
});
