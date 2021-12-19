/* eslint-disable no-case-declarations */
import { DocumentObject, ObjectEffectType, ObjectRect } from '@/document/object.store';
import { BehaviorSubject } from 'rxjs';

export interface ObjectDocumentChangeAction {
  type: 'documentChange';
  state: DocumentObject[];
}

export interface InsertObjectAction {
  type: 'insertObject';
  state: DocumentObject;
}

export interface ObjectUpdateAction {
  type: 'objectTransitionUpdate';
  queueIndex: number;
  uuid: string;
  shape: ObjectRect;
}

export interface ObjectShapeUpdateAction {
  type: 'objectShapeUpdateAction';
  uuid: string;
  shape: ObjectRect;
}

export type ObjectAction =
  | ObjectDocumentChangeAction
  | InsertObjectAction
  | ObjectUpdateAction
  | ObjectShapeUpdateAction;

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
  },
});

export function objectReducer(action: ObjectAction): void {
  const current = objectSubject.getValue();
  switch (action.type) {
    case 'documentChange':
      objectSubject.next(action.state);
      break;
    case 'insertObject':
      if (!current || !objectByUUID) {
        throw new Error('Object array not found');
      }
      const objects = [...current];
      objects.push(action.state);
      objectSubject.next(objects);
      break;
    case 'objectTransitionUpdate':
      if (!current || !objectByUUID) {
        throw new Error('Object not found');
      }
      const target = objectByUUID[action.uuid];
      const existTransitionEffect = target.object.effects.findIndex(
        effect => effect.type === 'transition' && effect.index === action.queueIndex,
      );
      const isCreateQueue = target.object.effects.some(
        effect => effect.index === action.queueIndex && effect.type === 'create',
      );

      const newState = [...current];
      newState[target.index] = { ...target.object };
      const newObject = newState[target.index];

      if (isCreateQueue) {
        newObject.shape = action.shape;
      } else if (existTransitionEffect !== -1) {
        newObject.effects[existTransitionEffect] = {
          type: ObjectEffectType.TRANSITION,
          index: newObject.effects[existTransitionEffect].index,
          ...action.shape,
        };
      } else {
        let effectTargetIndex = newObject.effects.findIndex(
          effect => effect.index > action.queueIndex,
        );
        if (effectTargetIndex === -1) {
          effectTargetIndex = newObject.effects.length - 1;
        }
        newObject.effects.splice(effectTargetIndex, 0, {
          type: ObjectEffectType.TRANSITION,
          index: action.queueIndex,
          ...action.shape,
        });
      }

      objectSubject.next(newState);
      break;
    case 'objectShapeUpdateAction': {
      if (!current || !objectByUUID) {
        throw new Error('Object not found');
      }
      // current -> 현재 문서의 객체 리스트[]
      const target = objectByUUID[action.uuid];
      const newState = [...current]; // 새로만든 문서의 객체 리스트[] (복사한거)
      newState[target.index] = {
        ...target.object,
        shape: {
          ...target.object.shape,
          ...action.shape,
        },
      };

      objectSubject.next(newState);
      break;
    }
    default:
      throw new Error('Not supported action');
  }
  return;
}

export const object$ = objectSubject.asObservable();
export const objectChange$ = objectSubject.asObservable();
