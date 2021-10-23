<svelte:options immutable={true} />

<script type="ts">
  import Toolbar from '@/components/toolbar/Toolbar.svelte';
  import SubToolbar from '@/components/toolbar/SubToolbar.svelte';
  import Sidebar from '@/components/sidebar/Sidebar.svelte';
  import Editor from '@/components/editor/Editor.svelte';
  import PropertySidebar from '@/components/sidebar/PropertiesSidebar.svelte';
  import { currentQueueObject$ } from '@/store/queueObject';
  import { getDocument } from '@/http/document';
  import { document$, documentReducer } from '@/store/document';
  import { catchError, of, switchMap, tap, throwError } from 'rxjs';
  import { params$ } from '@/misc/svelte-router.rx';
  import { objectReducer } from '@/store/object';

  const document = document$;

  params$
    .pipe(
      switchMap(params => {
        const empty = !params || !params.documentId;
        if (empty) {
          return of(
            documentReducer({
              type: 'changeDocument',
              state: null,
            }),
          );
        } else {
          return getDocument({ documentId: params.documentId }).pipe(
            catchError(error => {
              console.log(error);
              return throwError(() => error);
            }),
            tap(document => {
              documentReducer({
                type: 'changeDocument',
                state: document,
              });
              objectReducer({
                type: 'documentChange',
                state: document.objects,
              });
            }),
          );
        }
      }),
    )
    .subscribe({
      next: p => {
        console.log('params changed', p);
      },
    });

  $: currentQueueObject = currentQueueObject$;
  $: console.log($document);
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
