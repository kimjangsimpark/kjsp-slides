import { from, Observable, switchMap, tap, throwError } from 'rxjs';

export type HttpClientHeader = Record<string, string>;
export type RequestInterceptor = (input: RequestInfo, init?: RequestInit | undefined) => void;
export type ResponseInterceptor = (response: Response) => void;

export interface FetcherRequestInit extends RequestInit {
  headers?: Record<string, string>;
}

export class Fetcher {

  private baseUrl: string | undefined;
  private defaultHeader: Record<string, string> | undefined;
  private readonly requestInterceptors: RequestInterceptor[] = [];
  private readonly responseInterceptors: ResponseInterceptor[] = [];

  public setBaseUrl(
    url: string
  ): Fetcher {
    this.baseUrl = url;
    return this;
  }

  public setDefaultHeader(
    headers: Record<string, string>,
  ): Fetcher {
    this.defaultHeader = headers;
    return this;
  }

  public addRequestInterceptor(
    interceptor: RequestInterceptor,
  ): Fetcher {
    this.requestInterceptors.push(interceptor);
    return this;
  }

  public addResponseInterceptor(
    interceptor: ResponseInterceptor
  ): Fetcher {
    this.responseInterceptors.push(interceptor);
    return this;
  }

  public fetch<R>(
    url: string,
    request?: FetcherRequestInit | undefined
  ): Observable<R> {
    if (this.baseUrl) {
      url = `${this.baseUrl}${url}`;
    }
    if (!request) {
      request = {};
    }
    if (this.defaultHeader) {
      request.headers = Object.assign({}, this.defaultHeader, request.headers);
    }
    this.requestInterceptors.forEach(interceptor => interceptor(url, request));
    const promise = fetch(url, request);
    return from(promise).pipe(
      tap(response => {
        if (response.status < 200 || response.status > 299) {
          return throwError(() => new Error());
        }
        this.responseInterceptors.forEach(interceptor => interceptor(response));
      }),
      switchMap(response => {
        const promise = response.json();
        return from(promise) as Observable<R>;
      })
    );
  }
}

export const fetcher = new Fetcher();