import { Observable, of } from 'rxjs';

export interface DocumentMetadata {
  documentName: string;
  rect: DocumentRect;
}

export interface DocumentRect {
  width: number;
  height: number;
}

export interface ObjectBaseEffect {
  index: number;
  type: string;
}

export interface ObjectCreateEffect extends ObjectBaseEffect {
  index: number;
  type: 'create';
}

export interface ObjectFadeInEffect extends ObjectBaseEffect {
  index: number;
  type: 'fade-in';
}

export interface ObjectTransitionEffect extends ObjectBaseEffect {
  index: number;
  type: 'transition';
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export interface ObjectDeleteEffect extends ObjectBaseEffect {
  index: number;
  type: 'delete';
}

export interface ObjectRect {
  x: number;
  y: number;
  width: number;
  height: number;
  lineWidth: number;
  lineColor?: string;
}

export interface ObjectText {
  innerText: string;
  textColor: string;
}

export type ObjectEffect = ObjectCreateEffect | ObjectFadeInEffect | ObjectTransitionEffect | ObjectDeleteEffect;

export interface DocumentObject {
  uuid: string; // 개체 고유 아이디 (문서 내에서 중복 X)
  type: string; // 개체 타입 (모양)
  shape: ObjectRect, // 가로, 세로, 테두리, 테두리 색상, 배경 색상
  effects: ObjectEffect[];
  text?: ObjectText, // innerText, textColor
}

export interface DocumentRequest {
  documentId: string;
}

export interface DocumentResponse extends DocumentMetadata {
  objects: DocumentObject[];
}

export function getDocument(
  params: DocumentRequest
): Observable<DocumentResponse> {
  // return fetcher.fetch<DocumentResponse>('api', { ...params });
  return of({
    documentName: 'Document Name',
    rect: {
      width: 1920,
      height: 1080
    },
    objects: [{
      type: 'rectangle',
      uuid: 'asdkfl3n3',
      effects: [
        {
          type: 'create',
          index: 0,
        },
        {
          type: 'transition',
          index: 1,
          x: 50,
          y: 100,
          width: 500
        },
        {
          type: 'transition',
          index: 2,
          x: 50,
          y: 100,
        },
        {
          type: 'transition',
          index: 3,
          x: 50,
          y: 100,
        },
        {
          type: 'transition',
          index: 4,
          x: 110,
          y: 210,
          width: 300,
          height: 200
        },
        {
          type: 'delete',
          index: 5,
        },
      ],
      shape: {
        x: 100,
        y: 200,
        width: 200,
        height: 100,
        lineWidth: 1,
        lineColor: '#000000',
      },
    }, {
      type: 'rectangle',
      uuid: 'asdf3d3g',
      effects: [
        {
          type: 'create',
          index: 0,
        },
        {
          type: 'transition',
          index: 1,
          x: 900,
          y: 500,
        },
        {
          type: 'transition',
          index: 2,
          x: 1000,
          y: 300,
          width: 300,
          height: 200
        },
        {
          type: 'delete',
          index: 3,
        },
      ],
      shape: {
        x: 800,
        y: 600,
        width: 50,
        height: 50,
        lineWidth: 1,
        lineColor: '#000000',
      },
    }]
  });
}