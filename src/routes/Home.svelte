<script lang="ts">
  import { count } from '@/store/store';
</script>

<main>
  <h1>Home</h1>
  <h2>Store count: {$count}</h2>
</main>

<style lang="scss">
  main {
    padding: 20px;

    h1 {
      font: {
        weight: 100;
        size: 10rem;
      }
    }
  }
</style>
