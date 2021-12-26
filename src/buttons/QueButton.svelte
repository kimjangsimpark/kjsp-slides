<script type="ts" context="module">
  export interface OnQueButtonClick {
    event: MouseEvent;
  }
</script>

<script type="ts">
  import { createEventDispatcher } from 'svelte';

  let clazz: string = '';
  export let border: boolean = false;
  export { clazz as class };

  const dispatcher = createEventDispatcher();

  const onClick = (e: MouseEvent) => {
    dispatcher('click', e);
  };
</script>

<button
  class="que-button-wrapper {border ? 'border' : ''} {clazz}"
  on:click={e => onClick(e)}
>
  <slot />
</button>

<style type="scss">
  .que-button-wrapper {
    background-color: transparent;
    border: 0;
    transition: all 0.1s ease-in-out;
    display: flex;
    flex: 1 1 auto;
    justify-content: center;
    align-items: center;

    &:hover {
      background: #eee;
    }

    &:active {
      background: #fff;
    }

    &.border {
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
</style>
