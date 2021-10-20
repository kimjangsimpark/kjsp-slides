import type { DocumentResponse } from '@/http/document';
import { BehaviorSubject, filter, Observable, tap } from 'rxjs';

export type DocumentAction = DocumentNameChangeAction | DocumentChangeAction;

export interface DocumentNameChangeAction {
  type: 'changeName';
  documentName: string;
}

export interface DocumentChangeAction {
  type: 'changeDocument';
  state: DocumentState | null;
}

export type DocumentState = DocumentResponse;

let documentState: DocumentState | null = null;
const documentSubject = new BehaviorSubject<DocumentState | null>(null);

export const documentReducer = (action: DocumentAction): void => {
  switch (action.type) {
    case 'changeName':
      if (!documentState) {
        throw new Error('Current Document Not Found');
      }
      documentSubject.next({
        ...documentState,
        documentName: action.documentName,
      });
      return;
    case 'changeDocument':
      documentState = action.state ? { ...action.state } : null;
      documentSubject.next(documentState);
      return;
    default:
      throw new Error('Unsupported DocumentState Action');
  }
}

export const document$ = documentSubject.asObservable();
