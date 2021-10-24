import type { DocumentObject, ObjectTransitionEffect } from '@/http/document';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { document$ } from './document';
import { object$ } from './object';

export interface CurrentQueueState {
  index: number;
  objects: DocumentObject[];
}

export interface ChangeCurrentQueueAction {
  type: 'changeCurrentQueue';
  index: number;
}

export type CurrentQueueAction = ChangeCurrentQueueAction;

const currentQueueSubject = new BehaviorSubject<number>(0);

export function currentQueueReducer(
  action: CurrentQueueAction,
): void {
  switch (action.type) {
    case 'changeCurrentQueue':
      currentQueueSubject.next(action.index);
      break;
    default:
      throw new Error('Not Supported Current Queue Action');
  }
}

document$.subscribe(() => {
  currentQueueReducer({
    type: 'changeCurrentQueue',
    index: 0,
  });
});

export const currentQueue$: Observable<CurrentQueueState> = combineLatest([object$, currentQueueSubject]).pipe(
  map(([objects, index]) => {
    if (!objects) {
      return {
        index: 0,
        objects: [],
      };
    }
    const currentVisibleObjects = objects.filter(object => {
      const isDeleted = object.effects.some(effect => effect.type === 'delete' && effect.index < index);
      return !isDeleted;
    });

    return {
      index: index,
      objects: currentVisibleObjects,
    }
  }),
  map(currentQueue => {
    const newState = { ...currentQueue };

    newState.objects = currentQueue.objects.map(object => {
      const immutable = { ...object };
      const index = currentQueue.index;
      const reversedEffects = object.effects.slice(0).reverse();

      const lastTransition = reversedEffects.find(
        effect => effect.index < index && effect.type === 'transition',
      ) as ObjectTransitionEffect;

      const currentTransition = reversedEffects.find(
        effect => effect.index === index && effect.type === 'transition',
      ) as ObjectTransitionEffect;

      immutable.shape = {
        ...object.shape,
        x: currentTransition?.x || lastTransition?.x || object.shape.x,
        y: currentTransition?.y || lastTransition?.y || object.shape.y,
        width: currentTransition?.width || lastTransition?.width || object.shape.width,
        height:
          currentTransition?.height || lastTransition?.height || object.shape.height,
      };

      return immutable;
    });
    return newState;
  }),
);
