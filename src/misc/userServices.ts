import type { Observable } from 'rxjs';
import { fetcher } from './fetcher';

export const UserServicesAPIEndPoints = {
  AUTH_CHECK: '/api/user/auth/check',
  SIGN_IN: '/api/user/auth/signin',
  SIGN_UP: '/api/user/auth/signup',
  GET_USER_INFO: '/api/user/auth/info',
};

export class UserServices {
  private static instance: UserServices;

  public static getInstance(): UserServices {
    if (!this.instance) {
      console.log('쌔거야~');
      this.instance = new UserServices();
    }

    return this.instance;
  }

  public signin(): void {
    return;
  }
  public signup(body: Record<string, unknown>): Observable<unknown> {
    return fetcher.fetch<unknown>(UserServicesAPIEndPoints.SIGN_UP, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }
  public getUserInfo(): void {
    return;
  }
  public authCheck(): void {
    return;
  }
}
