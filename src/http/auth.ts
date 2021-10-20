import { fetcher } from '@/misc/fetcher';
import type { Observable } from 'rxjs';

export interface SignInRequest {
  userEmail: string;
  userPassword: string;
}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer',
  userInfo: {
    userName: string;
    userEmail: string;
    userPhone: string;
  };
}

export function signIn(
  params: SignInRequest,
): Observable<SignInResponse> {
  return fetcher.fetch<SignInResponse>('/api/user/signin', {
    method: 'post',
    body: JSON.stringify(params),
  });
}