<script type="ts">
  import Toolbar from '@/components/toolbar/Toolbar.svelte';
  import SubToolbar from '@/components/toolbar/SubToolbar.svelte';
  import Sidebar from '@/components/sidebar/Sidebar.svelte';
  import Editor from '@/components/editor/Editor.svelte';
  import PropertySidebar from '@/components/sidebar/PropertiesSidebar.svelte';
</script>

<div id="app-root">
  <div id="toolbar-root">
    <Toolbar />
  </div>
  <div id="subtoolbar-root">
    <SubToolbar />
  </div>
  <div id="app-body">
    <div id="side-bar-root">
      <Sidebar />
    </div>
    <div id="editor-root">
      <Editor />
    </div>
    <PropertySidebar />
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
      height: calc(100vh - 66px);

      #side-bar-root {
        flex: 0 0 auto;
        width: 200px;
      }

      #editor-root {
        flex: 1 1 auto;
        background: #e9eaed;
        overflow: auto;
      }
    }
  }
</style>
