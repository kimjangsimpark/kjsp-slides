<script lang="ts">
  import Test from '@/components/Test.svelte';

  export let name = 'World';
  export let prop = 'KJSP';
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build
    Svelte apps.
  </p>
  <h2>Scss test</h2>
  <h3>Test Variables</h3>
  <Test prop="{prop}" />
</main>

<style lang="scss">
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;

    h2 {
      color: lightsteelblue;
    }

    h3 {
      color: $primary-color;
    }
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
