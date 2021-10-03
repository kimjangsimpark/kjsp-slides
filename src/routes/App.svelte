<script type="ts">
  import Toolbar from '@/components/toolbar/Toolbar.svelte';
</script>

<div id="app-root">
  <Toolbar />
  <div id="app-body">app</div>
</div>

<style lang="scss">
  #app-root {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;

    #app-body {
      flex: 1 1 auto;
    }
  }
</style>
