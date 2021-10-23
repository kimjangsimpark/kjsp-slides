/* eslint-disable no-case-declarations */
import type { DocumentObject, ObjectRect } from '@/http/document';
import { BehaviorSubject } from 'rxjs';

export interface ObjectDocumentChangeAction {
  type: 'documentChange';
  state: DocumentObject[];
}

export interface ObjectUpdateAction {
  type: 'objectTransitionUpdate';
  queueIndex: number;
  uuid: string;
  shape: ObjectRect;
}

export type ObjectAction = ObjectDocumentChangeAction | ObjectUpdateAction;

interface ObjectByIndex {
  [uuid: string]: {
    index: number;
    object: DocumentObject;
  };
}

const objectSubject = new BehaviorSubject<DocumentObject[] | null>(null);
let objectByUUID: ObjectByIndex | null = null;

objectSubject.subscribe({
  next: objects => {
    if (!objects) {
      objectByUUID = null;
    } else {
      objectByUUID = objects.reduce<ObjectByIndex>((result, current, index) => {
        result[current.uuid] = {
          index: index,
          object: current,
        };
        return result;
      }, {});
    }
  }
})

export function objectReducer(
  action: ObjectAction
): void {
  const current = objectSubject.getValue();
  switch (action.type) {
    case 'documentChange':
      objectSubject.next(action.state);
      break;
    case 'objectTransitionUpdate':
      if (!current || !objectByUUID) {
        throw new Error('Object not found');
      }
      const target = objectByUUID[action.uuid];
      const targetTransitionEffectIndex = target.object.effects.findIndex(effect => effect.index === action.queueIndex);
      
      const newState = [...current];
      newState[target.index] = target.object;
      if (targetTransitionEffectIndex === -1) {
        newState[target.index].shape = action.shape;
      } else {
        newState[target.index].effects[targetTransitionEffectIndex] = {
          type: 'transition',
          index: targetTransitionEffectIndex,
          ...action.shape
        };
      }
      objectSubject.next(newState);
      break;
    default:
      throw new Error('Not supported action');
  }
  return;
}

export const object$ = objectSubject.asObservable();
export const objectChange$ = objectSubject.asObservable();