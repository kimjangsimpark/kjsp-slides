<script type="ts">
  let current = 1;
</script>

<div id="subtoolbar">
  <div class="subtoolbar-item btn prev">
    <button>prev</button>
  </div>
  <div class="subtoolbar-item">1</div>
  <div class="subtoolbar-item">2</div>
  <div class="subtoolbar-item">3</div>
  <div class="subtoolbar-item">4</div>
  <div class="subtoolbar-item">5</div>
  <div class="subtoolbar-item btn prev">
    <button>next</button>
  </div>
</div>

<style type="scss">
  #subtoolbar {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgb(0 0 0 / 10%);

    .subtoolbar-item {
      margin: 10px;
    }
  }
</style>
