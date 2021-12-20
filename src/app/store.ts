import { objectsSlice } from '@/document/object.store';
import { selectedObjectsSlice } from '@/document/selected.store';
import { queueIndexSlice } from '@/document/queue.store';
import { configureStore } from '@reduxjs/toolkit';
import { documentSlice } from '../document/document.store';
import { objectControlPanelSlice } from '../object-control-panel/ObjectContolPanel';
import { objectPanelSlice } from '../object-panel/ObjectPanel.store';

export const store = configureStore({
  reducer: {
    document: documentSlice.reducer,
    objects: objectsSlice.reducer,
    currentQueueIndex: queueIndexSlice.reducer,
    selectedObjects: selectedObjectsSlice.reducer,
    objectPanel: objectPanelSlice.reducer,
    objectControlPanel: objectControlPanelSlice.reducer,
  },
  middleware: [],
});

export type RootStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
