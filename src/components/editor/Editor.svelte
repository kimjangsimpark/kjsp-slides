<script type="ts">
  import { document$, DocumentState } from '@/store/document';
  import { currentQueue$, CurrentQueueState } from '@/store/queue';

  let document: DocumentState;
  document$.subscribe(state => (document = state));

  let currentQueue: CurrentQueueState;
  currentQueue$.subscribe(state => (currentQueue = state));

  let scale = 0.6;
</script>

<div id="editor">
  <div id="scaler" style="transform: scale({scale});">
    <div id="frame">
      <svg
        class="page"
        style="width: {document.rect.width}px; height: {document.rect.height}px;"
      >
        {#if currentQueue.queue.objects}
          {#each currentQueue.queue.objects as object}
            {#if object.type === 'square'}
              <g>
                <rect
                  x={object.rect.x}
                  y={object.rect.y}
                  width={object.rect.width}
                  height={object.rect.height}
                />
              </g>
            {/if}
          {/each}
        {/if}
      </svg>
    </div>
  </div>
</div>

<style type="scss">
  #editor {
    height: 100%;
    position: relative;
  }

  #scaler {
    display: inline-block;
    position: absolute;
    transform-origin: top left;
  }

  #frame {
    display: inline-block;
    padding: 20px;
  }

  .page {
    border: 1px solid gray;
    background: white;
  }
</style>
