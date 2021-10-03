<script type="ts">
  import Header from '@/components/Header.svelte';
  import { webRoutes } from '@/routes';
  import Router from 'svelte-spa-router';
</script>

<Header />
<Router routes={webRoutes} prefix="/home" />
