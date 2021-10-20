import { wrap } from 'svelte-spa-router/wrap';
import Home from '@/routes/Home.svelte';
import SignUp from '@/routes/SignUp.svelte';
import SignIn from '@/routes/SignIn.svelte';
import Edit from '@/routes/Edit.svelte';
import NotFound from '@/routes/NotFound.svelte';
import App from '@/routes/App.svelte';
import Web from '@/routes/Web.svelte';
import { replace } from 'svelte-spa-router';

export const rootRoute = {
  '/': wrap({
    component: NotFound,
    conditions: [() => {
      void replace('/home');
      return true;
    },]
  }),
  '/home': Web,
  '/home/*': Web,
  '/app': App, // empty editor
  '/app/:documentId': App, // viewer
  '/app/:documentId/edit': App, // editor
  '*': NotFound,
};

export const webRoutes = {
  '/': Home,
  '/sign-up': SignUp,
  '/sign-in': SignIn,
  '/edit': Edit,
}
