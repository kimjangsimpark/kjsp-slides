import { Writable, writable } from 'svelte/store';

export interface UserInfo {
  userName: string;
  userEmail: string;
  userPhone: string;
}

export const userInfo: Writable<UserInfo | null> = writable(null);
