import { from, map, Observable, throwError } from 'rxjs';

export type HttpClientHeader = Record<string, string>;
export type RequestInterceptor = (input: RequestInfo, init?: RequestInit | undefined) => void;
export type ResponseInterceptor = (response: Response) => void;

export interface FetcherRequestInit extends RequestInit {
  headers?: Record<string, string>;
}

export class Fetcher {

  private defaultHeader: Record<string, string> | undefined;
  private readonly requestInterceptors: RequestInterceptor[] = [];
  private readonly responseInterceptors: ResponseInterceptor[] = [];

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

  public fetch(
    input: RequestInfo,
    init?: FetcherRequestInit | undefined
  ): Observable<Response> {
    if (!init) {
      init = {};
    }
    if (this.defaultHeader) {
      init.headers = Object.assign({}, this.defaultHeader, init.headers);
    }
    this.requestInterceptors.forEach(interceptor => interceptor(input, init));
    const promise = window.fetch(input, init);
    return from(promise).pipe(
      map(response => {
        if (response.status < 200 || response.status > 299) {
          throwError(() => new Error());
        }
        this.responseInterceptors.forEach(interceptor => interceptor(response));
        return response;
      })
    );
  }
}