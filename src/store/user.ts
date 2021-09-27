import { Writable, writable } from 'svelte/store';

export interface IUserInfo {
  username: string;
  email: string;
  accessToken: string;
  isAuthenticated: boolean;
}

export const userInfo: Writable<IUserInfo> = writable({
  username: '',
  email: '',
  accessToken: '',
  isAuthenticated: false,
});