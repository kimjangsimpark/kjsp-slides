import { objectsSlice } from '@/document/object.store';
import { selectedObjectsSlice } from '@/document/selected.store';
import { queueIndexSlice } from '@/document/queue.store';
import { configureStore } from '@reduxjs/toolkit';
import { documentSlice } from '../document/document.store';
import { scaleSlice } from '@/document/scale.store';

export const store = configureStore({
  reducer: {
    document: documentSlice.reducer,
    objects: objectsSlice.reducer,
    scale: scaleSlice.reducer,
    currentQueueIndex: queueIndexSlice.reducer,
    selectedObjects: selectedObjectsSlice.reducer,
  },
  middleware: [],
});

export type RootStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
