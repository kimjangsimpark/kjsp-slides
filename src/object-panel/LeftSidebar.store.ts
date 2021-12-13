import { ObjectType } from '@/http/document';
import { document$ } from '@/store/document';
import { objectReducer } from '@/store/object';
import { currentQueue$ } from '@/store/queue';
import { Observable, Subject, switchMap, take, tap } from 'rxjs';

export interface LeftSidebarCreateAction {
  type: 'create',
  objectType: ObjectType,
}

export type LeftSidebarAction = LeftSidebarCreateAction;

const LeftSidebarSubject = new Subject<LeftSidebarAction>();

export const leftSidebarReducer = (
  action: LeftSidebarAction
): void => {
  document$.pipe(
    take(1),
    switchMap((document) => currentQueue$.pipe(
      take(1),
      tap(queue => {
        if (!document) {
          throw new Error('Document not found');
        }
        switch (action.objectType) {
          case ObjectType.RECTANGLE:
            objectReducer({
              type: 'insertObject',
              state: {
                type: ObjectType.RECTANGLE,
                uuid: Math.random()
                  .toString(36)
                  .replace(/[^a-z]+/g, '')
                  .substr(0, 5),
                effects: [
                  {
                    type: 'create',
                    index: queue.index,
                  },
                ],
                shape: {
                  x: document.rect.width / 2 - 50,
                  y: document.rect.height / 2 - 50,
                  width: 100,
                  height: 100,
                  lineType: 'solid',
                  lineWidth: 1,
                  lineColor: '#000000',
                },
              },
            });
            break;
          case ObjectType.TEXTAREA:
            objectReducer({
              type: 'insertObject',
              state: {
                type: ObjectType.TEXTAREA,
                uuid: Math.random()
                  .toString(36)
                  .replace(/[^a-z]+/g, '')
                  .substr(0, 5),
                effects: [
                  {
                    type: 'create',
                    index: queue.index,
                  },
                ],
                shape: {
                  x: document.rect.width / 2 - 50,
                  y: document.rect.height / 2 - 50,
                  width: 100,
                  height: 100,
                  lineType: 'solid',
                  lineWidth: 1,
                  lineColor: '#000000',
                },
                text: {
                  innerText: 'asldkfjasd',
                  textColor: 'red',
                },
              },
            });
            break;
        }
      }),
    )),
  )
}

export const LeftSidebar$: Observable<LeftSidebarAction> = LeftSidebarSubject.pipe();