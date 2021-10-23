import { fetcher } from '@/misc/fetcher';
import type { Observable } from 'rxjs';

export interface SignInRequest {
  userEmail: string;
  userPassword: string;
}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer';
  userInfo: {
    userName: string;
    userEmail: string;
    userPhone: string;
  };
}

export interface SignUpRequest {
  userName: string;
  userEmail: string;
  userPassword: string;
  userPhone: string;
}

export interface GetUserInfoRequest {
  userEmail: string;
  accessToken: string;
}

export interface GetUserInfoResponse {
  userName: string;
  userEmail: string;
  userPhone: string;
}

export function signIn(params: SignInRequest): Observable<SignInResponse> {
  return fetcher.fetch<SignInResponse>('/api/user/signin', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export function signUp(params: SignUpRequest): Observable<null> {
  return fetcher.fetch<null>('/api/user/signup', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export function getUserInfo(
  userEmail: string,
  accessToken: string,
): Observable<GetUserInfoResponse> {
  return fetcher.fetch<GetUserInfoResponse>('/api/user/info', {
    method: 'post',
    body: JSON.stringify({ userEmail }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
