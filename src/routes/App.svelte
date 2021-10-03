<script type="ts">
  import Toolbar from '@/components/toolbar/Toolbar.svelte';
  import Sidebar from '@/components/sidebar/Sidebar.svelte';
</script>

<div id="app-root">
  <div id="toolbar-root">
    <Toolbar />
  </div>
  <div id="app-body">
    <div id="side-bar-root">
      <Sidebar />
    </div>
    <div id="app-root">app</div>
    <div id="property-bar-root">right side bar</div>
  </div>
</div>

<style lang="scss">
  #app-root {
    width: 100%;
    display: flex;
    flex-direction: column;

    #app-body {
      flex: 1 1 auto;
      display: flex;
      height: calc(100vh - 38px);

      #side-bar-root {
        flex: 0 0 auto;
        width: 200px;
      }

      #app-root {
        flex: 1 1 auto;
      }

      #property-bar-root {
        flex: 0 0 auto;
        width: 200px;
      }
    }
  }
</style>
