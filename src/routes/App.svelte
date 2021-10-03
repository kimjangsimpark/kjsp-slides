<script type="ts">
  import Router from 'svelte-spa-router';
  import Toolbar from '@/components/toolbar/Toolbar.svelte';
  import Home from '@/routes/Home.svelte';

  const prefix = '/hello';
  const rootRoute = {
    '/asdf': Home,
  };
</script>

<Toolbar />
<main>hello world!</main>
<Router routes={rootRoute} {prefix} />

<style lang="scss">
</style>
