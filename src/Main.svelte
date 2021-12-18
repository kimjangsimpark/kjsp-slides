<script type="ts">
  import App from './App.svelte';
  import Provider from './provider/Provider.svelte';
  import { store } from './store';
</script>

<Provider {store}>
  <App />
</Provider>
