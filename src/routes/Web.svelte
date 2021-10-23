<script type="ts">
  import Header from '@/components/Header.svelte';
  import { webRoutes, allowsAuthoriedUserRouteList } from '@/routes';
  import Router, { location } from 'svelte-spa-router';
  import AuthObserver from '@/components/auth/AuthObserver.svelte';

  $: allowsAuthoriedUser = allowsAuthoriedUserRouteList.includes($location);
</script>

<AuthObserver {allowsAuthoriedUser} />
<Header />
<Router routes={webRoutes} prefix="/home" />
