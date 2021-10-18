import '@/styles/global.scss';
import App from '@/App.svelte';
import { fetcher } from './misc/fetcher';

fetcher.setBaseUrl('https://slide.preandero.com');
fetcher.setDefaultHeader({
  'Content-Type': 'application/json',
  Authorization: 'SOME TOKEN TO USE',
});
fetcher.addResponseInterceptor(response => {
  if (response.status === 401) {
    console.log('Unauthorized Reqeust, Please Redirect to login page');
  }
});

const app = new App({
  target: document.body,
});

export default app;
