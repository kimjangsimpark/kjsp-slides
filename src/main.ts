import '@/styles/global.scss';
import Main from '@/Main.svelte';
import { fetcher } from './misc/fetcher';

fetcher.setBaseUrl('https://slide.preandero.com');
fetcher.setDefaultHeader({
  // Authorization: 'SOME TOKEN TO USE',
  'Content-Type': 'application/json',
});
fetcher.addResponseInterceptor(response => {
  if (response.status === 401) {
    console.log('Unauthorized Reqeust, Please Redirect to login page');
  }
});

const app = new Main({
  target: document.body,
});

export default app;
