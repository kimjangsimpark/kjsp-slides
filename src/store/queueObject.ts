import type { Position, QueueObject } from './document';
import { BehaviorSubject } from 'rxjs';

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

const currentQueueSubject = new BehaviorSubject<QueueObject | null>(null);

export const currentQueueObjectReducer = (action: CurrentQueObjectAction): void => {
  const current = currentQueueSubject.getValue();
  switch (action.type) {
    case 'changeCurrentQueueObject':
      currentQueueSubject.next({
        ...action.state,
      });
      return;
    case 'changeCurrentQueueObjectPosition':
      if (!current) {
        throw new Error('Current Queue Object Not Detected');
      } else {
        currentQueueSubject.next({
          ...current,
          position: action.position,
        });
        return;
      }
    case 'resetCurrentQueueObject':
      currentQueueSubject.next(null);
      return;
    default:
      throw new Error('Not Supported Current Queue Object Action');
  }
}

export const currentQueueObject$ = currentQueueSubject.asObservable();
