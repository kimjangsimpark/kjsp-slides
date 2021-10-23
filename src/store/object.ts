/* eslint-disable no-case-declarations */
import type { DocumentObject } from '@/http/document';
import { BehaviorSubject } from 'rxjs';

export interface ObjectDocumentChangeAction {
  type: 'documentChange';
  state: DocumentObject[];
}

export interface ObjectUpdateAction {
  type: 'objectUpdate';
  state: DocumentObject;
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
    case 'objectUpdate':
      if (!current || !objectByUUID) {
        throw new Error('Object not found');
      }
      const target = objectByUUID[action.state.uuid];
      const newState = [...current];
      newState[target.index] = action.state;
      objectSubject.next(newState);
      break;
    default:
      throw new Error('Not supported action');
  }
  return;
}

export const object$ = objectSubject.asObservable();
export const objectChange$ = objectSubject.asObservable();