import Home from '@/routes/Home.svelte';
import SignUp from '@/routes/SignUp.svelte';
import SignIn from '@/routes/SignIn.svelte';
import Edit from '@/routes/Edit.svelte';
import NotFound from '@/routes/NotFound.svelte';
import App from '@/routes/App.svelte';
import Web from '@/routes/Web.svelte';

export const rootRoute = {
  '/home': Web,
  '/home/*': Web,
  '/app': App,
  '/app/*': App,
  '*': NotFound,
};

export const webRoutes = {
  '/': Home,
  '/sign-up': SignUp,
  '/sign-in': SignIn,
  '/edit': Edit,
}

