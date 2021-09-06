import Home from '@/routes/Home.svelte';
import About from '@/routes/About.svelte';
import Edit from '@/routes/Edit.svelte';
import NotFound from '@/routes/NotFound.svelte';

const routes = {
  '/': Home,
  '/about/:index': About,
  '/edit': Edit,
  '*': NotFound,
};

export default routes;
