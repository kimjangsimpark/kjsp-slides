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
    input: RequestInfo,
    init?: FetcherRequestInit | undefined
  ): Observable<R> {
    if (!init) {
      init = {};
    }
    if (this.defaultHeader) {
      init.headers = Object.assign({}, this.defaultHeader, init.headers);
    }
    this.requestInterceptors.forEach(interceptor => interceptor(input, init));
    const promise = fetch(input, init);
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