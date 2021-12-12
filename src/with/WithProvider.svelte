<script type="ts" context="module">
  export interface ProviderType<V = any> {
    name: string;
    value: V;
  }
</script>

<script type="ts">
  import { setContext } from 'svelte';
  export let provide: ProviderType;
  setContext<ProviderType>(provide.name, provide);
</script>

<slot />
