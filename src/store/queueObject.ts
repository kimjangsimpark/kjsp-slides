import type { Position, QueueObject } from './document';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { currentQueue$ } from './queue';

export interface CurrentQueueObjectChangeAction {
  type: 'changeCurrentQueueObject';
  state: QueueObject;
}

export interface CurrentQueueObjectPositionChangeAction {
  type: 'changeCurrentQueueObjectPosition';
  position: Position;
}

export interface CurrentQueueObjectResetAction {
  type: 'resetCurrentQueueObject';
}

export type CurrentQueObjectAction = CurrentQueueObjectChangeAction | CurrentQueueObjectPositionChangeAction | CurrentQueueObjectResetAction;

const currentQueueObjectSubject = new BehaviorSubject<QueueObject | null>(null);

export const currentQueueObjectReducer = (action: CurrentQueObjectAction): void => {
  const current = currentQueueObjectSubject.getValue();
  switch (action.type) {
    case 'changeCurrentQueueObject':
      currentQueueObjectSubject.next({
        ...action.state,
      });
      return;
    case 'changeCurrentQueueObjectPosition':
      if (!current) {
        throw new Error('Current Queue Object Not Detected');
      } else {
        currentQueueObjectSubject.next({
          ...current,
          position: action.position,
        });
        return;
      }
    case 'resetCurrentQueueObject':
      currentQueueObjectSubject.next(null);
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
    return currentQueue.objects.find(object => object.uuid === currentObject.uuid) || null;
  }),
)
