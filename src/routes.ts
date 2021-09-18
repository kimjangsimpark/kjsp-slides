import Home from '@/routes/Home.svelte';
import SignUp from '@/routes/SignUp.svelte';
import SignIn from '@/routes/SignIn.svelte';
import Edit from '@/routes/Edit.svelte';
import NotFound from '@/routes/NotFound.svelte';

const routes = {
  '/': Home,
  '/sign-up': SignUp,
  '/sign-in': SignIn,
  '/edit': Edit,
  '*': NotFound,
};

export default routes;
