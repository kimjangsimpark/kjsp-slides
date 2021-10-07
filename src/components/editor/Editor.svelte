<script type="ts">
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
    inset: 50% auto auto 50%;
    transform: translate(-50%, -50%) scale(0.3);
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
