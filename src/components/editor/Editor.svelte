<script type="ts">
  import { document$, DocumentState } from '@/store/document';

  let document: DocumentState;
  document$.subscribe(state => (document = state));
  let scale = 0.6;
</script>

<div id="editor">
  <div id="scaler" style="transform: scale({scale});">
    <div id="frame">
      <div
        class="page"
        style="width: {document.rect.width}px; height: {document.rect.height}px;"
      />
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
