import type { RectangleObject } from '@/http/document';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { currentQueue$ } from './queue';

export interface CurrentQueueObjectChangeAction {
  type: 'changeCurrentQueueObject';
  state: RectangleObject;
}

export interface UpdateQueueObjectAction {
  type: 'updateQueueObjectAction';
  state: RectangleObject;
}

export interface CurrentQueueObjectResetAction {
  type: 'resetCurrentQueueObject';
}

export type CurrentQueObjectAction = CurrentQueueObjectChangeAction | CurrentQueueObjectResetAction;

const currentQueueObjectSubject = new BehaviorSubject<RectangleObject | null>(null);

export const currentQueueObjectReducer = (action: CurrentQueObjectAction): void => {
  const current = currentQueueObjectSubject.getValue();
  switch (action.type) {
    case 'changeCurrentQueueObject':
      currentQueueObjectSubject.next({
        ...action.state,
      });
      return;
    case 'resetCurrentQueueObject':
      if (current !== null) {
        currentQueueObjectSubject.next(null);
      }
      return;
    default:
      throw new Error('Not Supported Current Queue Object Action');
  }
}

export const currentQueueObject$ = combineLatest([currentQueue$, currentQueueObjectSubject]).pipe(
  map(([currentQueue, currentObject]) => {
    if (currentObject === null) {
      return null;
    }
    const found = currentQueue.objects.find(object => object.uuid === currentObject.uuid);
    return found || null;
  }),
)
