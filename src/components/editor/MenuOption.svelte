<script lang="ts">
  import Steps from '@/components/editor/Steps.svelte';
  let menuOpen = false;
  export let text = '';
  const handleOnclick = (e: MouseEvent) => {
    e.preventDefault();
    menuOpen = !menuOpen;
    console.log('menuOpen~~~!!', menuOpen);
  };
</script>

<li class={$$props.class}>
  <a href={text} on:click={handleOnclick}>{text}</a>
</li>
{#if menuOpen}
  <Steps />
{/if}

<style lang="scss">
  li {
    a {
      cursor: pointer;
      color: black;
    }
  }
</style>
