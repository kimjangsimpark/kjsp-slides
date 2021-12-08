<svelte:options immutable={true} />

<script type="ts">
  import Toolbar from '@/main-toolbar/MainToolbar.svelte';
  import SubToolbar from '@/sub-toolbar/SubToolbar.svelte';
  import Sidebar from '@/sidebar/Sidebar.svelte';
  import Editor from '@/editor/Editor.svelte';
  import PropertySidebar from '@/sidebar/PropertiesSidebar.svelte';
  import { currentQueueObject$ } from '@/store/queueObject';
  import { document$ } from '@/store/document';

  const document = document$;
  $: currentQueueObject = currentQueueObject$;
</script>

<div id="app-root">
  <div id="toolbar-root">
    <Toolbar />
  </div>
  <div id="subtoolbar-root">
    {#if $document}
      <SubToolbar />
    {/if}
  </div>
  <div id="app-body">
    {#if $document}
      <div id="side-bar-root">
        <Sidebar />
      </div>
      <div id="editor-root">
        <Editor />
      </div>
    {/if}
    {#if $currentQueueObject}
      <PropertySidebar />
    {/if}
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
      height: calc(100vh - 108px);

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
