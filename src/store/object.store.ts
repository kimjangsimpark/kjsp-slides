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
  x: number;
  y: number;
  width: number;
  height: number;
  duration: number;
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

export interface Animatable {
  uuid: string;
  type: ObjectType;
  shape: ObjectRect;
  duration: number;
}

export interface CommonObject {
  uuid: string;
  type: ObjectType;
  shape: ObjectRect;
  effects: ObjectEffect[];
}

export interface ObjectRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ObjectStroke {
  strokeType: string;
  strokeWidth: number;
  strokeColor: string;
}

export interface ObjectText {
  innerText: string;
  textColor: string;
}


export interface RectangleObject extends CommonObject {
  type: ObjectType.RECTANGLE;
  stroke: ObjectStroke;
  text: ObjectText;
}

export interface CircleObject extends CommonObject {
  type: ObjectType.CIRCLE;
  stroke: ObjectStroke;
  text: ObjectText;
}

export interface TextareaObject extends CommonObject {
  type: ObjectType.TEXTAREA;
  stroke: ObjectStroke;
  text: ObjectText;
}

export type DocumentObject = RectangleObject | TextareaObject | CircleObject;

export function isRectangleObject(object: DocumentObject): object is RectangleObject {
  return object.type === ObjectType.RECTANGLE;
}

export function isTransitionEffect(effect: ObjectEffect): effect is ObjectTransitionEffect {
  return effect && effect.type === ObjectEffectType.TRANSITION;
}

export function isCreateEffect(effect: ObjectEffect): effect is ObjectCreateEffect {
  return effect && effect.type === ObjectEffectType.CREATE;
}

export const objectSelector = (): SelectorFn<DocumentObject[]> => {
  return state => state.objects;
}

export function findLatestRect(
  object: DocumentObject,
  index: number
): ObjectRect {
  const latest = object.effects.slice().reverse().find(
    effect =>
      effect.index <= index &&
      (
        effect.type === ObjectEffectType.TRANSITION ||
        effect.type === ObjectEffectType.CREATE
      )
  );
  if (latest && isTransitionEffect(latest)) {
    return {
      x: latest.x,
      y: latest.y,
      height: latest.height,
      width: latest.width,
    }
  } else if (latest && isCreateEffect(latest)) {
    return {
      x: object.shape.x,
      y: object.shape.y,
      height: object.shape.height,
      width: object.shape.width,
    }
  } else {
    throw new Error('Target effect not found');
  }
}

export const objectsByUUIDSelector = (): SelectorFn<Readonly<{ [key: string]: DocumentObject }>> => {
  return state => {
    const byUUID: { [key: string]: DocumentObject } = {};
    state.objects.forEach(object => {
      byUUID[object.uuid] = object;
    });
    return byUUID;
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
  duration: number;
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
      let pendingObject: DocumentObject;

      switch (params.payload.type) {
        case ObjectType.RECTANGLE:
          pendingObject = {
            uuid: createObjectUUID(),
            type: params.payload.type,
            shape: { ...params.payload.rect },
            stroke: {
              strokeColor: 'black',
              strokeType: 'type',
              strokeWidth: 3,
            },
            text: {
              innerText: '',
              textColor: 'black',
            },
            effects: [{
              index: params.payload.index,
              type: ObjectEffectType.CREATE,
            }],
          }
          break;
        case ObjectType.TEXTAREA:
          pendingObject = {
            uuid: createObjectUUID(),
            type: params.payload.type,
            shape: { ...params.payload.rect },
            stroke: {
              strokeColor: 'black',
              strokeType: 'type',
              strokeWidth: 3,
            },
            text: {
              innerText: '',
              textColor: 'black',
            },
            effects: [{
              index: params.payload.index,
              type: ObjectEffectType.CREATE,
            }],
          }
          break;
        default:
          throw new Error('Unsupported Object')
      }
      const newState = [...state];
      newState.push(pendingObject);
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
          duration: params.payload.duration,
          ...params.payload.rect,
        };
      } else {
        let effectTargetIndex = pendingUpdate.effects.findIndex(
          effect => effect.index > params.payload.index,
        );
        if (effectTargetIndex === -1) {
          effectTargetIndex = pendingUpdate.effects.length - 1;
        }
        pendingUpdate.effects.splice(effectTargetIndex + 1, 0, {
          type: ObjectEffectType.TRANSITION,
          index: params.payload.index,
          duration: params.payload.duration,
          ...params.payload.rect,
        });
      }

      const newState = [...state];
      newState[index] = pendingUpdate;

      return newState;
    },

    updateStrokeOfObject: (state, params: PayloadAction<{ uuid: string; stroke: ObjectStroke }>) => {
      const index = state.findIndex(object => object.uuid === params.payload.uuid);

      if (index === -1) {
        throw new Error('Object not found');
      }

      const newState = [...state];
      const newObject = { ...state[index] };
      newObject.stroke = { ...params.payload.stroke };
      newState[index] = newObject;
      return newState;
    }
  }
})