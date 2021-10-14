import { BehaviorSubject } from 'rxjs';
import { document$, Queue } from './document';

export interface CurrentQueueState {
  queue: Queue;
}

export interface ChangeCurrentQueueAction {
  type: 'changeCurrentQueue';
  index: number;
}

export type CurrentQueueAction = ChangeCurrentQueueAction;

const currentQueueSubject = new BehaviorSubject<CurrentQueueState>({
  queue: {
    index: 0,
    objects: []
  }
});

export function currentQueueReducer(
  action: CurrentQueueAction,
): void {
  const document = document$.getValue();
  const current = currentQueueSubject.getValue();
  switch (action.type) {
    case 'changeCurrentQueue':
      if (current?.queue === document.queues[action.index]) {
        return;
      }
      currentQueueSubject.next({
        queue: document.queues[action.index],
      });
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

export const currentQueue$ = currentQueueSubject.asObservable();
