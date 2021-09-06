<script lang="ts">
  import { link } from 'svelte-spa-router';
  import active from 'svelte-spa-router/active';
</script>

<header>
  <nav>
    <a href="/" use:link use:active>Home</a>
    <a href="/about/1" use:link use:active>About1</a>
    <a href="/about/2" use:link use:active>About2</a>
    <a href="/edit" use:link use:active>Edit</a>
  </nav>
</header>

<style lang="scss">
  :global(header nav a.active) {
    font-weight: bold !important;
    text-decoration: underline;
  }

  header {
    nav {
      padding: 10px;

      a {
        padding: {
          left: 10px;
          right: 10px;
        };
        font-size: 2rem;
        font-weight: 300;
      }
    }
  }

  
</style>