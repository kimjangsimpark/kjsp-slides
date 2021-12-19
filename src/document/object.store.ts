import type { SelectorFn } from '@/app/hooks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * @description
 * type of object
 */
export enum ObjectType {
  TEXTAREA = 'textrea',
  CIRCLE = 'circle',
  RECTANGLE = 'rectangle',
}

/**
 * @description
 * type of effect
 */
export enum ObjectEffectType {
  CREATE = 'create',
  FADE_IN = 'fade-in',
  TRANSITION = 'transition',
  DELETE = 'delete',
}

export interface ObjectCreateEffect extends CommonEffect {
  index: number;
  type: ObjectEffectType.CREATE;
}

export interface ObjectFadeInEffect extends CommonEffect {
  index: number;
  type: ObjectEffectType.FADE_IN;
}

export interface ObjectTransitionEffect extends CommonEffect {
  index: number;
  type: ObjectEffectType.TRANSITION;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export interface ObjectDeleteEffect extends CommonEffect {
  index: number;
  type: ObjectEffectType.DELETE;
}

export type ObjectEffect =
  | ObjectCreateEffect
  | ObjectFadeInEffect
  | ObjectTransitionEffect
  | ObjectDeleteEffect;

export interface CommonEffect {
  index: number;
  type: ObjectEffectType;
}

export interface CommonObject {
  type: ObjectType;
  uuid: string;
  shape: ObjectRect;
  effects: ObjectEffect[];
}

export interface ObjectRect {
  x: number;
  y: number;
  width: number;
  height: number;
  lineType: string;
  lineWidth: number;
  lineColor: string;
}

export interface ObjectText {
  innerText: string;
  textColor: string;
}


export interface RectangleObject extends CommonObject {
  type: ObjectType.RECTANGLE;
  text?: ObjectText;
}

export interface CircleObject extends CommonObject {
  type: ObjectType.CIRCLE;
  text?: ObjectText;
}

export interface TextareaObject extends CommonObject {
  type: ObjectType.TEXTAREA;
  text?: ObjectText;
}

export type DocumentObject = RectangleObject | TextareaObject | CircleObject;


export const objectSelector = (): SelectorFn<DocumentObject[]> => {
  return state => state.objects;
}

export const queueObjectSelector = (
  queueIndex: number,
): SelectorFn<DocumentObject[]> => {
  return state => {
    const objects = state.objects;
    const index = queueIndex;

    const currentVisibleObjects = objects.filter(object => {
      const isCreated = object.effects.find(effect => effect.type === 'create' && effect.index <= index);
      const isDeleted = object.effects.some(effect => effect.type === 'delete' && effect.index < index);
      return isCreated && !isDeleted;
    }).map(object => {
      const immutable = { ...object };
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

    return currentVisibleObjects;
  };
}

export interface ObjectCreateParams {
  index: number;
  type: ObjectType;
  rect: ObjectRect;
}

export interface ObjectTransitionUpdateParams {
  uuid: string;
  index: number;
  rect: ObjectRect;
}

export function createObjectUUID(): string {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(0, 5);
}

export const objectsSlice = createSlice({
  name: 'objects',
  initialState: [] as DocumentObject[],
  reducers: {

    /**
     * @description
     * 문서에 오브젝트 배열 할당
     * 문서 생성 및 불러오기 시에만 호출
     */
    setDocumentObjects: (state, params: PayloadAction<DocumentObject[]>) => {
      return params.payload;
    },

    /**
     * @description
     * 문서에 오브젝트 추가
     */
    createObject: (state, params: PayloadAction<ObjectCreateParams>) => {
      const pendingCreate: DocumentObject = {
        uuid: createObjectUUID(),
        type: params.payload.type,
        shape: { ...params.payload.rect },
        effects: [{
          index: params.payload.index,
          type: ObjectEffectType.CREATE,
        }],
      }
      const newState = [...state];
      newState.push(pendingCreate);
      return newState;
    },

    /**
     * @description
     * 문서에 존재하는 오브젝트 수정
     */
    updateTransitionOfObject: (
      state,
      params: PayloadAction<ObjectTransitionUpdateParams>
    ) => {
      const index = state.findIndex(object => object.uuid === params.payload.uuid);

      if (index === -1) {
        throw new Error('Object not found');
      }

      const pendingUpdate: DocumentObject = {
        ...state[index],
        effects: state[index].effects.map(effect => ({ ...effect })),
      };

      const isCreateQueueIndex = pendingUpdate.effects.findIndex(
        effect => effect.type === ObjectEffectType.CREATE && effect.index === params.payload.index,
      );

      const isTransitionEffectIndex = pendingUpdate.effects.findIndex(
        effect => effect.type === ObjectEffectType.TRANSITION && effect.index === params.payload.index,
      );

      if (isCreateQueueIndex !== -1) {
        pendingUpdate.shape = params.payload.rect;
      } else if (isTransitionEffectIndex !== -1) {
        pendingUpdate.effects[isTransitionEffectIndex] = {
          type: ObjectEffectType.TRANSITION,
          index: params.payload.index,
          ...params.payload.rect,
        };
      } else {
        let effectTargetIndex = pendingUpdate.effects.findIndex(
          effect => effect.index > params.payload.index,
        );
        if (effectTargetIndex === -1) {
          effectTargetIndex = pendingUpdate.effects.length - 1;
        }
        pendingUpdate.effects.splice(effectTargetIndex, 0, {
          type: ObjectEffectType.TRANSITION,
          index: params.payload.index,
          ...params.payload.rect,
        });
      }

      const newState = [...state];
      newState[index] = pendingUpdate;
      return newState;
    },
  }
})