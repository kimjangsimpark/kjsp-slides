import type { SelectorFn } from '@/app/hooks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ObjectTransitionEffect, Animatable, ObjectCreateEffect } from './object.store';

export interface CurrentQueueRangeObject {
  index: number;
  current: boolean;
  objects: Animatable[];
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
        const immutable: Animatable = {
          uuid: object.uuid,
          type: object.type,
          shape: {
            height: 0,
            width: 0,
            x: 0,
            y: 0,
          },
          duration: 0,
        };
        const reversedEffects = object.effects.slice(0).reverse();

        const lastTransition = reversedEffects.find(
          effect => effect.index <= range.index && effect.type === 'transition' || effect.type === 'create',
        ) as ObjectTransitionEffect;

        immutable.shape = {
          x: lastTransition.x,
          y: lastTransition.y,
          width: lastTransition.width,
          height: lastTransition.height,
        };

        immutable.duration = lastTransition.duration || 0.5;

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
