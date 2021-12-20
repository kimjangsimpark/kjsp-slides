import type { SelectorFn } from '@/app/hooks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ObjectEffectType, ObjectTransitionEffect, QueueObject } from './object.store';

export interface CurrentQueueRangeObject {
  index: number;
  current: boolean;
  objects: QueueObject[];
}

export function currentQueueRangeSelector(): SelectorFn<number[]> {
  return state => {
    const index = state.currentQueueIndex;
    const result: number[] = [];
    let start = Math.max(index - 2, 0);
    while (result.length < 5) {
      result.push(start++);
    }
    return result;
  };
}

export function currentQueueIndexSelector(): SelectorFn<number> {
  return state => state.currentQueueIndex;
}

export function currentQueueRangeObjectsSelector(): SelectorFn<CurrentQueueRangeObject[]> {
  return state => {
    const ranges: CurrentQueueRangeObject[] = currentQueueRangeSelector()(state).map(index => ({
      index: index,
      current: state.currentQueueIndex === index,
      objects: [],
    }));

    ranges.forEach(range => {
      const currentVisibleObjects = state.objects.filter(object => {
        const isCreated = object.effects.find(effect => effect.type === 'create' && effect.index <= range.index);
        const isDeleted = object.effects.some(effect => effect.type === 'delete' && effect.index < range.index);
        return isCreated && !isDeleted;
      });

      const transformedObjects = currentVisibleObjects.map(object => {
        const immutable = { ...object };
        const reversedEffects = object.effects.slice(0).reverse();

        const lastTransition = reversedEffects.find(
          effect => effect.index < range.index && effect.type === 'transition',
        ) as ObjectTransitionEffect;

        const currentTransition = reversedEffects.find(
          effect => effect.index === range.index && effect.type === 'transition',
        ) as ObjectTransitionEffect;

        immutable.shape = {
          x: currentTransition?.x || lastTransition?.x || object.shape.x,
          y: currentTransition?.y || lastTransition?.y || object.shape.y,
          width: currentTransition?.width || lastTransition?.width || object.shape.width,
          height: currentTransition?.height || lastTransition?.height || object.shape.height,
        };
        return immutable;
      });

      range.objects.push(...transformedObjects);
    });

    return ranges;
  }
}

export const queueIndexSlice = createSlice({
  initialState: 0,
  name: 'queue',
  reducers: {
    next: state => Math.max(state + 1, 0),
    set: (state, params: PayloadAction<number>) => Math.max(params.payload, 0),
    previous: state => Math.max(state - 1, 0),
  },
});
