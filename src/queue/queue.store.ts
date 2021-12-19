import type { SelectorFn } from '@/app/hooks';
import type { RootDispatch, RootState } from '@/app/store';
import { documentSelector, documentSlice } from '@/document/document.store';
import type { DocumentObject } from '@/document/object.store';
import { AnyAction, createSelector, createSlice, Middleware, MiddlewareAPI, PayloadAction } from '@reduxjs/toolkit';

export function queueIndexSelector(): SelectorFn<number> {
  return state => state.queue;
}

// export function queueObjectsSelector(): SelectorFn<DocumentObject[]> {
//   return state => createSelector(
//     [documentSelector(), queueIndexSelector()],
//     (document, index) => {
//       if (!document) {
//         return [];
//       }
//       const currentVisibleObjects = document.objects.filter(object => {
//         const isCreated = object.effects.find(effect => effect.type === 'create' && effect.index <= index);
//         const isDeleted = object.effects.some(effect => effect.type === 'delete' && effect.index < index);
//         return isCreated && !isDeleted;
//       }).map(object => {
//         const immutable = { ...object };
//         const reversedEffects = object.effects.slice(0).reverse();

//         const lastTransition = reversedEffects.find(
//           effect => effect.index < index && effect.type === 'transition',
//         ) as ObjectTransitionEffect;

//         const currentTransition = reversedEffects.find(
//           effect => effect.index === index && effect.type === 'transition',
//         ) as ObjectTransitionEffect;

//         immutable.shape = {
//           ...object.shape,
//           x: currentTransition?.x || lastTransition?.x || object.shape.x,
//           y: currentTransition?.y || lastTransition?.y || object.shape.y,
//           width: currentTransition?.width || lastTransition?.width || object.shape.width,
//           height:
//             currentTransition?.height || lastTransition?.height || object.shape.height,
//         };

//         return immutable;
//       });
//       return currentVisibleObjects;
//     }
//   )(state);
// }

export const queueIndexSlice = createSlice({
  initialState: 0,
  name: 'queue',
  reducers: {
    setCurrentQueueIndex: (state, params: PayloadAction<number>) => {
      return params.payload;
    },
  },
});
