<script lang="ts">
  export let params = {};
</script>

<main>
  <h1>About</h1>
  <h2>{params.index}</h2>
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