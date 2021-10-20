import type { DocumentObject } from '@/http/document';
import { Subject } from 'rxjs';

const objectSubject = new Subject<DocumentObject[]>();

export const object$ = objectSubject.asObservable();