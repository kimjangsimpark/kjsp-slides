import { Writable, writable } from 'svelte/store';
import type { UserInfo } from '@/http/auth';

export const userInfo: Writable<UserInfo | null> = writable(null);
