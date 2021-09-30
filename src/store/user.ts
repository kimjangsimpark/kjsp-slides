import { Writable, writable } from 'svelte/store';

export interface IUserInfo {
  username: string;
  email: string;
}

export const userInfo: Writable<IUserInfo | null> = writable(null);