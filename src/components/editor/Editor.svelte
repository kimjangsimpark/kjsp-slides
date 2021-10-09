<script type="ts">
  let scale = 1;
</script>

<div id="editor">
  <div id="scaler">
    <div id="frame">
      <div class="page" />
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
    transform: scale(0.6);
  }

  #frame {
    display: inline-block;
    padding: 20px;
  }

  .page {
    border: 1px solid gray;
    background: white;
    width: 1920px;
    height: 1080px;
  }
</style>
