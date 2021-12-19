import { queueMiddleware, queueSlice } from '@/queue/queue.store';
import { configureStore } from '@reduxjs/toolkit';
import { documentSlice } from '../document/document.store';
import { objectControlPanelSlice } from '../object-control-panel/ObjectContolPanel';
import { objectPanelSlice } from '../object-panel/ObjectPanel.store';

export const store = configureStore({
  reducer: {
    document: documentSlice.reducer,
    queue: queueSlice.reducer,
    objectPanel: objectPanelSlice.reducer,
    objectControlPanel: objectControlPanelSlice.reducer,
  },
  middleware: [
    queueMiddleware
  ]
});

export type RootStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
