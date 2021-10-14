import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { document$, QueueObject } from './document';

export interface CurrentQueueState {
  index: number;
  objects: QueueObject[];
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

export const currentQueue$: Observable<CurrentQueueState> = combineLatest([ document$, currentQueueSubject ]).pipe(
  map(([document, index]) => {
    const queueObjects = document.objects.filter(object => {
      const isDeleted = object.effects.some(effect => effect.type === 'delete' && effect.index < index);
      if (isDeleted) {
        return false;
      }
      const isCurrent = object.effects.some(effect => effect.index <= index);
      return isCurrent;
    });
    return {
      index: index,
      objects: queueObjects,
    }
  })
);
