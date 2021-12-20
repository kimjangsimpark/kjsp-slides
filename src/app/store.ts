import { objectsSlice } from '@/store/object.store';
import { selectedObjectsSlice } from '@/store/selected.store';
import { queueIndexSlice } from '@/store/queue.store';
import { configureStore } from '@reduxjs/toolkit';
import { documentSlice } from '@/store/document.store';
import { scaleSlice } from '@/store/scale.store';

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
