<script lang="ts">
  import MenuOption from '@/components/editor/MenuOption.svelte';
</script>

<ul>
  <MenuOption text={'File'} class="menu" />
  <MenuOption text={'Edit'} class="menu" />
  <MenuOption text={'View'} class="menu" />
</ul>

<style lang="scss">
  ul {
    display: flex;
    :global(.menu) {
      margin-right: 20px;
    }
  }
</style>
