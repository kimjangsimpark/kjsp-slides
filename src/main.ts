import '@/styles/global.scss';
import App from '@/App.svelte';
import { fetcher } from './misc/fetcher';
import { store } from './store';

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

const app = new App({
  target: document.body,
});

export default app;
