import { Writable, writable } from 'svelte/store';

export interface IUserInfo {
  userEmail: string;
  userName: string;
  userPhone: string;
}

export const userInfo: Writable<IUserInfo | null> = writable(null);
