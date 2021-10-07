<script type="ts"></script>

<div id="editor">
  <div id="scaler">
    <div id="page" />
  </div>
</div>

<style type="scss">
  #editor {
    height: 100%;
  }

  #scaler {
    display: inline-block;
    transform-origin: left top;
    transform: scale(1.1);
  }

  #page {
    border: 1px solid gray;
    background: white;
    width: 500px;
    height: 500px;
  }
</style>
