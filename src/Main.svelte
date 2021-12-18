<script type="ts">
  import App from './App.svelte';
  import Provider from './provider/Provider.svelte';
  import { configureAppStore } from './store';
  const store = configureAppStore();
</script>

<Provider {store}>
  <App />
</Provider>
